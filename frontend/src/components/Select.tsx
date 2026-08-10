import { twMerge } from "tailwind-merge";

type Props = React.ComponentProps<"select"> & {
  legend: string;
  id: string;
};

export function Select({ legend, id, className, children, ...Rest }: Props) {
  return (
    <fieldset>
      <legend className="uppercase mb-1.5 text-[#79716B]">{legend}</legend>
      <select
        id={id}
        className={twMerge(
          "w-full border px-4 py-2.5 rounded-xl border-[#E7E5E4]",
          className,
        )}
        {...Rest}
      >
        {children}
      </select>
    </fieldset>
  );
}
