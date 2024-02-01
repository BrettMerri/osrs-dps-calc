import React, { useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/state';
import SectionAccordion from '@/app/components/generic/SectionAccordion';
import defence from '@/public/img/bonuses/defence.png';
import attack from '@/public/img/bonuses/attack.png';
import ranged from '@/public/img/bonuses/ranged.png';
import magic from '@/public/img/bonuses/magic.png';
import LazyImage from '@/app/components/generic/LazyImage';
import { IconAlertTriangle } from '@tabler/icons-react';
import NPCVersusPlayerResultsTable from '@/app/components/results/NPCVersusPlayerResultsTable';

const NPCVersusPlayerResultsContainer: React.FC = observer(() => {
  const store = useStore();
  const { monster } = store;
  const { showNPCVersusPlayerResults } = store.prefs;

  const renderMonsterStyleImage = useMemo(() => {
    if (['slash', 'stab', 'crush'].includes(monster.style || '')) {
      return <img src={attack.src} className="w-5" alt="Melee" />;
    }
    if (monster.style === 'ranged') {
      return <img src={ranged.src} className="w-5" alt="Ranged" />;
    }
    if (monster.style === 'magic') {
      return <img src={magic.src} className="w-5" alt="Magic" />;
    }
    return null;
  }, [monster.style]);

  const isNonStandard = useMemo(() => !['slash', 'crush', 'stab', 'magic', 'ranged'].includes(monster.style || ''), [monster.style]);

  return (
    <SectionAccordion
      defaultIsOpen={showNPCVersusPlayerResults}
      onIsOpenChanged={(o) => store.updatePreferences({ showNPCVersusPlayerResults: o })}
      title={(
        <div className="flex items-center gap-2">
          <div className="w-6 flex justify-center"><LazyImage src={defence.src} /></div>
          <h3 className="font-serif font-bold">
            Damage Taken
            {' '}
            <span className="text-gray-300">
              (
              {store.monster.name}
              {' '}
              vs Player)
            </span>
          </h3>
        </div>
      )}
    >
      {isNonStandard && (
        <div
          className="w-full bg-orange-500 text-white px-4 py-1 text-sm border-b border-orange-400 flex items-center gap-2"
        >
          <IconAlertTriangle className="text-orange-200" />
          This monster has non-standard behaviour. This section could be inaccurate.
        </div>
      )}
      <div className="flex flex-wrap">
        <div className="overflow-x-auto max-w-[100vw]">
          <NPCVersusPlayerResultsTable />
        </div>
        <div className="bg-dark-400 flex-grow text-white">
          <div className="m-4">
            <h2 className="font-serif font-bold">Additional information</h2>
            <div className="border-l-2 bg-dark-500 w-48 py-1 px-3 rounded-r border-blue-300 flex flex-col mt-2 text-sm">
              <div className="flex gap-1">
                <span className="text-gray-300">NPC style:</span>
                <div className="flex gap-1">
                  {renderMonsterStyleImage}
                  <span className="capitalize">{monster.style}</span>
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <span className="text-gray-300">NPC speed:</span>
                {monster.speed}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionAccordion>
  );
});

export default NPCVersusPlayerResultsContainer;