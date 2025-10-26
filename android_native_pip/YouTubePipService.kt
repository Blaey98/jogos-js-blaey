package com.yourapp.youtube_pip

import android.app.*
import android.content.Context
import android.content.Intent
import android.graphics.PixelFormat
import android.os.Build
import android.os.IBinder
import android.view.*
import android.webkit.WebView
import android.widget.FrameLayout
import androidx.core.app.NotificationCompat
import androidx.media3.common.MediaItem
import androidx.media3.exoplayer.ExoPlayer
import androidx.media3.ui.PlayerView

class YouTubePipService : Service() {
    
    private var windowManager: WindowManager? = null
    private var pipView: View? = null
    private var exoPlayer: ExoPlayer? = null
    private var playerView: PlayerView? = null
    
    companion object {
        const val ACTION_START_PIP = "START_PIP"
        const val ACTION_STOP_PIP = "STOP_PIP"
        const val EXTRA_VIDEO_ID = "VIDEO_ID"
        const val EXTRA_VIDEO_TITLE = "VIDEO_TITLE"
        const val EXTRA_VIDEO_URL = "VIDEO_URL"
        
        fun startPipService(context: Context, videoId: String, videoTitle: String, videoUrl: String) {
            val intent = Intent(context, YouTubePipService::class.java).apply {
                action = ACTION_START_PIP
                putExtra(EXTRA_VIDEO_ID, videoId)
                putExtra(EXTRA_VIDEO_TITLE, videoTitle)
                putExtra(EXTRA_VIDEO_URL, videoUrl)
            }
            
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                context.startForegroundService(intent)
            } else {
                context.startService(intent)
            }
        }
        
