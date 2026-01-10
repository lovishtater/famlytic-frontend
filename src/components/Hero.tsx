'use client';

import { useState } from 'react';
import { 
  ArrowRightIcon, 
  SparklesIcon, 
  UserGroupIcon,
  MapIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

export function Hero(): JSX.Element {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent): void => {
    e.preventDefault();
    // Navigate to dashboard with search
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-blue-900">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-40" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="text-center">
          {/* Logo/Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <h1 className="text-5xl lg:text-7xl font-bold bg-white bg-clip-text text-transparent font-display">
              Famlytic
            </h1>
            <p className="mt-4 text-xl lg:text-2xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Discover your family story through intelligent visualization and AI-powered insights
            </p>
          </motion.div>

          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-2xl mx-auto mb-8"
          >
            <form onSubmit={handleSearch} className="relative">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for family members, relationships, or ask anything..."
                  className="w-full px-6 py-4 pr-14 text-lg rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:border-primary-500 focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-800 shadow-lg transition-all duration-200"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary-600 hover:bg-primary-700 text-white p-2 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <ArrowRightIcon className="w-5 h-5" />
                </button>
              </div>
            </form>
          </motion.div>

          {/* Feature highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12"
          >
            {[
              {
                icon: UserGroupIcon,
                title: 'Family Tree',
                description: 'Visual family relationships'
              },
              {
                icon: SparklesIcon,
                title: 'AI Insights',
                description: 'Intelligent discoveries'
              },
              {
                icon: MapIcon,
                title: 'Geographic View',
                description: 'Family locations worldwide'
              },
              {
                icon: ChatBubbleLeftRightIcon,
                title: 'Natural Language',
                description: 'Ask questions naturally'
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="text-center p-4"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-white dark:bg-slate-800 rounded-2xl shadow-lg flex items-center justify-center">
                  <feature.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button className="btn-primary px-8 py-4 text-lg shadow-xl hover:shadow-2xl">
              Start Exploring
            </button>
            <button className="btn-outline px-8 py-4 text-lg">
              View Demo
            </button>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-slate-900 to-transparent" />
    </div>
  );
}

