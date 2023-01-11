import * as Avatar from '@radix-ui/react-avatar';
import Lottie, { type LottieRefCurrentProps } from 'lottie-react';
import { useSession, signOut } from 'next-auth/react';
import { useTheme } from 'next-themes';
import { useRef, useState, useEffect } from 'react';

import { logoutAnimation, logoutAnimationLight } from '../icons/AllLotties';

export default function Profile() {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const [mounted, setMounted] = useState(false);

  const { data } = useSession();
  const { resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  return (
    <div className="flex items-center gap-2.5">
      <Avatar.Root className="w-10 h-10 rounded-full shadow">
        <Avatar.Image
          src={data?.user?.image!}
          alt={data?.user?.name!}
          className="object-cover w-full h-full rounded-full"
        />
        <Avatar.Fallback
          className="w-full h-full flex items-center justify-center rounded-full transition-[background-color] duration-500 bg-darkVioletBg dark:bg-darkNeutralBg font-medium"
          delayMs={100}
        >
          {data?.user?.name
            ?.match(/\b(\w)/g)
            ?.join('')
            .toUpperCase()}
        </Avatar.Fallback>
      </Avatar.Root>
      <article className="flex flex-col self-stretch justify-evenly max-w-[160px] whitespace-nowrap">
        <span className="overflow-hidden text-sm text-ellipsis">
          {data?.user?.name}
        </span>
        <span className="text-[10px] overflow-hidden text-ellipsis">
          {data?.user?.email}
        </span>
      </article>
      {mounted ? (
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
      ) : null}
    </div>
  );
}
