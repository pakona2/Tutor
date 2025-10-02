import { translations } from './translations';

export function t(key, lang = 'en') {
  return translations[lang][key] || translations['en'][key] || key;
}
