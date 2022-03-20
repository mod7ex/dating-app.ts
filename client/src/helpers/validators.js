const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const phoneNumberRegex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;

const nameRegex = new RegExp(`^[a-z ,.'-]+$`, "i");

const passwordRegex = new RegExp(`^[a-z ,.'-]+$`);

let cleanOnEmpty = (fn) => {
      return (v) => {
            if (!v) return true;
            return fn(v);
      };
};

/*

export const required = (v) => (v ? true : false);
export const name = cleanOnEmpty((v) => nameRegex.test(v));
export const email = cleanOnEmpty((v) => emailRegex.test(v));
export const login_field = cleanOnEmpty((v) => email(v) || name(v));
export const password = cleanOnEmpty((v) => passwordRegex.test(v));
export const equale_to = (field, state) => {
      return (v) => v === state[field];
};

*/

export const required = (val) => {
      return {
            valide: ((v) => (v ? true : false))(val),
            error: "field is required",
      };
};

export const name = (val) => {
      return {
            valide: cleanOnEmpty((v) => nameRegex.test(v))(val),
            error: "invalide name",
      };
};

export const phone_number = (val) => {
      return {
            valide: cleanOnEmpty((v) => phoneNumberRegex.test(v))(val),
            error: "invalide phone number",
      };
};

export const email = (val) => {
      return {
            valide: cleanOnEmpty((v) => emailRegex.test(v))(val),
            error: "invalide email",
      };
};

export const login_field = (val) => {
      return {
            valide: cleanOnEmpty(
                  (v) => emailRegex.test(v) || nameRegex.test(v)
            )(val),
            error: "invalide login",
      };
};

export const password = (val) => {
      return {
            // valide: cleanOnEmpty((v) => passwordRegex.test(v))(val),
            valide: () => true,
            error: "invalide password",
      };
};

export const equale_to = (field, state) => {
      return (val) => {
            return {
                  valide: ((v) => v === state[field])(val),
                  error: `doesn't match with ${field}`,
            };
      };
};
