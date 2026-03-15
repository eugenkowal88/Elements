import { useState, useMemo, useCallback } from 'react';
import type { Element } from './types/element';
import { elements } from './data/elements';
import { searchElements, filterByCategory, getUniqueCategories } from './utils/elementHelpers';
import { useTheme } from './hooks/useTheme';
import { PeriodicTable } from './components/PeriodicTable';
import { ElementDetail } from './components/ElementDetail';
import { SearchBar } from './components/SearchBar';
import { Legend } from './components/Legend';
import { ThemeToggle } from './components/ThemeToggle';
import { ReloadPrompt } from './components/ReloadPrompt';

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);

  const categories = useMemo(() => getUniqueCategories(elements), []);

  const filteredElements = useMemo(() => {
    let result = elements;
    result = searchElements(result, searchQuery);
    result = filterByCategory(result, activeCategory);
    return result;
  }, [searchQuery, activeCategory]);

  const filteredIds = useMemo(
    () => new Set(filteredElements.map((el) => el.number)),
    [filteredElements]
  );

  const handleClose = useCallback(() => setSelectedElement(null), []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
      <header className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-lg font-bold tracking-tight">
          Periodic Table
        </h1>
        <ThemeToggle theme={theme} onToggle={toggleTheme} />
      </header>

      <main className="px-4 py-4 space-y-4 max-w-[1400px] mx-auto">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <Legend categories={categories} activeCategory={activeCategory} onToggle={setActiveCategory} />
        <PeriodicTable elements={elements} filteredIds={filteredIds} onSelect={setSelectedElement} />
      </main>

      {selectedElement && (
        <ElementDetail element={selectedElement} onClose={handleClose} />
      )}

      <ReloadPrompt />
    </div>
  );
}
