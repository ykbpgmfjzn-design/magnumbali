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
  const [rentalROI, setRentalROI] = useState(14); // 14% default rental income
  const [constructionGrowth, setConstructionGrowth] = useState(25); // 25% default during construction
  const [postConstructionGrowth, setPostConstructionGrowth] = useState(10); // 10% default after construction

  // Calculate returns
  const annualROI = rentalROI / 100; // Convert percentage to decimal

  // Property appreciation calculation:
  // Years 1-2: construction growth % per year
  // Years 3+: post-construction growth % per year (compound)
  const calculateAppreciation = (initialValue: number, years: number) => {
    let currentValue = initialValue;
    const constructionRate = 1 + (constructionGrowth / 100);
    const postConstructionRate = 1 + (postConstructionGrowth / 100);

    // Year 1: construction growth
    if (years >= 1) {
      currentValue = currentValue * constructionRate;
    }

    // Year 2: construction growth
    if (years >= 2) {
      currentValue = currentValue * constructionRate;
    }

    // Years 3+: post-construction compound growth each year
    if (years > 2) {
      const additionalYears = years - 2;
      currentValue = currentValue * Math.pow(postConstructionRate, additionalYears);
    }

    return currentValue - initialValue; // Total appreciation
  };

  // Rental income starts from year 3
  const rentalYears = period > 2 ? period - 2 : 0;
  const rentalIncome = investment * annualROI * rentalYears;
  const propertyGrowth = calculateAppreciation(investment, period);
  const totalReturn = rentalIncome + propertyGrowth;
  const totalValue = investment + totalReturn;

  // Average ROI per year
  const averageROIPerYear = period > 0 ? (totalReturn / investment / period) * 100 : 0;

  const investmentOptions = [
    { value: 200000, label: "$200K" },
    { value: 400000, label: "$400K" },
    { value: 700000, label: "$700K" },
    { value: 1200000, label: "$1.2M" },
  ];

  return (
    <section id="calculator" className="py-12 sm:py-16 md:py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-glow-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <span className="inline-flex items-center gap-2 text-primary text-xs sm:text-sm font-medium tracking-wider uppercase mb-3 sm:mb-4">
            <Calculator className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            Калькулятор инвестиций
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold leading-[1.25] sm:leading-[1.3] mb-4 sm:mb-6 px-4">
            Рассчитайте <span className="text-gradient-gold">вашу прибыль</span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-4">
            Узнайте потенциальную доходность от инвестиций в премиальную недвижимость на Бали
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-5xl mx-auto"
        >
          <div className="glass-card-gold p-4 sm:p-6 md:p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12">
              {/* Controls */}
              <div className="space-y-6 sm:space-y-8 md:space-y-10">
                {/* Investment Amount */}
                <div>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-2">
                    <label className="text-base sm:text-lg font-medium text-foreground">Сумма инвестиций</label>
                    <span className="text-xl sm:text-2xl font-bold text-gradient-gold">
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
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-2">
                    <label className="text-base sm:text-lg font-medium text-foreground">Срок инвестирования</label>
                    <span className="text-xl sm:text-2xl font-bold text-gradient-gold">{period} года</span>
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

                {/* Rental ROI */}
                <div>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-2">
                    <label className="text-base sm:text-lg font-medium text-foreground">Доход от аренды</label>
                    <span className="text-xl sm:text-2xl font-bold text-gradient-gold">{rentalROI}%</span>
                  </div>
                  <Slider
                    value={[rentalROI]}
                    onValueChange={(value) => setRentalROI(value[0])}
                    min={6}
                    max={15}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground mt-3">
                    <span>6%</span>
                    <span>15%</span>
                  </div>
                  <p className="text-xs text-muted-foreground/70 mt-2 italic">
                    * Доход начинается с ввода проекта в эксплуатацию (с 3-го года)
                  </p>
                </div>

                {/* Construction Growth */}
                <div>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-2">
                    <label className="text-base sm:text-lg font-medium text-foreground">Рост стоимости (период стройки)</label>
                    <span className="text-xl sm:text-2xl font-bold text-gradient-gold">{constructionGrowth}%</span>
                  </div>
                  <Slider
                    value={[constructionGrowth]}
                    onValueChange={(value) => setConstructionGrowth(value[0])}
                    min={10}
                    max={30}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground mt-3">
                    <span>10%</span>
                    <span>30%</span>
                  </div>
                </div>

                {/* Post-Construction Growth */}
                <div>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-2">
                    <label className="text-base sm:text-lg font-medium text-foreground">Рост стоимости (после ввода)</label>
                    <span className="text-xl sm:text-2xl font-bold text-gradient-gold">{postConstructionGrowth}%</span>
                  </div>
                  <Slider
                    value={[postConstructionGrowth]}
                    onValueChange={(value) => setPostConstructionGrowth(value[0])}
                    min={5}
                    max={15}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground mt-3">
                    <span>5%</span>
                    <span>15%</span>
                  </div>
                </div>

                {/* Quick Select Buttons */}
                <div>
                  <label className="text-xs sm:text-sm font-medium text-muted-foreground mb-3 block">Быстрый выбор</label>
                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    {investmentOptions.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => setInvestment(option.value)}
                        className={`py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 touch-manipulation ${
                          investment === option.value
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
              <div className="space-y-4 sm:space-y-6">
                <div className="glass-card p-4 sm:p-6 space-y-4 sm:space-y-6">
                  {/* Rental Income */}
                  <motion.div
                    className="flex items-center justify-between"
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <PiggyBank className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs sm:text-sm text-muted-foreground">Доход от аренды</p>
                        <p className="text-xs text-muted-foreground/60">
                          {period <= 2 ? `${rentalROI}% годовых с 3-го года` : `${rentalROI}% за ${rentalYears} ${rentalYears === 1 ? 'год' : 'года'}`}
                        </p>
                      </div>
                    </div>
                    <div className="text-lg sm:text-xl md:text-2xl font-bold text-foreground animate-number-count text-right sm:text-left">
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
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-glow-secondary/10 flex items-center justify-center flex-shrink-0">
                        <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-glow-secondary" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs sm:text-sm text-muted-foreground">Рост стоимости</p>
                        <p className="text-xs text-muted-foreground/60">
                          {constructionGrowth}% в год (период стройки), {postConstructionGrowth}% в год
                        </p>
                      </div>
                    </div>
                    <div className="text-lg sm:text-xl md:text-2xl font-bold text-foreground text-right sm:text-left">
                      <AnimatedNumber value={propertyGrowth} prefix="+$" />
                    </div>
                  </motion.div>

                  {/* Average ROI per Year */}
                  <motion.div
                    className="flex items-center justify-between bg-primary/5 rounded-xl p-3 sm:p-4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                    transition={{ delay: 0.55 }}
                  >
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <Calculator className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs sm:text-sm text-muted-foreground font-semibold">Средний ROI за год</p>
                        <p className="text-xs text-muted-foreground/60">
                          За {period} {period === 1 ? 'год' : 'года'}
                        </p>
                      </div>
                    </div>
                    <div className="text-lg sm:text-xl md:text-2xl font-bold text-primary text-right sm:text-left">
                      <AnimatedNumber value={averageROIPerYear} suffix="%" />
                    </div>
                  </motion.div>

                  <div className="border-t border-border/30 pt-6">
                    {/* Total Return */}
                    <motion.div
                      className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0"
                      initial={{ opacity: 0, x: 20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                      transition={{ delay: 0.6 }}
                    >
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                          <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                        </div>
                        <div>
                          <p className="text-xs sm:text-sm text-muted-foreground">Общая прибыль (после продажи актива)</p>
                          <p className="text-xs text-muted-foreground/60">через {period} года</p>
                        </div>
                      </div>
                      <div className="text-2xl sm:text-3xl font-bold text-gradient-gold text-right sm:text-left w-full sm:w-auto">
                        <AnimatedNumber value={totalReturn} prefix="+$" />
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Total Value Card */}
                <motion.div
                  className="glass-card-gold p-4 sm:p-6 text-center"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                  transition={{ delay: 0.7 }}
                >
                  <p className="text-xs sm:text-sm text-muted-foreground mb-2">Итоговая стоимость актива и доход от аренды</p>
                  <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-gradient-gold mb-3 sm:mb-4">
                    <AnimatedNumber value={totalValue} prefix="$" />
                  </div>
                  <p className="text-xs sm:text-sm text-primary">
                    +{Math.round((totalReturn / investment) * 100)}% к начальным инвестициям
                  </p>
                </motion.div>

                <Button variant="glow" size="xl" className="w-full touch-manipulation text-sm sm:text-base py-6 sm:py-7">
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
