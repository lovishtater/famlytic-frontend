// Debug file to help troubleshoot NextAuth issues
console.log('🔍 Debugging NextAuth Configuration:');
console.log('NEXTAUTH_URL:', process.env.NEXTAUTH_URL);
console.log('NEXTAUTH_SECRET:', process.env.NEXTAUTH_SECRET ? 'Set ✓' : 'Missing ❌');
console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID ? `${process.env.GOOGLE_CLIENT_ID.substring(0, 20)}...` : 'Missing ❌');
console.log('GOOGLE_CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET ? 'Set ✓' : 'Missing ❌');
console.log('NODE_ENV:', process.env.NODE_ENV);

export function printAuthDebug(): void {
  console.log('\n📊 Current Auth Config Status:');
  console.log('- Environment:', process.env.NODE_ENV);
  console.log('- NextAuth URL:', process.env.NEXTAUTH_URL);
  console.log('- Google OAuth:', {
    clientId: !!process.env.GOOGLE_CLIENT_ID,
    clientSecret: !!process.env.GOOGLE_CLIENT_SECRET,
  });
  console.log('- NextAuth Secret:', !!process.env.NEXTAUTH_SECRET);
}
