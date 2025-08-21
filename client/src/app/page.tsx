import { Leaf, Clock, Recycle } from "lucide-react"; // install lucide-react for icons
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-gradient-to-b from-green-50 to-green-100 min-h-screen flex flex-col">
      
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center flex-1 px-6 py-20 text-center">
        <h1 className="text-6xl font-extrabold text-green-700">
          KeepItFresh
        </h1>
        <p className="mt-4 text-xl text-gray-600 max-w-2xl">
          Track freshness, cut waste, and save money — your smart kitchen companion.
        </p>
        <Link href="/Auth" className="mt-8">
          <button className="mt-8 px-8 py-4 bg-green-600 text-white text-lg rounded-xl shadow hover:bg-green-700 transition">
           Get Started
          </button>
        </Link>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-green-700 mb-12">
            Why Choose KeepItFresh?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
            <div className="flex flex-col items-center">
              <Leaf className="text-green-500 w-12 h-12 mb-4" />
              <h3 className="text-xl font-semibold">Eco-Friendly</h3>
              <p className="text-gray-500 mt-2">Reduce food waste and protect the planet.</p>
            </div>
            <div className="flex flex-col items-center">
              <Clock className="text-green-500 w-12 h-12 mb-4" />
              <h3 className="text-xl font-semibold">Real-Time Alerts</h3>
              <p className="text-gray-500 mt-2">Get notified before food expires.</p>
            </div>
            <div className="flex flex-col items-center">
              <Recycle className="text-green-500 w-12 h-12 mb-4" />
              <h3 className="text-xl font-semibold">Save Money</h3>
              <p className="text-gray-500 mt-2">Buy smart, store better, spend less.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-700 text-white py-6 text-center">
        © {new Date().getFullYear()} KeepItFresh — All Rights Reserved
      </footer>

    </main>
  );
}
