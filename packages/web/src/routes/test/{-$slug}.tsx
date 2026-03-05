import Footer from "@/components/home/Footer";
import Header from "@/components/home/Header";
import { createFileRoute } from "@tanstack/react-router";
import ParagraphLoader from "../../components/loader/Paragraph";
import NotFoundContent from "../../components/NotFoundContent";
import { useCmsPage } from "../../hooks/use-cms";

export const Route = createFileRoute("/test/{-$slug}")({
  /* loader: async ({ params }: { params: { slug?: string } }) => {
    const slug = params.slug ?? "";
    // Warm the cache on navigation so React Query has data immediately in the component.
    const page = await fetchPageBySlug(slug);
    return page;
  }, */
  component: TestPage,
});

function TestPage() {
  //const initialData = Route.useLoaderData();
  const { slug } = Route.useParams();

  const {
    query: { isLoading, isError },
    ui,
  } = useCmsPage(slug || "home", "sl");

  let componentUi = null;
  if (isLoading && !ui) {
    componentUi = <ParagraphLoader />;
  } else if (isError || !ui) {
    componentUi = <NotFoundContent />;
  } else {
    componentUi = ui;
  }
  return (
    <main className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <section className="container mx-auto max-w-4xl px-6 py-16 min-h-40 flex-1">
        {componentUi}
      </section>
      <Footer />
    </main>
  );
}
