package com.jogosblaey.youtube_pip

import android.Manifest
import android.app.Activity
import android.content.Intent
import android.content.pm.PackageManager
import android.net.Uri
import android.os.Build
import android.os.Bundle
import android.provider.Settings
import android.webkit.JavascriptInterface
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.appcompat.app.AppCompatActivity
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat

class MainActivity : AppCompatActivity() {
    
    private lateinit var webView: WebView
    private val OVERLAY_PERMISSION_REQUEST_CODE = 1001
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        
        setupWebView()
        requestOverlayPermission()
    }
    
    private fun setupWebView() {
        webView = findViewById(R.id.webview)
        
        // Configurar WebView
        webView.settings.apply {
            javaScriptEnabled = true
            domStorageEnabled = true
            allowFileAccess = true
            allowContentAccess = true
            mixedContentMode = android.webkit.WebSettings.MIXED_CONTENT_ALWAYS_ALLOW
        }
        
        // Adicionar interface JavaScript
        webView.addJavascriptInterface(AndroidInterface(), "Android")
        
        // Configurar WebViewClient
        webView.webViewClient = object : WebViewClient() {
            override fun shouldOverrideUrlLoading(view: WebView?, url: String?): Boolean {
                return false
            }
        }
        
        // Carregar a página
        webView.loadUrl("https://jogos-blaey.web.app/youtube-pip.html")
    }
    
    private fun requestOverlayPermission() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            if (!Settings.canDrawOverlays(this)) {
                val intent = Intent(Settings.ACTION_MANAGE_OVERLAY_PERMISSION)
                intent.data = Uri.parse("package:$packageName")
                startActivityForResult(intent, OVERLAY_PERMISSION_REQUEST_CODE)
            }
        }
    }
    
    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        
        if (requestCode == OVERLAY_PERMISSION_REQUEST_CODE) {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                if (Settings.canDrawOverlays(this)) {
                    // Permissão concedida
                    webView.evaluateJavascript("window.overlayPermissionGranted = true;", null)
                } else {
                    // Permissão negada
                    webView.evaluateJavascript("window.overlayPermissionGranted = false;", null)
                }
            }
        }
    }
    
    inner class AndroidInterface {
        
        @JavascriptInterface
        fun isNativePipSupported(): Boolean {
            return Build.VERSION.SDK_INT >= Build.VERSION_CODES.O
        }
        
        @JavascriptInterface
        fun hasOverlayPermission(): Boolean {
            return if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                Settings.canDrawOverlays(this@MainActivity)
            } else {
                true
            }
        }
        
        @JavascriptInterface
        fun requestOverlayPermission(): Boolean {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                if (!Settings.canDrawOverlays(this@MainActivity)) {
                    runOnUiThread {
                        requestOverlayPermission()
                    }
                    return false
                }
            }
            return true
        }
        
        @JavascriptInterface
        fun startNativePip(videoId: String, title: String, thumbnail: String, currentTime: Float, isPlaying: Boolean): Boolean {
            // Esta função não será usada, pois queremos manter o PiP customizado
            // Mas mantemos para compatibilidade
            return false
        }
    }
}