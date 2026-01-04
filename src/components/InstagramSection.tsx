import { useEffect } from "react";
import { motion } from "framer-motion";
import { Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";

const InstagramSection = () => {
  useEffect(() => {
    // Load Elfsight script
    const script = document.createElement("script");
    script.src = "https://elfsightcdn.com/platform.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
      const existingScript = document.querySelector('script[src="https://elfsightcdn.com/platform.js"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="rounded-2xl overflow-hidden"
        >
          {/* Elfsight Instagram Feed Widget */}
          <div 
            className="elfsight-app-fcf832c8-74b1-471b-b57b-b1e36a94e0f7" 
            data-elfsight-app-lazy
          />
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
