import { useRef, useState } from 'react';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import searchAnimation from '../../public/lotties/search.json';
import crossAnimation from '../../public/lotties/cross.json';

export default function Search() {
  const [crossShow, setCrossShow] = useState(false);

  const searchLottieRef = useRef<LottieRefCurrentProps>(null);
  const crossLottieRef = useRef<LottieRefCurrentProps>(null);

  return (
    <form
      onMouseEnter={() => searchLottieRef.current?.play()}
      className="flex items-center relative"
    >
      <Lottie
        animationData={searchAnimation}
        loop={false}
        autoplay={false}
        lottieRef={searchLottieRef}
        onComplete={() => searchLottieRef.current?.stop()}
        className="h-7 absolute left-3"
      />
      <input
        type="text"
        placeholder="Search task"
        spellCheck="false"
        onChange={e =>
          e.target.value ? setCrossShow(true) : setCrossShow(false)
        }
        className="rounded-full px-12 py-2 bg-inherit border border-neutral-500 text-sm placeholder:text-neutral-500 focus:outline-none focus:border-blackText dark:focus:border-whiteText"
      />
      <button
        type="reset"
        className="absolute right-3"
        onClick={() => setCrossShow(false)}
      >
        {crossShow && (
          <Lottie
            animationData={crossAnimation}
            loop={false}
            lottieRef={crossLottieRef}
            className="h-7"
          />
        )}
      </button>
    </form>
  );
}
