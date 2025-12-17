import clsx from "clsx"

const shimmer ="bg-gradient-to-r from-[#bab6b6] dark:from-[#211f1f] via-gray-300 dark:via-gray-700 to-gray-400 dark:to-gray-800 bg-[length:400%_100%] animate-pulse";


export const ConversationListSkeleton = () => {
    return (
        <div className="flex flex-col gap-2 bg-[#faf7f7] dark:bg-[#141416]">
            <div className="flex justify-end items-center p-2 border-b border-gray-100 dark:border-zinc-800/50">
                <div className="z-1000 opacity-50 flex items-center justify-center gap-2 rounded-full cursor-pointer hover:bg-transparent text-2xl  dark:text-gray-200 text-[#333]  top-1  right-0">
                <div  className={clsx("h-6 w-6 rounded", shimmer)} />
                    <div  className={clsx("h-6 w-6 rounded", shimmer)} />

                </div>
            </div>
            <div className="flex flex-col gap-2 px-4">
            {
                [...Array(15)].map((_, index) => (
                    <div key={index} className={clsx("h-6 rounded w-full mb-1", shimmer)} />
                    
                ))
            }
            </div>
        </div>
    )
}