'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';

export default function TestAuthPage(): JSX.Element {
  const { data: session, status } = useSession();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-8">
          Authentication Test
        </h1>
        
        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-semibold mb-4">Status</h2>
          <div className="space-y-2">
            <div className="flex items-center">
              <span className="font-medium w-24">Status:</span>
              <span className={`px-2 py-1 rounded text-sm ${
                status === 'loading' ? 'bg-yellow-100 text-yellow-800' :
                status === 'authenticated' ? 'bg-green-100 text-green-800' :
                'bg-red-100 text-red-800'
              }`}>
                {status}
              </span>
            </div>
            
            {session?.user && (
              <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-700 rounded">
                <h3 className="font-medium mb-2">User Info:</h3>
                <div className="space-y-1 text-sm">
                  <div>Name: {session.user.name}</div>
                  <div>Email: {session.user.email}</div>
                  <div>Image: {session.user.image ? 'Present' : 'Not provided'}</div>
                  <div>ID: {session.user.id}</div>
                </div>
              </div>
            )}
          </div>
          
          <div className="mt-6 flex space-x-4">
            {!session ? (
              <Link 
                href="/login"
                className="btn-primary"
              >
                Go to Login
              </Link>
            ) : (
              <button
                onClick={() => signOut()}
                className="btn-secondary"
              >
                Sign Out
              </button>
            )}
            <Link 
              href="/dashboard"
              className="btn-outline"
            >
              Go to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
