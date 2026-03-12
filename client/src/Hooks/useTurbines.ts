import {useEffect, useState} from "react";
import {type Turbineregistry} from "../generated-ts-client.ts";
import {webClient} from "../api-clients.ts";

export function useTurbines() {

    const [turbines, setTurbines] = useState<Turbineregistry[]>([]);

    useEffect(() => {
        webClient.getTurbines().then(setTurbines)
    }, [])

    return turbines
}