export const fetchRecentTelemetry = async () => {

    const response = await fetch('http://localhost:5003/api/WindSpeed/GetRecent');
    if (!response.ok) throw new Error("Failed to fetch recent telemetry data");
    return response.json();
}