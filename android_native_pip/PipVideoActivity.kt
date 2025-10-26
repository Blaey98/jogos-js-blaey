package com.yourapp.youtube_pip

import android.app.Activity
import android.app.PictureInPictureParams
import android.content.Intent
import android.content.res.Configuration
import android.graphics.Rect
import android.net.Uri
import android.os.Build
import android.os.Bundle
import android.util.Rational
import android.view.View
import android.view.WindowManager
import android.webkit.JavascriptInterface
import android.webkit.WebChromeClient
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.annotation.RequiresApi
import androidx.appcompat.app.AppCompatActivity
import androidx.media3.common.MediaItem
import androidx.media3.common.Player
import androidx.media3.exoplayer.ExoPlayer
import androidx.media3.ui.PlayerView
import com.google.android.material.floatingactionbutton.FloatingActionButton

class PipVideoActivity : AppCompatActivity() {
    
    private lateinit var playerView: PlayerView
    private lateinit var exoPlayer: ExoPlayer
    private lateinit var webView: WebView
    private lateinit var pipButton: FloatingActionButton
    
    private var videoId: String? = null
    private var videoTitle: String? = null
    private var videoUrl: String? = null
    private var currentPosition: Long = 0L
    private var isPlaying: Boolean = false
    
    companion object {
        const val EXTRA_VIDEO_ID = "video_id"
        const val EXTRA_VIDEO_TITLE = "video_title"
        const val EXTRA_VIDEO_URL = "video_url"
        const val EXTRA_CURRENT_POSITION = "current_position"
        const val EXTRA_IS_PLAYING = "is_playing"
        
        fun startPipActivity(
            activity: Activity,
            videoId: String,
            videoTitle: String,
            videoUrl: String,
            currentPosition: Long = 0L,
            isPlaying: Boolean = true
        ) {
            val intent = Intent(activity, PipVideoActivity::class.java).apply {
                putExtra(EXTRA_VIDEO_ID, videoId)
                putExtra(EXTRA_VIDEO_TITLE, videoTitle)
                putExtra(EXTRA_VIDEO_URL, videoUrl)
                putExtra(EXTRA_CURRENT_POSITION, currentPosition)
                putExtra(EXTRA_IS_PLAYING, isPlaying)
            }
            activity.startActivity(intent)
        }
    }
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_pip_video)
        
        // Manter tela ligada
        window.addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON)
        
        // Obter dados do vídeo
        videoId = intent.getStringExtra(EXTRA_VIDEO_ID)
        videoTitle = intent.getStringExtra(EXTRA_VIDEO_TITLE)
        videoUrl = intent.getStringExtra(EXTRA_VIDEO_URL)
        currentPosition = intent.getLongExtra(EXTRA_CURRENT_POSITION, 0L)
        isPlaying = intent.getBooleanExtra(EXTRA_IS_PLAYING, true)
        
        setupViews()
        setupPlayer()
        setupWebView()
        
        // Entrar em PiP automaticamente após um breve delay
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            window.decorView.postDelayed({
                enterPictureInPictureMode()
            }, 1000)
        }
    }
    
    private fun setupViews() {
        playerView = findViewById(R.id.player_view)
        webView = findViewById(R.id.web_view)
        pipButton = findViewById(R.id.pip_button)
        
        pipButton.setOnClickListener {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                enterPictureInPictureMode()
            }
        }
    }
    
    private fun setupPlayer() {
        exoPlayer = ExoPlayer.Builder(this).build()
        playerView.player = exoPlayer
        
        // Configurar o vídeo
        videoUrl?.let { url ->
            val mediaItem = MediaItem.fromUri(url)
            exoPlayer.setMediaItem(mediaItem)
            exoPlayer.prepare()
            
            // Restaurar posição
            if (currentPosition > 0) {
                exoPlayer.seekTo(currentPosition)
            }
            
            // Restaurar estado de reprodução
            if (isPlaying) {
                exoPlayer.play()
            }
        }
        
        // Listener para mudanças de estado
        exoPlayer.addListener(object : Player.Listener {
            override fun onPlaybackStateChanged(playbackState: Int) {
                super.onPlaybackStateChanged(playbackState)
                when (playbackState) {
                    Player.STATE_READY -> {
                        // Player pronto
                    }
                    Player.STATE_ENDED -> {
                        // Vídeo terminou - sair do PiP
                        finish()
                    }
                }
            }
        })
    }
    
    private fun setupWebView() {
        webView.settings.apply {
            javaScriptEnabled = true
            domStorageEnabled = true
            mediaPlaybackRequiresUserGesture = false
            allowFileAccess = true
            allowContentAccess = true
        }
        
        webView.webChromeClient = WebChromeClient()
        webView.webViewClient = WebViewClient()
        
        // Adicionar interface JavaScript
        webView.addJavascriptInterface(WebAppInterface(), "Android")
        
        // Carregar página com controles customizados
        webView.loadUrl("file:///android_asset/pip_controls.html")
    }
    
    @RequiresApi(Build.VERSION_CODES.O)
    override fun onUserLeaveHint() {
        super.onUserLeaveHint()
        // Entrar em PiP quando usuário sair da app
        enterPictureInPictureMode()
    }
    
    @RequiresApi(Build.VERSION_CODES.O)
    override fun onPictureInPictureModeChanged(
        isInPictureInPictureMode: Boolean,
        newConfig: Configuration
    ) {
        super.onPictureInPictureModeChanged(isInPictureInPictureMode, newConfig)
        
        if (isInPictureInPictureMode) {
            // Entrou em PiP - ocultar controles desnecessários
            pipButton.visibility = View.GONE
            webView.visibility = View.GONE
            
            // Ajustar layout para PiP
            playerView.useController = false
        } else {
            // Saiu do PiP - mostrar controles
            pipButton.visibility = View.VISIBLE
            webView.visibility = View.VISIBLE
            
            // Restaurar layout normal
            playerView.useController = true
        }
    }
    
    @RequiresApi(Build.VERSION_CODES.O)
    private fun enterPictureInPictureMode() {
        val pipParams = PictureInPictureParams.Builder()
            .setAspectRatio(Rational(16, 9))
            .build()
        
        enterPictureInPictureMode(pipParams)
    }
    
    override fun onPause() {
        super.onPause()
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            if (!isInPictureInPictureMode) {
                // Se não estiver em PiP, pausar o vídeo
                exoPlayer.pause()
            }
        } else {
            exoPlayer.pause()
        }
    }
    
    override fun onResume() {
        super.onResume()
        if (isPlaying) {
            exoPlayer.play()
        }
    }
    
    override fun onDestroy() {
        super.onDestroy()
        exoPlayer.release()
    }
    
    override fun onBackPressed() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O && isInPictureInPictureMode) {
            // Se estiver em PiP, sair do PiP primeiro
            exitPictureInPictureMode()
        } else {
            super.onBackPressed()
        }
    }
    
    // Interface JavaScript para comunicação com o web
    inner class WebAppInterface {
        @JavascriptInterface
        fun playVideo() {
            runOnUiThread {
                exoPlayer.play()
                isPlaying = true
            }
        }
        
        @JavascriptInterface
        fun pauseVideo() {
            runOnUiThread {
                exoPlayer.pause()
                isPlaying = false
            }
        }
        
        @JavascriptInterface
        fun seekTo(position: Long) {
            runOnUiThread {
                exoPlayer.seekTo(position)
            }
        }
        
        @JavascriptInterface
        fun getCurrentPosition(): Long {
            return exoPlayer.currentPosition
        }
        
        @JavascriptInterface
        fun getDuration(): Long {
            return exoPlayer.duration
        }
        
        @JavascriptInterface
        fun isPlaying(): Boolean {
            return exoPlayer.isPlaying
        }
        
        @JavascriptInterface
        fun closePip() {
            runOnUiThread {
                finish()
            }
        }
    }
}
