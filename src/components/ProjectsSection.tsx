import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { MapPin, Bed, Bath, Maximize, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import villaInterior from "@/assets/villa-interior.jpg";
import villaExterior from "@/assets/villa-exterior.jpg";
import villaTerrace from "@/assets/villa-terrace.jpg";

const projects = [
  {
    id: 1,
    name: "Villa Oceanview",
    location: "Улувату, Бали",
    price: "$450,000",
    bedrooms: 4,
    bathrooms: 3,
    area: 350,
    image: villaInterior,
    roi: "14%",
    status: "Готов",
  },
  {
    id: 2,
    name: "Sunset Residence",
    location: "Чангу, Бали",
    price: "$380,000",
    bedrooms: 3,
    bathrooms: 2,
    area: 280,
    image: villaExterior,
    roi: "12%",
    status: "Строится",
  },
  {
    id: 3,
    name: "Tropical Haven",
    location: "Семиньяк, Бали",
    price: "$520,000",
    bedrooms: 5,
    bathrooms: 4,
    area: 420,
    image: villaTerrace,
    roi: "15%",
    status: "Готов",
  },
];

const ProjectCard = ({ project, index }: { project: typeof projects[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="group glass-card overflow-hidden cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden aspect-[4/3]">
        {/* Image with zoom effect */}
        <motion.img
          src={project.image}
          alt={project.name}
          className="w-full h-full object-cover"
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        
        {/* Status Badge */}
        <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium ${
          project.status === "Готов" 
            ? "bg-green-500/20 text-green-400 border border-green-500/30"
            : "bg-primary/20 text-primary border border-primary/30"
        }`}>
          {project.status}
        </div>

        {/* ROI Badge */}
        <div className="absolute top-4 right-4 glass px-3 py-1 rounded-full text-sm font-medium text-primary">
          ROI {project.roi}
        </div>

        {/* Sliding CTA Button */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 p-4"
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: isHovered ? 0 : 60, opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <Button variant="glow" className="w-full group/btn">
            Узнать доходность
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
          </Button>
        </motion.div>
      </div>

      <div className="p-4 sm:p-6">
        <div className="flex items-center gap-2 text-muted-foreground text-xs sm:text-sm mb-2">
          <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          {project.location}
        </div>

        <h3 className="text-xl sm:text-2xl font-serif font-bold leading-[1.3] text-foreground mb-3 sm:mb-4 group-hover:text-gradient-gold transition-all duration-300">
          {project.name}
        </h3>

        <div className="flex items-center gap-3 sm:gap-4 text-muted-foreground text-xs sm:text-sm mb-4 sm:mb-6 flex-wrap">
          <div className="flex items-center gap-1.5">
            <Bed className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>{project.bedrooms}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Bath className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>{project.bathrooms}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Maximize className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>{project.area} м²</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-4 border-t border-border/30 gap-3 sm:gap-0">
          <span className="text-xl sm:text-2xl font-bold text-gradient-gold">{project.price}</span>
          <Button variant="outline" size="sm" className="w-full sm:w-auto touch-manipulation">
            Подробнее
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-12 sm:py-16 md:py-24 relative overflow-hidden">
      {/* Parallax Background Element */}
      <motion.div
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-30 parallax-slow"
        style={{
          background: "radial-gradient(circle, hsl(42 85% 55% / 0.1) 0%, transparent 70%)",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <span className="text-primary text-xs sm:text-sm font-medium tracking-wider uppercase">
            Наши проекты
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold leading-[1.25] sm:leading-[1.3] mt-3 sm:mt-4 mb-4 sm:mb-6 px-4">
            Откройте мир <span className="text-gradient-gold">премиальной</span> недвижимости
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-4">
            Коллекция эксклюзивных объектов в самых престижных локациях острова
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-8 sm:mt-12"
        >
          <Button variant="glass" size="lg" className="w-full sm:w-auto touch-manipulation">
            Все проекты
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
