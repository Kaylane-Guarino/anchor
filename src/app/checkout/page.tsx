import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { CheckoutStepper } from "@/components/checkout/CheckoutStepper";
import { Suspense } from "react";

export default function CheckoutPage() {
  return (
    <main className="min-h-screen">
      <section className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="mb-2 text-3xl font-bold text-foreground">
          Finalizar reserva
        </h1>

        <p className="mb-8 text-gray-500">
          Revise os dados da sua estadia e preencha suas informações.
        </p>

        {/* <CheckoutForm /> */}
        {/* <Suspense fallback={null}> */}
          <CheckoutStepper />
        {/* </Suspense> */}
      </section>
    </main>
  );
}