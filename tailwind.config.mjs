/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				'antonito-tan': '#9B331C',
				'antonito-brown': '#491C07',
				'antonito-teal': '#9B5E38',
				'antonito-off-white': '#FFFFDB',
				'antonito-light-beige': '#cec0a1',
				'antonito-red': '#951419',
			},
			fontFamily: {
				serif: ['Shrikhand', ...defaultTheme.fontFamily.serif],
				sans: ['Lato', ...defaultTheme.fontFamily.sans],
			},
		},
	},
	plugins: [
		require('@tailwindcss/forms'),
		require('@tailwindcss/typography'),
		require('@tailwindcss/aspect-ratio'),
	],
}
