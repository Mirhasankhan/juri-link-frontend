import { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

const Container = ({ children, className = "" }: ContainerProps) => {
  return <div className={`px-3 md:mx-auto md:max-w-[1500px] ${className}`}>{children}</div>;
};

export default Container;