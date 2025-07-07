import { FiRefreshCw, FiX } from "react-icons/fi";
import { resetData } from "../../api/account.api";
import { ModalWrapper } from "./ModalWrapper"
import { motion } from "framer-motion";

export const ResetDataModal:React.FC<{closeModal: ()=> void}> = ({
    closeModal
}) => {
      const handleResetData = async () => {
        try {
          console.log("Resetting all data...");
          await resetData();
          closeModal();
        } catch (error) {
          console.error("Error resetting data:", error);
        }
      };
    return (
        <ModalWrapper closeModal={closeModal}>
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
    )
}