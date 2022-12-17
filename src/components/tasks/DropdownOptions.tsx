import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import Lottie, { type LottieRefCurrentProps } from 'lottie-react';
import { useTheme } from 'next-themes';
import { type ReactNode, useRef } from 'react';

import {
  editAnimation,
  editAnimationLight,
  trashAnimation,
  trashAnimationLight,
} from '../../icons/AllLotties';

interface Props {
  heading: string;
  editHandler: () => void;
  deleteHandler: () => void;
  modal?: boolean;
  children: ReactNode;
}

export default function DropdownOptions({ modal = true, ...props }: Props) {
  const { resolvedTheme } = useTheme();
  const dropdownItems = [
    {
      animation: editAnimation,
      animationLight: editAnimationLight,
      animationDuration: 60,
      title: 'Edit',
      lottieRef: useRef<LottieRefCurrentProps>(null),
      clickHandler: props.editHandler,
    },
    {
      animation: trashAnimation,
      animationLight: trashAnimationLight,
      animationDuration: 5,
      title: 'Delete',
      lottieRef: useRef<LottieRefCurrentProps>(null),
      clickHandler: props.deleteHandler,
    },
  ];

  return (
    <DropdownMenu.Root modal={modal}>
      <DropdownMenu.Trigger className="rounded-full outline-none focus-visible:bg-violetHover dark:focus-visible:bg-neutralHover">
        {props.children}
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="p-2 border rounded shadow-md bg-lightVioletBg dark:bg-lightNeutralBg border-violetHover dark:border-neutralHover"
          onCloseAutoFocus={e => e.preventDefault()}
        >
          <DropdownMenu.Label className="px-5">
            {props.heading}
          </DropdownMenu.Label>
          <DropdownMenu.Separator className="h-px m-2 bg-violetText dark:bg-violetTextLight" />
          {dropdownItems.map(
            (
              {
                animation,
                animationLight,
                animationDuration,
                title,
                lottieRef,
                clickHandler,
              },
              i
            ) => (
              <DropdownMenu.Item
                className="flex items-center gap-2 py-1 px-5 rounded hover:bg-violetHover dark:hover:bg-neutralHover cursor-pointer text-[15px] dark:focus-visible:bg-neutralHover focus-visible:bg-violetHover outline-none"
                key={i}
                onMouseEnter={() =>
                  lottieRef.current?.playSegments([0, animationDuration], true)
                }
                onMouseLeave={() => {
                  lottieRef.current?.setDirection(-1);
                  lottieRef.current?.play();
                }}
                onClick={clickHandler}
              >
                <Lottie
                  autoplay={false}
                  loop={false}
                  animationData={
                    resolvedTheme === 'dark' ? animationLight : animation
                  }
                  lottieRef={lottieRef}
                  className="h-6"
                />
                <span>{title}</span>
              </DropdownMenu.Item>
            )
          )}
          <DropdownMenu.Arrow className="fill-violetHover dark:fill-neutralHover" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
