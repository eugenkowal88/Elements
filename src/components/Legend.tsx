import { CATEGORY_COLORS } from '../data/elements';
import { useLanguage } from '../i18n/LanguageContext';

interface Props {
  categories: string[];
  activeCategory: string | null;
  onToggle: (category: string | null) => void;
}

export function Legend({ categories, activeCategory, onToggle }: Props) {
  const { t } = useLanguage();

  return (
    <div className="flex flex-wrap gap-1.5 justify-center">
      {categories.map((cat) => {
        const style = CATEGORY_COLORS[cat] || CATEGORY_COLORS['unknown'];
        const isActive = activeCategory === cat;
        const label = t.categories[cat] || cat;
        return (
          <button
            key={cat}
            type="button"
            onClick={() => onToggle(isActive ? null : cat)}
            className={`
              px-2 py-1 rounded text-[0.6rem] font-medium
              border transition-all duration-150
              ${style.bg} ${style.darkBg} ${style.border} ${style.text}
              ${isActive ? 'ring-2 ring-blue-500 ring-offset-1 dark:ring-offset-gray-900 scale-105' : 'hover:scale-105'}
            `}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
