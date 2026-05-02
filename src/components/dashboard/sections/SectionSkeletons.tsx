/** Suspense fallback skeletons for dashboard sections — animate-pulse 회색 박스. */

export function FunnelSkeleton() {
  return (
    <section className="toss-card animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-32 mb-2" />
      <div className="h-3 bg-gray-100 rounded w-72 mb-4" />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="rounded-2xl bg-gray-100 ring-1 ring-gray-200 p-3 h-24" />
        ))}
      </div>
    </section>
  );
}

export function SellStripSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="toss-card animate-pulse !bg-gray-50">
          <div className="h-4 bg-gray-200 rounded w-32 mb-3" />
          <div className="space-y-2">
            <div className="h-12 bg-gray-100 rounded" />
            <div className="h-12 bg-gray-100 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function HotColdSentimentSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="toss-card animate-pulse !bg-gray-50">
          <div className="h-4 bg-gray-200 rounded w-32 mb-3" />
          <div className="space-y-1.5">
            <div className="h-8 bg-gray-100 rounded" />
            <div className="h-8 bg-gray-100 rounded" />
            <div className="h-8 bg-gray-100 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}
