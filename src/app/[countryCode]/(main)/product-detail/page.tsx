"use client"
import { Breadcrumb } from "components/Breadcrumb"
import { ProductCard } from "components/ProductCard"
import { useState } from "react"
import { LuPlus, LuMinus } from "react-icons/lu"
import Image from "next/image"
import Link from "next/link"

interface Variant {
  id: string
  name: string
  quantity: number
}


const offers = Array.from({ length: 4 }, (_, i) => ({
  id: i + 1,
  title:
    i < 4 ? "Buy 10 Terea Get 1 IQOS Illuma Free" : "Buy 10 ZYN Get 2 Free",
  category: "Tobacco",
  description: "Premium heated tobacco device with sophisticated design",
  price: "Rs 4500",
  expiry: "Ends Aug 31, 2024",
  image: "/images/offer-image.png",
  badge: "Limited time",
}));

export default function ProductDetailPage() {
  const [selectedVariant, setSelectedVariant] = useState("Apple Mint")
  const [activeTab, setActiveTab] = useState("Description")

  const [variants, setVariants] = useState<Variant[]>([
    { id: "1", name: "Variant one", quantity: 5 },
    { id: "2", name: "Variant two", quantity: 5 },
    { id: "3", name: "Variant three", quantity: 5 },
    { id: "4", name: "Variant four", quantity: 5 },
    { id: "5", name: "Variant five", quantity: 5 },
    { id: "6", name: "Variant six", quantity: 5 },
  ]);

  const selectedCount = variants.filter((v) => v.quantity > 0).length

  const updateQuantity = (id: string, delta: number) => {
    setVariants(
      variants.map((v) =>
        v.id === id ? { ...v, quantity: Math.max(0, v.quantity + delta) } : v
      )
    )
  }

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: "Category name", href: "/category" },
    { label: "Product name" },
  ]

  const tabs = ["Description", "How to use", "Details/Specifications"]

  const productThumbnails = [
    "https://api.builder.io/api/v1/image/assets/TEMP/83f101c0f6b9f179339c49178c453b552932f031?width=153",
    "https://api.builder.io/api/v1/image/assets/TEMP/a28564c0c9da67644cf41e0242ed1f2d3f355d90?width=153",
    "https://api.builder.io/api/v1/image/assets/TEMP/44deaeb0096bbafa119e2a0ff40437289a8afdb2?width=153",
    "https://api.builder.io/api/v1/image/assets/TEMP/8eece15299348c8641d5b2bd1a1a38614efa3f6c?width=153",
    "https://api.builder.io/api/v1/image/assets/TEMP/ed06411bdc6cfe2169cc26611a406902fd378d1d?width=153",
    "https://api.builder.io/api/v1/image/assets/TEMP/bb148ec0092e849be98817ffce5fbf908ffd8fdd?width=153",
    "https://api.builder.io/api/v1/image/assets/TEMP/b120f51ce0f3cda8e202b2c77599cea5a39a645b?width=153",
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <Breadcrumb items={breadcrumbItems} />

      {/* Main Content */}
      <div className="w-full px-4 py-6 lg:px-10 lg:py-10 flex justify-center">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-[55px] w-full max-w-screen-xl mx-auto">
          {/* Product Gallery */}
          <div className="flex flex-col lg:flex-row gap-5 w-full lg:w-auto">
            {/* Thumbnails */}
            <div className="flex lg:flex-col gap-2 lg:gap-4 order-2 lg:order-1 overflow-x-auto lg:overflow-visible">
              {productThumbnails.map((thumb, index) => (
                <div
                  key={index}
                  className="w-16 h-16 lg:w-[77px] lg:h-[80px] flex-shrink-0 rounded overflow-hidden border border-gray-200 cursor-pointer hover:border-brand-primary transition-colors"
                >
                  <img
                    src={thumb}
                    alt={`Product thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Main Image */}
            <div className="w-full lg:w-[628px] h-64 sm:h-96 lg:h-[656px] rounded overflow-hidden order-1 lg:order-2">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/0284c3d2a9203fe0a1da07f9dfaa33685bc0ee50?width=1257"
                alt="ZYN Product Main"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Details */}

          <div className="w-full lg:w-[500px] flex flex-col gap-5">

            <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
              {/* Category Tag */}
              <div className="mb-6">
                <span className="text-sm font-medium text-cyan-600">
                  Category name
                </span>
              </div>

              {/* Main Title */}
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                Buy 10 Terea Get 1 IQOS Illuma Free
              </h1>

              {/* Description */}
              <p className="text-gray-600 text-sm sm:text-base mb-6 leading-relaxed">
                Tobacco-free nicotine pouches with smooth, refreshing flavor. Discreet,
                convenient, and ready whenever you are.
              </p>

              {/* Price Section */}
              <div className="mb-8 border-b-2 border-gray-200 pb-2">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-2xl sm:text-3xl font-bold text-gray-900">
                    Rs 4500
                  </span>
                  <span className="text-sm text-gray-500">Ends Aug 31, 2024</span>
                </div>
              </div>

              {/* Variants Selection */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-base font-semibold text-gray-900">
                    Select Your Terea Variants
                  </h2>
                  <span className="text-sm text-gray-600">
                    {selectedCount}/10 selected
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {variants.map((variant) => (
                    <div
                      key={variant.id}
                      className="border border-gray-200 rounded-lg p-4 bg-gray-50"
                    >
                      <div className="flex items-center gap-2 mb-4 w-full justify-center sm:justify-start">
                        <div className="w-6 h-6 rounded-full bg-cyan-400 flex items-center justify-center">
                          <span className="text-white text-xs font-bold">✓</span>
                        </div>
                        <h3 className="font-semibold text-gray-900">
                          {variant.name}
                        </h3>
                      </div>

                      <div className="space-y-3 w-full items-center flex flex-col sm:block ">
                        <p className="text-sm text-gray-600">Quantity</p>
                        <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg px-3 py-2 w-fit">
                          <button
                            onClick={() => updateQuantity(variant.id, -1)}
                            className="p-1 hover:bg-gray-100 rounded transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <LuMinus className="w-4 h-4 text-gray-600" />
                          </button>
                          <span className="font-semibold text-gray-900 min-w-6 text-center">
                            {variant.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(variant.id, 1)}
                            className="p-1 hover:bg-gray-100 rounded transition-colors"
                            aria-label="Increase quantity"
                          >
                            <LuPlus className="w-4 h-4 text-gray-600" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Free IQOS Device Offer */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 mb-8">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-16 bg-red-400 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">IQOS</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Free IQOS Illuma Device
                    </h3>
                    <p className="text-sm text-gray-600">
                      Premium heated tobacco device with sophisticated design.
                      Includes charging dock and accessories.
                    </p>
                    <p className="text-xs text-gray-500 mt-2">Value: Rs 8,999</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button className="border-2 border-gray-200 text-gray-900 font-semibold py-3 px-6 rounded-lg hover:bg-gray-300 duration-300 hover:border-gray-300 transition-colors">
                  Add to cart
                </button>
                <button className="bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300">
                  Buy now (Rs 4,500)
                </button>
              </div>
            </div>



            {/* Tabs */}
            <div className="flex flex-col gap-5 mt-5">
              <div className="flex flex-col sm:flex-row justify-between gap-2">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-2 sm:px-5 py-[10px] text-sm font-medium transition-colors text-left ${activeTab === tab
                      ? "border-b border-black text-gray-900"
                      : "text-gray-500 hover:text-gray-900"
                      }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="text-gray-500 text-[13px] font-medium leading-5">
                {activeTab === "Description" && (
                  <div>
                    <p className="mb-4">
                      <strong>Zyn Apple Mint – 3 mg</strong>
                    </p>
                    <p className="mb-4">
                      Experience the refreshing blend of crisp green apple and
                      cool mint in every pouch. Zyn Apple Mint is completely
                      tobacco-free, offering smooth nicotine satisfaction
                      without the smoke or ash.
                    </p>
                    <ul className="list-disc list-inside mb-4 space-y-1">
                      <li>Tobacco-free for a cleaner experience</li>
                      <li>Long-lasting flavor</li>
                      <li>Portable and discreet</li>
                      <li>Use anywhere, anytime</li>
                    </ul>
                  </div>
                )}
                {activeTab === "How to use" && (
                  <p>Instructions for using the product will be displayed here.</p>
                )}
                {activeTab === "Details/Specifications" && (
                  <p>Product specifications and detailed information here.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Related Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
            Related Products
          </h2>
          <Link
            href="/bundles-and-gifts"
            className="text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 font-medium py-2 px-4 rounded-md transition-colors"
          >
            See All
          </Link>
        </div>

        {/* Offer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 place-items-center">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="w-full sm:w-[300px] max-w-[350px] sm:max-w-[280px] md:max-w-[300px] border border-gray-200 rounded-md shadow-sm hover:shadow-md transition bg-white overflow-hidden"
            >
              {/* Image */}
              <div className="relative w-full h-44">
                <Image
                  src={offer.image}
                  alt={offer.title}
                  fill
                  className="object-cover p-3"
                />
                <span className="absolute top-4 right-4 bg-red-200 text-red-700 font-bold text-[12px] px-2 py-1 rounded">
                  {offer.badge}
                </span>
              </div>

              {/* Content */}
              <div className="p-4 space-y-1.5">
                <p className="text-xs text-gray-500">{offer.category}</p>
                <h2 className="font-semibold text-sm text-gray-800 leading-snug">
                  {offer.title}
                </h2>
                <p className="text-xs text-gray-500">{offer.description}</p>
                <p className="text-[11px] text-gray-400">{offer.expiry}</p>

                <p className="text-sm font-semibold mt-1">{offer.price}</p>

                <button className="w-full bg-[#C49A4A] hover:bg-[#b2883f] text-white text-sm font-medium py-2 rounded-md transition mt-1.5">
                  Redeem this Offer
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>


    </div>
  )
}
