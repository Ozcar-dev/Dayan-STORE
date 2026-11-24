import { useEffect } from "react";
import { Outlet, useLocation, useMatches } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { SITE } from "@/constants/site";

interface RouteHandle {
  title?: string;
  description?: string;
}

const DEFAULT_DESCRIPTION =
  "The Dayan Store: women's fashion, bags and accessories in Lagos. Order easily on WhatsApp.";

export function RootLayout() {
  const { pathname, hash, key } = useLocation();
  const matches = useMatches();
  const handle = matches[matches.length - 1]?.handle as RouteHandle | undefined;

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.slice(1));
      if (element) {
        element.scrollIntoView();
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash, key]);

  useEffect(() => {
    if (!handle?.title) return;

    document.title =
      pathname === "/"
        ? `${SITE.name} | ${SITE.tagline}`
        : `${handle.title} | ${SITE.name}`;

    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", handle.description ?? DEFAULT_DESCRIPTION);
  }, [handle, pathname]);

  return (
    <div className="flex min-h-dvh flex-col overflow-x-clip">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:font-semibold focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main" key={pathname} className="flex-1 animate-page-in">
        <Outlet />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
