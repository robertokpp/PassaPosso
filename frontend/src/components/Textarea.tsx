import { twMerge } from "tailwind-merge";

type Props = React.ComponentProps<"textarea"> & {
  legend: string;
};

export function Textarea({ legend, className,...Rest }: Props) {
  return (
    <fieldset>
      <legend className="uppercase text-[#79716B]">{legend}</legend>
      <textarea className={twMerge("w-full border px-4 py-2.5 rounded-xl border-[#E7E5E4]", className)} {...Rest}/>
    </fieldset>
  );
}