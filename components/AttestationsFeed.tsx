"use client";

import { CoffeeTransactionAttestation } from "@/types/attestation";
import AttestationCard from "./AttestationCard";

interface AttestationsFeedProps {
  attestations: CoffeeTransactionAttestation[];
  title?: string;
  description?: string;
}

export default function AttestationsFeed({ 
  attestations, 
  title = "Supply Chain Transparency",
  description = "View verified transaction data from our coffee sourcing. All data is recorded on Ethereum Attestation Service for complete transparency."
}: AttestationsFeedProps) {
  if (attestations.length === 0) {
    return null;
  }

  // Show only the 3 most recent attestations for the feed
  const recentAttestations = attestations.slice(0, 3);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>
        <p className="text-gray-600">{description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {recentAttestations.map((attestation) => (
          <AttestationCard key={attestation.uid} attestation={attestation} />
        ))}
      </div>

      <div className="mt-6 text-center">
        <a
          href="/transparency"
          className="inline-block px-6 py-3 bg-amber-600 text-white rounded-lg font-medium hover:bg-amber-700 transition-colors"
        >
          View All Attestations →
        </a>
      </div>
    </section>
  );
}

