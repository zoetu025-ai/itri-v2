import { SearchFilterDialog } from './SearchFilterDialog.jsx';

export default {
  component: SearchFilterDialog,
};

export const Default = {
  args: {
    open: true,
    value: {
      fileDate: '',
      fileTypes: ['pdf', 'presentation'],
      folder: '',
    },
  },
};
