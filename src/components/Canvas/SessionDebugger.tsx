'use client';

import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';

export function SessionDebugger(): JSX.Element {
  const { data: session, status } = useSession();

  if (process.env.NODE_ENV !== 'development') {
    return <></>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-4 left-4 bg-white/90 backdrop-blur-lg border border-gray-200 rounded-lg p-4 shadow-lg text-xs max-w-md z-50"
    >
      <h3 className="font-bold mb-2 text-gray-800">Session Debug</h3>
      <div className="space-y-1 text-gray-600">
        <div><strong>Status:</strong> {status}</div>
        <div><strong>Signed In:</strong> {session ? 'Yes' : 'No'}</div>
        
        {session?.user && (
          <>
            <div><strong>Name:</strong> {session.user.name || 'None'}</div>
            <div><strong>Email:</strong> {session.user.email || 'None'}</div>
            <div><strong>User ID:</strong> {(session.user as any)?.id || 'None'}</div>
            <div><strong>Token ID:</strong> {(session as any)?.tokenId || 'None'}</div>
            <div className="break-all"><strong>Access Token:</strong> {
              (session as any)?.accessToken 
                ? (session as any).accessToken.substring(0, 20) + '...' 
                : 'None'
            }</div>
          </>
        )}
      </div>
      
      <details className="mt-2">
        <summary className="cursor-pointer text-xs text-gray-500 hover:text-gray-700">
          Raw Session Data
        </summary>
        <pre className="text-xs mt-2 p-2 bg-gray-100 rounded overflow-x-auto">
          {JSON.stringify(session, null, 2)}
        </pre>
      </details>
    </motion.div>
  );
}
