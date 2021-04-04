import React from "react";

import { Container as MaterialContainer, ContainerProps as MaterialContainerProps } from "@material-ui/core";

export type ContainerProps = MaterialContainerProps;

export const Container:React.FunctionComponent<ContainerProps> = React.memo((props) => {
  return <MaterialContainer {...props} />;
});