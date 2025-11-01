"use client";

import { use } from "react";
import Link from "next/link";
import { CoffeeProduct } from "@/types/attestation";

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

// Mock products data - in production, fetch from database/API
const products: Record<string, CoffeeProduct> = {
  "1": {
    id: "1",
    name: "Ethiopian Yirgacheffe",
    description:
      "A bright and floral coffee with notes of jasmine, bergamot, and blueberry. Grown in the highlands of Yirgacheffe, Ethiopia. This single-origin coffee is known for its delicate acidity and complex flavor profile.",
    price: "24.99",
    origin: "Ethiopia",
    roastLevel: "Light",
    certifications: ["Organic", "Fair Trade"],
    farm: "Kochere Cooperative",
    elevation: "1,700-2,200m",
    varietal: "Heirloom",
    processingMethod: "Washed",
  },
  "2": {
    id: "2",
    name: "Colombian Supremo",
    description:
      "A balanced coffee with notes of caramel, red apple, and cocoa. From the Huila region of Colombia. Perfect for daily brewing with its smooth finish.",
    price: "19.99",
    origin: "Colombia",
    roastLevel: "Medium",
    certifications: ["Rainforest Alliance"],
    farm: "Finca El Paraiso",
    elevation: "1,500-1,800m",
    varietal: "Caturra, Colombia",
    processingMethod: "Washed",
  },
  "3": {
    id: "3",
    name: "Sumatran Mandheling",
    description:
      "A bold, full-bodied coffee with earthy notes and low acidity. From the Lintong region of Sumatra. Ideal for dark roast lovers.",
    price: "22.99",
    origin: "Indonesia",
    roastLevel: "Dark",
    certifications: ["Organic"],
    farm: "Lake Toba Region",
    elevation: "1,200-1,500m",
    varietal: "Typica",
    processingMethod: "Wet-hulled",
  },
  "4": {
    id: "4",
    name: "Kenyan AA",
    description:
      "Bright and fruity with notes of blackcurrant, grapefruit, and wine. From the Nyeri region. A favorite among specialty coffee enthusiasts.",
    price: "26.99",
    origin: "Kenya",
    roastLevel: "Light-Medium",
    certifications: ["Fair Trade"],
    farm: "Gatomboya Estate",
    elevation: "1,600-1,900m",
    varietal: "SL28, SL34",
    processingMethod: "Washed",
  },
  "5": {
    id: "5",
    name: "Brazilian Santos",
    description:
      "Smooth and nutty with notes of chocolate and hazelnut. Low acidity, perfect for espresso. From the Cerrado region.",
    price: "17.99",
    origin: "Brazil",
    roastLevel: "Medium-Dark",
    certifications: [],
    farm: "Cerrado Mineiro",
    elevation: "900-1,200m",
    varietal: "Bourbon, Mundo Novo",
    processingMethod: "Natural",
  },
  "6": {
    id: "6",
    name: "Guatemalan Antigua",
    description:
      "Complex and elegant with notes of chocolate, spice, and citrus. From the Antigua Valley. A well-balanced coffee with great depth.",
    price: "21.99",
    origin: "Guatemala",
    roastLevel: "Medium",
    certifications: ["Fair Trade", "Organic"],
    farm: "Finca La Soledad",
    elevation: "1,500-1,700m",
    varietal: "Bourbon, Typica",
    processingMethod: "Washed",
  },
};

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  const { id } = use(params);
  const product = products[id];

  if (!product) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-stone-900 mb-4">Product Not Found</h1>
          <Link
            href="/"
            className="text-stone-700 hover:text-stone-900 font-medium"
          >
            ← Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            href="/"
            className="text-stone-700 hover:text-stone-900 font-medium mb-4 inline-block transition-colors"
          >
            ← Back to Products
          </Link>
          <h1 className="text-3xl font-bold text-stone-900">{product.name}</h1>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Product Image */}
            <div className="md:w-1/2 bg-gradient-to-br from-stone-100 via-stone-200 to-stone-300 overflow-hidden">
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

            {/* Product Details */}
            <div className="md:w-1/2 p-8">
              <div className="mb-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-3xl font-bold text-stone-900">{product.name}</h2>
                  <p className="text-4xl font-bold text-stone-700">${product.price}</p>
                </div>
                <p className="text-stone-600 text-lg leading-relaxed">{product.description}</p>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-stone-50 p-4 rounded-lg border border-stone-200">
                  <p className="text-sm font-semibold text-stone-700 mb-1">Origin</p>
                  <p className="text-stone-900 font-medium">{product.origin}</p>
                </div>
                <div className="bg-stone-50 p-4 rounded-lg border border-stone-200">
                  <p className="text-sm font-semibold text-stone-700 mb-1">Roast Level</p>
                  <p className="text-stone-900 font-medium capitalize">{product.roastLevel}</p>
                </div>
                {product.farm && (
                  <div className="bg-stone-50 p-4 rounded-lg border border-stone-200">
                    <p className="text-sm font-semibold text-stone-700 mb-1">Farm</p>
                    <p className="text-stone-900 font-medium">{product.farm}</p>
                  </div>
                )}
                {product.elevation && (
                  <div className="bg-stone-50 p-4 rounded-lg border border-stone-200">
                    <p className="text-sm font-semibold text-stone-700 mb-1">Elevation</p>
                    <p className="text-stone-900 font-medium">{product.elevation}</p>
                  </div>
                )}
                {product.varietal && (
                  <div className="bg-stone-50 p-4 rounded-lg border border-stone-200">
                    <p className="text-sm font-semibold text-stone-700 mb-1">Varietal</p>
                    <p className="text-stone-900 font-medium">{product.varietal}</p>
                  </div>
                )}
                {product.processingMethod && (
                  <div className="bg-stone-50 p-4 rounded-lg border border-stone-200">
                    <p className="text-sm font-semibold text-stone-700 mb-1">Processing</p>
                    <p className="text-stone-900 font-medium capitalize">{product.processingMethod}</p>
                  </div>
                )}
              </div>

              {/* Certifications */}
              {product.certifications && product.certifications.length > 0 && (
                <div className="mb-6">
                  <p className="text-sm font-semibold text-stone-700 mb-2">Certifications</p>
                  <div className="flex flex-wrap gap-2">
                    {product.certifications.map((cert, idx) => (
                      <span
                        key={idx}
                        className="px-4 py-2 bg-amber-50 text-amber-900 border border-amber-200 rounded-full text-sm font-medium"
                      >
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Purchase Button */}
              <div className="border-t border-stone-200 pt-6">
                <button className="w-full bg-stone-800 text-white py-4 rounded-lg font-bold text-lg hover:bg-stone-900 transition-colors">
                  Add to Cart
                </button>
                <p className="text-sm text-stone-500 mt-3 text-center">
                  Secure checkout with standard payment methods
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Transparency Info Section */}
        <div className="mt-8 bg-stone-50 border border-stone-200 rounded-lg p-6">
          <h3 className="text-lg font-bold text-stone-900 mb-2">🔗 Supply Chain Transparency</h3>
          <p className="text-stone-700 text-sm mb-2">
            This coffee's sourcing transaction has been recorded on the Ethereum blockchain using
            Ethereum Attestation Service (EAS) for complete transparency. The attestation includes:
          </p>
          <ul className="text-stone-700 text-sm list-disc list-inside space-y-1">
            <li>Price we paid to source this coffee</li>
            <li>Sourcing date and transaction hash</li>
            <li>Coffee origin and farm details</li>
            <li>All product specifications</li>
          </ul>
          <p className="text-stone-700 text-sm mt-3">
            View all our sourcing attestations on the{" "}
            <Link href="/transparency" className="underline font-medium text-stone-900 hover:text-stone-700">
              Transparency page
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

