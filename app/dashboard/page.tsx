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
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
            {error}
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
