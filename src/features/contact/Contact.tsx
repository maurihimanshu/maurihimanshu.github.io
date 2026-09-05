import React, { useState } from 'react';
import {
  Mail,
  MapPin,
  Send,
  Copy,
  Check,
  Clock,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useClipboard } from '../../hooks/useClipboard';
import { personalInfo } from '../../data/portfolioData';

export const Contact: React.FC = () => {
  const { copy: copyEmail, copied: emailCopied } = useClipboard();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.7 },
        });
      } catch (err) {
        // Confetti fallback
      }
    }, 800);
  };

  return (
    <section id="contact" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="GET IN TOUCH"
          title="Connect with Himanshu Kumar"
          subtitle="Looking for an experienced Software Engineer & Team SME to elevate your digital banking or distributed backend systems? Let's discuss."
        />

        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
          {/* Left Column: Direct Contact & Availability */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <h3 className="text-xl font-bold text-white light:text-slate-900 mb-2">
                Let's Start a Conversation
              </h3>
              <p className="text-sm text-slate-400 light:text-slate-600 leading-relaxed">
                Whether you have an inquiry regarding senior software engineering roles, high-throughput microservices architecture, or consulting on Kafka event streaming, feel free to reach out directly.
              </p>
            </div>

            {/* Quick Copy Contact Cards */}
            <div className="space-y-3">
              {/* Email Card */}
              <div className="p-4 rounded-xl bg-slate-900/80 light:bg-white border border-slate-800 light:border-slate-200 flex items-center justify-between gap-3 group">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-400 flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-[11px] font-mono text-slate-500 uppercase">
                      Email Address
                    </div>
                    <a
                      href={`mailto:${personalInfo.email}`}
                      className="text-sm font-semibold text-slate-200 light:text-slate-800 hover:text-cyan-400 transition-colors truncate block"
                    >
                      {personalInfo.email}
                    </a>
                  </div>
                </div>
                <button
                  onClick={() => copyEmail(personalInfo.email)}
                  className="p-2 rounded-lg bg-slate-800 light:bg-slate-100 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                  title="Copy email to clipboard"
                  aria-label="Copy email"
                >
                  {emailCopied ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Location Card */}
              <div className="p-4 rounded-xl bg-slate-900/80 light:bg-white border border-slate-800 light:border-slate-200 flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-purple-500/10 text-purple-400 flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-slate-500 uppercase">Location</div>
                  <div className="text-sm font-semibold text-slate-200 light:text-slate-800">
                    {personalInfo.location}
                  </div>
                </div>
              </div>
            </div>

            {/* SLA / Availability note */}
            <div className="p-4 rounded-xl bg-slate-950/60 light:bg-slate-50 border border-slate-800 light:border-slate-200 text-xs text-slate-400 light:text-slate-600 space-y-2 font-mono">
              <div className="flex items-center gap-2 text-cyan-400 font-semibold">
                <Clock className="w-4 h-4" />
                <span>Response SLA: Within 24 Hours</span>
              </div>
              <p>
                Actively reviewing engineering opportunities in Digital Banking, FinTech, Distributed Systems & Enterprise Cloud architectures.
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <Card className="p-6 sm:p-8 border-slate-800">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <Check className="w-7 h-7" />
                  </div>
                  <h4 className="text-2xl font-bold text-white light:text-slate-900">
                    Thank You! Message Dispatched
                  </h4>
                  <p className="text-sm text-slate-400 light:text-slate-600 max-w-md mx-auto leading-relaxed">
                    Your inquiry has been received. Himanshu will review your message and reply promptly to <span className="text-cyan-400 font-mono">{formData.email}</span>.
                  </p>
                  <div className="pt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({ name: '', email: '', subject: '', message: '' });
                      }}
                    >
                      Send Another Message
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1.5">
                        Your Full Name <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Sarah Jenkins"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-950/70 light:bg-slate-50 border border-slate-800 light:border-slate-300 text-slate-100 light:text-slate-900 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1.5">
                        Email Address <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. s.jenkins@enterprise.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-950/70 light:bg-slate-50 border border-slate-800 light:border-slate-300 text-slate-100 light:text-slate-900 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5">
                      Subject / Topic
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. Senior Software Engineer / SME Discussion"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950/70 light:bg-slate-50 border border-slate-800 light:border-slate-300 text-slate-100 light:text-slate-900 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5">
                      Message Details <span className="text-rose-400">*</span>
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe your requirements, team context, or potential opportunity..."
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950/70 light:bg-slate-50 border border-slate-800 light:border-slate-300 text-slate-100 light:text-slate-900 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="w-full"
                      isLoading={isSubmitting}
                      icon={<Send className="w-4 h-4" />}
                      iconPosition="right"
                    >
                      Transmit Message
                    </Button>
                  </div>
                </form>
              )}
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
