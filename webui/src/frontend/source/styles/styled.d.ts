import "styled-components";

type hexColor = `#${string}`;
type pxSize = `${string}px`;

declare module "styled-components" {
    export interface DefaultTheme {
        colors: {
            //Thematic
            foreground: {
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
            headerFont: pxSize;
            footerFont: pxSize;
            elementFont: pxSize;
            headerHeight: pxSize;
            footerHeight: pxSize;
            elementHeight: pxSize;
        };
    }
}
