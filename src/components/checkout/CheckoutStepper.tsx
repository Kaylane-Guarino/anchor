"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  CalendarDays,
  CreditCard,
  Mail,
  Phone,
  User,
  Eye,
  EyeOff,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import Stepper, { Step } from "../ui/stepper";
import { CheckoutFormData, checkoutSchema } from "@/schemas/checkout.schema";
import { useBookingStore } from "@/stores/booking.store";
import {
  formatBRL,
  formatCardExpiry,
  formatCPF,
  formatCreditCard,
  formatPhone,
} from "@/utils/formatters.utils";
import { BookingConfirmationCard } from "./BookingConfirmationCard";
import {
  BOOKING_FEES,
  BOOKING_TAXES,
  calculateBookingTotal,
  calculateNights,
  generateBookingId,
  maskCardNumber,
} from "@/utils/booking.utils";

export function CheckoutStepper() {
  const {
    register,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      terms: false,
    },
  });
  const [isFinishingBooking, setIsFinishingBooking] = useState(false);
  const [isBookingCompleted, setIsBookingCompleted] = useState(false);
  const [showCvv, setShowCvv] = useState(false);
  const [bookingId, setBookingId] = useState("");
  const selectedHotel = useBookingStore((state) => state.selectedHotel);
  const selectedRoom = useBookingStore((state) => state.selectedRoom);
  const checkIn = useBookingStore((state) => state.checkIn);
  const checkOut = useBookingStore((state) => state.checkOut);

  const nights = calculateNights(checkIn, checkOut);
  const bookingSummary = calculateBookingTotal({
    pricePerNight: selectedRoom?.pricePerNight ?? 0,
    nights,
  });

  const { roomsTotal, total } = bookingSummary;

  const watchedValues = watch();

  const {
    phone = "",
    document = "",
    cardNumber = "",
    cardExpiration = "",
    name = "",
    email = "",
    cardCvv = "",
    nameOnCard = "",
  } = watchedValues;

  async function validateStep(step: number) {
    if (step === 1) {
      return await trigger(["name", "email", "phone", "document", "terms"]);
    }

    if (step === 2) {
      return await trigger([
        "cardNumber",
        "cardExpiration",
        "cardCvv",
        "nameOnCard",
      ]);
    }

    return true;
  }

  async function handleFinishBooking() {
    setIsFinishingBooking(true);

    const generatedBookingId = generateBookingId();

    setBookingId(generatedBookingId);
    setIsBookingCompleted(true);
    setIsFinishingBooking(false);

    toast.success("Pagamento aprovado! Reserva confirmada.");
  }

  if (!selectedHotel || !selectedRoom) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
        <h2 className="text-2xl font-bold text-foreground">
          Nenhum quarto selecionado
        </h2>

        <p className="mt-2 text-gray-500">
          Escolha um hotel e um quarto antes de finalizar a reserva.
        </p>

        <Link
          href="/search"
          className="mt-6 inline-flex rounded-xl bg-primary px-6 py-3 font-bold text-white"
        >
          Buscar hotéis
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-6 overflow-hidden lg:grid-cols-[minmax(0,1fr)_380px]">
      <div className="order-2 min-w-0 flex flex-col gap-6 lg:order-1">
        <Stepper
          initialStep={1}
          validateStep={validateStep}
          onFinalStepCompleted={handleFinishBooking}
          backButtonText="Voltar"
          nextButtonText="Continuar"
          isNextLoading={isFinishingBooking}
          isLocked={isBookingCompleted}
          disableStepIndicators={isBookingCompleted}
          className="min-w-0"
        >
          <Step>
            <h2 className="text-xl font-bold text-foreground mb-6">
              Dados pessoais
            </h2>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="mb-2 block font-medium text-foreground">
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
                  <p className="mt-1 text-sm text-red-600">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block font-medium text-foreground">
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
                <label className="mb-2 block font-medium text-foreground">
                  Telefone
                </label>

                <div className="flex items-center gap-3 rounded-xl border px-4 py-3">
                  <Phone size={20} className="shrink-0 text-gray-400" />

                  <input
                    {...register("phone")}
                    value={phone ?? ""}
                    placeholder="(11) 99999-9999"
                    onChange={(event) =>
                      setValue(
                        "phone",
                        formatPhone(event.target.value).slice(0, 15),
                        {
                          shouldValidate: true,
                        },
                      )
                    }
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
                <label className="mb-2 block font-medium text-foreground">
                  CPF
                </label>

                <input
                  {...register("document")}
                  value={document ?? ""}
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

              <div className="md:col-span-2">
                <label className="mt-6 flex cursor-pointer items-start gap-3 text-sm text-gray-600">
                  <input
                    type="checkbox"
                    {...register("terms")}
                    className="mt-1 h-4 w-4 accent-primary"
                  />

                  <span>
                    Li e aceito os termos da reserva, política de cancelamento e
                    regras do hotel.
                  </span>
                </label>

                {errors.terms && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.terms.message}
                  </p>
                )}
              </div>
            </div>
          </Step>

          <Step>
            <h2 className="text-xl font-bold text-foreground mb-6">
              Dados de pagamento
            </h2>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="mb-2 block font-medium text-foreground">
                  Número do cartão
                </label>

                <div className="flex items-center gap-3 rounded-xl border px-4 py-3">
                  <CreditCard size={20} className="text-gray-400" />

                  <input
                    {...register("cardNumber")}
                    value={cardNumber ?? ""}
                    onChange={(e) =>
                      setValue("cardNumber", formatCreditCard(e.target.value), {
                        shouldValidate: true,
                      })
                    }
                    placeholder="0000 0000 0000 0000"
                    className="w-full outline-none text-secondary-text"
                  />
                </div>

                {errors.cardNumber && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.cardNumber.message}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block font-medium text-foreground">
                  Validade do cartão
                </label>

                <div className="flex items-center gap-3 rounded-xl border px-4 py-3">
                  <input
                    {...register("cardExpiration")}
                    value={cardExpiration ?? ""}
                    onChange={(e) =>
                      setValue(
                        "cardExpiration",
                        formatCardExpiry(e.target.value),
                        {
                          shouldValidate: true,
                        },
                      )
                    }
                    placeholder="MM/AA"
                    className="w-full outline-none text-secondary-text"
                  />
                </div>

                {errors.cardExpiration && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.cardExpiration.message}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block font-medium text-foreground">
                  CVV (código de segurança)
                </label>

                <div className="flex items-center gap-3 rounded-xl border px-4 py-3">
                  <CreditCard size={20} className="text-gray-400" />

                  <input
                    {...register("cardCvv")}
                    value={watch("cardCvv") ?? ""}
                    maxLength={3}
                    inputMode="numeric"
                    placeholder="123"
                    onChange={(event) =>
                      setValue(
                        "cardCvv",
                        event.target.value.replace(/\D/g, "").slice(0, 3),
                        { shouldValidate: true },
                      )
                    }
                    className="w-full outline-none text-secondary-text"
                  />
                </div>

                {errors.cardCvv && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.cardCvv.message}
                  </p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block font-medium text-foreground">
                  Nome impresso no cartão
                </label>

                <input
                  {...register("nameOnCard")}
                  placeholder="Ex: Maria Silva"
                  className="w-full rounded-xl border px-4 py-3 outline-none text-secondary-text"
                />

                {errors.nameOnCard && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.nameOnCard.message}
                  </p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block font-medium text-foreground">
                  Número de parcelas
                </label>

                <select className="w-full rounded-xl border px-4 py-3 outline-none text-secondary-text mt-2">
                  <option value="">Selecione o número de parcelas</option>
                  <option value="1">1x de {formatBRL(total)}</option>
                  <option value="2">2x de {formatBRL(total / 2)}</option>
                  <option value="3">3x de {formatBRL(total / 3)}</option>
                  <option value="4">4x de {formatBRL(total / 4)}</option>
                  <option value="5">5x de {formatBRL(total / 5)}</option>
                  <option value="6">6x de {formatBRL(total / 6)}</option>
                </select>
              </div>
            </div>
          </Step>

          <Step>
            <h2 className="text-xl font-bold text-foreground">Revisão</h2>

            <p className="text-gray-500">Revise os dados antes de confirmar.</p>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <div className="rounded-2xl border p-5">
                <h3 className="mb-4 font-bold text-foreground">
                  Dados pessoais
                </h3>

                <div className="space-y-3 text-sm text-gray-600">
                  <p>
                    <strong>Nome:</strong> {name}
                  </p>

                  <p>
                    <strong>E-mail:</strong> {email}
                  </p>

                  <p>
                    <strong>Telefone:</strong> {phone}
                  </p>

                  <p>
                    <strong>CPF:</strong> {document}
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border p-5">
                <h3 className="mb-4 font-bold text-foreground">
                  Dados de pagamento
                </h3>

                <div className="space-y-3 text-sm text-gray-600">
                  <p>
                    <strong>Cartão:</strong> {maskCardNumber(cardNumber)}
                  </p>

                  <p>
                    <strong>Validade:</strong> {cardExpiration}
                  </p>

                  <div className="flex items-center justify-between gap-3">
                    <p>
                      <strong>CVV:</strong> {showCvv ? cardCvv : "***"}
                    </p>

                    <button
                      type="button"
                      onClick={() => setShowCvv((current) => !current)}
                      className="rounded-full p-2 text-primary hover:bg-blue-50"
                    >
                      {showCvv ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>

                  <p>
                    <strong>Nome no cartão:</strong> {nameOnCard}
                  </p>
                </div>
              </div>
            </div>
          </Step>
        </Stepper>

        {bookingId && <BookingConfirmationCard bookingId={bookingId} />}
      </div>

      <aside className="order-1 h-fit rounded-2xl bg-white p-5 shadow-sm lg:order-2">
        <div className="relative h-48 overflow-hidden rounded-xl">
          <Image
            src={selectedHotel.thumbnail}
            alt={selectedHotel.name}
            fill
            sizes="350px"
            className="object-cover"
            loading="lazy"
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
            <span>{nights} Diária(s)</span>
            <strong>{formatBRL(roomsTotal)}</strong>
          </p>

          <p className="flex items-center justify-between">
            <span>Taxas</span>
            <strong>{formatBRL(BOOKING_TAXES)}</strong>
          </p>

          <p className="flex items-center justify-between">
            <span>Impostos</span>
            <strong>{formatBRL(BOOKING_FEES)}</strong>
          </p>
        </div>

        <div className="mt-5 border-t pt-5">
          <p className="flex items-center justify-between text-lg font-bold text-foreground">
            <span>Total</span>

            <span className="text-primary">{formatBRL(total)}</span>
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
