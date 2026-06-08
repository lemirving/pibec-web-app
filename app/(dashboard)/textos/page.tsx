
import TextsPageClient from "./texts-page-client";
import { getFeaturedTexts } from "@/lib/texts/select-texts";

export default async function TextsPage() {
  const texts = await getFeaturedTexts();
  return <TextsPageClient initialTexts={texts} />;
}