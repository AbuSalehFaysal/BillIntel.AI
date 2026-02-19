export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-8">
      <div
        className="h-10 w-10 animate-spin rounded-full border-2 border-slate-300 border-t-emerald-600 dark:border-slate-600 dark:border-t-emerald-400"
        aria-hidden
      />
      <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Analyzing invoice…</p>
    </div>
  );
}
