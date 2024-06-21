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
	
export async function POST(request: NextRequest) {
	const body = await request.json();

	const user = body.user;
console.log("@@@user" ,user);
const res = await sdk.management.user.update(user.loginIds[0], {userTenants:[{tenantId:"T2hh4ztHpempjoUv3a6gNaeF0xLY", roleNames:user.roleNames}]})
console.log("@@@res" ,res);

	return new NextResponse(JSON.stringify({
		message: "OK"
	}), { status: 200 });
}