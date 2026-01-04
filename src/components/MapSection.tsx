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
    name: "Головной офис - Bali",
    address: "Jl. Bumbak No.156, Kerobokan, Kec. Kuta Utara, Kabupaten Badung, Bali 80361",
    phone: "+62 812 3456 7890",
    email: "bali@magnumestate.ru",
    coordinates: [115.152742, -8.661754] as [number, number],
  },
  {
    id: 2,
    type: "office",
    name: "Офис продаж - Berawa",
    address: "Jl. Pantai Berawa, Tibubeneng, Kec. Kuta Utara, Kabupaten Badung, Bali",
    phone: "+62 812 3456 7891",
    email: "berawa@magnumestate.ru",
    coordinates: [115.136473, -8.661505] as [number, number],
  },
  {
    id: 3,
    type: "property",
    name: "The Umalas Signature - Bali",
    address: "Jl. Bumbak No.156, Kerobokan, Kec. Kuta Utara, Kabupaten Badung, Bali 80361",
    coordinates: [115.152742, -8.661754] as [number, number],
  },
  {
    id: 4,
    type: "property",
    name: "Magnum Resort Sanur - Bali",
    address: "Jl. Danau Tamblingan, Sanur, Denpasar Selatan, Kota Denpasar, Bali",
    coordinates: [115.2626, -8.6918] as [number, number],
  },
  {
    id: 5,
    type: "property",
    name: "Sky Stars Villas - Bali",
    address: "Jl. Taman Paradise Banjar Bakung Sari, Ungasan",
    coordinates: [115.144978, -8.816650] as [number, number],
  },
];

const MapSection = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    if (!mapContainer.current) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;

    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/dark-v11",
        center: [115.152742, -8.661754],
        zoom: 9,
        pitch: 30,
      });

      map.current.addControl(
        new mapboxgl.NavigationControl({ visualizePitch: true }),
        "top-right"
      );

      map.current.on("load", () => {
        setMapReady(true);

        // Calculate bounds to show all locations
        const bounds = new mapboxgl.LngLatBounds();
        
        // Add markers for each location
        locations.forEach((location) => {
          const el = document.createElement("div");
          el.className = "custom-marker";
          el.style.cssText = `
            width: 32px;
            height: 32px;
            background: ${location.type === "office" ? "linear-gradient(135deg, hsl(42 85% 55%), hsl(38 75% 45%))" : "linear-gradient(135deg, #8B7355, #6B5344)"};
            border-radius: 50%;
            border: 2px solid hsl(42 85% 55% / 0.5);
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 15px rgba(0,0,0,0.3), 0 0 20px hsl(42 85% 55% / 0.3);
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
              zoom: 12,
              duration: 2000,
            });
          });

          const marker = new mapboxgl.Marker(el)
            .setLngLat(location.coordinates)
            .addTo(map.current!);
          
          markers.current.push(marker);
          
          // Extend bounds to include this location
          bounds.extend(location.coordinates);
        });

        // Fit map to show all markers with padding
        if (bounds.isEmpty() === false) {
          map.current.fitBounds(bounds, {
            padding: { top: 50, bottom: 50, left: 50, right: 50 },
            maxZoom: 11,
            duration: 0,
          });
        }
      });

      map.current.on("error", () => {
        setMapReady(false);
      });
    } catch {
      setMapReady(false);
    }

    return () => {
      // Remove all markers
      markers.current.forEach(marker => marker.remove());
      markers.current = [];
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
    <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 relative overflow-hidden" id="locations">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      
      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary/80 uppercase tracking-[0.3em] text-xs sm:text-sm font-medium">
            Наше присутствие
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold leading-[1.25] sm:leading-[1.3] mt-3 sm:mt-4 mb-4 sm:mb-6 text-gradient-gold px-4">
            Офисы и объекты
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Мы работаем в ключевых локациях мировой элитной недвижимости
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Location list */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-3 sm:space-y-4"
          >
            <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3 sm:mb-4 flex items-center gap-2">
              <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              Офисы
            </h3>
            {locations
              .filter((l) => l.type === "office")
              .map((location) => (
                <button
                  key={location.id}
                  onClick={() => flyToLocation(location)}
                  className={`w-full text-left p-3 sm:p-4 rounded-xl transition-all duration-300 touch-manipulation ${
                    selectedLocation.id === location.id
                      ? "glass-card-gold border-primary/30"
                      : "glass hover:border-primary/20"
                  }`}
                >
                  <h4 className="text-sm sm:text-base font-medium text-foreground mb-1">
                    {location.name}
                  </h4>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-2">
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

            <h3 className="text-base sm:text-lg font-semibold text-foreground mt-6 sm:mt-8 mb-3 sm:mb-4 flex items-center gap-2">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
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
            className="lg:col-span-2 h-[300px] sm:h-[400px] md:h-[500px] rounded-2xl overflow-hidden glass-card-gold"
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
            className="mt-6 sm:mt-8 glass-card-gold p-4 sm:p-6 rounded-xl max-w-2xl mx-auto"
          >
            <h3 className="text-lg sm:text-xl font-serif font-bold leading-[1.3] text-foreground mb-2">
              {selectedLocation.name}
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4">
              {selectedLocation.address}
            </p>
            <div className="flex flex-wrap gap-3 sm:gap-4">
              {selectedLocation.phone && (
                <a
                  href={`tel:${selectedLocation.phone}`}
                  className="flex items-center gap-2 text-xs sm:text-sm text-primary hover:text-primary/80 transition-colors touch-manipulation"
                >
                  <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  {selectedLocation.phone}
                </a>
              )}
              {selectedLocation.email && (
                <a
                  href={`mailto:${selectedLocation.email}`}
                  className="flex items-center gap-2 text-xs sm:text-sm text-primary hover:text-primary/80 transition-colors touch-manipulation"
                >
                  <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
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
