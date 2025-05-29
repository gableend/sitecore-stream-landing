import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Callout from "@/components/Callout";
import LightWavesBackground from "@/components/LightWavesBackground";

export default function Home() {
  return (
    <div className="min-h-screen relative">
      <LightWavesBackground />
      <div className="relative z-10">
        <Header />
        <main>
          <Hero />
          <Callout />
        </main>
      </div>
    </div>
  );
}
