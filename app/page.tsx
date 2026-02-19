import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      {/* Hero */}
      <header className="border-b border-slate-200/80 bg-white/95 shadow-sm dark:border-slate-700 dark:bg-slate-900/95">
        <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <span className="text-xl font-semibold text-slate-800 dark:text-slate-100">
              BillIntel<span className="text-emerald-600 dark:text-emerald-400">.AI</span>
            </span>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Link
                href="/dashboard"
                className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-700"
              >
                Try Demo
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <section className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
            AI Financial Watchdog for Your Business Invoices
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 dark:text-slate-300">
            Upload any invoice PDF. Get instant AI analysis, line-item breakdowns,
            flagged charges, and potential savings—so you stay in control of
            spending.
          </p>
          <div className="mt-10">
            <Link
              href="/dashboard"
              className="inline-flex items-center rounded-lg bg-emerald-600 px-6 py-3 text-base font-semibold text-white shadow-md transition hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600"
            >
              Try Demo
            </Link>
          </div>
        </section>

        {/* 3 steps */}
        <section className="mt-24 grid gap-10 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 font-semibold dark:bg-emerald-900/50 dark:text-emerald-400">
              1
            </div>
            <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-slate-100">
              Upload Invoice
            </h3>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              Drop your PDF invoice. We support standard vendor and utility
              invoices.
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 font-semibold dark:bg-emerald-900/50 dark:text-emerald-400">
              2
            </div>
            <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-slate-100">
              AI Analysis
            </h3>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              Our AI extracts vendor, totals, line items, and flags anything
              unusual.
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 font-semibold dark:bg-emerald-900/50 dark:text-emerald-400">
              3
            </div>
            <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-slate-100">
              Cost Insights
            </h3>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              See executive summary, line items, flagged charges, and potential
              savings.
            </p>
          </div>
        </section>

        <section className="mt-24 text-center">
          <Link
            href="/dashboard"
            className="inline-flex items-center rounded-lg bg-slate-900 px-6 py-3 text-base font-semibold text-white shadow-md transition hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-700"
          >
            Try Demo
          </Link>
        </section>
      </main>

      <footer className="mt-24 border-t border-slate-200 py-8 dark:border-slate-700">
        <div className="mx-auto max-w-6xl px-4 text-center text-sm text-slate-500 dark:text-slate-400">
          BillIntel.AI — Demo MVP. No auth, no database, no payment.
        </div>
      </footer>
    </div>
  );
}
