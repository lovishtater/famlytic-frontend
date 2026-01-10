'use client';

import { ReactNode } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Bars3Icon,
  XMarkIcon,
  SparklesIcon,
  UserGroupIcon,
  HeartIcon,
  CalendarDaysIcon,
  ShareIcon,
  MapIcon,
  ChatBubbleLeftRightIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';

interface CanvasLayoutProps {
  children: ReactNode;
}

const navigation = [
  { name: 'Family Tree', href: '/dashboard', icon: SparklesIcon, isMain: true },
  { name: 'People', href: '/dashboard/people', icon: UserGroupIcon },
  { name: 'Relationships', href: '/dashboard/relationships', icon: HeartIcon },
  { name: 'Timeline', href: '/dashboard/timeline', icon: CalendarDaysIcon },
  { name: 'Map', href: '/dashboard/map', icon: MapIcon },
  { name: 'AI Chat', href: '/dashboard/chat', icon: ChatBubbleLeftRightIcon },
];

export function CanvasLayout({ children }: CanvasLayoutProps): JSX.Element {
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-canvas-pattern">
      {/* Fixed Header */}
      <motion.div
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200/50 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/dashboard" className="flex items-center space-x-3">
              <motion.div
                whileHover={{ rotate: 5 }}
                className="w-10 h-10 bg-gradient-to-br from-warm-400 to-cozy-500 rounded-xl flex items-center justify-center shadow-lg"
              >
                <span className="text-white font-bold text-lg">F</span>
              </motion.div>
              <span className="text-xl font-bold bg-gradient-to-r from-warm-600 to-cozy-600 bg-clip-text text-transparent font-friendly">
                Famlytic
              </span>
            </Link>

            {/* Quick Actions */}
            <div className="flex items-center space-x-3">
              <motion.button
                className="p-2 rounded-lg text-gray-600 hover:text-warm-600 hover:bg-warm-50 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <SparklesIcon className="w-5 h-5" />
              </motion.button>
              
              <motion.button
                onClick={() => signOut()}
                className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors font-casual"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowRightOnRectangleIcon className="w-4 h-4" />
                <span className="text-sm">Sign Out</span>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Sidebar */}
      <div className="fixed left-0 top-16 bottom-0 w-64 bg-white/90 backdrop-blur-lg border-r border-gray-200/50 shadow-lg z-40">
        {/* User Info */}
        <div className="p-6 border-b border-gray-200/50">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-family-500 to-cozy-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
              {session?.user?.name?.[0] || 'A'}
            </div>
            <div>
              <p className="font-medium text-gray-900 font-casual">
                {session?.user?.name || 'Family Member'}
              </p>
              <p className="text-sm text-gray-500">
                Exploring family stories
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.name} href={item.href}>
                <motion.div
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-warm-100 to-cozy-100 text-warm-700 shadow-sm border border-warm-200'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  } ${item.isMain ? 'font-bold' : 'font-medium'} font-casual`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className={`p-2 rounded-lg ${
                    isActive 
                      ? 'bg-gradient-to-r from-warm-500 to-cozy-500 text-white' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <span>{item.name}</span>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="ml-auto w-2 h-2 bg-gradient-to-r from-warm-500 to-cozy-500 rounded-full"
                    />
                  )}
                </motion.div>
              </Link>
            );
          })}
        </nav>

        {/* Family Stats */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-family-50 to-cozy-50 rounded-xl p-4 border border-family-200"
          >
            <h3 className="font-medium text-gray-800 mb-2 font-casual">Family Stats</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Members</span>
                <span className="font-medium text-family-600">12</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Generations</span>
                <span className="font-medium text-cozy-600">3</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Stories</span>
                <span className="font-medium text-warm-600">8</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 pt-16">
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="h-screen overflow-hidden"
        >
          {children}
        </motion.main>
      </div>

      {/* Background Decorations */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-warm-200 to-cozy-200 rounded-full filter blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-family-200 to-nature-200 rounded-full filter blur-3xl"
        />
      </div>
    </div>
  );
}
