import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";

import { SearchForm } from "@/components/search/search-form/SearchForm";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getHotels } from "@/services/api";
import { formatBRL } from "@/utils/formatters.utils";

const destinations = [
  {
    name: "Rio de Janeiro, RJ",
    imageUrl:
      "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "São Paulo, SP",
    imageUrl:
      "https://images.unsplash.com/photo-1629984557780-4dde2292e245?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Florianópolis, SC",
    imageUrl:
      "https://images.unsplash.com/photo-1565574337618-b08146e94992?q=80&w=1075&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Fernando de Noronha, PE",
    imageUrl:
      "https://images.unsplash.com/photo-1614722860207-909e0e8dfd99?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Jericoacoara, CE",
    imageUrl:
      "https://images.unsplash.com/photo-1639489358300-f8297bf9537a?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

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

function getNextWeekendDates() {
  const today = new Date();

  const friday = new Date(today);
  const day = today.getDay();

  const daysUntilFriday = (5 - day + 7) % 7 || 7;

  friday.setDate(today.getDate() + daysUntilFriday);

  const sunday = new Date(friday);
  sunday.setDate(friday.getDate() + 2);

  return {
    checkIn: friday,
    checkOut: sunday,
  };
}

export default async function Home() {
  const { hotels } = await getHotels({
    sort: "rating",
    order: "desc",
    limit: "6",
  });

  function formatCarouselDate(date: Date) {
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "long",
    })
      .format(date)
      .replace(".", "");
  }

  const { checkIn, checkOut } = getNextWeekendDates();

  const weekendLabel = `${formatCarouselDate(checkIn)} - ${formatCarouselDate(
    checkOut,
  )}`;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main className="w-full bg-primary">
        <section className="mx-auto flex w-full max-w-6xl flex-col items-center px-4 py-14 md:py-20">
          <div className="mb-8 flex flex-col items-center gap-3 text-center">
            <h1 className="text-3xl font-bold text-primary-text sm:text-4xl md:text-5xl">
              Aonde você quer ir?
            </h1>

            <p className="max-w-xl text-base text-primary-text sm:text-lg">
              Busque pelos melhores hotéis e compare preços
            </p>
          </div>

          <div className="w-full">
            <Suspense fallback={null}>
              <SearchForm variant="hero" />
            </Suspense>
          </div>
        </section>
      </main>

      <main className="mx-auto w-full max-w-6xl px-4">
        <section className="w-full py-14 md:py-20">
          <h2 className="mb-8 text-center text-2xl font-bold text-secondary-text">
            Destinos mais procurados
          </h2>

          <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
            {destinations.slice(0, 2).map((destination) => (
              <Link
                key={destination.name}
                href={getDefaultSearchUrl(destination.name)}
                className="relative h-56 w-full overflow-hidden rounded-lg sm:h-64"
              >
                <Image
                  src={destination.imageUrl}
                  alt={destination.name}
                  fill
                  priority
                  quality={85}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition hover:scale-105"
                />

                <div className="absolute inset-x-0 bottom-0 bg-black/50 p-4 font-semibold text-white">
                  {destination.name}
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-4 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {destinations.slice(2).map((destination) => (
              <Link
                key={destination.name}
                href={getDefaultSearchUrl(destination.name)}
                className="relative h-56 w-full overflow-hidden rounded-lg sm:h-64"
              >
                <Image
                  src={destination.imageUrl}
                  alt={destination.name}
                  fill
                  priority
                  quality={85}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition hover:scale-105"
                />

                <div className="absolute inset-x-0 bottom-0 bg-black/50 p-4 font-semibold text-white">
                  {destination.name}
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="w-full pb-16 md:pb-24">
          <h2 className="mb-8 text-center text-2xl font-bold text-secondary-text">
            Hotéis mais procurados
          </h2>

          <Carousel className="mx-auto w-full max-w-full">
            <CarouselContent className="-ml-4">
              {hotels.map((hotel) => (
                <CarouselItem
                  key={hotel.id}
                  className="basis-full pl-4 sm:basis-1/2 lg:basis-1/3"
                >
                  <Link
                    href={`/hotel/${hotel.id}?checkIn=${checkIn.toISOString().split("T")[0]}&checkOut=${checkOut.toISOString().split("T")[0]}`}
                  >
                    <div className="relative h-52 w-full">
                      <Image
                        src={hotel.thumbnail}
                        alt={hotel.name}
                        fill
                        priority
                        quality={85}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover"
                      />
                    </div>

                    <div className="p-4">
                      <h3 className="line-clamp-1 font-bold text-secondary-text">
                        {hotel.name}
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        {hotel.destination}
                      </p>

                      <p className="mt-2 text-sm font-medium text-gray-500">
                        {weekendLabel}
                      </p>

                      <div className="mt-3 flex items-center justify-between gap-3">
                        <span className="rounded-lg bg-primary px-2 py-1 text-sm font-bold text-white">
                          {hotel.rating}
                        </span>

                        <strong className="text-primary">
                          {formatBRL(hotel.pricePerNight)}
                        </strong>
                      </div>
                    </div>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="left-2 hidden text-secondary-text md:flex" />
            <CarouselNext className="right-2 hidden text-secondary-text md:flex" />
          </Carousel>
        </section>
      </main>
    </div>
  );
}
