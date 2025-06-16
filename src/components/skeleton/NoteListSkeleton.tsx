export const NoteListSkeleton = () => {
    return (
        <div className="flex flex-col space-y-4 p-4">
        {Array.from({ length: 5 }).map((_, index) => (
            <div
            key={index}
            className="animate-pulse bg-zinc-800 rounded-lg h-12 w-full"
            ></div>
        ))}
        </div>
    );
};