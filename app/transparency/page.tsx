"use client";

import { useState, useEffect } from "react";
import { CoffeeTransactionAttestation } from "@/types/attestation";
import { easService } from "@/lib/eas";
import AttestationList from "@/components/AttestationList";
import Link from "next/link";

export default function TransparencyPage() {
  const [attestations, setAttestations] = useState<CoffeeTransactionAttestation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchUID, setSearchUID] = useState("");
  const [searching, setSearching] = useState(false);

  // Mock attestations for demo purposes
  // In production, these would come from EAS
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
        price: "24.99", // Price in USD
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
        price: "19.99", // Price in USD
        roastLevel: "Medium",
        quantity: 750,
        certification: "Rainforest Alliance",
        farm: "Finca El Paraiso",
        elevation: "1,500-1,800m",
        varietal: "Caturra, Colombia",
        processingMethod: "Washed",
      },
    },
  ];

  useEffect(() => {
    // Load mock attestations for demo
    // In production, you would fetch real attestations from EAS
    setAttestations(mockAttestations);
    setLoading(false);
  }, []);

  const handleSearchByUID = async () => {
    if (!searchUID.trim()) return;

    setSearching(true);
    setError(null);

    try {
      const attestation = await easService.getAttestation(searchUID.trim());
      if (attestation) {
        setAttestations([attestation]);
      } else {
        setError("Attestation not found. Please check the UID.");
      }
    } catch (err) {
      setError("Error fetching attestation. Please try again.");
      console.error(err);
    } finally {
      setSearching(false);
    }
  };

  const handleLoadMyAttestations = async () => {
    // This would require wallet connection
    // For demo purposes, we'll show an alert
    alert("Wallet connection required. This feature will load attestations for your connected wallet address.");
  };

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-stone-900">Supply Chain Transparency</h1>
              <p className="text-stone-600 mt-1">View verified coffee sourcing attestations recorded on Ethereum Attestation Service</p>
            </div>
            <Link
              href="/"
              className="px-4 py-2 text-stone-700 hover:text-stone-900 font-medium transition-colors"
            >
              ← Back to Products
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 border border-stone-200">
          <h2 className="text-xl font-bold text-stone-900 mb-4">Search Sourcing Attestations</h2>
          <div className="flex gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Enter Attestation UID (0x...)"
                value={searchUID}
                onChange={(e) => setSearchUID(e.target.value)}
                className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-stone-500 focus:border-transparent"
                onKeyPress={(e) => e.key === "Enter" && handleSearchByUID()}
              />
            </div>
            <button
              onClick={handleSearchByUID}
              disabled={searching || !searchUID.trim()}
              className="px-6 py-2 bg-stone-800 text-white rounded-lg hover:bg-stone-900 disabled:bg-stone-400 disabled:cursor-not-allowed transition-colors"
            >
              {searching ? "Searching..." : "Search"}
            </button>
            <button
              onClick={() => {
                setAttestations(mockAttestations);
                setSearchUID("");
                setError(null);
              }}
              className="px-6 py-2 bg-stone-200 text-stone-700 rounded-lg hover:bg-stone-300 transition-colors"
            >
              Show All
            </button>
          </div>
          {error && (
            <p className="mt-4 text-red-600">{error}</p>
          )}
        </div>

        {/* Info Banner */}
        <div className="bg-stone-50 border border-stone-200 rounded-lg p-4 mb-8">
          <p className="text-stone-700 text-sm">
            <strong>Note:</strong> This is a demo with mock data. In production, this page would
            fetch real attestations from Ethereum Attestation Service. These attestations represent
            our coffee sourcing transactions, recorded on the blockchain for complete transparency.
          </p>
        </div>

        {/* Attestations List */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-stone-500">Loading attestations...</p>
          </div>
        ) : (
          <AttestationList attestations={attestations} />
        )}
      </div>
    </div>
  );
}

