import type { APIGatewayProxyResult } from 'aws-lambda';

export async function listProducts(event: APIGatewayProxyResult) {
  const body = JSON.parse(event.body);

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'List of products',
      data: body,
  })
  }
}