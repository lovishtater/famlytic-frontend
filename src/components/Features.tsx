'use client';

import { motion } from 'framer-motion';
import {
  ShareIcon,
  CalendarDaysIcon,
  GlobeAltIcon,
  SparklesIcon,
  EyeIcon,
  HeartIcon,
} from '@heroicons/react/24/outline';

const features = [
  {
    icon: ShareIcon,
    title: 'Family Tree Visualization',
    description: 'Beautiful, interactive family tree with drag-and-drop navigation and focus person feature.',
    benefits: ['Focus person centered view', 'Smooth animations', 'Responsive design', 'Multiple relationship types'],
  },
  {
    icon: CalendarDaysIcon,
    title: 'Timeline & Events',
    description: 'Chronological view of family events with detailed descriptions and media support.',
    benefits: ['Birth & death dates', 'Marriage ceremonies', 'Custom events', 'Photo galleries'],
  },
  {
    icon: GlobeAltIcon,
    title: 'Geographic Mapping',
    description: 'Visualize family locations worldwide with interactive maps and travel patterns.',
    benefits: ['Interactive Leaflet maps', 'Location clustering', 'Travel visualization', 'Population density'],
  },
  {
    icon: SparklesIcon,
    title: 'AI-Powered Queries',
    description: 'Natural language interface to explore family relationships and discover connections.',
    benefits: ['Natural conversation', 'Smart suggestions', 'Relationship discovery', 'Pattern recognition'],
  },
  {
    icon: EyeIcon,
    title: 'Advanced Analytics',
    description: 'Deep insights into family patterns, demographics, and historical trends.',
    benefits: ['Demographic analysis', 'Pattern recognition', 'Statistical insights', 'Visual reports'],
  },
  {
    icon: HeartIcon,
    title: 'Collaborative Sharing',
    description: 'Share family discoveries with relatives through secure, invitation-based access.',
    benefits: ['Secure sharing', 'Role-based access', 'Real-time updates', 'Privacy controls'],
  },
];

export function Features(): JSX.Element {
  return (
    <section className="py-24 lg:py-32 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-6 font-display">
            Powerful Features for Family Discovery
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Explore your family history with state-of-the-art technology and intuitive design
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="card hover:shadow-xl transition-all duration-300 hover:-translate-y-2 h-full">
                {/* Icon */}
                <div className="w-16 h-16 mb-6 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4 group-hover:text-primary-600 transition-colors duration-200">
                  {feature.title}
                </h3>
                
                <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                  {feature.description}
                </p>

                {/* Benefits list */}
                <ul className="space-y-2">
                  {feature.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                      <div className="w-2 h-2 bg-primary-500 rounded-full mr-3 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>

                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl -z-10" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 rounded-3xl p-8 lg:p-12">
            <h3 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              Built for Modern Families
            </h3>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-3xl mx-auto">
              Whether you're tracing your ancestry, documenting current family connections, 
              or exploring genealogical mysteries, Famlytic provides the tools you need.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary px-8 py-4">
                See Features in Action
              </button>
              <button className="btn-outline px-8 py-4">
                Read Documentation
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
