"use client";

import { BookingModal } from "@/components/parking/BookingModal";
import { ParkingSlot, SlotStatus, SlotType } from "@/components/parking/ParkingSlot";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Filter, MapPin } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// Mock Data
const ZONES = ["A", "B", "C"];
const FLOORS = [1, 2, 3];

const generateSlots = (zone: string, floor: number) => {
    return Array.from({ length: 12 }).map((_, i) => {
        const id = `${zone}${floor}-${i + 1}`;
        const rand = Math.random();
        let status: SlotStatus = "available";
        if (rand > 0.7) status = "occupied";
        if (rand > 0.9) status = "reserved";

        let type: SlotType = "regular";
        if (i % 5 === 0) type = "ev";
        if (i % 7 === 0) type = "disabled";

        return { id, status, type };
    });
};

export default function FindSpotPage() {
    const [selectedZone, setSelectedZone] = useState("A");
    const [selectedFloor, setSelectedFloor] = useState(1);
    const [slots, setSlots] = useState(() => generateSlots("A", 1));
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
    const [isBookingOpen, setIsBookingOpen] = useState(false);

    // In a real app, we would fetch slots when zone/floor changes
    // For demo, we just regenerate random slots on zone/floor change to simulate data
    const handleFilterChange = (zone: string, floor: number) => {
        setSelectedZone(zone);
        setSelectedFloor(floor);
        setSlots(generateSlots(zone, floor));
        setSelectedSlot(null);
    };

    const handleSlotClick = (id: string) => {
        if (selectedSlot === id) {
            setSelectedSlot(null);
        } else {
            setSelectedSlot(id);
        }
    };

    const handleBooking = (details: { slotId: string; duration: string }) => {
        console.log("Booking:", details);
        setIsBookingOpen(false);
        // Here we would call API to book
        // Optimistic update
        setSlots(slots.map(s => s.id === details.slotId ? { ...s, status: "occupied" } : s));
        setSelectedSlot(null);
        alert(`Booking Confirmed for ${details.slotId}!`);
    };

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            {/* Header */}
            <header className="border-b border-white/10 glass p-4">
                <div className="container mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/">
                            <Button variant="ghost" size="icon">
                                <ArrowLeft className="h-5 w-5" />
                            </Button>
                        </Link>
                        <h1 className="text-xl font-bold flex items-center gap-2">
                            <MapPin className="text-primary" /> Finding Spot
                        </h1>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                            <Filter className="mr-2 h-4 w-4" /> Filters
                        </Button>
                    </div>
                </div>
            </header>

            <main className="flex-1 container mx-auto p-4 flex flex-col md:flex-row gap-6">
                {/* Sidebar Controls */}
                <aside className="w-full md:w-64 space-y-6">
                    <Card className="glass-card">
                        <CardHeader>
                            <CardTitle className="text-lg">Location</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <label className="text-sm text-muted-foreground mb-2 block">Zone</label>
                                <div className="flex gap-2">
                                    {ZONES.map((z) => (
                                        <Button
                                            key={z}
                                            variant={selectedZone === z ? "default" : "outline"}
                                            onClick={() => handleFilterChange(z, selectedFloor)}
                                            className="flex-1"
                                        >
                                            {z}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="text-sm text-muted-foreground mb-2 block">Floor</label>
                                <div className="flex gap-2">
                                    {FLOORS.map((f) => (
                                        <Button
                                            key={f}
                                            variant={selectedFloor === f ? "default" : "outline"}
                                            onClick={() => handleFilterChange(selectedZone, f)}
                                            className="flex-1"
                                        >
                                            {f}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="glass-card">
                        <CardContent className="p-4 space-y-2">
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded bg-white/5 border border-white/10" />
                                <span className="text-sm">Available</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded bg-red-500/10 border border-red-500/20" />
                                <span className="text-sm">Occupied</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded bg-primary/20 border border-primary" />
                                <span className="text-sm">Selected</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded bg-yellow-500/10 border border-yellow-500/20" />
                                <span className="text-sm">Reserved</span>
                            </div>
                        </CardContent>
                    </Card>
                </aside>

                {/* Parking Grid */}
                <section className="flex-1">
                    <Card className="glass-card h-full min-h-[500px]">
                        <CardContent className="p-6">
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                {slots.map((slot) => (
                                    <ParkingSlot
                                        key={slot.id}
                                        id={slot.id}
                                        status={selectedSlot === slot.id ? "selected" : slot.status}
                                        type={slot.type}
                                        onClick={() => handleSlotClick(slot.id)}
                                    />
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </section>

                {/* Booking Action */}
                {selectedSlot && (
                    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-auto md:right-6 w-full max-w-sm px-4 md:px-0">
                        <Card className="glass-card bg-black/80 border-primary/50 neon-border animate-in slide-in-from-bottom-10 fade-in">
                            <CardContent className="p-4 flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Selected Spot</p>
                                    <p className="text-xl font-bold text-primary">{selectedSlot}</p>
                                </div>
                                <Button onClick={() => setIsBookingOpen(true)} variant="neon">
                                    Book Now
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </main>

            <BookingModal
                isOpen={isBookingOpen}
                onClose={() => setIsBookingOpen(false)}
                slotId={selectedSlot}
                onConfirm={handleBooking}
            />
        </div>
    );
}
