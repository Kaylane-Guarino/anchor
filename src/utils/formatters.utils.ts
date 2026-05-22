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

// Formata número de telefone para padrão brasileiro
export const formatPhone = (value: string): string => {
  const onlyNumbers = value.replace(/\D/g, "");

  if (onlyNumbers.length <= 10) {
    return onlyNumbers.replace(
      /(\d{2})(\d{4})(\d{0,4})/,
      "($1) $2-$3"
    );
  }

  return onlyNumbers.replace(
    /(\d{2})(\d{5})(\d{0,4})/,
    "($1) $2-$3"
  );
};

// Formata CPF para padrão brasileiro
export const formatCPF = (value: string): string => {
  const onlyNumbers = value.replace(/\D/g, "").slice(0, 11);

  return onlyNumbers.replace(
    /(\d{3})(\d{3})(\d{3})(\d{0,2})/,
    "$1.$2.$3-$4"
  );
};

// Formata número de cartão de crédito para padrão brasileiro
export function formatCreditCard(value: string) {
  return value
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(\d{4})(?=\d)/g, "$1 ")
    .trim();
}

// Formata data de validade do cartão para padrão MM/AAAA
export function formatCardExpiry(value: string) {
  const cleanedValue = value
    .replace(/\D/g, "")
    .slice(0, 4);

  let month = cleanedValue.slice(0, 2);
  const year = cleanedValue.slice(2);

  if (month.length === 2) {
    const monthNumber = Number(month);

    if (monthNumber < 1) month = "01";
    if (monthNumber > 12) month = "12";
  }

  return year ? `${month}/${year}` : month;
}