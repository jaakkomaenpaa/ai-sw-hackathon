import { create } from "zustand";
import { LineData } from "~/types/DataTypes";

type DataStore = {
  dataSets: LineData[];
  setDataSets: (dataSets: LineData[]) => void;
}

const useDataStore = create<DataStore>((set) => ({
  dataSets: [],
  setDataSets: (dataSets) => set({ dataSets })
}));

export const useDataSets = () => useDataStore((state) => state.dataSets);

export const useUpdateDataSets = () => useDataStore((state) => state.setDataSets);
