import {type AlertCommand, WebClientClient} from "../generated-ts-client.ts";
import {StateleSSEClient} from "statele-sse";
import {useEffect, useRef, useState} from "react";

const sse = new StateleSSEClient("http://localhost:5003/sse")
const restClient = new WebClientClient("http://localhost:5003")

export const useAlerts = (selectedTurbineId: string | null): AlertCommand[] => {

    const [alerts, setAlerts] = useState<AlertCommand[]>([])
    const cleanupRef = useRef<(() => void) | null>(null);

    useEffect(() => {

        if (!selectedTurbineId) return

        if (cleanupRef.current) {
            cleanupRef.current()
        }

        const cleanup = sse.listen(
            async (id) => await restClient.getAlertsPerTurbine(id, selectedTurbineId),
            (data) => setAlerts(data)
        )

        cleanupRef.current = cleanup
        return () => cleanup?.()

    }, [selectedTurbineId])
    return alerts
}