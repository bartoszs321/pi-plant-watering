import { defineConfig } from 'orval';

export default defineConfig({
    endpoint: {
        input: {
            target: 'src/Api/api.json',
        },
        output: {
            clean: true,
            target: './src/Api/generated/endpoints.ts',
            schemas: './src/Api/generated/models',
            mode: 'split',
            prettier: true,
            client: 'axios',
            override: {
                useDates: true,
                useNativeEnums: true,
                mutator: {
                    path: './src/Api/custom-axios.ts',
                    name: 'customInstance',
                },
                // transformer: (options) => {
                //     console.log('OPTIONS' + JSON.stringify(options));
                //     return options;
                // },
            },
        },
    },
});
