import Header from "@/components/Header";
import EventsSection from "@/components/EventsSection";
import LightWavesBackground from "@/components/LightWavesBackground";

export default function JoinConversationPage() {
  return (
    <div className="min-h-screen relative">
      <LightWavesBackground />
      <div className="relative z-10">
        <Header />
        <main className="pt-16">
          <EventsSection />
        </main>
      </div>
    </div>
  );
}
