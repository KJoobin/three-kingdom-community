import React from "react";

import { Button as MaterialButton, ButtonProps as MaterialButtonProps } from "@material-ui/core";

export type ButtonProps = MaterialButtonProps;


export const Button:React.FunctionComponent<ButtonProps> = React.memo((props) => {
  return <MaterialButton {...props} />;
});
