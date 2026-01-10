'use client';

import React, { useState, useEffect } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';
import { 
  UsersIcon, 
  ShieldCheckIcon, 
  ArrowPathIcon
} from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';
import { 
  importGoogleContacts, 
  getUserContacts, 
  getSyncStatus,
  syncGoogleContacts
} from '@/services/api';

export default function ContactImporter({ onContactsImported }: { onContactsImported?: (contacts: any[]) => void }) {
  const { data: session, status } = useSession();
  const [importStatus, setImportStatus] = useState<'idle' | 'importing' | 'success' | 'error'>('idle');
  const [contactsData, setContactsData] = useState<any>(null);
  const [userStats, setUserStats] = useState<any>(null);
  const [hasSyncedBefore, setHasSyncedBefore] = useState(false);

  useEffect(() => {
    if (session?.user?.email) {
      loadUserState();
    }
  }, [session?.user?.email]);

  const loadUserState = async () => {
    if (!session?.user?.email) return;
    
    try {
      const [statsData, syncData] = await Promise.all([
        getUserContacts(session.user.email),
        getSyncStatus(session.user.email)
      ]);
      
      setContactsData(statsData);
      setHasSyncedBefore(syncData.data?.has_synced_before || false);
      setUserStats(syncData.data);
    } catch (error) {
      console.error('Failed to load user state:', error);
    }
  };

  const handleImportContacts = async () => {
    if (!session?.accessToken || !session?.user?.email) {
      toast.error('No authentication token available');
      return;
    }

    setImportStatus('importing');
    
    try {
      const result = await importGoogleContacts(session.user.email, session.accessToken);
      
      setImportStatus('success');
      setContactsData(result);
      setHasSyncedBefore(true);
      
      toast.success(`Successfully imported ${result.data?.imported || 0} contacts!`);
      
      if (onContactsImported && result.data?.contacts) {
        onContactsImported(result.data.contacts);
      }
      
      // Reload stats after import
      await loadUserState();
      
    } catch (error: any) {
      setImportStatus('error');
      
      // Check if it's a token expiration error
      if (error.message?.includes('expired') || error.message?.includes('re-authenticate')) {
        toast.error('Your session has expired. Please refresh the page to continue.', {
          duration: 6000,
          action: {
            label: 'Refresh Page',
            onClick: () => window.location.reload()
          }
        });
      } else {
        toast.error(error.message || 'Failed to import contacts');
      }
    }
  };

  const handleSyncContacts = async () => {
    if (!session?.accessToken || !session?.user?.email) {
      toast.error('No authentication token available');
      return;
    }

    setImportStatus('importing');
    
    try {
      const result = await syncGoogleContacts(session.user.email, session.accessToken);
      
      setImportStatus('success');
      setContactsData(result);
      
      const summary = result.data?.upsert_summary;
      const message = `Sync complete! Created: ${summary?.created || 0}, Updated: ${summary?.updated || 0}`;
      toast.success(message);
      
      // Reload stats after sync
      await loadUserState();
      
    } catch (error: any) {
      setImportStatus('error');
      
      // Check if it's a token expiration error
      if (error.message?.includes('expired') || error.message?.includes('re-authenticate') || error.message?.includes('refresh')) {
        toast.error('Your session has expired. Please refresh the page.');
        setTimeout(() => window.location.reload(), 2000);
      } else {
        toast.error(error.message || 'Failed to sync contacts');
      }
    }
  };

  const handleReAuthenticate = async () => {
    await signOut({ callbackUrl: '/login' });
  };

  if (status === 'loading') {
    return (
      <div className="canvas-blur backdrop-blur-sm">
        <div className="flex items-center justify-center h-full">
          <div className="bg-white rounded-xl p-6 shadow-xl max-w-md text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-family-600 mx-auto mb-4"></div>
            <p className="text-canvas-800">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="canvas-blur backdrop-blur-sm">
        <div className="flex items-center justify-center h-full">
          <div className="bg-white rounded-xl p-6 shadow-xl max-w-md text-center">
            <FcGoogle className="text-5xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Connect Google Contacts</h3>
            <p className="text-canvas-700 mb-4">Sign in with Google to import your contacts and start building your family tree!</p>
            
            <button
              onClick={() => signIn('google')}
              className="w-full bg-family-600 hover:bg-family-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center"
            >
              <FcGoogle className="mr-2" />
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="canvas-blur backdrop-blur-sm">
      <div className="flex items-center justify-center h-full">
        <div className="bg-white rounded-xl p-6 shadow-xl max-w-md w-full text-center">
          <ShieldCheckIcon className="text-nature-600 text-4xl mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-4">Google Contacts Integration</h3>
          
          {!hasSyncedBefore ? (
            <>
              <p className="text-canvas-700 mb-4">
                Import your Google Contacts to quickly start building your family tree.
              </p>
              
              <button
                onClick={handleImportContacts}
                disabled={importStatus === 'importing'}
                className="w-full bg-family-600 hover:bg-family-700 disabled:bg-canvas-300 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center mb-3"
              >
                {importStatus === 'importing' ? (
                  <>
                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                    Importing...
                  </>
                ) : (
                  <>
                    <UsersIcon className="mr-2" />
                    Import Google Contacts
                  </>
                )}
              </button>
            </>
          ) : (
            <>
              <p className="text-canvas-700 mb-4">
                Your contacts have been synced. Click to refresh with latest data.
              </p>
              
              {userStats && (
                <div className="bg-canvas-50 rounded-lg p-4 mb-4 text-left">
                  <h4 className="font-semibold mb-2">Your Contact Stats:</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Total Contacts:</span>
                      <span className="font-medium">{userStats.total}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Ready for Tree:</span>
                      <span className="font-medium text-family-600">{userStats.pending}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Already Added:</span>
                      <span className="font-medium text-nature-600">{userStats.added_to_tree}</span>
                    </div>
                    {userStats.last_sync && (
                      <div className="flex justify-between">
                        <span>Last Sync:</span>
                        <span className="font-medium text-xs">
                          {new Date(userStats.last_sync).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <button
                onClick={handleSyncContacts}
                disabled={importStatus === 'importing'}
                className="w-full bg-family-600 hover:bg-family-700 disabled:bg-canvas-300 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center mb-3"
              >
                {importStatus === 'importing' ? (
                  <>
                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                    Syncing...
                  </>
                ) : (
                  <>
                    <ArrowPathIcon className="mr-2" />
                    Sync Latest Contacts
                  </>
                )}
              </button>
            </>
          )}

          <button
            onClick={handleReAuthenticate}
            className="w-full bg-canvas-400 hover:bg-canvas-500 text-canvas-800 px-4 py-2 rounded-lg font-medium transition-colors text-sm"
          >
            Sign Out to Re-authenticate
          </button>
        </div>
      </div>
    </div>
  );
}