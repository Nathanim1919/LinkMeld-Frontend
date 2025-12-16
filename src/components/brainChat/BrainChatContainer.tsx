export const BrainChatContainer = () => {
    return (
        <div className="h-full w-full">
            <div className="flex flex-col h-full w-full items-center justify-center">
                <h1 className="text-2xl font-bold text-center text-black dark:text-white">Brain Chat Container</h1>
                <div className="box border-1 border-gray-300 dark:border-gray-800 rounded-md w-[80%] p-4 focus:border-blue-500">
                    <div className="flex items-center gap-2 w-full p-2">
                        <div className="text-sm font-medium text-black dark:text-white">select resources</div>
                        <div className="text-sm font-medium text-black dark:text-white">all</div>
                    </div>
                </div>
            </div>
        </div>
    );
};