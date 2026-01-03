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

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                <span className="text-xl font-serif font-bold text-primary-foreground">M</span>
              </div>
              <span className="text-2xl font-serif font-bold text-gradient-gold">
                MAGNUM ESTATE
              </span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md leading-relaxed">
              Ведущий девелопер премиальной недвижимости на Бали. 
              Создаём пространства для жизни и инвестиций вашей мечты с гарантированной доходностью.
            </p>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Phone className="w-4 h-4 text-primary" />
                <span>+62 812 3456 7890</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary" />
                <span>Семиньяк, Бали, Индонезия</span>
              </div>
            </div>

            <div className="flex gap-3">
              {socials.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-11 h-11 glass-card rounded-xl flex items-center justify-center hover:bg-primary/10 transition-colors group"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-serif font-bold text-foreground mb-6">Компания</h4>
            <ul className="space-y-4">
              {links.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary transition-colors" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-serif font-bold text-foreground mb-6">Информация</h4>
            <ul className="space-y-4">
              {links.legal.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary transition-colors" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Magnum Estate. Все права защищены.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Работаем для вас 24/7
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
