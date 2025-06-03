import type { Capture } from "../types/Capture";
import axios from "axios";


export const getCaptures = async (): Promise<Capture[]> => {
    try {
        const response = await axios.get<Capture[]>("http://localhost:3000/api");
        console.log("Fetched captures:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching captures:", error);
        throw error;
    }   
}