// Metadata definition (Server Component default)
export const metadata = {
  title: 'আমাদের সম্পর্কে | HPCAA',
  description: 'Hamdard Public College Alumni Association (HPCAA) সম্পর্কে জানুন। আমাদের লক্ষ্য, দৃষ্টিভঙ্গি এবং মূল্যবোধ।',
};

// Main Component
export default function AboutPage() {
  const values = [
    { icon: '🤝', label: 'একতা' },
    { icon: '📚', label: 'শিক্ষা' },
    { icon: '💡', label: 'উদ্ভাবন' },
    { icon: '❤️', label: 'সেবা' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── HERO SECTION ── */}
      <div className="bg-green-800 text-white py-20 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">আমাদের সম্পর্কে</h1>
        <p className="text-lg text-green-100 max-w-2xl mx-auto">
          Hamdard Public College Alumni Association — প্রাক্তন শিক্ষার্থীদের একটি বিশেষ পরিবার
        </p>
      </div>

      {/* ── ABOUT CONTENT ── */}
      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800">আমরা কারা?</h2>
            <p className="text-gray-600 leading-relaxed">
              Hamdard Public College Alumni Association (HPCAA) হলো হামদর্দ পাবলিক কলেজের
              প্রাক্তন শিক্ষার্থীদের একটি সংগঠন। আমরা দেশ-বিদেশে ছড়িয়ে থাকা সকল
              প্রাক্তন শিক্ষার্থীদের একত্রিত করি।
            </p>
            <p className="text-gray-600 leading-relaxed">
              আমাদের লক্ষ্য হলো alumni দের মধ্যে সম্পর্ক তৈরি করা, নতুন প্রজন্মকে
              সহায়তা করা এবং কলেজের উন্নয়নে অবদান রাখা।
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="bg-green-50 rounded-2xl p-8 text-center border border-green-100">
              <div className="text-5xl font-extrabold text-green-800 mb-2">২০০০+</div>
              <div className="text-gray-600 font-medium tracking-wide">নিবন্ধিত Alumni</div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100">
                <div className="text-3xl font-bold text-green-800 mb-1">১৫+</div>
                <div className="text-xs text-gray-500 uppercase tracking-tighter">বছরের ইতিহাস</div>
              </div>
              <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100">
                <div className="text-3xl font-bold text-green-800 mb-1">৫০+</div>
                <div className="text-xs text-gray-500 uppercase tracking-tighter">বার্ষিক ইভেন্ট</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── MISSION & VISION ── */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-[2rem] p-10 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="text-4xl mb-6">🎯</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">আমাদের লক্ষ্য</h3>
            <p className="text-gray-600 leading-relaxed">
              প্রাক্তন শিক্ষার্থীদের মধ্যে নেটওয়ার্ক তৈরি করা, career development এ
              সহায়তা করা এবং কলেজের উন্নয়নে অবদান রাখা।
            </p>
          </div>
          <div className="bg-white rounded-[2rem] p-10 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="text-4xl mb-6">🌟</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">আমাদের দৃষ্টিভঙ্গি</h3>
            <p className="text-gray-600 leading-relaxed">
              একটি শক্তিশালী alumni community গড়ে তোলা যেখানে প্রতিটি সদস্য
              একে অপরকে সাহায্য করবে এবং সমাজের উন্নয়নে ভূমিকা রাখবে।
            </p>
          </div>
        </div>

        {/* ── VALUES SECTION ── */}
        <div className="bg-gradient-to-br from-green-800 to-green-900 rounded-[2.5rem] p-12 text-white text-center shadow-xl">
          <h2 className="text-3xl font-bold mb-10">আমাদের মূল্যবোধ</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {values.map((item) => (
              <div key={item.label} className="group">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <div className="text-lg font-bold tracking-wide">{item.label}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}