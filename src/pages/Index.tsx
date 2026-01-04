import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";
import AboutSection from "@/components/AboutSection";
import InvestmentCalculator from "@/components/InvestmentCalculator";
import InvestmentsSection from "@/components/InvestmentsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import Footer from "@/components/Footer";
import AIChatWidget from "@/components/AIChatWidget";

const Index = () => {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <HeroSection />
      <ProjectsSection />
      <InvestmentCalculator />
      <AboutSection />
      <InvestmentsSection />
      <TestimonialsSection />
      <FAQSection />
      <LeadCaptureForm />
      <Footer />
      <AIChatWidget />
    </main>
  );
};

export default Index;
