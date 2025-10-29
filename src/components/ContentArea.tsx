import { ReactNode } from "react";

type ContentAreaProps = {
  children: ReactNode;
};

export const ContentArea = ({ children }: ContentAreaProps) => {
  return <div className="z-10 flex flex-col items-center px-4">{children}</div>;
};
