import styles from './ChatHistory.module.css';
import { ChatHistory } from './ChatHistory.jsx';

const SAMPLE_ITEMS = [
  {
    id: '1',
    title:
      'My lease ended and I cleaned the place spotlessly, but my landlord is dodging my texts and refusing to give my 2-month deposit back. What can I actually do about this?',
  },
  {
    id: '2',
    title:
      "Can I just sue him at this point? I heard about sending a demand letter or going to court mediation, but honestly I have no idea which one I'm supposed to do first.",
  },
  {
    id: '3',
    title:
      'If I go with mediation, do I just show up at any local court? What papers do I need to bring, and is it going to cost me a lot?',
  },
  {
    id: '4',
    title:
      'Oh, and I just realized—I checked my indoor camera and saw he actually let himself into my room to show new buyers around a few days before my lease even ended! Can I get him in trouble for that too?',
  },
  {
    id: '5',
    title:
      'What if we set up a mediation date and he just ghosted the court? Can the judge just force him to pay me back right then and there?',
  },
];

export default {
  component: ChatHistory,
};

export const Default = {
  args: {
    items: SAMPLE_ITEMS,
    activeId: '3',
  },
};

export const InactiveOnly = {
  args: {
    items: [SAMPLE_ITEMS[0]],
  },
};
