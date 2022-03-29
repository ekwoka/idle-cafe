import { build } from 'esbuild';
import { esbuildPluginFileSize } from 'esbuild-plugin-filesize';
import importGlobPlugin from 'esbuild-plugin-import-glob';
import alias from 'esbuild-plugin-alias';
import { resolve } from 'import-meta-resolve';
import { copy } from 'esbuild-plugin-copy';

const dev = process.env.NODE_ENV === 'development';

console.time('esbuild');
build({
  entryPoints: ['./src/index.tsx'],
  jsxFactory: 'h',
  jsxFragment: 'Fragment',
  outfile: './dist/index.js',
  bundle: true,
  inject: ['./src/preact-shim.ts'],
  target: 'es2017',
  platform: 'browser',
  minify: !dev,
  watch: dev
    ? {
        onRebuild(err, res) {
          if (err) console.error('esbuild failed:', err);
          else console.log('esbuild rebuilt');
        },
      }
    : false,
  plugins: [
    copy({
      assets: {
        from: ['./src/static/*'],
        to: ['./dist'],
      },
    }),
    alias({
      react: await resolve('preact/compat', import.meta.url),
      'react-dom': await resolve('preact/compat', import.meta.url),
    }),
    importGlobPlugin.default(),
    esbuildPluginFileSize({
      showBrotliSize: true,
      showPluginTitle: false,
      showGzippedSize: false,
      showMinifiedSize: false,
      theme: 'dark',
    }),
  ],
}).then(async (res) => {
  console.log(dev ? 'watching...' : 'JS Build Complete');
  console.timeEnd('esbuild');
});
