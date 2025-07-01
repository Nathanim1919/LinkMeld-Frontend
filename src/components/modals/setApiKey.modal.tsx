import { useState } from "react";
import { ModalWrapper } from "./ModalWrapper"
import { setGeminiApiKey } from "../../api/account.api";
import { FiX, FiEye, FiEyeOff, FiExternalLink } from "react-icons/fi";
import { motion } from "framer-motion";
import { toast } from 'sonner';

export const SetApiKeyModal: React.FC<{ 
  closeModal: () => void, 
  existingApiKey?: string 
}> = ({
  closeModal,
  existingApiKey
}) => {
  const [apiKey, setApiKey] = useState(existingApiKey || "");
  const [showApiKey, setShowApiKey] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const handleSettingGeminiApiKey = async () => {
    if (!apiKey) {
      toast.warning('Please enter a valid Gemini API Key');
      return;
    }
    
    setIsSaving(true);
    try {
      await setGeminiApiKey(apiKey);
      toast.success(existingApiKey ? 'API Key updated' : 'API Key saved');
      closeModal();
    } catch (error) {
      console.error("Error setting Gemini API Key:", error);
      toast.error('Failed to save API Key, please try again');
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <ModalWrapper closeModal={closeModal}>
      <div className="p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-white">Gemini API Key</h2>
          <button 
            onClick={closeModal} 
            className="text-[#aeaeb2] hover:text-white p-1 transition-colors"
          >
            <FiX className="text-xl" />
          </button>
        </div>
        
        <div className="mb-6">
          <label className="block text-[#aeaeb2] mb-2 text-sm font-medium">
            {existingApiKey ? "Update your API Key" : "Enter your API Key"}
          </label>
          <div className="relative">
            <input
              type={showApiKey ? "text" : "password"}
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full bg-[#2c2c2e] border border-[#3a3a3c] rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pr-12"
              placeholder="sk-...your-api-key"
            />
            {apiKey && (
              <button
                onClick={() => setShowApiKey(!showApiKey)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#aeaeb2] hover:text-white transition-colors"
              >
                {showApiKey ? <FiEyeOff /> : <FiEye />}
              </button>
            )}
          </div>
        </div>
        
        {!existingApiKey && (
          <div className="mb-6 bg-[#2c2c2e]/50 rounded-xl p-4">
            <h3 className="text-white font-medium mb-2 flex items-center">
              <span className="w-4 h-4 rounded-full bg-blue-500 mr-2 flex items-center justify-center text-xs">?</span>
              How to get your API key
            </h3>
            <p className="text-[#aeaeb2] text-sm mb-3">
              You can obtain your Gemini API key from the Google AI Studio dashboard.
            </p>
            <a
              href="https://ai.google.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-400 text-sm flex items-center transition-colors"
            >
              Visit Google AI Studio <FiExternalLink className="ml-1" />
            </a>
          </div>
        )}
        
        <div className="flex gap-3">
          <motion.button
            onClick={handleSettingGeminiApiKey}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isSaving}
            className={`px-6 py-3 rounded-xl font-medium flex-1 text-center transition-colors ${
              isSaving 
                ? "bg-blue-600 cursor-not-allowed" 
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {isSaving ? (
              <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : existingApiKey ? (
              "Update Key"
            ) : (
              "Save Key"
            )}
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
  )
}