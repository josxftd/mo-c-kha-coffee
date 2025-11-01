import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import { ethers } from "ethers";
import { CoffeeTransactionAttestation } from "@/types/attestation";

// EAS Configuration - using Sepolia testnet by default
// You can change this to mainnet or other networks
export const EAS_CONFIG = {
  address: "0xC2679fBD37d54388Ce493F1DB75320D236e1815e", // Sepolia EAS Contract
  chainId: 11155111, // Sepolia Chain ID
  schemaUID: "", // Will be set when schema is registered
};

// Schema definition for coffee transactions
export const COFFEE_TRANSACTION_SCHEMA = 
  "bytes32 transactionHash,string coffeeName,string origin,string date,string price,string roastLevel,uint256 quantity,string certification,string farm,string elevation,string varietal,string processingMethod";

export class EASService {
  private eas: EAS;
  private provider: ethers.JsonRpcProvider;
  private signer: ethers.JsonRpcSigner | null = null;

  constructor() {
    // Initialize provider - you can use any RPC provider
    this.provider = new ethers.JsonRpcProvider(
      process.env.NEXT_PUBLIC_RPC_URL || "https://sepolia.infura.io/v3/your-key"
    );
    
    // Initialize EAS
    this.eas = new EAS(EAS_CONFIG.address);
    this.eas.connect(this.provider);
  }

  // Connect wallet signer for creating attestations
  async connectSigner(signer: ethers.JsonRpcSigner) {
    this.signer = signer;
    this.eas.connect(signer);
  }

  // Fetch an attestation by UID
  async getAttestation(uid: string): Promise<CoffeeTransactionAttestation | null> {
    try {
      const attestation = await this.eas.getAttestation(uid);
      
      if (!attestation) {
        return null;
      }

      // Decode the schema data
      const schemaEncoder = new SchemaEncoder(COFFEE_TRANSACTION_SCHEMA);
      const decodedData = schemaEncoder.decodeData(attestation.data);

      // Convert decoded data to our format
      const data: CoffeeTransactionAttestation["data"] = {
        transactionHash: decodedData.find(d => d.name === "transactionHash")?.value.value as string || "",
        coffeeName: decodedData.find(d => d.name === "coffeeName")?.value.value as string || "",
        origin: decodedData.find(d => d.name === "origin")?.value.value as string || "",
        date: decodedData.find(d => d.name === "date")?.value.value as string || "",
        price: decodedData.find(d => d.name === "price")?.value.value as string || "",
        roastLevel: decodedData.find(d => d.name === "roastLevel")?.value.value as string || "",
        quantity: Number(decodedData.find(d => d.name === "quantity")?.value.value || 0),
        certification: decodedData.find(d => d.name === "certification")?.value.value as string || "",
        farm: decodedData.find(d => d.name === "farm")?.value.value as string || "",
        elevation: decodedData.find(d => d.name === "elevation")?.value.value as string || "",
        varietal: decodedData.find(d => d.name === "varietal")?.value.value as string || "",
        processingMethod: decodedData.find(d => d.name === "processingMethod")?.value.value as string || "",
      };

      return {
        uid: attestation.uid,
        schema: attestation.schema,
        attester: attestation.attester,
        recipient: attestation.recipient,
        refUID: attestation.refUID || null,
        time: attestation.time,
        expirationTime: attestation.expirationTime || null,
        revocationTime: attestation.revocationTime || null,
        version: 1, // EAS attestation version
        nonce: BigInt(0), // Nonce not available in Attestation type
        data,
      };
    } catch (error) {
      console.error("Error fetching attestation:", error);
      return null;
    }
  }

  // Get attestations for a specific recipient (user address)
  // Note: EAS SDK doesn't have a direct method for this. You would need to:
  // 1. Use EAS GraphQL API: https://docs.attest.sh/docs/basics/querying-attestations
  // 2. Or use the EAS Indexer
  // For now, this is a placeholder that would need to be implemented with GraphQL queries
  async getAttestationsForRecipient(recipient: string): Promise<CoffeeTransactionAttestation[]> {
    // TODO: Implement GraphQL query to EAS API
    // Example query structure:
    // query {
    //   attestations(where: { recipient: { equals: recipient }, schemaId: { equals: schemaUID } }) {
    //     id
    //     ...
    //   }
    // }
    console.warn("getAttestationsForRecipient requires GraphQL API implementation");
    return [];
  }

  // Create a new attestation (requires signer)
  async createAttestation(
    recipient: string,
    data: CoffeeTransactionAttestation["data"]
  ): Promise<string | null> {
    if (!this.signer) {
      throw new Error("Signer not connected. Please connect wallet first.");
    }

    try {
      const schemaEncoder = new SchemaEncoder(COFFEE_TRANSACTION_SCHEMA);
      
      const encodedData = schemaEncoder.encodeData([
        { name: "transactionHash", value: data.transactionHash || "0x", type: "bytes32" },
        { name: "coffeeName", value: data.coffeeName, type: "string" },
        { name: "origin", value: data.origin, type: "string" },
        { name: "date", value: data.date, type: "string" },
        { name: "price", value: data.price, type: "string" },
        { name: "roastLevel", value: data.roastLevel, type: "string" },
        { name: "quantity", value: data.quantity, type: "uint256" },
        { name: "certification", value: data.certification || "", type: "string" },
        { name: "farm", value: data.farm || "", type: "string" },
        { name: "elevation", value: data.elevation || "", type: "string" },
        { name: "varietal", value: data.varietal || "", type: "string" },
        { name: "processingMethod", value: data.processingMethod || "", type: "string" },
      ]);

      const tx = await this.eas.attest({
        schema: EAS_CONFIG.schemaUID || "",
        data: {
          recipient,
          expirationTime: BigInt(0), // No expiration
          revocable: true,
          data: encodedData,
        },
      });

      const newAttestationUID = await tx.wait();
      return newAttestationUID;
    } catch (error) {
      console.error("Error creating attestation:", error);
      return null;
    }
  }
}

// Singleton instance
export const easService = new EASService();

