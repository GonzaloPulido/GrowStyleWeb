/** @type {import('next').NextConfig} */
// Para comprobar si esta en producción
const isProduction = process.env.NODE_ENV === "production";

const nextConfig = {
    pageExtensions: ["page.tsx", "page.ts", "page.jsx", "page.js"], // Define las extensiones que next debe considerar paginas
    reactStrictMode: true, // Actuva el modo estricto de React
    output: "export", // La aplicacion se exportara como proyecto estático
    compiler: {
        styledComponents: true, // Se habilita la compatibilidad con StyledComponents
    },
    images: {
        unoptimized: true, // Las imagenes no estaran optimizadas
    },
    basePath: process.env.NEXT_PUBLIC_BASE_URL, // Establece la ruta base de la aplicación
    eslint:{
        dirs: ['pages', 'utils'] // Directorios donde trabajará eslint
    }
}

export default nextConfig;