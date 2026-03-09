import {useEffect, useRef, useState} from "react";
import {StateleSSEClient} from "statele-sse";
import { type Turbinetelemetry, WebClientClient} from "../generated-ts-client.ts";

const sse = new StateleSSEClient("http://localhost:5003/sse")
const restClient = new WebClientClient("http://localhost:5003")


export const useTelemetry = (selectedTurbineId: string | null) => {

    const [measurements, setMeasurements] = useState<Turbinetelemetry[]>([])

    const cleanupRef = useRef<(() => void) | null>(null);

    useEffect(() => {
        if (!selectedTurbineId) return

        if (cleanupRef.current) {
            cleanupRef.current()
        }

        const cleanup = sse.listen(
            async (id) => await restClient.getMeasurementsPerTurbine(id, selectedTurbineId),
            (data) => setMeasurements(data)
        )

        cleanupRef.current = cleanup
        return () => cleanup?.()
    }, [selectedTurbineId])

    return measurements
}