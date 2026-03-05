import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Cms } from "@/models/cms";
import { CmsActionButton, CmsMedia, CmsSectionBaseProps, getSectionClasses } from "./shared";

type HeroProps = Cms.HeroSection & CmsSectionBaseProps;

export default function Hero({ slides, className, bgColor }: HeroProps) {
  const entries = slides ?? [];

  if (entries.length === 0) return null;

  return (
    <section className={getSectionClasses(bgColor, className)}>
      <div className="relative">
        <Carousel className="w-full">
          <CarouselContent className="ml-0">
            {entries.map((slide) => (
              <CarouselItem key={slide.id} className="pl-0">
                <div className="relative min-h-[440px] md:min-h-[560px]">
                  {slide.image || slide.video ? (
                    <>
                      <CmsMedia
                        image={slide.image}
                        video={slide.video}
                        alt={slide.heading}
                        className="absolute inset-0 h-full w-full rounded-none object-cover"
                      />
                      <div className="absolute inset-0 bg-black/35" />
                    </>
                  ) : (
                    <div className="absolute inset-0 bg-linear-to-br from-primary/80 via-primary to-primary/50" />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center p-6">
                    <div className="max-w-3xl text-center text-primary-foreground">
                      {slide.heading ? (
                        <h1 className="font-display text-3xl leading-tight md:text-5xl">
                          {slide.heading}
                        </h1>
                      ) : null}
                      {slide.content ? (
                        <p className="mx-auto mt-5 max-w-2xl whitespace-pre-line font-body text-base/relaxed opacity-90 md:text-lg">
                          {slide.content}
                        </p>
                      ) : null}
                      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                        <CmsActionButton button={slide.button} />
                        <CmsActionButton button={slide.button2} />
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {entries.length > 1 ? (
            <>
              <CarouselPrevious className="left-5 top-1/2 border-primary-foreground/70 bg-black/30 text-white hover:bg-black/45" />
              <CarouselNext className="right-5 top-1/2 border-primary-foreground/70 bg-black/30 text-white hover:bg-black/45" />
            </>
          ) : null}
        </Carousel>
      </div>
    </section>
  );
}
