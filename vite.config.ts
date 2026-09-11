import { nitro } from 'nitro/vite';
import vinext from 'vinext';
import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    dedupe: ['react', 'react-dom'],
  },

  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      '@base-ui/react/accordion',
      '@base-ui/react/slider',
      '@base-ui/react/dialog',
    ],
  },

  plugins: [
    vinext(),
    nitro(),
  ],
});
