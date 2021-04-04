import React, { ReactNode } from "react";

import MaterialImage from "material-ui-image";

export interface ImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "loading"> {
  animationDuration?: number;
  aspectRatio?: number;
  cover?: boolean;
  color?: string;
  disableError?: boolean;
  disableSpinner?: boolean;
  disableTransition?: boolean;
  errorIcon?: ReactNode;
  iconContainerStyle?: object;
  imageStyle?: object;
  loading?: ReactNode;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  onLoad?: (event?: React.SyntheticEvent<HTMLImageElement>) => void;
  onError?: (event?: React.SyntheticEvent<HTMLImageElement>) => void;
  src: string;
  style?: object;
}

export const Image:React.FunctionComponent<ImageProps> = (props) => {
  return <MaterialImage {...props} />;
};
