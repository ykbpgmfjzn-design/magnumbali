import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";
import AboutSection from "@/components/AboutSection";
import InvestmentsSection from "@/components/InvestmentsSection";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

const Index = () => {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <HeroSection />
      <ProjectsSection />
      <AboutSection />
      <InvestmentsSection />
      <ContactForm />
      <Footer />
      <ChatWidget />
    </main>
  );
};

export default Index;
