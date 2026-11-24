# Aviso-de-Praias

Aplicativo mobile desenvolvido em **React Native com Expo** para monitorar a qualidade da água e a balneabilidade das praias do litoral de Pernambuco.

## Estrutura das Telas

- **Tela 1 (`HomeScreen.js`)**: Lista de praias com filtro dinâmico por município e badges de status (🟢 Própria, 🟡 Atenção, 🔴 Imprópria).
- **Tela 2 (`DetailScreen.js`)**: Diagnóstico detalhado, histórico de medição, coordenadas e alerta condicional de interdição.
- **Tela 3 (`MapScreen.js`)**: Mapa interativo com marcadores coloridos por status e foco automático na praia selecionada.
- **Tela 4 (`GuideScreen.js`)**: Orientações educativas sobre saúde e link para o boletim oficial da CPRH-PE.

## Como Executar

1. Extraia este arquivo ZIP na sua máquina.
2. No terminal, dentro da pasta do projeto, instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o projeto Expo:
   ```bash
   npx expo start
   ```
4. Abra o app **Expo Go** no celular e escaneie o QR Code exibido no terminal!
