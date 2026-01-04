import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      const headerOffset = 80; // Height of fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const navLinks = [
    { name: "Объекты", href: "#projects" },
    { name: "Калькулятор", href: "#calculator" },
    { name: "О компании", href: "#about" },
    { name: "Контакты", href: "#contact" },
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "glass py-2 sm:py-3" : "py-3 sm:py-5"
      }`}
    >
      <div className="container mx-auto px-3 sm:px-4 flex items-center justify-between">
        <motion.a
          href="#"
          className="flex items-center"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="relative">
            {/* Glow effect behind logo */}
            <div className="absolute inset-0 blur-xl bg-primary/30 scale-150 opacity-60" />
            {/* Drop shadow for contrast on any background */}
            <img
              src={logo}
              alt="Magnum Estate"
              className="h-8 sm:h-10 md:h-12 w-auto relative z-10 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] brightness-110 contrast-110"
            />
          </div>
        </motion.a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-2">
          {navLinks.map((link, index) => (
            <motion.button
              key={link.name}
              onClick={() => scrollToSection(link.href)}
              className="relative px-5 py-2.5 text-sm font-medium text-foreground/80 rounded-full overflow-hidden group transition-all duration-300 hover:text-primary-foreground"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Background glow effect on hover */}
              <span className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary group-hover:via-primary/90 group-hover:to-primary/80 transition-all duration-300 rounded-full" />
              {/* Subtle border */}
              <span className="absolute inset-0 rounded-full border border-foreground/10 group-hover:border-primary/50 transition-all duration-300" />
              {/* Shimmer effect on hover */}
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </span>
              {/* Text */}
              <span className="relative z-10">{link.name}</span>
            </motion.button>
          ))}
        </nav>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="hidden lg:block"
        >
          <Button variant="glow" size="lg" className="text-sm md:text-base">
            Получить консультацию
          </Button>
        </motion.div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-foreground p-2 -mr-1 touch-manipulation"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatedMobileMenu
        isOpen={isMobileMenuOpen}
        navLinks={navLinks}
        onClose={() => setIsMobileMenuOpen(false)}
        scrollToSection={scrollToSection}
      />
    </motion.header>
  );
};

const AnimatedMobileMenu = ({
  isOpen,
  navLinks,
  onClose,
  scrollToSection,
}: {
  isOpen: boolean;
  navLinks: { name: string; href: string }[];
  onClose: () => void;
  scrollToSection: (sectionId: string) => void;
}) => {
  if (!isOpen) return null;

  const handleLinkClick = (href: string) => {
    scrollToSection(href);
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="lg:hidden glass-card mt-2 mx-3 sm:mx-4 p-4 sm:p-6 rounded-xl"
    >
      <nav className="flex flex-col gap-2 sm:gap-3">
        {navLinks.map((link) => (
          <motion.button
            key={link.name}
            onClick={() => handleLinkClick(link.href)}
            className="relative text-base sm:text-lg text-foreground/80 py-3 sm:py-4 px-4 rounded-xl overflow-hidden group touch-manipulation text-left transition-all duration-300"
            whileHover={{ scale: 1.02, x: 8 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Background effect */}
            <span className="absolute inset-0 bg-gradient-to-r from-primary/0 to-primary/0 group-hover:from-primary/20 group-hover:to-primary/5 transition-all duration-300 rounded-xl" />
            {/* Left accent bar */}
            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-primary rounded-full group-hover:h-1/2 transition-all duration-300" />
            {/* Text */}
            <span className="relative z-10 group-hover:text-primary transition-colors duration-300">{link.name}</span>
          </motion.button>
        ))}
        <Button variant="glow" className="mt-2 sm:mt-4 w-full py-6 text-base font-semibold touch-manipulation">
          Получить консультацию
        </Button>
      </nav>
    </motion.div>
  );
};

export default Header;
