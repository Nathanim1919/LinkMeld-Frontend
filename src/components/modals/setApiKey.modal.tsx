import { useState } from "react";
import { ModalWrapper } from "./ModalWrapper"
import { setGeminiApiKey } from "../../api/account.api";
import { FiX } from "react-icons/fi";
import { motion } from "framer-motion";

export const SetApiKeyModal:React.FC<{closeModal: () => void}> = ({
    closeModal
}) => {
     const [apiKey, setApiKey] = useState("");
     
      const handleSettingGeminiApiKey = async ()=> {
        if (!apiKey) {
          alert("Please enter a valid Gemini API Key.");
          return;
        }
        try {
          console.log("Setting Gemini API Key:", apiKey);
          await setGeminiApiKey(apiKey);
          alert("Gemini API Key has been set successfully.");
          closeModal();
        } catch (error) {
          console.error("Error setting Gemini API Key:", error);
          alert("Failed to set Gemini API Key. Please try again later.");
        }
      }
    return (
        <ModalWrapper closeModal={closeModal}>
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
              onClick={handleSettingGeminiApiKey}
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
    )
}