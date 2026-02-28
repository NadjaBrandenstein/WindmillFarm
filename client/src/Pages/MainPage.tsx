import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts'
import {useTelemetry} from "../Hooks/useTelemetry.ts";
import '../CSS/MainPage.css'

function MainPage(){

    const telemetryData = useTelemetry();

    const formattedData = telemetryData.map(d => ({
        ...d,
        time: new Date(d.timestamp).toLocaleTimeString()
    }));

    return(
        <div>
            <h2 className="header">Turbine Alpha</h2>

            <div className="container">

                <div className="graph-wrapper">
                    {Array.from({length: 10}).map((_, idx) => (
                        <div className="graph-card" key={idx}>
                            <ResponsiveContainer width="100%" height={250}>
                                <LineChart data={formattedData}>
                                    <CartesianGrid strokeDasharray="3 3"/>
                                    <XAxis dataKey="time" />
                                    <YAxis dataKey="windSpeed" domain={['auto', 'auto']}/>
                                    <Tooltip />
                                    <Line type="monotone" dataKey="windSpeed" stroke="#8884d8" strokeWidth={2} />
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

            <button className="button-main">Start</button>
            <button className="button-main">Stop</button>

            <input className="input-main" type="text" placeholder="Blade Pitch"/>
            <button className="button-main">Submit</button>
        </div>
    )
}

export default MainPage;