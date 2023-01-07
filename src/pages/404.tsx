import Lottie from 'lottie-react';
import { custom404Animation } from '../icons/AllLotties';

export default function Custom404() {
  return (
    <div className="flex flex-col items-center mt-16 text-lg font-medium">
      <Lottie animationData={custom404Animation} className="h-96" />
      <span>This page could not be found.</span>
    </div>
  );
}
