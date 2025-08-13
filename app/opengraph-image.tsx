import OpenGraphImage from "@/lib/metadata/opengraph-image";

export const runtime = "edge";

export default async function Image() {
  return await OpenGraphImage();
}
