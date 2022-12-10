import Lottie, { type LottieRefCurrentProps } from 'lottie-react';
import { useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import { replaceColor } from 'lottie-colorify';

import emailAnimation from '../../public/lotties/email.json';
import lockAnimation from '../../public/lotties/lock.json';
import radioBtnAnimation from '../../public/lotties/radioButton.json';
import avatarAnimationLight from '../../public/lotties/avatar.json';
import eyeAnimation from '../../public/lotties/eye.json';

const avatarAnimation = replaceColor(
  [255, 255, 255],
  [0, 0, 0],
  avatarAnimationLight
);
const emailAnimationLight = replaceColor(
  [0, 0, 0],
  [255, 255, 255],
  emailAnimation
);
const lockAnimationLight = replaceColor(
  [0, 0, 0],
  [255, 255, 255],
  lockAnimation
);
const radioBtnAnimationLight = replaceColor(
  [0, 0, 0],
  [255, 255, 255],
  radioBtnAnimation
);
const eyeAnimationLight = replaceColor(
  [0, 0, 0],
  [255, 255, 255],
  eyeAnimation
);

export default function SignInForm({ type }: { type: 'login' | 'signup' }) {
  const radioBtnLottieRef = useRef<LottieRefCurrentProps>(null);
  const passwordEyeLottieRef = useRef<LottieRefCurrentProps>(null);
  const confirmPasswordEyeLottieRef = useRef<LottieRefCurrentProps>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const confirmPasswordInputRef = useRef<HTMLInputElement>(null);

  const [radioChecked, setRadioChecked] = useState(false);
  const [eyeClosed, setEyeClosed] = useState(true);
  const [confirmEyeClosed, setConfirmEyeClosed] = useState(true);
  const { resolvedTheme } = useTheme();

  const loginInputs = [
    {
      type: 'text',
      title: 'Email',
      inputRef: emailInputRef,
      lottieRef: useRef<LottieRefCurrentProps>(null),
      animationData: emailAnimation,
      animationDataLight: emailAnimationLight,
    },
    {
      type: 'password',
      title: 'Password',
      inputRef: passwordInputRef,
      lottieRef: useRef<LottieRefCurrentProps>(null),
      animationData: lockAnimation,
      animationDataLight: lockAnimationLight,
    },
  ];

  const signupInputs = [
    {
      type: 'text',
      title: 'Full Name',
      inputRef: nameInputRef,
      lottieRef: useRef<LottieRefCurrentProps>(null),
      animationData: avatarAnimation,
      animationDataLight: avatarAnimationLight,
    },
    ...loginInputs,
    {
      type: 'password',
      title: 'Confirm Password',
      inputRef: confirmPasswordInputRef,
      lottieRef: useRef<LottieRefCurrentProps>(null),
      animationData: lockAnimation,
      animationDataLight: lockAnimationLight,
    },
  ];

  const inputs = type === 'login' ? loginInputs : signupInputs;

  const radioBtnClickHandler = () => {
    if (radioChecked) {
      radioBtnLottieRef.current?.setDirection(-1);
      setRadioChecked(false);
      if (passwordInputRef.current) passwordInputRef.current.type = 'password';
    } else {
      radioBtnLottieRef.current?.setDirection(1);
      setRadioChecked(true);
      if (passwordInputRef.current) passwordInputRef.current.type = 'text';
    }
    radioBtnLottieRef.current?.play();
  };

  const eyeClickHandler = (title: string) => {
    if (title === 'Password') {
      if (eyeClosed) {
        passwordEyeLottieRef.current?.setDirection(-1);
        setEyeClosed(false);
        if (passwordInputRef.current) passwordInputRef.current.type = 'text';
      } else {
        passwordEyeLottieRef.current?.setDirection(1);
        setEyeClosed(true);
        if (passwordInputRef.current)
          passwordInputRef.current.type = 'password';
      }
      passwordEyeLottieRef.current?.play();
    } else {
      if (confirmEyeClosed) {
        confirmPasswordEyeLottieRef.current?.setDirection(-1);
        setConfirmEyeClosed(false);
        if (confirmPasswordInputRef.current)
          confirmPasswordInputRef.current.type = 'text';
      } else {
        confirmPasswordEyeLottieRef.current?.setDirection(1);
        setConfirmEyeClosed(true);
        if (confirmPasswordInputRef.current)
          confirmPasswordInputRef.current.type = 'password';
      }
      confirmPasswordEyeLottieRef.current?.play();
    }
  };

  return (
    <section className="flex flex-col items-center gap-8 w-full">
      {inputs.map((input, i) => (
        <div key={i} className="flex gap-4 items-center w-full">
          <Lottie
            animationData={
              resolvedTheme === 'dark'
                ? input.animationDataLight
                : input.animationData
            }
            lottieRef={input.lottieRef}
            autoplay={false}
            loop={false}
            className="h-6"
          />
          <div className="relative flex-grow flex items-center gap-4">
            <input
              type={input.type}
              required
              spellCheck={false}
              onClick={() => input.lottieRef.current?.play()}
              onBlur={() => input.lottieRef.current?.stop()}
              ref={input.inputRef}
              className="w-full bg-transparent outline-none py-1 border-b-2 border-blackText dark:border-whiteText transition-all duration-500 focus:border-violetText dark:focus:border-violetTextLight caret-violetText dark:caret-violetTextLight peer text-[15px]"
            />
            <span className="absolute left-0 py-1 text-neutral-500 pointer-events-none transition-all duration-500 peer-focus:-translate-y-5 peer-focus:text-violetText dark:peer-focus:text-violetTextLight peer-focus:scale-75 peer-valid:-translate-y-5 peer-valid:scale-75 origin-left">
              {input.title}
            </span>
            {type === 'signup' && input.type === 'password' && (
              <Lottie
                animationData={
                  resolvedTheme === 'dark' ? eyeAnimationLight : eyeAnimation
                }
                autoplay={false}
                loop={false}
                lottieRef={
                  input.title === 'Password'
                    ? passwordEyeLottieRef
                    : confirmPasswordEyeLottieRef
                }
                onDOMLoaded={() => {
                  passwordEyeLottieRef.current?.goToAndStop(17, true);
                  confirmPasswordEyeLottieRef.current?.goToAndStop(17, true);
                }}
                onClick={eyeClickHandler.bind(null, input.title)}
                className="h-6 cursor-pointer"
              />
            )}
          </div>
        </div>
      ))}
      {type === 'login' && (
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={radioBtnClickHandler}
        >
          <Lottie
            animationData={
              resolvedTheme === 'dark'
                ? radioBtnAnimationLight
                : radioBtnAnimation
            }
            autoplay={false}
            loop={false}
            lottieRef={radioBtnLottieRef}
            className="h-6"
          />
          <span className="text-sm">Show Password</span>
        </div>
      )}
    </section>
  );
}
