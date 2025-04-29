import { cn } from "@/lib/utils";

interface NewBadgeProps {
  uploadDate: Date;
  className?: string;
}

export function NewBadge({ uploadDate, className }: NewBadgeProps) {
  const now = new Date();
  const daysSinceUpload = Math.floor(
    (now.getTime() - new Date(uploadDate).getTime()) / (1000 * 60 * 60 * 24)
  );

  if (daysSinceUpload > 30) return null;

  return (
    <div
      className={cn(
        "absolute top-3 right-3 bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm font-bold z-10 shadow-lg transform rotate-3",
        "after:content-[''] after:absolute after:top-0 after:right-0 after:w-2 after:h-2 after:bg-red-600 after:rounded-full after:transform after:translate-x-1/2 after:-translate-y-1/2",
        className
      )}
    >
      NEW
    </div>
  );
} 