import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Bed, Bath, Maximize } from "lucide-react";
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
  },
];

const ProjectCard = ({ project, index }: { project: typeof projects[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="group glass-card overflow-hidden"
    >
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={project.image}
          alt={project.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
        <div className="absolute top-4 right-4 glass px-3 py-1 rounded-full text-sm font-medium text-primary">
          ROI {project.roi}
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
          <MapPin className="w-4 h-4" />
          {project.location}
        </div>

        <h3 className="text-2xl font-serif font-bold text-foreground mb-4">
          {project.name}
        </h3>

        <div className="flex items-center gap-4 text-muted-foreground text-sm mb-6">
          <div className="flex items-center gap-1">
            <Bed className="w-4 h-4" />
            <span>{project.bedrooms}</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="w-4 h-4" />
            <span>{project.bathrooms}</span>
          </div>
          <div className="flex items-center gap-1">
            <Maximize className="w-4 h-4" />
            <span>{project.area} м²</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-gradient-gold">{project.price}</span>
          <Button variant="outline" size="sm">
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
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-wider uppercase">
            Наши проекты
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mt-4 mb-6">
            Откройте мир <span className="text-gradient-gold">премиальной</span> недвижимости
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Коллекция эксклюзивных объектов в самых престижных локациях острова для жизни и инвестиций
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <Button variant="glow" size="lg">
            Все проекты
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
