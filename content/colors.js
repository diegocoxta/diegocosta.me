const colors = {
  AMBER: '#E5A53B',
  BROWN: '#7C5B34',
  COBALT: '#1B56E6',
  CRIMSON: '#941D2A',
  CYAN: '#4BA0DC',
  MAGENTA: '#C62C72',
  LIME: '#AAC13D',
  INDIGO: '#602AF5',
  GREEN: '#72A537',
  EMERALD: '#345A4A',
  MAUVE: '#726287',
  OLIVE: '#728567',
  ORANGE: '#E9702D',
  PINK: '#E47BCC',
  RED: '#D2321F',
  SIENNA: '#723E40',
  STEEL: '#687585',
  TEAL: '#4BA8A8',
  VIOLET: '#9B31F6',
  YELLOW: '#D4C03F',
  TAUPE: '#87794E',
  CLOUDS: '#EDF0F1',
  MIDNIGHTBLUE: '#2F3D4F',
  WETASPHALT: '#38485D',
  SILVER: '#BEC3C7',
  BLACK: '#0E1116',
  REVOLUTION: '#9F2125',
  BEIGE: '#D3BF9C',
  WHITE: '#FFFFFF',
  ULTRAMARINE: '#3A3D7D',
  GRASA: '#0513D8',
  CHICOMIO: '#C4D14D',
};

const themeDark = {
  titleColor: colors.CLOUDS,
  subtitleColor: colors.SILVER,
  textColor: colors.CLOUDS,
  backgroundColor: colors.BLACK,
  accentColor: colors.CHICOMIO,
};

const themeLight = {
  ...themeDark,
  titleColor: colors.MIDNIGHTBLUE,
  subtitleColor: colors.WETASPHALT,
  textColor: colors.MIDNIGHTBLUE,
  backgroundColor: colors.WHITE,
};

module.exports = { themeDark, themeLight, colors };
