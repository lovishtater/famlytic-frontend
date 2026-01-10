'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { DevicePhoneMobileIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline';

export function DashboardPreview(): JSX.Element {
  const [activeTab, setActiveTab] = useState<'desktop' | 'mobile'>('desktop');

  return (
    <section className="py-24 lg:py-32 bg-slate-50 dark:bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-6 font-display">
            See Famlytic in Action
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-8">
            Experience the intuitive interface designed for both desktop and mobile exploration
          </p>
          
          {/* Device selector */}
          <div className="flex justify-center mb-12">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-1 shadow-lg border border-slate-200 dark:border-slate-700">
              <div className="flex">
                <button
                  onClick={() => setActiveTab('desktop')}
                  className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 ${
                    activeTab === 'desktop'
                      ? 'bg-primary-600 text-white shadow-md'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                  }`}
                >
                  <ComputerDesktopIcon className="w-5 h-5 mr-2" />
                  Desktop
                </button>
                <button
                  onClick={() => setActiveTab('mobile')}
                  className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 ${
                    activeTab === 'mobile'
                      ? 'bg-primary-600 text-white shadow-md'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                  }`}
                >
                  <DevicePhoneMobileIcon className="w-5 h-5 mr-2" />
                  Mobile
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Preview container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative"
        >
          {activeTab === 'desktop' ? (
            <div className="relative max-w-5xl mx-auto">
              <div className="bg-slate-800 rounded-xl shadow-2xl border border-slate-700 overflow-hidden">
                {/* Browser bar */}
                <div className="bg-slate-700 px-6 py-4 flex items-center space-x-2">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="flex-1 bg-slate-800 rounded px-4 py-2 text-slate-300 text-sm">
                    famlytic.com/dashboard
                  </div>
                </div>
                
                {/* Desktop mockup */}
                <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800 p-8">
                  <div className="h-full bg-white dark:bg-slate-700 rounded-lg shadow-lg border border-slate-200 dark:border-slate-600">
                    {/* Mock family tree */}
                    <div className="p-6">
                      <div className="flex justify-center mb-8">
                        <div className="w-20 h-20 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center border-4 border-primary-500 shadow-xl">
                          <span className="text-xl font-bold text-primary-700 dark:text-primary-300">JS</span>
                        </div>
                      </div>
                      
                      <div className="flex justify-center space-x-8 mb-8">
                        <div className="text-center">
                          <div className="w-16 h-16 bg-slate-200 dark:bg-slate-600 rounded-full mx-auto mb-2"></div>
                          <div className="text-xs font-medium text-slate-600 dark:text-slate-400">Father</div>
                        </div>
                        <div className="text-center">
                          <div className="w-16 h-16 bg-slate-200 dark:bg-slate-600 rounded-full mx-auto mb-2"></div>
                          <div className="text-xs font-medium text-slate-600 dark:text-slate-400">Mother</div>
                        </div>
                      </div>
                      
                      <div className="flex justify-center space-x-12">
                        <div className="text-center">
                          <div className="w-14 h-14 bg-slate-200 dark:bg-slate-600 rounded-full mx-auto mb-2"></div>
                          <div className="text-xs font-medium text-slate-600 dark:text-slate-400">Brother</div>
                        </div>
                        <div className="text-center">
                          <div className="w-14 h-14 bg-slate-200 dark:bg-slate-600 rounded-full mx-auto mb-2"></div>
                          <div className="text-xs font-medium text-slate-600 dark:text-slate-400">Sister</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-80 h-[600px] bg-slate-800 rounded-[2rem] shadow-2xl border-4 border-slate-700 p-8">
                {/* Mobile mockup */}
                <div className="h-full bg-white dark:bg-slate-700 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-600">
                  {/* Status bar */}
                  <div className="bg-slate-800 rounded-t-2xl px-4 py-2 text-white text-center">
                    <div className="text-xs font-medium">9:41 AM</div>
                  </div>
                  
                  {/* Mobile content */}
                  <div className="p-4 h-full">
                    {/* Simplified mobile tree */}
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center border-4 border-primary-500 shadow-xl mx-auto mb-4">
                        <span className="text-lg font-bold text-primary-700 dark:text-primary-300">JS</span>
                      </div>
                      <div className="text-lg font-bold text-slate-900 dark:text-slate-100">John Smith</div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">Focus Person</div>
                    </div>
                    
                    {/* Mobile navigation */}
                    <div className="space-y-3 mb-6">
                      <div className="bg-slate-100 dark:bg-slate-600 rounded-lg p-3">
                        <div className="text-sm font-medium text-slate-900 dark:text-slate-100">🎄 Family Tree</div>
                      </div>
                      <div className="bg-slate-100 dark:bg-slate-600 rounded-lg p-3">
                        <div className="text-sm font-medium text-slate-900 dark:text-slate-100">🗓️ Timeline</div>
                      </div>
                      <div className="bg-slate-100 dark:bg-slate-600 rounded-lg p-3">
                        <div className="text-sm font-medium text-slate-900 dark:text-slate-100">🗺️ Map View</div>
                      </div>
                      <div className="bg-slate-100 dark:bg-slate-600 rounded-lg p-3">
                        <div className="text-sm font-medium text-slate-900 dark:text-slate-100">💬 AI Chat</div>
                      </div>
                    </div>
                    
                    {/* Chat bubble */}
                    <div className="bg-primary-600 text-white rounded-lg p-3 mb-2 self-end">
                      <div className="text-sm">Who are John's children?</div>
                    </div>
                    <div className="bg-slate-200 dark:bg-slate-600 rounded-lg p-3 mb-3">
                      <div className="text-sm">John has 2 children: Sarah and Michael.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Features preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {[
            {
              title: 'Interactive Tree Navigation',
              description: 'Click and drag to explore different family branches with smooth animations.',
              preview: '🎯 Focus Person Feature'
            },
            {
              title: 'AI-Powered Insights',
              description: 'Ask natural language questions about your family relationships.',
              preview: '🤖 Smart Discoveries'
            },
            {
              title: 'Cross-Platform Design',
              description: 'Seamless experience across desktop, tablet, and mobile devices.',
              preview: '📱 Responsive Everywhere'
            }
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              viewport={{ once: true }}
              className="text-center p-6"
            >
              <div className="text-3xl mb-4">{feature.preview}</div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3">
                {feature.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
