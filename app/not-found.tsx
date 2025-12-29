
'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-center p-6 selection:bg-yellow-400 selection:text-black">
      <div className="bg-gray-900/50 border border-red-500 rounded-xl p-8 md:p-12 shadow-2xl shadow-red-500/10 w-full max-w-2xl animate-fadeIn">
        <h1 className="text-3xl font-bold text-red-500 mb-4 font-mono">
          404: NODE_NOT_FOUND
        </h1>
        <p className="text-base sm:text-lg text-gray-200 mx-auto mb-8 font-mono">
          The data node you requested is corrupted or does not exist. Your access has been logged.
        </p>
        <div className="flex justify-center">
          <Link href="/id/" className="px-8 py-3 bg-gray-800 text-yellow-400 font-bold rounded-md border border-yellow-400 hover:bg-yellow-400 hover:text-black transition-all duration-300 transform hover:scale-105 font-mono">
            &gt; Return to Base Command
          </Link>
        </div>
      </div>
    </div>
  );
}
