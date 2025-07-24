import { useKV } from '@github/spark/hooks';
import { translations, Language, TranslationKey } from '../data/translations';

export function useTranslation() {
  const [currentLanguage, setCurrentLanguage] = useKV<Language>('app-language', 'en');
  
  const t = (key: TranslationKey): string => {
    return translations[currentLanguage || 'en'][key] || key;
  };
  
  const toggleLanguage = () => {
    setCurrentLanguage((currentLang) => currentLang === 'en' ? 'ja' : 'en');
  };
  
  return {
    t,
    currentLanguage: currentLanguage || 'en',
    setLanguage: setCurrentLanguage,
    toggleLanguage
  };
}