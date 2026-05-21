//Formata número para Real (BRL) sem centavos
export const formatBRL = (
  value: number | string
): string => {
  const number =
    typeof value === "string"
      ? Number(value.replace(",", "."))
      : value;

  if (isNaN(number)) return "R$ 0";

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(number);
};

// Formata data para padrão brasileiro
export const formatDate = (
  date: Date | string,
  options?: Intl.DateTimeFormatOptions
): string => {
  const parsedDate = new Date(date);

  if (isNaN(parsedDate.getTime())) return "";

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    ...options,
  }).format(parsedDate);
};