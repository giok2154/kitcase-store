import HomeHero from "@/components/HomeHero";
import HomeKits from "@/components/HomeKits";
import HomeBestSeller from "@/components/HomeBestSeller";
import HomeProducts from "@/components/HomeProducts";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl px-6">
      <HomeHero />
      <HomeKits />
      <HomeBestSeller />
      <HomeProducts />
    </main>
  );
}
