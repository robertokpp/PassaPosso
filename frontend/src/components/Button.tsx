import { twMerge } from "tailwind-merge";

type Props = React.ComponentProps<"button"> & {
  isLoading?: boolean;
};

export function Button({ children, className, ...Rest }: Props) {
  return (
    <button
      className={twMerge("bg-icon justify-center items-center flex  py-2 px-4 gap-2 rounded-xl text-white", className)}
      {...Rest}
    >
      {children}
    </button>
  );
}
