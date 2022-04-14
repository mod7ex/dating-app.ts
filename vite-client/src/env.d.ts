/// <reference types="vite/client" />
import { AxiosInstance } from "axios";

declare module "*.vue" {
      import type { DefineComponent } from "vue";
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
      const component: DefineComponent<{}, {}, any>;
      export default component;
}

declare global {
      interface Window {
            api: AxiosInstance;
            apiLocations: AxiosInstance;
      }

      interface HeaderPage {
            name: string;
            label: string;
            icon?: string;
      }

      type countryType = {
            id: number;
            name: string;
            code: string;
            timezones: any[];
      };

      type stateType = {
            id: number;
            name: string;
            code: string;
            country_code: string;
      };

      type cityType = {
            id: number;
            name: string;
            state_code: string;
            country_code: string;
      };
}
