import Hero from "./components/Hero";
import ChatInterface from "./components/ChatInterface";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-railway-navy text-white py-4 shadow-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-railway-orange rounded-full flex items-center justify-center font-bold text-white">
              RS
            </div>
            <h1 className="text-xl font-bold tracking-wide">RailSathi<span className="text-railway-orange">.AI</span></h1>
          </div>
          <nav className="hidden md:flex gap-6 text-sm font-medium text-railway-light">
            <span className="hover:text-white cursor-pointer transition">Home</span>
            <span className="hover:text-white cursor-pointer transition">About AI</span>
            <span className="hover:text-white cursor-pointer transition">Indian Railways</span>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        <Hero />
        <div className="max-w-4xl mx-auto px-4 py-12 -mt-16 relative z-10">
          <ChatInterface />
        </div>
      </main>

      <footer className="bg-gray-900 text-gray-400 py-8 text-center text-sm">
        <p>© {new Date().getFullYear()} RailSathi AI - Hackathon MVP. Powered by Next.js & Gemini AI.</p>
      </footer>
    </div>
  );
}