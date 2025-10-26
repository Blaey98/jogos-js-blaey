# 🎬 PiP Global - YouTube Player

## 🎯 **O que é?**

Uma solução **híbrida** que combina:
- ✅ **PiP customizado** - a janela que você já criou
- ✅ **Permissões nativas** - para funcionar em todas as telas
- ✅ **Sem PiP nativo** - mantém controle total da interface

## 🚀 **Como Funciona?**

### **1. Detecção Automática:**
- Se estiver em **TWA/Android** → Ativa permissões nativas + PiP customizado
- Se estiver em **navegador** → Usa PiP customizado normal

### **2. Permissões Nativas:**
- Solicita permissão `SYSTEM_ALERT_WINDOW`
- Permite que a janela PiP "flutue" sobre todas as aplicações
- **NÃO usa PiP nativo** - mantém sua interface customizada

### **3. PiP Global:**
- Z-index máximo (`2147483647`)
- Eventos para manter visibilidade
- Verificação periódica de estado
- Funciona em todas as telas e transições

---

## 📱 **Teste Agora:**

### **Web (Navegador):**
```
https://jogos-blaey.web.app/youtube-pip.html
```

### **Android (APK):**
```bash
# Construir APK
./build_android_apk.sh

# Instalar no dispositivo
adb install youtube-pip-global.apk
```

---

## 🛠️ **Implementação:**

### **JavaScript (Web):**
```javascript
// Detectar ambiente Android
if (window.Android && window.Android.isNativePipSupported()) {
    // Solicitar permissões nativas
    const hasPermission = await window.Android.requestOverlayPermission();
    if (hasPermission) {
        // Ativar PiP customizado com permissões nativas
        await activateCustomPiPWithNativePermissions(video);
    }
}
```

### **Android (Kotlin):**
```kotlin
@JavascriptInterface
fun requestOverlayPermission(): Boolean {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
        if (!Settings.canDrawOverlays(this@MainActivity)) {
            // Solicitar permissão de sobreposição
            val intent = Intent(Settings.ACTION_MANAGE_OVERLAY_PERMISSION)
            intent.data = Uri.parse("package:$packageName")
            startActivityForResult(intent, OVERLAY_PERMISSION_REQUEST_CODE)
            return false
        }
    }
    return true
}
```

---

## 🎯 **Vantagens:**

### ✅ **PiP Customizado:**
- Interface totalmente sua
- Controles personalizados
- Sem limitações do PiP nativo

### ✅ **Funciona em Todas as Telas:**
- Permissões nativas ativadas
- Z-index máximo
- Eventos de visibilidade

### ✅ **Compatibilidade:**
- Web: PiP customizado normal
- Android: PiP customizado + permissões nativas
- Fallback automático

### ✅ **Controle Total:**
- Não depende do PiP nativo do Android
- Interface personalizada
- Comportamento previsível

---

## 🔧 **Configuração:**

### **1. Web (Firebase):**
```bash
firebase deploy --only hosting
```

### **2. Android (APK):**
```bash
./build_android_apk.sh
```

### **3. TWA (Bubblewrap):**
```bash
cd twa_config
./build_twa.sh
```

---

## 📱 **Teste no Dispositivo:**

### **1. Instalar APK:**
```bash
adb install youtube-pip-global.apk
```

### **2. Conceder Permissões:**
- Abra o app
- Conceda permissão de sobreposição quando solicitado
- Vá em Configurações → Apps → YouTube PiP → Permissões → Sobrepor outras apps

### **3. Testar PiP:**
- Pesquise um vídeo
- Clique em "Ativar Janela Flutuante"
- O PiP deve aparecer e funcionar em todas as telas

---

## 🎬 **Resultado:**

Com essa implementação, você terá:
- ✅ **PiP customizado** - sua interface
- ✅ **Funciona em todas as telas** - como PiP nativo
- ✅ **Sem limitações** - controle total
- ✅ **Compatibilidade** - web e Android

**É exatamente o que você pediu!** 🚀
