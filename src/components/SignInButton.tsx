import { useRef } from 'react';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import { replaceColor } from 'lottie-colorify';
import { useTheme } from 'next-themes';

import avatarAnimation from '../../public/lotties/avatar.json';

const avatarAnimationLight = replaceColor(
  [0, 0, 0],
  [255, 255, 255],
  avatarAnimation
);

export default function SignInButton() {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const { resolvedTheme } = useTheme();

  return (
    <button
      onMouseEnter={() => lottieRef.current?.play()}
      onMouseLeave={() => lottieRef.current?.stop()}
      className="flex items-center gap-2 bg-violet-400 hover:bg-violet-500 dark:bg-violet-600 dark:hover:bg-violet-500 px-4 py-2 rounded-full"
    >
      <Lottie
        animationData={
          resolvedTheme === 'dark' ? avatarAnimationLight : avatarAnimation
        }
        autoplay={false}
        loop={false}
        lottieRef={lottieRef}
        className="h-7"
      />
      <span>Sign In</span>
    </button>
  );
}
