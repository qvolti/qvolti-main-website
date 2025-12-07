// components/navbar/NavbarDesktop.tsx
interface Link {
  name: string;
  href: string;
}

export default function NavbarDesktop({ links }: { links: Link[] }) {
  return (
    <nav className="hidden lg:flex flex-wrap justify-end items-center gap-8 w-full">
      {links.map((link) => (
        <li key={link.href} className="relative group overflow-hidden px-4 py-2 rounded-lg">
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
    </nav>
  );
}
