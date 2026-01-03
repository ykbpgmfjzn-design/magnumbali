import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { TrendingUp, Shield, Clock, Banknote } from "lucide-react";
import { Button } from "@/components/ui/button";

const benefits = [
  {
    icon: TrendingUp,
    title: "Высокая доходность",
    description: "До 15% годовой доходности от аренды и 70% рост стоимости за 3 года",
  },
  {
    icon: Shield,
    title: "Надёжность",
    description: "Юридическая чистота сделки и полное сопровождение на всех этапах",
  },
  {
    icon: Clock,
    title: "Управление",
    description: "Профессиональное управление объектом и поиск арендаторов",
  },
  {
    icon: Banknote,
    title: "Гибкие условия",
    description: "Рассрочка до 24 месяцев без переплат и удобные схемы оплаты",
  },
];

const InvestmentsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="investments" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 hero-gradient opacity-50" />
      <div className="absolute right-0 bottom-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-wider uppercase">
            Инвестиции
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mt-4 mb-6">
            Почему <span className="text-gradient-gold">Бали</span>?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Остров привлекает миллионы туристов ежегодно, обеспечивая стабильный спрос на аренду и рост цен на недвижимость
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="glass-card p-6 text-center group"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <benefit.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-serif font-bold mb-3">{benefit.title}</h3>
              <p className="text-muted-foreground text-sm">{benefit.description}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA Block */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="glass-card p-8 md:p-12 text-center max-w-3xl mx-auto"
        >
          <h3 className="text-3xl font-serif font-bold mb-4">
            Готовы начать <span className="text-gradient-gold">инвестировать</span>?
          </h3>
          <p className="text-muted-foreground mb-8">
            Получите бесплатную консультацию от наших экспертов и узнайте о лучших инвестиционных возможностях
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="glow" size="xl">
              Бесплатная консультация
            </Button>
            <Button variant="outline" size="xl">
              Скачать каталог
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InvestmentsSection;
