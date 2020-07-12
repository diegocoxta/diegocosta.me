export type Languages = 'pt' | 'en';
export type Translations = typeof en;

const en = {
  lessThan1Minute: 'Less than 1 minute',
  minutes: 'minutes',
  ofReading: 'of reading',
};

const pt: Translations = {
  lessThan1Minute: 'Menos de 1 minuto',
  minutes: 'minutos',
  ofReading: 'de leitura',
};

const translations: { [key: string]: Translations } = {
  pt,
  en,
};

export default translations;
