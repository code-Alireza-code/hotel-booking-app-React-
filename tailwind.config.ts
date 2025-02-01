import type { Config } from "tailwindcss";

function withOpacity(variableName: string) {
  return ({ opacityValue }: { opacityValue?: number }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    }
    return `rgb(var(${variableName}))`;
  };
}

const config: Config = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: withOpacity("--color-primary-light"),
          dark: withOpacity("--color-primary-dark"),
        },
        secondary: {
          100: withOpacity("--color-secondary-100"),
          200: withOpacity("--color-secondary-200"),
          300: withOpacity("--color-secondary-300"),
          400: withOpacity("--color-secondary-400"),
          500: withOpacity("--color-secondary-500"),
          600: withOpacity("--color-secondary-600"),
        },
      },
    },
  },
  plugins: [],
};

export default config;
