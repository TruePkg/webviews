import { injectGlobal } from 'styled-components'

// import './Fonts'

export const SMALL_MOBILE = 320
export const MOBILE = 640
export const TABLET = 832
export const DESKTOP = 1208
export const BREAKPOINT_UNIT = 'px'

const themeVars = {
  // Viewport sizes
  viewportMaxWidth: '1200px',

  // This gives us 4 breakpoints to work with
  breakpoints: [
    `${MOBILE}${BREAKPOINT_UNIT}`,
    `${TABLET}${BREAKPOINT_UNIT}`,
    `${DESKTOP}${BREAKPOINT_UNIT}`
  ],

  // Styled-System
  space: [0, 8, 16, 32, 64], // eslint-disable-line no-magic-numbers
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 72], // eslint-disable-line no-magic-numbers

  // Colors
  // brandColor: 'rgb(58, 181, 203)',
  brandColor: 'rgb(1, 1, 1)',
  superLightGrey: 'rgb(240, 240, 240)',
  lightGrey: 'rgb(216, 216, 216)',
  lightMedGrey: 'rgb(204, 204, 204)',
  medGrey: 'rgb(170, 170, 170)',
  darkMedGrey: 'rgb(122, 139, 151)',
  darkGrey: 'rgb(101,113,121)',
  superDarkGrey: 'rgb(61, 70, 76)',
  errorColor: 'rgb(244, 67, 54)',
  warningColor: 'rgb(255, 152, 0)',
  successColor: 'rgb(138, 226, 159)',
  // primaryButtonUpBg: 'rgb(58, 181, 203)',
  primaryButtonUpBg: 'rgb(1, 1, 1)',
  primaryButtonUpText: 'white',
  // primaryButtonOverBg: 'rgb(87, 201, 222)',
  primaryButtonOverBg: 'rgb(101, 101, 101)',
  primaryButtonOverText: 'white',
  dangerButtonUpBg: 'rgb(244, 123, 115)',
  dangerButtonUpText: 'white',
  dangerButtonOverBg: 'rgb(252, 151, 146)',
  dangerButtonOverText: 'white',
  successButtonUpBg: 'rgb(138, 226, 159)',
  successButtonUpText: 'white',
  successButtonOverBg: 'rgb(164, 234, 180)',
  successButtonOverText: 'white',
  disabledButtonBg: 'rgb(240, 240, 240)',
  disabledButtonText: 'rgb(204, 204, 204)',
  backgroundColor: 'rgb(246,252,253)',
  get defaultTextColor() {
    return this.darkGrey
  },

  // Font Weights
  fontSizeThin: 100,
  fontSizeRegular: 400,
  fontSizeSemiBold: 500,
  fontSizeBold: 700
}

export default themeVars

injectGlobal`
  * {
    font-family: 'Roboto', sans-serif;
  }
  html { min-height: 100%; }
  body {
    // background-color: ${themeVars.backgroundColor};
    color: ${themeVars.defaultTextColor};
    margin: 0;
    padding: 0;
    min-height: 100%;
  }
  a {
    color: ${themeVars.brandColor};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`
