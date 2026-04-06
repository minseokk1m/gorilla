export default function Loading() {
  return (
    <main className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-8 py-10 animate-pulse">
      <div className="h-8 bg-gray-200 rounded-lg w-64 mb-4" />
      <div className="h-20 bg-gray-100 rounded-2xl mb-5" />
      <div className="h-4 bg-gray-50 rounded w-96 max-w-full mb-10" />
      <div className="space-y-10">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i}>
            <div className="h-6 bg-gray-200 rounded w-56 mb-4" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Array.from({ length: 3 }).map((_, j) => (
                <div key={j} className="h-32 bg-gray-50 rounded-2xl" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
