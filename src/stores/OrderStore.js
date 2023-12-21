import { create } from "zustand";
import axios from "axios";

const orderStore = create((set) => ({
  order: {},
  setOrder: (order) => set({ order: order }),
  getOrder: async (id) => {
    try {
      const res = await axios.get(
        `https://tracking.bosta.co/shipments/track/${id}`
      );
      set({ order: res.data }); // Use set to update the state with the fetched data
    } catch (err) {
      console.log(err);
      set({ errorMessage: err.message });
    }
  },
  errorMessage: "",
  setErrorMessage: (errorMessage) => set({ errorMessage: errorMessage }),
}));

export default orderStore;
