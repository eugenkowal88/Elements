import { useEffect, useRef } from 'react';
import type { Element } from '../types/element';
import { getCategoryStyle, formatAtomicMass } from '../utils/elementHelpers';

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
      aria-label={`Details for ${element.name}`}
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
            aria-label="Close"
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
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{element.name}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Element {element.number} &middot; {element.category}
              </p>
            </div>
          </div>
        </div>

        {/* Properties */}
        <div className="p-6 space-y-4">
          <section>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">Basic Properties</h3>
            <DetailRow label="Atomic Mass" value={formatAtomicMass(element.atomic_mass)} />
            <DetailRow label="Phase" value={element.phase} />
            <DetailRow label="Density" value={element.density ? `${element.density} g/cm³` : null} />
            <DetailRow label="Block" value={element.block} />
            <DetailRow label="Period" value={element.period} />
            <DetailRow label="Group" value={element.group || null} />
            <DetailRow label="Appearance" value={element.appearance} />
          </section>

          <section>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">Thermal</h3>
            <DetailRow label="Melting Point" value={element.melt ? `${element.melt} K` : null} />
            <DetailRow label="Boiling Point" value={element.boil ? `${element.boil} K` : null} />
            <DetailRow label="Molar Heat" value={element.molar_heat ? `${element.molar_heat} J/(mol·K)` : null} />
          </section>

          <section>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">Electronic</h3>
            <DetailRow label="Electron Configuration" value={element.electron_configuration_semantic} />
            <DetailRow label="Electronegativity" value={element.electronegativity_pauling} />
            <DetailRow label="Electron Affinity" value={element.electron_affinity ? `${element.electron_affinity} kJ/mol` : null} />
            <DetailRow label="Shells" value={element.shells.join(', ')} />
          </section>

          <section>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">Discovery</h3>
            <DetailRow label="Discovered By" value={element.discovered_by} />
            <DetailRow label="Named By" value={element.named_by} />
          </section>

          {element.summary && (
            <section>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">Summary</h3>
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
              Learn more on Wikipedia &rarr;
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
