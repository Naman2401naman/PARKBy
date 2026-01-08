import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    slotId: string | null;
    onConfirm: (details: { duration: string; slotId: string }) => void;
}

export function BookingModal({
    isOpen,
    onClose,
    slotId,
    onConfirm,
}: BookingModalProps) {
    const [duration, setDuration] = useState("2");

    if (!slotId) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px] glass-card border-white/10 text-foreground">
                <DialogHeader>
                    <DialogTitle>Confirm Booking</DialogTitle>
                    <DialogDescription>
                        Book spot <span className="text-primary font-bold">{slotId}</span> for your vehicle.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="vehicle" className="text-right">
                            Vehicle No.
                        </Label>
                        <Input
                            id="vehicle"
                            placeholder="KA-01-AB-1234"
                            className="col-span-3 bg-black/20"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="duration" className="text-right">
                            Duration (Hrs)
                        </Label>
                        <Input
                            id="duration"
                            type="number"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            className="col-span-3 bg-black/20"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Total</Label>
                        <div className="col-span-3 text-xl font-bold text-primary">
                            ${Number(duration) * 5}.00
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="ghost" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button variant="neon" onClick={() => onConfirm({ duration, slotId })}>
                        Pay & Book
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
