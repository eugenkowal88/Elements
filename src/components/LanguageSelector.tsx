import { useLanguage } from '../i18n/LanguageContext';
import type { Language } from '../i18n/translations';

const languages: { code: Language; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'uk', label: 'UA' },
  { code: 'pl', label: 'PL' },
];

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex gap-1">
      {languages.map(({ code, label }) => (
        <button
          key={code}
          type="button"
          onClick={() => setLanguage(code)}
          className={`
            px-2 py-1 text-xs font-medium rounded transition-colors
            ${language === code
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }
          `}
          aria-label={label}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
