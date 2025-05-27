import { Header, Hero, SubjectGrid, FAQ, Footer } from '@/components';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <SubjectGrid />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
