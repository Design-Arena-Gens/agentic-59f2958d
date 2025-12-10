import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { MetricsBar } from "@/components/MetricsBar";
import { FeatureGrid } from "@/components/FeatureGrid";
import { WorkflowDiagram } from "@/components/WorkflowDiagram";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />
      <main>
        <Hero />
        <MetricsBar />
        <FeatureGrid />
        <WorkflowDiagram />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
