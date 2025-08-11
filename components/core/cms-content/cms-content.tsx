import React from "react";

type Props = {
  content: string;
};
const CmsContent = ({ content }: Props) => {
  return (
    <section className="prose max-w-none">
      <div dangerouslySetInnerHTML={{ __html: content ?? "" }} />
    </section>
  );
};

export default CmsContent;
