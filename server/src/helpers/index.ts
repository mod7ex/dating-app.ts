export const wrap = (fn: (...args: any[]) => any) => {
      try {
            fn();
      } catch (error) {
            console.log("error in wrap function; ", error);
      }
};
