import { useRef } from 'react';
import { useButton } from '@react-aria/button';

export default function Button(props: any) {
  const ref = useRef<HTMLButtonElement>(null);
  const { buttonProps } = useButton(props, ref);

  return (
    <button {...buttonProps} ref={ref}>
      {props.children}
    </button>
  );
}
