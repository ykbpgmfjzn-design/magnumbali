import { motion } from "framer-motion";
import { Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";

const InstagramSection = () => {
  return (
    <section className="py-20 bg-muted/30" id="instagram">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Instagram className="w-8 h-8 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold">
              Следите за нами в Instagram
            </h2>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Будьте в курсе новых проектов, эксклюзивных предложений и жизни на Бали
          </p>
          <a
            href="https://www.instagram.com/magnum.estate"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-2 text-primary hover:underline"
          >
            @magnum.estate
          </a>
        </motion.div>

        {/* Место для вставки виджета Elfsight/SnapWidget */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-card rounded-2xl p-8 border border-border shadow-lg"
        >
          <div 
            id="instagram-widget"
            className="min-h-[400px] flex items-center justify-center"
          >
            {/* 
              Инструкция: Вставьте сюда код виджета от Elfsight или SnapWidget
              
              1. Зарегистрируйтесь на https://elfsight.com или https://snapwidget.com
              2. Создайте Instagram виджет для @magnum.estate
              3. Скопируйте embed-код и замените этот блок
              
              Пример кода Elfsight:
              <script src="https://static.elfsight.com/platform/platform.js" async></script>
              <div className="elfsight-app-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" data-elfsight-app-lazy></div>
            */}
            <div className="text-center space-y-4">
              <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="aspect-square bg-muted rounded-lg animate-pulse"
                  />
                ))}
              </div>
              <p className="text-muted-foreground text-sm">
                Вставьте embed-код виджета Instagram
              </p>
              <Button asChild variant="outline">
                <a
                  href="https://elfsight.com/instagram-feed-widget/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Получить виджет Elfsight
                </a>
              </Button>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <Button asChild size="lg" className="gap-2">
            <a
              href="https://www.instagram.com/magnum.estate"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="w-5 h-5" />
              Подписаться в Instagram
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default InstagramSection;
