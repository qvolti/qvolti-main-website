// components/navbar/NavbarDesktop.tsx
interface Link {
  name: string;
  href: string;
}

export default function NavbarDesktop({ links }: { links: Link[] }) {
  return (
   
      <ul className="hidden lg:flex flex-wrap justify-end items-center gap-8 w-full">
      {links.map((link) => (
    <li key={link.href} className="relative group px-4 py-2 rounded-lg">
        <a
          href={link.href}
          className="relative z-10 text-(--text) text-lg font-semibold transition-all duration-300 group-hover:text-(--primary)"
        >
          {link.name}
        </a>

        <span
          className="
            pointer-events-none
            absolute left-0 bottom-0 h-[2px] w-full
            overflow-hidden 
            scale-x-0 group-hover:scale-x-100 origin-left
            transition-transform duration-500 ease-out
          "
        >
          <span
            className="
              absolute inset-0 w-full h-full
              bg-gradient-to-r from-(--primary) via-(--secondary) to-(--primary)
              animate-nav-flow
            "
          ></span>
        </span>
    </li>
    

      ))}
      </ul>
    
  );
}
