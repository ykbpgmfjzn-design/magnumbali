import { motion } from "framer-motion";
import { ArrowDown, TrendingUp, Percent, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-villa.jpg";

const HeroSection = () => {
  const stats = [
    { icon: TrendingUp, value: "11-15%", label: "Годовая доходность" },
    { icon: Percent, value: "40-70%", label: "Рост стоимости" },
    { icon: DollarSign, value: "$250K", label: "Начальная цена" },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Luxury Villa in Bali"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background" />
        <div className="absolute inset-0 hero-gradient opacity-80" />
      </div>

      {/* Animated Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-glow-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 pt-20">
        <motion.div
          className="text-center max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.span
            className="inline-block px-4 py-2 glass-card text-sm font-medium text-primary mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            Премиальная недвижимость на Бали
          </motion.span>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold leading-tight mb-6">
            <span className="text-foreground">Инвестируйте в</span>
            <br />
            <span className="text-gradient-gold">роскошь будущего</span>
          </h1>

          <motion.p
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Эксклюзивные виллы и апартаменты для изысканной жизни и выгодных инвестиций на райском острове
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Button variant="glow" size="xl">
              Смотреть проекты
            </Button>
            <Button variant="glass" size="xl">
              Получить презентацию
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="glass-card p-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <div className="text-3xl font-bold text-gradient-gold mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDown className="w-6 h-6 text-primary" />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
