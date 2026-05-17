"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import css from "./Header.module.css";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className={css.header}>
      <Link href="/" className={css.logo}>
        <span className={css.logoRental}>Rental</span>
        <span className={css.logoCar}>Car</span>
      </Link>

      <nav className={css.nav}>
        <Link
          href="/"
          className={`${css.navLink} ${pathname === "/" ? css.active : ""}`}
        >
          Home
        </Link>
        <Link
          href="/catalog"
          className={`${css.navLink} ${pathname === "/catalog" ? css.active : ""}`}
        >
          Catalog
        </Link>
      </nav>
    </header>
  );
}
