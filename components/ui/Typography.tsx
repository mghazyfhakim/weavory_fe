import { PropsWithChildren } from "react";

export function H1({ children }: PropsWithChildren<{}>) {
  return (
    <h1 className="text-4xl md:text-5xl font-heading font-bold text-slate-900">
      {children}
    </h1>
  );
}

export function H2({ children }: PropsWithChildren<{}>) {
  return (
    <h2 className="text-3xl md:text-4xl font-heading font-semibold text-slate-900">
      {children}
    </h2>
  );
}

export function P({ children }: PropsWithChildren<{}>) {
  return (
    <p className="text-sm md:text-base font-body text-slate-600 leading-relaxed">
      {children}
    </p>
  );
}