import { useState, useEffect } from "react";
import { type Turbinetelemetry } from "../generated-ts-client.ts";

export function useTurbineStatus(measurements: Turbinetelemetry[]) {
    const [status, setStatus] = useState<'running' | 'stopped' | 'unknown'>('unknown');

    useEffect(() => {
        if (measurements.length === 0) return;

        const latest = measurements[measurements.length - 1].status?.toLowerCase();
        if (latest === 'running' || latest === 'stopped') {
            setStatus(prev => (prev !== latest ? latest as 'running' | 'stopped' : prev));
        }
    }, [measurements]);

    return [status, setStatus] as const;
}