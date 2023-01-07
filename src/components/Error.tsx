import Lottie from 'lottie-react';
import { emptyAnimation } from '../icons/AllLotties';

export default function Error() {
  return (
    <div className="flex flex-col items-center mt-12 text-lg font-medium">
      <h1 className="mb-1.5">Error fetching data from the database.</h1>
      <span>Please try again later.</span>
      <Lottie animationData={emptyAnimation} className="h-96" />
    </div>
  );
}
