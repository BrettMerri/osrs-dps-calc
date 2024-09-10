import { Player } from '@/types/Player';
import {
  closestCenter, DndContext, DragEndEvent, PointerSensor, useSensor, useSensors,
} from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useMemo } from 'react';
import { restrictToHorizontalAxis, restrictToParentElement } from '@dnd-kit/modifiers';
import LoadoutTab from './LoadoutTab';

interface LoadoutTabsProps {
  loadouts: Player[];
  moveLoadout: (activeId: string, overId: string) => void;
  selectedLoadoutId: string;
  setSelectedLoadoutId: (id: string) => void;
}

const LoadoutTabs: React.FC<LoadoutTabsProps> = ({
  loadouts,
  moveLoadout,
  selectedLoadoutId,
  setSelectedLoadoutId,
}) => {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 20 } }),
  );

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;

    if (!over) {
      return;
    }

    const activeId = String(active.id);
    const overId = String(over.id);

    if (activeId !== overId) {
      moveLoadout(activeId, overId);
    }
  };

  const loadoutIds = useMemo(() => loadouts.map(({ id }) => id), [loadouts]);

  return (
    <ul className="my-1 flex h-full">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToHorizontalAxis, restrictToParentElement]}
      >
        <SortableContext
          items={loadoutIds}
          strategy={verticalListSortingStrategy}
        >
          {loadouts.map(({ id }, idx) => (
            <LoadoutTab
              isSelected={id === selectedLoadoutId}
              onSelect={() => {
                setSelectedLoadoutId(id);
              }}
              id={id}
              index={idx}
              key={id}
            />
          ))}
        </SortableContext>
      </DndContext>
    </ul>
  );
};

export default LoadoutTabs;
