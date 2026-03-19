// এখানে 'use client' রাখা যাবে না যদি মেটাডেটা একই ফাইলে থাকে। 
// যদি আপনার ফর্মে ইন্টারঅ্যাকশন (যেমন বাটন ক্লিক) লাগে, তবে ফর্মটিকে আলাদা একটি কম্পোনেন্টে নিয়ে যাওয়া ভালো।

export const metadata = {
  title: 'Donate | HPCAA Support Fund',
  description: 'আপনার ছোট একটি অনুদান মেধাবী শিক্ষার্থীদের স্বপ্ন পূরণে সাহায্য করতে পারে। HPCAA স্কলারশিপ ও ডেভেলপমেন্ট ফান্ডে অংশ নিন।',
};

const causes = [
  { id: 1, title: 'Scholarship Fund', description: 'আর্থিকভাবে অসচ্ছল শিক্ষার্থীদের scholarship দিন', raised: '৩,৫০,০০০', goal: '৫,০০,০০০', percent: 70, emoji: '🎓', color: 'bg-blue-500' },
  { id: 2, title: 'College Development', description: 'কলেজের infrastructure উন্নয়নে অবদান রাখুন', raised: '২,০০,০০০', goal: '১০,০০,০০০', percent: 20, emoji: '🏫', color: 'bg-green-500' },
  { id: 3, title: 'Alumni Events Fund', description: 'পুনর্মিলনী ও অন্যান্য ইভেন্টের খরচ বহন করুন', raised: '১,২০,০০০', goal: '২,০০,০০০', percent: 60, emoji: '🎉', color: 'bg-purple-500' },
]

export default function DonatePage() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* ── HERO SECTION ── */}
      <div className="bg-green-800 text-white py-20 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Donate</h1>
        <p className="text-lg text-green-100 max-w-2xl mx-auto">
          আপনার সহায়তায় গড়ে উঠুক আগামীর HPCAA। আপনার অবদান আমাদের শক্তি।
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-16">
        {/* ── IMPACT STATS ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {[
            { number: '৫০০+', label: 'Donors' }, 
            { number: '৬৫ লক্ষ+', label: 'মোট সংগ্রহ' }, 
            { number: '২০০+', label: 'উপকারভোগী' }
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-[2rem] p-8 text-center shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="text-3xl font-bold text-green-800 mb-1">{stat.number}</div>
              <div className="text-gray-500 text-sm font-medium uppercase tracking-wide">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* ── CAUSES ── */}
        <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-3">
          <span className="w-2 h-8 bg-green-600 rounded-full"></span>
          আমাদের উদ্যোগ
        </h2>
        <div className="space-y-6 mb-16">
          {causes.map((cause) => (
            <div key={cause.id} className="bg-white rounded-3xl p-8 shadow-sm border border-gray-50 group hover:shadow-lg transition-all">
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="bg-green-50 rounded-2xl p-4 text-4xl shrink-0 group-hover:scale-110 transition-transform">
                  {cause.emoji}
                </div>
                <div className="flex-1 w-full">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-gray-800 text-xl">{cause.title}</h3>
                    <span className="text-sm font-bold text-green-700 bg-green-50 px-3 py-1 rounded-full">
                      {cause.percent}%
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">{cause.description}</p>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-gray-100 rounded-full h-3 mb-4 overflow-hidden">
                    <div 
                      className={`${cause.color} h-full rounded-full transition-all duration-1000 ease-out shadow-inner`} 
                      style={{ width: `${cause.percent}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                    <span className="text-green-700">সংগৃহীত: ৳{cause.raised}</span>
                    <span className="text-gray-400">লক্ষ্য: ৳{cause.goal}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── DONATE FORM ── */}
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-gray-50 mb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-full -mr-16 -mt-16 opacity-50"></div>
          
          <h2 className="text-3xl font-bold text-gray-800 mb-8">এখনই Donate করুন</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-600 ml-1">আপনার নাম</label>
              <input type="text" placeholder="নাম লিখুন" className="w-full border border-gray-100 bg-gray-50 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-green-500 outline-none transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-600 ml-1">ফোন নম্বর</label>
              <input type="tel" placeholder="01XXXXXXXXX" className="w-full border border-gray-100 bg-gray-50 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-green-500 outline-none transition-all" />
            </div>
          </div>
          
          <div className="mb-10">
            <label className="block text-sm font-semibold text-gray-600 mb-4 ml-1">পরিমাণ নির্বাচন করুন</label>
            <div className="flex flex-wrap gap-3">
              {['৫০০', '১,০০০', '৫,০০০', '১০,০০০'].map(amt => (
                <button key={amt} className="border-2 border-green-100 px-8 py-3 rounded-2xl font-bold text-green-800 hover:bg-green-800 hover:text-white hover:border-green-800 transition-all shadow-sm">
                  ৳{amt}
                </button>
              ))}
            </div>
          </div>
          
          <button className="w-full bg-green-800 text-white py-5 rounded-2xl font-bold text-xl hover:bg-green-700 shadow-xl shadow-green-900/20 active:scale-95 transition-all">
            Donate করুন →
          </button>
        </div>

        {/* ── TRUST SECTION ── */}
        <div className="bg-gradient-to-br from-green-800 to-green-950 rounded-[2rem] p-10 text-white text-center shadow-inner relative">
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-3 text-white">আপনার donation ১০০% নিরাপদ</h2>
            <p className="text-green-100 max-w-xl mx-auto opacity-90">
              HPCAA একটি নিবন্ধিত অলাভজনক সংগঠন। আমাদের প্রতিটি লেনদেনের হিসাব স্বচ্ছ এবং বার্ষিক অডিট রিপোর্ট সবার জন্য উন্মুক্ত।
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}