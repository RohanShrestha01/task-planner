import { useState } from 'react';

import DotsLottie from '../DotsLottie';
import DropdownOptions from './DropdownOptions';

export default function ListHeading({ heading }: { heading: string }) {
  const [showInput, setShowInput] = useState(false);

  return (
    <div className="flex items-center h-10 pr-4">
      {showInput ? (
        <input
          type="text"
          defaultValue={heading}
          className="flex-grow py-0.5 text-lg font-semibold bg-transparent rounded outline-none caret-violetText dark:caret-violetTextLight outline-violetText dark:outline-violetTextLight"
          autoFocus
          spellCheck={false}
          onFocus={e => e.target.select()}
          onBlur={() => setShowInput(false)}
          maxLength={18}
        />
      ) : (
        <h2
          className="flex items-center flex-grow h-10 text-lg font-semibold rounded cursor-pointer"
          onClick={() => setShowInput(true)}
        >
          {heading}
        </h2>
      )}
      <DropdownOptions
        heading="List Actions"
        editHandler={() => console.log('List Edit!')}
        deleteHandler={() => console.log('List Deleted!')}
      >
        <DotsLottie />
      </DropdownOptions>
    </div>
  );
}
