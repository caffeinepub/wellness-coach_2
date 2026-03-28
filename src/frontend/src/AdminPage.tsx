import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import {
  CalendarDays,
  ClipboardList,
  Leaf,
  Loader2,
  LogOut,
  ShieldCheck,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useActor } from "./hooks/useActor";

const ADMIN_PASSWORD = "wellness2024";
const STORAGE_KEY = "admin_auth";

const SERVICE_COLORS: Record<string, string> = {
  "Free Health Checkup": "bg-sage/20 text-sage",
  "Consultation Guidance": "bg-terracotta/15 text-terracotta",
  "Wellness Planning": "bg-amber-100 text-amber-700",
};

function PasswordGate({ onAuth }: { onAuth: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem(STORAGE_KEY, "true");
      onAuth();
    } else {
      setError(true);
      setPassword("");
    }
  };

  return (
    <div className="min-h-screen bg-beige flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm"
      >
        <Card className="shadow-card-hover border-0 rounded-3xl">
          <CardHeader className="text-center pb-4">
            <div className="w-16 h-16 rounded-full bg-terracotta/10 flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-8 h-8 text-terracotta" />
            </div>
            <CardTitle className="text-2xl font-extrabold text-near-black">
              Admin Dashboard
            </CardTitle>
            <CardDescription className="text-gray-brown">
              Enter your password to view booking submissions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4"
              data-ocid="admin.panel"
            >
              <div className="flex flex-col gap-1.5">
                <Label
                  htmlFor="admin-password"
                  className="text-sm font-semibold text-near-black"
                >
                  Password
                </Label>
                <Input
                  id="admin-password"
                  type="password"
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError(false);
                  }}
                  className="rounded-xl border-border bg-beige/50 focus:border-terracotta"
                  data-ocid="admin.input"
                />
                {error && (
                  <p
                    className="text-xs text-red-500 font-medium"
                    data-ocid="admin.error_state"
                  >
                    Incorrect password. Please try again.
                  </p>
                )}
              </div>
              <Button
                type="submit"
                className="rounded-pill bg-terracotta hover:bg-terracotta/90 text-white font-semibold w-full"
                data-ocid="admin.submit_button"
              >
                Sign In
              </Button>
              <p className="text-center text-xs text-gray-brown">
                <a
                  href="/"
                  className="underline hover:text-terracotta transition-colors"
                >
                  ← Back to website
                </a>
              </p>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

