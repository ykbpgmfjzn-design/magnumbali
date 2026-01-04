import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowDown, TrendingUp, Building2, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroAnimatedBg from "@/assets/hero-animated-bg.webp";

const HeroSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const stats = [
    { icon: TrendingUp, value: "ROI до 15%", label: "Годовая доходность" },
    { icon: Building2, value: "500+", label: "Объектов" },
    { icon: Shield, value: "360°", label: "Управление" },
  ];

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 sm:pt-0">
      {/* Animated WebP Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroAnimatedBg}
          alt=""
          className="w-full h-full object-contain md:object-cover object-top"
        />
      </div>

      {/* Animated Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-primary/30 animate-particle"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 1.2}s`,
            }}
          />
        ))}
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background z-10" />

      {/* Content */}
      <motion.div style={{ opacity }} className="container mx-auto px-4 sm:px-6 relative z-20 pt-24 sm:pt-28 md:pt-32 pb-20">
        <motion.div
          className="text-center max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-2 glass-card px-4 sm:px-5 py-2 mb-6 sm:mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs sm:text-sm font-medium text-primary">Премиальная недвижимость на Бали</span>
          </motion.div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold leading-tight mb-4 sm:mb-6 px-2">
            <span className="text-foreground">Magnum Estate:</span>
            <br />
            <span className="text-gradient-gold">Инвестиции в будущее Бали</span>
          </h1>

          <motion.p
            className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 sm:mb-12 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Эксклюзивные виллы и апартаменты для изысканной жизни и выгодных инвестиций на райском острове
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-12 sm:mb-16 px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Button variant="glow" size="xl" className="w-full sm:w-auto touch-manipulation text-sm sm:text-base py-6 sm:py-7">
              Смотреть объекты
            </Button>
            <Button variant="glass" size="xl" className="w-full sm:w-auto touch-manipulation text-sm sm:text-base py-6 sm:py-7">
              Рассчитать доходность
            </Button>
          </motion.div>

          {/* Stats Card - Glassmorphism */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="glass-card-gold p-6 sm:p-8 max-w-3xl mx-auto"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + index * 0.15 }}
                  className="flex flex-col items-center text-center group"
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-primary/20 transition-colors group-hover:animate-pulse-glow">
                    <stat.icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
                  </div>
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gradient-gold mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground px-2">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 hidden sm:flex"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Scroll</span>
            <ArrowDown className="w-5 h-5 text-primary" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
