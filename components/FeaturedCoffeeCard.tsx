"use client";

import { CoffeeProduct, CoffeeTransactionAttestation } from "@/types/attestation";
import { format } from "date-fns";
import Link from "next/link";

interface FeaturedCoffeeCardProps {
  product: CoffeeProduct;
  attestation: CoffeeTransactionAttestation;
}

// Get coffee image URL based on coffee name/origin
function getCoffeeImageUrl(name: string, origin: string): string {
  // Using Unsplash images - can be replaced with Shutterstock URLs
  const images: Record<string, string> = {
    "Ethiopian Yirgacheffe": "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&h=600&fit=crop",
    "Colombian Supremo": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&h=600&fit=crop",
    "Sumatran Mandheling": "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=800&h=600&fit=crop",
    "Ethiopia": "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&h=600&fit=crop",
    "Colombia": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&h=600&fit=crop",
    "Indonesia": "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=800&h=600&fit=crop",
  };
  
  return images[name] || images[origin] || "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&h=600&fit=crop";
}

export default function FeaturedCoffeeCard({ product, attestation }: FeaturedCoffeeCardProps) {
  const { data } = attestation;
  
  // Format date
  let displayDate = data.date;
  try {
    const date = new Date(data.date);
    if (!isNaN(date.getTime())) {
      displayDate = format(date, "MMMM dd, yyyy");
    }
  } catch (e) {
    // Keep original date string if parsing fails
  }

  // Format price
  let displayPrice = data.price;
  const priceNum = parseFloat(data.price);
  if (!isNaN(priceNum)) {
    displayPrice = `$${priceNum.toFixed(2)}`;
  } else if (!data.price.includes("$")) {
    displayPrice = `$${data.price}`;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-stone-200 hover:shadow-xl transition-all">
      {/* Product Header Section */}
      <div className="relative">
        <div className="h-56 bg-gradient-to-br from-stone-100 via-stone-200 to-stone-300 overflow-hidden">
          <img
            src={product.imageUrl || getCoffeeImageUrl(product.name, product.origin)}
            alt={product.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback to gradient background if image fails to load
              (e.target as HTMLImageElement).style.display = 'none';
              (e.target as HTMLImageElement).parentElement!.className += ' flex items-center justify-center';
            }}
          />
        </div>
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 bg-stone-800 text-white rounded-full text-xs font-medium shadow-md">
            Verified Source
          </span>
        </div>
      </div>

      <div className="p-6">
        {/* Product Info */}
        <div className="mb-6">
          <div className="flex justify-between items-start mb-3">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-stone-900 mb-1">{product.name}</h3>
              <p className="text-stone-600 text-sm mb-2">{product.description}</p>
            </div>
            <p className="text-3xl font-bold text-stone-700 ml-4">${product.price}</p>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-3 py-1 bg-stone-100 text-stone-800 rounded-full text-sm font-medium">
              {product.origin}
            </span>
            <span className="px-3 py-1 bg-stone-200 text-stone-800 rounded-full text-sm font-medium capitalize">
              {product.roastLevel}
            </span>
            {product.certifications?.map((cert, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-amber-50 text-amber-900 border border-amber-200 rounded-full text-sm font-medium"
              >
                {cert}
              </span>
            ))}
          </div>
        </div>

        {/* Transparency Data Section */}
        <div className="border-t-2 border-stone-200 pt-5 mt-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 bg-amber-600 rounded-full"></div>
            <h4 className="text-sm font-bold text-stone-800 uppercase tracking-wide">
              Supply Chain Transparency
            </h4>
          </div>

          <div className="bg-stone-50 rounded-lg p-4 space-y-3">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-stone-600 font-medium mb-1">Sourced On</p>
                <p className="text-stone-900 font-semibold">{displayDate}</p>
              </div>
              <div>
                <p className="text-stone-600 font-medium mb-1">Price Paid</p>
                <p className="text-stone-900 font-semibold">{displayPrice} per bag</p>
              </div>
              <div>
                <p className="text-stone-600 font-medium mb-1">Quantity</p>
                <p className="text-stone-900 font-semibold">{data.quantity.toLocaleString()} bags</p>
              </div>
              <div>
                <p className="text-stone-600 font-medium mb-1">Farm</p>
                <p className="text-stone-900 font-semibold">{data.farm || "N/A"}</p>
              </div>
            </div>

            {(data.elevation || data.varietal || data.processingMethod) && (
              <div className="pt-3 border-t border-stone-200">
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {data.elevation && (
                    <div>
                      <p className="text-stone-500">Elevation</p>
                      <p className="text-stone-800 font-medium">{data.elevation}</p>
                    </div>
                  )}
                  {data.varietal && (
                    <div>
                      <p className="text-stone-500">Varietal</p>
                      <p className="text-stone-800 font-medium">{data.varietal}</p>
                    </div>
                  )}
                  {data.processingMethod && (
                    <div>
                      <p className="text-stone-500">Processing</p>
                      <p className="text-stone-800 font-medium capitalize">{data.processingMethod}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="pt-3 border-t border-stone-200">
              <Link 
                href={`/products/${product.id}`}
                className="inline-flex items-center justify-center w-full px-4 py-2 bg-stone-800 text-white rounded-lg font-medium hover:bg-stone-900 transition-colors text-sm"
              >
                View Details →
              </Link>
            </div>
          </div>

          {/* Blockchain Verification Badge */}
          <div className="mt-4 flex items-center justify-between text-xs text-stone-500">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-amber-600 rounded-full"></span>
              <span>Ethereum Attestation Service</span>
            </div>
            <a
              href={`https://sepolia.etherscan.io/tx/${data.transactionHash || attestation.uid}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-stone-700 underline"
            >
              View on-chain
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

