import {useEffect, useState} from "react";
import {type Turbineregistry, WebClientClient} from "../generated-ts-client.ts";

const restClient = new WebClientClient("http://localhost:5003")

export function useTurbines() {

    const [turbines, setTurbines] = useState<Turbineregistry[]>([]);

    useEffect(() => {
        restClient.getTurbines().then(setTurbines)
    }, [])

    return turbines
}