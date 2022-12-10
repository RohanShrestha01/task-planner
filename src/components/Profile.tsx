import * as Avatar from '@radix-ui/react-avatar';
import { replaceColor } from 'lottie-colorify';
import Lottie, { type LottieRefCurrentProps } from 'lottie-react';
import { useSession, signOut } from 'next-auth/react';
import { useTheme } from 'next-themes';
import { useRef } from 'react';

import logoutAnimation from '../../public/lotties/logout.json';

const logoutAnimationLight = replaceColor(
  [0, 0, 0],
  [255, 255, 255],
  logoutAnimation
);

export default function Profile() {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const { data } = useSession();
  const { resolvedTheme } = useTheme();

  return (
    <div className="flex items-center gap-2.5">
      <Avatar.Root className="h-10 w-10 rounded-full shadow">
        <Avatar.Image
          src={data?.user?.image!}
          alt={data?.user?.name!}
          className="rounded-full w-full h-full object-cover"
        />
        <Avatar.Fallback className="w-full h-full flex items-center justify-center rounded-full transition-[background-color] duration-500 bg-darkVioletBg dark:bg-darkNeutralBg font-medium">
          {data?.user?.name
            ?.match(/\b(\w)/g)
            ?.join('')
            .toUpperCase()}
        </Avatar.Fallback>
      </Avatar.Root>
      <article className="flex flex-col self-stretch justify-evenly max-w-[160px] whitespace-nowrap">
        <span className="text-sm overflow-hidden text-ellipsis">
          {data?.user?.name}
        </span>
        <span className="text-[10px] overflow-hidden text-ellipsis">
          {data?.user?.email}
        </span>
      </article>
      <Lottie
        animationData={
          resolvedTheme === 'dark' ? logoutAnimationLight : logoutAnimation
        }
        autoplay={false}
        lottieRef={lottieRef}
        onMouseEnter={() => lottieRef.current?.play()}
        onMouseLeave={() => lottieRef.current?.stop()}
        onClick={() => signOut()}
        className="h-8 cursor-pointer"
      />
    </div>
  );
}
