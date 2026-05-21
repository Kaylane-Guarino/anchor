import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@/hooks/useDebounce";
import { getSuggestions } from "@/services/api";

export function useSuggestions(query: string) {
  const debouncedQuery = useDebounce(query, 300);

  return useQuery({
    queryKey: ["suggestions", debouncedQuery],
    queryFn: () => getSuggestions(debouncedQuery),
    enabled: debouncedQuery.trim().length >= 2,
  });
}