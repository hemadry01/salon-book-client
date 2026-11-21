import type { LucideIcon } from "lucide-react";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type StatCardTone = "violet" | "sky" | "orange" | "emerald";

const toneStyles: Record<
  StatCardTone,
  { card: string; icon: string }
> = {
  violet: {
    card: "border-violet-100 bg-gradient-to-br from-violet-50 to-purple-50/50 hover:border-violet-200 dark:border-violet-400/15 dark:from-violet-500/10 dark:to-transparent dark:hover:border-violet-400/25",
    icon: "bg-violet-100 text-violet-600 ring-violet-200/70 dark:bg-violet-500/15 dark:text-violet-300 dark:ring-violet-400/20",
  },
  sky: {
    card: "border-sky-100 bg-gradient-to-br from-sky-50 to-teal-50/50 hover:border-sky-200 dark:border-sky-400/15 dark:from-sky-500/10 dark:to-transparent dark:hover:border-sky-400/25",
    icon: "bg-emerald-100 text-emerald-600 ring-emerald-200/70 dark:bg-emerald-500/15 dark:text-emerald-300 dark:ring-emerald-400/20",
  },
  orange: {
    card: "border-orange-100 bg-gradient-to-br from-orange-50 to-amber-50/50 hover:border-orange-200 dark:border-orange-400/15 dark:from-orange-500/10 dark:to-transparent dark:hover:border-orange-400/25",
    icon: "bg-orange-100 text-orange-500 ring-orange-200/70 dark:bg-orange-500/15 dark:text-orange-300 dark:ring-orange-400/20",
  },
  emerald: {
    card: "border-emerald-100 bg-gradient-to-br from-emerald-50 to-teal-50/50 hover:border-emerald-200 dark:border-emerald-400/15 dark:from-emerald-500/10 dark:to-transparent dark:hover:border-emerald-400/25",
    icon: "bg-emerald-100 text-emerald-500 ring-emerald-200/70 dark:bg-emerald-500/15 dark:text-emerald-300 dark:ring-emerald-400/20",
  },
};

export type StatCardProps = {
  title: string;
  value: number | string;
  icon: LucideIcon;
  tone?: StatCardTone;
  className?: string;
};

const formatValue = (value: number | string) =>
  typeof value === "number"
    ? new Intl.NumberFormat("en-US").format(value)
    : value;

const StatCard = ({
  title,
  value,
  icon: Icon,
  tone = "violet",
  className,
}: StatCardProps) => {
  const styles = toneStyles[tone];
  const formattedValue = formatValue(value);

  return (
    <Card
      className={cn(
        "items-center gap-3 rounded-2xl border p-5 text-center shadow-sm shadow-black/[0.02] ring-0 transition duration-200 hover:-translate-y-0.5 hover:shadow-md",
        styles.card,
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "grid size-12 place-items-center rounded-full ring-1 ring-inset",
          styles.icon,
        )}
      >
        <Icon className="size-6" strokeWidth={2.25} />
      </span>

      <div className="space-y-1">
        <p className="text-sm font-semibold text-foreground/80">{title}</p>
        <p className="text-3xl leading-none font-bold tracking-tight text-foreground">
          {formattedValue}
        </p>
      </div>
    </Card>
  );
};

export default StatCard;
