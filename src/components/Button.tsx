type Props = {
  children: React.ReactNode;
  onClick: () => void;
};

const Button = ({ children, onClick }: Props) => {
  return (
    <button className="border rounded-md px-2 py-0.5" onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
