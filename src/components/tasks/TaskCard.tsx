import { useRef, useState } from 'react';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';

import DotsLottie from '../DotsLottie';
import checkBoxAnimation from '../../../public/lotties/checkBox.json';
import DropdownOptions from './DropdownOptions';

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
      className={`bg-transition cursor-pointer rounded pl-4 pr-2 py-4 flex flex-col gap-3 shadow-md ${
        allowHover && 'hover:bg-violetHover dark:hover:bg-neutralHover'
      }`}
    >
      <div className="flex items-center justify-between">
        <h3 className="px-2 py-1 text-sm font-medium bg-blue-300 rounded-full shadow-md text-blackText">
          UI Design
        </h3>
        <DropdownOptions
          heading="Card Actions"
          editHandler={() => console.log('Card Edit!')}
          deleteHandler={() => console.log('Card Deleted!')}
        >
          <DotsLottie size="small" setCardHover={setAllowHover} />
        </DropdownOptions>
      </div>
      <div>
        <h2 className="font-medium text-[15px]">Complete frontend</h2>
        <p className="mt-1 text-sm">
          Finish building tasks page and calendar page UI
        </p>
      </div>
      <div className="flex items-center justify-between pr-2">
        <span className="text-sm text-violet-700 dark:text-violetTextLight">
          Tomorrow 12:00 PM
        </span>
        <Lottie
          animationData={checkBoxAnimation}
          loop={false}
          autoplay={false}
          lottieRef={lottieRef}
          onClick={checkBoxClickHandler}
          onMouseEnter={() => setAllowHover(false)}
          onMouseLeave={() => setAllowHover(true)}
          className="transition-transform duration-200 h-7 hover:scale-110"
        />
      </div>
    </article>
  );
}
