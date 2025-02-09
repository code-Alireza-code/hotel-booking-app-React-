# Hotel Booking App

This project is a hotel booking application built with React, TypeScript, and Vite. It includes features such as searching for hotels, viewing hotel details, managing bookmarks, and user authentication.

## Project Structure

```
.gitignore
assets/
    hotel.png
eslint.config.js
index.html
package.json
README.md
server/
    db.json
src/
    App.css
    App.tsx
    components/
        AddBookmark.tsx
        AppLayout.tsx
        BookmarkLayout.tsx
        Bookmarks.tsx
        Header.tsx
        Hotels.tsx
        Loader.tsx
        LocationList.tsx
        Login.tsx
        Map.tsx
        ProtectedRoute.tsx
        SingleBookmark.tsx
        SingleHotel.tsx
    context/
        ...
    hooks/
        ...
    main.tsx
    types/
        ...
    vite-env.d.ts
tailwind.config.ts
tsconfig.app.json
tsconfig.json
tsconfig.node.json
vite.config.ts
```

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm (version 6 or higher)

### Installation

1. Clone the repository:

```sh
git clone https://github.com/code-Alireza-code/hotel-booking-app-React-.git
cd hotel-booking-app
```

2. Install dependencies:

```sh
npm install
```

3. Start the development server:

```sh
npm run dev
```

4. Start the JSON server:

```sh
npm run server
```

5. Open your browser and navigate to `http://localhost:3000`.

## Available Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the project for production.
- `npm run lint`: Runs ESLint to check for linting errors.
- `npm run preview`: Previews the production build.
- `npm run server`: Starts the JSON server.

## Configuration

### Tailwind CSS

Tailwind CSS is used for styling. The configuration is defined in `tailwind.config.ts`:

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "rgb(var(--color-primary-light) / <alpha-value>)",
          dark: "rgb(var(--color-primary-dark) / <alpha-value>)",
        },
        secondary: {
          100: "rgb(var(--color-secondary-100) / <alpha-value>)",
          200: "rgb(var(--color-secondary-200) / <alpha-value>)",
          300: "rgb(var(--color-secondary-300) / <alpha-value>)",
          400: "rgb(var(--color-secondary-400) / <alpha-value>)",
          500: "rgb(var(--color-secondary-500) / <alpha-value>)",
          600: "rgb(var(--color-secondary-600) / <alpha-value>)",
        },
      },
    },
  },
  plugins: [],
};

export default config;
```

### ESLint

ESLint is used for linting. The configuration is defined in `eslint.config.js`:

```js
import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  }
);
```

## License

This project is licensed under the MIT License.
