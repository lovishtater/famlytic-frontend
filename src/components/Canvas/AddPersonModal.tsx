'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  XMarkIcon, 
  UserIcon, 
  CameraIcon,
  SparklesIcon,
  HeartIcon,
} from '@heroicons/react/24/outline';

interface AddPersonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (person: {
    name: string;
    nickname?: string;
    birthdate?: string;
    relationship: string;
    notes?: string;
  }) => void;
}

const relationships = [
  { id: 'parent', label: 'Parent', icon: '👨‍👩‍👧‍👦', color: 'from-family-500 to-family-600' },
  { id: 'child', label: 'Child', icon: '👶', color: 'from-nature-500 to-nature-600' },
  { id: 'sibling', label: 'Sibling', icon: '👫', color: 'from-warm-500 to-warm-600' },
  { id: 'spouse', label: 'Spouse', icon: '💕', color: 'from-cozy-500 to-cozy-600' },
  { id: 'relative', label: 'Relative', icon: '👪', color: 'from-canvas-500 to-canvas-600' },
  { id: 'friend', label: 'Friend', icon: '👥', color: 'from-gray-500 to-gray-600' },
];

export function AddPersonModal({ isOpen, onClose, onAdd }: AddPersonModalProps): JSX.Element {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    nickname: '',
    birthdate: '',
    relationship: '',
    notes: ''
  });

  const handleSubmit = (e?: React.FormEvent): void => {
    if (e) {
      e.preventDefault();
    }
    
    if (!formData.name || !formData.relationship) return;
    
    onAdd({
      name: formData.name,
      nickname: formData.nickname,
      birthdate: formData.birthdate,
      relationship: formData.relationship,
      notes: formData.notes
    });
    
    onClose();
    setStep(1);
    setFormData({
      name: '',
      nickname: '',
      birthdate: '',
      relationship: '',
      notes: ''
    });
  };

  const handleRelationshipSelect = (relationshipId: string): void => {
    setFormData(prev => ({ ...prev, relationship: relationshipId }));
    setStep(2);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md mx-4 max-h-[95vh] overflow-hidden"
          >
            <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl border border-gray-200/50 overflow-hidden flex flex-col max-h-[95vh]">
              {/* Header */}
              <div className="relative p-4 bg-gradient-to-r from-warm-50 to-cozy-50 border-b border-gray-200/50 flex-shrink-0">
                <button
                  onClick={onClose}
                  className="absolute top-3 right-3 p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-white/50 transition-colors"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
                
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-12 h-12 bg-gradient-to-br from-warm-400 to-cozy-500 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg"
                  >
                    <SparklesIcon className="w-6 h-6 text-white" />
                  </motion.div>
                  <h2 className="text-xl font-bold bg-gradient-to-r from-warm-600 to-cozy-600 bg-clip-text text-transparent font-friendly mb-1">
                    Add Family Member
                  </h2>
                  <p className="text-gray-600 font-casual text-sm">
                    {step === 1 ? 'Choose relationship first' : 'Tell us about them'}
                  </p>
                </div>
              </div>

              {/* Step Progress */}
              <div className="px-4 py-3 border-b border-gray-200/50 flex-shrink-0">
                <div className="flex items-center justify-between">
                  {[1, 2].map((stepNumber) => (
                    <div key={stepNumber} className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        step >= stepNumber
                          ? 'bg-gradient-to-r from-warm-500 to-cozy-500 text-white'
                          : 'bg-gray-200 text-gray-500'
                      }`}>
                        {stepNumber}
                      </div>
                      {stepNumber < 2 && (
                        <div className={`w-12 h-1 mx-2 ${
                          step > stepNumber ? 'bg-gradient-to-r from-warm-500 to-cozy-500' : 'bg-gray-200'
                        }`} />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Content - Scrollable */}
              <div className="p-4 overflow-y-auto flex-1">
                {step === 1 ? (
                  /* Step 1: Choose Relationship */
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3 font-casual">
                      How are they related to you?
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      {relationships.map((rel) => (
                        <motion.button
                          key={rel.id}
                          onClick={() => handleRelationshipSelect(rel.id)}
                          className="p-3 rounded-xl border-2 border-gray-200 hover:border-warm-300 hover:bg-gradient-to-br hover:from-warm-50 hover:to-cozy-50 transition-all duration-200 text-left font-casual"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex items-center space-x-2">
                            <span className="text-xl">{rel.icon}</span>
                            <div>
                              <p className="font-medium text-gray-800 text-sm">{rel.label}</p>
                              <p className="text-xs text-gray-500 capitalize">{rel.id}</p>
                            </div>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                ) : (
                  /* Step 2: Person Details */
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3 font-casual">
                      Tell us about {formData.relationship}
                    </h3>
                    
                    <div className="space-y-3">
                      {/* Name */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 font-casual">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="Enter their full name"
                          className="input-canvas"
                          required
                        />
                      </div>

                      {/* Nickname */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 font-casual">
                          Nickname (optional)
                        </label>
                        <input
                          type="text"
                          value={formData.nickname}
                          onChange={(e) => setFormData(prev => ({ ...prev, nickname: e.target.value }))}
                          placeholder="How do you call them?"
                          className="input-canvas"
                        />
                      </div>

                      {/* Birthdate */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 font-casual">
                          Birthdate (optional)
                        </label>
                        <input
                          type="date"
                          value={formData.birthdate}
                          onChange={(e) => setFormData(prev => ({ ...prev, birthdate: e.target.value }))}
                          className="input-canvas"
                        />
                      </div>

                      {/* Notes */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 font-casual">
                          Notes (optional)
                        </label>
                        <textarea
                          value={formData.notes}
                          onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                          placeholder="Any special memories or notes about them?"
                          rows={2}
                          className="input-canvas resize-none"
                        />
                      </div>

                      {/* Actions */}
                      <div className="flex space-x-3 pt-2">
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-casual font-medium text-sm"
                        >
                          Back
                        </button>
                        <button
                          type="button"
                          onClick={handleSubmit}
                          disabled={!formData.name}
                          className="flex-1 px-4 py-2 bg-gradient-to-r from-warm-500 to-cozy-500 text-white rounded-xl hover:from-warm-600 hover:to-cozy-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-casual font-medium text-sm"
                        >
                          Add to Family Tree
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
