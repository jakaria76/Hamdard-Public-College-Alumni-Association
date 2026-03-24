import Link from 'next/link'

// SEO মেটাডেটা (সার্ভার সাইড এনভায়রনমেন্টে কাজ করবে)
export const metadata = {
  title: 'Gallery | HPCAA',
  description: 'Hamdard Public College Alumni Association (HPCAA) এর ছবি ও স্মৃতির গ্যালারি। পুনর্মিলনী, ইভেন্ট এবং স্পোর্টসের মুহূর্তগুলো দেখুন।',
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

const categories = ['সব', 'পুনর্মিলনী', 'ইভেন্ট', 'স্পোর্টস', 'সাংস্কৃতিক']
const photos = [
  { id: 1, title: 'বার্ষিক পুনর্মিলনী ২০২৫', category: 'পুনর্মিলনী', emoji: '🎉', bg: 'bg-green-100' },
  { id: 2, title: 'Career Workshop ২০২৫', category: 'ইভেন্ট', emoji: '💼', bg: 'bg-blue-100' },
  { id: 3, title: 'Alumni Sports Day', category: 'স্পোর্টস', emoji: '⚽', bg: 'bg-red-100' },
  { id: 4, title: 'সাংস্কৃতিক অনুষ্ঠান', category: 'সাংস্কৃতিক', emoji: '🎭', bg: 'bg-purple-100' },
  { id: 5, title: 'Scholarship Award ২০২৫', category: 'ইভেন্ট', emoji: '🎓', bg: 'bg-yellow-100' },
  { id: 6, title: 'পুনর্মিলনী ২০২৪', category: 'পুনর্মিলনী', emoji: '🥳', bg: 'bg-pink-100' },
  { id: 7, title: 'ক্রিকেট টুর্নামেন্ট', category: 'স্পোর্টস', emoji: '🏏', bg: 'bg-orange-100' },
  { id: 8, title: 'নববর্ষ উৎসব', category: 'সাংস্কৃতিক', emoji: '🌸', bg: 'bg-teal-100' },
  { id: 9, title: 'Tech Talk ২০২৫', category: 'ইভেন্ট', emoji: '💻', bg: 'bg-indigo-100' },
]

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* ── HERO SECTION ── */}
      <div className="bg-green-800 text-white py-20 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Photo Gallery</h1>
        <p className="text-lg text-green-100 max-w-2xl mx-auto">
          HPCAA এর স্মরণীয় মুহূর্তগুলো। আমাদের প্রাক্তন শিক্ষার্থীদের এক অনন্য মেলবন্ধন।
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        
        {/* ── CATEGORIES (Filter UI) ── */}
        <div className="flex flex-wrap gap-3 mb-10 justify-center">
          {categories.map((cat) => (
            <button 
              key={cat} 
              className={`px-6 py-2.5 rounded-2xl text-sm font-bold transition-all duration-300 ${
                cat === 'সব' 
                ? 'bg-green-800 text-white shadow-lg shadow-green-900/20' 
                : 'bg-white text-gray-600 border border-gray-100 hover:bg-green-50 hover:text-green-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ── PHOTO GRID ── */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-16">
          {photos.map((photo) => (
            <div 
              key={photo.id} 
              className={`${photo.bg} rounded-[2rem] aspect-square flex flex-col items-center justify-center gap-4 hover:scale-105 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-xl border border-white/50 group`}
            >
              <div className="text-6xl group-hover:rotate-12 transition-transform duration-300">
                {photo.emoji}
              </div>
              <div className="text-center px-4">
                <div className="font-bold text-gray-800 text-sm md:text-base leading-tight">
                  {photo.title}
                </div>
                <div className="text-[10px] md:text-xs text-gray-500 mt-2 font-semibold uppercase tracking-wider">
                  {photo.category}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── CALL TO ACTION SECTION ── */}
        <div className="bg-gradient-to-br from-green-800 to-green-950 rounded-[3rem] p-10 md:p-16 text-white text-center shadow-2xl relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-700/20 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-4">আপনার ছবি শেয়ার করুন</h2>
            <p className="text-green-100 mb-8 max-w-lg mx-auto text-lg">
              HPCAA এর চমৎকার সব স্মৃতিগুলো সবার সাথে ভাগ করে নিতে এখনই আপলোড করুন।
            </p>
            <Link 
              href="/login" 
              className="bg-white text-green-900 px-10 py-4 rounded-2xl font-bold text-lg hover:bg-green-50 hover:scale-105 transition-all shadow-xl inline-block active:scale-95"
            >
              ছবি Upload করুন →
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}