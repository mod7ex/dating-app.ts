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
            })
                  .max(320)
                  .email("not a valide email"),

            password: string({
                  required_error: "password is required",
            }).min(6, "password should be at least 6 chars"),

            password_confirmation: string({
                  required_error: "password confirmation is required",
            }),
      }).refine((data) => data.password === data.password_confirmation, {
            message: "passwords do not match",
            path: ["password_confirmation"],
      }),
});

export const loginUserSchema = object({
      body: object({
            login: string({
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
            }).min(6, "password should be at least 6 chars"),

            password_confirmation: string({
                  required_error: "password confirmation is required",
            }),
      }).refine((data) => data.password === data.password_confirmation, {
            message: "passwords do not match",
            path: ["password_confirmation"],
      }),
});

export type CreateUserInput = TypeOf<typeof createUserSchema>["body"];
export type LoginUserInput = TypeOf<typeof loginUserSchema>["body"];
export type VerifyUserInput = TypeOf<typeof verifyUserSchema>["params"];
export type ForgotPasswordInput = TypeOf<typeof forgotPasswordSchema>["body"];
export type ResetPasswordInput = TypeOf<typeof resetPasswordSchema>;
