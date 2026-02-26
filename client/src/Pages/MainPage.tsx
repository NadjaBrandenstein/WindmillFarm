import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts'
import {useTelemetry} from "../Hooks/useTelemetry.ts";

function MainPage(){

    const telemetryData = useTelemetry();

    const formattedData = telemetryData.map(d => ({
        ...d,
        time: new Date(d.timestamp).toLocaleTimeString()
    }));

    return(
        <div>
            <h3 className="header">Turbine Alpha</h3>
            <div className="container">
                <div className="grid" >

                        <LineChart width={600} height={400} data={formattedData}>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis dataKey="time" />
                            <YAxis dataKey="windSpeed" domain={['auto', 'auto']}/>
                            <Tooltip />
                            <Line type="monotone" dataKey="windSpeed" stroke="#8884d8" strokeWidth={2} />
                        </LineChart>

                </div>

                <div className="table">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Alert/Command</th>
                                <th>Message</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td> </td>
                            </tr>
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