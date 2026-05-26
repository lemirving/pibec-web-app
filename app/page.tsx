import GeneralStatsChart from "@/components/landing-page/general-stats-chart";
import HomeLandingPage from "@/components/landing-page/home-landing-page";
import UploadedTexts from "@/components/landing-page/uploaded-texts";

export default function Home() {
  return (
    <div>
      <HomeLandingPage />
      <UploadedTexts />
      <GeneralStatsChart />
    </div>
  );
}
