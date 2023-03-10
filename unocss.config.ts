import {
  defineConfig,
  presetIcons,
  presetUno,
  transformerCompileClass,
  transformerDirectives,
  transformerVariantGroup
} from 'unocss';
import { presetScrollbar } from 'unocss-preset-scrollbar';
import { presetForms } from '@julr/unocss-preset-forms';

const COLORS = {
  brand: {
    100: '#410E0B',
    200: '#651218',
    300: '#91121C',
    400: '#B03030',
    500: '#D44343',
    600: '#EF5151',
    700: '#F86F6F',
    800: '#FF9298',
    900: '#FFC3CE',
    950: '#FFE8F3',
    990: '#FEF7F9'
  },
  red: {
    100: '#410E0B',
    150: '#800000',
    200: '#841A1A',
    300: '#BB3030',
    400: '#DB2828',
    500: '#FD1414',
    600: '#FF4242',
    700: '#FF6262',
    800: '#FF9797',
    900: '#FFD2D2',
    950: '#FFE5E5',
    990: '#FFF8F8'
  },
  green: {
    100: '#1C3A24',
    200: '#235531',
    300: '#2E8646',
    400: '#25A549',
    500: '#29B550',
    600: '#34C85E',
    700: '#46D96F',
    800: '#66E58A',
    900: '#87F2A6',
    950: '#ACFFC4',
    990: '#E5FEEC'
  },
  purple: {
    100: '#5D1C63',
    200: '#8E2098',
    300: '#A822B5',
    400: '#C826D7',
    500: '#DC20EC',
    600: '#E940F8',
    700: '#F365FF',
    800: '#F68FFF',
    900: '#F9BAFF',
    950: '#FDE1FF',
    990: '#FEF5FF'
  },
  blue: {
    100: '#084558',
    200: '#095F7B',
    300: '#0B83AA',
    400: '#1097C3',
    500: '#13ACDE',
    600: '#29BEEF',
    700: '#40CBF9',
    800: '#6FDBFF',
    900: '#ACEBFF',
    950: '#D3F4FF',
    990: '#EEFBFF'
  },
  yellow: {
    100: '#755414',
    200: '#AD7E21',
    300: '#DC9C1E',
    400: '#F0A614',
    500: '#FFAD0D',
    600: '#FFBA32',
    700: '#FFC960',
    800: '#FFD98E',
    900: '#FFE6B7',
    950: '#FFF3DC',
    990: '#FFFBF3'
  },
  // gray: {
  //   100: '#141313',
  //   200: '#242527',
  //   300: '#333333',
  //   350: '#3A3A3C',
  //   400: '#48484A',
  //   500: '#555555',
  //   600: '#6C6D6D',
  //   700: '#84868A',
  //   750: '#858585',
  //   800: '#9DA0A6',
  //   900: '#C4C4CD',
  //   950: '#E4E4EC',
  //   990: '#F5F5F5',
  //   1000: '#FFFFFF',
  // },
  divider: '#0000000D'
};

export default defineConfig({
  theme: {
    colors: COLORS,
    fontFamily: {
      sans: "'Be Vietnam Pro', sans-serif"
    }
  },
  shortcuts: [
    [/^stack-(\d+)$/, ([, stack]) => `flex items-center space-x${stack}`],
    ['flex-center', 'flex items-center justify-center'],
    ['text-primary', 'text-brand-300 dark:text-brand-500'],
    ['text-main', 'text-gray-900'],
    ['text-secondary', 'text-gray-700'],
    ['bg-default', 'bg-gray-1000 dark:bg-[#131313]'],
    ['bg-paper', 'bg-gray-1000/60 dark:bg-gray-200/60']
  ],
  rules: [
    [/^mw-inline-(\d+)$/, ([, d]) => ({ 'margin-inline': `max(0px, 50% - ${d}px / 2)` })],
    [/^square-(\d+)$/, ([, d]) => ({ width: `${+d / 4}rem`, height: `${+d / 4}rem` })],
    [
      /^text-shadow-(.+)$/,
      ([, color]) => ({
        'text-shadow': `0 0 10px #${color}, 0 0 10px #${color}, 0 0 20px #${color}`
      })
    ],
    [
      'sr-only',
      {
        position: 'absolute',
        width: '1px',
        height: '1px',
        padding: '0',
        margin: '-1px',
        overflow: 'hidden',
        clip: 'rect(0, 0, 0, 0)',
        'white-space': 'nowrap',
        'border-width': '0'
      }
    ],
    [
      'backface-hidden',
      {
        'backface-visibility': 'hidden',
        '-moz-backface-visibility': 'hidden',
        '-webkit-backface-visibility': 'hidden',
        '-ms-backface-visibility': 'hidden'
      }
    ]
  ],
  transformers: [transformerDirectives(), transformerVariantGroup(), transformerCompileClass()],
  presets: [
    presetUno(),
    presetForms(),
    presetScrollbar(),
    presetIcons({
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle'
      }
    })
  ]
});
