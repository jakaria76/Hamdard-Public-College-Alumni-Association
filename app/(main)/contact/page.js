// Metadata for SEO
export const metadata = {
  title: 'যোগাযোগ | HPCAA',
  description: 'Hamdard Public College Alumni Association (HPCAA) এর সাথে যোগাযোগ করুন। আমাদের ঠিকানা, ইমেইল এবং সোশ্যাল মিডিয়া লিঙ্ক।',
};

export default function ContactPage() {
  const socialLinks = [
    { label: 'Facebook', color: 'bg-blue-600', hover: 'hover:bg-blue-700' },
    { label: 'LinkedIn', color: 'bg-blue-700', hover: 'hover:bg-blue-800' },
    { label: 'YouTube', color: 'bg-red-600', hover: 'hover:bg-red-700' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* ── HERO SECTION ── */}
      <div className="bg-green-800 text-white py-20 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">যোগাযোগ করুন</h1>
        <p className="text-lg text-green-100 max-w-2xl mx-auto">
          আমাদের সাথে যেকোনো বিষয়ে যোগাযোগ করতে পারেন। আমরা আপনার মতামত ও জিজ্ঞাসার অপেক্ষায় আছি।
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-16">

          {/* ── CONTACT INFO ── */}
          <div className="space-y-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
                <span className="w-2 h-10 bg-green-600 rounded-full"></span>
                আমাদের তথ্য
              </h2>
              <div className="space-y-8">
                <div className="flex items-start gap-5 group">
                  <div className="bg-green-100 rounded-2xl p-4 text-3xl group-hover:bg-green-600 group-hover:text-white transition-colors duration-300">
                    📍
                  </div>
                  <div>
                    <div className="font-bold text-gray-800 text-lg mb-1">ঠিকানা</div>
                    <div className="text-gray-600 leading-relaxed">
                      হামদর্দ পাবলিক কলেজ<br />
                      গজারিয়া, মুন্সীগঞ্জ (বা আপনার নির্দিষ্ট এলাকা)<br />
                      ঢাকা, বাংলাদেশ
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-5 group">
                  <div className="bg-green-100 rounded-2xl p-4 text-3xl group-hover:bg-green-600 group-hover:text-white transition-colors duration-300">
                    📧
                  </div>
                  <div>
                    <div className="font-bold text-gray-800 text-lg mb-1">ইমেইল</div>
                    <div className="text-gray-600 font-medium">info@hpcaa.org</div>
                  </div>
                </div>

                <div className="flex items-start gap-5 group">
                  <div className="bg-green-100 rounded-2xl p-4 text-3xl group-hover:bg-green-600 group-hover:text-white transition-colors duration-300">
                    📞
                  </div>
                  <div>
                    <div className="font-bold text-gray-800 text-lg mb-1">ফোন</div>
                    <div className="text-gray-600">+880 1XXX-XXXXXX</div>
                  </div>
                </div>

                <div className="flex items-start gap-5 group">
                  <div className="bg-green-100 rounded-2xl p-4 text-3xl group-hover:bg-green-600 group-hover:text-white transition-colors duration-300">
                    🕐
                  </div>
                  <div>
                    <div className="font-bold text-gray-800 text-lg mb-1">অফিস সময়</div>
                    <div className="text-gray-600">
                      রবি - বৃহস্পতি<br />
                      সকাল ১০টা - বিকাল ৫টা
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="font-bold text-gray-800 mb-5 text-xl">সোশ্যাল মিডিয়া</h3>
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((s) => (
                  <button
                    key={s.label}
                    className={`${s.color} ${s.hover} text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-md hover:-translate-y-1 transition-all duration-200`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ── CONTACT FORM ── */}
          <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-xl border border-gray-50 relative overflow-hidden">
            {/* Decorative element */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-green-50 rounded-full opacity-50"></div>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-8 relative z-10">বার্তা পাঠান</h2>
            <form className="space-y-5 relative z-10" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">আপনার নাম</label>
                <input
                  type="text"
                  placeholder="নাম লিখুন"
                  className="w-full border border-gray-200 bg-gray-50 rounded-2xl px-5 py-3.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">ইমেইল</label>
                <input
                  type="email"
                  placeholder="email@example.com"
                  className="w-full border border-gray-200 bg-gray-50 rounded-2xl px-5 py-3.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">বিষয়</label>
                <input
                  type="text"
                  placeholder="বিষয় লিখুন"
                  className="w-full border border-gray-200 bg-gray-50 rounded-2xl px-5 py-3.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">বার্তা</label>
                <textarea
                  rows={4}
                  placeholder="আপনার বার্তা লিখুন..."
                  className="w-full border border-gray-200 bg-gray-50 rounded-2xl px-5 py-3.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none transition-all"
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-green-800 text-white py-4 rounded-2xl font-bold text-lg hover:bg-green-700 shadow-lg hover:shadow-green-900/20 transition-all active:scale-95"
              >
                বার্তা পাঠান →
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}