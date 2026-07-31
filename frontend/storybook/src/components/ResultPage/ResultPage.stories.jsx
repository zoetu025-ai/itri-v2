import { ResultPage } from './ResultPage.jsx';

export default {
  component: ResultPage,
  parameters: {
    layout: 'fullscreen',
  },
};

export const ConversationFeed = {
  name: 'Scrollable Feed',
  args: {},
};

export const WithFileDetail = {
  args: {
    activeHistoryId: '1',
    showFileDetail: true,
  },
};
