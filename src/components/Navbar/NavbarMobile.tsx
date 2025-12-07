// components/navbar/NavbarMobile.tsx
import { useState } from "react";

interface Link {
  name: string;
  href: string;
}

export default function NavbarMobile({ links }: { links: Link[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      
      {/* Botón hamburguesa */}
      <button
        onClick={() => setOpen(!open)}
        className="shadow-md flex flex-col gap-1.5 p-2 rounded-md 
                   border border-(--muted)/40 bg-white
                   backdrop-blur-sm active:scale-95 transition cursor-pointer hover:scale-110"
      >
        <span className={`h-0.5 w-6 bg-(--primary) transition-all ${open ? "rotate-45 translate-y-2" : ""}`} />
        <span className={`h-0.5 w-6 bg-(--primary) transition-all ${open ? "opacity-0" : ""}`} />
        <span className={`h-0.5 w-6 bg-(--primary) transition-all ${open ? "-rotate-45 -translate-y-2" : ""}`} />
      </button>

      {/* Menu móvil */}
      <div
        className={`
          absolute left-0 right-0 top-16
          bg-white/95 backdrop-blur-xl
          shadow-xl rounded-b-xl
          overflow-hidden
          transition-all duration-300
          ${
            open
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 -translate-y-3 pointer-events-none"
          }
        `}
      >
        <ul>
        {links.map((link) => (
          <li key={link.href} className="relative group overflow-hidden px-4 py-2 rounded-lg w-[120px]">
          <a
            href={link.href}
            className="relative z-10 text-(--text) text-lg font-semibold transition-all duration-500 group-hover:text-(--primary) rounded-lg"
          >
            {link.name}
          </a>

          <span
            className="
              absolute inset-0 bg-gradient-to-r 
              from-(--primary)/10 via-(--secondary)/30 to-(--primary)/10
              opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-105
              group-hover:blur-[4px] 
              transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)]
              translate-x-[-110%] group-hover:translate-x-0 rounded-lg
            "
          ></span>
        </li>
        
        ))}
      </ul>
      </div>

    </div>
  );
}
