import { motion } from "framer-motion";
import { Instagram, Facebook, Youtube, Linkedin } from "lucide-react";

const Footer = () => {
  const links = {
    company: [
      { name: "О нас", href: "#about" },
      { name: "Проекты", href: "#projects" },
      { name: "Инвестиции", href: "#investments" },
      { name: "Контакты", href: "#contact" },
    ],
    legal: [
      { name: "Политика конфиденциальности", href: "#" },
      { name: "Условия использования", href: "#" },
      { name: "Cookie Policy", href: "#" },
    ],
  };

  const socials = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Youtube, href: "#", label: "YouTube" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-border/30">
      <div className="absolute inset-0 hero-gradient opacity-30" />

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-serif font-bold text-gradient-gold mb-4">
              MAGNUM ESTATE
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              Ведущий девелопер премиальной недвижимости на Бали. 
              Создаём пространства для жизни и инвестиций вашей мечты.
            </p>
            <div className="flex gap-3">
              {socials.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 glass rounded-lg flex items-center justify-center hover:bg-primary/20 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-foreground/80" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-medium text-foreground mb-4">Компания</h4>
            <ul className="space-y-3">
              {links.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-medium text-foreground mb-4">Правовая информация</h4>
            <ul className="space-y-3">
              {links.legal.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border/30 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Magnum Estate. Все права защищены.
          </p>
          <p className="text-sm text-muted-foreground">
            Сделано с ❤️ для инвесторов
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
