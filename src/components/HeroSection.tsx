import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroAnimatedBg from "@/assets/hero-animated-bg.webp";

const HeroSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 sm:pt-0">
      {/* Animated WebP Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroAnimatedBg}
          alt=""
          className="w-full h-full object-cover md:object-contain object-center"
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
      <div className="container mx-auto px-4 sm:px-6 relative z-20 pt-24 sm:pt-28 md:pt-32 pb-20">
        {/* Animated Content - only title, text, buttons fade on scroll */}
        <motion.div 
          style={{ opacity }} 
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
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold leading-[1.2] sm:leading-[1.3] md:leading-[1.25] mb-4 sm:mb-6 px-2">
            <span className="text-foreground">Magnum Estate:</span>
            <br />
            <span className="text-gradient-gold">Инвестиции в будущее Бали</span>
          </h1>

          <motion.p
            className="text-base sm:text-lg md:text-xl text-foreground/90 max-w-2xl mx-auto mb-8 sm:mb-12 px-6 py-4 sm:px-8 sm:py-5 leading-relaxed rounded-2xl backdrop-blur-sm"
            style={{
              background: "linear-gradient(135deg, rgba(10, 10, 10, 0.7) 0%, rgba(10, 10, 10, 0.5) 100%)",
              border: "1px solid rgba(255, 255, 255, 0.05)",
            }}
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
      </div>
    </section>
  );
};

export default HeroSection;
