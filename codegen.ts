import { CodegenConfig } from '@graphql-codegen/cli';
import { PRODUCTION } from './src/consts';

const config: CodegenConfig = {
  schema: process.env.MODE === PRODUCTION ? 'http://92.255.79.9:5050/query' : 'http://localhost:8080/query',
  documents: ['src/graphql/*.ts'],
  generates: {
    './src/__generated__/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        gqlTagName: 'gql',
      }
    }
  },
};

export default config;