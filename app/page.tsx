"use client";

import { CoffeeProduct, CoffeeTransactionAttestation } from "@/types/attestation";
import FeaturedCoffeeCard from "@/components/FeaturedCoffeeCard";
import Link from "next/link";

// Featured coffees - showcased prominently
const featuredCoffees: CoffeeProduct[] = [
  {
    id: "1",
    name: "Ethiopian Yirgacheffe",
    description: "A bright and floral coffee with notes of jasmine, bergamot, and blueberry. Grown in the highlands of Yirgacheffe, Ethiopia.",
    price: "24.99",
    origin: "Ethiopia",
    roastLevel: "Light",
    certifications: ["Organic", "Fair Trade"],
    farm: "Kochere Cooperative",
    elevation: "1,700-2,200m",
    varietal: "Heirloom",
    processingMethod: "Washed",
  },
  {
    id: "2",
    name: "Colombian Supremo",
    description: "A balanced coffee with notes of caramel, red apple, and cocoa. From the Huila region of Colombia.",
    price: "19.99",
    origin: "Colombia",
    roastLevel: "Medium",
    certifications: ["Rainforest Alliance"],
    farm: "Finca El Paraiso",
    elevation: "1,500-1,800m",
    varietal: "Caturra, Colombia",
    processingMethod: "Washed",
  },
  {
    id: "3",
    name: "Sumatran Mandheling",
    description: "A bold, full-bodied coffee with earthy notes and low acidity. From the Lintong region of Sumatra.",
    price: "22.99",
    origin: "Indonesia",
    roastLevel: "Dark",
    certifications: ["Organic"],
    farm: "Lake Toba Region",
    elevation: "1,200-1,500m",
    varietal: "Typica",
    processingMethod: "Wet-hulled",
  },
];

// Mock attestations - company-created EAS attestations for transparency
// These represent transactions when the company sourced the coffee
const mockAttestations: CoffeeTransactionAttestation[] = [
  {
    uid: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
    schema: "0x...",
    attester: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
    recipient: "0x8ba1f109551bD432803012645Hac136c80C3",
    refUID: null,
    time: BigInt(1704067200),
    expirationTime: null,
    revocationTime: null,
    version: 1,
    nonce: BigInt(0),
    data: {
      transactionHash: "0xabc123...",
      coffeeName: "Ethiopian Yirgacheffe",
      origin: "Ethiopia",
      date: "2024-01-15",
      price: "24.99",
      roastLevel: "Light",
      quantity: 500,
      certification: "Organic, Fair Trade",
      farm: "Kochere Cooperative",
      elevation: "1,700-2,200m",
      varietal: "Heirloom",
      processingMethod: "Washed",
    },
  },
  {
    uid: "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
    schema: "0x...",
    attester: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
    recipient: "0x8ba1f109551bD432803012645Hac136c80C3",
    refUID: null,
    time: BigInt(1704153600),
    expirationTime: null,
    revocationTime: null,
    version: 1,
    nonce: BigInt(1),
    data: {
      transactionHash: "0xdef456...",
      coffeeName: "Colombian Supremo",
      origin: "Colombia",
      date: "2024-01-16",
      price: "19.99",
      roastLevel: "Medium",
      quantity: 750,
      certification: "Rainforest Alliance",
      farm: "Finca El Paraiso",
      elevation: "1,500-1,800m",
      varietal: "Caturra, Colombia",
      processingMethod: "Washed",
    },
  },
  {
    uid: "0xfedcba0987654321fedcba0987654321fedcba0987654321fedcba0987654321",
    schema: "0x...",
    attester: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
    recipient: "0x8ba1f109551bD432803012645Hac136c80C3",
    refUID: null,
    time: BigInt(1704240000),
    expirationTime: null,
    revocationTime: null,
    version: 1,
    nonce: BigInt(2),
    data: {
      transactionHash: "0xghi789...",
      coffeeName: "Sumatran Mandheling",
      origin: "Indonesia",
      date: "2024-01-17",
      price: "22.99",
      roastLevel: "Dark",
      quantity: 600,
      certification: "Organic",
      farm: "Lake Toba Region",
      elevation: "1,200-1,500m",
      varietal: "Typica",
      processingMethod: "Wet-hulled",
    },
  },
];

// Match attestations to products by coffee name
const matchAttestationToProduct = (product: CoffeeProduct, attestations: CoffeeTransactionAttestation[]) => {
  return attestations.find(att => att.data.coffeeName === product.name) || attestations[0];
};

export default function Home() {
  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-stone-900">☕ mo[c]kha coffee</h1>
              <p className="text-stone-600 mt-1">being honest about coffee</p>
            </div>
            <nav className="flex gap-4">
              <Link
                href="/"
                className="px-4 py-2 text-stone-700 hover:text-stone-900 font-medium transition-colors"
              >
                Products
              </Link>
              <Link
                href="/transparency"
                className="px-4 py-2 text-stone-700 hover:text-stone-900 font-medium transition-colors"
              >
                Transparency
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-stone-700 via-stone-800 to-stone-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            WIP WIP WIP WIP WIP
          </h2>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Every coffee source is verified on [E]thereum [A]ttestation [S]ervice
          </p>
          <p className="text-lg opacity-80 max-w-2xl mx-auto">
            We record all our coffee sourcing transactions on the blockchain for complete transparency.
            Know exactly where your coffee comes from, how much we paid, and when it was sourced.
          </p>
        </div>
      </section>

      {/* Featured Coffees Section with Embedded Transparency Data */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-stone-900 mb-3">Featured Coffees</h2>
          <p className="text-stone-600 text-lg">
            Discover our premium selection with complete supply chain transparency
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredCoffees.map((product) => {
            const attestation = matchAttestationToProduct(product, mockAttestations);
            return (
              <FeaturedCoffeeCard 
                key={product.id} 
                product={product} 
                attestation={attestation}
              />
            );
          })}
        </div>
      </section>

      {/* Info Section */}
      <section className="bg-white py-16 mt-12 border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-4">🔗</div>
              <h3 className="text-xl font-bold text-stone-900 mb-2">Blockchain Verified</h3>
              <p className="text-stone-600">
                Every sourcing transaction is recorded on Ethereum using EAS (Ethereum Attestation Service)
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">🌍</div>
              <h3 className="text-xl font-bold text-stone-900 mb-2">Origin Tracking</h3>
              <p className="text-stone-600">
                See the exact origin, farm, elevation, and processing method for each coffee
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">💰</div>
              <h3 className="text-xl font-bold text-stone-900 mb-2">Transparent Pricing</h3>
              <p className="text-stone-600">
                All sourcing prices are publicly verifiable on the blockchain
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-300 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-stone-400">
            © 2024 mockha coffee | Powered by Ethereum Attestation Service
          </p>
        </div>
      </footer>
    </div>
  );
}
