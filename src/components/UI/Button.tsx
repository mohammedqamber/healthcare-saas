import { ReactNode } from "react";

const Button = ({
  children,
  loading,
}: {
  children: ReactNode;
  loading?: boolean;
}) => {
  return (
    <button
      disabled={loading}
      className="w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-white hover:bg-(--primary)/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      {children}
    </button>
  );
};

export default Button;
