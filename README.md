# Prime Coaching App

<div align="center">
  <img src="assets/prime.png" alt="Prime Coaching Logo" width="200" height="200" />

  <h3>Aplicativo de Coaching Personalizado</h3>
  <p>Uma solução completa para acompanhamento e evolução pessoal</p>
</div>

## 📱 Sobre o Projeto

O **Prime Coaching App** é um aplicativo mobile desenvolvido em React Native que oferece uma experiência completa de coaching personalizado. Com uma interface intuitiva e moderna, o app guia os usuários através de um processo de onboarding detalhado para coletar informações essenciais e criar um perfil personalizado.

## ✨ Funcionalidades

### 🔐 Autenticação
- Sistema de login com email e senha
- Validação de credenciais
- Recuperação de senha (em desenvolvimento)
- Gerenciamento seguro de tokens de autenticação

### 📋 Onboarding Completo
O aplicativo possui um fluxo de onboarding em 5 etapas:

1. **Boas-vindas** - Apresentação personalizada com o nome do usuário
2. **Seleção de Gênero** - Escolha entre masculino e feminino
3. **Data de Nascimento** - Input de data com validação completa
4. **Altura** - Entrada de altura em centímetros
5. **Peso** - Entrada de peso em quilogramas com suporte a decimais

### 🏠 Tela Principal (Home)
- Exibição completa dos dados do usuário
- Visualização das informações de onboarding
- Botão de logout com confirmação
- Interface limpa e organizada

### 🎨 Interface & UX
- Design moderno e minimalista
- Componentes reutilizáveis e consistentes
- Validação em tempo real de formulários
- Feedback visual de loading states
- Transições suaves entre telas
- Suporte a teclado numérico otimizado

## 🚀 Tecnologias Utilizadas

### Core
- **React Native** (0.81.5) - Framework para desenvolvimento mobile multiplataforma
- **Expo SDK 54** - Plataforma de desenvolvimento e build
- **TypeScript** - Tipagem estática e melhor DX

### Navegação
- **React Navigation v7** - Sistema de navegação com stack navigator
- Navegação aninhada (RootStack → AuthStack/AppStack → OnboardingStack)

### Gerenciamento de Estado
- **React Context API** - Para autenticação global
- **React Hook Form** - Gerenciamento de formulários
- **TanStack Query v5** - Cache e sincronização de dados do servidor

### Armazenamento
- **AsyncStorage** - Persistência de dados locais
- **AuthTokensManager** - Gerenciamento seguro de tokens

### UI/UX
- **React Native Safe Area Context** - Adaptação a diferentes telas
- **Expo Vector Icons** - Ícones Feather
- **Custom Theme System** - Sistema de temas personalizado
- **Space Grotesk** - Fonte principal via Google Fonts

## 🏗️ Arquitetura do Projeto

O projeto segue uma arquitetura modular e escalável com clara separação de responsabilidades:

```
src/
├── app/                    # Camada de lógica da aplicação
│   ├── contexts/          # Contextos React (AuthContext)
│   ├── hooks/             # Custom hooks reutilizáveis
│   ├── lib/              # Bibliotecas core (AuthTokensManager, queryClient)
│   ├── navigation/        # Configuração de navegação
│   ├── services/          # Serviços de API
│   └── types/            # Definições de tipos TypeScript
│
├── ui/                    # Camada de apresentação
│   ├── components/       # Componentes reutilizáveis
│   │   ├── AppText/     # Componente de texto padrão
│   │   ├── Button/      # Botão customizado com variantes
│   │   ├── Input/       # Input base
│   │   ├── DateInput/   # Input especializado para datas
│   │   ├── NumericInput/# Input numérico otimizado
│   │   ├── GenderSelector/# Seletor de gênero
│   │   └── FormGroup/   # Agrupador de formulários
│   │
│   ├── icons/           # Componentes SVG de ícones
│   ├── screens/         # Telas da aplicação
│   │   ├── Greetings/   # Tela inicial
│   │   ├── Login/       # Autenticação
│   │   ├── Onboarding/  # Fluxo de onboarding
│   │   └── Home/        # Tela principal
│   │
│   └── styles/          # Sistema de estilos e tema
│       ├── theme/       # Definições do tema (cores, fontes, espaçamentos)
│       └── utils/       # Utilitários de estilo (createVariants)
│
└── data/                # Dados mock para desenvolvimento
    └── mock.json       # Usuários e dados de teste
```

### Padrões de Desenvolvimento

#### 🔄 Fluxo de Navegação
```
App
├── RootStack (controla autenticação)
│   ├── AuthStack (não autenticado)
│   │   ├── Greetings
│   │   └── Login
│   │
│   ├── Onboarding (primeiro acesso)
│   │   └── OnboardingStack (5 steps)
│   │
│   └── AppStack (autenticado)
│       └── Home
```

#### 📦 Componentes
- **Componentes funcionais** com hooks
- **TypeScript** para type safety
- **Separação** entre lógica e apresentação
- **Styles** em arquivos separados
- **Variants system** para múltiplas variações

#### 🎯 Path Aliases
```typescript
@app/*  → ./src/app/*
@ui/*   → ./src/ui/*
@data/* → ./src/data/*
```

## 🛠️ Instalação e Configuração

### Pré-requisitos
- Node.js (v18 ou superior)
- pnpm (gerenciador de pacotes)
- Expo CLI
- iOS Simulator (Mac) ou Android Emulator

### Passos para instalação

1. **Clone o repositório**
```bash
git clone https://github.com/GersonRocha9/primecoachingapp
cd primecoachingapp
```

2. **Instale as dependências**
```bash
pnpm install
```

3. **Inicie o servidor de desenvolvimento**
```bash
pnpm start
```

4. **Execute no simulador/emulador**
```bash
# iOS
pnpm ios

# Android
pnpm android

## 📝 Scripts Disponíveis

- `pnpm start` - Inicia o servidor Expo
- `pnpm ios` - Executa no iOS Simulator
- `pnpm android` - Executa no Android Emulator
- `pnpm lint` - Executa o linter
- `pnpm format` - Formata o código

## 🔄 EAS Workflows

O projeto utiliza **EAS Workflows** para automação de CI/CD no Expo Application Services. Os workflows estão configurados na pasta `.eas/workflows/`:

### 📋 CI - Integração Contínua (`ci.yml`)
Executa automaticamente a cada push na branch `main`:
- ✅ **TypeScript Compiler** - Verifica erros de tipagem (`tsc --noEmit`)
- ✅ **ESLint** - Analisa qualidade do código e padrões estabelecidos

### 🚀 CD - Deploy Contínuo (`cd.yml`)
Cria builds de preview automaticamente a cada push na branch `main`:
- 📱 **Build Android** - Gera APK/AAB de preview para Android
- 🍎 **Build iOS** - Gera IPA de preview para iOS

Esses workflows garantem que o código mantém a qualidade e que builds de preview estão sempre disponíveis para testes.

## 🔑 Credenciais de Teste

O app utiliza dados mockados para desenvolvimento. Você pode usar as seguintes credenciais:

| Email | Senha |
|-------|-------|
| gerson@prime.com | prime123 |
| guilherme@prime.com | senha123 |
| beto@prime.com | prime123 |
