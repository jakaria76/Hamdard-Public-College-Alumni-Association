import Link from 'next/link';

// SEO এবং মেটাডেটা
export const metadata = {
  title: 'Events | HPCAA',
  description: 'Hamdard Public College Alumni Association (HPCAA) এর সকল আসন্ন এবং পূর্ববর্তী ইভেন্ট ও অনুষ্ঠানের তালিকা।',
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

const events = [
  {
    id: 1,
    title: 'বার্ষিক পুনর্মিলনী ২০২৬',
    date: '১৫ এপ্রিল, ২০২৬',
    time: 'বিকাল ৪টা',
    location: 'হামদর্দ পাবলিক কলেজ অডিটোরিয়াম',
    type: 'upcoming',
    badge: 'আসছে',
    badgeColor: 'bg-green-100 text-green-800',
    emoji: '🎉',
  },
  {
    id: 2,
    title: 'Career Development Workshop',
    date: '২২ এপ্রিল, ২০২৬',
    time: 'সকাল ১০টা',
    location: 'অনলাইন (Zoom)',
    type: 'upcoming',
    badge: 'আসছে',
    badgeColor: 'bg-green-100 text-green-800',
    emoji: '💼',
  },
  {
    id: 3,
    title: 'Alumni Sports Day',
    date: '৫ মে, ২০২৬',
    time: 'সকাল ৯টা',
    location: 'কলেজ মাঠ',
    type: 'upcoming',
    badge: 'আসছে',
    badgeColor: 'bg-green-100 text-green-800',
    emoji: '⚽',
  },
  {
    id: 4,
    title: 'বার্ষিক পুনর্মিলনী ২০২৫',
    date: '১০ ডিসেম্বর, ২০২৫',
    time: 'বিকাল ৪টা',
    location: 'হামদর্দ পাবলিক কলেজ',
    type: 'past',
    badge: 'সম্পন্ন',
    badgeColor: 'bg-gray-100 text-gray-600',
    emoji: '✅',
  },
  {
    id: 5,
    title: 'Scholarship Program 2025',
    date: '২০ নভেম্বর, ২০২৫',
    time: 'সকাল ১১টা',
    location: 'কলেজ ক্যাম্পাস',
    type: 'past',
    badge: 'সম্পন্ন',
    badgeColor: 'bg-gray-100 text-gray-600',
    emoji: '✅',
  },
]

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* ── HERO SECTION ── */}
      <section className="bg-green-800 text-white py-20 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Events</h1>
        <p className="text-lg text-green-100 max-w-2xl mx-auto leading-relaxed">
          HPCAA এর সকল অনুষ্ঠান ও কার্যক্রম। সংযুক্ত থাকুন আপনার প্রিয় ক্যাম্পাসের সাথে।
        </p>
      </section>

      <main className="max-w-5xl mx-auto px-4 py-16">
        
        {/* ── UPCOMING EVENTS ── */}
        <section aria-labelledby="upcoming-events">
          <h2 id="upcoming-events" className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-2">
            <span className="w-2 h-8 bg-green-600 rounded-full"></span>
            আসন্ন অনুষ্ঠান
          </h2>
          <div className="space-y-6 mb-20">
            {events.filter(e => e.type === 'upcoming').map((event) => (
              <div key={event.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-start gap-5">
                    <div className="bg-green-100 rounded-2xl p-4 text-4xl shrink-0 flex items-center justify-center">
                      {event.emoji}
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <h3 className="font-bold text-gray-900 text-xl leading-tight">
                          {event.title}
                        </h3>
                        <span className={`text-xs px-3 py-1 rounded-full font-semibold uppercase tracking-wider ${event.badgeColor}`}>
                          {event.badge}
                        </span>
                      </div>
                      <div className="text-gray-500 space-y-2">
                        <div className="flex flex-wrap items-center gap-2 text-sm">
                          <span className="flex items-center gap-1">📅 {event.date}</span>
                          <span className="hidden md:inline text-gray-300">|</span>
                          <span className="flex items-center gap-1">⏰ {event.time}</span>
                        </div>
                        <div className="text-sm flex items-center gap-1">
                          📍 {event.location}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Link 
                    href="/login" 
                    className="bg-green-800 text-white text-center px-8 py-3 rounded-xl font-semibold hover:bg-green-700 hover:scale-105 transition-all active:scale-95 whitespace-nowrap shadow-sm"
                  >
                    Register →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── PAST EVENTS ── */}
        <section aria-labelledby="past-events">
          <h2 id="past-events" className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-2">
            <span className="w-2 h-8 bg-gray-400 rounded-full"></span>
            পূর্ববর্তী অনুষ্ঠান
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
            {events.filter(e => e.type === 'past').map((event) => (
              <div key={event.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 opacity-80 hover:opacity-100 transition-opacity">
                <div className="flex items-start gap-4">
                  <div className="bg-gray-100 rounded-xl p-3 text-3xl shrink-0">
                    {event.emoji}
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-bold text-gray-700 text-lg">{event.title}</h3>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${event.badgeColor}`}>
                        {event.badge}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500 space-y-1">
                      <div>📅 {event.date}</div>
                      <div>📍 {event.location}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CALL TO ACTION SECTION ── */}
        <section className="bg-gradient-to-br from-green-800 to-green-900 rounded-[2.5rem] p-8 md:p-14 text-white text-center shadow-2xl relative overflow-hidden">
          {/* Background Decorative Circle */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-green-700 rounded-full opacity-20"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              নতুন Event এর আপডেট পেতে চান?
            </h2>
            <p className="text-green-100 text-lg mb-8 max-w-xl mx-auto">
              আজই মেম্বার হিসেবে যুক্ত হোন এবং আমাদের সকল আসন্ন অনুষ্ঠানের নোটিফিকেশন পান।
            </p>
            <Link 
              href="/register" 
              className="bg-white text-green-900 px-10 py-4 rounded-2xl font-bold text-lg hover:bg-green-50 hover:-translate-y-1 transition-all inline-block shadow-lg active:translate-y-0"
            >
              এখনই Register করুন →
            </Link>
          </div>
        </section>

      </main>
    </div>
  )
}