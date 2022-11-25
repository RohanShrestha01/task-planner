import DotsLottie from './DotsLottie';

export default function TaskCard() {
  return (
    <article className="bg-lightVioletBg dark:bg-lightNeutralBg transition-[background-color] duration-500 cursor-pointer rounded pl-4 pr-2 py-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm rounded-full bg-violet-300 text-violet-900 font-medium px-2 py-1">
          UI Design
        </h3>
        <DotsLottie size="small" />
      </div>
      <div>
        <h2 className="font-medium text-[15px]">Complete frontend</h2>
        <p className="text-sm mt-1">
          Finish building tasks page and calendar page UI
        </p>
      </div>
      <span className="text-sm text-violet-600">Tomorrow 12:00 PM</span>
    </article>
  );
}
