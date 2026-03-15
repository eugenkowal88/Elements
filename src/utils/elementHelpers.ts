import type { Element } from '../types/element';
import { CATEGORY_COLORS } from '../data/elements';

export function getCategoryStyle(category: string) {
  const normalized = category.startsWith('unknown')
    ? 'unknown'
    : category;
  return CATEGORY_COLORS[normalized] || CATEGORY_COLORS['unknown'];
}

export function searchElements(elements: Element[], query: string, translatedNames?: Record<string, string>): Element[] {
  if (!query.trim()) return elements;
  const q = query.toLowerCase().trim();
  return elements.filter(
    (el) =>
      el.name.toLowerCase().includes(q) ||
      el.symbol.toLowerCase().includes(q) ||
      el.number.toString() === q ||
      (translatedNames && (translatedNames[el.name] || '').toLowerCase().includes(q))
  );
}

export function filterByCategory(elements: Element[], category: string | null): Element[] {
  if (!category) return elements;
  return elements.filter((el) => el.category === category);
}

export function formatAtomicMass(mass: number): string {
  if (mass >= 100) return mass.toFixed(2);
  if (mass >= 10) return mass.toFixed(3);
  return mass.toFixed(4);
}

export function getUniqueCategories(elements: Element[]): string[] {
  const cats = new Set(elements.map((el) => el.category));
  return Array.from(cats).sort();
}
