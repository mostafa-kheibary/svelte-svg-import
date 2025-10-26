interface SvgIconProps {
	strokeWidthScale?: number;
	color?: string;
	id?: string;
	class?: string | string[];
}

declare module '*.svg?svelte' {
	import type { SvelteHTMLElements } from 'svelte/elements';
	import { type Component } from 'svelte';
	const component: Component<SvelteHTMLElements['svg'] & SvgIconProps>;
	export default component;
}
