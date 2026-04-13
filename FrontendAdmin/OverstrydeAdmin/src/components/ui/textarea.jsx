import * as React from "react";

const Textarea = React.forwardRef(({ className = "", ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={`flex min-h-[80px] w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 ${className}`}
      {...props}
    />
  );
});

Textarea.displayName = "Textarea";

export { Textarea };