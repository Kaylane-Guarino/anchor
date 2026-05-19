  import Link from "next/link";
  import Image from "next/image";
  import Logo from "../../../assets/complete-logo.svg";

  export function Header() {
    return (
      <header className="bg-primary">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link href="/">
            <Image alt="Anchor." src={Logo} width={150} />
          </Link>

          <div className="flex gap-8 items-center">
            {/* <button className="text-md font-medium px-3 py-2 text-primary-text bg-transparent hover:bg-hover-white hover:text-secondary-text cursor-pointer rounded-3xl text-black">
              pt-BR
            </button> */}
            {/* <Link href="/search" className="text-md font-medium">
              Populares
            </Link> */}
            <button className="px-6 py-3 cursor-pointer bg-background rounded-full text-sm font-semibold text-secondary-text">
              Fazer login
            </button>
          </div>
        </div>
      </header>
    );
  }
