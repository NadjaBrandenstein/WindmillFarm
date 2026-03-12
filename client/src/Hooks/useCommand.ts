import type {TurbineCommandDto} from "../generated-ts-client.ts";
import {commandClient} from "../api-clients.ts";
import {useState} from "react";

export const useCommand = () => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const sendCommand = async (turbineId: string, command: TurbineCommandDto) => {
        try {
            setLoading(true);
            setError(null);
            const response = await commandClient.sendCommand(turbineId, command);
            return response;
        } catch (err: unknown) {
            console.error(err);

            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Failed to send command");
            }
        } finally {
            setLoading(false);
        }
    };

    return {
        sendCommand,
        loading,
        error,
    };
};