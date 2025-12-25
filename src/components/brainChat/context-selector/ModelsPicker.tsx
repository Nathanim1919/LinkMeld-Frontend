import { useEffect } from "react";
import { useBrainStore } from "../../../stores/brain-store";
import { Bot, Check } from "lucide-react";


export const ModelsPicker = () => {
    const { modelList, selectedModel, setSelectedModel, getModelList } = useBrainStore();

    useEffect(() => {
        getModelList();
    }, []);


    return (
        <div>
            {modelList.map(model => (
                <button
                    className={`flex text-sm items-center  w-full hover:opacity-65 gap-2  dark:border-[#131212] cursor-pointer px-3 py-2 border-b border-gray-200  text-left transition ${selectedModel?.id === model.id ? "bg-gray-100 dark:bg-[#131212] text-blue-500" : ""}`}
                    key={model.id} onClick={() => setSelectedModel(model)}>
                    {selectedModel?.id === model.id ? <Check className={`text-blue-500 size-4`} /> :
                    <Bot className="text-gray-500 size-4 dark:text-gray-600" />}
                    {model.id}
                </button>
            ))}
        </div>
    )
}