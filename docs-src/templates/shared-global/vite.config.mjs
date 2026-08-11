import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'fs-extra';
import * as sass from 'sass';
import { defineConfig } from 'vite';
import { createRequire } from 'node:module';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const require = createRequire(import.meta.url);

const packageJsonPath = path.resolve(__dirname, '../../package.json');
const packageJson = fs.readJsonSync(packageJsonPath);
const template = packageJson.templateName;

const entryFile = path.resolve(__dirname, `../${template}/src/main.ts`);
const templatePublicDir = path.resolve(__dirname, `../${template}/public`);
const docsPublicDir = path.resolve(templatePublicDir, '../../../../docs/public');

const outputFiles = ['main.js', 'main.js.map', 'main.css', 'main.css.map'];

function cleanBuildTargets() {
  for (const file of outputFiles) {
    fs.removeSync(path.join(templatePublicDir, file));
    fs.removeSync(path.join(docsPublicDir, file));
  }
}

function copyBuildToDocsPublic() {
  fs.ensureDirSync(docsPublicDir);

  for (const file of outputFiles) {
    const source = path.join(templatePublicDir, file);
    const destination = path.join(docsPublicDir, file);

    if (fs.existsSync(source)) {
      fs.copyFileSync(source, destination);
    }
  }
}

function buildCssWithSourceMap(mode) {
  const result = sass.compile(path.resolve(__dirname, `../${template}/src/main.scss`), {
    style: mode === 'production' ? 'compressed' : 'expanded',
    sourceMap: true,
    sourceMapIncludeSources: true,
    importers: [new sass.NodePackageImporter()],
  });

  let css = result.css;

  // Sass keeps plain .css imports as @import rules. Inline package imports so docfx doesn't request non-existing /public/@... paths.
  css = css.replace(/@import\s*["']([^"']+)["'];?/g, (fullMatch, specifier) => {
    if (!specifier.startsWith('@')) return fullMatch;

    try {
      const resolvedPath = require.resolve(specifier);
      return fs.readFileSync(resolvedPath, 'utf8');
    } catch {
      return fullMatch;
    }
  });

  if (!css.includes('sourceMappingURL=main.css.map')) {
    css += '\n/*# sourceMappingURL=main.css.map */\n';
  }

  const sourceMap = {
    ...result.sourceMap,
    file: 'main.css',
  };

  fs.writeFileSync(path.join(templatePublicDir, 'main.css'), css, 'utf8');
  fs.writeJsonSync(path.join(templatePublicDir, 'main.css.map'), sourceMap);
}

export default defineConfig(({ mode }) => ({
  build: {
    outDir: templatePublicDir,
    emptyOutDir: false,
    sourcemap: true,
    minify: mode === 'production',
    lib: {
      entry: entryFile,
      formats: ['es'],
      fileName: () => 'main.js',
      cssFileName: 'main',
    },
  },
  plugins: [
    {
      name: 'clean-and-copy-build-files',
      buildStart() {
        cleanBuildTargets();
      },
      closeBundle() {
        buildCssWithSourceMap(mode);
        copyBuildToDocsPublic();
      },
    },
  ],
}));
