import { z } from "zod";

export function onlyNumbers(value: string) {
  return value.replace(/\D/g, "");
}

function hasFullName(value: string) {
  const words = value.trim().split(/\s+/);
  return words.length >= 2 && words.every((word) => word.length >= 2);
}

function isValidCPF(value: string) {
  const cpf = onlyNumbers(value);

  if (cpf.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(cpf)) return false;

  let sum = 0;

  for (let i = 0; i < 9; i++) {
    sum += Number(cpf[i]) * (10 - i);
  }

  let firstDigit = (sum * 10) % 11;
  if (firstDigit === 10) firstDigit = 0;

  if (firstDigit !== Number(cpf[9])) return false;

  sum = 0;

  for (let i = 0; i < 10; i++) {
    sum += Number(cpf[i]) * (11 - i);
  }

  let secondDigit = (sum * 10) % 11;
  if (secondDigit === 10) secondDigit = 0;

  return secondDigit === Number(cpf[10]);
}

function isValidCreditCard(value: string) {
  const cardNumber = onlyNumbers(value);

  if (cardNumber.length < 13 || cardNumber.length > 19) return false;

  let sum = 0;
  let shouldDouble = false;

  for (let index = cardNumber.length - 1; index >= 0; index--) {
    let digit = Number(cardNumber[index]);

    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }

    sum += digit;
    shouldDouble = !shouldDouble;
  }

  return sum % 10 === 0;
}

export const checkoutSchema = z.object({
  name: z
    .string()
    .min(1, "Informe seu nome completo.")
    .refine(hasFullName, "Informe nome e sobrenome."),

  email: z
    .string()
    .min(1, "Informe seu e-mail.")
    .regex(
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      "Informe um e-mail válido.",
    ),

  phone: z
    .string()
    .min(1, "Informe seu telefone.")
    .refine((value) => onlyNumbers(value).length === 11, {
      message: "Informe um telefone válido com DDD.",
    }),

  document: z
    .string()
    .min(1, "Informe seu CPF.")
    .refine(isValidCPF, "Informe um CPF válido."),

  cardNumber: z
    .string()
    .min(1, "Informe o número do cartão.")
    .refine(isValidCreditCard, "Informe um cartão válido."),

  cardExpiration: z
    .string()
    .min(1, "Informe a validade."),

  cardCvv: z
    .string()
    .min(1, "Informe o CVV.")
    .regex(/^\d{3}$/, "O CVV deve ter 3 números."),

  nameOnCard: z
    .string()
    .min(1, "Informe o nome impresso no cartão."),

  installments: z.string().optional(),

  terms: z.boolean().refine((value) => value === true, {
    message: "Você precisa aceitar os termos.",
  }),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;