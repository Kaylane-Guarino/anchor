"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import Logo from "../../../assets/complete-logo.svg";
import { SearchForm } from "../search/search-form/SearchForm";

export function Header() {
  const pathname = usePathname();
  const isSearchPage = pathname === "/search";

  return (
    <header className="bg-primary">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-4">
        <Link href="/" className="shrink-0">
          <Image alt="Anchor." src={Logo} width={150} />
        </Link>

        {isSearchPage && (
          <div className="hidden flex-1 justify-center md:flex">
            <SearchForm variant="header" />
          </div>
        )}
      </div>
    </header>
  );
}