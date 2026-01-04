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
        isScrolled ? "glass py-3" : "py-5"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <motion.a
          href="#"
          className="flex items-center"
          whileHover={{ scale: 1.02 }}
        >
          <div className="relative">
            {/* Glow effect behind logo */}
            <div className="absolute inset-0 blur-xl bg-primary/30 scale-150 opacity-60" />
            {/* Drop shadow for contrast on any background */}
            <img
              src={logo}
              alt="Magnum Estate"
              className="h-10 sm:h-12 w-auto relative z-10 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] brightness-110 contrast-110"
            />
          </div>
        </motion.a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors duration-300 relative group"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-primary/50 transition-all duration-300 group-hover:w-full" />
            </motion.a>
          ))}
        </nav>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="hidden lg:block"
        >
          <Button variant="glow" size="lg">
            Получить консультацию
          </Button>
        </motion.div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-foreground p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatedMobileMenu
        isOpen={isMobileMenuOpen}
        navLinks={navLinks}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </motion.header>
  );
};

const AnimatedMobileMenu = ({
  isOpen,
  navLinks,
  onClose,
}: {
  isOpen: boolean;
  navLinks: { name: string; href: string }[];
  onClose: () => void;
}) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="lg:hidden glass-card mt-4 mx-4 p-6"
    >
      <nav className="flex flex-col gap-4">
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className="text-foreground/80 hover:text-primary transition-colors py-2 border-b border-border/30 last:border-0"
            onClick={onClose}
          >
            {link.name}
          </a>
        ))}
        <Button variant="glow" className="mt-4">
          Получить консультацию
        </Button>
      </nav>
    </motion.div>
  );
};

export default Header;
