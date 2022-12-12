import * as Dialog from '@radix-ui/react-dialog';
import * as Tabs from '@radix-ui/react-tabs';
import Lottie, { type LottieRefCurrentProps } from 'lottie-react';
import { useRef, useState } from 'react';
import { signIn } from 'next-auth/react';

import avatarAnimation from '../../public/lotties/avatar.json';
import CrossLottie from './CrossLottie';
import { GithubSvg, GoogleSvg } from '../icons/AllSvgs';
import SignInForm from './SignInForm';

export default function SignInDialog() {
  const avatarLottieRef = useRef<LottieRefCurrentProps>(null);
  const [value, setValue] = useState('signup');

  const tabsTriggerStyles =
    'py-3 flex-grow border-b-2 border-neutral-500 hover:text-violetText dark:hover:text-violet-300 data-[state=active]:border-b-violet-800 data-[state=active]:text-violet-800 dark:data-[state=active]:border-b-violetTextLight dark:data-[state=active]:text-violetTextLight';

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button
          onMouseEnter={() => avatarLottieRef.current?.play()}
          onMouseLeave={() => avatarLottieRef.current?.stop()}
          className="rounded-full shadow-md btn-primary"
        >
          <Lottie
            animationData={avatarAnimation}
            autoplay={false}
            loop={false}
            lottieRef={avatarLottieRef}
            className="h-7"
          />
          <span>Sign In</span>
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="overlay" />
        <Dialog.Content className="modal-content">
          <Dialog.Close className="absolute top-4 right-4">
            <CrossLottie />
          </Dialog.Close>
          <Tabs.Root
            value={value}
            onValueChange={setValue}
            className="flex flex-col items-center gap-10 pb-12 pt-6 px-[76px]"
          >
            <Tabs.List className="w-full flex">
              <Tabs.Trigger value="signup" className={tabsTriggerStyles}>
                Sign Up
              </Tabs.Trigger>
              <Tabs.Trigger value="login" className={tabsTriggerStyles}>
                Log In
              </Tabs.Trigger>
            </Tabs.List>
            <div className="flex gap-8">
              <button
                className="btn-primary rounded-full p-2"
                onClick={() => signIn('google')}
              >
                <GoogleSvg className="fill-white h-6" />
              </button>
              <button
                className="btn-primary rounded-full p-2"
                onClick={() => signIn('github')}
              >
                <GithubSvg className="h-6" />
              </button>
            </div>
            <Tabs.Content value="signup" className="w-full">
              <SignInForm type="signup" />
            </Tabs.Content>
            <Tabs.Content value="login" className="w-full">
              <SignInForm type="login" />
            </Tabs.Content>
          </Tabs.Root>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
