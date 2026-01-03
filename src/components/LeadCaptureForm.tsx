import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Send, Phone, Mail, MapPin, MessageCircle, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const budgetOptions = [
  { value: "150-250", label: "$150,000 - $250,000" },
  { value: "250-400", label: "$250,000 - $400,000" },
  { value: "400-700", label: "$400,000 - $700,000" },
  { value: "700-1000", label: "$700,000 - $1,000,000" },
  { value: "1000+", label: "$1,000,000+" },
];

const LeadCaptureForm = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    whatsapp: "",
    budget: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: "Заявка отправлена!",
      description: "Наш консультант свяжется с вами в ближайшее время через WhatsApp",
    });

    setFormData({ name: "", whatsapp: "", budget: "" });
    setIsSubmitting(false);
  };

  const contactInfo = [
    { icon: Phone, label: "Телефон", value: "+62 812 3456 7890" },
    { icon: Mail, label: "Email", value: "invest@magnumestate.com" },
    { icon: MapPin, label: "Офис", value: "Семиньяк, Бали" },
  ];

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-glow-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-wider uppercase">
            Начните инвестировать
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mt-4 mb-6">
            Получите <span className="text-gradient-gold">персональную</span> консультацию
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Оставьте заявку и наш инвестиционный консультант свяжется с вами через WhatsApp
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
          {/* Contact Info - Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="glass-card p-6 space-y-6">
              <h3 className="text-xl font-serif font-bold text-foreground">Контакты</h3>
              {contactInfo.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">{item.label}</p>
                    <p className="font-medium text-foreground">{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="glass-card-gold p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <p className="font-medium text-foreground">WhatsApp Support</p>
                  <p className="text-xs text-muted-foreground">Отвечаем за 15 минут</p>
                </div>
              </div>
              <Button variant="glass" className="w-full">
                Написать в WhatsApp
              </Button>
            </div>
          </motion.div>

          {/* Form - Right Side */}
          <motion.form
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            onSubmit={handleSubmit}
            className="lg:col-span-3 glass-card-gold p-8 space-y-6"
          >
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs text-primary">1</span>
                Как вас зовут?
              </label>
              <Input
                placeholder="Введите ваше имя"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="h-14 text-base"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs text-primary">2</span>
                Ваш WhatsApp
              </label>
              <div className="relative">
                <MessageCircle className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="tel"
                  placeholder="+7 (999) 123-45-67"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  required
                  className="h-14 text-base pl-12"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs text-primary">3</span>
                Бюджет инвестиций
              </label>
              <Select
                value={formData.budget}
                onValueChange={(value) => setFormData({ ...formData, budget: value })}
              >
                <SelectTrigger className="h-14 text-base">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-muted-foreground" />
                    <SelectValue placeholder="Выберите бюджет" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {budgetOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                variant="glow"
                size="xl"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Отправляем...
                  </span>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Получить консультацию
                  </>
                )}
              </Button>
            </div>

            <p className="text-xs text-center text-muted-foreground">
              Нажимая кнопку, вы соглашаетесь с{" "}
              <a href="#" className="text-primary hover:underline">политикой конфиденциальности</a>
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default LeadCaptureForm;
