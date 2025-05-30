import { useState } from "react";
import axios from "axios";

export default function Home() {
    const [url, setUrl] = useState("");
    const [shortUrl, setShortUrl] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("uri changed");
        try {
            const response = await axios.post("http://3.135.176.30:8080/api/url/shorten", {
                originalUrl: url,
            });
            setShortUrl(response.data.shortUrl);
            setError("");
        } catch (err) {
            setError("Failed to shorten URL. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Shorten Your URL</h1>

                <form onSubmit={handleSubmit}>
                    <input
                        type="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="Enter your long URL"
                        className="w-full p-3 border rounded-lg mb-4"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
                    >
                        Shorten
                    </button>
                </form>

                {shortUrl && (
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                        <p className="mb-2">Short URL:</p>
                        <a
                            href={shortUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 break-all"
                        >
                            {shortUrl}
                        </a>
                        <button
                            onClick={() => navigator.clipboard.writeText(shortUrl)}
                            className="mt-2 flex items-center text-sm text-gray-500 hover:text-gray-700"
                        >
                            <span>Copy</span>
                        </button>
                    </div>
                )}

                {error && <p className="mt-4 text-red-500">{error}</p>}
            </div>
        </div>
    );
}
