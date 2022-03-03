import { object, string, TypeOf, date, boolean, number } from "zod";

export const metaSchema = object({
      body: object({
            phone_number: string({})
                  .max(15, "invalide phone number")
                  .optional(),
            dob: date().optional(),
            gender: boolean().optional(),
            location: object({
                  country: number().optional(),
                  region: number().optional(),
                  city: number().optional(),
                  timezone: number().optional(),
            }).optional(),
            marital_status: number().optional(),
            height: number().optional(),
            weight: number().optional(),
            hair_color: number().optional(),
            eye_color: number().optional(),
            children: number().optional(),
            relegion: number().optional(),
            smoking: number().optional(),
            drinking: number().optional(),
            income: number().optional(),
            education: string().max(32).optional(),
            ocupation: string().max(32).optional(),
            languages: number().array().optional().optional(),
            partner_age: object({
                  from: number().optional(),
                  to: number(),
            }).optional(),
            about_me: string().max(256).optional(),
            about_partner: string().max(256).optional(),
      }),
});

export type MetaInput = TypeOf<typeof metaSchema>["body"];
