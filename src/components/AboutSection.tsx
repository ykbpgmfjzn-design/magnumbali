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
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute left-0 top-1/2 w-72 h-72 bg-glow-secondary/5 rounded-full blur-3xl -translate-y-1/2" />

      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary text-sm font-medium tracking-wider uppercase">
              О компании
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mt-4 mb-6">
              Magnum Estate — <span className="text-gradient-gold">лидер</span> рынка
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Мы являемся ведущим девелопером премиальной недвижимости на Бали. 
              Наша миссия — создавать исключительные объекты, которые сочетают 
              в себе роскошь, функциональность и высокую инвестиционную привлекательность.
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Каждый наш проект — это результат тщательной работы лучших архитекторов, 
              дизайнеров и строителей. Мы гарантируем высочайшее качество на каждом этапе — 
              от выбора локации до финальной отделки.
            </p>

            <div className="flex flex-wrap gap-4">
              {["Премиум качество", "Прозрачность", "Гарантия ROI"].map((tag) => (
                <span
                  key={tag}
                  className="glass px-4 py-2 rounded-full text-sm text-foreground/80"
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
            className="grid grid-cols-2 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass-card p-6 text-center group cursor-pointer"
              >
                <div className="w-14 h-14 rounded-2xl glass flex items-center justify-center mx-auto mb-4 group-hover:animate-pulse-glow transition-all">
                  <stat.icon className="w-7 h-7 text-primary" />
                </div>
                <div className="text-3xl font-bold text-gradient-gold mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
