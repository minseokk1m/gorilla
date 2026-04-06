export default function Loading() {
  return (
    <main className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-10 animate-pulse">
      <div className="h-8 bg-gray-200 rounded-lg w-48 mb-3" />
      <div className="h-4 bg-gray-100 rounded w-72 max-w-full mb-8" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-48 bg-gray-50 rounded-2xl" />
        ))}
      </div>
    </main>
  );
}
