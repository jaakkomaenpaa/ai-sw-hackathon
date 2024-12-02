import { create } from "zustand";
import { CombinedLineData } from "~/types/DataTypes";


type AIData = {
  data: CombinedLineData[];
  setData: (data: CombinedLineData[]) => void;
}


const useAIDataStore = create<AIData>((set) => ({
  data: [],
  setData: (data) => set({ data })
}));


export const useAIData = () => useAIDataStore((state) => state.data);
export const useUpdateAIData = () => useAIDataStore((state) => state.setData);
