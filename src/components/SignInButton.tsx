import { useRef } from 'react';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';

import avatarAnimation from '../../public/lotties/avatar.json';

export default function SignInButton() {
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  return (
    <button
      onMouseEnter={() => lottieRef.current?.play()}
      onMouseLeave={() => lottieRef.current?.stop()}
      className="rounded-full btn-primary"
    >
      <Lottie
        animationData={avatarAnimation}
        autoplay={false}
        loop={false}
        lottieRef={lottieRef}
        className="h-7"
      />
      <span>Sign In</span>
    </button>
  );
}
