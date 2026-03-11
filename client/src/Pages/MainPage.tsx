import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts'
//import {type Turbinetelemetry, WebClientClient} from "../generated-ts-client.ts";
import {useTelemetry} from "../Hooks/useTelemetry.ts";
import '../CSS/MainPage.css'
import {useState} from "react";
import {useTurbines} from "../Hooks/useTurbines.ts";
import {useCommand} from "../Hooks/useCommand.ts";
import {useAlerts} from "../Hooks/useAlerts.ts";

const metrics = [
    {key: 'windSpeed' as const, label: 'windSpeed', color: '#8884d8'},
    {key: 'windDirection' as const, label: 'windDirection', color: '#8884d8'},
    {key: 'ambientTemperature' as const, label: 'ambientTemperature', color: '#8884d8'},
    {key: 'rotorSpeed' as const, label: 'rotorSpeed', color: '#8884d8'},
    {key: 'powerOutput' as const, label: 'powerOutput', color: '#8884d8'},
    {key: 'nacelleDirection' as const, label: 'nacelleDirection', color: '#8884d8'},
    {key: 'bladePitch' as const, label: 'bladePitch', color: '#8884d8'},
    {key: 'generatorTemp' as const, label: 'generatorTemp', color: '#8884d8'},
    {key: 'gearboxTemp' as const, label: 'gearboxTemp', color: '#8884d8'},
    {key: 'vibration' as const, label: 'vibration', color: '#8884d8'},
    //{key: 'status' as const, label: 'status', color: '#8884d8'},
] as const

function MainPage(){

    const [selectedTurbineId, setSelectedTurbineId] = useState<string | null>(null)

    const turbines = useTurbines();
    const measurements = useTelemetry(selectedTurbineId)
    const alerts = useAlerts(selectedTurbineId);

    const {sendCommand, loading} = useCommand();
    const [valueInterval, setValueInterval] = useState<string>("");
    const [valueBladePitch, setValueBladePitch] = useState<string>("");

    const start = () => {
        if(!selectedTurbineId) return alert(
           "Please select a turbine from the dropdown menu"
        );
        sendCommand(selectedTurbineId, {action: 'start'});
    }

    const stop = () => {
        if(!selectedTurbineId) return alert(
            "Please select a turbine from the dropdown menu"
        );
        sendCommand(selectedTurbineId, {action: 'stop', reason: 'manual stop'});
    }

    const setInterval = () => {
        if(!selectedTurbineId) return alert(
            "Please select a turbine from the dropdown menu"
        );
        sendCommand(selectedTurbineId, {action: "setInterval", value: Number(valueInterval)});
    }

    const setBladePitch = () => {
        if(!selectedTurbineId) return alert(
            "Please select a turbine from the dropdown menu"
        );
        sendCommand(selectedTurbineId, {action: 'setBladePitch', angle: Number(valueBladePitch)});
    }


    const chartData = measurements.map(m => ({
        ...m,
            time: m.timestamp ? new Date(m.timestamp).toLocaleTimeString() : '',
    }))

    return (
        <div>
            <select className="dropdown"
                value={selectedTurbineId ?? ""}
                onChange={e => setSelectedTurbineId(e.target.value)}>

                <option value="" disabled>Select a turbine</option>

                {turbines.map(turbine => (
                    <option key={turbine.turbineId} value={turbine.turbineId}>
                        {turbine.turbineName}
                    </option>
                ))}
            </select>

            <div className="main-wrapper">
                <button className="button-main" onClick={start} disabled={!selectedTurbineId || loading}>Start</button>
                <button className="button-main" onClick={stop} disabled={!selectedTurbineId || loading}>Stop</button>

                <input className="input-main" onChange={e => setValueBladePitch(e.target.value)} type="text" placeholder="Blade Pitch"/>
                <button className="button-main" onClick={setBladePitch} disabled={!selectedTurbineId || loading}>Submit</button>

                <input className="input-main" onChange={e => setValueInterval(e.target.value)} type="text" placeholder="Set Interval"/>
                <button className="button-main" onClick={setInterval} disabled={!selectedTurbineId || loading}>Submit</button>

                <input className="input-main" type="text" placeholder="Search"/>
            </div>

            <div className="container">

                <div className="graph-wrapper">
                    {metrics.map(({key, label}) => (
                        <div className="graph-card" key={key}>
                            <h3>{label}</h3>
                            <ResponsiveContainer width="100%" height={250}>
                                <LineChart data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="time" tick={{fontSize: 10}} />
                                    <YAxis />
                                    <Tooltip />
                                    <Line type="monotone" dataKey={key} stroke="#8884d8" strokeWidth={2} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    ))}
                </div>

                <div className="table-wrapper">
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Turbine</th>
                            <th>Alert/Command</th>
                            <th>Timestamp</th>
                            <th>Message</th>
                        </tr>
                        </thead>
                        <tbody>
                        {alerts.map(alert => (
                            <tr key={alert.alertId}>
                                <td>{alert.turbineId} </td>
                                <td>{alert.name} </td>
                                <td>{alert.timestamp} </td>
                                <td>{alert.description} </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>

    )
}

export default MainPage;