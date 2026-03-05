import { ContactForm } from "@/components/ContactForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IMAGES_BASE_PATH } from "@/constants/config";
import { OFFICE_LOCATIONS, type OfficeLocation } from "@/data/offices";
import { cn } from "@/lib/utils";
import {
  APILoadingStatus,
  APIProvider,
  Map,
  MapProps,
  Marker,
  useApiLoadingStatus,
} from "@vis.gl/react-google-maps";
import { motion } from "framer-motion";
import { MapPin, Phone } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

const SLOVENIA_CENTER = { lat: 46.15, lng: 14.95 };
const DEFAULT_ZOOM = 8;
const SELECTED_ZOOM = 14;

/** Custom marker image matching mavi.si/info */
const MARKER_ICON = `${IMAGES_BASE_PATH}/marker.png`;

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

type OfficeMapContentProps = MapProps & {
  selectedOffice: OfficeLocation | null;
  onMarkerClick: (office: OfficeLocation) => void;
  mapInteractive: boolean;
};

function OfficeMapContent({
  selectedOffice,
  onMarkerClick,
  mapInteractive,
  ...props
}: OfficeMapContentProps) {
  const status = useApiLoadingStatus();
  const { t } = useTranslation();

  if (status === APILoadingStatus.FAILED) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground font-body text-sm">
        {t("contact.mapUnavailable")}
      </div>
    );
  }

  if (status !== APILoadingStatus.LOADED) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground font-body text-sm animate-pulse">
        {t("contact.mapLoading")}
      </div>
    );
  }

  const center = selectedOffice
    ? { lat: selectedOffice.lat, lng: selectedOffice.lng }
    : SLOVENIA_CENTER;
  const zoom = selectedOffice ? SELECTED_ZOOM : DEFAULT_ZOOM;

  return (
    <>
      <Map
        center={mapInteractive ? undefined : center}
        zoom={mapInteractive ? undefined : zoom}
        defaultCenter={center}
        defaultZoom={zoom}
        disableDoubleClickZoom
        draggable={mapInteractive}
        scrollwheel={mapInteractive}
        zoomControl={mapInteractive}
        streetViewControl={false}
        fullscreenControl={false}
        mapTypeControl={false}
        style={{ width: "100%", height: "100%" }}
        {...props}
      >
        {OFFICE_LOCATIONS.map((office) => (
          <Marker
            key={office.id}
            position={{ lat: office.lat, lng: office.lng }}
            title={office.name}
            icon={MARKER_ICON}
            onClick={() => onMarkerClick(office)}
            opacity={!selectedOffice || selectedOffice.id === office.id ? 1 : 0.5}
          />
        ))}
      </Map>
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
  const listRef = useRef<HTMLDivElement>(null);
  const { ref: sectionRef, visible: sectionVisible } = useInViewOnce("400px");

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY ?? "";
  const hasApiKey = apiKey.length > 0;
  const shouldMount = sectionVisible && hasApiKey;

  const handleSelectOffice = useCallback((office: OfficeLocation) => {
    setSelectedOffice(office);
    setMapInteractive(false);
    const el = listRef.current?.querySelector(`[data-office="${office.id}"]`);
    el?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, []);

  const handleMarkerClick = useCallback((office: OfficeLocation) => {
    setSelectedOffice(office);
    const el = listRef.current?.querySelector(`[data-office="${office.id}"]`);
    el?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, []);

  const onMapClick = useCallback(() => {
    setMapInteractive((prev) => !prev);
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="py-24 md:py-32 bg-secondary">
      <div className="max-w-[1920px] mx-auto">
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

        <div className="grid lg:grid-cols-5 gap-8 px-6">
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
                    "w-full text-left px-4 py-3 rounded-lg transition-colors cursor-pointer",
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
                <APIProvider apiKey={apiKey}>
                  <OfficeMapContent
                    selectedOffice={selectedOffice}
                    onMarkerClick={handleMarkerClick}
                    mapInteractive={mapInteractive}
                    onClick={onMapClick}
                  />
                </APIProvider>
              ) : !hasApiKey ? (
                <div className="flex items-center justify-center h-full text-muted-foreground font-body text-sm">
                  {t("contact.mapUnavailable")}
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground font-body text-sm animate-pulse">
                  {t("contact.mapLoading")}
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
              <div className="w-full">
                <ContactForm />
              </div>
            </DialogContent>
          </Dialog>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
