import { Clock, Train, Info, Map, ShieldCheck } from "lucide-react";

export interface RailResponse {
  journeySummary: string;
  suggestedTrains: string[];
  estimatedDuration: string;
  travelTips: string[];
  alternativeRoutes: string[];
  passengerGuidance: string;
}

export default function ResponseCard({ data }: { data: RailResponse }) {
  return (
    <div className="space-y-6">
      {/* Summary Section */}
      <div className="bg-railway-light/50 p-5 rounded-xl border border-railway-blue/10">
        <h3 className="text-xl font-bold text-railway-navy mb-2 flex items-center gap-2">
          <Train className="text-railway-blue" />
          Journey Summary
        </h3>
        <p className="text-gray-700 leading-relaxed">{data.journeySummary}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Suggested Trains */}
        <div className="bg-white border border-gray-200 p-5 rounded-xl shadow-sm">
          <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2 border-b pb-2">
            <Train size={18} className="text-railway-orange" />
            Suggested Trains
          </h4>
          {data.suggestedTrains.length > 0 ? (
            <ul className="space-y-3">
              {data.suggestedTrains.map((train, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700 bg-gray-50 p-2 rounded-lg">
                  <span className="w-1.5 h-1.5 rounded-full bg-railway-blue mt-1.5 shrink-0" />
                  <span>{train}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">No specific trains suggested for this query.</p>
          )}
        </div>

        {/* Travel Stats & Guidance */}
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 p-5 rounded-xl shadow-sm flex items-center gap-4">
            <div className="p-3 bg-blue-50 text-railway-blue rounded-full">
              <Clock size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Estimated Duration</p>
              <p className="text-lg font-bold text-gray-900">{data.estimatedDuration || "N/A"}</p>
            </div>
          </div>

          <div className="bg-orange-50 border border-orange-100 p-5 rounded-xl">
            <h4 className="font-semibold text-orange-900 mb-2 flex items-center gap-2">
              <ShieldCheck size={18} className="text-railway-orange" />
              Passenger Guidance
            </h4>
            <p className="text-sm text-orange-800 leading-relaxed">{data.passengerGuidance}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Travel Tips */}
        <div className="bg-white border border-gray-200 p-5 rounded-xl shadow-sm">
          <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2 border-b pb-2">
            <Info size={18} className="text-green-600" />
            Travel Tips
          </h4>
          <ul className="space-y-2">
            {data.travelTips.map((tip, i) => (
              <li key={i} className="text-sm text-gray-600 flex gap-2">
                <span className="text-green-500 mt-0.5">✔</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>

        {/* Alternative Routes */}
        <div className="bg-white border border-gray-200 p-5 rounded-xl shadow-sm">
          <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2 border-b pb-2">
            <Map size={18} className="text-purple-600" />
            Alternative Routes
          </h4>
          <ul className="space-y-2">
            {data.alternativeRoutes.map((route, i) => (
              <li key={i} className="text-sm text-gray-600 flex gap-2">
                <span className="text-purple-500 mt-0.5">↪</span>
                {route}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}