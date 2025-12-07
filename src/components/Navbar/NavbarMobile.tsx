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
        className="
          shadow-md flex flex-col gap-1.5 p-2 rounded-md 
          border border-(--muted)/40 bg-white
          backdrop-blur-sm active:scale-95 transition cursor-pointer hover:scale-110
        "
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
        <ul className="py-3">

          {links.map((link) => (
            <li key={link.href} className="relative group px-4 py-3 w-full">

              <a
                href={link.href}
                className="
                  relative z-10 text-(--text) text-lg font-semibold
                  transition-all duration-300 group-hover:text-(--primary)
                "
                onClick={() => setOpen(false)}
              >
                {link.name}
              </a>

              {/* Línea inferior animada */}
              <span
                className="
                  pointer-events-none
                  absolute left-0 bottom-0 h-[2px] w-1/2
                  overflow-hidden 
                  scale-x-0 group-hover:scale-x-100 origin-left
                  transition-transform duration-500 ease-out
                "
              >
                <span
                  className="
                    absolute inset-0 w-1/2 h-full
                    bg-gradient-to-r from-(--primary) via-(--secondary) to-(--primary)
                    animate-nav-flow
                  "
                ></span>
              </span>

            </li>
          ))}

        </ul>
      </div>

    </div>
  );
}
