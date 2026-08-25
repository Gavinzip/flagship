import { FaqSection } from "./components/FaqSection";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { HighlightsSection } from "./components/HighlightsSection";
import { MobileActionBar } from "./components/MobileActionBar";
import { MotionDirector } from "./components/MotionDirector";
import { TicketSection } from "./components/TicketSection";
import { VendorsSection } from "./components/VendorsSection";
import { VenueSection } from "./components/VenueSection";

export function App() {
  return (
    <>
      <MotionDirector />
      <Header />
      <main>
        <Hero />
        <MobileActionBar />
        <HighlightsSection />
        <VendorsSection />
        <VenueSection />
        <FaqSection />
        <TicketSection />
      </main>
      <Footer />
    </>
  );
}
