export const wrap = (fn: (...args: any[]) => any) => {
      try {
            fn();
      } catch (error) {
            console.log("error in wrap function; ", error);
      }
};

export const emailRegex = new RegExp(
      `^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$`
);
