import { notFound } from "next/navigation";
import { Metadata } from "next";
import { findOnePage } from "@/modules/common/services/pages.service";
import CmsContainer from "@/components/layouts/cms-container";
import { IPages } from "@/interfaces/page.interface";
import { searchStaticPagesService } from "@/modules/common/services/static-data.service";

export const revalidate = 60;
export const dynamicParams = true;

type Props = {
  params: Promise<{ slug: string; locale: string }>;
};

export async function generateStaticParams(params: any) {
  const { data } = await searchStaticPagesService();

  if (!data?.length) {
    return [];
  }

  return data?.map((pages: IPages) => ({
    slug: String(pages?.slug),
    region: params?.region || process.env.NEXT_PUBLIC_DEFAULT_REGION || "hab",
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  try {
    const { data: page, error } = await findOnePage(slug);

    if (!page || error) {
      return {
        title: "Default Title",
        description: "Default description for this page.",
      };
    }

    return {
      title: page.title,
      description: page.description || "",
      keywords: page.slug ? [page.slug] : undefined,
    };
  } catch (error) {
    console.warn(`Failed to generate metadata for ${slug}:`, error);
    return {
      title: "Page",
      description: "Page description",
    };
  }
}

export default async function Page({ params }: Props) {
  const { slug, locale } = await params;
  const { data: page, error } = await findOnePage(slug, {
    headers: { "Accept-Language": locale },
  });

  if (!page || error) {
    notFound();
  }

  return <CmsContainer page={page} />;
}
