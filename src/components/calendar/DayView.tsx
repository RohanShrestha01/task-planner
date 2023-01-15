import { hours } from './WeekView';

export default function DayView() {
  return (
    <table className="w-full text-center">
      <tbody>
        <tr className="h-5"></tr>
        {hours.map((time, i) => (
          <tr key={i} className="h-12">
            <td className="w-16 px-2 text-sm -translate-y-1/2 border-r border-neutral-500 sm:text-[13px] sm:w-14 xs:text-xs xs:px-1 xs:w-11">
              {time}
            </td>
            <td
              className={`border-t border-neutral-500 ${
                i === hours.length - 1 ? 'border-b' : ''
              }`}
            ></td>
            <td className="w-8 border-l border-neutral-500 sm:w-4 xs:w-2"></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
