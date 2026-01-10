'use client';

import { useEffect } from 'react';
import { signOut } from 'next-auth/react';
import { motion } from 'framer-motion';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

export default function LogoutPage(): JSX.Element {
  useEffect(() => {
    // Automatically sign out and redirect after a short delay
    const timer = setTimeout(() => {
      signOut({ callbackUrl: '/' });
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-24 h-24 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
        >
          <CheckCircleIcon className="w-12 h-12 text-white" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200"
        >
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            🔄 Refreshing Your Session
          </h1>
          
          <p className="text-gray-600 mb-6">
            Signing you out to refresh your Google token...
          </p>

          <div className="flex items-center justify-center mb-6">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>

          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="font-medium text-blue-900 mb-2">What's happening:</h3>
            <ul className="text-sm text-blue-800 text-left space-y-1">
              <li>• Clearing expired Google token</li>
              <li>• Cleaning browser cache</li>
              <li>• Redirecting to fresh login</li>
              <li>• Your contacts will import successfully!</li>
            </ul>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-4 text-xs text-gray-500"
          >
            Redirecting automatically in a few seconds...
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
