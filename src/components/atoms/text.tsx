import React from "react";

import { Typography, TypographyProps } from "@material-ui/core";

export type TextProps = TypographyProps & {
  fontWeight?:string;
};

export const Text:React.FunctionComponent<TextProps> = React.memo(({ fontWeight, ...props }) => {
  return <Typography {...props} />;
});

export const BoldText:React.FunctionComponent<TextProps> = React.memo(({ style, ...props }) => {
  return <Text style={{ fontWeight: 500, ...style }} {...props} />;
});

