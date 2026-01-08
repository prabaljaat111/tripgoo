import { Shield, ShieldCheck, ShieldAlert, ShieldX } from "lucide-react";
import { cn } from "@/lib/utils";

interface TrustScoreBadgeProps {
  score: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

const TrustScoreBadge = ({ score, size = "md", showLabel = true }: TrustScoreBadgeProps) => {
  const getScoreDetails = (score: number) => {
    if (score >= 8.5) return { label: "Excellent", color: "bg-green-500", textColor: "text-green-500", Icon: ShieldCheck };
    if (score >= 7) return { label: "Good", color: "bg-green-400", textColor: "text-green-400", Icon: Shield };
    if (score >= 5) return { label: "Average", color: "bg-yellow-500", textColor: "text-yellow-500", Icon: ShieldAlert };
    return { label: "Below Average", color: "bg-red-500", textColor: "text-red-500", Icon: ShieldX };
  };

  const { label, color, textColor, Icon } = getScoreDetails(score);

  const sizeClasses = {
    sm: "text-xs px-2 py-1",
    md: "text-sm px-3 py-1.5",
    lg: "text-base px-4 py-2",
  };

  const iconSizes = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  return (
    <div className={cn(
      "inline-flex items-center gap-1.5 rounded-full font-semibold",
      color,
      "text-white",
      sizeClasses[size]
    )}>
      <Icon className={iconSizes[size]} />
      <span>{score.toFixed(1)}</span>
      {showLabel && <span className="opacity-80">• {label}</span>}
    </div>
  );
};

export default TrustScoreBadge;
