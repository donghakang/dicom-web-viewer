import "styled-components";

declare module "styled-components" {
    export interface DefaultTheme {

        color: {
            loadColor1: string;
            loadColor2: string;
            dark: string;
            gray: string;
        }
    }
}