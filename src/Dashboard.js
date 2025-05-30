import { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

export default function Dashboard() {
    const [urls, setUrls] = useState([]);

    useEffect(() => {
        const fetchUrls = async () => {
            try {
                const response = await axios.get("http://3.135.176.30:30080/api/url/info/all");
                setUrls(response.data);
            } catch (err) {
                console.error("Failed to fetch URLs:", err);
            }
        };
        fetchUrls();
    }, []);

    const chartData = {
        labels: urls.map((url) => url.shortCode),
        datasets: [
            {
                label: "Clicks",
                data: urls.map((url) => url.clicks),
                backgroundColor: "rgba(59, 130, 246, 0.6)",
            },
        ],
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-2xl font-bold mb-6">Your Links</h1>

                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                    <h2 className="text-xl font-semibold mb-4">Clicks Analytics</h2>
                    <Bar data={chartData} />
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">All URLs</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead>
                            <tr className="bg-gray-50">
                                <th className="px-6 py-3 text-left">Short URL</th>
                                <th className="px-6 py-3 text-left">Original URL</th>
                                <th className="px-6 py-3 text-left">Clicks</th>
                            </tr>
                            </thead>
                            <tbody>
                            {urls.map((url) => (
                                <tr key={url.id} className="border-b">
                                    <td className="px-6 py-4">
                                        <a
                                            href={`http://localhost:8080/${url.shortCode}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:underline"
                                        >
                                            {url.shortCode}
                                        </a>
                                    </td>
                                    <td className="px-6 py-4 truncate max-w-xs">
                                        <a
                                            href={url.originalUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-600 hover:underline"
                                        >
                                            {url.originalUrl}
                                        </a>
                                    </td>
                                    <td className="px-6 py-4">{url.clicks}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
