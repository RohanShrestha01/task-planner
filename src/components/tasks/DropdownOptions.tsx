import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import Lottie, { type LottieRefCurrentProps } from 'lottie-react';
import { useTheme } from 'next-themes';
import { type ReactNode, useRef, useState } from 'react';

import {
  editAnimation,
  editAnimationLight,
  filterAnimation,
  filterAnimationLight,
  trashAnimation,
  trashAnimationLight,
} from '../../icons/AllLotties';
import { DotSvg } from '../../icons/AllSvgs';
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
  const [sortBy, setSortBy] = useState('None');
  const [sortOrder, setSortOrder] = useState('Ascending');
  const filterLottieRef = useRef<LottieRefCurrentProps>(null);
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
  const contentStyles =
    'p-2 border rounded shadow-md bg-lightVioletBg dark:bg-lightNeutralBg border-violetHover dark:border-neutralHover';
  const itemStyles =
    'flex items-center gap-2 py-1 px-2 rounded hover:bg-violetHover dark:hover:bg-neutralHover cursor-pointer text-[15px] dark:focus-visible:bg-neutralHover focus-visible:bg-violetHover outline-none';

  const DropdownMenuItem = ({ item }: { item: Item }) => (
    <DropdownMenu.Item
      className={itemStyles}
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
          className={contentStyles}
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
          {props.heading === 'List Actions' && (
            <>
              <DropdownMenu.Sub>
                <DropdownMenu.SubTrigger
                  onMouseEnter={() => filterLottieRef.current?.play()}
                  onMouseLeave={() => filterLottieRef.current?.stop()}
                  className={
                    itemStyles +
                    ' data-[state=open]:bg-violetHover dark:data-[state=open]:bg-neutralHover'
                  }
                >
                  <Lottie
                    animationData={
                      resolvedTheme === 'dark'
                        ? filterAnimationLight
                        : filterAnimation
                    }
                    autoplay={false}
                    lottieRef={filterLottieRef}
                    className="h-6"
                  />
                  <span>Sort By</span>
                </DropdownMenu.SubTrigger>
                <DropdownMenu.Portal>
                  <DropdownMenu.SubContent
                    className={contentStyles}
                    sideOffset={4}
                    alignOffset={-7}
                  >
                    <DropdownMenu.RadioGroup
                      value={sortBy}
                      onValueChange={setSortBy}
                      className="relative"
                    >
                      {[
                        'Title',
                        'Description',
                        'Deadline',
                        'Tag',
                        'Completion',
                        'None',
                      ].map((title, i) => (
                        <DropdownMenu.RadioItem
                          key={i}
                          value={title}
                          className={itemStyles + ' pl-8'}
                        >
                          <DropdownMenu.ItemIndicator className="absolute left-2">
                            <DotSvg className="h-4" />
                          </DropdownMenu.ItemIndicator>
                          <DropdownMenu.Item>{title}</DropdownMenu.Item>
                        </DropdownMenu.RadioItem>
                      ))}
                    </DropdownMenu.RadioGroup>
                  </DropdownMenu.SubContent>
                </DropdownMenu.Portal>
              </DropdownMenu.Sub>

              <DropdownMenu.Label className="px-2 mt-1 dark:text-stone-400 text-stone-600">
                Sort Order
              </DropdownMenu.Label>
              <DropdownMenu.RadioGroup
                value={sortOrder}
                onValueChange={setSortOrder}
                className="relative"
              >
                {['Ascending', 'Descending'].map((title, i) => (
                  <DropdownMenu.RadioItem
                    value={title}
                    key={i}
                    className={itemStyles + ' pl-10'}
                  >
                    <DropdownMenu.ItemIndicator className="absolute left-3">
                      <DotSvg className="h-4" />
                    </DropdownMenu.ItemIndicator>
                    <DropdownMenu.Item>{title}</DropdownMenu.Item>
                  </DropdownMenu.RadioItem>
                ))}
              </DropdownMenu.RadioGroup>
            </>
          )}
          <DropdownMenu.Arrow className="fill-violetHover dark:fill-neutralHover" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
