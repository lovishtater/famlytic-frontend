'use client';

import { useSession } from 'next-auth/react';

export function DebugAuth(): JSX.Element {
  const { data: session, status } = useSession();

  if (process.env.NODE_ENV !== 'development') {
    return <></>;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4 shadow-lg text-xs">
      <h3 className="font-bold mb-2">Auth Debug</h3>
      <div>Status: {status}</div>
      {session?.user && (
        <div>
          <div>Name: {session.user.name}</div>
          <div>Email: {session.user.email}</div>
          <div>ID: {session.user.id}</div>
        </div>
      )}
    </div>
  );
}
