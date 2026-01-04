import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Award, Users, Home, Globe } from "lucide-react";

const stats = [
  { icon: Home, value: "50+", label: "Реализованных проектов" },
  { icon: Users, value: "1,200+", label: "Довольных клиентов" },
  { icon: Award, value: "7", label: "Лет опыта" },
  { icon: Globe, value: "25", label: "Стран-партнёров" },
];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-12 sm:py-16 md:py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute left-0 top-1/2 w-72 h-72 bg-glow-secondary/5 rounded-full blur-3xl -translate-y-1/2" />

      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary text-xs sm:text-sm font-medium tracking-wider uppercase">
              О компании
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mt-3 sm:mt-4 mb-4 sm:mb-6">
              Magnum Estate — <span className="text-gradient-gold">лидер</span> рынка
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 leading-relaxed">
              Мы являемся ведущим девелопером премиальной недвижимости на Бали. 
              Наша миссия — создавать исключительные объекты, которые сочетают 
              в себе роскошь, функциональность и высокую инвестиционную привлекательность.
            </p>
            <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
              Каждый наш проект — это результат тщательной работы лучших архитекторов, 
              дизайнеров и строителей. Мы гарантируем высочайшее качество на каждом этапе — 
              от выбора локации до финальной отделки.
            </p>

            <div className="flex flex-wrap gap-2 sm:gap-4">
              {["Премиум качество", "Прозрачность", "Гарантия ROI"].map((tag) => (
                <span
                  key={tag}
                  className="glass px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm text-foreground/80"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right Stats Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass-card p-4 sm:p-5 md:p-6 text-center group cursor-pointer touch-manipulation"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-14 rounded-2xl glass flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:animate-pulse-glow transition-all">
                  <stat.icon className="w-5 h-5 sm:w-6 sm:w-7 text-primary" />
                </div>
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gradient-gold mb-1 sm:mb-2">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground px-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
