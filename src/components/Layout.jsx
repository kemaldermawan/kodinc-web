import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import CartDrawer from "./CartDrawer";
import Footer from "./Footer";
import Navbar from "./Navbar";

const TITLES = {
  "/": "Kodinc - Feed Your Mood",
  "/menu": "Menu Jajanan - Kodinc",
  "/tentang": "Tentang & Kontak - Kodinc",
  "/checkout": "Checkout - Kodinc",
};

function RouteEffects() {
  const { pathname } = useLocation();

  useEffect(() => {
    const path = pathname.replace(/\/+$/, "") || "/";
    document.title = TITLES[path] ?? TITLES["/"];
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function Layout() {
  return (
    <div className="flex min-h-dvh flex-col">
      <RouteEffects />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
}