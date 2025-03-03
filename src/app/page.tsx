export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-24">
      <div className="max-w-5xl w-full">
        {/* Header */}
        <header className="flex items-center justify-between mb-12">
          <h1 className="text-3xl font-bold text-app-purple">Predictive.film</h1>
          <nav className="flex gap-4">
            <div className="text-sm text-app-text-primary border-b-2 border-app-purple px-2 py-1 uppercase">Predictions</div>
            <div className="text-sm text-app-text-secondary px-2 py-1 uppercase">Visualizations</div>
            <div className="text-sm text-app-text-secondary px-2 py-1 uppercase">About</div>
          </nav>
        </header>

        {/* Welcome Message */}
        <div className="bg-app-card p-6 rounded-lg mb-8 border-l-4 border-app-purple">
          <p className="text-app-text-primary">
            Welcome to the Oscar Predictions application, where machine learning meets Hollywood!
          </p>
        </div>

        {/* Predictions Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-4 text-app-text-primary">2025 Oscar Predictions</h2>
          <p className="text-app-text-secondary mb-8">
            Using historical data, other award winners, and betting odds to predict who will win at the Academy Awards.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="bg-app-card p-6 rounded-lg border border-app-card hover:border-app-purple transition-all hover:-translate-y-1">
              <h3 className="text-center font-medium mb-2">Best Picture</h3>
              <p className="text-center text-sm text-app-text-secondary italic mb-4">Oppenheimer</p>
              <p className="text-center text-2xl font-bold text-app-purple">83%</p>
            </div>

            {/* Card 2 */}
            <div className="bg-app-card p-6 rounded-lg border border-app-card hover:border-app-purple transition-all hover:-translate-y-1">
              <h3 className="text-center font-medium mb-2">Best Director</h3>
              <p className="text-center text-sm text-app-text-secondary italic mb-4">Christopher Nolan</p>
              <p className="text-center text-2xl font-bold text-app-purple">78%</p>
            </div>

            {/* Card 3 */}
            <div className="bg-app-card p-6 rounded-lg border border-app-card hover:border-app-purple transition-all hover:-translate-y-1">
              <h3 className="text-center font-medium mb-2">Best Actor</h3>
              <p className="text-center text-sm text-app-text-secondary italic mb-4">Cillian Murphy</p>
              <p className="text-center text-2xl font-bold text-app-purple">91%</p>
            </div>

            {/* Card 4 */}
            <div className="bg-app-card p-6 rounded-lg border border-app-card hover:border-app-purple transition-all hover:-translate-y-1">
              <h3 className="text-center font-medium mb-2">Best Actress</h3>
              <p className="text-center text-sm text-app-text-secondary italic mb-4">Lily Gladstone</p>
              <p className="text-center text-2xl font-bold text-app-purple">68%</p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-app-card pt-6 mt-12 text-center text-sm text-app-text-secondary">
          &copy; 2025 Predictive.film | Oscar predictions made using machine learning
        </footer>
      </div>
    </main>
  )
}