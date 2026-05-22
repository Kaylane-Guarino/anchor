"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { CalendarDays, Mail, Phone, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { CheckoutFormData, checkoutSchema } from "@/schemas/checkout.schema";
import { useBookingStore } from "@/stores/booking.store";
import { formatBRL, formatCPF, formatPhone } from "@/utils/formatters.utils";

export function CheckoutForm() {
  const router = useRouter();

  const selectedHotel = useBookingStore((state) => state.selectedHotel);
  const selectedRoom = useBookingStore((state) => state.selectedRoom);
  const clearBooking = useBookingStore((state) => state.clearBooking);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      terms: false,
    },
  });

  const phone = watch("phone");
  const document = watch("document");

  const TAXES = 89;
  const FEES = 56;

  const checkIn = useBookingStore((state) => state.checkIn);
  const checkOut = useBookingStore((state) => state.checkOut);

  function calculateNights(checkIn?: string, checkOut?: string) {
    if (!checkIn || !checkOut) return 1;

    const startDate = new Date(`${checkIn}T00:00:00`);
    const endDate = new Date(`${checkOut}T00:00:00`);

    const diffInMs = endDate.getTime() - startDate.getTime();
    const nights = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

    return Math.max(1, nights);
  }

  const nights = calculateNights(checkIn, checkOut);
  const roomsTotal = selectedRoom ? selectedRoom.pricePerNight * nights : 0;
  const total = roomsTotal + TAXES + FEES;

  if (!selectedHotel || !selectedRoom) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
        <h2 className="text-2xl font-bold text-foreground">
          Nenhum quarto selecionado
        </h2>

        <p className="mt-2 text-gray-500">
          Escolha um hotel e um quarto antes de finalizar a reserva.
        </p>

        <button
          type="button"
          onClick={() => router.push("/search")}
          className="mt-6 rounded-xl bg-primary px-6 py-3 font-bold text-white"
        >
          Buscar hotéis
        </button>
      </div>
    );
  }

  function onSubmit() {
    const bookingId = crypto.randomUUID().slice(0, 8).toUpperCase();

    clearBooking();

    router.push(`/confirmation/${bookingId}`);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="order-2 rounded-2xl bg-white p-6 shadow-sm lg:order-1"
      >
        <h2 className="mb-6 text-2xl font-bold text-foreground">
          Dados do responsável
        </h2>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="mb-2 block font-semibold text-foreground">
              Nome completo
            </label>

            <div className="flex items-center gap-3 rounded-xl border px-4 py-3">
              <User size={20} className="text-gray-400" />

              <input
                {...register("name")}
                placeholder="Ex: Maria Silva"
                className="w-full outline-none text-secondary-text"
              />
            </div>

            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="mb-2 block font-semibold text-foreground">
              E-mail
            </label>

            <div className="flex items-center gap-3 rounded-xl border px-4 py-3">
              <Mail size={20} className="text-gray-400" />

              <input
                {...register("email")}
                placeholder="seuemail@email.com"
                className="w-full outline-none text-secondary-text"
              />
            </div>

            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block font-semibold text-foreground">
              Telefone
            </label>

            <div className="flex items-center gap-3 rounded-xl border px-4 py-3">
              <Phone size={20} className="text-gray-400" />

              <input
                {...register("phone")}
                value={phone}
                onChange={(e) =>
                  setValue("phone", formatPhone(e.target.value), {
                    shouldValidate: true,
                  })
                }
                placeholder="(11) 99999-9999"
                className="w-full outline-none text-secondary-text"
              />
            </div>

            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">
                {errors.phone.message}
              </p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block font-semibold text-foreground">
              CPF
            </label>

            <input
              {...register("document")}
              value={document}
              onChange={(e) =>
                setValue("document", formatCPF(e.target.value), {
                  shouldValidate: true,
                })
              }
              placeholder="000.000.000-00"
              className="w-full rounded-xl border px-4 py-3 outline-none text-secondary-text"
            />

            {errors.document && (
              <p className="mt-1 text-sm text-red-600">
                {errors.document.message}
              </p>
            )}
          </div>
        </div>

        <div className="mt-8 rounded-2xl bg-blue-50 p-5">
          <h3 className="font-bold text-foreground">Informações importantes</h3>

          <p className="mt-2 text-sm text-gray-600">
            A reserva será confirmada imediatamente após o envio do formulário.
            O pagamento é simulado para fins do teste técnico.
          </p>
        </div>

        <label className="mt-6 flex cursor-pointer items-start gap-3 text-sm text-gray-600">
          <input
            type="checkbox"
            {...register("terms")}
            className="mt-1 h-4 w-4 accent-primary"
          />

          <span>
            Li e aceito os termos da reserva, política de cancelamento e regras
            do hotel.
          </span>
        </label>

        {errors.terms && (
          <p className="mt-1 text-sm text-red-600">{errors.terms.message}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-8 w-full rounded-xl bg-primary px-6 py-4 text-lg font-bold text-white disabled:cursor-wait disabled:opacity-70"
        >
          {isSubmitting ? "Confirmando..." : "Confirmar reserva"}
        </button>
      </form>

      <aside className="order-1 h-fit rounded-2xl bg-white p-5 shadow-sm lg:order-2">
        <div className="relative h-48 overflow-hidden rounded-xl">
          <Image
            src={selectedHotel.thumbnail}
            alt={selectedHotel.name}
            fill
            sizes="350px"
            className="object-cover"
          />
        </div>

        <h2 className="mt-4 text-xl font-bold text-foreground">
          {selectedHotel.name}
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          {selectedHotel.destination}
        </p>

        <div className="mt-5 rounded-xl border p-4">
          <h3 className="font-bold text-foreground">{selectedRoom.name}</h3>

          <p className="mt-1 text-sm text-gray-500">
            Até {selectedRoom.maxGuests} hóspedes • {selectedRoom.size}m²
          </p>
        </div>

        <div className="mt-5 space-y-3 border-t pt-5 text-sm text-gray-600">
          <p className="flex items-center justify-between">
            <span>Diária</span>
            <strong>{formatBRL(selectedRoom.pricePerNight)}</strong>
          </p>
          
          <p className="flex items-center justify-between">
            <span>{nights}</span>
            <strong>{formatBRL(roomsTotal)}</strong>
          </p>

          <p className="flex items-center justify-between">
            <span>Taxas</span>
            <strong>{formatBRL(89)}</strong>
          </p>

          <p className="flex items-center justify-between">
            <span>Impostos</span>
            <strong>{formatBRL(56)}</strong>
          </p>
        </div>

        <div className="mt-5 border-t pt-5">
          <p className="flex items-center justify-between text-lg font-bold text-foreground">
            <span>Total</span>

            <span className="text-primary">
              {formatBRL(total)}
            </span>
          </p>
        </div>

        <div className="mt-5 flex items-center gap-2 rounded-xl bg-gray-50 p-3 text-sm text-gray-500">
          <CalendarDays size={18} />

          <span>
            Check-in {selectedHotel.checkInTime} • Check-out{" "}
            {selectedHotel.checkOutTime}
          </span>
        </div>
      </aside>
    </div>
  );
}
