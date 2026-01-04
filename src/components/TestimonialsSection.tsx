import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    id: 1,
    name: "Александр Петров",
    role: "Инвестор из Москвы",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    text: "Инвестировал в виллу через Magnum Estate год назад. ROI превзошёл все ожидания — 14% годовых. Команда полностью взяла на себя управление, я только получаю доход.",
  },
  {
    id: 2,
    name: "Елена Соколова",
    role: "Предприниматель",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    text: "Долго искала надёжного застройщика на Бали. Magnum Estate — это европейское качество и прозрачность на каждом этапе. Моя вилла сдаётся круглый год.",
  },
  {
    id: 3,
    name: "Дмитрий Волков",
    role: "IT-предприниматель",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    text: "Приобрёл два апартамента для пассивного дохода. Управляющая компания работает как часы — отчёты каждый месяц, выплаты без задержек.",
  },
  {
    id: 4,
    name: "Мария Иванова",
    role: "Инвестор",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    text: "Благодаря Magnum Estate я реализовала мечту — собственная вилла на океане. А главное — она приносит стабильный доход даже когда я не на Бали.",
  },
  {
    id: 5,
    name: "Сергей Козлов",
    role: "Бизнесмен из Санкт-Петербурга",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    text: "Профессиональный подход на всех этапах — от выбора объекта до оформления документов. Рекомендую всем, кто хочет инвестировать в недвижимость Бали.",
  },
];

const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true, 
    align: "center",
    skipSnaps: false,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  // Auto-scroll
  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [emblaApi]);

  return (
    <section ref={ref} className="py-12 sm:py-16 md:py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <span className="text-primary text-xs sm:text-sm font-medium uppercase tracking-widest mb-3 sm:mb-4 block">
            Отзывы
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-serif font-bold mb-4 sm:mb-6 px-4">
            <span className="text-foreground">Что говорят </span>
            <span className="text-gradient-gold">наши клиенты</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Более 500 успешных инвесторов уже доверили нам свои вложения
          </p>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative"
        >
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className="flex-[0_0_100%] min-w-0 md:flex-[0_0_50%] lg:flex-[0_0_33.333%] px-2 sm:px-4"
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    className={`glass-card p-5 sm:p-6 md:p-8 h-full transition-all duration-500 ${
                      selectedIndex === index 
                        ? "border-primary/30 shadow-[0_0_30px_rgba(212,175,55,0.15)]" 
                        : ""
                    }`}
                  >
                    {/* Quote Icon */}
                    <div className="mb-4 sm:mb-6">
                      <Quote className="w-8 h-8 sm:w-10 sm:h-10 text-primary/40" />
                    </div>

                    {/* Rating */}
                    <div className="flex gap-1 mb-3 sm:mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 sm:w-5 sm:h-5 fill-primary text-primary"
                        />
                      ))}
                    </div>

                    {/* Text */}
                    <p className="text-sm sm:text-base text-foreground/90 mb-6 sm:mb-8 leading-relaxed">
                      "{testimonial.text}"
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-3 sm:gap-4 mt-auto">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-primary/30 flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="text-sm sm:text-base font-semibold text-foreground truncate">
                          {testimonial.name}
                        </div>
                        <div className="text-xs sm:text-sm text-muted-foreground truncate">
                          {testimonial.role}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center items-center gap-3 sm:gap-4 mt-6 sm:mt-10">
            <Button
              variant="glass"
              size="icon"
              onClick={scrollPrev}
              className="rounded-full w-10 h-10 sm:w-12 sm:h-12 touch-manipulation"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => emblaApi?.scrollTo(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 touch-manipulation ${
                    selectedIndex === index
                      ? "w-6 sm:w-8 bg-primary"
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                />
              ))}
            </div>

            <Button
              variant="glass"
              size="icon"
              onClick={scrollNext}
              className="rounded-full w-10 h-10 sm:w-12 sm:h-12 touch-manipulation"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
