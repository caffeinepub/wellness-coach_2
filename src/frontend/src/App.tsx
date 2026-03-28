import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  Facebook,
  Heart,
  Instagram,
  Leaf,
  Linkedin,
  Loader2,
  Mail,
  MapPin,
  Menu,
  Phone,
  Star,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useSubmitBooking } from "./hooks/useQueries";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#booking" },
];

const SERVICES = [
  {
    icon: ClipboardCheck,
    title: "Free Health Checkup",
    description:
      "Get a comprehensive initial health assessment at absolutely no cost. Understand your current wellness baseline and identify areas for improvement.",
    badge: "100% Free",
  },
  {
    icon: Leaf,
    title: "Consultation Guidance",
    description:
      "Receive personalized, expert advice tailored to your unique wellness goals. One-on-one sessions focused on sustainable, healthy lifestyle changes.",
    badge: "Personalized",
  },
  {
    icon: Heart,
    title: "Wellness Planning",
    description:
      "Get a custom wellness roadmap designed around your life. From nutrition to mindfulness, build habits that create lasting, meaningful transformation.",
    badge: "Tailored Plan",
  },
];

const TESTIMONIALS = [
  {
    initials: "AM",
    name: "Aisha Mensah",
    role: "Marketing Executive",
    quote:
      "Sarah's free health checkup was a game-changer. I finally understood my body's needs, and her guidance helped me lose 18 lbs in 3 months — without feeling deprived!",
    rating: 5,
  },
  {
    initials: "JP",
    name: "James Patterson",
    role: "Software Engineer",
    quote:
      "I was skeptical at first, but the consultation was thorough and genuinely helpful. Sarah's wellness plan completely changed my energy levels and sleep quality.",
    rating: 5,
  },
  {
    initials: "LC",
    name: "Laura Chen",
    role: "School Teacher",
    quote:
      "As a busy mom, I needed practical solutions. Sarah understood my lifestyle and gave me simple, effective steps I could actually stick to. Truly transformative!",
    rating: 5,
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }, (_, i) => i).map((i) => (
        <Star
          key={`star-${i}`}
          className="w-4 h-4 fill-terracotta text-terracotta"
        />
      ))}
    </div>
  );
}

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-beige/95 backdrop-blur-sm border-b border-border shadow-xs">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-3">
          {/* Logo */}
          <a
            href="#home"
            className="flex flex-col leading-none"
            data-ocid="nav.link"
          >
            <span className="text-2xl font-extrabold tracking-wide text-near-black">
              ELEVATE
            </span>
            <span className="text-xs font-semibold tracking-[0.2em] text-terracotta">
              WELLNESS
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-brown hover:text-near-black transition-colors duration-200"
                data-ocid="nav.link"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:block">
            <a href="#booking">
              <Button
                className="rounded-pill bg-terracotta hover:bg-terracotta/90 text-white font-semibold px-6 py-2 text-sm transition-all duration-200 shadow-md hover:shadow-lg"
                data-ocid="nav.primary_button"
              >
                BOOK FREE CHECKUP
              </Button>
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            className="md:hidden p-2 rounded-md text-near-black"
            onClick={() => setMobileOpen((p) => !p)}
            aria-label="Toggle menu"
            data-ocid="nav.toggle"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden bg-beige border-t border-border"
          >
            <nav className="flex flex-col px-6 py-4 gap-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-gray-brown hover:text-near-black"
                  onClick={() => setMobileOpen(false)}
                  data-ocid="nav.link"
                >
                  {link.label}
                </a>
              ))}
              <Button
                className="rounded-pill bg-terracotta text-white font-semibold w-full"
                data-ocid="nav.primary_button"
                onClick={() => {
                  setMobileOpen(false);
                  window.location.hash = "#booking";
                }}
              >
                BOOK FREE CHECKUP
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function HeroSection() {
  return (
    <section id="home" className="relative overflow-hidden bg-beige">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 items-center min-h-[85vh] gap-12 py-16 lg:py-0">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex flex-col gap-6 lg:pr-8"
          >
            <div className="inline-flex items-center gap-2 bg-sage/20 text-sage px-4 py-1.5 rounded-pill w-fit">
              <Leaf className="w-4 h-4" />
              <span className="text-sm font-semibold">
                FREE Health Checkup Available
              </span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-extrabold text-near-black leading-[1.1] tracking-tight">
              Your Journey to{" "}
              <span className="text-terracotta">Better Health</span> Starts Here
            </h1>

            <p className="text-base lg:text-lg text-gray-brown leading-relaxed max-w-[480px]">
              Discover a healthier, happier you with personalized wellness
              guidance from certified coach Sarah Jenkins. Begin your
              transformation with a completely free health checkup — no strings
              attached.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a href="#booking">
                <Button
                  size="lg"
                  className="rounded-pill bg-terracotta hover:bg-terracotta/90 text-white font-semibold px-8 shadow-md hover:shadow-lg transition-all duration-200"
                  data-ocid="hero.primary_button"
                >
                  Book Free Checkup
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </a>
              <a href="#services">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-pill border-near-black text-near-black font-semibold px-8 bg-transparent hover:bg-near-black/5 transition-all duration-200"
                  data-ocid="hero.secondary_button"
                >
                  Explore Services
                </Button>
              </a>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-6 pt-4 border-t border-border">
              <div className="flex -space-x-2">
                {["AM", "JP", "LC"].map((init) => (
                  <div
                    key={init}
                    className="w-9 h-9 rounded-full bg-sage/60 border-2 border-beige flex items-center justify-center text-xs font-bold text-white"
                  >
                    {init}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex gap-0.5 mb-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className="w-3.5 h-3.5 fill-terracotta text-terracotta"
                    />
                  ))}
                </div>
                <p className="text-xs text-gray-brown font-medium">
                  Trusted by 200+ clients
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right — image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
            className="relative lg:h-full flex items-center justify-end"
          >
            <div className="relative w-full max-w-[520px] lg:max-w-none">
              <div className="absolute inset-0 bg-sage/20 rounded-3xl translate-x-4 translate-y-4" />
              <img
                src="/assets/generated/hero-wellness-coach.dim_800x900.jpg"
                alt="Wellness coach Sarah Jenkins in a bright, healthy kitchen"
                className="relative rounded-3xl w-full object-cover shadow-card-hover"
                style={{ maxHeight: "620px" }}
              />
              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.4 }}
                className="absolute bottom-8 left-4 bg-white rounded-2xl shadow-card px-4 py-3 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-full bg-terracotta/15 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-terracotta" />
                </div>
                <div>
                  <p className="text-xs font-bold text-near-black">
                    Free Consultation
                  </p>
                  <p className="text-xs text-gray-brown">
                    No credit card required
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section id="services" className="py-20 bg-sage">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-white/80 font-semibold text-sm tracking-widest uppercase mb-3">
            What We Offer
          </p>
          <h2 className="text-4xl font-bold text-white">Services Overview</h2>
          <p className="text-white/80 mt-4 max-w-xl mx-auto text-base">
            Everything you need to begin and sustain a healthier lifestyle — all
            starting with a free checkup.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6" data-ocid="services.list">
          {SERVICES.map((service, idx) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                className="bg-white rounded-2xl p-7 shadow-card hover:shadow-card-hover transition-shadow duration-300 flex flex-col gap-4"
                data-ocid={`services.item.${idx + 1}`}
              >
                <div className="flex items-start justify-between">
                  <div className="w-13 h-13 rounded-full bg-sage/15 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-sage" />
                  </div>
                  <span className="text-xs font-semibold bg-terracotta/10 text-terracotta px-3 py-1 rounded-pill">
                    {service.badge}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-near-black">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-brown leading-relaxed flex-1">
                  {service.description}
                </p>
                <a
                  href="#booking"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-terracotta hover:text-terracotta/80 transition-colors"
                  data-ocid={`services.item.${idx + 1}`}
                >
                  Book Now <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="py-20 bg-beige">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-terracotta/15 rounded-3xl -translate-x-4 translate-y-4" />
            <img
              src="/assets/generated/sarah-jenkins-portrait.dim_500x600.jpg"
              alt="Sarah Jenkins, Certified Wellness Coach"
              className="relative w-full max-w-[440px] mx-auto rounded-3xl shadow-card-hover object-cover"
              style={{ maxHeight: "520px" }}
            />
            {/* Credential badge */}
            <div className="absolute top-6 -right-4 bg-white rounded-xl shadow-card px-4 py-3 hidden lg:flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-sage/20 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-sage" />
              </div>
              <div>
                <p className="text-xs font-bold text-near-black">
                  Certified Coach
                </p>
                <p className="text-xs text-gray-brown">ACE & NASM Certified</p>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="flex flex-col gap-5"
          >
            <p className="text-terracotta font-semibold text-sm tracking-widest uppercase">
              Meet Your Coach
            </p>
            <h2 className="text-4xl font-bold text-near-black leading-tight">
              About Sarah Jenkins
            </h2>
            <p className="text-gray-brown font-medium text-base">
              Certified Wellness Coach · 10+ Years Experience
            </p>
            <p className="text-gray-brown leading-relaxed">
              Sarah Jenkins is a passionate preventive health advocate who has
              helped over 200 clients reclaim their vitality and joy. With
              certifications from ACE and NASM, Sarah brings both scientific
              rigor and warm, human guidance to every session.
            </p>
            <p className="text-gray-brown leading-relaxed">
              Her approach goes beyond diet and exercise — she helps you uncover
              the root causes of health challenges and build sustainable habits
              that transform your life from the inside out. Sarah believes
              everyone deserves access to quality wellness guidance, which is
              why she offers her initial health checkup completely free.
            </p>

            <div className="grid grid-cols-3 gap-4 py-4 border-y border-border">
              {[
                { value: "200+", label: "Clients Helped" },
                { value: "10+", label: "Years Experience" },
                { value: "98%", label: "Satisfaction Rate" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl font-extrabold text-terracotta">
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-brown font-medium mt-0.5">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <a href="#booking">
                <Button
                  size="lg"
                  className="rounded-pill bg-terracotta hover:bg-terracotta/90 text-white font-semibold px-8"
                  data-ocid="about.primary_button"
                >
                  Start Your Free Checkup
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 bg-beige">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-terracotta font-semibold text-sm tracking-widest uppercase mb-3">
            Real Results
          </p>
          <h2 className="text-4xl font-bold text-near-black">
            What Clients Say
          </h2>
        </motion.div>

        <div
          className="grid md:grid-cols-3 gap-6"
          data-ocid="testimonials.list"
        >
          {TESTIMONIALS.map((t, idx) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              className="bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-shadow duration-300 flex flex-col gap-4"
              data-ocid={`testimonials.item.${idx + 1}`}
            >
              <StarRating count={t.rating} />
              <p className="text-gray-brown text-sm leading-relaxed flex-1 italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-2 border-t border-border">
                <div className="w-11 h-11 rounded-full bg-sage flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-near-black">
                    {t.name}
                  </p>
                  <p className="text-xs text-gray-brown">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BookingSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    preferredDate: "",
    serviceType: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const submitBooking = useSubmitBooking();

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.serviceType) {
      toast.error("Please fill in Name, Email, and Service Type.");
      return;
    }
    try {
      await submitBooking.mutateAsync(form);
      setSubmitted(true);
      toast.success(
        "Booking submitted! Sarah will contact you within 24 hours.",
      );
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <section id="booking" className="py-20 bg-sage">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-white/80 font-semibold text-sm tracking-widest uppercase mb-3">
            Take The First Step
          </p>
          <h2 className="text-4xl font-bold text-white">
            Book Your Free Checkup
          </h2>
          <p className="text-white/80 mt-4 max-w-xl mx-auto">
            Fill in the form below and Sarah will get back to you within 24
            hours to schedule your complimentary session.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-2xl mx-auto"
        >
          <div
            className="bg-white rounded-3xl shadow-card-hover p-8 lg:p-10"
            data-ocid="booking.panel"
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 flex flex-col items-center gap-5"
                  data-ocid="booking.success_state"
                >
                  <div className="w-20 h-20 rounded-full bg-sage/15 flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10 text-sage" />
                  </div>
                  <h3 className="text-2xl font-bold text-near-black">
                    Booking Confirmed!
                  </h3>
                  <p className="text-gray-brown max-w-sm">
                    Thank you for reaching out! Sarah will contact you within 24
                    hours to confirm your free health checkup appointment.
                  </p>
                  <Button
                    className="rounded-pill bg-terracotta text-white font-semibold px-8"
                    onClick={() => {
                      setSubmitted(false);
                      setForm({
                        name: "",
                        email: "",
                        phone: "",
                        preferredDate: "",
                        serviceType: "",
                        message: "",
                      });
                    }}
                    data-ocid="booking.secondary_button"
                  >
                    Book Another Session
                  </Button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-5"
                >
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <Label
                        htmlFor="name"
                        className="text-sm font-semibold text-near-black"
                      >
                        Full Name <span className="text-terracotta">*</span>
                      </Label>
                      <Input
                        id="name"
                        placeholder="Sarah Johnson"
                        value={form.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        className="rounded-xl border-border bg-beige/50 focus:border-terracotta focus:ring-terracotta/20"
                        data-ocid="booking.input"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <Label
                        htmlFor="email"
                        className="text-sm font-semibold text-near-black"
                      >
                        Email Address <span className="text-terracotta">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        className="rounded-xl border-border bg-beige/50 focus:border-terracotta focus:ring-terracotta/20"
                        data-ocid="booking.input"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <Label
                        htmlFor="phone"
                        className="text-sm font-semibold text-near-black"
                      >
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={form.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        className="rounded-xl border-border bg-beige/50"
                        data-ocid="booking.input"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <Label
                        htmlFor="date"
                        className="text-sm font-semibold text-near-black"
                      >
                        Preferred Date
                      </Label>
                      <Input
                        id="date"
                        type="date"
                        value={form.preferredDate}
                        onChange={(e) =>
                          handleChange("preferredDate", e.target.value)
                        }
                        className="rounded-xl border-border bg-beige/50"
                        data-ocid="booking.input"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <Label className="text-sm font-semibold text-near-black">
                      Service Type <span className="text-terracotta">*</span>
                    </Label>
                    <Select
                      value={form.serviceType}
                      onValueChange={(v) => handleChange("serviceType", v)}
                    >
                      <SelectTrigger
                        className="rounded-xl border-border bg-beige/50"
                        data-ocid="booking.select"
                      >
                        <SelectValue placeholder="Select a service..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Free Health Checkup">
                          Free Health Checkup
                        </SelectItem>
                        <SelectItem value="Consultation Guidance">
                          Consultation Guidance
                        </SelectItem>
                        <SelectItem value="Wellness Planning">
                          Wellness Planning
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <Label
                      htmlFor="message"
                      className="text-sm font-semibold text-near-black"
                    >
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Tell Sarah a little about your wellness goals or any health concerns..."
                      rows={4}
                      value={form.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      className="rounded-xl border-border bg-beige/50 resize-none"
                      data-ocid="booking.textarea"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={submitBooking.isPending}
                    className="rounded-pill bg-terracotta hover:bg-terracotta/90 text-white font-semibold w-full text-base shadow-md hover:shadow-lg transition-all duration-200"
                    data-ocid="booking.submit_button"
                  >
                    {submitBooking.isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Book My Free Checkup
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>

                  <p className="text-center text-xs text-gray-brown">
                    By submitting, you agree to be contacted by Sarah Jenkins
                    regarding your wellness consultation. No spam, ever.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  const utmLink = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`;

  return (
    <footer className="bg-charcoal text-footer-text">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-14">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo + tagline */}
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-2xl font-extrabold tracking-wide text-white">
                ELEVATE
              </p>
              <p className="text-xs font-semibold tracking-[0.2em] text-terracotta">
                WELLNESS
              </p>
            </div>
            <p className="text-sm text-footer-text/80 leading-relaxed">
              Transforming lives through preventive health, personalized
              guidance, and compassionate coaching.
            </p>
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-terracotta/80 transition-colors duration-200"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </button>
              <button
                type="button"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-terracotta/80 transition-colors duration-200"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </button>
              <button
                type="button"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-terracotta/80 transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <p className="font-semibold text-white mb-4 text-sm tracking-wide">
              Quick Links
            </p>
            <ul className="flex flex-col gap-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-footer-text/70 hover:text-terracotta transition-colors duration-150"
                    data-ocid="nav.link"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <p className="font-semibold text-white mb-4 text-sm tracking-wide">
              Services
            </p>
            <ul className="flex flex-col gap-2.5">
              {SERVICES.map((s) => (
                <li key={s.title}>
                  <a
                    href="#services"
                    className="text-sm text-footer-text/70 hover:text-terracotta transition-colors duration-150"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#booking"
                  className="text-sm text-footer-text/70 hover:text-terracotta transition-colors duration-150"
                >
                  Book Free Checkup
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="font-semibold text-white mb-4 text-sm tracking-wide">
              Contact Info
            </p>
            <ul className="flex flex-col gap-3">
              <li className="flex items-center gap-3 text-sm text-footer-text/80">
                <Mail className="w-4 h-4 text-terracotta flex-shrink-0" />
                sarah@elevatewellness.com
              </li>
              <li className="flex items-center gap-3 text-sm text-footer-text/80">
                <Phone className="w-4 h-4 text-terracotta flex-shrink-0" />
                +1 (555) 246-8102
              </li>
              <li className="flex items-start gap-3 text-sm text-footer-text/80">
                <MapPin className="w-4 h-4 text-terracotta flex-shrink-0 mt-0.5" />
                <span>
                  123 Wellness Avenue,
                  <br />
                  San Francisco, CA 94102
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-footer-text/60">
          <p>© {year} Elevate Wellness · Sarah Jenkins. All rights reserved.</p>
          <p>
            Built with <Heart className="inline w-3 h-3 text-terracotta" />{" "}
            using{" "}
            <a
              href={utmLink}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-terracotta transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="min-h-screen font-poppins">
      <Toaster position="top-right" richColors />
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <TestimonialsSection />
        <BookingSection />
      </main>
      <Footer />
    </div>
  );
}
