import { Separator } from "@/components/ui/separator";

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground py-16">
      <div className="container mx-auto px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="font-display text-xl mb-4">
              AQUA<span className="font-light">HAUS</span>
            </h3>
            <p className="text-sm text-primary-foreground/60 font-body leading-relaxed">
              Premium wholesale bathroom distribution for professionals who demand excellence.
            </p>
          </div>

          <div>
            <h4 className="text-sm tracking-wider uppercase mb-4 font-body font-semibold">
              Contact
            </h4>
            <div className="space-y-2 text-sm text-primary-foreground/60 font-body">
              <p>info@aquahaus.com</p>
              <p>+1 (555) 234-5678</p>
              <p>
                123 Design District
                <br />
                New York, NY 10001
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-sm tracking-wider uppercase mb-4 font-body font-semibold">
              Business Hours
            </h4>
            <div className="space-y-2 text-sm text-primary-foreground/60 font-body">
              <p>Monday – Friday: 8am – 6pm</p>
              <p>Saturday: 9am – 2pm</p>
              <p>Sunday: Closed</p>
            </div>
          </div>

          <div>
            <h4 className="text-sm tracking-wider uppercase mb-4 font-body font-semibold">
              Follow Us
            </h4>
            <div className="space-y-2 text-sm text-primary-foreground/60 font-body">
              <a href="#" className="block hover:text-primary-foreground transition-colors">
                LinkedIn
              </a>
              <a href="#" className="block hover:text-primary-foreground transition-colors">
                Instagram
              </a>
              <a href="#" className="block hover:text-primary-foreground transition-colors">
                Pinterest
              </a>
            </div>
          </div>
        </div>

        <Separator className="bg-primary-foreground/10 mb-8" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-primary-foreground/40 font-body">
          <p>© 2026 AquaHaus. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary-foreground/70 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-primary-foreground/70 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
