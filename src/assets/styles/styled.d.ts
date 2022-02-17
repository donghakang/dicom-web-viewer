import "styled-components";

declare module "styled-components" {
    export interface DefaultTheme {

        color: {
            primary: string;
            primary2: string;
            primary3: string;
            dark: string;
            gray: string;
        }
    }
}