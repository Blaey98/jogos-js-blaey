# YouTube PiP - Player Personalizado

Uma aplicação web completa que replica a funcionalidade do YouTube com janela Picture-in-Picture (PiP) customizada, desenvolvida em JavaScript puro.

## 🚀 Funcionalidades

### ✨ Principais Recursos
- **Busca no YouTube**: Integração completa com a API do YouTube
- **Janela PiP Customizada**: Player flutuante arrastável com controles
- **Histórico de Pesquisas**: Salva e exibe pesquisas recentes
- **Vídeos Recomendados**: Carrega vídeos em alta baseados no histórico
- **Interface Moderna**: Design responsivo inspirado no YouTube
- **Controles Avançados**: Play/pause, minimizar, fechar na janela PiP

### 🎬 Sistema PiP
- **Janela Flutuante**: Posicionada no canto inferior direito
- **Arrastável**: Clique e arraste pela tela
- **Controles Integrados**: Botões de minimizar e fechar
- **Overlay de Controle**: Hover para mostrar controles de reprodução
- **Responsivo**: Adapta-se a diferentes tamanhos de tela

### 🔍 Sistema de Busca
- **API YouTube v3**: Integração completa com busca e detalhes
- **Informações Completas**: Duração, visualizações, data de publicação
- **Fallback Inteligente**: Sistema de backup para casos de erro
- **Cache Local**: Histórico salvo no localStorage

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica e moderna
- **CSS3**: Estilos responsivos com Grid e Flexbox
- **JavaScript ES6+**: Lógica da aplicação
- **YouTube Data API v3**: Integração com a API oficial
- **LocalStorage**: Persistência de dados local

## 📋 Pré-requisitos

1. **Chave da API do YouTube**:
   - Acesse [Google Cloud Console](https://console.cloud.google.com/)
   - Crie um projeto ou selecione um existente
   - Ative a YouTube Data API v3
   - Crie credenciais (API Key)
   - Substitua `YOUTUBE_API_KEY` no código

2. **Navegador Moderno**:
   - Chrome 88+
   - Firefox 85+
   - Safari 14+
   - Edge 88+

## 🚀 Como Usar

### 1. Configuração
```javascript
// No arquivo youtube-pip.html, linha 200
const YOUTUBE_API_KEY = 'SUA_CHAVE_API_AQUI';
```

### 2. Execução
1. Abra o arquivo `youtube-pip.html` em um navegador
2. Digite sua pesquisa na barra de busca
3. Clique em um vídeo para ver as opções
4. Escolha "Janela PiP com Controles" para ativar o PiP

### 3. Controles PiP
- **Arrastar**: Clique e arraste a barra superior
- **Minimizar**: Botão ➖ (minimiza temporariamente)
- **Fechar**: Botão ✕ (fecha a janela PiP)
- **Play/Pause**: Hover sobre o vídeo e clique no botão ▶️

## 🎨 Interface

### Layout Principal
- **Header Fixo**: Barra de pesquisa sempre visível
- **Grid Responsivo**: Cards de vídeo adaptáveis
- **Estados Visuais**: Loading, erro e conteúdo

### Janela PiP
- **Posição Fixa**: Canto inferior direito
- **Tamanho Otimizado**: 320x180px (16:9)
- **Bordas Arredondadas**: Design moderno
- **Sombra Profunda**: Destaque visual

### Cores e Temas
- **Fundo Principal**: #0f0f0f (preto YouTube)
- **Cards**: #212121 (cinza escuro)
- **Destaque**: #ff0000 (vermelho YouTube)
- **Texto**: #ffffff (branco)

## 🔧 Estrutura do Código

### Classes Principais
```javascript
class YouTubeVideo {
    // Modelo de dados para vídeos
    constructor(json) { ... }
}
```

### Funções Principais
- `performSearch()`: Executa busca na API
- `activatePiP(video)`: Ativa janela PiP
- `makePiPDraggable()`: Torna PiP arrastável
- `loadSearchHistory()`: Carrega histórico local

### Event Listeners
- Busca por Enter ou clique
- Controles de modal
- Controles de PiP
- Arrastar janela PiP

## 📱 Responsividade

### Breakpoints
- **Desktop**: > 768px (Grid 3+ colunas)
- **Tablet**: 768px (Grid 2 colunas)
- **Mobile**: < 768px (Grid 1 coluna)

### Adaptações Mobile
- PiP redimensionado (280x157px)
- Busca em coluna única
- Botões maiores para touch

## 🔒 Segurança

### API Key
- **Nunca commite** a chave da API
- Use variáveis de ambiente em produção
- Configure restrições de domínio na Google Cloud

### CORS
- API do YouTube permite requisições do navegador
- Sem necessidade de proxy para desenvolvimento

## 🐛 Solução de Problemas

### Erro 403 (Quota Excedida)
```
Solução: Verifique sua quota na Google Cloud Console
```

### Erro de CORS
```
Solução: Execute via servidor local (não file://)
```

### PiP não funciona
```
Solução: Verifique se o navegador suporta Picture-in-Picture
```

### Vídeos não carregam
```
Solução: Verifique a chave da API e conexão
```

## 🚀 Melhorias Futuras

### Funcionalidades Planejadas
- [ ] Suporte a playlists
- [ ] Modo escuro/claro
- [ ] Favoritos e watch later
- [ ] Comentários integrados
- [ ] Download de vídeos (se permitido)
- [ ] Suporte a YouTube Shorts

### Otimizações
- [ ] Lazy loading de imagens
- [ ] Cache de resultados
- [ ] Service Worker para offline
- [ ] Compressão de assets

## 📄 Licença

Este projeto é de código aberto e está disponível sob a licença MIT.

## 🤝 Contribuição

Contribuições são bem-vindas! Por favor:

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📞 Suporte

Para suporte ou dúvidas:
- Abra uma issue no GitHub
- Verifique a documentação da API do YouTube
- Consulte os logs do console do navegador

---

**Desenvolvido com ❤️ usando JavaScript puro e a API do YouTube**
