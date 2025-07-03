import { NextResponse } from 'next/server';

export function middleware(request) {
  // Get the path of the request
  const path = request.nextUrl.pathname;
  
  // Handle preflight OPTIONS request for CORS
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version',
        'Access-Control-Max-Age': '86400',
      },
    });
  }
  
  // For all other API requests, add CORS headers to the response
  const response = NextResponse.next();
  
  // Add CORS headers to the response
  response.headers.set('Access-Control-Allow-Credentials', 'true');
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version');
  
  return response;
}

// Configure middleware to run only on API routes
export const config = {
  matcher: '/api/:path*',
}; 