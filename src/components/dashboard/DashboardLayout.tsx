'use client';

import { ReactNode, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  UserGroupIcon,
  ShareIcon,
  CalendarDaysIcon,
  MapIcon,
  ChatBubbleLeftRightIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';

interface DashboardLayoutProps {
  children: ReactNode;
}

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'People', href: '/dashboard/people', icon: UserGroupIcon },
  { name: 'Relationships', href: '/dashboard/relationships', icon: ShareIcon },
  { name: 'Timeline', href: '/dashboard/timeline', icon: CalendarDaysIcon },
  { name: 'Family Tree', href: '/dashboard/tree', icon: ShareIcon },
  { name: 'Map', href: '/dashboard/map', icon: MapIcon },
  { name: 'AI Chat', href: '/dashboard/chat', icon: ChatBubbleLeftRightIcon },
];

export function DashboardLayout({ children }: DashboardLayoutProps): JSX.Element {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Mobile sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            
            {/* Sidebar */}
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: 'tween', duration: 0.2 }}
              className="fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-slate-800 shadow-xl"
            >
              <div className="flex items-center justify-between h-16 px-4 border-b border-slate-200 dark:border-slate-700">
                <h1 className="text-xl font-bold text-primary-600 dark:text-primary-400">
                  Famlytic
                </h1>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>
              
              <nav className="mt-6 px-3">
                {navigation.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center px-3 py-2 rounded-lg mb-2 transition-colors ${
                        isActive
                          ? 'bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700'
                      }`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <item.icon className="w-5 h-5 mr-3" />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white dark:bg-slate-800 shadow-lg border-r border-slate-200 dark:border-slate-700">
          {/* Logo */}
          <div className="flex items-center h-16 px-4 border-b border-slate-200 dark:border-slate-700">
            <h1 className="text-xl font-bold text-primary-600 dark:text-primary-400">
              Famlytic
            </h1>
          </div>
          
          {/* Navigation */}
          <nav className="mt-6 px-3 flex-1">
            {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-3 py-2 rounded-lg mb-2 transition-colors ${
                  isActive
                    ? 'bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </Link>
            );
          })}
          </nav>
          
          {/* User Info */}
          <div className="border-t border-slate-200 dark:border-slate-700 p-4">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center text-white font-bold">
                {session?.user?.name?.[0] || 'A'}
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                  {session?.user?.name || 'Admin User'}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {session?.user?.email || 'admin@famlytic.com'}
                </p>
              </div>
            </div>
            
            <button
              onClick={() => signOut()}
              className="flex items-center w-full px-3 py-2 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
            >
              <ArrowRightOnRectangleIcon className="w-4 h-4 mr-2" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top header */}
        <div className="sticky top-0 z-10 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 lg:hidden"
            >
              <Bars3Icon className="w-6 h-6" />
            </button>
            
            <div className="flex items-center">
              <h1 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Family Tree Management
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-lg text-slate-500 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700">
                <Cog6ToothIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
}
