import React from "react";

export default function FeatureRow() {
  const features = [
    {
      title: "Style Delivered to Your Doorstep",
      image:
        "https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "Your Personal Wardrobe, Online",
      image:
        "https://images.unsplash.com/photo-1542060748-10c28b62716a?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "Wear What Moves Your Dream",
      image:
        "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop",
    },
  ];
  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {features.map((f) => (
          <div key={f.title} className="rounded-2xl overflow-hidden relative shadow-md border bg-white">
            <img src={f.image} alt={f.title} className="w-full h-44 md:h-56 object-cover" />
            <div className="absolute bottom-3 left-3 right-3">
              <div className="bg-white/90 backdrop-blur rounded-full inline-block px-3 py-1 text-xs font-semibold text-gray-800">
                {f.title}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
