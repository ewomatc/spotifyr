/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{html,js}"], // tell tailwind where to look for our files that use classes
	theme: {
		extend: {
			colors: {
				green: "#1db954",
				black: "#191414",
				"black-base": "#121212",
				"black-primary": "#191414",
				"black-secondary": "#171818",
				"light-black": "#282828",
				primary: "#fff",
				secondary: "#b3b3b3",
				gray: "#535353",
			},
			gridTemplateColumns: {
				"auto-fill-cards": "repeat(auto-fill, minmax(200px, 1fr))",
			},
		},
	},
	plugins: [],
};
