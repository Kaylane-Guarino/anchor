export function SearchResultsEmpty() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold text-foreground">
        Nenhum hotel encontrado
      </h2>

      <p className="mt-2 text-gray-500">
        Tente alterar filtros ou destino.
      </p>
    </div>
  );
}