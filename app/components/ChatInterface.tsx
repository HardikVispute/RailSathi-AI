"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Loader2, Sparkles, AlertCircle } from "lucide-react";
import ResponseCard, { RailResponse } from "./ResponseCard";

export default function ChatInterface() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [aiResponse, setAiResponse] = useState<RailResponse | null>(null);

  const sampleQueries = [
    "How do I travel from Pune to Nagpur?",
    "Suggest trains from Mumbai to Delhi.",
    "Give travel tips for a 15-hour train journey.",
    "I am travelling with senior citizens."
  ];

  const handleSubmit = async (e?: React.FormEvent, presetQuery?: string) => {
    if (e) e.preventDefault();
    
    const finalQuery = presetQuery || query;
    if (!finalQuery.trim()) return;

    setLoading(true);
    setError(null);
    setAiResponse(null);
    if (presetQuery) setQuery(presetQuery);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: finalQuery }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Something went wrong");

      setAiResponse(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
      <div className="p-6 bg-gray-50 border-b border-gray-200">
        <form onSubmit={handleSubmit} className="relative flex items-center">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask RailSathi (e.g., How to travel from Pune to Nagpur?)"
            className="w-full pl-6 pr-16 py-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-railway-blue focus:border-transparent text-lg shadow-sm transition-all"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="absolute right-2 p-3 bg-railway-blue text-white rounded-full hover:bg-railway-navy disabled:opacity-50 disabled:hover:bg-railway-blue transition flex items-center justify-center"
          >
            {loading ? <Loader2 className="animate-spin" size={24} /> : <Send size={24} />}
          </button>
        </form>

        {!aiResponse && !loading && (
          <div className="mt-6">
            <p className="text-sm text-gray-500 font-medium mb-3 flex items-center gap-2">
              <Sparkles size={16} className="text-railway-orange" /> Try asking:
            </p>
            <div className="flex flex-wrap gap-2">
              {sampleQueries.map((sq, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSubmit(undefined, sq)}
                  className="text-xs md:text-sm bg-white border border-gray-200 text-gray-700 py-2 px-4 rounded-full hover:border-railway-blue hover:text-railway-blue transition-colors shadow-sm"
                >
                  {sq}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="p-6 min-h-[300px] bg-white">
        {loading && (
          <div className="flex flex-col items-center justify-center h-full text-gray-400 py-12">
            <Loader2 className="animate-spin text-railway-blue mb-4" size={48} />
            <p className="text-lg font-medium animate-pulse text-railway-blue">RailSathi is analyzing routes...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-start gap-3 border border-red-200">
            <AlertCircle className="shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold">Error</h4>
              <p>{error}</p>
            </div>
          </div>
        )}

        {aiResponse && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <ResponseCard data={aiResponse} />
          </motion.div>
        )}

        {!loading && !error && !aiResponse && (
          <div className="flex flex-col items-center justify-center h-full text-gray-400 py-16 opacity-50">
            <Sparkles size={64} className="mb-4 text-gray-300" />
            <p>Your journey insights will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
}