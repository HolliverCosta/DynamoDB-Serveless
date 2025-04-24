import type { AWS } from '@serverless/typescript';

const serverlessConfiguration: AWS = {
  service: 'dynamodb-serveless',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild'],
  provider: {
    name: 'aws',
    runtime: 'nodejs20.x',
    iam: {
      role: {

        statements: [
          {
            Effect: 'Allow',
            Action: [
              'dynamodb:PutItem',
              'dynamodb:DeleteItem',
              'dynamodb:GetItem',
              'dynamodb:UpdateItem',
              'dynamodb:Scan',
            ],
            Resource: [
              { "Fn::GetAtt" : [ "ProductsTable", "Arn" ] }
            ]
          }
        ]
      }
    }
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
    handler: 'src/functions/listProducts.handler',
    events: [
      {
      httpApi: {  
        path: '/products',  
        method: 'GET',
        }, 
      },
    ]
    },
    getProduct: {
      handler: 'src/functions/getProduct.handler',
      events: [
        {
        httpApi: {  
          path: '/products/{productId}',  
          method: 'GET',
          }, 
        },
      ]
    },
    createProduct: {
      handler: 'src/functions/createProduct.handler',
      events: [
        {
        httpApi: {  
          path: '/products',  
          method: 'POST',
          }, 
        },
      ]
    },
    deleteProduct: {
      handler: 'src/functions/deleteProduct.handler',
      events: [
        {
        httpApi: {  
          path: '/products/{productId}',  
          method: 'DELETE',
          }, 
        },
      ]
    },
    updateProduct: {
      handler: 'src/functions/updateProduct.handler',
      events: [
        {
        httpApi: {  
          path: '/products/{productId}',  
          method: 'PUT',
          }, 
        },
      ]
    },       
  },
  resources: {
    Resources: {
      ProductsTable: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
          TableName: 'ProductsTable',
          BillingMode: 'PAY_PER_REQUEST',
          PointInTimeRecoverySpecification: {  
            PointInTimeRecoveryEnabled: true
          },
          AttributeDefinitions: [
            {
              AttributeName: 'id',  
              AttributeType: 'S',
            },
          ],
          KeySchema: [
            {
              AttributeName: 'id',  
              KeyType: 'HASH',
            },
          ]
        }
      }
  }
  },
}

module.exports = serverlessConfiguration;
