type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

// Section container: max 1440, desktop margins per the reference (120px from
// lg up), narrower on mobile/tablet.
export function Container({ children, className = "" }: ContainerProps) {
  return (
    <div
      className={`mx-auto w-full max-w-[1440px] px-space-6 md:px-space-8 lg:px-[120px] ${className}`}
    >
      {children}
    </div>
  );
}
