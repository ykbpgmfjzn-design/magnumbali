import { motion } from "framer-motion";
import { Instagram, Send, Youtube, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const links = {
    company: [
      { name: "О нас", href: "#about" },
      { name: "Проекты", href: "#projects" },
      { name: "Инвестиции", href: "#investments" },
      { name: "Калькулятор", href: "#calculator" },
    ],
    legal: [
      { name: "Политика конфиденциальности", href: "#" },
      { name: "Условия использования", href: "#" },
    ],
  };

  const socials = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Send, href: "#", label: "Telegram" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-border/20">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background to-card/50" />

      <div className="container mx-auto px-4 sm:px-6 py-10 sm:py-12 md:py-16 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12 mb-8 sm:mb-10 md:mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center flex-shrink-0">
                <span className="text-lg sm:text-xl font-serif font-bold text-primary-foreground">M</span>
              </div>
              <span className="text-xl sm:text-2xl font-serif font-bold text-gradient-gold">
                MAGNUM ESTATE
              </span>
            </div>
            <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 max-w-md leading-relaxed">
              Ведущий девелопер премиальной недвижимости на Бали. 
              Создаём пространства для жизни и инвестиций вашей мечты с гарантированной доходностью.
            </p>
            
            <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
              <div className="flex items-center gap-2 sm:gap-3 text-muted-foreground text-sm sm:text-base">
                <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
                <a href="tel:+6281234567890" className="hover:text-primary transition-colors break-all touch-manipulation">+62 812 3456 7890</a>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 text-muted-foreground text-sm sm:text-base">
                <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
                <span>Семиньяк, Бали, Индонезия</span>
              </div>
            </div>

            <div className="flex gap-2 sm:gap-3">
              {socials.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 sm:w-11 sm:h-11 glass-card rounded-xl flex items-center justify-center hover:bg-primary/10 transition-colors group touch-manipulation"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-base sm:text-lg font-serif font-bold leading-[1.3] text-foreground mb-4 sm:mb-6">Компания</h4>
            <ul className="space-y-3 sm:space-y-4">
              {links.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group touch-manipulation"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary transition-colors flex-shrink-0" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-base sm:text-lg font-serif font-bold leading-[1.3] text-foreground mb-4 sm:mb-6">Информация</h4>
            <ul className="space-y-3 sm:space-y-4">
              {links.legal.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group touch-manipulation"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary transition-colors flex-shrink-0" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6 sm:pt-8 border-t border-border/20 flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
          <p className="text-xs sm:text-sm text-muted-foreground text-center md:text-left">
            © {new Date().getFullYear()} Magnum Estate. Все права защищены.
          </p>
          <p className="text-xs sm:text-sm text-muted-foreground flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Работаем для вас 24/7
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
