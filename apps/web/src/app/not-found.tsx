import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="max-w-md w-full text-center space-y-6">
        <span className="inline-block text-5xl" aria-hidden="true">🔍</span>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Page not found</h1>
          <p className="text-gray-600">
            The page you’re looking for doesn’t exist or has moved.
          </p>
        </div>
        <Link
          href="/"
          className="inline-block bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-600 focus-visible:outline-none"
        >
          ← Back to home
        </Link>
      </div>
    </main>
  );
}
