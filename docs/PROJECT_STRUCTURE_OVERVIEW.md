# Pay2Join MiniApp - Complete Project Structure Overview

## 🎯 Project Purpose

This is a **Pay-to-Join** (Paywall) Telegram Mini App built as part of the **TON Dev Experience Lab** program. The project demonstrates:

1. **Smart Contract Development** - A paywall contract written in Tolk (TON's contract language)
2. **Telegram Mini App Integration** - React-based frontend using Telegram UI components
3. **TON Connect Integration** - Wallet connection and transaction handling
4. **End-to-End Payment Flow** - Users pay TON to unlock access to content

The project serves as both:
- A **working prototype** demonstrating TON development patterns
- A **documentation testing ground** for identifying gaps in TON's developer documentation

---

## 📁 Project Structure

```
pay2join-miniapp/
├── contracts/              # Smart contract codebase
├── src/                   # Frontend React application
├── docs/                  # Documentation and feedback materials
├── public/                # Static assets
└── Configuration files    # Package.json, tsconfig, vite.config, etc.
```

---

## 🔷 Smart Contracts (`/contracts`)

### Purpose
Contains the Pay2Join smart contract and all related tooling for development, testing, and deployment.

### Structure

```
contracts/
├── contracts/
│   └── pay2_join.tolk     # Main smart contract (Tolk language)
├── wrappers/
│   ├── Pay2Join.ts        # TypeScript wrapper for contract interaction
│   └── Pay2Join.compile.ts # Compilation utilities
├── tests/
│   └── Pay2Join.spec.ts   # Jest test suite
├── scripts/
│   ├── deployPay2Join.ts  # Deployment script
│   └── buyAccessAndCheck.ts # Testing script
├── package.json           # Contract dependencies
├── tsconfig.json          # TypeScript config
└── jest.config.ts         # Test configuration
```

### Key Files

#### `pay2_join.tolk` (Smart Contract)
- **Language**: Tolk (TON's contract language)
- **Purpose**: Paywall contract that manages access based on payments
- **Key Features**:
  - Users pay `price` TON to buy access
  - Access expires after `accessDurationSec` (default: 30 days)
  - Owner can withdraw funds
  - Owner can update price and duration
  - Get methods to check access status

**Storage Structure**:
```tolk
struct Storage {
    owner: address
    price: coins
    accessDurationSec: uint32
    accessUntil: map<address, uint32>  // User address -> expiry timestamp
}
```

**Messages**:
- `BuyAccess` (0x4f0b7a11) - User pays to get access
- `Withdraw` (0x0f6d8bb3) - Owner withdraws funds
- `SetPrice` (0x6c3e0f71) - Owner updates price
- `SetAccessDuration` (0x5c5a2f42) - Owner updates duration

**Get Methods**:
- `getOwner()` - Returns contract owner
- `getPrice()` - Returns current price
- `getAccessUntil(user)` - Returns expiry timestamp for user
- `hasAccess(user)` - Returns boolean if user has active access

#### `wrappers/Pay2Join.ts` (TypeScript Wrapper)
- Provides type-safe contract interaction
- Methods for sending transactions (`sendBuyAccess`, `sendWithdraw`, etc.)
- Methods for reading state (`getOwner`, `getPrice`, `hasAccess`, etc.)
- Handles message serialization/deserialization

#### `tests/Pay2Join.spec.ts` (Test Suite)
- Uses `@ton/sandbox` for local testing
- Tests deployment, access granting, withdrawal permissions
- Validates contract behavior without deploying to testnet

---

## 🎨 Frontend (`/src`)

### Purpose
React-based Telegram Mini App that provides the user interface for the Pay2Join functionality.

### Structure

```
src/
├── components/            # Reusable React components
│   ├── App.tsx           # Main app component with routing
│   ├── Page.tsx          # Page wrapper component
│   ├── DisplayData/      # Data display component
│   ├── Link/             # Navigation link component
│   ├── RGB/              # Color display component
│   ├── Root.tsx          # Root component
│   ├── ErrorBoundary.tsx # Error handling
│   └── EnvUnsupported.tsx # Environment check
├── pages/                # Page components
│   ├── IndexPage/        # Home page
│   ├── TONConnectPage/   # Main Pay2Join functionality
│   ├── InitDataPage.tsx   # Telegram init data display
│   ├── LaunchParamsPage.tsx # Launch parameters
│   └── ThemeParamsPage.tsx  # Theme information
├── navigation/
│   └── routes.tsx        # Route definitions
├── ton/
│   └── pay2Join.ts       # Frontend utilities for contract interaction
├── css/                  # CSS utilities
├── helpers/              # Helper functions
├── index.tsx             # Application entry point
├── init.ts               # Initialization logic
├── mockEnv.ts            # Mock Telegram environment (dev)
└── polyfills.ts          # Browser polyfills
```

### Key Files

#### `pages/TONConnectPage/TONConnectPage.tsx` (Main Feature)
- **Purpose**: Main UI for Pay2Join functionality
- **Features**:
  - TON Connect wallet connection
  - Contract address input
  - "Pay to Join" button
  - Transaction status display
  - Error handling

**Flow**:
1. User connects wallet via TON Connect
2. User pastes deployed contract address
3. User clicks "Pay to Join"
4. Transaction sent via TON Connect UI
5. Success/error message displayed

#### `ton/pay2Join.ts` (Frontend Utilities)
- `buildBuyAccessPayloadBase64()` - Builds transaction payload
- `PAY2JOIN_BUY_ACCESS_OP` - Operation code constant
- `PAY2JOIN_DEFAULT_PRICE_TON` - Default price (0.5 TON)

#### `components/App.tsx` (Routing)
- Sets up React Router with HashRouter
- Integrates Telegram UI theme (dark/light mode)
- Routes to different pages

### Technology Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **@tma.js/sdk-react** - Telegram Mini App SDK
- **@tonconnect/ui-react** - TON Connect integration
- **@telegram-apps/telegram-ui** - Telegram UI components
- **react-router-dom** - Client-side routing
- **@ton/core** - TON core utilities

---

## 📚 Documentation (`/docs`)

### Purpose
Contains all documentation related to the TON Dev Experience Lab program, including guides, templates, and feedback examples.

### Key Documents

#### Week 2 Documentation
- **`Week_2_Documentation_Map.md`** - Maps tasks to TON documentation sections
- **`Week_2_Implementation_Guide.md`** - Detailed task instructions by persona
- **`Week_2_Feedback_Template.md`** - Template for structured feedback
- **`Week_2_Quick_Reference.md`** - Quick reference guide

#### Feedback Examples
- **`Example_Feedback_Smart_Contracts.md`** - Example feedback for contract development
- **`Example_Feedback_dApp.md`** - Example feedback for dApp development
- **`Example_Feedback_Telegram_MiniApp.md`** - Example feedback for TMA development
- **`Example_Feedbacks_Summary.md`** - Overview of example feedbacks

#### Guides
- **`What_Can_Be_Added_to_TON_Docs.md`** - Guide on identifying documentation gaps
- **`Documentation_Gap_Tracker.md`** - Worksheet for tracking gaps
- **`i need to write docs helping ton people.txt`** - Program announcement and overview

### Documentation Focus Areas

The documentation evaluates TON docs across three metrics:
1. **UX** - User experience and intuitiveness
2. **Clarity** - How clear and understandable the docs are
3. **Factual Accuracy** - Whether docs match reality

---

## ⚙️ Configuration Files

### Root Level

#### `package.json`
- Frontend dependencies (React, TON Connect, Telegram UI)
- Scripts: `dev`, `dev:https`, `build`, `lint`, `deploy`
- Uses npm (not pnpm/yarn) as specified in template

#### `vite.config.ts`
- Vite configuration for React app
- SSL certificate plugin for HTTPS dev server
- Dynamic TON Connect manifest for dev mode
- Path aliases (`@/` → `src/`)

#### `tsconfig.json`
- TypeScript configuration
- Path mappings for imports

#### `.env`
- `VITE_PAY2JOIN_ADDRESS` - Deployed contract address (testnet)
- `VITE_TONCONNECT_MANIFEST_URL` - Manifest URL override (for LAN/tunnel access)

### Contracts Level

#### `contracts/package.json`
- Contract development dependencies
- Blueprint CLI for contract management
- Testing frameworks (Jest, @ton/sandbox)
- Tolk compiler

---

## 🔄 Project Workflow

### Development Flow

1. **Contract Development**
   ```bash
   cd contracts
   npm install
   npm test              # Run tests
   npm run build         # Compile contract
   npm run start         # Deploy to testnet
   ```

2. **Frontend Development**
   ```bash
   npm install
   npm run dev:https     # Start dev server with HTTPS
   # Access via https://localhost:5173
   ```

3. **Integration**
   - Deploy contract to testnet
   - Copy contract address to `.env`
   - Update `VITE_PAY2JOIN_ADDRESS` in `.env`
   - Test payment flow in Mini App

### Deployment Flow

1. **Contract Deployment**
   - Run `npm run start` in `contracts/`
   - Script deploys to testnet/mainnet
   - Contract address is displayed

2. **Frontend Deployment**
   - Build: `npm run build`
   - Deploy: `npm run deploy` (GitHub Pages)
   - Or deploy to Vercel/Netlify

---

## 🎯 Key Concepts

### Paywall Pattern
- **On-chain**: Payment verification, access state, expiry timestamps
- **Off-chain**: Actual content (group links, premium pages, files)
- Frontend checks `hasAccess()` get method to unlock content

### TON Connect Flow
1. User clicks "Connect Wallet"
2. Wallet app opens (Tonkeeper, etc.)
3. User approves connection
4. Frontend receives wallet info
5. User can send transactions via TON Connect UI

### Contract Interaction
1. Frontend builds transaction payload (opcode + data)
2. Sends transaction via TON Connect
3. User approves in wallet
4. Transaction broadcast to TON network
5. Frontend can poll get methods to verify state

---

## 🧪 Testing Strategy

### Contract Tests (`contracts/tests/`)
- Unit tests using `@ton/sandbox`
- Tests deployment, access granting, permissions
- Validates contract logic without network calls

### Frontend Testing
- Manual testing in Telegram Mini App environment
- Mock environment for local development (`mockEnv.ts`)
- Integration testing with deployed contract

---

## 📊 Project Status

### Completed Features
- ✅ Pay2Join smart contract (Tolk)
- ✅ TypeScript wrapper for contract
- ✅ Test suite for contract
- ✅ Deployment scripts
- ✅ Telegram Mini App frontend
- ✅ TON Connect integration
- ✅ Payment flow implementation
- ✅ Error handling

### Documentation Status
- ✅ Week 2 task guides
- ✅ Feedback templates
- ✅ Example feedbacks
- ✅ Documentation gap tracking tools

---

## 🔗 Related Resources

### TON Documentation
- [TON Docs](https://docs.ton.org/)
- [TON Connect](https://docs.ton.org/develop/dapps/ton-connect/overview)
- [Telegram Mini Apps](https://docs.telegram-mini-apps.com/)
- [Tolk Language](https://tolk-lang.org/)

### Tools
- [Blueprint](https://github.com/ton-org/blueprint) - Contract development framework
- [TON Sandbox](https://github.com/ton-org/sandbox) - Local testing
- [TON Connect UI](https://github.com/ton-connect/ui) - Wallet connection UI

---

## 🎓 Learning Outcomes

This project demonstrates:
1. **Smart Contract Development** on TON using Tolk
2. **Telegram Mini App** development with React
3. **TON Connect** wallet integration
4. **End-to-End Payment Flow** implementation
5. **Documentation Evaluation** methodology

---

## 📝 Notes

- The project uses **Tolk** (not Tact or FunC) for the smart contract
- Frontend is based on the official Telegram Mini Apps React template
- Contract uses a simple map-based access tracking system
- Access duration is configurable (default: 30 days)
- Owner can withdraw funds and update contract parameters

---

**Last Updated**: Based on current codebase structure
**Project Type**: TON Dev Experience Lab - Week 2 Mini Project
**Status**: Functional prototype with documentation feedback framework


