import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  console.log("API endpoint /api/users was called");

  const mockUsers = [
    {
      id: '1',
      email: 'user1@example.com',
      customAttributes: {
        grams: 100,
        spentGrams: 50,
        groupId: 'group1',
      },
    },
    {
      id: '2',
      email: 'user2@example.com',
      customAttributes: {
        grams: 150,
        spentGrams: 75,
        groupId: 'group1',
      },
    },
    {
      id: '3',
      email: 'user3@example.com',
      customAttributes: {
        grams: 200,
        spentGrams: 100,
        groupId: 'group2',
      },
    },
    {
      id: '4',
      email: 'user4@example.com',
      customAttributes: {
        grams: 250,
        spentGrams: 125,
        groupId: 'group2',
      },
    },
  ];

  console.log("Returning mock users:", mockUsers);

  return NextResponse.json(mockUsers, { status: 200 });
}
