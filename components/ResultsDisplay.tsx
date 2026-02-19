"use client";

import type { AnalysisResult } from "@/types/analyze";

interface ResultsDisplayProps {
  result: AnalysisResult;
}

export default function ResultsDisplay({ result }: ResultsDisplayProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Analysis Results</h2>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Vendor</h3>
        <p className="mt-1 text-slate-900 dark:text-slate-100">
          {result.vendor_name ?? "—"}
        </p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Amount</h3>
        <p className="mt-1 text-lg font-semibold text-slate-900 dark:text-slate-100">
          {result.total_amount ?? "—"}
        </p>
      </div>

      {result.executive_summary && (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">
            Executive Summary
          </h3>
          <p className="mt-2 text-slate-700 dark:text-slate-300">{result.executive_summary}</p>
        </div>
      )}

      {result.line_items && result.line_items.length > 0 && (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <h3 className="mb-4 text-sm font-medium text-slate-500 dark:text-slate-400">
            Line Items
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-600">
                  <th className="pb-2 font-medium text-slate-600 dark:text-slate-400">
                    Description
                  </th>
                  <th className="pb-2 font-medium text-slate-600 dark:text-slate-400">Amount</th>
                  <th className="pb-2 font-medium text-slate-600 dark:text-slate-400">Category</th>
                </tr>
              </thead>
              <tbody>
                {result.line_items.map((item, i) => (
                  <tr
                    key={i}
                    className="border-b border-slate-100 last:border-0 dark:border-slate-700"
                  >
                    <td className="py-2 text-slate-800 dark:text-slate-200">{item.description}</td>
                    <td className="py-2 text-slate-800 dark:text-slate-200">{item.amount}</td>
                    <td className="py-2 text-slate-600 dark:text-slate-400">{item.category}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {result.flagged_charges && result.flagged_charges.length > 0 && (
        <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-6 shadow-sm dark:border-amber-800 dark:bg-amber-950/30">
          <h3 className="text-sm font-medium text-amber-800 dark:text-amber-200">
            Flagged Charges
          </h3>
          <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-amber-900 dark:text-amber-100">
            {result.flagged_charges.map((charge, i) => (
              <li key={i}>{charge}</li>
            ))}
          </ul>
        </div>
      )}

      {result.potential_savings && result.potential_savings.length > 0 && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-6 shadow-sm dark:border-emerald-800 dark:bg-emerald-950/30">
          <h3 className="text-sm font-medium text-emerald-800 dark:text-emerald-200">
            Potential Savings
          </h3>
          <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-emerald-900 dark:text-emerald-100">
            {result.potential_savings.map((saving, i) => (
              <li key={i}>{saving}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
