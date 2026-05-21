import { SearchForm } from "@/components/search/search-form/SearchForm";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getHotels } from "@/services/api";
import Link from "next/dist/client/link";
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
    name: "Fenando de Noronha, PE",
    imageUrl:
      "https://images.unsplash.com/photo-1614722860207-909e0e8dfd99?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Jericoacoara, CE",
    imageUrl:
      "https://images.unsplash.com/photo-1639489358300-f8297bf9537a?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export default async function Home() {
  const { hotels } = await getHotels({
    sort: "rating",
    order: "desc",
    limit: "6",
  });

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

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-background">
      <main className="w-full bg-primary">
        <div className="w-full flex flex-col flex-1 items-center py-20">
          <div className="mb-8 flex flex-col items-center gap-4">
            <h1 className="text-primary-text text-5xl font-bold">
              Aonde você quer ir?
            </h1>
            <p className="text-primary-text text-lg">
              Busque pelos melhores hoteis e compare preços
            </p>
          </div>
          <SearchForm variant="hero" />
        </div>
      </main>
      <main className="w-full max-w-6xl">
        <div className="w-full flex flex-col flex-1 items-center py-20">
          <h1 className="text-2xl font-bold mb-8 text-secondary-text">
            Destinos mais procurados
          </h1>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href={getDefaultSearchUrl(destinations[0].name)} className="relative w-full h-64 cursor-pointer">
              <Image
                src={destinations[0].imageUrl}
                alt={destinations[0].name}
                fill
                className="object-cover rounded-lg bg-gray-200"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4 rounded-b-lg">
                {destinations[0].name}
              </div>
            </Link>
            <Link href={getDefaultSearchUrl(destinations[1].name)} className="relative w-full h-64 cursor-pointer">
              <Image
                src={destinations[1].imageUrl}
                alt={destinations[1].name}
                fill
                className="object-cover rounded-lg bg-gray-200"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4 rounded-b-lg">
                {destinations[1].name}
              </div>
            </Link>
          </div>
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 mt-20">
            <Link href={getDefaultSearchUrl(destinations[2].name)} className="relative w-full h-64 cursor-pointer">
              <Image
                src={destinations[2].imageUrl}
                alt={destinations[2].name}
                fill
                className="object-cover rounded-lg bg-gray-200"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4 rounded-b-lg">
                {destinations[2].name}
              </div>
            </Link>
            <Link href={getDefaultSearchUrl(destinations[3].name)} className="relative w-full h-64 cursor-pointer">
              <Image
                src={destinations[3].imageUrl}
                alt={destinations[3].name}
                fill
                className="object-cover rounded-lg bg-gray-200"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4 rounded-b-lg">
                {destinations[3].name}
              </div>
            </Link>
            <Link href={getDefaultSearchUrl(destinations[4].name)} className="relative w-full h-64 cursor-pointer">
              <Image
                src={destinations[4].imageUrl}
                alt={destinations[4].name}
                fill
                className="object-cover rounded-lg bg-gray-200"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4 rounded-b-lg">
                {destinations[4].name}
              </div>
            </Link>
          </div>
        </div>

        <div className="w-full flex flex-col flex-1 items-center py-20">
          <h1 className="text-2xl font-bold mb-8 text-secondary-text">
            Hoteis mais procurados
          </h1>
          <Carousel className="w-full sm:max-w-xs md:max-w-5xl">
            <CarouselContent className="-ml-1">
              {hotels.map((hotel) => (
                <CarouselItem
                  key={hotel.id}
                  className="basis-1/2 pl-2 lg:basis-1/3"
                >
                  <Link
                    href={`/hotel/${hotel.id}`}
                    className="block overflow-hidden rounded-xl bg-white shadow-sm transition hover:shadow-md"
                  >
                    <div className="relative h-48 w-full">
                      <Image
                        src={hotel.thumbnail}
                        alt={hotel.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="p-4">
                      <h2 className="line-clamp-1 font-bold text-secondary-text">
                        {hotel.name}
                      </h2>

                      <p className="mt-1 text-sm text-gray-500">
                        {hotel.destination}
                      </p>

                      <div className="mt-3 flex items-center justify-between">
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
            <CarouselPrevious className="text-secondary-text" />
            <CarouselNext className="text-secondary-text" />
          </Carousel>
        </div>
      </main>
    </div>
  );
}
