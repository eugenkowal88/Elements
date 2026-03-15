import type { Element } from '../types/element';
import { getCategoryStyle, formatAtomicMass } from '../utils/elementHelpers';
import { useLanguage } from '../i18n/LanguageContext';

interface Props {
  element: Element;
  dimmed: boolean;
  onClick: () => void;
  style: React.CSSProperties;
}

export function ElementCell({ element, dimmed, onClick, style }: Props) {
  const cat = getCategoryStyle(element.category);
  const { t } = useLanguage();
  const name = t.elementNames[element.name] || element.name;

  return (
    <button
      type="button"
      className={`
        relative flex flex-col items-center justify-center
        p-0.5 rounded cursor-pointer select-none
        border transition-all duration-150
        ${cat.bg} ${cat.darkBg} ${cat.border}
        hover:scale-110 hover:z-10 hover:shadow-lg
        focus:outline-none focus:ring-2 focus:ring-blue-500
        ${dimmed ? 'opacity-20 pointer-events-none' : ''}
      `}
      style={style}
      onClick={onClick}
      aria-label={`${name}, ${t.element} ${element.number}`}
    >
      <span className="text-[0.5rem] leading-tight text-gray-600 dark:text-gray-400">
        {element.number}
      </span>
      <span className={`text-sm font-bold leading-tight ${cat.text}`}>
        {element.symbol}
      </span>
      <span className="text-[0.4rem] leading-tight text-gray-700 dark:text-gray-300 truncate w-full text-center">
        {name}
      </span>
      <span className="text-[0.4rem] leading-tight text-gray-500 dark:text-gray-400">
        {formatAtomicMass(element.atomic_mass)}
      </span>
    </button>
  );
}
