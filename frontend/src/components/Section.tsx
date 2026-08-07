type Props = {
  children: React.ReactNode;
};

export function Section({ children }: Props) {
  return (
    <section className="h-fit w-full space-y-6 bg-background px-6 py-8">
      {children}
    </section>
  );
}
