export const emailRegex = new RegExp(
      `^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$`
);

export const nameRegex = new RegExp(`^[a-z ,.'-]+$`, "i");

export const passwordRegex = new RegExp(
      `^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$`
);

export const required = (v) => (v ? true : false);
export const name = (v) => nameRegex.test(v);
export const email = (v) => emailRegex.test(v);
export const login_field = (v) => email(v) || name(v);
export const password = (v) => passwordRegex.test(v);
