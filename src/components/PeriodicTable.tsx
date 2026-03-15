import type { Element } from '../types/element';
import { ElementCell } from './ElementCell';

interface Props {
  elements: Element[];
  filteredIds: Set<number>;
  onSelect: (el: Element) => void;
}

export function PeriodicTable({ elements, filteredIds, onSelect }: Props) {
  return (
    <div className="overflow-x-auto pb-4">
      <div
        className="grid gap-[2px] min-w-[900px] mx-auto"
        style={{
          gridTemplateColumns: 'repeat(18, minmax(0, 1fr))',
          gridTemplateRows: 'repeat(7, auto) 1rem repeat(2, auto)',
        }}
      >
        {elements.map((el) => (
          <ElementCell
            key={el.number}
            element={el}
            dimmed={!filteredIds.has(el.number)}
            onClick={() => onSelect(el)}
            style={{ gridColumn: el.xpos, gridRow: el.ypos }}
          />
        ))}

        {/* Lanthanide indicator */}
        <div
          className="flex items-center justify-center text-[0.5rem] text-gray-500 dark:text-gray-400 font-medium"
          style={{ gridColumn: 3, gridRow: 6 }}
        >
        </div>

        {/* Actinide indicator */}
        <div
          className="flex items-center justify-center text-[0.5rem] text-gray-500 dark:text-gray-400 font-medium"
          style={{ gridColumn: 3, gridRow: 7 }}
        >
        </div>

        {/* Labels for lanthanide/actinide rows */}
        <div
          className="flex items-center justify-center text-[0.5rem] text-pink-600 dark:text-pink-400 font-medium col-span-1"
          style={{ gridColumn: 2, gridRow: 9 }}
        >
          57-71
        </div>
        <div
          className="flex items-center justify-center text-[0.5rem] text-rose-600 dark:text-rose-400 font-medium col-span-1"
          style={{ gridColumn: 2, gridRow: 10 }}
        >
          89-103
        </div>
      </div>
    </div>
  );
}
