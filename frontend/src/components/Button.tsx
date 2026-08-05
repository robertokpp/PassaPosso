import { twMerge } from "tailwind-merge";

type Props = React.ComponentProps<"button"> & {
  isLoading?: boolean;
  variant?: keyof typeof variants;
};

const variants = {
  primary: "bg-icon",
  secondary: "bg-transparent border-none text-[#79716B]",
};

export function Button({
  children,
  className,
  variant = "primary",
  ...Rest
}: Props) {
  const varianteButton = variants[variant];
  return (
    <button
      className={twMerge(
        `justify-center items-center flex py-2 px-4 gap-2 rounded-xl text-white cursor-pointer ${varianteButton}`,
        className,
      )}
      {...Rest}
    >
      {children}
    </button>
  );
}
