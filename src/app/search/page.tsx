import { Suspense } from "react";

import { SearchResults } from "@/components/search/search-results/SearchResults";
import { SearchResultsSkeleton } from "@/components/search/search-results/SearchResultsSkeleton";
import { SearchFilterBar } from "@/components/search/searchFilterBar/SearchFilterBar";

export default function SearchPage() {
  return (
    <main className="min-h-screen bg-gray-100">
      <Suspense fallback={null}>
        <SearchFilterBar />
      </Suspense>

      <section className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="mb-2 text-3xl font-bold text-foreground">
          Hospedagens encontradas
        </h1>

        <p className="mb-6 text-gray-500">
          Compare os melhores hotéis disponíveis para sua busca.
        </p>

        <Suspense fallback={<SearchResultsSkeleton />}>
          <SearchResults />
        </Suspense>
      </section>
    </main>
  );
}