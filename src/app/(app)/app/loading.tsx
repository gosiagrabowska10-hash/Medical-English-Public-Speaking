export default function Loading() {
  return (
    <div aria-busy="true" aria-label="Loading" className="space-y-6">
      <div className="h-12 w-2/3 animate-pulse rounded-sm bg-stone" />
      <div className="grid gap-5 md:grid-cols-3">{[0, 1, 2].map((i) => <div key={i} className="h-40 animate-pulse rounded-sm bg-white" />)}</div>
    </div>
  );
}
