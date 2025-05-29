import { Play } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-sitecore-light min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative py-10 lg:py-16">
          <div className="text-center max-w-4xl mx-auto space-y-8">
            {/* Heading */}
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
              Welcome to{" "}
              <span className="text-gradient">Sitecore.ai</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              AI is reshaping digital experience. Are you ready?
            </p>

            {/* Video Container */}
            <div className="pt-3">
              <div className="relative max-w-4xl mx-auto">
                <div className="relative aspect-video bg-muted rounded-2xl overflow-hidden shadow-2xl border border-border">
                  <iframe
                    src="https://share.synthesia.io/embeds/videos/ed600396-5007-4059-805c-74c8705d1c16"
                    loading="lazy"
                    title="Synthesia video player - AI Keynote"
                    allowFullScreen
                    allow="encrypted-media; fullscreen;"
                    className="absolute w-full h-full top-0 left-0 border-none"
                  />
                </div>

                {/* Decorative elements around video */}
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-sitecore-ultra-violet/20 rounded-2xl transform rotate-12" />
                <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-sitecore-core-red/20 rounded-xl transform -rotate-12" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
