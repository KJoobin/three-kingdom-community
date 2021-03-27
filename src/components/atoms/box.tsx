import React from "react";

import { Box as MaterialBox, BoxProps as MaterialBoxProps } from "@material-ui/core";

export type BoxProps = MaterialBoxProps;


export const Box:React.FunctionComponent<BoxProps> = React.memo((props) => {
  return <MaterialBox {...props} />;
});
