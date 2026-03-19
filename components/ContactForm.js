'use client' // এটি মাস্ট

export default function ContactForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("আপনার বার্তাটি পাঠানো হয়েছে!");
  };

  return (
    <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-xl border border-gray-50 relative overflow-hidden">
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-green-50 rounded-full opacity-50"></div>
      <h2 className="text-2xl font-bold text-gray-800 mb-8 relative z-10">বার্তা পাঠান</h2>
      <form className="space-y-5 relative z-10" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">আপনার নাম</label>
          <input type="text" required placeholder="নাম লিখুন" className="w-full border border-gray-200 bg-gray-50 rounded-2xl px-5 py-3.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">ইমেইল</label>
          <input type="email" required placeholder="email@example.com" className="w-full border border-gray-200 bg-gray-50 rounded-2xl px-5 py-3.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">বার্তা</label>
          <textarea rows={4} required placeholder="আপনার বার্তা লিখুন..." className="w-full border border-gray-200 bg-gray-50 rounded-2xl px-5 py-3.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none transition-all" />
        </div>
        <button type="submit" className="w-full bg-green-800 text-white py-4 rounded-2xl font-bold text-lg hover:bg-green-700 shadow-lg transition-all active:scale-95">
          বার্তা পাঠান →
        </button>
      </form>
    </div>
  );
}