import React from "react";

import { Modal as MaterialModal, ModalProps as MaterialModalProps } from "@material-ui/core";

export type ModalProps = MaterialModalProps;

export const Modal:React.FunctionComponent<ModalProps> = (props) => {
  return <MaterialModal {...props} />;
};