function BookingsTable() {
  const { actor, isFetching } = useActor();

  const { data: bookings, isLoading } = useQuery({
    queryKey: ["allBookings"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllBookings();
    },
    enabled: !!actor && !isFetching,
  });

  const loading = isFetching || isLoading;

  return (
    <div className="min-h-screen bg-beige">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-beige/95 backdrop-blur-sm border-b border-border shadow-xs">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-terracotta/10 flex items-center justify-center">
                <Leaf className="w-4 h-4 text-terracotta" />
              </div>
              <div className="leading-none">
                <p className="text-lg font-extrabold tracking-wide text-near-black">
                  ELEVATE
                </p>
                <p className="text-[10px] font-semibold tracking-[0.2em] text-terracotta">
                  ADMIN
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="rounded-pill border-border text-gray-brown hover:text-near-black hover:bg-near-black/5 gap-2"
              onClick={() => {
                localStorage.removeItem(STORAGE_KEY);
                window.location.reload();
              }}
              data-ocid="admin.button"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-6 lg:px-8 py-10">
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-extrabold text-near-black mb-2">
            Booking Submissions
          </h1>
          <p className="text-gray-brown text-sm">
            All free checkup and consultation requests from your website.
          </p>
        </motion.div>

        {/* Count card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <Card
            className="inline-flex shadow-card border-0 rounded-2xl"
            data-ocid="admin.card"
          >
            <CardContent className="flex items-center gap-4 py-5 px-6">
              <div className="w-12 h-12 rounded-full bg-sage/20 flex items-center justify-center">
                <ClipboardList className="w-6 h-6 text-sage" />
              </div>
              <div>
                <p className="text-3xl font-extrabold text-near-black">
                  {loading ? (
                    <Loader2 className="w-6 h-6 animate-spin text-terracotta" />
                  ) : (
                    (bookings?.length ?? 0)
                  )}
                </p>
                <p className="text-sm text-gray-brown font-medium">
                  Total Bookings
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="shadow-card border-0 rounded-2xl overflow-hidden">
            <CardHeader className="border-b border-border bg-white px-6 py-4">
              <div className="flex items-center gap-2">
                <CalendarDays className="w-5 h-5 text-terracotta" />
                <CardTitle className="text-base font-bold text-near-black">
                  All Bookings
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {loading ? (
                <div
                  className="flex items-center justify-center py-20 gap-3"
                  data-ocid="admin.loading_state"
                >
                  <Loader2 className="w-6 h-6 animate-spin text-terracotta" />
                  <p className="text-gray-brown text-sm">Loading bookings...</p>
                </div>
              ) : !bookings || bookings.length === 0 ? (
                <div
                  className="flex flex-col items-center justify-center py-20 gap-3"
                  data-ocid="admin.empty_state"
                >
                  <ClipboardList className="w-12 h-12 text-gray-brown/30" />
                  <p className="text-gray-brown font-medium">No bookings yet</p>
                  <p className="text-sm text-gray-brown/60">
                    Booking submissions will appear here.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table data-ocid="admin.table">
                    <TableHeader>
                      <TableRow className="bg-beige/60 hover:bg-beige/60">
                        <TableHead className="font-bold text-near-black text-xs uppercase tracking-wide">
                          #
                        </TableHead>
                        <TableHead className="font-bold text-near-black text-xs uppercase tracking-wide">
                          Name
                        </TableHead>
                        <TableHead className="font-bold text-near-black text-xs uppercase tracking-wide">
                          Email
                        </TableHead>
                        <TableHead className="font-bold text-near-black text-xs uppercase tracking-wide">
                          Phone
                        </TableHead>
                        <TableHead className="font-bold text-near-black text-xs uppercase tracking-wide">
                          Service Type
                        </TableHead>
                        <TableHead className="font-bold text-near-black text-xs uppercase tracking-wide">
                          Preferred Date
                        </TableHead>
                        <TableHead className="font-bold text-near-black text-xs uppercase tracking-wide">
                          Message
                        </TableHead>
                        <TableHead className="font-bold text-near-black text-xs uppercase tracking-wide">
                          Submitted At
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {bookings.map((booking, idx) => (
                        <TableRow
                          key={`${booking.submissionTime}-${idx}`}
                          className="hover:bg-beige/40 transition-colors"
                          data-ocid={`admin.row.${idx + 1}`}
                        >
                          <TableCell className="text-gray-brown text-sm font-medium">
                            {idx + 1}
                          </TableCell>
                          <TableCell className="font-semibold text-near-black text-sm whitespace-nowrap">
                            {booking.name}
                          </TableCell>
                          <TableCell className="text-gray-brown text-sm">
                            <a
                              href={`mailto:${booking.email}`}
                              className="hover:text-terracotta transition-colors underline underline-offset-2"
                            >
                              {booking.email}
                            </a>
                          </TableCell>
                          <TableCell className="text-gray-brown text-sm whitespace-nowrap">
                            {booking.phone || (
                              <span className="text-gray-brown/40 italic">
                                —
                              </span>
                            )}
                          </TableCell>
                          <TableCell>
                            <span
                              className={`inline-block text-xs font-semibold px-3 py-1 rounded-pill whitespace-nowrap ${
                                SERVICE_COLORS[booking.serviceType] ??
                                "bg-gray-100 text-gray-600"
                              }`}
                            >
                              {booking.serviceType}
                            </span>
                          </TableCell>
                          <TableCell className="text-gray-brown text-sm whitespace-nowrap">
                            {booking.preferredDate || (
                              <span className="text-gray-brown/40 italic">
                                —
                              </span>
                            )}
                          </TableCell>
                          <TableCell className="text-gray-brown text-sm max-w-[240px]">
                            <p className="truncate" title={booking.message}>
                              {booking.message || (
                                <span className="text-gray-brown/40 italic">
                                  —
                                </span>
                              )}
                            </p>
                          </TableCell>
                          <TableCell className="text-gray-brown text-sm whitespace-nowrap">
                            {new Date(
                              Number(booking.submissionTime) / 1_000_000,
                            ).toLocaleString()}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}

export default function AdminPage() {
  const [isAuthed, setIsAuthed] = useState(
    () => localStorage.getItem(STORAGE_KEY) === "true",
  );

  if (!isAuthed) {
    return <PasswordGate onAuth={() => setIsAuthed(true)} />;
  }

  return <BookingsTable />;
}
