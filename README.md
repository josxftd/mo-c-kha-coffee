# ☕ mockha coffee - Blockchain-Verified Coffee Marketplace

A Next.js e-commerce platform for coffee that integrates with Ethereum Attestation Service (EAS) to display verified transaction data including price, origin, date, and detailed coffee information.

## Features

- 🛍️ **Coffee Product Catalog** - Browse premium coffees from around the world
- 🔗 **Blockchain Verification** - Every transaction is recorded on Ethereum using EAS
- 📊 **Transaction History** - View all your verified coffee purchases with attestation data
- 🌍 **Origin Tracking** - See detailed information about coffee origin, farm, elevation, and processing methods
- 💰 **Transparent Pricing** - All prices are publicly verifiable on the blockchain

## Tech Stack

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Styling
- **Ethereum Attestation Service (EAS)** - Blockchain verification
- **Ethers.js** - Ethereum interactions

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- An Ethereum RPC provider (Infura, Alchemy, or similar)
- (Optional) MetaMask or another Web3 wallet for full functionality

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd vibe-eas
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your RPC provider URL:
```env
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_API_KEY
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## EAS Schema Setup

The app uses a custom EAS schema for coffee transactions. To set up your schema:

1. Go to [EAS Schema Registry](https://attest.sh) (or the appropriate registry for your network)
2. Register the following schema:
```
bytes32 transactionHash,string coffeeName,string origin,string date,string price,string roastLevel,uint256 quantity,string certification,string farm,string elevation,string varietal,string processingMethod
```

3. Copy the schema UID and add it to your `.env.local`:
```env
NEXT_PUBLIC_EAS_SCHEMA_UID=your-schema-uid-here
```

4. Update `lib/eas.ts` with your schema UID in the `EAS_CONFIG` object.

## Project Structure

```
vibe-eas/
├── app/
│   ├── page.tsx              # Home page with product catalog
│   ├── transactions/
│   │   └── page.tsx          # Transaction history page
│   ├── products/
│   │   └── [id]/
│   │       └── page.tsx      # Individual product page
│   └── layout.tsx             # Root layout
├── components/
│   ├── AttestationCard.tsx   # Displays attestation data
│   ├── AttestationList.tsx   # List of attestations
│   └── CoffeeProductCard.tsx # Product card component
├── lib/
│   └── eas.ts                # EAS service integration
└── types/
    └── attestation.ts        # TypeScript types for attestations
```

## Usage

### Viewing Products

Navigate to the home page to browse the coffee catalog. Each product shows:
- Price in USD
- Origin country
- Roast level
- Certifications (Organic, Fair Trade, etc.)

### Viewing Transactions

1. Go to the "My Transactions" page
2. View mock attestation data (currently using demo data)
3. Search for specific attestations by UID
4. (With wallet integration) Load your actual attestations

### Transaction Data

Each verified transaction includes:
- **Price Paid** - Amount in USD
- **Date** - Transaction date
- **Coffee Name** - Product name
- **Origin** - Country/region
- **Roast Level** - Light, Medium, Dark, etc.
- **Quantity** - Number of bags purchased
- **Farm Details** - Farm name, elevation, varietal, processing method
- **Certifications** - Organic, Fair Trade, etc.
- **Transaction Hash** - Link to blockchain transaction

## EAS Integration

The app uses the `@ethereum-attestation-service/eas-sdk` package to:

- **Fetch Attestations** - Retrieve coffee transaction attestations by UID or recipient address
- **Decode Schema Data** - Parse attestation data using SchemaEncoder
- **Create Attestations** - (Requires wallet connection) Create new transaction attestations

See `lib/eas.ts` for the complete EAS service implementation.

## Configuration

### Network Configuration

By default, the app is configured for Sepolia testnet. To change networks, update `lib/eas.ts`:

```typescript
export const EAS_CONFIG = {
  address: "0x...", // EAS contract address for your network
  chainId: 1,       // Mainnet: 1, Sepolia: 11155111
  schemaUID: "...", // Your registered schema UID
};
```

### RPC Provider

You can use any Ethereum RPC provider:
- [Infura](https://infura.io)
- [Alchemy](https://alchemy.com)
- [QuickNode](https://quicknode.com)
- Public RPC endpoints (not recommended for production)

## Future Enhancements

- [ ] Wallet connection (MetaMask, WalletConnect)
- [ ] Purchase flow with real ETH transactions
- [ ] Automatic attestation creation on purchase
- [ ] Product image uploads
- [ ] User authentication
- [ ] Shopping cart functionality
- [ ] Admin dashboard for managing products

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
