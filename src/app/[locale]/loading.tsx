export default function Loading() {
  return (
    <main className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-10 animate-pulse">
      <div className="h-8 bg-gray-200 rounded-lg w-64 mb-3" />
      <div className="h-4 bg-gray-100 rounded w-96 max-w-full mb-10" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-28 bg-gray-100 rounded-2xl" />
        ))}
      </div>
      <div className="space-y-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-16 bg-gray-50 rounded-2xl" />
        ))}
      </div>
    </main>
  );
}
