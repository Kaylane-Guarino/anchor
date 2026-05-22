"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import ErrorImage from "../../assets/error.svg";

export default function Error({
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();
  const [hasTriedAgain, setHasTriedAgain] = useState(false);

  function handleTryAgain() {
  reset();

  setTimeout(() => {
    window.location.href = "/";
  }, 300);
}

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center">
      <h2 className="text-2xl font-bold text-gray-800">
        Algo deu errado
      </h2>

      <p className="mt-2 text-gray-500">
        {hasTriedAgain
          ? "Se o erro continuar, volte para a página inicial."
          : "Ocorreu um erro inesperado."}
      </p>

      <Image
        src={ErrorImage}
        alt="Imagem de erro"
        className="mt-4"
        width={400}
      />

      <button
        onClick={handleTryAgain}
        className="mt-6 rounded-xl bg-primary px-6 py-3 text-white cursor-pointer"
      >
        {hasTriedAgain ? "Ir para início" : "Tentar novamente"}
      </button>
    </div>
  );
}