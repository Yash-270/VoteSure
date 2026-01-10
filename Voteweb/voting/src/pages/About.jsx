export const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-green-700 mb-4">
            About Our Voting Platform
          </h1>
          <p className="text-gray-600 text-lg">
            A simple, secure and transparent way to participate in elections online.
          </p>
        </div>

        {/* WHAT IS THIS */}
        <div className="bg-white p-8 rounded-xl shadow mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            🗳️ What is VoteSure?
          </h2>
          <p className="text-gray-700 leading-relaxed">
            This VoteSure is a web-based application that allows
            registered users to vote digitally. It eliminates the need for
            physical polling booths while ensuring security, accuracy and fairness
            in the voting process.
          </p>
        </div>

        {/* FEATURES */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <div className="text-3xl mb-3">🔐</div>
            <h3 className="font-semibold text-lg mb-2">Secure</h3>
            <p className="text-gray-600 text-sm">
              Authentication-based voting ensures that each voter can vote only once.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow text-center">
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="font-semibold text-lg mb-2">Fast & Easy</h3>
            <p className="text-gray-600 text-sm">
              Simple interface that allows users to cast votes within seconds.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow text-center">
            <div className="text-3xl mb-3">📊</div>
            <h3 className="font-semibold text-lg mb-2">Transparent</h3>
            <p className="text-gray-600 text-sm">
              Real-time vote counting provides complete transparency.
            </p>
          </div>

        </div>

        {/* HOW IT WORKS */}
        <div className="bg-white p-8 rounded-xl shadow mb-12">
          <h2 className="text-2xl font-semibold mb-6">
            ⚙️ How It Works
          </h2>

          <ol className="space-y-3 text-gray-700 list-decimal list-inside">
            <li>User signs up and logs into the system</li>
            <li>Voter views the list of candidates</li>
            <li>Each voter can cast only one vote</li>
            <li>Votes are counted securely</li>
            <li>Admins can view final results</li>
          </ol>
        </div>

        {/* TECH STACK */}
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-3">
            🛠️ Technology Used
          </h2>
          <p className="text-gray-600">
            React • Tailwind CSS • Node.js • Express • MongoDB
          </p>
        </div>

      </div>
    </div>
  );
};


