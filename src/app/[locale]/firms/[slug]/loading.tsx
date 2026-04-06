export default function Loading() {
  return (
    <main className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-8 py-10 animate-pulse">
      <div className="h-4 bg-gray-100 rounded w-40 mb-6" />
      <div className="h-10 bg-gray-200 rounded-lg w-72 mb-2" />
      <div className="h-5 bg-gray-100 rounded w-48 mb-8" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="h-64 bg-gray-100 rounded-2xl" />
        <div className="h-64 bg-gray-50 rounded-2xl" />
      </div>
    </main>
  );
}
