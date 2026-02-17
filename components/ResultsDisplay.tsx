"use client";

import type { AnalysisResult } from "@/types/analyze";

interface ResultsDisplayProps {
  result: AnalysisResult;
}

export default function ResultsDisplay({ result }: ResultsDisplayProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-slate-900">Analysis Results</h2>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-sm font-medium text-slate-500">Vendor</h3>
        <p className="mt-1 text-slate-900">
          {result.vendor_name ?? "—"}
        </p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-sm font-medium text-slate-500">Total Amount</h3>
        <p className="mt-1 text-lg font-semibold text-slate-900">
          {result.total_amount ?? "—"}
        </p>
      </div>

      {result.executive_summary && (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-sm font-medium text-slate-500">
            Executive Summary
          </h3>
          <p className="mt-2 text-slate-700">{result.executive_summary}</p>
        </div>
      )}

      {result.line_items && result.line_items.length > 0 && (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-sm font-medium text-slate-500">
            Line Items
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="pb-2 font-medium text-slate-600">
                    Description
                  </th>
                  <th className="pb-2 font-medium text-slate-600">Amount</th>
                  <th className="pb-2 font-medium text-slate-600">Category</th>
                </tr>
              </thead>
              <tbody>
                {result.line_items.map((item, i) => (
                  <tr
                    key={i}
                    className="border-b border-slate-100 last:border-0"
                  >
                    <td className="py-2 text-slate-800">{item.description}</td>
                    <td className="py-2 text-slate-800">{item.amount}</td>
                    <td className="py-2 text-slate-600">{item.category}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {result.flagged_charges && result.flagged_charges.length > 0 && (
        <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-6 shadow-sm">
          <h3 className="text-sm font-medium text-amber-800">
            Flagged Charges
          </h3>
          <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-amber-900">
            {result.flagged_charges.map((charge, i) => (
              <li key={i}>{charge}</li>
            ))}
          </ul>
        </div>
      )}

      {result.potential_savings && result.potential_savings.length > 0 && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-6 shadow-sm">
          <h3 className="text-sm font-medium text-emerald-800">
            Potential Savings
          </h3>
          <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-emerald-900">
            {result.potential_savings.map((saving, i) => (
              <li key={i}>{saving}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
