import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/admin': {
        target: 'https://sokksik.click',
        changeOrigin: true,
        secure: false,
        onProxyRes: (proxyRes) => {
          // 서버에서 중복으로 보내는 CORS 헤더를 삭제하고 하나로 통일
          delete proxyRes.headers['access-control-allow-origin'];
          proxyRes.headers['Access-Control-Allow-Origin'] = 'http://localhost:5173';
          proxyRes.headers['Access-Control-Allow-Credentials'] = 'true';
        },
      },
    },
  },
})
