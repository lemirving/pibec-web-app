import GeneralStatsChart from "@/components/landing-page/general-stats-chart";
import HomeLandingPage from "@/components/landing-page/home-landing-page";
import UploadedTexts from "@/components/landing-page/uploaded-texts";
import { TextCardSkeleton } from "@/components/texts/text-card-skeleton";
import { getRecentlyUploaded } from "@/lib/texts/select-texts";
import { Suspense } from "react";

async function UploadedTextsFetcher() {
  const recentlyUploadedTexts = await getRecentlyUploaded();
  
  return <UploadedTexts recentlyUploadedTexts={recentlyUploadedTexts} />;
}

export default async function Home() {
[]  
  return (
    <div>
      <HomeLandingPage />
      <Suspense fallback={
          <section className="py-20 bg-muted/20">
            <div className="wrapper">
               <div className="h-10 w-64 bg-muted animate-pulse rounded-md mb-8" />
               
               <div className="grid-wrapper">
                 <TextCardSkeleton />
                 <TextCardSkeleton />
                 <TextCardSkeleton />
                 <TextCardSkeleton />
               </div>
            </div>
          </section>
      }>
        {UploadedTextsFetcher()}
      </Suspense>
      <GeneralStatsChart />
    </div>
  );
}
