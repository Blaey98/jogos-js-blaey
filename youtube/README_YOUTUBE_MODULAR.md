# YouTube Modular - Sistema de Vídeos com Picture-in-Picture

Este projeto foi dividido em 3 módulos independentes para facilitar a manutenção e organização do código.

## 📁 Estrutura dos Módulos

Todos os arquivos estão organizados na pasta `youtube/`:

### 1. **youtube-search.html** - Página de Pesquisa
- **Função**: Interface principal para pesquisar vídeos do YouTube
- **Recursos**:
  - Campo de pesquisa com histórico
  - Grid de vídeos encontrados
  - Seção de vídeos em alta
  - Navegação para página de reprodução

### 2. **youtube-play.html** - Página de Reprodução
- **Função**: Reproduzir vídeos com controles avançados
- **Recursos**:
  - Player de vídeo em tela cheia
  - Informações detalhadas do vídeo
  - Botão "Ativar Janela Flutuante"
  - Vídeos recomendados
  - Navegação de volta

### 3. **youtube-pip-window.html** - Janela Flutuante
- **Função**: Janela Picture-in-Picture independente
- **Recursos**:
  - Janela flutuante arrastável
  - Controles de play/pause
  - Barra de progresso
  - Botões de minimizar/maximizar
  - Funciona sobre outras aplicações

## 🎯 Arquivos Compartilhados

### **youtube-shared.css**
- Estilos CSS comuns entre os 3 módulos
- Responsividade para mobile
- Animações e transições
- Tema escuro do YouTube

### **youtube-shared.js**
- Funções JavaScript compartilhadas
- API do YouTube
- Sistema de cache
- Gerenciamento de estado
- Comunicação entre módulos

## 🚀 Como Usar

### 1. Acessar o Sistema
```
youtube/index.html
```
- Página inicial com navegação para todos os módulos
- Interface amigável e responsiva

### 2. Pesquisar Vídeos
```
youtube/youtube-search.html
```
- Digite sua pesquisa no campo de texto
- Clique em vídeos para reproduzir
- Veja vídeos em alta na seção inferior

### 3. Reproduzir Vídeos
```
youtube/youtube-play.html?id=VIDEO_ID
```
- Player automático do vídeo
- Clique em "Ativar Janela Flutuante" para PiP
- Navegue pelos vídeos recomendados

### 4. Usar Janela Flutuante
```
youtube/youtube-pip-window.html
```
- Abre automaticamente quando PiP é ativado
- Arraste para mover a janela
- Use os controles para gerenciar reprodução

## 🔧 Funcionalidades Técnicas

### Sistema de Comunicação
- **localStorage**: Sincronização entre módulos
- **postMessage**: Comunicação entre janelas
- **URL Parameters**: Navegação entre páginas

### API do YouTube
- **Chave**: `AIzaSyD1jmhxA0IpnT61WWsm2wQijCC8PVpIgkU`
- **Fallback**: Vídeos offline quando API falha
- **Cache**: 5 minutos de duração

### Picture-in-Picture
- **Z-index máximo**: 2147483647
- **Arrastar e soltar**: Mouse e touch
- **Controles customizados**: Play, pause, progresso
- **Responsivo**: Adapta-se ao mobile

## 📱 Responsividade

### Desktop
- Grid de vídeos em colunas
- Janela PiP no canto inferior direito
- Controles hover para mostrar

### Mobile
- Grid de vídeos em coluna única
- Janela PiP ocupa largura total
- Controles sempre visíveis
- Touch otimizado

## 🎨 Personalização

### Cores
- **Primária**: #FF0000 (Vermelho YouTube)
- **Secundária**: #4CAF50 (Verde PiP)
- **Fundo**: #0f0f0f (Preto)
- **Cards**: #212121 (Cinza escuro)

### Tamanhos
- **PiP Padrão**: 320x180px
- **PiP Minimizado**: 200x113px
- **PiP Maximizado**: 400x225px
- **Mobile**: Largura total - 20px

## 🔄 Fluxo de Navegação

```
youtube/index.html
    ↓ (escolha o módulo)
youtube/youtube-search.html
    ↓ (clique no vídeo)
youtube/youtube-play.html?id=VIDEO_ID
    ↓ (botão PiP)
youtube/youtube-pip-window.html (abre automaticamente)
```

## 🛠️ Manutenção

### Adicionar Novos Recursos
1. **CSS**: Adicione em `youtube-shared.css`
2. **JavaScript**: Adicione em `youtube-shared.js`
3. **Páginas**: Modifique o módulo específico

### Debugging
- **Console**: Logs detalhados com emojis
- **localStorage**: Dados de vídeo e estado
- **Network**: Requisições da API do YouTube

## 📋 Dependências

### Externas
- **YouTube API**: `https://www.googleapis.com/youtube/v3`
- **YouTube Embed**: `https://www.youtube.com/embed/`

### Locais
- **CSS**: `youtube/youtube-shared.css`
- **JS**: `youtube/youtube-shared.js`
- **Icons**: `/icon-*.png`
- **Manifest**: `/manifest.json`

## 🎯 Vantagens da Modularização

1. **Manutenção**: Código organizado e fácil de modificar
2. **Performance**: Carregamento otimizado por módulo
3. **Reutilização**: Componentes compartilhados
4. **Escalabilidade**: Fácil adicionar novos módulos
5. **Debugging**: Problemas isolados por módulo

## 🔍 Troubleshooting

### PiP não abre
- Verifique se `youtube-pip-window.html` está acessível
- Confirme se localStorage está funcionando
- Teste em navegador com suporte a PiP

### Vídeos não carregam
- Verifique conexão com internet
- Confirme se API key está válida
- Teste modo fallback

### Mobile não funciona
- Verifique viewport meta tag
- Confirme touch events
- Teste em dispositivo real

## 📞 Suporte

Para problemas ou dúvidas:
1. Verifique o console do navegador
2. Teste em modo incógnito
3. Confirme se todos os arquivos estão presentes
4. Verifique permissões do navegador

---

**Desenvolvido com ❤️ para uma experiência YouTube modular e eficiente!**
