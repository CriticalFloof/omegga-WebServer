import { DefaultTheme } from "styled-components";
import type { hexColor } from "./styled.d.ts";

type ColorPalette = {
    thematic: hexColor[];
    colored: {
        [index: string]: hexColor[];
    };
};
export const COLOR_PALETTE: ColorPalette = {
    thematic: [
        "#ffffff",
        "#a7bbce",
        "#5e7190",
        "#455a7e",
        "#263f61",
        "#224c7b",
        "#1b2f4a",
        "#1a2848",
        "#182b44",
        "#162841",
        "#131d30",
        "#111a2b",
        "#091021",
    ],
    colored: {
        main: ["#5da93d", "#8dc377", "#41772b"],
        info: ["#009bee", "#4cb9f3", "#007da7"],
        warn: ["#ffa10b", "#ffbd54", "#b37108"],
        error: ["#e02d2d", "#e96c6c", "#9d2020"],
    },
};

type SizePalette = {
    px: number[];
};
export const SIZE_PALETTE: SizePalette = {
    px: [24, 32, 48],
};

export default {
    colors: {
        //Thematic
        foreground: {
            primary: COLOR_PALETTE.thematic[0],
            primaryAlt: COLOR_PALETTE.thematic[1],
            header: COLOR_PALETTE.thematic[0],
            footer: COLOR_PALETTE.thematic[0],
        },
        background: {
            primary: COLOR_PALETTE.thematic[6],
            primaryAlt: COLOR_PALETTE.thematic[8],
            secondary: COLOR_PALETTE.thematic[10],
            secondaryAlt: COLOR_PALETTE.thematic[11],
            header: COLOR_PALETTE.thematic[12],
            footer: COLOR_PALETTE.thematic[12],
        },
        element: {
            fg: COLOR_PALETTE.thematic[2],
            bg: COLOR_PALETTE.thematic[5],
            popoutBg: COLOR_PALETTE.thematic[4],
            headerBg: COLOR_PALETTE.thematic[9],
            footerBg: COLOR_PALETTE.thematic[9],
            normal: COLOR_PALETTE.thematic[3],
            hover: COLOR_PALETTE.thematic[2],
            pressed: COLOR_PALETTE.thematic[4],
            overlay: COLOR_PALETTE.thematic[4],
        },
        button: {
            normal: COLOR_PALETTE.thematic[3],
            hover: COLOR_PALETTE.thematic[2],
            pressed: COLOR_PALETTE.thematic[4],
            disabled: COLOR_PALETTE.thematic[4],
        },
        //Purely Colored
        main: {
            normal: COLOR_PALETTE.colored.main[0],
            hover: COLOR_PALETTE.colored.main[1],
            pressed: COLOR_PALETTE.colored.main[2],
            disabled: COLOR_PALETTE.colored.main[2],
        },
        info: {
            normal: COLOR_PALETTE.colored.info[0],
            hover: COLOR_PALETTE.colored.info[1],
            pressed: COLOR_PALETTE.colored.info[2],
            disabled: COLOR_PALETTE.colored.info[2],
        },
        warn: {
            normal: COLOR_PALETTE.colored.warn[0],
            hover: COLOR_PALETTE.colored.warn[1],
            pressed: COLOR_PALETTE.colored.warn[2],
            disabled: COLOR_PALETTE.colored.warn[2],
        },
        error: {
            normal: COLOR_PALETTE.colored.error[0],
            hover: COLOR_PALETTE.colored.error[1],
            pressed: COLOR_PALETTE.colored.error[2],
            disabled: COLOR_PALETTE.colored.error[2],
        },
    },
    sizes: {
        px: {
            headerFont: SIZE_PALETTE.px[0],
            footerFont: SIZE_PALETTE.px[0],
            elementFont: SIZE_PALETTE.px[0],
            headerHeight: SIZE_PALETTE.px[2],
            footerHeight: SIZE_PALETTE.px[2],
            elementHeight: SIZE_PALETTE.px[1],
        },
    },
} as DefaultTheme;
