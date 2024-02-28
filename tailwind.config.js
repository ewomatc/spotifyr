/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{html,js}"], // tell tailwind where to look for our files that use classes
	theme: {
		extend: {
			colors: {
				green: "#1db954",
				black: "#191414",
				primary: "#fff",
			},
		},
	},
	plugins: [],
};
