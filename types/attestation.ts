// Coffee Transaction Attestation Schema Types
export interface CoffeeTransactionAttestation {
  // EAS standard fields
  uid: string;
  schema: string;
  attester: string;
  recipient: string;
  refUID: string | null;
  time: bigint;
  expirationTime: bigint | null;
  revocationTime: bigint | null;
  version: number;
  nonce: bigint; // Not available from EAS SDK Attestation type, set to 0
  
  // Coffee-specific transaction data
  data: {
    price: string; // Price paid in USD
    origin: string; // Coffee origin country/region
    date: string; // Transaction date
    coffeeName: string; // Name of the coffee
    roastLevel: string; // Light, Medium, Dark, etc.
    quantity: number; // Quantity purchased
    certification?: string; // Organic, Fair Trade, etc.
    farm?: string; // Farm name
    elevation?: string; // Elevation where coffee was grown
    varietal?: string; // Coffee varietal
    processingMethod?: string; // Washed, Natural, etc.
    transactionHash?: string; // Blockchain transaction hash
  };
}

export interface CoffeeProduct {
  id: string;
  name: string;
  description: string;
  price: string;
  origin: string;
  roastLevel: string;
  imageUrl?: string;
  certifications?: string[];
  farm?: string;
  elevation?: string;
  varietal?: string;
  processingMethod?: string;
  attestationUID?: string; // Link to EAS attestation
}

export interface AttestationDisplayProps {
  attestation: CoffeeTransactionAttestation;
}

