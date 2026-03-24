import Link from 'next/link'

// SEO মেটাডেটা (সার্ভার সাইড এনভায়রনমেন্টে কাজ করবে)
export const metadata = {
  title: 'News | HPCAA',
  description: 'Hamdard Public College Alumni Association এর সর্বশেষ সংবাদ ও আপডেট। প্রাক্তন শিক্ষার্থীদের অগ্রযাত্রার খবর জানুন।',
  keywords: [
    'HPCAA', 'hpcaa', 'HPC Alumni', 'hpc alumni','hpc alumni association','hpc','hpcaa alumni',
    'Hamdard Public College',
    'Hamdard Public College Alumni',
    'Hamdard Public College Alumni Association',
    'Hamdard Alumni Association',
    'Hamdard College Alumni',
    'Hamdard Alumni Bangladesh',
    'Hamdard Public College Dhaka',
    'Hamdard College Dhaka',
    'Hamdard Alumni Network',
    'Hamdard Public College Old Students',
    'Hamdard Ex Students',
    'Hamdard Former Students',
    'HPCAA Bangladesh', 'HPCAA Dhaka',
    'HPCAA Official', 'HPCAA Website',
    'HPCAA Members', 'HPCAA Events', 'HPCAA News',
    'হামদর্দ পাবলিক কলেজ',
    'হামদর্দ কলেজ',
    'হামদর্দ পাবলিক কলেজ অ্যালামনাই',
    'হামদর্দ অ্যালামনাই অ্যাসোসিয়েশন',
    'হামদর্দ প্রাক্তন শিক্ষার্থী',
    'হামদর্দ পুরনো ছাত্র',
    'হামদর্দ পাবলিক কলেজ ঢাকা',
    'হামদর্দ কলেজ ঢাকা',
    'হামদর্দ অ্যালামনাই নেটওয়ার্ক',
    'এইচপিসিএএ',
    'Hamdard Public College alumni website',
    'HPCAA official website',
    'হামদর্দ কলেজ alumni',
    'হামদর্দ alumni association',
    'হামদর্দ কলেজের প্রাক্তন ছাত্র',
    'হামদর্দ কলেজের alumni',
    'alumni association bangladesh',
    'college alumni bangladesh',
    'alumni network dhaka',
    'প্রাক্তন শিক্ষার্থী সংগঠন',
    'অ্যালামনাই অ্যাসোসিয়েশন বাংলাদেশ',
  ],
}

