import { PropsWithChildren } from "react";

const List = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex flex-col gap-y-6 justify-center items-center h-full w-full overflow-auto">
      {children}
    </div>
  );
};

export default List;
