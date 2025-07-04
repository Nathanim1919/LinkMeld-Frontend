import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiTrash2,
  FiRefreshCw,
  FiUpload,
  FiStar,
  FiCheck,
} from "react-icons/fi";
import { RiShieldKeyholeLine } from "react-icons/ri";
import { SetApiKeyModal } from "../components/modals/setApiKey.modal";
import { ResetDataModal } from "../components/modals/reseData.modal";
import { ActionButton } from "../components/modals/actionButton";
import { UpgradeModal } from "../components/modals/upgrade.modal";
import { DeleteAccountModal } from "../components/modals/accountDelete.model";
import { ExportDataModal } from "../components/modals/exportData.modal";
import { getUserProfileInfo, type IUserProfile } from "../api/account.api";
import { authClient } from "../lib/auth-client";
import type { User } from "better-auth/types";

export const UserProfile = () => {
  const [activeModal, setActiveModal] = useState<
    null | "export" | "apiKey" | "upgrade" | "delete" | "reset"
  >(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const closeModal = () => setActiveModal(null);
  const [userProfileData, setUserProfileData] = useState<IUserProfile>();
  const [authInfo, setAuthInfo] = useState<User>();

  useEffect(() => {
    async function getUserProfile() {
      const auth = await authClient.getSession();
      setAuthInfo(auth?.data?.user);
      const data = await getUserProfileInfo();
      setUserProfileData(data);
    }
    getUserProfile();
  }, []);

  console.log(userProfileData);

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
              {authInfo?.name || "User Name"}
            </h1>
            <p className="text-[#aeaeb2] mt-1">
              Joined{" "}
              {authInfo?.createdAt
                ? authInfo.createdAt.toLocaleDateString()
                : "Unknown"}
            </p>
          </div>
        </motion.div>

        {/* Action Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ActionButton
            icon={<FiUpload className="text-xl text-blue-400" />}
            title="Export Data"
            description="Download all your data in JSON format"
            onClick={() => setActiveModal("export")}
            color="bg-[#2c2c2e]"
            borderColor="border-[#3a3a3c]"
          />

          <ActionButton
            icon={<RiShieldKeyholeLine className="text-xl text-blue-400" />}
            title="Gemini API Key"
            description="Add or update your API key"
            onClick={() => setActiveModal("apiKey")}
            color="bg-[#2c2c2e]"
            borderColor="border-[#3a3a3c]"
          />

          <ActionButton
            icon={<FiStar className="text-xl text-amber-400" />}
            title={isSubscribed ? "Premium Member" : "Upgrade Subscription"}
            description={
              isSubscribed
                ? "Manage your subscription"
                : "Unlock premium features"
            }
            onClick={() => setActiveModal("upgrade")}
            color={isSubscribed ? "bg-amber-500/10" : "bg-[#2c2c2e]"}
            borderColor={
              isSubscribed ? "border-amber-500/30" : "border-[#3a3a3c]"
            }
          />

          <ActionButton
            icon={<FiRefreshCw className="text-xl text-gray-400" />}
            title="Reset All Data"
            description="Start fresh with a clean slate"
            onClick={() => setActiveModal("reset")}
            color="bg-[#2c2c2e]"
            borderColor="border-[#3a3a3c]"
          />

          <ActionButton
            icon={<FiTrash2 className="text-xl text-red-400" />}
            title="Delete Account"
            description="Permanently remove your account"
            onClick={() => setActiveModal("delete")}
            color="bg-red-500/10"
            borderColor="border-red-500/30"
          />
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {activeModal === "export" && (
          <ExportDataModal closeModal={closeModal} />
        )}

        {activeModal === "apiKey" && (
          <SetApiKeyModal
            existingApiKey={userProfileData?.externalServices?.gemini?.hasApiKey}
            closeModal={closeModal}
          />
        )}

        {activeModal === "upgrade" && (
          <UpgradeModal
            closeModal={closeModal}
            isSubscribed={isSubscribed}
            setIsSubscribed={setIsSubscribed}
          />
        )}

        {activeModal === "reset" && <ResetDataModal closeModal={closeModal} />}

        {activeModal === "delete" && (
          <DeleteAccountModal closeModal={closeModal} />
        )}
      </AnimatePresence>
    </div>
  );
};
