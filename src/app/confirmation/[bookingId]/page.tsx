import Image from "next/image";
import Link from "next/link";

import Illustration from "../../../../assets/high-five.svg";

type ConfirmationPageProps = {
  params: Promise<{
    bookingId: string;
  }>;
};

export default async function ConfirmationPage({
  params,
}: ConfirmationPageProps) {
  const { bookingId } = await params;

  return (
    <main className="min-h-screen bg-gray-100">
      <section className="mx-auto max-w-3xl px-4 py-16">
        <div className="rounded-2xl bg-white p-8 text-center flex flex-col items-center shadow-sm">
          <h1 className="text-4xl font-bold text-primary">
            Reserva confirmada!
          </h1>

          <p className="mt-4 text-gray-500">
            Sua reserva foi concluída com sucesso.
          </p>

          <div className="mt-8 rounded-2xl bg-gray-50 p-6">
            <p className="text-sm text-gray-500">
              Número da reserva
            </p>

            <p className="mt-2 text-3xl font-bold text-foreground">
              {bookingId}
            </p>
          </div>

          <Link
            href="/"
            className="mt-8 inline-flex rounded-xl bg-primary px-6 py-3 font-bold text-white"
          >
            Fazer nova busca
          </Link>
          

          <Image src={Illustration} alt="Confirmação de reserva" />
        </div>
      </section>
    </main>
  );
}