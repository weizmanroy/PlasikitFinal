import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createSdk } from '@descope/nextjs-sdk/server';
import data from "../../products.json"

const sdk = createSdk({
  // The Descope project ID to use for authentication
  // Defaults to process.env.DESCOPE_PROJECT_ID
  projectId: 'P2fBgx8H3bG5LZPtQo20GYUBd7am',

  // The Descope management key to use for management operations
  // Defaults to process.env.DESCOPE_MANAGEMENT_KEY
  managementKey: 'K2fDgX3DxYCZ9hmXjGAkyUC10m4lsaoxSwoXOmYlGdx03Lw6duAPAJpdvvEJtisWiVKZIKw'
});

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

function getProduct(id: any) {
  return data.items.find((p) => p.id === id);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const productId = body.productId;
  const userId = body.userId;

  const product = getProduct(productId);
  if (!product) {
    return new NextResponse('Product not found', { status: 404 });
  }

  const grams = product.grams;

  console.log('@@@ userId', userId);
  const res = await sdk.management.user.loadByUserId(userId);
  if (!res.ok) {
    console.error('Failed to load user', res.error);
    return new Response('User not found', { status: 404 });
  }

  const user = res.data;
  console.log('@@@ User', user);

  const currentGrams = user.customAttributes.grams || 0;
  const currentSpent = user.customAttributes.spentGrams || 0;

  if (currentGrams < grams) {
    return new NextResponse(JSON.stringify({
      message: "Insufficient grams"
    }), { status: 400 });
  }

  const newGrams = currentGrams - grams;
  const newSpent = currentSpent + grams;

  const updateRes = await sdk.management.user.updateCustomAttribute(user.loginIds[0], 'grams', newGrams);
  const updateSpe = await sdk.management.user.updateCustomAttribute(user.loginIds[0], 'spentGrams', newSpent);

  if (!updateRes.ok || !updateSpe.ok) {
    console.error('Failed to update user attributes', updateRes.error, updateSpe.error);
    return new NextResponse('Failed to update user attributes', { status: 500 });
  }

  console.log('@@@ updateRes', updateRes);

  return new NextResponse(JSON.stringify({
    message: "OK"
  }), { status: 200 });
}
