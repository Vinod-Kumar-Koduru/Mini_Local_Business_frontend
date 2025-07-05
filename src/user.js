import React, { useState } from "react";
export default function DashboardPage() {
    const [formData, setFormData] = useState({ businessName: "", location: "" });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [cardData, setCardData] = useState({ rating: "--", reviews: "--", headline: "--" });


    const API = process.env.REACT_APP_API_URL || "http://localhost:3000";
    const Onchange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const Spinner = (
        <svg
            className="animate-spin h-4 w-4 text-white"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4l3-3-3-3v4A8 8 0 104 12z"
            />
        </svg>
    );

    const Onsubmit = async (e) => {
        e.preventDefault();
        if (!formData.businessName.trim() || !formData.location.trim()) return;

        setLoading(true);
        try {
            const res = await fetch(`${API}/business-data`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: formData.businessName, location: formData.location }),
            });
            console.log("Response status:", res.status);
            const data = await (res.ok ? res.json() : Promise.reject(res.statusText));
            setCardData({ rating: data.rating, reviews: data.reviews, headline: data.headline });
            setSubmitted(true);
        } catch (err) {
            console.error("Error:", err);
        } finally {
            setLoading(false);
        }
    };

    const regeneratefun = async () => {
        setLoading(true);
        try {
            const url = `${API}/regenerate-headline?name=${encodeURIComponent(formData.businessName)}&location=${encodeURIComponent(formData.location)}`;
            const res = await fetch(url);
            const data = await (res.ok ? res.json() : Promise.reject(res.statusText));
            setCardData((prev) => ({ ...prev, headline: data.headline }));
        } catch (err) {
            console.error("Error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-200 flex flex-col justify-center items-center p-4">
            <form
                onSubmit={Onsubmit}
                className="w-full max-w-md bg-white rounded-2xl shadow-md p-6 space-y-4"
            >
                <h2 className="text-xl font-semibold text-gray-700 text-center">Business Info</h2>

                <input
                    type="text"
                    name="businessName"
                    placeholder="Business Name"
                    value={formData.businessName}
                    onChange={Onchange}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={formData.location}
                    onChange={Onchange}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
                <button
                    type="submit"
                    className="w-full px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-gradient-to-r from-green-700 to-green-500 transition-all duration-300 disabled:opacity-50"
                    disabled={loading}
                >
                    {loading && !submitted ? "Loading…" : "Submit"}
                </button>
            </form>

            {loading && (
                <div className="mt-6 flex items-center justify-center">
                    <svg className="animate-spin h-8 w-8 text-blue-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4A8 8 0 104 12z" />
                    </svg>
                </div>
            )}

            {submitted && (
                <div className="mt-6 w-full max-w-md bg-white rounded-2xl shadow-lg">
                    <div className="p-6 space-y-4">
                        <h3 className="text-lg font-bold text-center text-gray-700">
                            {formData.businessName} – {formData.location}
                        </h3>
                        <div className="flex items-baseline gap-2 justify-center">
                            <span className="text-yellow-500 font-semibold text-lg">{cardData.rating}★</span>
                            <span className="text-gray-600">{cardData.reviews} Reviews</span>
                        </div>
                        <div className="text-center">
                            <p className="text-sm text-gray-800 mb-1">SEO Headline:</p>
                            <p className="text-base font-medium text-gray-900">{cardData.headline}</p>
                        </div>
                        <button
                            type="button"
                            onClick={regeneratefun}
                            disabled={loading}
                            className="w-full px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-gradient-to-r from-green-700 to-green-500 transition-all duration-300 disabled:opacity-50"
                        >
                            {loading ? "Updating…" : "Regenerate SEO Headline"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
