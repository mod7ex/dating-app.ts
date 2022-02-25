import { object, string, TypeOf } from "zod";

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
            }).email("not a valide email"),

            password: string({
                  required_error: "password is required",
            }).min(6, "password should be at least 6 chars"),

            password_confirmation: string({
                  required_error: "password confirmation is required",
            }),
      }).refine((data) => data.password === data.password_confirmation, {
            message: "passwords do not confirm",
      }),
});

export const verifyUserSchema = object({
      prams: object({
            id: string(),
            verificationCode: string(),
      }),
});

export const passwordResetSchema = object({
      body: object({
            email: string({
                  required_error: "Email is required",
            }).email("Invalid email"),
      }),
});

export type CreateUserInput = TypeOf<typeof createUserSchema>["body"];
export type VerifyUserInput = TypeOf<typeof verifyUserSchema>["prams"];
export type PasswordResetInput = TypeOf<typeof passwordResetSchema>["body"];
