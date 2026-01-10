import { NavLink } from "react-router";

export const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      
      {/* HERO SECTION */}
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-green-700 mb-4">
          🗳️ Your Vote Matters
        </h1>

        <p className="text-gray-600 text-lg mb-6">
          Welcome to the VoteSure — a secure, transparent and
          easy-to-use platform where every vote counts.
        </p>

        <NavLink
          to="/candidates"
          className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg
                     hover:bg-green-700 transition"
        >
          Vote Now
        </NavLink>
      </div>

      {/* FEATURES */}
      <div className="max-w-5xl mx-auto mt-16 grid md:grid-cols-3 gap-6">
        
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <h3 className="text-xl font-semibold mb-2">🔐 Secure Voting</h3>
          <p className="text-gray-600 text-sm">
            Each user can vote only once using secure authentication.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow text-center">
          <h3 className="text-xl font-semibold mb-2">⚡ Fast & Easy</h3>
          <p className="text-gray-600 text-sm">
            Vote anytime, anywhere with just a few clicks.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow text-center">
          <h3 className="text-xl font-semibold mb-2">📊 Transparent Results</h3>
          <p className="text-gray-600 text-sm">
            Real-time vote counting ensures complete transparency.
          </p>
        </div>
      </div>

      {/* FOOTER TEXT */}
      <p className="text-center text-gray-500 text-sm mt-16">
        Democracy is strongest when everyone participates 🇮🇳
      </p>
    </div>
  );
};
