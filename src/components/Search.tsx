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
    <div className="relative sm:flex-grow">
      <form
        onMouseEnter={() => searchLottieRef.current?.play()}
        className="relative flex items-center sm:basis-full"
      >
        <Lottie
          animationData={searchAnimation}
          loop={false}
          autoplay={false}
          lottieRef={searchLottieRef}
          onComplete={() => searchLottieRef.current?.stop()}
          className="absolute h-7 left-3 lgxl:h-6 lgxl:left-2.5 xs:h-6 xs:left-1.5"
        />
        <input
          type="text"
          placeholder="Search task"
          spellCheck="false"
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
          className="px-12 py-2 rounded-full input lgxl:w-40 lgxl:pl-10 lgxl:pr-8 sm:flex-grow sm:w-40 xs:w-36 xs:pl-8 xs:pr-7"
        />
        <button
          type="reset"
          className="absolute right-3 lgxl:right-1 xs:right-1"
          onClick={() => setSearchValue('')}
        >
          {searchValue ? (
            <Lottie
              animationData={crossIntroAnimation}
              loop={false}
              lottieRef={crossLottieRef}
              className="h-7 lgxl:h-6 xs:h-6"
            />
          ) : null}
        </button>
      </form>
      {searchValue ? <SearchResults search={searchValue} /> : null}
    </div>
  );
}
