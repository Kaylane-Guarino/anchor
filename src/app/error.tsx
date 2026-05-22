"use client";

import Image from "next/image";

import ErrorImage from "../../assets/error.svg";

export default function Error({
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
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
        Tentar novamente
      </button>
    </div>
  );
}