import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts'
import {useTelemetry} from "../Hooks/useTelemetry.ts";
import '../CSS/MainPage.css'
import {useState} from "react";
import {useTurbines} from "../Hooks/useTurbines.ts";
import {useCommand} from "../Hooks/useCommand.ts";
import {useAlerts} from "../Hooks/useAlerts.ts";
import { useTurbineStatus } from "../Hooks/useTurbineStatus";

const metrics = [
    {key: 'windSpeed' as const, label: 'Wind Speed'},
    {key: 'windDirection' as const, label: 'Wind Direction'},
    {key: 'ambientTemperature' as const, label: 'Ambient Temperature'},
    {key: 'rotorSpeed' as const, label: 'Rotor Speed'},
    {key: 'powerOutput' as const, label: 'Power Output'},
    {key: 'nacelleDirection' as const, label: 'Nacelle Direction'},
    {key: 'bladePitch' as const, label: 'Blade Pitch'},
    {key: 'generatorTemp' as const, label: 'Generator Temperaturemp'},
    {key: 'gearboxTemp' as const, label: 'Gearbox Temperature'},
    {key: 'vibration' as const, label: 'Vibration'},
] as const

function MainPage(){

    const [selectedTurbineId, setSelectedTurbineId] = useState<string | null>(null)

    const turbines = useTurbines();
    const measurements = useTelemetry(selectedTurbineId)
    const alerts = useAlerts(selectedTurbineId);

    const {sendCommand, loading} = useCommand();
    const [valueInterval, setValueInterval] = useState<string>("");
    const [valueBladePitch, setValueBladePitch] = useState<string>("");

    const [localStatus, setLocalStatus] = useTurbineStatus(measurements);

    const start = () => {
        if(!selectedTurbineId) return alert(
           "Please select a turbine from the dropdown menu"
        );
        sendCommand(selectedTurbineId, {action: 'start'});
        setLocalStatus('running');
    }

    const stop = () => {
        if(!selectedTurbineId) return alert(
            "Please select a turbine from the dropdown menu"
        );
        sendCommand(selectedTurbineId, {action: 'stop', reason: 'manual stop'});
        setLocalStatus('stopped')
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
        sendCommand(selectedTurbineId, {action: 'setPitch', angle: Number(valueBladePitch)});
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
                <button className="start-stop-btn" onClick={start} disabled={!selectedTurbineId || loading}>Start</button>
                <button className="start-stop-btn" onClick={stop} disabled={!selectedTurbineId || loading}>Stop</button>
                <label className="label">Turbine is: {localStatus === 'running' ? 'Running' : localStatus === 'stopped' ? 'Stopped' : 'Unknown'}</label>
            </div>

            <div className="main-wrapper">
                <input className="input-main" onChange={e => setValueInterval(e.target.value)} type="text" placeholder="Set Interval"/>
                <button className="button-main" onClick={setInterval} disabled={!selectedTurbineId || loading}>Submit</button>

                <input className="input-main" onChange={e => setValueBladePitch(e.target.value)} type="text" placeholder="Blade Pitch"/>
                <button className="button-main" onClick={setBladePitch} disabled={!selectedTurbineId || loading}>Submit</button>

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