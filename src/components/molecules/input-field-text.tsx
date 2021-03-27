import React from "react";

import { TextField, TextFieldProps } from "@material-ui/core";

export type InputFieldText = TextFieldProps;

export const InputFieldText:React.FunctionComponent<TextFieldProps> = React.memo((props) => {
  return <TextField {...props} />;
});
