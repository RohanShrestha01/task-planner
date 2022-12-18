import Lottie, { type LottieRefCurrentProps } from 'lottie-react';
import { useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import { z } from 'zod';
import { signIn } from 'next-auth/react';

import {
  avatarAnimation,
  avatarAnimationLight,
  emailAnimation,
  emailAnimationLight,
  eyeAnimation,
  eyeAnimationLight,
  lockAnimation,
  lockAnimationLight,
  radioBtnAnimation,
  radioBtnAnimationLight,
} from '../icons/AllLotties';
import { loginSchema, registerSchema, FlattenedErrors } from '../utils';

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
  const [errors, setErrors] = useState<FlattenedErrors>();
  const { resolvedTheme } = useTheme();

  const loginInputs = [
    {
      type: 'text',
      name: 'email',
      title: 'Email',
      inputRef: emailInputRef,
      lottieRef: useRef<LottieRefCurrentProps>(null),
      animationData: emailAnimation,
      animationDataLight: emailAnimationLight,
    },
    {
      type: 'password',
      name: 'password',
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
      name: 'username',
      title: 'Full Name',
      inputRef: nameInputRef,
      lottieRef: useRef<LottieRefCurrentProps>(null),
      animationData: avatarAnimation,
      animationDataLight: avatarAnimationLight,
    },
    ...loginInputs,
    {
      type: 'password',
      name: 'confirmPassword',
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

  const formSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const loginData = {
      email: emailInputRef?.current?.value,
      password: passwordInputRef?.current?.value,
    };
    const formData =
      type === 'login'
        ? loginData
        : {
            username: nameInputRef?.current?.value,
            ...loginData,
            confirmPassword: confirmPasswordInputRef?.current?.value,
          };

    const schema = type === 'login' ? loginSchema : registerSchema;
    try {
      const result = schema.parse(formData);
      if (type === 'login') {
        const response = await signIn('credentials', {
          redirect: false,
          ...result,
        });
        console.log(response);
      } else {
        const response = await fetch('/api/auth/signup', {
          method: 'POST',
          body: JSON.stringify(result),
          headers: { 'Content-Type': 'application/json' },
        });
        const data = await response.json();
        if (!response.ok) console.log(data.message || 'Something Went Wrong!');
      }
    } catch (err) {
      if (err instanceof z.ZodError) setErrors(err.flatten());
    }
  };

  return (
    <form
      className="flex flex-col items-center w-full gap-8"
      onSubmit={formSubmitHandler}
    >
      {inputs.map((input, i) => (
        <div key={i} className="flex flex-col w-full gap-2">
          <div className="flex items-center w-full gap-4">
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
            <div className="relative flex items-center flex-grow gap-4">
              <input
                type={input.type}
                name={input.name}
                required
                spellCheck="false"
                onClick={() => input.lottieRef.current?.play()}
                onBlur={() => input.lottieRef.current?.stop()}
                ref={input.inputRef}
                className="w-full bg-transparent outline-none py-1 border-b-2 border-blackText dark:border-whiteText transition-all duration-500 focus:border-violetText dark:focus:border-violetTextLight caret-violetText dark:caret-violetTextLight peer text-[15px]"
              />
              <span className="absolute left-0 py-1 transition-all duration-500 origin-left pointer-events-none text-neutral-500 peer-focus:-translate-y-5 peer-focus:text-violetText dark:peer-focus:text-violetTextLight peer-focus:scale-75 peer-valid:-translate-y-5 peer-valid:scale-75">
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
          {errors?.fieldErrors[
            input.name as keyof typeof errors.fieldErrors
          ] && (
            <span className="ml-10 text-xs text-red-500">
              {
                errors.fieldErrors[
                  input.name as keyof typeof errors.fieldErrors
                ]
              }
            </span>
          )}
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
      <button className="justify-center w-56 py-3 mt-2 text-sm rounded-md btn-primary">
        {type === 'signup' ? 'SIGN UP' : 'LOG IN'}
      </button>
    </form>
  );
}
