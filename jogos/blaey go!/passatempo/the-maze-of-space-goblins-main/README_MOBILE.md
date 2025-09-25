# The Maze of Space Goblins - Versão Mobile

## Descrição
Esta é uma versão adaptada do jogo "The Maze of Space Goblins" para dispositivos móveis, com controles touch otimizados.

## Características da Versão Mobile

### Controles Touch
- **Direcional Virtual**: Controle direcional na parte inferior da tela
  - Botões ↑ ↓ ← → para movimento
  - Design responsivo que se adapta ao tamanho da tela
- **Botões de Ação**:
  - **ENTER**: Botão verde para confirmar/começar
  - **FIRE**: Botão laranja para ação de tiro
- **Touch na Tela**: Tocar em qualquer lugar da tela funciona como ENTER

### Adaptações para Mobile
- Viewport otimizado para dispositivos móveis
- Controles touch responsivos
- Prevenção de zoom e menu de contexto
- Interface adaptável para diferentes tamanhos de tela
- Suporte a touch e mouse (para testes em desktop)

## Como Executar

### Opção 1: Servidor Python
```bash
cd /caminho/para/the-maze-of-space-goblins-main
python3 serve_mobile.py
```
Acesse: http://localhost:8080/index_mobile_simple.html

### Opção 2: Servidor HTTP Simples
```bash
cd /caminho/para/the-maze-of-space-goblins-main
python3 -m http.server 8080
```
Acesse: http://localhost:8080/index_mobile_simple.html

## Arquivos da Versão Mobile

- `index_mobile_simple.html` - Versão mobile completa e funcional
- `index_mobile.html` - Versão mobile que requer compilação TypeScript
- `serve_mobile.py` - Servidor Python para testar localmente

## Controles

### Desktop (para testes)
- Setas do teclado: Movimento
- Enter: Confirmar/começar
- Espaço: Ação de tiro

### Mobile
- **Direcional Pad**: Use os botões direcionais na parte inferior
- **Botão ENTER**: Toque no botão verde para confirmar
- **Botão FIRE**: Toque no botão laranja para ação de tiro
- **Touch na Tela**: Toque em qualquer lugar da tela para ENTER

## Características Técnicas

### CSS Responsivo
- Design flexível que se adapta a diferentes tamanhos de tela
- Controles otimizados para dedos
- Prevenção de comportamentos indesejados do navegador

### JavaScript
- Sistema de controles touch nativo
- Simulação de eventos de teclado para compatibilidade
- Loop de jogo otimizado para mobile
- Prevenção de zoom e menu de contexto

### Viewport
- Meta tag viewport otimizada para mobile
- `user-scalable=no` para prevenir zoom acidental
- `touch-action: none` para controle total dos toques

## Testando

1. Execute o servidor
2. Acesse o jogo em um dispositivo móvel ou use as ferramentas de desenvolvedor do navegador para simular mobile
3. Teste os controles touch
4. Verifique a responsividade em diferentes tamanhos de tela

## Notas de Desenvolvimento

- A versão `index_mobile_simple.html` é uma implementação simplificada que funciona imediatamente
- A versão `index_mobile.html` requer compilação dos arquivos TypeScript originais
- Os controles são compatíveis com touch e mouse
- O jogo mantém a essência do original mas com interface adaptada para mobile
