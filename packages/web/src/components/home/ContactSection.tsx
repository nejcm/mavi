import { ContactForm } from "@/components/ContactForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { OFFICE_LOCATIONS, type OfficeLocation } from "@/data/offices";
import { cn } from "@/lib/utils";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { motion } from "framer-motion";
import { MapPin, Phone } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

const SLOVENIA_CENTER = { lat: 46.15, lng: 14.95 };
const DEFAULT_ZOOM = 8;
const SELECTED_ZOOM = 14;

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

function useInViewOnce(rootMargin = "200px") {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return { ref, visible };
}

// Isolated component so useJsApiLoader is only called once with the real key
function OfficeMap({
  selectedOffice,
  onMarkerClick,
  mapInteractive,
  onDblClick,
  onMapLoad,
}: {
  selectedOffice: OfficeLocation | null;
  onMarkerClick: (office: OfficeLocation) => void;
  mapInteractive: boolean;
  onDblClick: () => void;
  onMapLoad: (map: google.maps.Map) => void;
}) {
  const { t } = useTranslation();

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY ?? "",
  });

  const mapOptions: google.maps.MapOptions = {
    draggable: mapInteractive,
    scrollwheel: mapInteractive,
    disableDoubleClickZoom: true,
    zoomControl: mapInteractive,
    streetViewControl: false,
    fullscreenControl: false,
    mapTypeControl: false,
  };

  if (loadError) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground font-body text-sm">
        {t("contact.mapUnavailable")}
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground font-body text-sm animate-pulse">
        Loading map…
      </div>
    );
  }

  return (
    <>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={
          selectedOffice ? { lat: selectedOffice.lat, lng: selectedOffice.lng } : SLOVENIA_CENTER
        }
        zoom={selectedOffice ? SELECTED_ZOOM : DEFAULT_ZOOM}
        onLoad={onMapLoad}
        onDblClick={onDblClick}
        options={mapOptions}
      >
        {OFFICE_LOCATIONS.map((office) => (
          <Marker
            key={office.id}
            position={{ lat: office.lat, lng: office.lng }}
            title={office.name}
            onClick={() => onMarkerClick(office)}
            opacity={!selectedOffice || selectedOffice.id === office.id ? 1 : 0.5}
          />
        ))}
      </GoogleMap>
      <div className="absolute bottom-3 left-3 bg-background/90 backdrop-blur-sm text-xs text-muted-foreground px-3 py-1.5 rounded-md pointer-events-none">
        {t("contact.mapHint")}
      </div>
    </>
  );
}

const ContactSection = () => {
  const { t } = useTranslation();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedOffice, setSelectedOffice] = useState<OfficeLocation | null>(null);
  const [mapInteractive, setMapInteractive] = useState(false);
  const mapRef = useRef<google.maps.Map | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const { ref: sectionRef, visible: sectionVisible } = useInViewOnce("400px");

  const hasApiKey = (import.meta.env.VITE_GOOGLE_MAPS_API_KEY ?? "").length > 0;
  const shouldMount = sectionVisible && hasApiKey;

  const onMapLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  const handleSelectOffice = useCallback((office: OfficeLocation) => {
    setSelectedOffice(office);
    if (mapRef.current) {
      mapRef.current.panTo({ lat: office.lat, lng: office.lng });
      mapRef.current.setZoom(SELECTED_ZOOM);
    }
  }, []);

  const handleMarkerClick = useCallback((office: OfficeLocation) => {
    setSelectedOffice(office);
    if (mapRef.current) {
      mapRef.current.panTo({ lat: office.lat, lng: office.lng });
      mapRef.current.setZoom(SELECTED_ZOOM);
    }
    const el = listRef.current?.querySelector(`[data-office="${office.id}"]`);
    el?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, []);

  const handleMapDblClick = useCallback(() => {
    setMapInteractive((prev) => !prev);
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="py-24 md:py-32 bg-secondary">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4 font-body">
            {t("contact.eyebrow")}
          </p>
          <h2 className="font-display text-3xl md:text-5xl text-foreground leading-tight mb-6">
            {t("contact.heading")}
          </h2>
          <p className="text-muted-foreground font-body leading-relaxed max-w-2xl mx-auto">
            {t("contact.description")}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Office list */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2"
          >
            <h3 className="font-display text-lg text-foreground mb-4">
              {t("contact.selectOffice")}
            </h3>
            <div
              ref={listRef}
              className="space-y-2 max-h-[420px] overflow-y-auto pr-2 scrollbar-thin"
            >
              {OFFICE_LOCATIONS.map((office) => (
                <button
                  key={office.id}
                  data-office={office.id}
                  onClick={() => handleSelectOffice(office)}
                  className={cn(
                    "w-full text-left px-4 py-3 rounded-lg transition-colors",
                    "hover:bg-background/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    selectedOffice?.id === office.id
                      ? "bg-background shadow-sm ring-1 ring-border"
                      : "bg-transparent",
                  )}
                >
                  <div className="flex items-start gap-3">
                    <MapPin
                      className={cn(
                        "h-5 w-5 mt-0.5 shrink-0",
                        selectedOffice?.id === office.id ? "text-primary" : "text-muted-foreground",
                      )}
                    />
                    <div>
                      <p className="font-body font-medium text-foreground text-sm">{office.name}</p>
                      <p className="text-muted-foreground text-xs mt-0.5">
                        {office.addressLine}, {office.city}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-3 flex flex-col"
          >
            <div className="relative rounded-lg overflow-hidden bg-muted min-h-[400px] h-[400px] lg:h-full">
              {shouldMount ? (
                <OfficeMap
                  selectedOffice={selectedOffice}
                  onMarkerClick={handleMarkerClick}
                  mapInteractive={mapInteractive}
                  onDblClick={handleMapDblClick}
                  onMapLoad={onMapLoad}
                />
              ) : !hasApiKey ? (
                <div className="flex items-center justify-center h-full text-muted-foreground font-body text-sm">
                  {t("contact.mapUnavailable")}
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground font-body text-sm animate-pulse">
                  Loading map…
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* CTA button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-14"
        >
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="hero" size="lg">
                <Phone className="h-4 w-4 mr-2" />
                {t("cta.getInTouch")}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{t("cta.getInTouch")}</DialogTitle>
              </DialogHeader>
              <ContactForm />
            </DialogContent>
          </Dialog>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
