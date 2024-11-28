import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface ResponsiveTooltipProps {
  shortcut: string;
  className?: string;
  children: React.ReactNode;
}
export default function ShortcutTooltip({
  shortcut,
  children,
}: ResponsiveTooltipProps) {
  const keys = shortcut.split("+");

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent className="border-transparent bg-transparent">
          {keys.map((key, index) => (
            <span key={index}>
              <span className="rounded border border-muted-foreground bg-muted px-1 py-[2px] shadow-md">
                {key}
              </span>
              <span className="px-1" aria-hidden="true">
                {index < keys.length - 1 ? "+" : ""}
              </span>
            </span>
          ))}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
