import {useEffect, useRef, useState} from "react";
import {StateleSSEClient} from "statele-sse";
import { type Turbinetelemetry} from "../generated-ts-client.ts";
import {webClient} from "../api-clients.ts";
import {finalBaseUrl} from "../BaseUrl.ts";

const sse = new StateleSSEClient(finalBaseUrl + "/sse");

//const sse = new StateleSSEClient("http://localhost:5003/sse")
//const sse = new StateleSSEClient("https://windmill-farm-server.fly.dev/sse")

export const useTelemetry = (selectedTurbineId: string | null) => {

    const [measurements, setMeasurements] = useState<Turbinetelemetry[]>([])

    const cleanupRef = useRef<(() => void) | null>(null);

    useEffect(() => {
        if (!selectedTurbineId) return

        if (cleanupRef.current) {
            cleanupRef.current()
        }

        const cleanup = sse.listen(
            async (id) => await webClient.getMeasurementsPerTurbine(id, selectedTurbineId),
            (data) => setMeasurements(data)
        )

        cleanupRef.current = cleanup
        return () => cleanup?.()
    }, [selectedTurbineId])

    return measurements
}