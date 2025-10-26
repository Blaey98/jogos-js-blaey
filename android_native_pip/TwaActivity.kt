package com.yourapp.youtube_pip

import android.app.Activity
import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.webkit.JavascriptInterface
import android.webkit.WebChromeClient
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.appcompat.app.AppCompatActivity
import com.google.androidbrowserhelper.trusted.TwaLauncher

class TwaActivity : AppCompatActivity() {
    
    private lateinit var webView: WebView
    private var twaLauncher: TwaLauncher? = null
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_twa)
        
        setupWebView()
        setupTwa()
    }
    
    private fun setupWebView() {
        webView = findViewById(R.id.web_view)
        
        webView.settings.apply {
            javaScriptEnabled = true
            domStorageEnabled = true
            mediaPlaybackRequiresUserGesture = false
            allowFileAccess = true
            allowContentAccess = true
        }
        
        webView.webChromeClient = WebChromeClient()
        webView.webViewClient = WebViewClient()
        
        // Adicionar interface JavaScript para comunicação
        webView.addJavascriptInterface(WebAppInterface(), "Android")
        
        // Carregar o site do Firebase
        webView.loadUrl("https://your-firebase-project.web.app")
    }
    
    private fun setupTwa() {
        // Configurar TWA Launcher
        twaLauncher = TwaLauncher(this)
        
        // Configurar URL do site
        val url = Uri.parse("https://your-firebase-project.web.app")
        
        // Iniciar TWA
        twaLauncher?.launch(
            url = url,
            fallbackStrategy = null,
            completionCallback = { success ->
                if (success) {
                    // TWA iniciado com sucesso
                } else {
                    // Fallback para WebView
                    webView.visibility = android.view.View.VISIBLE
                }
            }
        )
    }
    
    // Interface JavaScript para comunicação com o web
    inner class WebAppInterface {
        @JavascriptInterface
        fun startNativePip(
            videoId: String,
            videoTitle: String,
            videoUrl: String,
            currentPosition: Long,
            isPlaying: Boolean
        ) {
            runOnUiThread {
                // Iniciar Activity nativa para PiP
                PipVideoActivity.startPipActivity(
                    activity = this@TwaActivity,
                    videoId = videoId,
                    videoTitle = videoTitle,
                    videoUrl = videoUrl,
                    currentPosition = currentPosition,
                    isPlaying = isPlaying
                )
            }
        }
        
        @JavascriptInterface
        fun isNativePipSupported(): Boolean {
            return android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.O
        }
        
        @JavascriptInterface
        fun getAndroidVersion(): Int {
            return android.os.Build.VERSION.SDK_INT
        }
    }
    
    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        twaLauncher?.onActivityResult(requestCode, resultCode, data)
    }
    
    override fun onNewIntent(intent: Intent?) {
        super.onNewIntent(intent)
        twaLauncher?.onNewIntent(intent)
    }
}
