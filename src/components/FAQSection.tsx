import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Какие гарантии вы предоставляете при покупке недвижимости?",
    answer: "Мы предоставляем полное юридическое сопровождение сделки, проверку чистоты титула собственности, а также гарантию возврата депозита в случае обнаружения юридических проблем. Все наши объекты проходят тщательную проверку перед включением в каталог."
  },
  {
    question: "Можно ли приобрести недвижимость удалённо?",
    answer: "Да, мы организуем полный цикл покупки дистанционно: виртуальные туры в формате 4K, онлайн-консультации с юристами, электронная подпись документов и безопасные международные платежи. Более 40% наших клиентов приобретают недвижимость без личного визита."
  },
  {
    question: "Какова средняя доходность от аренды элитной недвижимости?",
    answer: "Средняя годовая доходность составляет 5-8% для долгосрочной аренды и до 12-15% для краткосрочной аренды в премиальных локациях. Мы также предлагаем услуги управления недвижимостью с гарантированным доходом."
  },
  {
    question: "Помогаете ли вы с получением вида на жительство?",
    answer: "Да, мы сотрудничаем с ведущими иммиграционными адвокатами и помогаем нашим клиентам в получении ВНЖ и гражданства через инвестиции в недвижимость в различных странах, включая Португалию, Грецию, Испанию и ОАЭ."
  },
  {
    question: "Какие дополнительные услуги вы предоставляете после покупки?",
    answer: "После покупки мы предлагаем: управление недвижимостью, дизайн интерьера, меблировку, подключение коммуникаций, налоговое консультирование, а также консьерж-сервис для владельцев премиум-класса."
  },
  {
    question: "Как происходит процесс оплаты?",
    answer: "Мы работаем с международными банковскими переводами, криптовалютой и аккредитивами. Депозит составляет 10-30% от стоимости объекта. Предлагаем рассрочку до 3 лет без переплаты на отдельные проекты, а также помощь в получении ипотеки в европейских банках."
  }
];

const FAQSection = () => {
  return (
    <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 relative overflow-hidden" id="faq">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary/80 uppercase tracking-[0.3em] text-xs sm:text-sm font-medium">
            Ответы на вопросы
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif mt-3 sm:mt-4 mb-4 sm:mb-6 text-gradient-gold px-4">
            Часто задаваемые вопросы
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Мы собрали ответы на самые популярные вопросы наших клиентов
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="glass-card-gold p-4 sm:p-6 md:p-8 rounded-2xl"
        >
          <Accordion type="single" collapsible className="space-y-3 sm:space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="glass border border-primary/10 rounded-xl px-4 sm:px-6 overflow-hidden data-[state=open]:border-primary/30 transition-colors duration-300"
                >
                  <AccordionTrigger className="text-left text-sm sm:text-base md:text-lg font-medium text-foreground hover:text-primary transition-colors py-4 sm:py-5 hover:no-underline touch-manipulation">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm sm:text-base text-muted-foreground leading-relaxed pb-4 sm:pb-5">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-8 sm:mt-12"
        >
          <p className="text-sm sm:text-base text-muted-foreground mb-4">
            Не нашли ответ на свой вопрос?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
          >
            Свяжитесь с нами
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
