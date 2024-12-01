import { create } from "zustand";
import { ApiQueryOption } from "~/types";

// Define a type for the store's state and actions
type SelectionStore = {
  selectedItems: ApiQueryOption[]; // Array of selected items
  selectionActions: {
    removeAllItems: () => void; // Action to remove all items
    updateItems: (newItems: ApiQueryOption[]) => void; // Action to update selected items
  };
};

const useSelectionStore = create<SelectionStore>((set) => ({
  selectedItems: [], // Initial state
  selectionActions: {
    // Clear all selected items
    removeAllItems: () => set({ selectedItems: [] }),

    // Update selected items with the new list
    updateItems: (newItems) =>
      set(() => ({
        selectedItems: newItems, // Append new items to existing ones
      })),
  },
}));

// Export the hook to access selected items
export const useSelection = () => useSelectionStore((state) => state.selectedItems);

// Export the hook to access selection actions
export const useSelectionActions = () => useSelectionStore((state) => state.selectionActions);

