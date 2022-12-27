import { useRef, useState } from 'react';
import Lottie, { type LottieRefCurrentProps } from 'lottie-react';
import searchAnimation from '../../public/lotties/search.json';
import crossIntroAnimation from '../../public/lotties/crossIntro.json';
import SearchResults from './SearchResults';

export default function Search() {
  const [searchValue, setSearchValue] = useState('');

  const searchLottieRef = useRef<LottieRefCurrentProps>(null);
  const crossLottieRef = useRef<LottieRefCurrentProps>(null);

  return (
    <div className="relative">
      <form
        onMouseEnter={() => searchLottieRef.current?.play()}
        className="relative flex items-center"
      >
        <Lottie
          animationData={searchAnimation}
          loop={false}
          autoplay={false}
          lottieRef={searchLottieRef}
          onComplete={() => searchLottieRef.current?.stop()}
          className="absolute h-7 left-3"
        />
        <input
          type="text"
          placeholder="Search task"
          spellCheck="false"
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
          className="px-12 py-2 rounded-full input"
        />
        <button
          type="reset"
          className="absolute right-3"
          onClick={() => setSearchValue('')}
        >
          {searchValue ? (
            <Lottie
              animationData={crossIntroAnimation}
              loop={false}
              lottieRef={crossLottieRef}
              className="h-7"
            />
          ) : null}
        </button>
      </form>
      {searchValue ? <SearchResults search={searchValue} /> : null}
    </div>
  );
}
