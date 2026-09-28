import type { User } from "firebase/auth";

export interface AuthContextValue{
    user: User | null,
    isLoading: boolean
}