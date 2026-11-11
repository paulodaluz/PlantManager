# PlantManager

Aplicativo mobile de cuidados com plantas desenvolvido na trilha React Native da NLW 5 da Rocketseat. Permite escolher plantas por ambiente, salvar cuidados no dispositivo e agendar lembretes de rega. O catálogo depende de uma API externa ao aplicativo.

[![Expo](https://img.shields.io/badge/Expo-41-blue)](https://docs.expo.dev/) [![TypeScript](https://img.shields.io/badge/TypeScript-4.0-blue)](https://www.typescriptlang.org/) [![License](https://img.shields.io/badge/License-MIT-blue)](LICENSE)

## 📋 Table of contents

- [✨ Features](#features)
- [🧪 Technologies](#technologies)
- [🛠️ Environment setup](#environment-setup)
- [🚀 Getting started](#getting-started)
- [🔌 API usage](#api-usage)
- [🗂️ Project structure](#project-structure)
- [✅ Testing and quality](#testing-and-quality)
- [🔎 Troubleshooting](#troubleshooting)
- [🤝 Contributing](#contributing)
- [📜 License](#license)

<a id="features"></a>

## ✨ Features

- Identificação local do usuário e navegação entre catálogo e plantas salvas.
- Catálogo paginado de plantas, filtro por ambiente e detalhes de cuidados.
- Persistência com AsyncStorage e agendamento/cancelamento de notificações.
- A implementação de recorrência semanal precisa de revisão: `savePlant` agenda e persiste dentro do ramo alternativo a `repeat_every === "week"`.

<a id="technologies"></a>

## 🧪 Technologies

| Tecnologia | Versão declarada | Finalidade |
| --- | --- | --- |
| [Expo](https://docs.expo.dev/) | `~41.0.0` | Projeto e integração mobile |
| [React](https://react.dev/) | `16.13.1` | Componentes |
| [React Native](https://reactnative.dev/) | arquivo `sdk-41.0.0` do Expo | Base nativa |
| [TypeScript](https://www.typescriptlang.org/docs/) | `~4.0.0` | Tipos |
| [Axios](https://axios-http.com/docs/intro) | `^0.21.1` | Catálogo HTTP |
| [AsyncStorage](https://react-native-async-storage.github.io/async-storage/) | `^1.15.3` | Dados locais |
| [Expo Notifications](https://docs.expo.dev/versions/latest/sdk/notifications/) | `~0.11.5` | Lembretes |

Não há lockfile nem versão de Node declarada. Node **14.21.3** foi escolhido como candidato compatível com o tooling histórico do Expo 41; isso não moderniza as dependências nem garante compatibilidade com Expo Go atual.

<a id="environment-setup"></a>

## 🛠️ Environment setup

```bash
git clone https://github.com/paulodaluz/PlantManager.git
cd PlantManager
nvm install 14.21.3
nvm use 14.21.3
npm install
```

O guia adota npm por não haver lockfile ou configuração que selecione outro gerenciador. `npm ci` não se aplica sem um lockfile. Não há `prepare` nem hooks de Git versionados.

`src/services/api.ts` contém uma URL LAN fixa na porta `3333`; não lê `.env`. Para usar o catálogo, a API precisa estar acessível pelo dispositivo e o endereço no cliente precisa corresponder a ela. `src/services/server.json` contém os dados `plants` e `plants_environments`, mas não existe script/dependência de servidor que os exponha. A preparação dessa API e a atualização do endereço são pendências; nenhum serviço adicional foi instalado nesta tarefa.

<a id="getting-started"></a>

## 🚀 Getting started

```bash
npm start
```

O script chama `expo start`. Expo 41 utiliza a CLI legada `expo-cli`, que não está declarada como dependência local. Se `expo` não estiver disponível, o comando não inicia; a instalação global dessa ferramenta está fora desta entrega. O QR code só pode ser utilizado quando houver uma CLI e um cliente compatíveis com o SDK 41.

Também existem `npm run android`, `npm run ios` e `npm run web`, que acionam os destinos do Expo. Não há script de build de produção. Teste identificação, carregamento do catálogo, cadastro e remoção de uma planta em dispositivo; esses fluxos não foram confirmados aqui. Screenshot mobile pendente para revisão.

<a id="api-usage"></a>

## 🔌 API usage

O cliente consulta, sem autenticação implementada:

| Método e caminho | Uso |
| --- | --- |
| `GET /plants?_sort=name&_order=asc&_page=1&_limit=8` | Catálogo paginado |
| `GET /plants_environments?_sort=title&_order=asc` | Ambientes disponíveis |

Os dados precisam conter os campos de `PlantProps` em `src/libs/storage.ts`, incluindo `id`, `name`, `about`, `water_tips`, `photo`, `environments` e `frequency`.

<a id="project-structure"></a>

## 🗂️ Project structure

| Caminho | Responsabilidade |
| --- | --- |
| `App.tsx` | Entrada e carregamento de fontes |
| `src/pages/` | Identificação, catálogo, cadastro e plantas salvas |
| `src/components/`, `src/styles/` | Componentes e estilos |
| `src/routes/` | Navegação |
| `src/libs/storage.ts` | AsyncStorage e notificações |
| `src/services/` | Cliente Axios e dados do catálogo |

<a id="testing-and-quality"></a>

## ✅ Testing and quality

Não há scripts de testes, lint ou build no manifesto. TypeScript está declarado como dependência de desenvolvimento; `npx --no-install tsc --noEmit` pode verificar os tipos após uma instalação bem-sucedida. A instalação npm foi concluída com Node **14.21.3/npm 6.14.18**, após uma primeira tentativa interrompida por timeout. A checagem TypeScript terminou com erros de sintaxe em declarações transitivas `@types/node`, incompatíveis com o TypeScript histórico resolvido. `npm start` não abriu a aplicação: o pacote solicitou instalar Expo CLI globalmente; a instalação global não foi realizada. Catálogo, notificações, build nativo e fluxos em dispositivo ficaram sem validação.

<a id="troubleshooting"></a>

## 🔎 Troubleshooting

- **`expo: not found`:** o script depende de CLI legada ausente no manifesto; não confunda instalação das dependências com ambiente executável.
- **Catálogo não carrega:** confirme API na porta `3333`, endereço acessível ao dispositivo e os dois recursos esperados.
- **Cliente Expo recusa o projeto:** SDK 41 é histórico; a compatibilidade do cliente e uma eventual atualização devem ser avaliadas separadamente.
- **Planta semanal não salva:** revisar o ramo `repeat_every === "week"` em `savePlant`.

<a id="contributing"></a>

## 🤝 Contributing

Crie uma branch a partir de `main`, descreva a mudança e suas verificações em um pull request. Não inclua dependências instaladas, arquivos de ambiente, credenciais ou artefatos de build. Revise o diff antes do commit.

<a id="license"></a>

## 📜 License

Licença [MIT](LICENSE). Os avisos de autoria e o ano do arquivo existente foram preservados.

---

<p align="center">Made with 💜 by <a href="https://github.com/paulodaluz">Paulo da Luz</a></p>
