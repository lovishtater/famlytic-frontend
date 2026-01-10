'use client';

import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { motion } from 'framer-motion';
import { apiService } from '@/services/api';
import toast from 'react-hot-toast';
import { 
  PlusIcon, 
  MagnifyingGlassIcon, 
  UserIcon,
  CalendarDaysIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline';
import type { Person } from '@/types';

export default function PeoplePage(): JSX.Element {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    fetchPeople();
  }, []);

  const fetchPeople = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await apiService.getPeople();
      if (response.success) {
        setPeople(response.data || []);
      } else {
        toast.error('Failed to fetch people');
      }
    } catch (error) {
      console.error('Error fetching people:', error);
      toast.error('Failed to fetch people');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredPeople = people.filter(person =>
    person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (person.nickname && person.nickname.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const formatDate = (dateString?: string): string => {
    if (!dateString) return 'Unknown';
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                Family Members
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                Manage your family members and genealogy data
              </p>
            </div>
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={() => setShowAddModal(true)}
              className="btn-primary flex items-center"
            >
              <PlusIcon className="w-5 h-5 mr-2" />
              Add Person
            </motion.button>
          </div>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search family members..."
              className="input-field pl-10"
            />
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                  {people.length}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  Total Members
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent-600 dark:text-accent-400">
                  {people.filter(p => p.location?.coordinates).length}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  With Location
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary-600 dark:text-secondary-400">
                  {people.filter(p => p.birthdate).length}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  With Birthdate
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {people.filter(p => p.nickname).length}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  With Nickname
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* People Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="card animate-pulse">
                  <div className="w-16 h-16 bg-slate-200 dark:bg-slate-700 rounded-full mb-4" />
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded mb-2" />
                  <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-2/3 mb-2" />
                  <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : filteredPeople.length === 0 ? (
            <div className="text-center py-12">
              <UserIcon className="w-16 x-16 text-slate-400 dark:text-slate-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
                {searchQuery ? 'No members found' : 'No family members yet'}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                {searchQuery 
                  ? 'Try adjusting your search terms'
                  : 'Start building your family tree by adding your first family member'
                }
              </p>
              {!searchQuery && (
                <button
                  onClick={() => setShowAddModal(true)}
                  className="btn-primary"
                >
                  <PlusIcon className="w-5 h-5 mr-2" />
                  Add First Person
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPeople.map((person, index) => (
                <motion.div
                  key={person.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="card hover:shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer"
                >
                  {/* Avatar */}
                  <div className="flex items-start space-x-4 mb-4">
                    {person.photo ? (
                      <img
                        src={person.photo}
                        alt={person.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                        {person.name[0].toUpperCase()}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 truncate">
                        {person.name}
                      </h3>
                      {person.nickname && (
                        <p className="text-sm text-primary-600 dark:text-primary-400">
                          "{person.nickname}"
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-2">
                    {person.birthdate && (
                      <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                        <CalendarDaysIcon className="w-4 h-4 mr-2" />
                        Born: {formatDate(person.birthdate)}
                      </div>
                    )}
                    
                    {person.location && (
                      <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                        <MapPinIcon className="w-4 h-4 mr-2" />
                        {person.location.address || 'Location available'}
                      </div>
                    )}

                    <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        ID: {person.id.slice(0, 8)}...
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
