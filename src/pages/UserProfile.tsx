import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSettings, FiTrash2, FiRefreshCw, FiUpload, FiKey, FiStar, FiX, FiCheck } from "react-icons/fi";
import { RiShieldKeyholeLine } from "react-icons/ri";

export const UserProfile = () => {
  const [activeModal, setActiveModal] = useState<null | 
    'export' | 'apiKey' | 'upgrade' | 'delete' | 'reset'
  >(null);
  const [apiKey, setApiKey] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const closeModal = () => setActiveModal(null);

  const ModalWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-lg z-50 flex items-center justify-center p-4"
      onClick={closeModal}
    >
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ type: "spring", damping: 25 }}
        className="bg-gray-900 rounded-xl border border-gray-800 shadow-2xl shadow-black/50 max-w-md w-full overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </motion.div>
    </motion.div>
  );

  const ActionButton: React.FC<{
    icon: React.ReactNode;
    title: string;
    description: string;
    onClick: () => void;
    color?: string;
  }> = ({ icon, title, description, onClick, color = "bg-indigo-900/50" }) => (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`w-full p-4 rounded-lg ${color} border border-gray-800 hover:border-indigo-500 transition-all text-left`}
    >
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-lg bg-black/30 text-indigo-400">
          {icon}
        </div>
        <div>
          <h3 className="font-medium text-white">{title}</h3>
          <p className="text-sm text-gray-400 mt-1">{description}</p>
        </div>
      </div>
    </motion.button>
  );

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col md:flex-row items-center gap-6 mb-10"
        >
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-600 to-purple-800 flex items-center justify-center text-3xl font-bold">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">U</span>
            </div>
            <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-1 border-2 border-gray-950">
              <FiCheck className="text-xs" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
              User Profile
            </h1>
            <p className="text-gray-400">Joined January 2030</p>
          </div>
        </motion.div>

        {/* Action Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ActionButton
            icon={<FiUpload className="text-xl" />}
            title="Export Data"
            description="Download all your data in JSON format"
            onClick={() => setActiveModal('export')}
          />
          
          <ActionButton
            icon={<RiShieldKeyholeLine className="text-xl" />}
            title="Gemini API Key"
            description="Add or update your API key"
            onClick={() => setActiveModal('apiKey')}
          />
          
          <ActionButton
            icon={<FiStar className="text-xl" />}
            title={isSubscribed ? "Premium Member" : "Upgrade Subscription"}
            description={isSubscribed ? "Manage your subscription" : "Unlock premium features"}
            onClick={() => setActiveModal('upgrade')}
            color={isSubscribed ? "bg-amber-900/30" : "bg-indigo-900/50"}
          />
          
          <ActionButton
            icon={<FiRefreshCw className="text-xl" />}
            title="Reset All Data"
            description="Start fresh with a clean slate"
            onClick={() => setActiveModal('reset')}
            color="bg-gray-800/50"
          />
          
          <ActionButton
            icon={<FiTrash2 className="text-xl" />}
            title="Delete Account"
            description="Permanently remove your account"
            onClick={() => setActiveModal('delete')}
            color="bg-red-900/50"
          />
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {activeModal === 'export' && (
          <ModalWrapper>
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Export Data</h2>
                <button onClick={closeModal} className="text-gray-400 hover:text-white">
                  <FiX className="text-xl" />
                </button>
              </div>
              <p className="text-gray-400 mb-6">
                This will generate a JSON file containing all your account data, including settings and preferences.
              </p>
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-medium flex-1 text-center"
                >
                  Export Now
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={closeModal}
                  className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg font-medium flex-1 text-center"
                >
                  Cancel
                </motion.button>
              </div>
            </div>
          </ModalWrapper>
        )}

        {activeModal === 'apiKey' && (
          <ModalWrapper>
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Gemini API Key</h2>
                <button onClick={closeModal} className="text-gray-400 hover:text-white">
                  <FiX className="text-xl" />
                </button>
              </div>
              <div className="mb-6">
                <label className="block text-gray-400 mb-2">Enter your API Key</label>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="sk-...your-api-key"
                />
              </div>
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-medium flex-1 text-center"
                >
                  Save Key
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={closeModal}
                  className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg font-medium flex-1 text-center"
                >
                  Cancel
                </motion.button>
              </div>
            </div>
          </ModalWrapper>
        )}

        {activeModal === 'upgrade' && (
          <ModalWrapper>
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">
                  {isSubscribed ? "Premium Membership" : "Upgrade to Premium"}
                </h2>
                <button onClick={closeModal} className="text-gray-400 hover:text-white">
                  <FiX className="text-xl" />
                </button>
              </div>
              
              {isSubscribed ? (
                <>
                  <div className="bg-gray-800/50 border border-amber-500/30 rounded-lg p-4 mb-6">
                    <div className="flex items-center gap-3 text-amber-400">
                      <FiStar className="text-xl" />
                      <h3 className="font-medium">You're a Premium Member</h3>
                    </div>
                    <p className="text-gray-400 mt-2 text-sm">
                      Your subscription renews automatically on January 15, 2031.
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-6 py-3 bg-red-600/20 hover:bg-red-600/30 border border-red-600/50 text-red-400 rounded-lg font-medium"
                  >
                    Cancel Subscription
                  </motion.button>
                </>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                      <h3 className="font-medium mb-2">Basic</h3>
                      <p className="text-gray-400 text-sm mb-3">Free forever</p>
                      <ul className="text-sm text-gray-400 space-y-2">
                        <li className="flex items-center gap-2">
                          <FiCheck className="text-green-500" /> Core features
                        </li>
                        <li className="flex items-center gap-2">
                          <FiCheck className="text-green-500" /> Limited API calls
                        </li>
                      </ul>
                    </div>
                    <div className="bg-gradient-to-br from-indigo-900/50 to-purple-900/30 border border-indigo-500/30 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium mb-2">Premium</h3>
                          <p className="text-indigo-300 text-sm">$9.99/month</p>
                        </div>
                        <div className="bg-indigo-500/10 text-indigo-400 text-xs px-2 py-1 rounded">
                          POPULAR
                        </div>
                      </div>
                      <ul className="text-sm text-gray-300 space-y-2 mt-3">
                        <li className="flex items-center gap-2">
                          <FiCheck className="text-green-500" /> Unlimited API calls
                        </li>
                        <li className="flex items-center gap-2">
                          <FiCheck className="text-green-500" /> Priority support
                        </li>
                        <li className="flex items-center gap-2">
                          <FiCheck className="text-green-500" /> Advanced analytics
                        </li>
                      </ul>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-lg font-medium"
                    onClick={() => setIsSubscribed(true)}
                  >
                    Upgrade Now
                  </motion.button>
                </>
              )}
            </div>
          </ModalWrapper>
        )}

        {activeModal === 'reset' && (
          <ModalWrapper>
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Reset All Data</h2>
                <button onClick={closeModal} className="text-gray-400 hover:text-white">
                  <FiX className="text-xl" />
                </button>
              </div>
              <div className="bg-red-900/10 border border-red-700/30 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-3 text-red-400">
                  <FiRefreshCw className="text-xl" />
                  <h3 className="font-medium">Warning: This cannot be undone</h3>
                </div>
                <p className="text-gray-400 mt-2 text-sm">
                  All your data, settings, and preferences will be permanently deleted.
                  We recommend exporting your data first.
                </p>
              </div>
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 bg-red-600/20 hover:bg-red-600/30 border border-red-600/50 text-red-400 rounded-lg font-medium flex-1"
                >
                  Reset Everything
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={closeModal}
                  className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg font-medium flex-1"
                >
                  Cancel
                </motion.button>
              </div>
            </div>
          </ModalWrapper>
        )}

        {activeModal === 'delete' && (
          <ModalWrapper>
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Delete Account</h2>
                <button onClick={closeModal} className="text-gray-400 hover:text-white">
                  <FiX className="text-xl" />
                </button>
              </div>
              <div className="bg-red-900/10 border border-red-700/30 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-3 text-red-400">
                  <FiTrash2 className="text-xl" />
                  <h3 className="font-medium">Permanent Account Deletion</h3>
                </div>
                <p className="text-gray-400 mt-2 text-sm">
                  This will permanently delete your account and all associated data.
                  This action cannot be undone.
                </p>
              </div>
              <div className="mb-4">
                <label className="flex items-center gap-2 text-gray-400 text-sm">
                  <input type="checkbox" className="rounded bg-gray-800 border-gray-700" />
                  I understand this action is irreversible
                </label>
              </div>
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-medium flex-1"
                >
                  Delete Account
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={closeModal}
                  className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg font-medium flex-1"
                >
                  Cancel
                </motion.button>
              </div>
            </div>
          </ModalWrapper>
        )}
      </AnimatePresence>
    </div>
  );
};