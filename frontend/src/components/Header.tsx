
type Props = {
  children: React.ReactNode;
};

export function Header({ children }: Props) {
  return (
    <header className="flex justify-between items-center py-4 px-6 bg-white">
      {children}
    </header>
  );
}
