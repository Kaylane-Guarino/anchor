export function updateSearchParams(
  currentParams: URLSearchParams,
  values: Record<string, string | string[] | undefined>
) {
  const params = new URLSearchParams(
    currentParams.toString()
  );

  Object.entries(values).forEach(
    ([key, value]) => {
      params.delete(key);

      if (!value) return;

      if (Array.isArray(value)) {
        value.forEach((item) => {
          if (item) {
            params.append(
              key,
              item
            );
          }
        });

        return;
      }

      params.set(
        key,
        value
      );
    }
  );

  return params;
}