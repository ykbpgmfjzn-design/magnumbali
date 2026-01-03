import { useState, useEffect, useRef } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { Calculator, TrendingUp, PiggyBank, Calendar } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

const AnimatedNumber = ({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) => {
  const spring = useSpring(0, { stiffness: 100, damping: 30 });
  const display = useTransform(spring, (current) => 
    `${prefix}${Math.round(current).toLocaleString('ru-RU')}${suffix}`
  );

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  return <motion.span>{display}</motion.span>;
};

const InvestmentCalculator = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const [investment, setInvestment] = useState(350000);
  const [period, setPeriod] = useState(3);

  // Calculate returns
  const annualROI = 0.14; // 14% average
  const appreciation = 0.5; // 50% over period
  
  const rentalIncome = investment * annualROI * period;
  const propertyGrowth = investment * appreciation;
  const totalReturn = rentalIncome + propertyGrowth;
  const totalValue = investment + totalReturn;

  const investmentOptions = [
    { min: 150000, max: 250000, label: "$150K - $250K" },
    { min: 250000, max: 400000, label: "$250K - $400K" },
    { min: 400000, max: 700000, label: "$400K - $700K" },
    { min: 700000, max: 1500000, label: "$700K+" },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-glow-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 text-primary text-sm font-medium tracking-wider uppercase mb-4">
            <Calculator className="w-4 h-4" />
            Калькулятор инвестиций
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            Рассчитайте <span className="text-gradient-gold">вашу прибыль</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Узнайте потенциальную доходность от инвестиций в премиальную недвижимость на Бали
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-5xl mx-auto"
        >
          <div className="glass-card-gold p-8 md:p-12">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Controls */}
              <div className="space-y-10">
                {/* Investment Amount */}
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <label className="text-lg font-medium text-foreground">Сумма инвестиций</label>
                    <span className="text-2xl font-bold text-gradient-gold">
                      <AnimatedNumber value={investment} prefix="$" />
                    </span>
                  </div>
                  <Slider
                    value={[investment]}
                    onValueChange={(value) => setInvestment(value[0])}
                    min={150000}
                    max={1500000}
                    step={10000}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground mt-3">
                    <span>$150,000</span>
                    <span>$1,500,000</span>
                  </div>
                </div>

                {/* Investment Period */}
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <label className="text-lg font-medium text-foreground">Срок инвестирования</label>
                    <span className="text-2xl font-bold text-gradient-gold">{period} года</span>
                  </div>
                  <Slider
                    value={[period]}
                    onValueChange={(value) => setPeriod(value[0])}
                    min={1}
                    max={10}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground mt-3">
                    <span>1 год</span>
                    <span>10 лет</span>
                  </div>
                </div>

                {/* Quick Select Buttons */}
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-3 block">Быстрый выбор</label>
                  <div className="grid grid-cols-2 gap-3">
                    {investmentOptions.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => setInvestment((option.min + option.max) / 2)}
                        className={`py-3 px-4 rounded-xl text-sm font-medium transition-all duration-300 ${
                          investment >= option.min && investment <= option.max
                            ? "bg-primary/20 text-primary border border-primary/30"
                            : "glass hover:bg-primary/10 text-foreground/70"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Results */}
              <div className="space-y-6">
                <div className="glass-card p-6 space-y-6">
                  {/* Rental Income */}
                  <motion.div
                    className="flex items-center justify-between"
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <PiggyBank className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Доход от аренды</p>
                        <p className="text-xs text-muted-foreground/60">за {period} года</p>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-foreground animate-number-count">
                      <AnimatedNumber value={rentalIncome} prefix="+$" />
                    </div>
                  </motion.div>

                  {/* Property Growth */}
                  <motion.div
                    className="flex items-center justify-between"
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-glow-secondary/10 flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 text-glow-secondary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Рост стоимости</p>
                        <p className="text-xs text-muted-foreground/60">+50% за период</p>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-foreground">
                      <AnimatedNumber value={propertyGrowth} prefix="+$" />
                    </div>
                  </motion.div>

                  <div className="border-t border-border/30 pt-6">
                    {/* Total Return */}
                    <motion.div
                      className="flex items-center justify-between"
                      initial={{ opacity: 0, x: 20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                      transition={{ delay: 0.6 }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                          <Calendar className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Общая прибыль</p>
                          <p className="text-xs text-muted-foreground/60">через {period} года</p>
                        </div>
                      </div>
                      <div className="text-3xl font-bold text-gradient-gold">
                        <AnimatedNumber value={totalReturn} prefix="+$" />
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Total Value Card */}
                <motion.div
                  className="glass-card-gold p-6 text-center"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                  transition={{ delay: 0.7 }}
                >
                  <p className="text-sm text-muted-foreground mb-2">Итоговая стоимость актива</p>
                  <div className="text-4xl md:text-5xl font-bold text-gradient-gold mb-4">
                    <AnimatedNumber value={totalValue} prefix="$" />
                  </div>
                  <p className="text-sm text-primary">
                    +{Math.round((totalReturn / investment) * 100)}% к начальным инвестициям
                  </p>
                </motion.div>

                <Button variant="glow" size="xl" className="w-full">
                  Получить персональный расчёт
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InvestmentCalculator;
