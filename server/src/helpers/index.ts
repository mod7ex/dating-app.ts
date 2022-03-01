type FnType = (...args: any[]) => any;

export const wrap = (fn: FnType): FnType => {
      return (...args: any[]) => {
            try {
                  fn(...args);
            } catch (error) {
                  console.log("error in wrap function; ", error);
            }
      };
};

export const emailRegex = new RegExp(
      `^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$`
);

export const passwordRegex = new RegExp(
      `^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$`
);

export const generateCode = (n = 4) => {
      let code = Math.floor(Math.random() * 10 ** 4);
      return code.toString();
};
