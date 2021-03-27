import React from "react";

import { ImageProps } from "next/image";


export const Image:React.FunctionComponent<ImageProps> = (props) => {
  return <img {...props} />;
};
