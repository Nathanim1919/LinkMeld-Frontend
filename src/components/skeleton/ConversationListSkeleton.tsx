import clsx from "clsx"
import { motion } from "framer-motion";

const shimmer ="bg-gradient-to-r from-[#bab6b6] dark:from-[#211f1f] via-gray-300 dark:via-gray-700 to-gray-400 dark:to-gray-800 bg-[length:400%_100%] animate-pulse";

export const ConversationItemSkeleton: React.FC = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="group flex items-center justify-between px-3 py-2.5 rounded-lg"
        >
            <div className="flex-1 min-w-0 pr-3">
                {/* Only title skeleton - no description/subtitle */}
                <div className={clsx("h-4 rounded w-4/4", shimmer)} />
            </div>
            <div className={clsx("w-4 h-4 rounded opacity-0", shimmer)} />
        </motion.div>
    );
};

export const ConversationListSkeleton = () => {
    return (
        <div className="h-full flex flex-col overflow-hidden relative bg-[#faf7f7] dark:bg-[#141416]">
            <div className="flex justify-end items-center px-2 py-2">
                <div className="z-1000 opacity-50 flex items-center justify-center gap-4 rounded-full cursor-pointer hover:bg-transparent text-2xl  dark:text-gray-200 text-[#333]  top-1  right-0">
                    <div className={clsx("h-4 w-4 rounded", shimmer)} />
                    <div className={clsx("h-4 w-4 rounded", shimmer)} />
                </div>
            </div>
            <div className="flex-1 overflow-y-auto px-2 space-y-0.5">
                {Array.from({ length: 12 }).map((_, index) => (
                    <ConversationItemSkeleton key={index} />
                ))}
            </div>
        </div>
    );
};