import * as Tabs from '@radix-ui/react-tabs';

import AddButton from '../AddButton';
import CalendarHeader from './CalendarHeader';
import { Props } from './CalendarHeader';

export default function MainCalendar(props: Props) {
  const tabs = [
    { trigger: 'Day', value: 'tab1', content: 'Day View' },
    { trigger: 'Week', value: 'tab2', content: 'Week View' },
    { trigger: 'Month', value: 'tab3', content: 'Month View' },
  ];

  return (
    <Tabs.Root defaultValue="tab1" className="flex flex-col">
      <section className="flex items-center justify-between">
        <CalendarHeader {...props} />
        <Tabs.List className="flex rounded bg-transition">
          {tabs.map(({ trigger, value }, i) => (
            <Tabs.Trigger
              value={value}
              key={i}
              className="data-[state=active]:bg-primary data-[state=active]:hover:bg-primaryHover dark:data-[state=active]:bg-primaryDark dark:data-[state=active]:hover:bg-primaryHover data-[state=active]:text-whiteText hover:bg-violetHover dark:hover:bg-neutralHover px-8 py-2 rounded"
            >
              {trigger}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        <AddButton
          className="flex-row-reverse rounded btn-primary"
          lottieColor="white"
          text="Add"
        />
      </section>
      {tabs.map(({ value, content }, i) => (
        <section key={i}>
          <Tabs.Content value={value}>{content}</Tabs.Content>
        </section>
      ))}
    </Tabs.Root>
  );
}
