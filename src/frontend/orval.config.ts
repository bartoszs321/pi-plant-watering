import { defineConfig } from 'orval';

export default defineConfig({
    endpoint: {
        input: {
            target: 'src/Api/api.json',
        },
        output: {
            clean: true,
            target: 'src/Api/generated/endpoints.ts',
            schemas: 'src/Api/generated/models',
            mode: 'split',
            prettier: true,
        },
    },
});
