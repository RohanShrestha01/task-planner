import { useRef } from 'react';
import { LottieRefCurrentProps } from 'lottie-react';

import ThemedLottie from './ThemedLottie';
import avatarAnimation from '../public/lotties/avatar.json';

export default function SignInButton() {
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  return (
    <button
      onMouseEnter={() => lottieRef.current?.play()}
      onMouseLeave={() => lottieRef.current?.stop()}
      className="flex items-center gap-2 hover:bg-violetHover dark:hover:bg-neutralHover px-4 py-2 rounded-full border border-neutral-500 hover:border-violetHover dark:hover:border-neutralHover"
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
