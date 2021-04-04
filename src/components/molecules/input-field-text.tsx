import React, { forwardRef } from "react";

import { TextField, TextFieldProps } from "@material-ui/core";

export type InputFieldTextProps = TextFieldProps;

export const InputFieldText:React.FunctionComponent<InputFieldTextProps> = React.memo(forwardRef((props, ref) => {
  return <TextField ref={ref} {...props} />;
}));
