import React, { memo, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Props = {
  children?: ReactNode;
  className?: string;
};

const Container = ({ children, className }: Props) => {
  return (
    <div
      className={cn(
        `container mx-auto max-w-[1447px] px-2 md:px-4 lg:px-8`,
        className
      )}
    >
      {children}
    </div>
  );
};

export default memo(Container);
