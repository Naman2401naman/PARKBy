import { cn } from "@/lib/utils";
import { Car, Zap, Accessibility } from "lucide-react";

export type SlotStatus = "available" | "occupied" | "selected" | "reserved";
export type SlotType = "regular" | "ev" | "disabled";

interface ParkingSlotProps {
    id: string;
    status: SlotStatus;
    type?: SlotType;
    onClick?: () => void;
    className?: string;
}

export function ParkingSlot({
    id,
    status,
    type = "regular",
    onClick,
    className,
}: ParkingSlotProps) {
    const getStatusColor = () => {
        switch (status) {
            case "available":
                return "bg-white/5 border-white/10 text-muted-foreground hover:border-primary/50 hover:bg-primary/10 cursor-pointer";
            case "selected":
                return "bg-primary/20 border-primary text-primary shadow-[0_0_15px_rgba(14,165,233,0.3)] cursor-pointer";
            case "occupied":
                return "bg-red-500/10 border-red-500/20 text-red-500 cursor-not-allowed";
            case "reserved":
                return "bg-yellow-500/10 border-yellow-500/20 text-yellow-500 cursor-not-allowed";
            default:
                return "bg-muted";
        }
    };

    const getIcon = () => {
        if (status === "occupied") return <Car className="h-6 w-6 animate-pulse" />;
        switch (type) {
            case "ev":
                return <Zap className="h-5 w-5" />;
            case "disabled":
                return <Accessibility className="h-5 w-5" />;
            default:
                return <span className="text-sm font-bold">{id}</span>;
        }
    };

    return (
        <div
            onClick={status === "available" || status === "selected" ? onClick : undefined}
            className={cn(
                "relative h-24 w-16 rounded-md border flex flex-col items-center justify-center transition-all duration-300",
                getStatusColor(),
                className
            )}
        >
            {/* Slot Markings */}
            <div className="absolute top-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-current opacity-20 rounded-full" />

            {getIcon()}

            {status !== "occupied" && (
                <span className="absolute bottom-2 text-xs opacity-50 font-mono">
                    {id}
                </span>
            )}
        </div>
    );
}
