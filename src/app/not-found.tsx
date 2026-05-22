import Image from "next/image";
import Link from "next/link";

import NotFoundImage from "../../assets/not-found.svg";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center">
      <p className="mb-8 text-secondary-text font-semibold text-2xl">Página não encontrada</p>
      <Image src={NotFoundImage} alt="Not Found" width={300} height={300} />

      <Link
        href="/"
        className="mt-10 rounded-xl bg-primary px-6 py-3 text-white"
      >
        Voltar ao início
      </Link>
    </div>
  );
}
