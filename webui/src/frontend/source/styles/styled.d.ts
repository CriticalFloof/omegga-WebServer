import "styled-components";

type hexColor = `#${string}`;

declare module "styled-components" {
    export interface DefaultTheme {
        colors: {
            //Thematic
            foreground: {
                primary: hexColor;
                primaryAlt: hexColor;
                header: hexColor;
                footer: hexColor;
            };
            background: {
                primary: hexColor;
                primaryAlt: hexColor;
                secondary: hexColor;
                secondaryAlt: hexColor;
                header: hexColor;
                footer: hexColor;
            };
            element: {
                fg: hexColor;
                bg: hexColor;
                popoutBg: hexColor;
                headerBg: hexColor;
                footerBg: hexColor;
                normal: hexColor;
                hover: hexColor;
                pressed: hexColor;
                overlay: hexColor;
            };
            button: {
                normal: hexColor;
                hover: hexColor;
                pressed: hexColor;
                disabled: hexColor;
            };
            //Purely Colored
            main: {
                normal: hexColor;
                hover: hexColor;
                pressed: hexColor;
                disabled: hexColor;
            };
            info: {
                normal: hexColor;
                hover: hexColor;
                pressed: hexColor;
                disabled: hexColor;
            };
            warn: {
                normal: hexColor;
                hover: hexColor;
                pressed: hexColor;
                disabled: hexColor;
            };
            error: {
                normal: hexColor;
                hover: hexColor;
                pressed: hexColor;
                disabled: hexColor;
            };
        };
        sizes: {
            px: {
                headerFont: number;
                footerFont: number;
                elementFont: number;
                headerHeight: number;
                footerHeight: number;
                elementHeight: number;
            };
        };
    }
}
