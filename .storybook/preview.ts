import type { Preview } from '@storybook/react';
import 'tailwindcss/tailwind.css';

const preview: Preview = {
  parameters: {
    expanded: true,
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
