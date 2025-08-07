'use client'; 
import React, { memo, JSX } from 'react';
import { Trans } from 'react-i18next';

const defaultComponents = {
  primary: <span className="text-primary" />,  
  error: <span className="text-danger" />,
  bold: <span className="font-bold" />, 
  semibold: <span className="font-semibold" />,
  br: <br />,
  breakWord: <p className="!pt-2 md:pt-4" />
};

export type TransTypographyProps = {
  message: string;
  values?: object;
  components?: object;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
};

const TransTypography = ({
  message,
  values = {},
  components = {},
  className,
  as: Component = 'span'
}:  TransTypographyProps) => {
  return (
    <Component className={className}>
      <Trans
        i18nKey={message}
        components={{ ...defaultComponents, ...components }}
        values={values}
      />
    </Component>
  );
};

export default memo(TransTypography);

