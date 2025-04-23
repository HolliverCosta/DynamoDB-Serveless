import type { AWS } from '@serverless/typescript';

const serverlessConfiguration: AWS = {
  service: 'dynamodb-serveless',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild'],
  provider: {
    name: 'aws',
    runtime: 'nodejs20.x',
  },
  // import the function via paths
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node20',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
  functions: { 
    listProducts: {
    handler: 'src/functions/listProducts.listProducts',
    events: [
      {
      httpApi: {  
        path: '/products',  
        method: 'GET',
        }, 
      },
    ]
    }  
  },
}

module.exports = serverlessConfiguration;
