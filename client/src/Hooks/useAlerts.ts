import {type AlertCommand} from "../generated-ts-client.ts";
import {StateleSSEClient} from "statele-sse";
import {useEffect, useRef, useState} from "react";
import {webClient} from "../api-clients.ts";
import {finalBaseUrl} from "../BaseUrl.ts";

const sse = new StateleSSEClient(finalBaseUrl + "/sse");

export const useAlerts = (selectedTurbineId: string | null): AlertCommand[] => {

    const [alerts, setAlerts] = useState<AlertCommand[]>([])
    const cleanupRef = useRef<(() => void) | null>(null);

    useEffect(() => {

        if (!selectedTurbineId) return

        if (cleanupRef.current) {
            cleanupRef.current()
        }

        const cleanup = sse.listen(
            async (id) => await webClient.getAlertsPerTurbine(id, selectedTurbineId),
            (data) => setAlerts(data)
        )

        cleanupRef.current = cleanup
        return () => cleanup?.()

    }, [selectedTurbineId])
    return alerts
}