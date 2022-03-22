import { object, string, TypeOf, boolean, number } from "zod";

import { data } from "../helpers";

export const metaSchema = object({
      body: object({
            phone_number: string().max(17, "invalide phone number").nullable(),

            dob: string()
                  .refine(
                        (v) => (Date.parse(v) ? true : false),

                        "invalide date"
                  )
                  .nullable(),

            gender: number()
                  .max(data.genders.length - 1, "invalide gender input")
                  .nullable(),

            location: object({
                  country: string().nullable(),

                  region: string().nullable(),

                  city: string().nullable(),

                  timezone: string().nullable(),
            }).nullable(),

            marital_status: number()
                  .max(data.marital_status.length - 1)
                  .nullable(),

            height: number()
                  .min(data.min_height)
                  .max(data.max_height)
                  .nullable(),

            weight: number()
                  .min(data.min_weight)
                  .max(data.max_weight)
                  .nullable(),

            hair_color: number()
                  .min(0)
                  .max(data.hair_colors.length - 1)
                  .nullable(),

            eye_color: number()
                  .min(0)
                  .max(data.eye_colors.length - 1)
                  .nullable(),

            children: number().min(0).max(data.children_max).nullable(),

            relegion: number().min(0).max(data.relegions.length).nullable(),

            smoking: number().min(0).max(data.habit.length).nullable(),

            drinking: number().min(0).max(data.habit.length).nullable(),

            income: number().min(0).max(data.income.length).nullable(),

            education: string().max(32).nullable(),

            ocupation: string().max(32).nullable(),

            languages: number().array().nullable(),

            partner_age: object({
                  from: number().min(data.min_age).max(data.max_age).nullable(),

                  to: number().min(data.min_age).max(data.max_age).nullable(),
            }).nullable(),

            about_me: string().max(256).nullable(),

            about_partner: string().max(256).nullable(),
      }),
});

export type MetaInput = TypeOf<typeof metaSchema>["body"];
