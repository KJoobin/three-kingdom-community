import React from "react";

import { Avatar as MaterialAvatar, AvatarProps as MaterialAvatarProps } from "@material-ui/core";

type AvatarProps = MaterialAvatarProps;
export const Avatar:React.FunctionComponent<AvatarProps> = React.memo((props) => {
  return <MaterialAvatar {...props} />;
});
