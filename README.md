# Vite Plugin: Svelte SVG Import

Transform your SVGs into **Svelte components** automatically — just by adding `?svelte` to the import path!
Simple, fast, and optimized ⚡️🧩

---

### 🚀 Features

- Import SVG files as **Svelte components**
- Uses **SVGO** for automatic optimization
- Smart caching for **better build performance**
- Supports both **client** and **SSR** builds
- Clean and type-safe ✅

---

### 📦 Installation

```bash
npm install svelte-svg-import
# or
yarn add svelte-svg-import
# or
pnpm add svelte-svg-import
```

---

### 🔌 Usage

In your `vite.config.js` / `vite.config.ts`:

```ts
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { svelteSvgImportVite } from 'svelte-svg-import';

export default defineConfig({
	plugins: [svelte(), svelteSvgImportVite()],
});
```

Now simply import SVGs like this:

```svelte
<script>
  import Logo from './logo.svg?svelte';
</script>

<Logo class="my-logo" />
```

🎉 Done! Your SVG is now a reusable Svelte component.

---

### 🧠 TypeScript Support

Add the type declaration to your `tsconfig.json`:

```json
{
	"compilerOptions": {
		"types": ["svelte-svg-import/type"]
	}
}
```

> 📌 If you’re using JavaScript, make sure your editor loads the type declaration file
> `svelte-svg-import/type` to remove import warnings.

---

### ⚙ How It Works

This plugin:

1. Reads the SVG file
2. Optimizes SVG with **SVGO**
3. Wraps it into a **Svelte component**
4. Compiles using the Svelte compiler
5. Caches by hash for faster rebuilds

---

### 📄 Example Repo

> _coming soon…_

---

### 🤝 Contributing

Pull requests & issues are welcome!
Let’s build cool things with Svelte together 💙

---

### 📜 License

MIT — free for everyone

---
