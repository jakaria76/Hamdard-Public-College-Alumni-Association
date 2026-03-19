import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: 'যোগাযোগ | HPCAA',
  description: 'Hamdard Public College Alumni Association (HPCAA) এর সাথে যোগাযোগ করুন।',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="bg-green-800 text-white py-20 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">যোগাযোগ করুন</h1>
      </div>
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-16">
          {/* আপনার আগের Contact Info সেকশন এখানে থাকবে */}
          <div>... (Contact Info) ...</div>

          {/* ফর্মের বদলে এখন শুধু কম্পোনেন্টটি ডাকবেন */}
          <ContactForm />
        </div>
      </div>
    </div>
  );
}