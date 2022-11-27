import { useRef } from 'react';
import { LottieRefCurrentProps } from 'lottie-react';

import ThemedLottie from './ThemedLottie';
import avatarAnimation from '../../public/lotties/avatar.json';

export default function SignInButton() {
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  return (
    <button
      onMouseEnter={() => lottieRef.current?.play()}
      onMouseLeave={() => lottieRef.current?.stop()}
      className="flex items-center gap-2 bg-violet-400 hover:bg-violet-500 dark:bg-violet-600 dark:hover:bg-violet-500 px-4 py-2 rounded-full"
    >
      <ThemedLottie
        animationData={avatarAnimation}
        lottieRef={lottieRef}
        className="h-7"
      />
      <span>Sign In</span>
    </button>
  );
}
