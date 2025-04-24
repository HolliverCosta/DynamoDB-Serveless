import type { APIGatewayProxyResult } from 'aws-lambda';

export async function handler(event: APIGatewayProxyResult) {
  console.log(event)

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'deleteProduct',
  })
  }
}