import {create} from "zustand/react";
import {StoreApi} from "@/lib/api/serviceStoreApi";


interface User {
    id: string;
    username: string;
    role: string;
}

interface UserState {
    user: User | null;
    fetchUser: () => Promise<void>;
    resetUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
    user: null,
    fetchUser: async () => {
        try {
            const res = await StoreApi.me();
            set({user: res});
        } catch (error) {
            console.error("Error fetching user data:", error);
            set({user: null});
        }
    },
    resetUser: () => set({user: null}),
}));