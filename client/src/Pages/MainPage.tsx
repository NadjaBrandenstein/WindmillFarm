import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts'
//import {type Turbinetelemetry, WebClientClient} from "../generated-ts-client.ts";
import {useTelemetry} from "../Hooks/useTelemetry.ts";
import '../CSS/MainPage.css'
import {useState} from "react";
import {useTurbines} from "../Hooks/useTurbines.ts";



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
    {key: 'status' as const, label: 'status', color: '#8884d8'},
] as const

function MainPage(){

    const [selectedTurbineId, setSelectedTurbineId] = useState<string | null>(null)

    const turbines = useTurbines();
    const measurements = useTelemetry(selectedTurbineId)


    const chartData = measurements.map(m => ({
        ...m,
            time: m.timestamp ? new Date(m.timestamp).toLocaleTimeString() : '',
    }))

    // return (
    //     <div>
    //         {metrics.map(({key, label, color}) => (
    //             <div key={key}>
    //                 <h3>{label}</h3>
    //                 <ResponsiveContainer width="100%" height={250}>
    //                     <LineChart data={chartData}>
    //                         <CartesianGrid strokeDasharray="3 3" />
    //                         <XAxis dataKey="time" tick={{fontSize: 10}} />
    //                         <YAxis />
    //                         <Tooltip />
    //                         <Line type="monotone" dataKey={key} stroke={color} dot={false} />
    //                     </LineChart>
    //                 </ResponsiveContainer>
    //             </div>
    //         ))}
    //     </div>
    // )

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
                <button className="button-main">Start</button>
                <button className="button-main">Stop</button>

                <input className="input-main" type="text" placeholder="Blade Pitch"/>
                <button className="button-main">Submit</button>

                <input className="input-main" type="text" placeholder="Set Interval"/>
                <button className="button-main">Submit</button>

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
                            <th>Name</th>
                            <th>Alert/Command</th>
                            <th>Timestamp</th>
                            <th>Message</th>
                        </tr>
                        </thead>
                        <tbody>
                        {Array.from({length: 15}).map((_, idx) => (
                            <tr key={idx}>
                                <td>Gertrud </td>
                                <td>Turbine stopped </td>
                                <td>2026-02-28 19:35:25 </td>
                                <td>Some important message </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>

    )

    // return(
    //     <div>
    //         <h2 className="header">Turbine Alpha</h2>
    //
    //         <div className="main-wrapper">
    //             <button className="button-main">Start</button>
    //             <button className="button-main">Stop</button>
    //
    //             <input className="input-main" type="text" placeholder="Blade Pitch"/>
    //             <button className="button-main">Submit</button>
    //         </div>
    //
    //         <div className="container">
    //
    //             <div className="graph-wrapper">
    //                 {Array.from({length: 10}).map((_, idx) => (
    //                     <div className="graph-card" key={idx}>
    //                         <ResponsiveContainer width="100%" height={250}>
    //                             <LineChart data={formattedData}>
    //                                 <CartesianGrid strokeDasharray="3 3"/>
    //                                 <XAxis dataKey="time" />
    //                                 <YAxis dataKey="windSpeed" domain={['auto', 'auto']}/>
    //                                 <Tooltip />
    //                                 <Line type="monotone" dataKey="windSpeed" stroke="#8884d8" strokeWidth={2} />
    //                             </LineChart>
    //                         </ResponsiveContainer>
    //                     </div>
    //                 ))}
    //             </div>
    //
    //             <div className="table-wrapper">
    //                 <table className="table">
    //                     <thead>
    //                         <tr>
    //                             <th>Name</th>
    //                             <th>Alert/Command</th>
    //                             <th>Timestamp</th>
    //                             <th>Message</th>
    //                         </tr>
    //                     </thead>
    //                     <tbody>
    //                         {Array.from({length: 15}).map((_, idx) => (
    //                             <tr key={idx}>
    //                                 <td>Gertrud </td>
    //                                 <td>Turbine stopped </td>
    //                                 <td>2026-02-28 19:35:25 </td>
    //                                 <td>Some important message </td>
    //                             </tr>
    //                         ))}
    //                     </tbody>
    //                 </table>
    //             </div>
    //         </div>
    //
    //     </div>
    // )
}

export default MainPage;