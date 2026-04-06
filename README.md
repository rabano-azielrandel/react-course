# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

## Steps that I've done

### Step 1 Create React App

Choose Typescript only

```
npm create vite@latest .
```

### Step 2 Install Tailwind and Vite plugin

```
npm install -D tailwindcss postcss autoprefixer  
npm install -D tailwindcss @tailwindcss/vite   
```

**Then import it in vite.config.ts**
it should look like this 

```
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})

```

**Then import the tailwind to index.css and ensure that main.tsx is using index.css**

```
@import "tailwindcss";
```

### Step 3 Initial push 

```
git add . ; git commit -m "Create react up to tailwind css setup" ; git push -u origin main
```

### Step 4 Set up alias

**Add the content at tsconfig.app.json**
```js
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    },
    "composite": true
  },
  "include": ["src"]
}   
```

**Then update the vite.config.ts**
it should look like this 
```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
    resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
})
```

## Backend Setup

### Step 1 Create a server folder and initialize node

```
mkdir server
cd server
npm init -y
```

### Step 2 Install backend dependencies

for node packages
```
npm install express cors jsonwebtoken bcrypt dotenv
```

for auto restart of node when theres a changes
```
npm install -D nodemon
```

### Step 3 Create entry file in /server

index.js
```js
import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running");
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
```

### Step 4 Fix ES Module
in /server/package.json add this

```
"type": "module"
```

### Step 5 Set up nodemon to use npm run dev 

add this in /server/package.json
```js
"scripts": {
  "dev": "nodemon index.js",
  "start": "node index.js"
}
```

### Step 6 Run backend

if Step 5 is skipped
```
npx nodemon index.js
```

else
```
npm run dev
```

> **_NOTE:_**  This requires to run in separate terminal, 1 for 5173 port and the other one is port 3000

## Run concurrently

### Step 1 Install concurently in root in our case **react-course**

```
npm install -D concurrently
```

### Step 2 Update Root package.json

```js
"scripts": {
  "dev": "vite",
  "server": "cd server && npm run dev",
  "fullstack": "concurrently \"npm run dev\" \"npm run server\""
}
```

in our case the package.json scripts will look like this 
```js
"scripts": {
  "dev": "vite",
  "build": "tsc -b && vite build",
  "lint": "eslint .",
  "preview": "vite preview",

  "server": "npm --prefix server run dev",
  "fullstack": "concurrently \"npm run dev\" \"npm run server\""
}
```

### Step 3 Run 

```
npm run fullstack
```

## Middleware setup

### Step 1 install cookie-parser + setup index.js or the server entry (might be server.js)

```
npm install cookie-parser
```

Update the server entry file and include this
```js
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.js";

const app = express();

app.use(express.json());
app.use(cookieParser()); // ✅ THIS is middleware
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use("/api/auth", authRoutes);

app.listen(3000, () => console.log("Server running"));
```

### Step 2