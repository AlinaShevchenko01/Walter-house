import { defineConfig } from 'vite'
import path from 'path'
import handlebars from "vite-plugin-handlebars";
import FullReload from 'vite-plugin-full-reload';
import postcssCombineMediaQuery from 'postcss-combine-media-query'
import postcssSortMediaQueries from 'postcss-sort-media-queries'
import autoprefixer from 'autoprefixer'

export default defineConfig(({ mode }) =>{
    const isDeploy = mode === 'deploy'
    const basePath = isDeploy? '/repoName/' : '/'

    return {
        base: basePath,
        build: {
            sourcemap: true,
            minify: 'terser',
            outDir: 'dist',
            rollupOptions: {
                output: {
                    manualChunks(id) {
                        if (id.includes('node_modules')) {
                            return 'vendor'
                        }
                    },
                    entryFileNames: ({ name }) => {
                        return name === 'index' ? 'js/[name].js' : 'js/[name]/[name].js';
                    }
                }
            }
        },
        css: {
            postcss:{
                plugins: [postcssCombineMediaQuery(),
                    postcssSortMediaQueries(),
                    autoprefixer()]
            }
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src'),

            }
        },
        plugins: [
            handlebars({
                reloadOnPartialChange: true,
                partialDirectory: [
                    path.resolve(__dirname, 'src/html/partials'),
                    path.resolve(__dirname, 'src/html/templates'),
                    path.resolve(__dirname, 'src/html/sections'),
                ],
                helpers: {
                    array(...args) {
                        return args.slice(0,-1)
                    }
                }
            }),
            FullReload([
                'src/html/**/*.html',
            ])
        ]
    }
})