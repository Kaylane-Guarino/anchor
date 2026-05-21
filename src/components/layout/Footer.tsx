import Image from "next/image";
import Link from "next/link";

import Logo from "../../../assets/logo-blue.svg";

import { getHotels } from "@/services/api";

function getDefaultSearchUrl(destination: string) {
  const today = new Date();

  const checkIn = new Date(today);
  checkIn.setDate(today.getDate() + 3);

  const checkOut = new Date(checkIn);
  checkOut.setDate(checkIn.getDate() + 3);

  const formatDate = (date: Date) => date.toISOString().split("T")[0];

  const params = new URLSearchParams({
    destination,
    checkIn: formatDate(checkIn),
    checkOut: formatDate(checkOut),
    adults: "1",
    children: "0",
    rooms: "1",
  });

  return `/search?${params.toString()}`;
}

const popularDestinations = [
  "Rio de Janeiro, RJ",
  "São Paulo, SP",
  "Salvador, BA",
  "Florianópolis, SC",
  "Maceió, AL",
];

export async function Footer() {
  const hotelsResponse = await getHotels({
    sort: "rating",
    order: "desc",
    limit: "5",
  });

  const popularHotels = hotelsResponse.hotels;

  return (
    <footer className="mt-20 bg-white border-t">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-14 md:grid-cols-[1.2fr_1fr_1fr]">
        {/* Logo */}

        <div>
          <Link href="/">
            <Image alt="Anchor" src={Logo} width={200} sizes="200px" />
          </Link>

          <p className="mt-5 max-w-sm text-sm leading-6 text-gray-500">
            Descubra hotéis incríveis, encontre destinos populares e planeje sua
            próxima viagem.
          </p>
        </div>

        {/* Destinos */}

        <div>
          <h3 className="mb-5 text-lg font-bold text-secondary-text">
            Destinos populares
          </h3>

          <ul className="space-y-3">
            {popularDestinations.map((destination) => (
              <li key={destination}>
                <Link
                  href={getDefaultSearchUrl(destination)}
                  className="text-gray-500 transition hover:text-primary"
                >
                  {destination}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Hotéis */}

        <div>
          <h3 className="mb-5 text-lg font-bold text-secondary-text">
            Hotéis populares
          </h3>

          <ul className="space-y-3">
            {popularHotels.map((hotel) => (
              <li key={hotel.id}>
                <Link href={`/hotel/${hotel.id}`} className=" gap-2 transition">
                  <span className="line-clamp-1 text-gray-500 hover:text-primary">
                    {hotel.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t py-6 text-center text-sm text-gray-500">
        Desenvolvido com ❤️ por Kaylane Guarino • © 2026
      </div>
    </footer>
  );
}
