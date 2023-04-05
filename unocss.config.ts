import {
	defineConfig,
	extractorSvelte,
	presetUno,
	transformerVariantGroup,
	transformerDirectives
} from 'unocss';

export default defineConfig({
	extractors: [extractorSvelte],
	presets: [presetUno()],
	transformers: [transformerVariantGroup(), transformerDirectives()]
});
