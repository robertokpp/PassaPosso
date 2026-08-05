import { twMerge } from "tailwind-merge";

type Props = React.ComponentProps<"input"> & {
  legend: string;
};

export function Input({ legend, className }: Props) {
  return (
    <fieldset>
      <legend className="uppercase text-[#79716B]">{legend}</legend>
      <input type="text" className={twMerge("w-full border px-4 py-2.5 rounded-xl border-[#E7E5E4]", className)} />
    </fieldset>
  );
}
