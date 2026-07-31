import { JsonPanel } from './JsonPanel.jsx';

export default {
  component: JsonPanel,
};

export const Default = {};

export const SearchOpen = {
  args: {
    defaultSearchOpen: true,
  },
};

export const FullView = {
  args: {
    variant: 'full',
  },
  parameters: {
    layout: 'fullscreen',
  },
};
