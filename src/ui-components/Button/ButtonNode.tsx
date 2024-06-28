import React from "react";
import { Button, ButtonProps } from "../shadcomponents/components/ui/button";

export interface INodeButtonProps extends ButtonProps {
  label?: string;
  icon?: React.ReactNode;
}

function ButtonNode(props: INodeButtonProps) {
  const { label, children, className, icon, ...rest } = props;
  return (
    <Button
      className={`${className} bg-transparent text-blue-500  items-center justify-center border-2 border-blue-500 rounded-md p-4`}
      {...rest}
    >
      {icon && <div className="mb-2">{icon}</div>}
      {label ? label : children}
    </Button>
  );
}

export default ButtonNode;
