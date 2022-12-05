import { useRef } from 'react';
import { useButton } from '@react-aria/button';

export default function Button(props: any) {
  const ref = useRef<HTMLButtonElement>(null);
  const { buttonProps } = useButton(props, ref);

  return (
    <button
      {...buttonProps}
      ref={ref}
      className="rounded-full outline-none focus-visible:bg-violetHover dark:focus-visible:bg-violetHoverDark"
    >
      {props.children}
    </button>
  );
}
