import React from "react";

import { Card as MaterialCard, CardProps as MaterialCardProps } from "@material-ui/core";

export type CardProps = MaterialCardProps;


export const Card:React.FunctionComponent<CardProps> = React.memo((props) => {
  return <MaterialCard {...props} />;
});

export const PointerCard:React.FunctionComponent<CardProps> = React.memo(({ style, ...props }) => {
  return <Card style={{ cursor: "pointer", borderColor: "divider", ...style }} {...props} />;
});
