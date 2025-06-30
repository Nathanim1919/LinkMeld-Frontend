import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSettings, FiTrash2, FiRefreshCw, FiUpload, FiKey, FiStar, FiX, FiCheck } from "react-icons/fi";
import { RiShieldKeyholeLine } from "react-icons/ri";
import { resetData } from "../api/account.api";

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
      className="fixed inset-0 bg-black/70 backdrop-blur-xl z-50 flex items-center justify-center p-4"
      onClick={closeModal}
    >
      <motion.div 
        initial={{ y: 20, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 20, opacity: 0, scale: 0.98 }}
        transition={{ 
          type: "spring", 
          damping: 25,
          stiffness: 300
        }}
        className="bg-[#1c1c1e] rounded-2xl border border-[#2c2c2e] shadow-2xl shadow-black/50 max-w-md w-full overflow-hidden"
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
    borderColor?: string;
  }> = ({ icon, title, description, onClick, color = "bg-[#2c2c2e]", borderColor = "border-[#3a3a3c]" }) => (
    <motion.button
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`w-full p-5 rounded-xl ${color} border ${borderColor} transition-all text-left group overflow-hidden relative`}
    >
      {/* Hover effect */}
      <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="flex items-center gap-4 relative z-10">
        <div className={`p-3 rounded-xl ${color.includes('indigo') ? 'bg-indigo-500/10' : color.includes('amber') ? 'bg-amber-500/10' : color.includes('red') ? 'bg-red-500/10' : 'bg-white/5'} border ${borderColor}`}>
          {icon}
        </div>
        <div>
          <h3 className="font-medium text-white">{title}</h3>
          <p className="text-sm text-[#aeaeb2] mt-1">{description}</p>
        </div>
      </div>
    </motion.button>
  );

  const handleResetData = async () => {
    try {
      console.log("Resetting all data...");
      await resetData();
      closeModal();
      alert("All data has been reset successfully.");
    } catch (error) {
      console.error("Error resetting data:", error);
      alert("Failed to reset data. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-[#000000] text-[#f5f5f7] p-6">
      <div className="max-w-3xl mx-auto">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, type: "spring" }}
          className="flex flex-col md:flex-row items-center gap-6 mb-12"
        >
          <div className="relative">
            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-[#0071e3] to-[#2997ff] flex items-center justify-center">
              <span className="text-4xl font-semibold text-white">U</span>
            </div>
            <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-1.5 border-2 border-[#1c1c1e]">
              <FiCheck className="text-xs text-white" />
            </div>
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold text-white">
              User Profile
            </h1>
            <p className="text-[#aeaeb2] mt-1">Joined January 2030</p>
          </div>
        </motion.div>

        {/* Action Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ActionButton
            icon={<FiUpload className="text-xl text-blue-400" />}
            title="Export Data"
            description="Download all your data in JSON format"
            onClick={() => setActiveModal('export')}
            color="bg-[#2c2c2e]"
            borderColor="border-[#3a3a3c]"
          />
          
          <ActionButton
            icon={<RiShieldKeyholeLine className="text-xl text-blue-400" />}
            title="Gemini API Key"
            description="Add or update your API key"
            onClick={() => setActiveModal('apiKey')}
            color="bg-[#2c2c2e]"
            borderColor="border-[#3a3a3c]"
          />
          
          <ActionButton
            icon={<FiStar className="text-xl text-amber-400" />}
            title={isSubscribed ? "Premium Member" : "Upgrade Subscription"}
            description={isSubscribed ? "Manage your subscription" : "Unlock premium features"}
            onClick={() => setActiveModal('upgrade')}
            color={isSubscribed ? "bg-amber-500/10" : "bg-[#2c2c2e]"}
            borderColor={isSubscribed ? "border-amber-500/30" : "border-[#3a3a3c]"}
          />
          
          <ActionButton
            icon={<FiRefreshCw className="text-xl text-gray-400" />}
            title="Reset All Data"
            description="Start fresh with a clean slate"
            onClick={() => setActiveModal('reset')}
            color="bg-[#2c2c2e]"
            borderColor="border-[#3a3a3c]"
          />
          
          <ActionButton
            icon={<FiTrash2 className="text-xl text-red-400" />}
            title="Delete Account"
            description="Permanently remove your account"
            onClick={() => setActiveModal('delete')}
            color="bg-red-500/10"
            borderColor="border-red-500/30"
          />
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {activeModal === 'export' && (
          <ModalWrapper>
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-white">Export Data</h2>
                <button onClick={closeModal} className="text-[#aeaeb2] hover:text-white p-1">
                  <FiX className="text-xl" />
                </button>
              </div>
              <p className="text-[#aeaeb2] mb-6">
                This will generate a JSON file containing all your account data, including settings and preferences.
              </p>
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-xl font-medium flex-1 text-center transition-colors"
                >
                  Export Now
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={closeModal}
                  className="px-6 py-3 bg-[#2c2c2e] hover:bg-[#3a3a3c] rounded-xl font-medium flex-1 text-center transition-colors"
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
                <h2 className="text-2xl font-semibold text-white">Gemini API Key</h2>
                <button onClick={closeModal} className="text-[#aeaeb2] hover:text-white p-1">
                  <FiX className="text-xl" />
                </button>
              </div>
              <div className="mb-6">
                <label className="block text-[#aeaeb2] mb-2">Enter your API Key</label>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="w-full bg-[#2c2c2e] border border-[#3a3a3c] rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="sk-...your-api-key"
                />
              </div>
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-xl font-medium flex-1 text-center transition-colors"
                >
                  Save Key
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={closeModal}
                  className="px-6 py-3 bg-[#2c2c2e] hover:bg-[#3a3a3c] rounded-xl font-medium flex-1 text-center transition-colors"
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
                <h2 className="text-2xl font-semibold text-white">
                  {isSubscribed ? "Premium Membership" : "Upgrade to Premium"}
                </h2>
                <button onClick={closeModal} className="text-[#aeaeb2] hover:text-white p-1">
                  <FiX className="text-xl" />
                </button>
              </div>
              
              {isSubscribed ? (
                <>
                  <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 mb-6">
                    <div className="flex items-center gap-3 text-amber-400">
                      <FiStar className="text-xl" />
                      <h3 className="font-medium">You're a Premium Member</h3>
                    </div>
                    <p className="text-[#aeaeb2] mt-2 text-sm">
                      Your subscription renews automatically on January 15, 2031.
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-6 py-3 bg-[#2c2c2e] hover:bg-[#3a3a3c] border border-[#3a3a3c] text-red-400 rounded-xl font-medium transition-colors"
                  >
                    Cancel Subscription
                  </motion.button>
                </>
              ) : (
                <>
                  <div className="grid grid-cols-1 gap-4 mb-6">
                    <div className="bg-[#2c2c2e] border border-[#3a3a3c] rounded-xl p-5">
                      <h3 className="font-medium text-lg mb-2">Basic</h3>
                      <p className="text-[#aeaeb2] text-sm mb-4">Free forever</p>
                      <ul className="text-sm text-[#aeaeb2] space-y-3">
                        <li className="flex items-center gap-3">
                          <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                            <FiCheck className="text-green-500 text-xs" />
                          </div>
                          <span>Core features</span>
                        </li>
                        <li className="flex items-center gap-3">
                          <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                            <FiCheck className="text-green-500 text-xs" />
                          </div>
                          <span>Limited API calls</span>
                        </li>
                      </ul>
                    </div>
                    <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/30 rounded-xl p-5 relative overflow-hidden">
                      <div className="absolute top-4 right-4 bg-blue-500/20 text-blue-400 text-xs px-2.5 py-1 rounded-full">
                        POPULAR
                      </div>
                      <div>
                        <h3 className="font-medium text-lg mb-2">Premium</h3>
                        <p className="text-blue-400 text-sm mb-4">$9.99/month</p>
                      </div>
                      <ul className="text-sm text-[#f5f5f7] space-y-3">
                        <li className="flex items-center gap-3">
                          <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                            <FiCheck className="text-green-500 text-xs" />
                          </div>
                          <span>Unlimited API calls</span>
                        </li>
                        <li className="flex items-center gap-3">
                          <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                            <FiCheck className="text-green-500 text-xs" />
                          </div>
                          <span>Priority support</span>
                        </li>
                        <li className="flex items-center gap-3">
                          <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                            <FiCheck className="text-green-500 text-xs" />
                          </div>
                          <span>Advanced analytics</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-xl font-medium text-white transition-all"
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
                <h2 className="text-2xl font-semibold text-white">Reset All Data</h2>
                <button onClick={closeModal} className="text-[#aeaeb2] hover:text-white p-1">
                  <FiX className="text-xl" />
                </button>
              </div>
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-6">
                <div className="flex items-center gap-3 text-red-400">
                  <FiRefreshCw className="text-xl" />
                  <h3 className="font-medium">Warning: This cannot be undone</h3>
                </div>
                <p className="text-[#aeaeb2] mt-2 text-sm">
                  All your data, settings, and preferences will be permanently deleted.
                  We recommend exporting your data first.
                </p>
              </div>
              <div className="flex gap-3">
                <motion.button
                  onClick={handleResetData}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 rounded-xl font-medium flex-1 transition-colors"
                >
                  Reset Everything
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={closeModal}
                  className="px-6 py-3 bg-[#2c2c2e] hover:bg-[#3a3a3c] rounded-xl font-medium flex-1 transition-colors"
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
                <h2 className="text-2xl font-semibold text-white">Delete Account</h2>
                <button onClick={closeModal} className="text-[#aeaeb2] hover:text-white p-1">
                  <FiX className="text-xl" />
                </button>
              </div>
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-6">
                <div className="flex items-center gap-3 text-red-400">
                  <FiTrash2 className="text-xl" />
                  <h3 className="font-medium">Permanent Account Deletion</h3>
                </div>
                <p className="text-[#aeaeb2] mt-2 text-sm">
                  This will permanently delete your account and all associated data.
                  This action cannot be undone.
                </p>
              </div>
              <div className="mb-4">
                <label className="flex items-center gap-3 text-[#aeaeb2] text-sm">
                  <input 
                    type="checkbox" 
                    className="rounded bg-[#2c2c2e] border-[#3a3a3c] focus:ring-blue-500 focus:border-blue-500" 
                  />
                  I understand this action is irreversible
                </label>
              </div>
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 bg-red-500 hover:bg-red-600 rounded-xl font-medium flex-1 transition-colors"
                >
                  Delete Account
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={closeModal}
                  className="px-6 py-3 bg-[#2c2c2e] hover:bg-[#3a3a3c] rounded-xl font-medium flex-1 transition-colors"
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