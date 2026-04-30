import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LoadingCurtain from "@/components/hero/LoadingCurtain";
import HeroSection from "@/components/hero/HeroSection";
import StyleQuiz from "@/components/quiz/StyleQuiz";
import RoomMockupStrip from "@/components/rooms/RoomMockupStrip";
import CompleteTheLook from "@/components/complete-look/CompleteTheLook";
import SmartCorrection from "@/components/ai-correction/SmartCorrection";
import VisualSearch from "@/components/visual-search/VisualSearch";
import BundleRewards from "@/components/bundle/BundleRewards";
import SoftConsultation from "@/components/consultation/SoftConsultation";
import RealHomes from "@/components/trust/RealHomes";
import FinalCTA from "@/components/final-cta/FinalCTA";

import ThreadDivider from "@/components/ui/ThreadDivider";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[var(--color-alabaster)]">
      <LoadingCurtain />
      <Navbar />
      
      <HeroSection />
      <ThreadDivider />
      <StyleQuiz />
      <ThreadDivider />
      <RoomMockupStrip />
      <ThreadDivider />
      <CompleteTheLook />
      <ThreadDivider />
      <SmartCorrection />
      <ThreadDivider />
      <VisualSearch />
      <ThreadDivider />
      <BundleRewards />
      <ThreadDivider />
      <SoftConsultation />
      <ThreadDivider />
      <RealHomes />
      <ThreadDivider />
      <FinalCTA />

      <Footer />
    </main>
  );
}
