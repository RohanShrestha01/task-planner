import { useRef } from 'react';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import avatarAnimation from '../public/lotties/avatar.json';

export default function SignInButton() {
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  return (
    <button
      onMouseEnter={() => lottieRef.current?.play()}
      onMouseLeave={() => lottieRef.current?.stop()}
      className="flex items-center gap-2 hover:bg-violetHover dark:hover:bg-neutralHover px-4 py-2 rounded-full border border-neutral-500 hover:border-violetHover dark:hover:border-neutralHover"
    >
      <Lottie
        animationData={avatarAnimation}
        autoplay={false}
        loop={false}
        lottieRef={lottieRef}
        className="lottie h-7"
      />
      <span>Sign In</span>
    </button>
  );
}
