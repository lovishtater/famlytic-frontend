'use client';

import { motion } from 'framer-motion';
import { ArrowRightIcon, RocketLaunchIcon } from '@heroicons/react/24/outline';

export function CallToAction(): JSX.Element {
  return (
    <section className="py-24 lg:py-32 bg-gradient-to-r from-primary-600 to-accent-600 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-8">
            <RocketLaunchIcon className="w-10 h-10 text-white" />
          </div>
          
          <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6 font-display">
            Ready to Discover Your Family?
          </h2>
          
          <p className="text-xl lg:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
            Join thousands of families exploring their heritage with AI-powered insights 
            and beautiful visualization tools.
          </p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <button className="group bg-white text-primary-600 hover:bg-slate-50 px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-200 flex items-center">
              Get Started Free
              <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
            
            <button className="group border-2 border-white text-white hover:bg-white hover:text-primary-600 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-200 flex items-center">
              Schedule Demo
              <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="mt-12 text-white/80"
          >
            <p className="text-sm">
              ✨ No credit card required • 🚀 Setup in minutes • 👥 Support for unlimited family members
            </p>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Gradient overlay */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 dark:from-slate-900 to-transparent" />
    </section>
  );
}