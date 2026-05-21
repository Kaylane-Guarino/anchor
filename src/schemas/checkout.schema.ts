import { z } from "zod";

export const checkoutSchema = z.object({
  name: z.string().min(3, "Informe seu nome completo."),
  email: z.string().email("Informe um e-mail válido."),
  phone: z.string().min(10, "Informe um telefone válido."),
  document: z.string().min(11, "Informe um CPF válido."),
  terms: z.boolean().refine((value) => value === true, {
    message: "Você precisa aceitar os termos.",
  }),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;