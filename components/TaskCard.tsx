import { useRef, useState } from 'react';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';

import DotsLottie from './DotsLottie';
import checkBoxAnimation from '../public/lotties/checkBox.json';

export default function TaskCard() {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const [checked, setChecked] = useState(false);
  const [allowHover, setAllowHover] = useState(true);

  const checkBoxClickHandler = () => {
    if (checked) {
      lottieRef.current?.setDirection(-1);
      setChecked(false);
    } else {
      lottieRef.current?.setDirection(1);
      setChecked(true);
    }
    lottieRef.current?.play();
  };

  return (
    <article
      className={`bg-lightVioletBg dark:bg-lightNeutralBg transition-[background-color] duration-500 cursor-pointer rounded pl-4 pr-2 py-4 flex flex-col gap-3 ${
        allowHover && 'hover:bg-violetHover dark:hover:bg-neutralHover'
      }`}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-sm rounded-full bg-violet-300 text-violet-900 font-medium px-2 py-1">
          UI Design
        </h3>
        <DotsLottie size="small" setCardHover={setAllowHover} />
      </div>
      <div>
        <h2 className="font-medium text-[15px]">Complete frontend</h2>
        <p className="text-sm mt-1">
          Finish building tasks page and calendar page UI
        </p>
      </div>
      <div className="flex items-center justify-between pr-2">
        <span className="text-sm text-violet-600">Tomorrow 12:00 PM</span>
        <Lottie
          animationData={checkBoxAnimation}
          loop={false}
          autoplay={false}
          lottieRef={lottieRef}
          onClick={checkBoxClickHandler}
          onMouseEnter={() => setAllowHover(false)}
          onMouseLeave={() => setAllowHover(true)}
          className="h-7 transition-transform duration-200 hover:scale-110"
        />
      </div>
    </article>
  );
}
