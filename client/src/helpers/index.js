const emailRegex = new RegExp(
      `^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$`
);
const nameRegex = new RegExp(`^[a-z ,.'-]+$`, "i");

const passwordRegex = new RegExp(
      `^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$`
);

module.exports = {
      name: (v) => {
            if (!v) return false;
            return nameRegex.test(v);
      },

      email: (v) => {
            if (!v) return false;
            return emailRegex.test(v);
      },

      password: (v) => {
            if (!v) return false;
            return passwordRegex.test(v);
      },

      debounce: function (func, timeout = 2000) {
            let timer;
            return (...args) => {
                  clearTimeout(timer);
                  timer = setTimeout(() => {
                        func.apply(this, args);
                  }, timeout);
            };
      },
};
