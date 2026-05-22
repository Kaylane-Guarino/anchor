"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";

import Illustration from "../../../assets/high-five.svg";

type BookingConfirmationCardProps = {
  bookingId: string;
};

export function BookingConfirmationCard({
  bookingId,
}: BookingConfirmationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        duration: 0.4,
        scale: {
          type: "spring",
          visualDuration: 0.4,
          bounce: 0.45,
        },
      }}
      className="mt-8 flex flex-col items-center rounded-2xl bg-white p-6 text-center shadow-sm md:p-8"
    >
      <h2 className="text-3xl font-bold text-primary md:text-4xl">
        Reserva confirmada!
      </h2>

      <p className="mt-4 text-gray-500">
        Sua reserva foi concluída com sucesso.
      </p>

      <div className="mt-8 rounded-2xl bg-gray-50 p-6">
        <p className="text-sm text-gray-500">Número da reserva</p>

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

      <Image
        src={Illustration}
        alt="Confirmação de reserva"
        className="mt-6"
      />
    </motion.div>
  );
}