import { defineConfig } from 'orval';

export default defineConfig({
    endpoint: {
        input: {
            target: 'src/api/api.json',
        },
        output: {
            clean: true,
            target: './src/api/generated/endpoints.ts',
            schemas: './src/api/generated/models',
            client: 'axios',
            mode: 'split',
            prettier: true,
            override: {
                mutator: {
                    path: './src/api/custom-axios.ts',
                    name: 'useCustomAxios',
                },
            },
        },
    },
});
