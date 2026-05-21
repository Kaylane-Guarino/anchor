import { SearchForm } from "@/components/search/search-form/SearchForm";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const destinations = [
  {
    name: "Rio de Janeiro",
    imageUrl:
      "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "São Paulo",
    imageUrl: "https://images.unsplash.com/photo-1629984557780-4dde2292e245?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Florianópolis",
    imageUrl: "https://images.unsplash.com/photo-1565574337618-b08146e94992?q=80&w=1075&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Fenando de Noronha",
    imageUrl: "https://images.unsplash.com/photo-1614722860207-909e0e8dfd99?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Jericoacoara",
    imageUrl: "https://images.unsplash.com/photo-1639489358300-f8297bf9537a?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  }
];

export default function Home() {
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
          <h1 className="text-2xl font-bold mb-8 text-secondary-text">Destinos mais procurados</h1>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative w-full h-64">
              <Image
                src={destinations[0].imageUrl}
                alt={destinations[0].name}
                fill
                className="object-cover rounded-lg bg-gray-200"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4 rounded-b-lg">
                {destinations[0].name}
              </div>
            </div>
            <div className="relative w-full h-64">
              <Image
                src={destinations[1].imageUrl}
                alt={destinations[1].name}
                fill
                className="object-cover rounded-lg bg-gray-200"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4 rounded-b-lg">
                {destinations[1].name}
              </div>
            </div>
          </div>
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 mt-20">
            <div className="relative w-full h-64">
              <Image
                src={destinations[2].imageUrl}
                alt={destinations[2].name}
                fill
                className="object-cover rounded-lg bg-gray-200"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4 rounded-b-lg">
                {destinations[2].name}
              </div>
            </div>
            <div className="relative w-full h-64">
              <Image
                src={destinations[3].imageUrl}
                alt={destinations[3].name}
                fill
                className="object-cover rounded-lg bg-gray-200"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4 rounded-b-lg">
                {destinations[3].name}
              </div>
            </div>
            <div className="relative w-full h-64">
              <Image
                src={destinations[4].imageUrl}
                alt={destinations[4].name}
                fill
                className="object-cover rounded-lg bg-gray-200"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4 rounded-b-lg">
                {destinations[4].name}
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col flex-1 items-center py-20">
          <h1 className="text-2xl font-bold mb-8 text-secondary-text">Hoteis mais procurados</h1>
            <Carousel className="w-full sm:max-w-xs md:max-w-5xl">
              <CarouselContent className="-ml-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <CarouselItem
                    key={index}
                    className="basis-1/2 pl-1 lg:basis-1/3"
                  >
                    <div className="p-1 bg-gray-200 rounded-lg h-64 flex items-center justify-center">
                      <p>Hotel {index + 1}</p>
                    </div>
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
