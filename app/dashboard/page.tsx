"use client";

import Link from "next/link";
import { useState } from "react";
import FileUpload from "@/components/FileUpload";
import Loader from "@/components/Loader";
import ResultsDisplay from "@/components/ResultsDisplay";
import type { AnalysisResult } from "@/types/analyze";

export default function DashboardPage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleAnalyze() {
    if (!file) return;
    setError(null);
    setResult(null);
    setLoading(true);
    try {
      const formData = new FormData();
      formData.set("file", file);
      const res = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Analysis failed");
        return;
      }
      setResult(data as AnalysisResult);
    } catch (e) {
      setError("Request failed. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white shadow-sm">
        <div className="mx-auto max-w-4xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="text-xl font-semibold text-slate-800 hover:text-slate-900"
            >
              BillIntel<span className="text-emerald-600">.AI</span>
            </Link>
            <Link
              href="/"
              className="text-sm font-medium text-slate-600 hover:text-slate-900"
            >
              ← Home
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-slate-900">Invoice Analysis</h1>
        <p className="mt-1 text-slate-600">
          Upload a PDF invoice and click Analyze to get AI-powered insights.
        </p>

        <div className="mt-8">
          <FileUpload
            file={file}
            onFileChange={setFile}
            accept="application/pdf"
            disabled={loading}
          />
          <div className="mt-4">
            <button
              type="button"
              onClick={handleAnalyze}
              disabled={!file || loading}
              className="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition disabled:cursor-not-allowed disabled:opacity-50 hover:bg-emerald-700"
            >
              Analyze
            </button>
          </div>
        </div>

        {loading && <Loader />}

        {error && (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4">
            <div className="flex items-start">
              <svg
                className="mr-3 h-5 w-5 flex-shrink-0 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                />
              </svg>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-red-800">
                  {error.includes("doesn't appear to be an invoice") 
                    ? "Invalid Document Type" 
                    : "Error"}
                </h3>
                <p className="mt-1 text-sm text-red-700">{error}</p>
                {error.includes("doesn't appear to be an invoice") && (
                  <p className="mt-2 text-xs text-red-600">
                    Please ensure your document contains invoice-related information such as vendor name, line items, amounts, or billing details.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {result && !loading && (
          <div className="mt-8">
            <ResultsDisplay result={result} />
          </div>
        )}
      </main>
    </div>
  );
}
