import { twMerge } from "tailwind-merge";

type Props = {
  children: React.ReactNode;
  className?: string
};

export function Section({ children, className }: Props) {
  return (
    <section
      className={twMerge("w-full space-y-6 bg-background px-6 py-8 h-screen", className)}
    >
      {children}
    </section>
  );
}
