import React, { forwardRef } from "react";

import { Box as MaterialBox, BoxProps as MaterialBoxProps } from "@material-ui/core";

export type BoxProps = MaterialBoxProps & {
  ref?: any;
}


export const Box:React.FunctionComponent<BoxProps> = React.memo(forwardRef((props, ref) => {
  return <MaterialBox {...props} {...{ ref } as any} />;
}));
