// uno.config.ts
import {
    defineConfig,
    presetAttributify,
    presetIcons,
    presetTypography,
    presetUno,
    presetWebFonts,
    transformerDirectives,
    transformerVariantGroup
} from 'unocss'

export default defineConfig({
    shortcuts: [
        // ...
    ],
    theme: {
        colors: {
            container: 'var(--color-bg-1)',
            mainbox: 'var(--color-neutral-1)',
            secondary: 'var(--color-neutral-2)',
            three: 'var(--color-neutral-3)'
        }

    },
    rules: [
        // 允许动态颜色值（如 text-[#ff0000]）
        [/^text-$$(.+)$$$/, ([, color]) => ({ color })],
        ['text-primary', { 'color': 'var(--color-text-1)' }],
        ['text-secondary', { 'color': 'var(--color-text-2)' }],
        ['text-three', { 'color': 'var(--color-text-3)' }],
        ['text-white', { 'color': 'var(--color-text-3)' }],
    ],
    presets: [
        presetUno(),
        presetAttributify(),
        presetIcons(),
        presetTypography(),
        presetWebFonts({
            fonts: {
                // ...
            },
        }),
    ],
    transformers: [
        transformerDirectives(),
        transformerVariantGroup(),
    ],
})