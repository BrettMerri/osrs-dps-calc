import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface LoadoutTabProps {
  id: string;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
}

const LoadoutTab: React.FC<LoadoutTabProps> = ({
  id, index, isSelected, onSelect,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <button
      ref={setNodeRef}
      type="button"
      className={`min-w-[40px] text-left first:md:rounded-tl px-4 py-1 border-l-2 first:border-l-0 last:rounded-tr border-body-100 dark:border-dark-300 transition-colors ${isSelected
        ? 'bg-orange-400 dark:bg-orange-700'
        : 'bg-btns-400 dark:bg-dark-400'
      } ${isDragging && 'z-10'}`}
      onClick={onSelect}
      style={style}
      /* eslint-disable react/jsx-props-no-spreading */
      // This is recommended by dnd-kit docs
      {...attributes}
      {...listeners}
      /* eslint-enable react/jsx-props-no-spreading */
    >
      {index + 1}
    </button>
  );
};
export default LoadoutTab;
