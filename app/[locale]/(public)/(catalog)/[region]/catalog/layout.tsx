/**
 * @author: Angel Labrada Massó
 * @version: v0.0.1
 * @date:
 */
import React, { memo, ReactNode } from 'react';
import ShapesWrapper from '@/components/core/shapes-wrapper/shapes-wrapper';
import Container from '@/components/ui/container';

type Props = {
  children?: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <ShapesWrapper
      imgLeft="/images/shapes/shape-left-1.webp"
      imgLeftClass="!-left-[140px] h-[617px] w-[624px] !top-[480px]"
      imgRight="/images/shapes/shape-right-1.webp"
      imgRightClass="!-right-[85px] h-[617px] w-[624px]"
      sizesLeft="(max-width: 624px) 100vw, (max-width:617px) 50vw, 33vw"
      sizesRight="(max-width: 624px) 100vw, (max-width:617px) 50vw, 33vw"
      loading="eager"
    >
      <Container>{children}</Container>
    </ShapesWrapper>
  );
};

export default memo(Layout);
