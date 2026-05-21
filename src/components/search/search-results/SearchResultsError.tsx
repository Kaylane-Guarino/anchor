type SearchResultsErrorProps = {
  onRetry: () => void;
};

export function SearchResultsError({ onRetry }: SearchResultsErrorProps) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold text-foreground">
        Erro ao carregar hotéis
      </h2>

      <p className="mt-2 text-gray-500">
        Não foi possível buscar hotéis.
      </p>

      <button
        type="button"
        onClick={onRetry}
        className="mt-4 rounded-xl bg-primary px-5 py-3 font-semibold text-white"
      >
        Tentar novamente
      </button>
    </div>
  );
}