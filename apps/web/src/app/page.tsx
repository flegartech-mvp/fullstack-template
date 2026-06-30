const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";
const GITHUB_URL = "https://github.com/FlegarTech/fullstack-template";

const features = [
  { icon: "🌐", title: "Next.js 15 Frontend", desc: "App Router, Server Components, Tailwind CSS 4" },
  { icon: "🔧", title: "Express API", desc: "TypeScript, Zod validation, JWT auth, error handling" },
  { icon: "🗄️", title: "PostgreSQL + Prisma", desc: "Type-safe ORM, migrations, seed data, Docker" },
];

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="max-w-2xl w-full text-center space-y-8">
        <div>
          <span className="inline-block text-5xl mb-4" aria-hidden="true">⚡</span>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Fullstack Template</h1>
          <p className="text-xl text-gray-600">
            Production-ready monorepo starter. Next.js 15 + Express API + PostgreSQL + Prisma + TypeScript.
          </p>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left list-none">
          {features.map((card) => (
            <li key={card.title} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <div className="text-2xl mb-2" aria-hidden="true">{card.icon}</div>
              <h2 className="font-semibold text-gray-900 mb-1 text-base">{card.title}</h2>
              <p className="text-sm text-gray-500">{card.desc}</p>
            </li>
          ))}
        </ul>

        <div className="bg-gray-900 rounded-xl p-6 text-left text-sm font-mono text-green-400 space-y-1 overflow-x-auto">
          <p><span className="text-gray-500"># Clone and start in 3 commands</span></p>
          <p>git clone &lt;repo-url&gt; my-app &amp;&amp; cd my-app</p>
          <p>cp .env.example .env</p>
          <p>pnpm install &amp;&amp; pnpm docker:up &amp;&amp; pnpm db:migrate &amp;&amp; pnpm dev</p>
        </div>

        <div className="flex gap-4 justify-center flex-wrap">
          <a
            href={`${API_URL}/health`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-600 focus-visible:outline-none"
          >
            Check API health →
          </a>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-gray-700 border border-gray-300 px-5 py-2.5 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-400 focus-visible:outline-none"
          >
            View on GitHub
          </a>
        </div>
      </div>
    </main>
  );
}
