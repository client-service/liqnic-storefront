"use client";

import { useState } from "react";
import Image from "next/image";

const offers = Array.from({ length: 12 }, (_, i) => ({
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

export default function ExclusiveOffers() {
  const [search, setSearch] = useState("");

  const filtered = offers.filter((offer) =>
    offer.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="px-4 md:px-8 lg:px-12 py-10 bg-white">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-semibold text-gray-900">
          Exclusive Offers & Bundles
        </h1>
        <p className="text-gray-500 mt-2 max-w-2xl mx-auto">
          Get more for less — curated deals on premium products. Discover
          exceptional value in our luxury collection.
        </p>
      </div>

      {/* Search & Filters */}
      <div className="max-w-7xl mx-auto mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <input
          type="text"
          placeholder="Search product name, brand name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-gray-400 outline-none text-sm"
        />
        <div className="flex gap-3 min-w-[220px] md:justify-end">
          <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm flex-grow">
            <option>Category</option>
          </select>
          <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm flex-grow">
            <option>Sort</option>
          </select>
        </div>
      </div>

      {/* Offer Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 place-items-center">
        {filtered.map((offer) => (
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

      {/* Footer assistance section */}
      <div className="max-w-7xl mx-auto mt-16 bg-gray-50 py-10 rounded-xl text-center px-6">
        <p className="text-lg font-medium text-gray-800">
          Didn’t find what you were looking for?
        </p>
        <p className="text-gray-500 mt-1 max-w-md mx-auto">
          Our team is here to help you track down the right product or suggest
          alternatives. Reach out anytime and we’ll guide you.
        </p>
        <button className="mt-4 px-5 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition">
          Get assistance
        </button>
      </div>
    </div>
  );
}
