import type { HTMLAttributes } from "react";

export function Pill({ className = "", children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`inline-flex items-center whitespace-nowrap rounded-[999px] px-2.5 py-1.5 text-[10.5px] font-mono uppercase tracking-wider ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
