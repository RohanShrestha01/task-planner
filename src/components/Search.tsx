import { useRef, useState } from 'react';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import searchAnimation from '../../public/lotties/search.json';
import crossIntroAnimation from '../../public/lotties/crossIntro.json';

export default function Search() {
  const [crossShow, setCrossShow] = useState(false);

  const searchLottieRef = useRef<LottieRefCurrentProps>(null);
  const crossLottieRef = useRef<LottieRefCurrentProps>(null);

  return (
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
        onChange={e =>
          e.target.value ? setCrossShow(true) : setCrossShow(false)
        }
        className="px-12 py-2 rounded-full input"
      />
      <button
        type="reset"
        className="absolute right-3"
        onClick={() => setCrossShow(false)}
      >
        {crossShow && (
          <Lottie
            animationData={crossIntroAnimation}
            loop={false}
            lottieRef={crossLottieRef}
            className="h-7"
          />
        )}
      </button>
    </form>
  );
}
