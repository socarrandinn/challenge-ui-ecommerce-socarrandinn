import { IPages } from "@/interfaces/page.interface";
import CmsContent from "../core/cms-content/cms-content";
import Container from "./container";

type Props = {
  page: IPages;
};
const CmsContainer = ({ page }: Props) => {
  return (
    <Container>
      <article className="flex flex-col gap-4 mt-5">
        <h1 className="text-2xl md:text-3xl font-bold">{page?.title}</h1>
        <CmsContent content={page?.description} />
      </article>
    </Container>
  );
};

export default CmsContainer;
