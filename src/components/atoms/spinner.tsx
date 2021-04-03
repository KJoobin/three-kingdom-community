import React from "react";

import { CircularProgress, CircularProgressProps } from "@material-ui/core";

type SpinnerProps = CircularProgressProps;


export const Spinner:React.FunctionComponent<SpinnerProps> = (props) => {
  return <CircularProgress {...props} />;
};
