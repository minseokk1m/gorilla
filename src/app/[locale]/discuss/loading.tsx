export default function Loading() {
  return (
    <main className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-8 py-10 animate-pulse">
      <div className="h-8 bg-gray-200 rounded-lg w-48 mb-3" />
      <div className="h-4 bg-gray-100 rounded w-72 max-w-full mb-8" />
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-24 bg-gray-50 rounded-2xl" />
        ))}
      </div>
    </main>
  );
}
