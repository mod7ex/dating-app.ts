import { AxiosRequestConfig } from "axios";

/*

let wrapper = async function <T>(fn: (...args: any) => T) {
      try {
            // @ts-ignore
            return await fn(...args);
      } catch (error: any) {
            if (error.response) {
                  console.log(error.response.data);
            } else if (error.request) {
                  console.log(error.request);
            } else {
                  console.log("Error", error.message);
            }

            return {} as T;
      }
};

*/

export const get = async <T>(uri: string, config?: AxiosRequestConfig) => {
      try {
            let { data } = await window.apiLocations.get<T>(uri, config);
            return data;
      } catch (error: any) {
            if (error.response) {
                  console.log(error.response.data);
            } else if (error.request) {
                  console.log(error.request);
            } else {
                  console.log("Error", error.message);
            }

            return {} as T;
      }
};

export const post = async <T>(
      uri: string,
      payload: any,
      config?: AxiosRequestConfig
) => {
      try {
            let { data } = await window.apiLocations.post<T>(
                  uri,
                  payload,
                  config
            );
            return data;
      } catch (error: any) {
            if (error.response) {
                  console.log(error.response.data);
            } else if (error.request) {
                  console.log(error.request);
            } else {
                  console.log("Error", error.message);
            }

            return {} as T;
      }
};
