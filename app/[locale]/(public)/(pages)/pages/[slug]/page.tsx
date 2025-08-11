import { notFound } from "next/navigation";
import { Metadata } from "next";
import { findOnePage } from "@/modules/common/services/pages.service";
import CmsContainer from "@/components/layouts/cms-container";

export const revalidate = 60;
export const dynamicParams = true;

export const PAGES = ["about-us", "payment", "delivery", "faq"];

export async function generateStaticParams(params: any) {
  return PAGES?.map((pages) => ({
    slug: String(pages),
    region: params?.region || process.env.NEXT_PUBLIC_DEFAULT_REGION || "hab",
  }));
}

type Props = {
  params: Promise<{ slug: string; locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { data: page, error } = await findOnePage(slug);

  if (!page || error)
    return {
      title: "not-found",
    };

  return {
    title: page?.title,
    description: page.description,
    keywords: [page?.slug],
  };
}

export default async function StaticCmsPage({ params }: Props) {
  const { slug } = await params;
  console.log(slug, "ENTRE");

  const { data: page, error } = await findOnePage(slug);

  if (!page || error) return notFound();

  return <CmsContainer page={page} />;
}
