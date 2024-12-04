import { cn } from "@/lib/utils";

interface ShellProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Shell({ children, className, ...props }: ShellProps) {
  return (
    <div
      className={cn(
        "grid items-center justify-center min-h-screen p-6 bg-muted/50",
        className
      )}
      {...props}
    >
      <div className="w-full space-y-6">
        <div className="flex items-center justify-center">
          <span className="font-semibold text-lg">vetflow</span>
        </div>
        <div className="border bg-card text-card-foreground rounded-lg shadow-sm p-6">
          {children}
        </div>
      </div>
    </div>
  );
}