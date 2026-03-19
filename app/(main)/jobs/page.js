import Link from 'next/link'

// SEO মেটাডেটা (সার্ভার সাইড এনভায়রনমেন্টে কাজ করবে)
export const metadata = {
  title: 'Job Board | HPCAA',
  description: 'Hamdard Public College Alumni Association (HPCAA) এর অফিসিয়াল জব বোর্ড। আমাদের প্রাক্তন শিক্ষার্থীদের জন্য দেশি-বিদেশি বিভিন্ন কোম্পানিতে চাকরির সুযোগ।',
  keywords: 'HPCAA Jobs, Alumni Career, Hamdard Public College Career, Job Circular Bangladesh',
}

const jobs = [
  { id: 1, title: 'Software Engineer', company: 'TechBD Ltd.', location: 'ঢাকা, বাংলাদেশ', type: 'Full-time', typeColor: 'bg-blue-100 text-blue-800', salary: '৫০,০০০ - ৮০,০০০ টাকা', deadline: '৩০ এপ্রিল, ২০২৬', postedBy: 'আরিফ হোসেন (ব্যাচ ২০১০)', emoji: '💻' },
  { id: 2, title: 'Medical Officer', company: 'Ibn Sina Hospital', location: 'ঢাকা, বাংলাদেশ', type: 'Full-time', typeColor: 'bg-blue-100 text-blue-800', salary: '৬০,০০০ - ১,০০,০০০ টাকা', deadline: '১৫ এপ্রিল, ২০২৬', postedBy: 'ফাতেমা খানম (ব্যাচ ২০১২)', emoji: '🏥' },
  { id: 3, title: 'Business Development Manager', company: 'AH Group', location: 'চট্টগ্রাম, বাংলাদেশ', type: 'Full-time', typeColor: 'bg-blue-100 text-blue-800', salary: '৪৫,০০০ - ৭০,০০০ টাকা', deadline: '২০ এপ্রিল, ২০২৬', postedBy: 'তানভীর আহমেদ (ব্যাচ ২০১১)', emoji: '📊' },
  { id: 4, title: 'University Lecturer', company: 'Dhaka University', location: 'ঢাকা, বাংলাদেশ', type: 'Part-time', typeColor: 'bg-yellow-100 text-yellow-800', salary: '৩০,০০০ - ৫০,০০০ টাকা', deadline: '১০ মে, ২০২৬', postedBy: 'সুমাইয়া আক্তার (ব্যাচ ২০১৫)', emoji: '📚' },
  { id: 5, title: 'Frontend Developer (Intern)', company: 'StartupBD', location: 'রিমোট', type: 'Internship', typeColor: 'bg-green-100 text-green-800', salary: '১৫,০০০ - ২০,০০০ টাকা', deadline: '৫ মে, ২০২৬', postedBy: 'নাফিসা ইসলাম (ব্যাচ ২০১৪)', emoji: '🎨' },
]

export default function JobsPage() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* ── HERO SECTION ── */}
      <header className="bg-green-800 text-white py-20 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Job Board</h1>
        <p className="text-lg text-green-100 max-w-2xl mx-auto">
          HPCAA alumni দের জন্য বিশেষ চাকরির সুযোগ। ক্যারিয়ার গড়ুন আমাদের কমিউনিটির সাথে।
        </p>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-16">
        {/* ── STATS SECTION ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {[
            { number: '৫০+', label: 'সক্রিয় Job' }, 
            { number: '৩০+', label: 'কোম্পানি' }, 
            { number: '২০০+', label: 'সফল নিয়োগ' }
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="text-3xl font-bold text-green-800 mb-1">{stat.number}</div>
              <div className="text-gray-600 text-sm font-medium uppercase tracking-wide">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* ── JOB LIST ── */}
        <div className="space-y-6 mb-14">
          {jobs.map((job) => (
            <article key={job.id} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-50 hover:shadow-xl transition-all duration-300">
              <div className="flex flex-col md:flex-row items-start justify-between gap-6">
                <div className="flex items-start gap-5">
                  <div className="bg-green-50 rounded-2xl p-4 text-4xl shrink-0 flex items-center justify-center">
                    {job.emoji}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h3 className="font-bold text-gray-900 text-xl leading-tight">{job.title}</h3>
                      <span className={`text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider ${job.typeColor}`}>
                        {job.type}
                      </span>
                    </div>
                    <div className="text-gray-700 font-semibold mb-3 flex items-center gap-1">
                      🏢 {job.company}
                    </div>
                    <div className="text-sm text-gray-500 space-y-1.5">
                      <div className="flex items-center gap-2">
                         <span>📍 {job.location}</span>
                         <span className="text-gray-300">|</span>
                         <span className="text-green-700 font-medium">💰 {job.salary}</span>
                      </div>
                      <div>⏰ Deadline: <span className="text-red-600 font-medium">{job.deadline}</span></div>
                      <div className="pt-2">
                        <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-[10px] font-bold">
                          POSTED BY: {job.postedBy}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Link 
                  href="/login" 
                  className="bg-green-800 text-white text-center px-8 py-3 rounded-xl font-bold hover:bg-green-700 hover:scale-105 transition-all active:scale-95 whitespace-nowrap shadow-sm"
                >
                  Apply Now →
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* ── POST JOB CTA ── */}
        <div className="bg-gradient-to-br from-green-800 to-green-950 rounded-[2.5rem] p-10 md:p-14 text-white text-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-4">আপনার কোম্পানিতে লোক নিচ্ছেন?</h2>
            <p className="text-green-100 text-lg mb-8 max-w-xl mx-auto">
              HPCAA Job Board এ পোস্ট করুন এবং আমাদের দক্ষ ও যোগ্য Alumni খুঁজে নিন।
            </p>
            <Link 
              href="/login" 
              className="bg-white text-green-900 px-10 py-4 rounded-2xl font-bold text-lg hover:bg-green-50 hover:scale-105 transition-all shadow-lg inline-block active:scale-95"
            >
              Job Post করুন →
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}