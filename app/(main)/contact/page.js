import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: 'যোগাযোগ | HPCAA',
  description: 'Hamdard Public College Alumni Association (HPCAA) এর সাথে যোগাযোগ করুন। আমাদের ঠিকানা, ইমেইল এবং ফোন নম্বর।',
};

export default function ContactPage() {
  const contactDetails = [
    {
      icon: "📍",
      title: "আমাদের ঠিকানা",
      desc: "হামদর্দ পাবলিক কলেজ, গজারিয়া, মুন্সীগঞ্জ, ঢাকা।",
      bg: "bg-blue-50",
    },
    {
      icon: "📧",
      title: "ইমেইল করুন",
      desc: "info@hpcaa.org\nsupport@hpcaa.org",
      bg: "bg-green-50",
    },
    {
      icon: "📞",
      title: "ফোন করুন",
      desc: "+880 1XXX-XXXXXX\n+880 1YYY-YYYYYY",
      bg: "bg-orange-50",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* ── HERO SECTION ── */}
      <div className="bg-green-800 text-white py-24 px-4 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 relative z-10">যোগাযোগ করুন</h1>
        <p className="text-green-100 text-lg max-w-2xl mx-auto relative z-10 opacity-90">
          আপনার যেকোনো জিজ্ঞাসা বা মতামতের জন্য আমাদের সাথে যোগাযোগ করুন। আমরা আপনার বার্তার অপেক্ষায় আছি।
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* ── LEFT: CONTACT INFO ── */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <span className="w-2 h-10 bg-green-600 rounded-full"></span>
                আমাদের তথ্য
              </h2>
              <p className="text-gray-600 mb-10 leading-relaxed">
                HPCAA এর অফিসিয়াল কার্যক্রমে অংশ নিতে বা কোনো তথ্য জানতে নিচের মাধ্যমগুলোতে যোগাযোগ করতে পারেন।
              </p>
            </div>

            <div className="space-y-6">
              {contactDetails.map((detail, idx) => (
                <div key={idx} className="flex items-start gap-5 p-6 bg-white rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-all group">
                  <div className={`${detail.bg} rounded-2xl w-16 h-16 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform`}>
                    {detail.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 text-xl mb-1">{detail.title}</h3>
                    <p className="text-gray-600 whitespace-pre-line leading-relaxed">
                      {detail.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Google Map Placeholder (Optional) */}
            <div className="rounded-[2rem] overflow-hidden shadow-lg h-64 bg-gray-200 border-4 border-white">
               {/* এখানে আপনি Google Map iframe দিতে পারেন */}
               <div className="w-full h-full flex items-center justify-center text-gray-400 font-medium italic">
                  Google Map Area
               </div>
            </div>
          </div>

          {/* ── RIGHT: CONTACT FORM ── */}
          <div className="lg:col-span-7">
            <div className="sticky top-28">
               <ContactForm />
            </div>
          </div>

        </div>
      </div>

      {/* ── BOTTOM DECORATION ── */}
      <div className="bg-white border-t border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
            <h3 className="text-gray-400 uppercase tracking-[0.3em] font-bold text-xs mb-6">আমাদের সোশ্যাল মিডিয়া</h3>
            <div className="flex justify-center gap-6">
                {['Facebook', 'LinkedIn', 'Instagram', 'Twitter'].map(social => (
                    <button key={social} className="text-gray-600 hover:text-green-700 font-bold transition-colors">
                        {social}
                    </button>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
}