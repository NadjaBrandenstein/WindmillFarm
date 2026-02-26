import { useState } from "react";
import { useAuth } from "./useAuth.ts";
import { authClient } from "../api-clients";
import type { RegisterRequest } from "../generated-ts-client";

export const useRegisterUser = () => {
    const {login } = useAuth();

    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            const request: RegisterRequest = {
                firstName,
                lastName,
                password,
                userName: username,
            }

            await authClient.register(request);

            await login({username: username, password });
        }catch(err){
            console.error("Registration error:", err);
            setError("Registration failed. Please check your input or try another email.");
        }
    };
    return {
        username,
        setUsername,
        firstName,
        setFirstName,
        lastName,
        setLastName,
        password,
        setPassword,
        error,
        handleRegister,
    };
};