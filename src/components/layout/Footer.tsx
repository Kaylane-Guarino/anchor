import Image from "next/image";
import Link from "next/link";
import Logo from "../../../assets/logo-blue.svg";

export function Footer() {
  return (
    <footer className="bg-white flex flex-col justify-center items-center pb-8">
      <div className="mx-auto grid grid-cols-2 w-3/4 max-w-6xl items-center px-4 py-15">
        <Link href="/">
          <Image alt="Anchor." src={Logo} width={200} />
        </Link>
        <div className="grid grid-cols-2 gap-4 text-secondary-text">
          <div>
            <p className="font-bold mb-4">Lugares Populares</p>
            <ul className="list-none space-y-1">
              <li>Rio de Janeiro</li>
              <li>São Paulo</li>
              <li>Salvador</li>
              <li>Florianópolis</li>
              <li>Alagoas</li>
            </ul>
          </div>
          <div>
            <p className="font-bold mb-4">Lugares Populares</p>
            <ul className="list-none space-y-1">
              <li>Rio de Janeiro</li>
              <li>São Paulo</li>
              <li>Salvador</li>
              <li>Florianópolis</li>
              <li>Alagoas</li>
            </ul>
          </div>
        </div>
      </div>
      <p className="text-secondary-text">
        Desenvolvido com ❤️ por Kaylane Guarino • © 2026
      </p>
    </footer>
  );
}
