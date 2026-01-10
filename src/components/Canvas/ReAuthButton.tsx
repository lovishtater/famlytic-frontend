'use client';

import { signIn } from 'next-auth/react';
import { motion } from 'framer-motion';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';

interface ReAuthButtonProps {
  text?: string;
  prompt?: string;
}

export function ReAuthButton({ 
  text = 'Grant Contacts Access', 
  prompt = 'Sign in again to access your Google Contacts'
}: ReAuthButtonProps): JSX.Element {
  const handleReAuth = async (): Promise<void> => {
    await signIn('google', { 
      callbackUrl: '/dashboard',
      prompt: 'consent' // Force consent screen to show additional scopes
    });
  };

  return (
    <div className="text-center space-y-4">
      <p className="text-sm text-gray-600 font-casual">{prompt}</p>
      <motion.button
        onClick={handleReAuth}
        className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-family-500 to-cozy-500 text-white rounded-xl hover:from-family-600 hover:to-cozy-600 transition-all font-casual font-medium shadow-lg hover:shadow-xl"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowTopRightOnSquareIcon className="w-5 h-5" />
        <span>{text}</span>
      </motion.button>
    </div>
  );
}
