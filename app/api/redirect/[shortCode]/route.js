import { NextResponse } from 'next/server';

// Example: Replace this with your actual database lookup
const urlDatabase = {
  abc123: 'https://www.example.com',
  xyz789: 'https://www.google.com',
};

export async function GET(request, { params }) {
  const { shortCode } = params;
  const longUrl = urlDatabase[shortCode];

  if (longUrl) {
    // Redirect to the long URL
    return NextResponse.redirect(longUrl);
  } else {
    // Redirect to home with error
    return NextResponse.redirect('/?error=Invalid%20or%20expired%20short%20URL');
  }
}
