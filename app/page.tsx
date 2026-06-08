import GeneralStatsChart from "@/components/landing-page/general-stats-chart";
import HomeLandingPage from "@/components/landing-page/home-landing-page";
import UploadedTexts from "@/components/landing-page/uploaded-texts";
import { getRecentlyUploaded } from "@/lib/texts/select-texts";

export default async function Home() {
  const recentlyUploadedTexts = await getRecentlyUploaded();
  
  return (
    <div>
      <HomeLandingPage />
      <UploadedTexts recentlyUploadedTexts={recentlyUploadedTexts} />
      <GeneralStatsChart />
    </div>
  );
}