const news = [
  {
    id: 1,
    title: 'HPCAA বার্ষিক পুনর্মিলনী ২০২৬ এর তারিখ ঘোষণা',
    excerpt: 'এই বছরের বার্ষিক পুনর্মিলনী আগামী ১৫ এপ্রিল অনুষ্ঠিত হবে। সকল alumni দের উপস্থিতি কাম্য।',
    date: '১৮ মার্চ, ২০২৬',
    category: 'ঘোষণা',
    categoryColor: 'bg-green-100 text-green-800',
    emoji: '📢',
  },
  {
    id: 2,
    title: 'নতুন Scholarship Program চালু হলো',
    excerpt: 'মেধাবী শিক্ষার্থীদের জন্য HPCAA নতুন scholarship program চালু করেছে। আবেদন করুন এখনই।',
    date: '১৫ মার্চ, ২০২৬',
    category: 'শিক্ষা',
    categoryColor: 'bg-blue-100 text-blue-800',
    emoji: '🎓',
  },
  {
    id: 3,
    title: 'Career Development Workshop সফলভাবে সম্পন্ন',
    excerpt: 'গত সপ্তাহের Career Development Workshop এ ১৫০ জনেরও বেশি alumni অংশগ্রহণ করেছেন।',
    date: '১০ মার্চ, ২০২৬',
    category: 'ইভেন্ট',
    categoryColor: 'bg-purple-100 text-purple-800',
    emoji: '💼',
  },
  {
    id: 4,
    title: 'HPCAA এর নতুন Executive Committee গঠন',
    excerpt: 'নতুন কার্যকরী কমিটি গঠন করা হয়েছে। নতুন সদস্যদের স্বাগত জানাই।',
    date: '৫ মার্চ, ২০২৬',
    category: 'সংগঠন',
    categoryColor: 'bg-orange-100 text-orange-800',
    emoji: '🏛️',
  },
  {
    id: 5,
    title: 'Alumni Sports Day ২০২৬ এর প্রস্তুতি শুরু',
    excerpt: 'আসন্ন Alumni Sports Day এর জন্য registration শুরু হয়েছে। দ্রুত নিবন্ধন করুন।',
    date: '১ মার্চ, ২০২৬',
    category: 'স্পোর্টস',
    categoryColor: 'bg-red-100 text-red-800',
    emoji: '⚽',
  },
  {
    id: 6,
    title: 'হামদর্দ পাবলিক কলেজের নতুন ভবন উদ্বোধন',
    excerpt: 'কলেজের নতুন একাডেমিক ভবন উদ্বোধন হয়েছে। এই উন্নয়নে HPCAA গুরুত্বপূর্ণ ভূমিকা রেখেছে।',
    date: '২৫ ফেব্রুয়ারি, ২০২৬',
    category: 'উন্নয়ন',
    categoryColor: 'bg-teal-100 text-teal-800',
    emoji: '🏫',
  },
]

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* ── HERO SECTION ── */}
      <section className="bg-green-800 text-white py-20 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">সংবাদ ও আপডেট</h1>
        <p className="text-lg text-green-100 max-w-2xl mx-auto leading-relaxed">
          HPCAA এর সর্বশেষ খবর ও কার্যক্রম। যুক্ত থাকুন আমাদের অগ্রযাত্রার সাথে।
        </p>
      </section>

      <main className="max-w-5xl mx-auto px-4 py-16">

        {/* ── FEATURED NEWS ── */}
        <section aria-labelledby="featured-news">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mb-12 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-6">
              <span className="bg-red-500 text-white text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-widest animate-pulse">
                🔥 সর্বশেষ সংবাদ
              </span>
            </div>
            <div className="flex flex-col md:flex-row items-start gap-8">
              <div className="bg-green-100 rounded-2xl p-6 text-5xl shrink-0 flex items-center justify-center shadow-inner">
                {news[0].emoji}
              </div>
              <div className="flex-1">
                <h2 id="featured-news" className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 leading-tight">
                  {news[0].title}
                </h2>
                <p className="text-gray-600 text-lg mb-5 leading-relaxed">
                  {news[0].excerpt}
                </p>
                <div className="flex items-center gap-4 border-t border-gray-50 pt-5">
                  <span className={`text-xs px-4 py-1.5 rounded-full font-bold ${news[0].categoryColor}`}>
                    {news[0].category}
                  </span>
                  <span className="text-sm text-gray-400 font-medium">📅 {news[0].date}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── ALL NEWS GRID ── */}
        <section aria-labelledby="all-news">
          <h2 id="all-news" className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-3">
            <span className="w-2 h-8 bg-green-600 rounded-full"></span>
            সকল সংবাদ
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            {news.slice(1).map((item) => (
              <article key={item.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                <div className="flex items-start gap-5">
                  <div className="bg-gray-50 rounded-xl p-4 text-3xl shrink-0 group-hover:bg-green-50 transition-colors">
                    {item.emoji}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-2 leading-snug text-lg group-hover:text-green-800 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-2">
                      {item.excerpt}
                    </p>
                    <div className="flex items-center justify-between mt-auto">
                      <span className={`text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-tighter ${item.categoryColor}`}>
                        {item.category}
                      </span>
                      <span className="text-[11px] text-gray-400 font-medium italic">📅 {item.date}</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ── CALL TO ACTION (CTA) ── */}
        <section className="bg-gradient-to-r from-green-800 to-green-950 rounded-[2.5rem] p-10 md:p-16 text-white text-center shadow-2xl relative overflow-hidden">
          {/* Decorative Background Pattern */}
          <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-4">সব সময় আপডেটেড থাকতে চান?</h2>
            <p className="text-green-100 text-lg mb-8 max-w-lg mx-auto">
              আমাদের কমিউনিটিতে যোগ দিন এবং ক্যাম্পাসের প্রতিটি গুরুত্বপূর্ণ সংবাদ সরাসরি আপনার ইনবক্সে পান।
            </p>
            <Link 
              href="/register" 
              className="bg-white text-green-900 px-12 py-4 rounded-2xl font-bold text-lg hover:bg-green-50 hover:scale-105 transition-all shadow-lg inline-block active:scale-95"
            >
              এখনই Register করুন →
            </Link>
          </div>
        </section>

      </main>
    </div>
  )
}