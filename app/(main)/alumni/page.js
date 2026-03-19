// এখানে 'use client' দেওয়ার দরকার নেই যদি না আপনি এখনই কোনো state (useState) ব্যবহার করেন।
// মেটাডেটা সার্ভার কম্পোনেন্টেই ভালো কাজ করে।

import Link from 'next/link'

export const metadata = {
  title: 'Alumni Directory | HPCAA',
  description: 'Hamdard Public College Alumni Association এর সকল প্রাক্তন শিক্ষার্থীদের তালিকা।',
}

const alumni = [
  { name: 'মোহাম্মদ রাহিম', batch: '২০১০', profession: 'Software Engineer', company: 'Google', avatar: '👨‍💻' },
  { name: 'ফাতেমা খানম', batch: '২০১২', profession: 'Doctor', company: 'DMCH', avatar: '👩‍⚕️' },
  { name: 'আরিফ হোসেন', batch: '২০০৮', profession: 'Businessman', company: 'AH Group', avatar: '👨‍💼' },
  { name: 'সুমাইয়া আক্তার', batch: '২০১৫', profession: 'Teacher', company: 'DU', avatar: '👩‍🏫' },
  { name: 'তানভীর আহমেদ', batch: '২০১১', profession: 'Engineer', company: 'BUET', avatar: '👨‍🔬' },
  { name: 'নাফিসা ইসলাম', batch: '২০১৪', profession: 'Lawyer', company: 'Supreme Court', avatar: '👩‍⚖️' },
]

export default function AlumniPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-green-800 text-white py-20 px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">Alumni Directory</h1>
        <p className="text-lg text-green-100 max-w-2xl mx-auto">
          হামদর্দ পাবলিক কলেজের গর্বিত প্রাক্তন শিক্ষার্থীরা
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">

        {/* Search & Filter */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="🔍 নাম দিয়ে খুঁজুন..."
              className="border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <select className="border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500">
              <option value="">সকল ব্যাচ</option>
              <option>২০২০</option>
              <option>২০১৮</option>
              <option>২০১৫</option>
            </select>
            <select className="border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500">
              <option value="">সকল পেশা</option>
              <option>Engineer</option>
              <option>Doctor</option>
            </select>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          {[
            { number: '২০০০+', label: 'মোট Alumni' },
            { number: '৫০+', label: 'ব্যাচ' },
            { number: '৩০+', label: 'দেশে Alumni' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100">
              <div className="text-3xl font-bold text-green-800 mb-1">{stat.number}</div>
              <div className="text-gray-600 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Alumni Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {alumni.map((a) => (
            <div key={a.name} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-green-100 rounded-full w-14 h-14 flex items-center justify-center text-3xl shrink-0">
                  {a.avatar}
                </div>
                <div>
                  <div className="font-bold text-gray-800">{a.name}</div>
                  <div className="text-sm text-green-700 font-medium">ব্যাচ {a.batch}</div>
                </div>
              </div>
              <div className="text-sm text-gray-600 mb-1">💼 {a.profession}</div>
              <div className="text-sm text-gray-600">🏢 {a.company}</div>
            </div>
          ))}
        </div>

        {/* Join CTA */}
        <div className="bg-green-800 rounded-2xl p-10 text-white text-center">
          <h2 className="text-2xl font-bold mb-3">আপনিও কি HPCAA Alumni?</h2>
          <p className="text-green-100 mb-6">Register করুন এবং আমাদের community তে যোগ দিন</p>
          <Link href="/register" className="bg-white text-green-800 px-8 py-3 rounded-xl font-bold hover:bg-green-50 transition-colors inline-block">
            এখনই Register করুন →
          </Link>
        </div>

      </div>
    </div>
  )
}