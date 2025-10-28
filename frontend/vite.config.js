import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    // THIS IS THE FIX:
    // We are explicitly telling the React plugin what to do.
    react({
      // Use the classic runtime to avoid the 'jsx' prop issue
      jsxRuntime: 'classic' 
    })
  ],
})