import fs from 'fs/promises';
import { compile } from 'svelte/compiler';
import { optimize } from 'svgo';
import { generateSvgSvelteComponent } from '../utils/generateSvgSvelteComponent.js';

export interface Config {
	root: string;
}
type ViteTransformOptions = { ssr?: boolean | undefined } | undefined;

export const svelteSvgImportVite = () => {
	return {
		name: 'vite-plugin-svelte-svg-import',
		enforce: 'pre' as const,
		async transform(_src: string, id: string, options: ViteTransformOptions) {
			if (!id.endsWith('.svg?svelte')) return;

			const cleanedId = id.replace('?svelte', '');
			const svg = await fs.readFile(cleanedId, { encoding: 'utf8' });
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
			const component = await generateSvgSvelteComponent(data);
			const { js } = compile(component, {
				css: undefined,
				filename: id,
				namespace: 'svg',
				generate: options.ssr ? 'server' : 'client',
			});
			return js;
		},
	};
};
