import {useEffect, useState} from "react";
import {fetchRecentTelemetry} from "./telemetryService.ts";


export interface TurbineTelemetry {
    turbineId: string;
    turbineName: string;
    farmId: string;
    timestamp: string;
    windSpeed: number;
    windDirection: number;
    ambientTemperature: number;
    rotorSpeed: number;
    powerOutput: number;
    nacelleDirection: number;
    bladePitch: number;
    generatorTemp: number;
    gearboxTemp: number;
    vibration: number;
    status: string;
}

export const useTelemetry = () => {
    const [data, setData] = useState<TurbineTelemetry[]>([]);

    useEffect(() => {
        const loadData = async () => {
            try {
                const newData = await fetchRecentTelemetry();
                setData(newData);
            }catch (error) {
                console.error("Error fetching telemetry data:", error);
            }
        }
        loadData();
        const interval = setInterval(loadData, 5000); // Refresh every 5 seconds
        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    return data;
}