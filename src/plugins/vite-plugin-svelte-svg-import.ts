import fs from 'fs/promises';
import { compile } from 'svelte/compiler';
import { optimize } from 'svgo';
import { generateSvgSvelteComponent } from '../utils/generateSvgSvelteComponent.js';
import crypto from 'node:crypto';

export interface Config {
	root: string;
}
type ViteTransformOptions = { ssr?: boolean | undefined } | undefined;

const cache = new Map();

export const svelteSvgImportVite = () => {
	return {
		name: 'vite-plugin-svelte-svg-import',
		enforce: 'pre' as const,
		async transform(_src: string, id: string, options: ViteTransformOptions) {
			if (!id.endsWith('.svg?svelte')) return;

			const cleanedId = id.replace('?svelte', '');
			const svg = await fs.readFile(cleanedId, { encoding: 'utf8' });
			const hash = crypto.createHash('sha256');
			hash.write(svg);
			const hashedContent = hash.digest('hex');
			const cachedContent = cache.get(hashedContent);
			if (cachedContent) return { code: cachedContent };

			const { data } = optimize(svg, {
				path: cleanedId,
				plugins: [
					{
						name: 'preset-default',
						params: {
							overrides: {
								cleanupIds: false,
								removeUnknownsAndDefaults: false,
							},
						},
					},
				],
			});
			const content = await generateSvgSvelteComponent(data);
			const { js } = compile(content, {
				css: undefined,
				filename: id,
				namespace: 'svg',
				generate: options.ssr ? 'server' : 'client',
			});
			cache.set(hashedContent, js.code);
			return { code: js.code };
		},
	};
};
