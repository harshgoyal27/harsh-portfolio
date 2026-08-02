import { useState, useEffect } from 'react';
import { Mail, Instagram, Linkedin, Github, ArrowUpRight, ArrowUp, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import FadeIn from './FadeIn';

interface ContactMethod {
  icon: typeof Mail;
  label: string;
  value: string;
  href: string;
}

const CONTACT_METHODS: ContactMethod[] = [
  {
    icon: Mail,
    label: 'Email',
    value: 'singhrishik59@gmail.com',
    href: 'mailto:singhrishik59@gmail.com',
  },
  {
    icon: Instagram,
    label: 'Instagram',
    value: '@rishikuuuuu',
    href: 'https://www.instagram.com/rishikuuuuu/',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'in/rishik-vlsi-engineer',
    href: 'https://www.linkedin.com/in/rishik-vlsi-engineer/',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: '@itachi766',
    href: 'https://github.com/itachi766',
  },
];

const ContactSection = () => {
  const [localTime, setLocalTime] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    const updateClock = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true,
      };
      const formatter = new Intl.DateTimeFormat('en-US', options);
      setLocalTime(formatter.format(new Date()) + ' IST');
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) return;

    setIsSubmitting(true);

    try {
      // Replace "YOUR_FORM_ID" with the unique ID provided by Formspree
      const response = await fetch("https://formspree.io/f/mqevvjla", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          _subject: formData.subject, // Formspree uses _subject for the email subject line
          message: formData.message,
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  return (
    <section
      id="contact"
      className="relative w-full bg-[#0C0C0C] px-5 sm:px-8 md:px-10 pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20"
    >
      {/* Heading */}
      <FadeIn y={40}>
        <h2
          className="hero-heading text-center font-black uppercase tracking-tight leading-none mb-4"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Get in touch
        </h2>
      </FadeIn>

      <FadeIn delay={0.15} y={20}>
        <p
          className="text-center font-light uppercase tracking-widest text-[#D7E2EA]/60 mb-12 sm:mb-16 md:mb-20"
          style={{ fontSize: 'clamp(0.85rem, 1.4vw, 1.1rem)' }}
        >
          Pick whichever channel suits you
        </p>
      </FadeIn>

      {/* Contact cards */}
          <div className="mx-auto grid max-w-5xl grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
        {CONTACT_METHODS.map((method, i) => {
          const Icon = method.icon;
          const isExternal = method.href.startsWith('http');

          return (
            <FadeIn key={method.label} delay={i * 0.1} y={30}>
              <a
                href={method.href}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
                className="group relative flex h-full flex-col justify-between gap-8 sm:gap-10 rounded-[28px] sm:rounded-[32px] border-2 border-[#D7E2EA]/20 bg-[#141418] p-6 sm:p-7 md:p-8 transition-all duration-300 hover:border-[#D7E2EA]/60 hover:bg-[#1a1a20] hover:-translate-y-1"
              >
                <div className="flex items-start justify-between">
                  <div className="rounded-full border border-[#D7E2EA]/20 p-3 sm:p-3.5 transition-colors duration-300 group-hover:border-[#D7E2EA]/50">
                    <Icon
                      className="text-[#D7E2EA]"
                      size={22}
                      strokeWidth={1.5}
                    />
                  </div>
                  <ArrowUpRight
                    className="text-[#D7E2EA]/40 transition-all duration-300 group-hover:text-[#D7E2EA] group-hover:rotate-12"
                    size={22}
                    strokeWidth={1.5}
                  />
                </div>

                <div className="flex flex-col gap-2 sm:gap-3">
                  <span
                    className="font-light uppercase tracking-widest text-[#D7E2EA]/50"
                    style={{ fontSize: 'clamp(0.7rem, 1.1vw, 0.9rem)' }}
                  >
                    {method.label}
                  </span>
                  <span
                    className="font-medium text-[#D7E2EA] break-all"
                    style={{ fontSize: 'clamp(1rem, 1.8vw, 1.4rem)' }}
                  >
                    {method.value}
                  </span>
                </div>
              </a>
            </FadeIn>
          );
        })}
      </div>

      {/* Transmit Message Form */}
      <div className="mx-auto mt-16 sm:mt-20 md:mt-24 max-w-2xl">
        <FadeIn delay={0.2} y={30}>
          <div className="rounded-[28px] sm:rounded-[32px] border border-white/5 bg-white/[0.01] p-6 sm:p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.4)] relative overflow-hidden group hover:border-purple-500/10 transition-all duration-500">
            
            {/* Ambient purple card glow */}
            <div className="absolute -right-24 -top-24 w-48 h-48 rounded-full bg-purple-500/5 blur-[80px] pointer-events-none" />

            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 uppercase tracking-wider">
              Transmit Message
            </h3>
            <p className="text-xs sm:text-sm text-[#D7E2EA]/50 mb-6 sm:mb-8 font-light uppercase tracking-wider">
              Send a signal directly to my workspace
            </p>

            {submitStatus === 'success' ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-10 text-center"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 mb-4 shadow-[0_0_20px_rgba(168,85,247,0.2)]">
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-white uppercase tracking-wider">Transmission Successful</h4>
                <p className="text-xs sm:text-sm text-[#D7E2EA]/60 mt-2 max-w-sm">
                  Your message has been packetized and transmitted. I will respond to your signal shortly.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-[10px] font-bold uppercase tracking-widest text-[#D7E2EA]/50">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter your name"
                      className="w-full rounded-xl border border-white/10 bg-white/[0.01] px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-all duration-300 focus:border-purple-500/60 focus:bg-white/[0.03] focus:ring-1 focus:ring-purple-500/20"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-[10px] font-bold uppercase tracking-widest text-[#D7E2EA]/50">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Enter your email"
                      className="w-full rounded-xl border border-white/10 bg-white/[0.01] px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-all duration-300 focus:border-purple-500/60 focus:bg-white/[0.03] focus:ring-1 focus:ring-purple-500/20"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="subject" className="text-[10px] font-bold uppercase tracking-widest text-[#D7E2EA]/50">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Message subject"
                    className="w-full rounded-xl border border-white/10 bg-white/[0.01] px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-all duration-300 focus:border-purple-500/60 focus:bg-white/[0.03] focus:ring-1 focus:ring-purple-500/20"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-[10px] font-bold uppercase tracking-widest text-[#D7E2EA]/50">
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Type your message here..."
                    rows={5}
                    className="w-full rounded-xl border border-white/10 bg-white/[0.01] px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-all duration-300 focus:border-purple-500/60 focus:bg-white/[0.03] focus:ring-1 focus:ring-purple-500/20 resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto relative flex items-center justify-center gap-2.5 rounded-full border border-purple-500/40 bg-purple-500/10 px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-purple-400 hover:bg-purple-500 hover:text-white hover:border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.15)] hover:shadow-[0_0_35px_rgba(168,85,247,0.4)] transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.97]"
                  >
                    {isSubmitting ? (
                      <>
                        <span>Transmitting Signal...</span>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-purple-400 border-t-transparent" />
                      </>
                    ) : (
                      <>
                        <span>Transmit Message</span>
                        <Send className="h-3.5 w-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

          </div>
        </FadeIn>
      </div>

      {/* Footer line */}
      <FadeIn delay={0.4} y={20}>
        <div className="mx-auto mt-20 sm:mt-24 md:mt-28 flex max-w-5xl flex-col items-center gap-4 border-t border-[#D7E2EA]/10 pt-8 text-center sm:flex-row sm:justify-between">
          <span
            className="font-light uppercase tracking-widest text-[#D7E2EA]/50"
            style={{ fontSize: 'clamp(0.7rem, 1.1vw, 0.9rem)' }}
          >
            © 2026 Rishik Kumar Singh
          </span>
          <span
            className="font-light uppercase tracking-widest text-[#D7E2EA]/50"
            style={{ fontSize: 'clamp(0.7rem, 1.1vw, 0.9rem)' }}
          >
            Designed & built in Jharkhand — {localTime}
          </span>
          <button
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-[#D7E2EA]/70 transition-all duration-300 hover:border-purple-500/40 hover:bg-purple-500/10 hover:text-purple-400 hover:scale-110 active:scale-95 shadow-[0_0_15px_rgba(0,0,0,0.3)]"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </FadeIn>
    </section>
  );
};

export default ContactSection;
