import { SearchForm } from "@/components/home/SearchForm";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-pink-600">
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
          <SearchForm />
        </div>
      </main>
      <main className="w-full max-w-6xl bg-yellow-200">
        <div className="w-full flex flex-col flex-1 items-center py-20">
          <div className="mb-8 flex flex-col items-center gap-4">
            <h1 className="text-primary-text text-5xl font-bold">
              Aonde você quer ir?
            </h1>
            <p className="text-primary-text text-lg">
              Busque pelos melhores hoteis e compare preços
            </p>
          </div>
          <SearchForm />
        </div>
      </main>
    </div>
  );
}