        fun stopPipService(context: Context) {
            val intent = Intent(context, YouTubePipService::class.java).apply {
                action = ACTION_STOP_PIP
            }
            context.startService(intent)
        }
    }
    
    override fun onCreate() {
        super.onCreate()
        windowManager = getSystemService(Context.WINDOW_SERVICE) as WindowManager
        createNotificationChannel()
    }
    
    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        when (intent?.action) {
            ACTION_START_PIP -> {
                val videoId = intent.getStringExtra(EXTRA_VIDEO_ID) ?: return START_NOT_STICKY
                val videoTitle = intent.getStringExtra(EXTRA_VIDEO_TITLE) ?: "YouTube Video"
                val videoUrl = intent.getStringExtra(EXTRA_VIDEO_URL) ?: return START_NOT_STICKY
                
                startForegroundService()
                createPipWindow(videoId, videoTitle, videoUrl)
            }
            ACTION_STOP_PIP -> {
                stopPipWindow()
                stopSelf()
            }
        }
        return START_NOT_STICKY
    }
    
    private fun startForegroundService() {
        val notification = NotificationCompat.Builder(this, "pip_channel")
            .setContentTitle("YouTube PiP Ativo")
            .setContentText("Vídeo rodando em Picture-in-Picture")
            .setSmallIcon(R.drawable.ic_pip)
            .setOngoing(true)
            .build()
        
        startForeground(1, notification)
    }
    
    private fun createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val channel = NotificationChannel(
                "pip_channel",
                "YouTube PiP",
                NotificationManager.IMPORTANCE_LOW
            ).apply {
                description = "Notificações do YouTube PiP"
                setShowBadge(false)
            }
            
            val notificationManager = getSystemService(NotificationManager::class.java)
            notificationManager.createNotificationChannel(channel)
        }
    }
    
    private fun createPipWindow(videoId: String, videoTitle: String, videoUrl: String) {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.O) {
            // Para versões antigas, usar SYSTEM_ALERT_WINDOW
            createSystemAlertWindow(videoId, videoTitle, videoUrl)
        } else {
            // Para versões novas, usar SYSTEM_OVERLAY_WINDOW
            createSystemOverlayWindow(videoId, videoTitle, videoUrl)
        }
    }
    
    private fun createSystemAlertWindow(videoId: String, videoTitle: String, videoUrl: String) {
        val layoutInflater = LayoutInflater.from(this)
        pipView = layoutInflater.inflate(R.layout.pip_window_layout, null)
        
        // Configurar ExoPlayer
        playerView = pipView?.findViewById(R.id.player_view)
        exoPlayer = ExoPlayer.Builder(this).build()
        playerView?.player = exoPlayer
        
        // Configurar vídeo
        val mediaItem = MediaItem.fromUri(videoUrl)
        exoPlayer?.setMediaItem(mediaItem)
        exoPlayer?.prepare()
        exoPlayer?.play()
        
        // Configurar janela flutuante
        val layoutParams = WindowManager.LayoutParams(
            400, 225,
            WindowManager.LayoutParams.TYPE_SYSTEM_ALERT,
            WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE or
            WindowManager.LayoutParams.FLAG_LAYOUT_IN_SCREEN or
            WindowManager.LayoutParams.FLAG_HARDWARE_ACCELERATED,
            PixelFormat.TRANSLUCENT
        )
        
        layoutParams.gravity = Gravity.TOP or Gravity.END
        layoutParams.x = 20
        layoutParams.y = 100
        
        windowManager?.addView(pipView, layoutParams)
        
        // Adicionar funcionalidade de arrastar
        setupDragFunctionality(pipView, layoutParams)
    }
    
    private fun createSystemOverlayWindow(videoId: String, videoTitle: String, videoUrl: String) {
        val layoutInflater = LayoutInflater.from(this)
        pipView = layoutInflater.inflate(R.layout.pip_window_layout, null)
        
        // Configurar ExoPlayer
        playerView = pipView?.findViewById(R.id.player_view)
        exoPlayer = ExoPlayer.Builder(this).build()
        playerView?.player = exoPlayer
        
        // Configurar vídeo
        val mediaItem = MediaItem.fromUri(videoUrl)
        exoPlayer?.setMediaItem(mediaItem)
        exoPlayer?.prepare()
        exoPlayer?.play()
        
        // Configurar janela flutuante
        val layoutParams = WindowManager.LayoutParams(
            400, 225,
            WindowManager.LayoutParams.TYPE_APPLICATION_OVERLAY,
            WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE or
            WindowManager.LayoutParams.FLAG_LAYOUT_IN_SCREEN or
            WindowManager.LayoutParams.FLAG_HARDWARE_ACCELERATED,
            PixelFormat.TRANSLUCENT
        )
        
        layoutParams.gravity = Gravity.TOP or Gravity.END
        layoutParams.x = 20
        layoutParams.y = 100
        
        windowManager?.addView(pipView, layoutParams)
        
        // Adicionar funcionalidade de arrastar
        setupDragFunctionality(pipView, layoutParams)
    }
    
    private fun setupDragFunctionality(view: View?, layoutParams: WindowManager.LayoutParams) {
        var initialX = 0
        var initialY = 0
        var initialTouchX = 0f
        var initialTouchY = 0f
        
        view?.setOnTouchListener { _, event ->
            when (event.action) {
                MotionEvent.ACTION_DOWN -> {
                    initialX = layoutParams.x
                    initialY = layoutParams.y
                    initialTouchX = event.rawX
                    initialTouchY = event.rawY
                    true
                }
                MotionEvent.ACTION_MOVE -> {
                    layoutParams.x = initialX + (event.rawX - initialTouchX).toInt()
                    layoutParams.y = initialY + (event.rawY - initialTouchY).toInt()
                    windowManager?.updateViewLayout(view, layoutParams)
                    true
                }
                else -> false
            }
        }
    }
    
    private fun stopPipWindow() {
        pipView?.let { view ->
            windowManager?.removeView(view)
        }
        exoPlayer?.release()
        exoPlayer = null
        pipView = null
        playerView = null
    }
    
    override fun onDestroy() {
        super.onDestroy()
        stopPipWindow()
    }
    
    override fun onBind(intent: Intent?): IBinder? = null
}
