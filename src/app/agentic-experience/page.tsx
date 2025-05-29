import Header from "@/components/Header";
import CountdownTimer from "@/components/CountdownTimer";

export default function AgenticExperiencePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Hero Section with Countdown */}
        <section className="relative w-full min-h-screen flex items-center justify-center pt-16 bg-cover bg-center bg-no-repeat bg-gray-800"
                 style={{
                   backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.1)), url('https://ext.same-assets.com/3416430368/394721931.jpeg')`
                 }}>
          <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-semibold mb-4 tracking-tight text-white">
              Something <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-purple-400">BIG</span> is coming
            </h1>
            <p className="text-xl md:text-2xl mb-4 text-gray-100">
              The future of digital experience—powered by autonomous AI agents.
            </p>
            <p className="text-lg md:text-xl mb-8 text-gray-200">
              Join us in Orlando at Symposium for the big reveal.
            </p>

            <CountdownTimer targetDate="2025-11-03T09:00:00.000Z" />

            <div className="mb-8">
              <a
                href="https://symposium.sitecore.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-gradient-to-r from-red-500 to-red-600 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Register for Symposium 2025
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
