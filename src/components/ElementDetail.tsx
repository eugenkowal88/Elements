import { useEffect, useRef } from 'react';
import type { Element } from '../types/element';
import { getCategoryStyle, formatAtomicMass } from '../utils/elementHelpers';
import { useLanguage } from '../i18n/LanguageContext';

interface Props {
  element: Element;
  onClose: () => void;
}

function DetailRow({ label, value }: { label: string; value: string | number | null }) {
  if (value === null || value === undefined) return null;
  return (
    <div className="flex justify-between py-1 border-b border-gray-200 dark:border-gray-700">
      <span className="text-gray-500 dark:text-gray-400 text-sm">{label}</span>
      <span className="text-gray-900 dark:text-gray-100 text-sm font-medium">{String(value)}</span>
    </div>
  );
}

export function ElementDetail({ element, onClose }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const cat = getCategoryStyle(element.category);
  const { t } = useLanguage();
  const name = t.elementNames[element.name] || element.name;
  const categoryName = t.categories[element.category] || element.category;
  const phaseName = t.phases[element.phase] || element.phase;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    panelRef.current?.focus();
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label={`${name}`}
    >
      <div
        ref={panelRef}
        tabIndex={-1}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto outline-none"
      >
        {/* Header */}
        <div className={`relative p-6 rounded-t-xl ${cat.bg} ${cat.darkBg} ${cat.border} border-b`}>
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 transition-colors"
            aria-label={t.close}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="flex items-center gap-4">
            <div className={`text-5xl font-bold ${cat.text}`}>
              {element.symbol}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{name}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t.element} {element.number} &middot; {categoryName}
              </p>
            </div>
          </div>
        </div>

        {/* Properties */}
        <div className="p-6 space-y-4">
          <section>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">{t.basicProperties}</h3>
            <DetailRow label={t.atomicMass} value={formatAtomicMass(element.atomic_mass)} />
            <DetailRow label={t.phase} value={phaseName} />
            <DetailRow label={t.density} value={element.density ? `${element.density} g/cm³` : null} />
            <DetailRow label={t.block} value={element.block} />
            <DetailRow label={t.period} value={element.period} />
            <DetailRow label={t.group} value={element.group || null} />
            <DetailRow label={t.appearance} value={element.appearance} />
          </section>

          <section>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">{t.thermal}</h3>
            <DetailRow label={t.meltingPoint} value={element.melt ? `${element.melt} K` : null} />
            <DetailRow label={t.boilingPoint} value={element.boil ? `${element.boil} K` : null} />
            <DetailRow label={t.molarHeat} value={element.molar_heat ? `${element.molar_heat} J/(mol·K)` : null} />
          </section>

          <section>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">{t.electronic}</h3>
            <DetailRow label={t.electronConfiguration} value={element.electron_configuration_semantic} />
            <DetailRow label={t.electronegativity} value={element.electronegativity_pauling} />
            <DetailRow label={t.electronAffinity} value={element.electron_affinity ? `${element.electron_affinity} kJ/mol` : null} />
            <DetailRow label={t.shells} value={element.shells.join(', ')} />
          </section>

          <section>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">{t.discovery}</h3>
            <DetailRow label={t.discoveredBy} value={element.discovered_by} />
            <DetailRow label={t.namedBy} value={element.named_by} />
          </section>

          {element.summary && (
            <section>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">{t.summary}</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                {element.summary}
              </p>
            </section>
          )}

          {element.source && (
            <a
              href={element.source}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-sm text-blue-600 dark:text-blue-400 hover:underline mt-2"
            >
              {t.learnMore} &rarr;
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
