import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

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
          className="flex items-center gap-3"
          whileHover={{ scale: 1.02 }}
        >
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
            <span className="text-lg font-serif font-bold text-primary-foreground">M</span>
          </div>
          <span className="text-xl font-serif font-bold text-gradient-gold tracking-wide hidden sm:block">
            MAGNUM ESTATE
          </span>
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
