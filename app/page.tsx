import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LoadingCurtain from "@/components/hero/LoadingCurtain";
import HeroSection from "@/components/hero/HeroSection";
import StyleQuiz from "@/components/quiz/StyleQuiz";
import RoomMockupStrip from "@/components/rooms/RoomMockupStrip";
import CompleteTheLook from "@/components/complete-look/CompleteTheLook";
import VisualSearch from "@/components/visual-search/VisualSearch";
import Testimonials from "@/components/trust/Testimonials";
import FinalCTA from "@/components/final-cta/FinalCTA";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black">
      <LoadingCurtain />
      
      {/* Hero Section handles its own Navbar placement */}
      <HeroSection />
      
      <div className="relative z-10">
        <StyleQuiz />
        <RoomMockupStrip />
        <CompleteTheLook />
        <VisualSearch />
        <Testimonials />
      </div>

      <Footer />
    </main>
  );
}
