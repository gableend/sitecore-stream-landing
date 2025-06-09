import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Callout from "@/components/Callout";
import LightWavesBackground from "@/components/LightWavesBackground";
import OnboardingModal from "@/components/OnboardingModal";
import BentoGrid from "@/components/BentoGrid";
import CopilotButton from "@/components/CopilotButton";

export default function Home() {
  return (
    <div className="min-h-screen relative">
      <LightWavesBackground />
      <div className="relative z-10">
        <Header />
        <main>
          <OnboardingModal />
          <Hero />
          <BentoGrid />
          <Callout />
          <CopilotButton />
        </main>
      </div>
    </div>
  );
}
