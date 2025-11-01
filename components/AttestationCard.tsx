"use client";

import { CoffeeTransactionAttestation } from "@/types/attestation";
import { format } from "date-fns";

interface AttestationCardProps {
  attestation: CoffeeTransactionAttestation;
}

export default function AttestationCard({ attestation }: AttestationCardProps) {
  const { data } = attestation;
  
  // Parse date - handle both ISO strings and epoch timestamps
  let displayDate = data.date;
  try {
    const date = new Date(data.date);
    if (!isNaN(date.getTime())) {
      displayDate = format(date, "MMMM dd, yyyy");
    }
  } catch (e) {
    // Keep original date string if parsing fails
  }

  // Format price - ensure USD display
  let displayPrice = data.price;
  // If price is a number, format it with $ and 2 decimal places
  const priceNum = parseFloat(data.price);
  if (!isNaN(priceNum)) {
    displayPrice = `$${priceNum.toFixed(2)}`;
  } else if (!data.price.includes("$")) {
    displayPrice = `$${data.price}`;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-stone-200 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-stone-900">{data.coffeeName}</h3>
          <p className="text-sm text-stone-500 mt-1">UID: {attestation.uid.slice(0, 10)}...</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-stone-700">{displayPrice}</p>
          <p className="text-sm text-stone-500">{displayDate}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm font-semibold text-stone-700">Origin</p>
          <p className="text-stone-900">{data.origin}</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-stone-700">Roast Level</p>
          <p className="text-stone-900 capitalize">{data.roastLevel}</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-stone-700">Quantity Sourced</p>
          <p className="text-stone-900">{data.quantity.toLocaleString()} bags</p>
        </div>
        {data.certification && (
          <div>
            <p className="text-sm font-semibold text-stone-700">Certification</p>
            <p className="text-stone-900">{data.certification}</p>
          </div>
        )}
      </div>

      {(data.farm || data.elevation || data.varietal || data.processingMethod) && (
        <div className="border-t border-stone-200 pt-4 mt-4">
          <h4 className="text-sm font-semibold text-stone-700 mb-2">Additional Details</h4>
          <div className="grid grid-cols-2 gap-3 text-sm">
            {data.farm && (
              <div>
                <span className="text-stone-600">Farm: </span>
                <span className="text-stone-900">{data.farm}</span>
              </div>
            )}
            {data.elevation && (
              <div>
                <span className="text-stone-600">Elevation: </span>
                <span className="text-stone-900">{data.elevation}</span>
              </div>
            )}
            {data.varietal && (
              <div>
                <span className="text-stone-600">Varietal: </span>
                <span className="text-stone-900">{data.varietal}</span>
              </div>
            )}
            {data.processingMethod && (
              <div>
                <span className="text-stone-600">Processing: </span>
                <span className="text-stone-900 capitalize">{data.processingMethod}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {data.transactionHash && (
        <div className="border-t border-stone-200 pt-4 mt-4">
          <p className="text-xs text-stone-500">
            TX Hash:{" "}
            <a
              href={`https://sepolia.etherscan.io/tx/${data.transactionHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-700 hover:text-stone-900 underline"
            >
              {data.transactionHash.slice(0, 20)}...
            </a>
          </p>
        </div>
      )}

      <div className="mt-4 pt-4 border-t border-stone-200">
        <div className="flex justify-between text-xs text-stone-500">
          <span>Attester: {attestation.attester.slice(0, 8)}...</span>
          <span>Recipient: {attestation.recipient.slice(0, 8)}...</span>
        </div>
      </div>
    </div>
  );
}

