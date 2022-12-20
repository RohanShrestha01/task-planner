import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import type { Task } from '../types';
import { assertIsNode } from '../utils';

export default function SearchResults({ search }: { search: string }) {
  const [open, setOpen] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const sectionRef = useRef<HTMLElement>(null);

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

  const { data, isLoading } = useQuery({
    queryKey: ['search', debouncedSearch],
    queryFn: () => fetch('/api/search?query=' + search).then(res => res.json()),
    enabled: open,
    cacheTime: 1000 * 60,
  });

  if (!open) return null;

  return (
    <section
      className="absolute top-14 w-[274px] rounded dark:bg-lightNeutralBg bg-lightVioletBg shadow-md z-50"
      ref={sectionRef}
    >
      {isLoading ? (
        <div>Loading...</div>
      ) : data.length === 0 ? (
        <h2>No results for &quot;{search}&quot;</h2>
      ) : (
        <>
          {data.map((task: Task) => (
            <article key={task.id}>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
            </article>
          ))}
        </>
      )}
    </section>
  );
}
