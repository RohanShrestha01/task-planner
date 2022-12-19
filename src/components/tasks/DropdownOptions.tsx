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
import DeleteAlertDialog from './DeleteAlertDialog';

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
  type Item = typeof dropdownItems[number];

  const DropdownMenuItem = ({ item }: { item: Item }) => (
    <DropdownMenu.Item
      className="flex items-center gap-2 py-1 px-5 rounded hover:bg-violetHover dark:hover:bg-neutralHover cursor-pointer text-[15px] dark:focus-visible:bg-neutralHover focus-visible:bg-violetHover outline-none"
      onMouseEnter={() =>
        item.lottieRef.current?.playSegments([0, item.animationDuration], true)
      }
      onMouseLeave={() => {
        item.lottieRef.current?.setDirection(-1);
        item.lottieRef.current?.play();
      }}
      onClick={item.title === 'Delete' ? () => {} : item.clickHandler}
      onSelect={item.title === 'Delete' ? e => e.preventDefault() : () => {}}
    >
      <Lottie
        autoplay={false}
        loop={false}
        animationData={
          resolvedTheme === 'dark' ? item.animationLight : item.animation
        }
        lottieRef={item.lottieRef}
        className="h-6"
      />
      <span>{item.title}</span>
    </DropdownMenu.Item>
  );

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
          {dropdownItems.map((item, i) =>
            item.title === 'Delete' ? (
              <DeleteAlertDialog clickHandler={item.clickHandler} key={i}>
                <DropdownMenuItem item={item} />
              </DeleteAlertDialog>
            ) : (
              <DropdownMenuItem item={item} key={i} />
            )
          )}
          <DropdownMenu.Arrow className="fill-violetHover dark:fill-neutralHover" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
