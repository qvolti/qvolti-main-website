// components/navbar/Navbar.tsx
import { useEffect } from "react";
import NavbarDesktop from "./NavbarDesktop";
import NavbarMobile from "./NavbarMobile";

const links = [
  { name: "Inicio", href: "#inicio" },
  { name: "Oferta", href: "#oferta" },
  { name: "Proceso", href: "#proceso" },
  { name: "Nosotros", href: "#nosotros" },
  { name: "Contacto", href: "#contacto" },
];

export default function Navbar() {

  useEffect(() => {
    const navbar = document.getElementById("react-navbar");

    const onScroll = () => {
      if (!navbar) return;
      navbar.style.opacity = window.scrollY > 20 ? "0.4" : "1";
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      id="react-navbar"
      className="sticky top-0 z-50 w-full bg-white/95 lg:bg-white/20 backdrop-blur-sm transition-all duration-500 h-18"
    >
      <div className="max-w-7xl mx-auto flex justify-between lg:justify-around items-center h-20 px-6">
        
        {/* NAV MOBILE */}
        <div className="flex w-[400px] items-center justify start gap-2">
        <NavbarMobile links={links} />
        {/* LOGO */}
        <a href="/" className="flex items-center gap-3 text-3xl font-bold text-(--primary) ml-4">
          <img src="/logo.png" alt="QVOLTI Logo" className="h-24 w-auto" />
        </a>
        </div>

         {/* BOTÓN ENTRE LOGO Y HAMBURGUESA (SOLO MOBILE) */}
        <button className="lg:hidden hover:scale-105 hover:bg-(--secondary)/90 w-[200px] bg-(--primary) text-white px-3 py-1 rounded-md shadow transition active:scale-95 cursor-pointer">
          Descubre más
        </button>

        <nav>
        {/* NAV DESKTOP */}
        <NavbarDesktop links={links} />
        </nav>

       
      </div>
    </header>
  );
}
