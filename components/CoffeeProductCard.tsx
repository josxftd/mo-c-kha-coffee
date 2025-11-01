"use client";

import { CoffeeProduct } from "@/types/attestation";
import Link from "next/link";

interface CoffeeProductCardProps {
  product: CoffeeProduct;
}

// Get coffee image URL based on coffee name/origin
function getCoffeeImageUrl(name: string, origin: string): string {
  // Using Unsplash images - can be replaced with Shutterstock URLs
  const images: Record<string, string> = {
    "Ethiopian Yirgacheffe": "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&h=600&fit=crop",
    "Colombian Supremo": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&h=600&fit=crop",
    "Sumatran Mandheling": "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=800&h=600&fit=crop",
    "Kenyan AA": "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800&h=600&fit=crop",
    "Brazilian Santos": "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&h=600&fit=crop",
    "Guatemalan Antigua": "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&h=600&fit=crop",
    "Ethiopia": "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&h=600&fit=crop",
    "Colombia": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&h=600&fit=crop",
    "Indonesia": "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=800&h=600&fit=crop",
  };
  
  return images[name] || images[origin] || "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&h=600&fit=crop";
}

export default function CoffeeProductCard({ product }: CoffeeProductCardProps) {
  return (
    <Link href={`/products/${product.id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
        <div className="h-48 bg-gradient-to-br from-stone-100 via-stone-200 to-stone-300 overflow-hidden">
          <img
            src={product.imageUrl || getCoffeeImageUrl(product.name, product.origin)}
            alt={product.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback to gradient background if image fails to load
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>
        <div className="p-6">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-gray-900">{product.name}</h3>
            <p className="text-2xl font-bold text-green-600">${product.price}</p>
          </div>
          <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
              {product.origin}
            </span>
            <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium capitalize">
              {product.roastLevel}
            </span>
            {product.certifications?.map((cert, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium"
              >
                {cert}
              </span>
            ))}
          </div>

          {product.attestationUID && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                Verified Transaction: {product.attestationUID.slice(0, 10)}...
              </p>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

