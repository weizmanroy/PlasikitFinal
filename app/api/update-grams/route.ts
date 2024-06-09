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

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
	
function getProduct(id: any) {
	return data.items.find((p) => p.id === id);
  }
export async function POST(request: NextRequest) {
	const body = await request.json();

	const productId = body.productId;
	const userId = body.userId;
	
	const product = getProduct(productId);
	const grams = body.grams;


	console.log('@@@ userId', userId, "grams", grams);

	const res = await sdk.management.user.loadByUserId(userId);
	if (!res.ok) {
		console.error('Failed to load user', res.error);
		return new Response('Not found', { status: 404 });
	}

	const user = res.data as any;


	const currentGrams = (user as any).customAttributes.grams || 0;
	


	const newGrams = currentGrams + grams as number;
	
	console.log("newGrams", newGrams);
	console.log("currentGrams", currentGrams);

	const updateRes = await sdk.management.user.updateCustomAttribute(user.loginIds[0]!, 'grams', newGrams);
	

	
	return new NextResponse(JSON.stringify({
		message: "OK"
	}), { status: 200 });
}