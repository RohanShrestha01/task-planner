import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import Lottie, { type LottieRefCurrentProps } from 'lottie-react';

import type { TaskType } from '../types';
import { assertIsNode } from '../utils';
import { loadingAnimation, emptyAnimation } from '../icons/AllLotties';

export default function SearchResults({ search }: { search: string }) {
  const [open, setOpen] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const sectionRef = useRef<HTMLElement>(null);
  const loadingLottieRef = useRef<LottieRefCurrentProps>(null);

  useEffect(() => {
    const closeSearchResults = ({ target }: MouseEvent) => {
      assertIsNode(target);
      if (sectionRef.current?.contains(target)) return;
      setOpen(false);
    };

    document.body.addEventListener('mousedown', closeSearchResults);
    return () =>
      document.body.removeEventListener('mousedown', closeSearchResults);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(true);
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  const { data, isLoading } = useQuery<TaskType[]>({
    queryKey: ['search', debouncedSearch],
    queryFn: () => fetch('/api/search?query=' + search).then(res => res.json()),
    enabled: open,
    cacheTime: 1000 * 60,
  });

  if (!open) return null;

  return (
    <section
      className="absolute top-14 w-[274px] rounded dark:bg-lightNeutralBg bg-lightVioletBg border border-violetText dark:border-violetTextLight shadow-md z-50 overflow-hidden"
      ref={sectionRef}
    >
      {isLoading ? (
        <div className="flex items-center">
          <Lottie
            animationData={loadingAnimation}
            className="h-20"
            lottieRef={loadingLottieRef}
            onDOMLoaded={() => {
              loadingLottieRef.current?.setSpeed(1.5);
            }}
          />
          <h2 className="text-lg font-medium text-violet-700 dark:text-violet-500">
            Searching...
          </h2>
        </div>
      ) : data?.length === 0 ? (
        <div className="flex flex-col items-center gap-2 pb-5">
          <Lottie animationData={emptyAnimation} />
          <div className="text-center">
            <h2 className="text-lg font-medium">No results found 😔</h2>
            <p className="mt-0.5 text-sm">
              Sorry, we couldn&apos;t find any tasks
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-2 p-2">
          {data?.map(task => (
            <article
              key={task.id}
              style={{ backgroundColor: task.tagColor }}
              className="px-2 py-1 text-black rounded shadow-md"
            >
              <h3 className="font-medium">{task.title}</h3>
              <p className="mt-0.5 text-sm">{task.description}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
