import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { MapPin, Building2, Phone, Mail } from "lucide-react";

const MAPBOX_TOKEN = "pk.eyJ1Ijoic2Fkc3RhbCIsImEiOiJjbWp5enl3cHEyZ21xM3RxMmNhNWVvaWp2In0.hDuSWUHwvLTJx8rfxQixFQ";

const locations = [
  {
    id: 1,
    type: "office",
    name: "Головной офис — Москва",
    address: "Пресненская набережная, 12, Башня Федерация",
    phone: "+7 (495) 123-45-67",
    email: "moscow@magnumestate.ru",
    coordinates: [37.5377, 55.7496] as [number, number],
  },
  {
    id: 2,
    type: "office",
    name: "Офис в Дубае",
    address: "Dubai Marina, Jumeirah Beach Residence",
    phone: "+971 4 123 4567",
    email: "dubai@magnumestate.ru",
    coordinates: [55.1425, 25.0764] as [number, number],
  },
  {
    id: 3,
    type: "property",
    name: "Villa Azure — Кипр",
    address: "Лимассол, Amathus Avenue",
    coordinates: [33.1451, 34.7071] as [number, number],
  },
  {
    id: 4,
    type: "property",
    name: "Penthouse Monaco",
    address: "Monte Carlo, Avenue Princess Grace",
    coordinates: [7.4246, 43.7384] as [number, number],
  },
  {
    id: 5,
    type: "property",
    name: "Estate Marbella",
    address: "Golden Mile, Marbella",
    coordinates: [-4.8857, 36.5087] as [number, number],
  },
];

const MapSection = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    if (!mapContainer.current) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;

    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/dark-v11",
        center: [30, 40],
        zoom: 2.5,
        pitch: 30,
      });

      map.current.addControl(
        new mapboxgl.NavigationControl({ visualizePitch: true }),
        "top-right"
      );

      map.current.on("load", () => {
        setMapReady(true);

        // Add markers for each location
        locations.forEach((location) => {
          const el = document.createElement("div");
          el.className = "custom-marker";
          el.style.cssText = `
            width: 32px;
            height: 32px;
            background: ${location.type === "office" ? "linear-gradient(135deg, #D4AF37, #B8860B)" : "linear-gradient(135deg, #8B7355, #6B5344)"};
            border-radius: 50%;
            border: 2px solid rgba(212, 175, 55, 0.5);
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 15px rgba(0,0,0,0.3);
            transition: transform 0.2s ease;
          `;
          el.innerHTML = location.type === "office" 
            ? '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/></svg>'
            : '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>';
          
          el.addEventListener("mouseenter", () => {
            el.style.transform = "scale(1.2)";
          });
          el.addEventListener("mouseleave", () => {
            el.style.transform = "scale(1)";
          });
          el.addEventListener("click", () => {
            setSelectedLocation(location);
            map.current?.flyTo({
              center: location.coordinates,
              zoom: 10,
              duration: 2000,
            });
          });

          new mapboxgl.Marker(el)
            .setLngLat(location.coordinates)
            .addTo(map.current!);
        });
      });

      map.current.on("error", () => {
        setMapReady(false);
      });
    } catch {
      setMapReady(false);
    }

    return () => {
      map.current?.remove();
    };
  }, []);

  const flyToLocation = (location: typeof locations[0]) => {
    setSelectedLocation(location);
    map.current?.flyTo({
      center: location.coordinates,
      zoom: 10,
      duration: 2000,
    });
  };

  return (
    <section className="py-24 px-4 relative overflow-hidden" id="locations">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      
      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary/80 uppercase tracking-[0.3em] text-sm font-medium">
            Наше присутствие
          </span>
          <h2 className="text-4xl md:text-5xl font-serif mt-4 mb-6 text-gradient-gold">
            Офисы и объекты
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Мы работаем в ключевых локациях мировой элитной недвижимости
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Location list */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-primary" />
              Офисы
            </h3>
            {locations
              .filter((l) => l.type === "office")
              .map((location) => (
                <button
                  key={location.id}
                  onClick={() => flyToLocation(location)}
                  className={`w-full text-left p-4 rounded-xl transition-all duration-300 ${
                    selectedLocation.id === location.id
                      ? "glass-card-gold border-primary/30"
                      : "glass hover:border-primary/20"
                  }`}
                >
                  <h4 className="font-medium text-foreground mb-1">
                    {location.name}
                  </h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    {location.address}
                  </p>
                  {location.phone && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Phone className="w-3 h-3" />
                      {location.phone}
                    </div>
                  )}
                </button>
              ))}

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              Премиальные объекты
            </h3>
            {locations
              .filter((l) => l.type === "property")
              .map((location) => (
                <button
                  key={location.id}
                  onClick={() => flyToLocation(location)}
                  className={`w-full text-left p-4 rounded-xl transition-all duration-300 ${
                    selectedLocation.id === location.id
                      ? "glass-card-gold border-primary/30"
                      : "glass hover:border-primary/20"
                  }`}
                >
                  <h4 className="font-medium text-foreground mb-1">
                    {location.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {location.address}
                  </p>
                </button>
              ))}
          </motion.div>

          {/* Map container */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-2 h-[500px] rounded-2xl overflow-hidden glass-card-gold"
          >
            <div ref={mapContainer} className="w-full h-full" />
          </motion.div>
        </div>

        {/* Selected location details */}
        {selectedLocation && mapReady && (
          <motion.div
            key={selectedLocation.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-8 glass-card-gold p-6 rounded-xl max-w-2xl mx-auto"
          >
            <h3 className="text-xl font-serif text-foreground mb-2">
              {selectedLocation.name}
            </h3>
            <p className="text-muted-foreground mb-4">
              {selectedLocation.address}
            </p>
            <div className="flex flex-wrap gap-4">
              {selectedLocation.phone && (
                <a
                  href={`tel:${selectedLocation.phone}`}
                  className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  {selectedLocation.phone}
                </a>
              )}
              {selectedLocation.email && (
                <a
                  href={`mailto:${selectedLocation.email}`}
                  className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  {selectedLocation.email}
                </a>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default MapSection;
