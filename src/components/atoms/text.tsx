import React from "react";

import { Typography, TypographyProps } from "@material-ui/core";

export type TextProps = TypographyProps;

export const Text:React.FunctionComponent<TextProps> = React.memo((props) => {
  return <Typography {...props} />;
});
