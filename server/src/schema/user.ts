import { object, string, TypeOf, boolean, number } from "zod";
import { emailRegex, passwordRegex } from "../helpers";

export const createUserSchema = object({
      body: object({
            first_name: string({
                  required_error: "first name is required",
            }).min(3, "invalide name"),

            last_name: string().min(3, "invalide name").optional().nullable(),

            username: string({
                  required_error: "username is required",
            }),

            email: string({
                  required_error: "email is required",
            })
                  .max(320)
                  .email("not a valide email"),
            // .regex(emailRegex, "Invalide email"),

            password: string({
                  required_error: "password is required",
            }).min(6, "password should be at least 6 chars"),
            // .regex(passwordRegex, "Weak password"),

            password_confirmation: string({
                  required_error: "password confirmation is required",
            }),

            agree: boolean(),
      })
            .refine((data) => data.password === data.password_confirmation, {
                  message: "passwords do not match",
                  path: ["password_confirmation"],
            })
            .refine((data) => data.agree == true, {
                  message: "please read privacy policy",
                  path: ["agree"],
            }),
});

export const loginUserSchema = object({
      body: object({
            email_or_username: string({
                  required_error: "login is required",
            }),

            password: string({
                  required_error: "password is required",
            }).min(6, "password should be at least 6 chars"),
      }),
});

export const verifyUserSchema = object({
      params: object({
            id: string(),
            verificationCode: string(),
      }),
});

export const forgotPasswordSchema = object({
      body: object({
            email: string({
                  required_error: "Email is required",
            }).email("Invalid email"),
      }),
});

export const resetPasswordSchema = object({
      params: object({
            id: string(),
            passwordResetCode: string(),
      }),

      body: object({
            password: string({
                  required_error: "password is required",
            })
                  .min(6, "password should be at least 6 chars")
                  .regex(passwordRegex, "Weak password"),

            password_confirmation: string({
                  required_error: "password confirmation is required",
            }),
      }).refine((data) => data.password === data.password_confirmation, {
            message: "passwords do not match",
            path: ["password_confirmation"],
      }),
});

export const updateUserSchema = object({
      body: object({
            first_name: string({}).min(3, "invalide name").optional(),

            last_name: string().min(3, "invalide name").optional(),

            username: string({}).optional(),

            email: string({})
                  .max(320)
                  .email("not a valide email")
                  .regex(emailRegex, "Invalide email")
                  .optional(),
      }),
});

export const searchUsersSchema = object({
      body: object({
            // part 1
            gender: boolean().optional(),

            location: object({
                  country: number().optional(),
                  region: number().optional(),
                  city: number().optional(),
            }).optional(),

            username: string().optional(),
            name: string().optional(),
            online: boolean().optional(),
            phone_number: string().optional(),
            with_photo: boolean().optional(),

            // part 2
            partner_age: object({
                  from: number().optional(),
                  to: number().optional(),
            }),

            height: object({
                  from: number().optional(),
                  to: number().optional(),
            }),

            weight: object({
                  from: number().optional(),
                  to: number().optional(),
            }),

            without_children: boolean().optional(),
            languages: number().array().optional(),
            marital_status: number().array().optional(),
            smoking: number().array().optional(),
            drinking: number().array().optional(),
            relegion: number().array().optional(),
            eye_color: number().array().optional(),
            hair_color: number().array().optional(),

            // part3
            income: string().optional(),
            education: string().optional(),
            ocupation: string().optional(),
      }),
});

export type ForgotPasswordInput = TypeOf<typeof forgotPasswordSchema>["body"];
export type VerifyUserInput = TypeOf<typeof verifyUserSchema>["params"];
export type CreateUserInput = TypeOf<typeof createUserSchema>["body"];
export type UpdateUserInput = TypeOf<typeof updateUserSchema>["body"];
export type LoginUserInput = TypeOf<typeof loginUserSchema>["body"];
export type SearchUsersInput = TypeOf<typeof searchUsersSchema>["body"];
export type ResetPasswordInput = TypeOf<typeof resetPasswordSchema>;
