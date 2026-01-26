import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaWhatsapp,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaClock,
  FaEnvelope,
  FaArrowRight,
  FaCopy,
  FaCheckCircle,
  FaPaperPlane
} from 'react-icons/fa';
import ParticlesBackground from '../components/ParticlesBackground';

const cx = (...c) => c.filter(Boolean).join(' ');

const enter = {
  hidden: { opacity: 0, y: 14 },
  show: (d = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: 'easeOut', delay: d }
  })
};

function CopyRow({ label, value, hint }) {
  const [copied, setCopied] = useState(false);

  const doCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      // fallback simple
      const ta = document.createElement('textarea');
      ta.value = value;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    }
  };

  return (
    <div className="rounded-2xl border border-black/10 bg-white px-4 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-[11px] uppercase tracking-[0.22em] text-black/45">
            {label}
          </div>
          <div className="mt-1 text-[14px] font-semibold text-black/80 break-words">
            {value}
          </div>
          {hint ? (
            <div className="mt-1 text-[12px] text-black/45">{hint}</div>
          ) : null}
        </div>

        <button
          type="button"
          onClick={doCopy}
          className={cx(
            'shrink-0 inline-flex items-center justify-center gap-2 rounded-xl px-3 py-2',
            'border border-black/10 bg-black/[0.03] hover:bg-black/[0.06] transition'
          )}
          aria-label={`Copiar ${label}`}
        >
          <AnimatePresence mode="wait" initial={false}>
            {copied ? (
              <motion.span
                key="ok"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="inline-flex items-center gap-2 text-[12px] font-semibold"
                style={{ color: 'rgba(16,120,87,0.95)' }}
              >
                <FaCheckCircle />
                Copiado
              </motion.span>
            ) : (
              <motion.span
                key="copy"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="inline-flex items-center gap-2 text-[12px] font-semibold text-black/70"
              >
                <FaCopy />
                Copiar
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </div>
  );
}

function SoftInput({ label, placeholder, type = 'text' }) {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-[0.22em] text-black/45">
        {label}
      </div>
      <div className="mt-2">
        <input
          type={type}
          placeholder={placeholder}
          className={cx(
            'w-full rounded-2xl border border-black/10 bg-white px-4 py-3',
            'text-[14px] text-black/80 placeholder:text-black/35',
            'shadow-[0_10px_30px_rgba(0,0,0,0.05)]',
            'outline-none focus:ring-2 focus:ring-[rgba(222,174,97,0.35)]'
          )}
        />
      </div>
    </div>
  );
}

function SoftTextarea({ label, placeholder }) {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-[0.22em] text-black/45">
        {label}
      </div>
      <div className="mt-2">
        <textarea
          rows={5}
          placeholder={placeholder}
          className={cx(
            'w-full rounded-2xl border border-black/10 bg-white px-4 py-3',
            'text-[14px] text-black/80 placeholder:text-black/35',
            'shadow-[0_10px_30px_rgba(0,0,0,0.05)]',
            'outline-none focus:ring-2 focus:ring-[rgba(222,174,97,0.35)] resize-none'
          )}
        />
      </div>
    </div>
  );
}

export default function Contacto() {
  const whatsappUrl = 'https://wa.me/5493517612425';
  const phone = '0351 761 2425';
  const city = 'Córdoba Capital';

  // Si después querés, reemplazamos por dirección real o “coordinación por WhatsApp”.
  const addressHint =
    'Coordinamos entrega / retiro por WhatsApp (rápido y claro).';

  const quick = useMemo(
    () => [
      {
        icon: <FaWhatsapp />,
        title: 'WhatsApp (recomendado)',
        desc: 'La forma más rápida para presupuestos y coordinación.'
      },
      {
        icon: <FaPhoneAlt />,
        title: 'Teléfono',
        desc: 'Si preferís llamada, también podemos coordinar.'
      },
      {
        icon: <FaClock />,
        title: 'Tiempos',
        desc: 'Te respondemos lo antes posible y te guiamos paso a paso.'
      }
    ],
    []
  );

  return (
      <div className="min-h-screen bg-fondo">
          <ParticlesBackground></ParticlesBackground>
      {/* ====== Ambient completamente distinto: clean / editorial ====== */}
      <div aria-hidden className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[#F7F5F2]" />
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 20%, rgba(222,174,97,0.18), rgba(0,0,0,0) 55%), radial-gradient(circle at 70% 80%, rgba(157,112,63,0.16), rgba(0,0,0,0) 55%)'
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.10]"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(0,0,0,0.10) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.10) 1px, transparent 1px)',
            backgroundSize: '90px 90px',
            maskImage:
              'radial-gradient(70% 60% at 50% 40%, rgba(0,0,0,1) 45%, rgba(0,0,0,0) 100%)',
            WebkitMaskImage:
              'radial-gradient(70% 60% at 50% 40%, rgba(0,0,0,1) 45%, rgba(0,0,0,0) 100%)'
          }}
        />
      </div>

      <section className="mx-auto max-w-6xl px-4 pt-10 pb-14 md:pt-14 md:pb-16">
        {/* ===== Header editorial ===== */}
        <motion.div
          variants={enter}
          initial="hidden"
          animate="show"
          custom={0}
          className="relative overflow-hidden rounded-[34px] border border-black/10 bg-white shadow-[0_35px_120px_rgba(0,0,0,0.10)]"
        >
          {/* top ribbon */}
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-1.5"
            style={{
              background:
                'linear-gradient(90deg, rgba(222,174,97,0.95), rgba(157,112,63,0.95), rgba(222,174,97,0.85))'
            }}
          />

          <div className="p-6 sm:p-8 md:p-10">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/[0.03] px-4 py-2">
                  <span className="text-[11px] uppercase tracking-[0.22em] text-black/55">
                    contacto
                  </span>
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{
                      background: 'rgba(222,174,97,0.95)',
                      boxShadow: '0 0 14px rgba(222,174,97,0.35)'
                    }}
                  />
                  <span className="text-[12px] text-black/50">
                    respuesta rápida
                  </span>
                </div>

                <h1 className="mt-5 leading-[1.02]">
                  <span className="titulo uppercase block text-3xl sm:text-4xl md:text-5xl font-extrabold text-black/85">
                    Hablemos y lo resolvemos
                  </span>
                  <span className="block mt-2 text-xl sm:text-2xl md:text-3xl font-semibold text-black/70">
                    Presupuesto claro, coordinación simple
                  </span>
                </h1>

                <p className="mt-4 text-[15px] sm:text-base md:text-lg text-black/55 max-w-2xl leading-relaxed">
                  Para avanzar rápido, lo mejor es WhatsApp: nos contás tu caso
                  y te guiamos con preguntas concretas. Si preferís, también
                  podés llamar.
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {quick.map((q) => (
                    <div
                      key={q.title}
                      className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/[0.03] px-4 py-2"
                    >
                      <span style={{ color: 'rgba(157,112,63,0.95)' }}>
                        {q.icon}
                      </span>
                      <span className="text-[12px] font-semibold text-black/70">
                        {q.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA WhatsApp fuerte */}
              <div className="w-full lg:max-w-sm">
                <div className="rounded-[28px] border border-black/10 bg-[#0B0B0B] text-white p-6 shadow-[0_30px_90px_rgba(0,0,0,0.18)]">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="text-[11px] uppercase tracking-[0.24em] text-white/55">
                        whatsapp
                      </div>
                      <div className="mt-2 text-[16px] font-semibold text-white/90">
                        {phone}
                      </div>
                      <div className="mt-1 text-[12px] text-white/60">
                        {city}
                      </div>
                    </div>
                    <div
                      className="h-12 w-12 rounded-2xl flex items-center justify-center border border-white/10"
                      style={{
                        background:
                          'linear-gradient(135deg, rgba(222,174,97,0.95), rgba(157,112,63,0.95))'
                      }}
                    >
                      <FaWhatsapp className="text-black/90" />
                    </div>
                  </div>

                  <div className="mt-4 text-[12px] text-white/65 leading-relaxed">
                    Mandanos: “PC estudio/trabajo/pro”, presupuesto aproximado y
                    qué necesitás. Te respondemos con pasos concretos.
                  </div>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex w-full"
                  >
                    <button
                      className={cx(
                        'w-full inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3',
                        'text-sm font-semibold text-black/90',
                        'shadow-[0_18px_55px_rgba(0,0,0,0.35)]',
                        'transition-transform duration-200 hover:-translate-y-[1px] active:translate-y-0'
                      )}
                      style={{
                        background:
                          'linear-gradient(135deg, rgba(222,174,97,0.98), rgba(157,112,63,0.95))'
                      }}
                    >
                      <FaWhatsapp />
                      Abrir WhatsApp
                      <FaArrowRight className="opacity-80" />
                    </button>
                  </a>

                  <div className="mt-4 flex items-center gap-2 text-[12px] text-white/55">
                    <FaClock />
                    Respuesta rápida (coordinamos por chat)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ===== Layout distinto: "Contact console" + Form ===== */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-4">
          {/* Left: datos copiable + mini “map” abstracto */}
          <motion.div
            variants={enter}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            custom={0.06}
            className="space-y-3"
          >
            <CopyRow
              label="WhatsApp"
              value="+54 9 351 761 2425"
              hint="Presupuestos, coordinación y consultas."
            />
            <CopyRow
              label="Teléfono"
              value={phone}
              hint="Si preferís llamada."
            />
            <CopyRow label="Zona" value={city} hint={addressHint} />

            {/* Mini “map”/card abstracta, no repetimos estilos anteriores */}
            <div className="relative overflow-hidden rounded-[28px] border border-black/10 bg-white p-5 shadow-[0_18px_60px_rgba(0,0,0,0.08)]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.22em] text-black/45">
                    ubicación
                  </div>
                  <div className="mt-2 text-[14px] font-semibold text-black/80">
                    Córdoba Capital
                  </div>
                  <div className="mt-1 text-[12px] text-black/50">
                    Coordinamos entrega / retiro por WhatsApp.
                  </div>
                </div>
                <div
                  className="h-11 w-11 rounded-2xl border border-black/10 bg-black/[0.03] flex items-center justify-center"
                  style={{ color: 'rgba(157,112,63,0.95)' }}
                >
                  <FaMapMarkerAlt />
                </div>
              </div>

              {/* Abstract map lines */}
              <div
                aria-hidden
                className="mt-5 h-[140px] rounded-2xl border border-black/10 overflow-hidden"
                style={{
                  background:
                    'radial-gradient(70% 60% at 35% 30%, rgba(222,174,97,0.22), rgba(0,0,0,0) 60%), linear-gradient(180deg, rgba(0,0,0,0.02), rgba(0,0,0,0.05))'
                }}
              >
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 520 200"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M10 120 C120 40, 210 170, 330 95 C390 60, 450 70, 510 40"
                    stroke="rgba(0,0,0,0.16)"
                    strokeWidth="2"
                    fill="none"
                  />
                  <path
                    d="M-10 150 C120 120, 180 180, 290 140 C360 115, 430 125, 540 95"
                    stroke="rgba(0,0,0,0.12)"
                    strokeWidth="2"
                    fill="none"
                  />
                  <circle cx="320" cy="96" r="8" fill="rgba(222,174,97,0.95)" />
                  <circle
                    cx="320"
                    cy="96"
                    r="18"
                    fill="rgba(222,174,97,0.18)"
                  />
                </svg>
              </div>

              <div className="mt-4 flex items-center gap-2 text-[12px] text-black/50">
                <FaClock />
                Coordinamos horario por chat.
              </div>
            </div>
          </motion.div>

          {/* Right: Form UI (sin backend) */}
          <motion.div
            variants={enter}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            custom={0.12}
            className="relative overflow-hidden rounded-[34px] border border-black/10 bg-white p-6 sm:p-8 shadow-[0_35px_120px_rgba(0,0,0,0.10)]"
          >
            <div className="flex items-end justify-between gap-4">
              <div>
                <div className="text-[11px] uppercase tracking-[0.22em] text-black/45">
                  consulta rápida
                </div>
                <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-black/85">
                  Contanos tu caso
                </h2>
                <p className="mt-2 text-[13px] sm:text-[14px] text-black/55 max-w-xl">
                  Si preferís escribir acá, dejá lo esencial. Igual, para
                  coordinación rápida, WhatsApp es ideal.
                </p>
              </div>

              <div className="hidden sm:flex items-center gap-2 text-[12px] text-black/45">
                <FaEnvelope />
                Respuesta por WhatsApp
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <SoftInput label="Nombre" placeholder="Tu nombre" />
              <SoftInput label="Teléfono" placeholder="Ej: 351..." />
              <SoftInput
                label="Tipo"
                placeholder="PC estudio / trabajo / pro"
              />
              <SoftInput label="Presupuesto" placeholder="Aprox. (opcional)" />
            </div>

            <div className="mt-4">
              <SoftTextarea
                label="Mensaje"
                placeholder="Contanos qué necesitás o qué problema tenés (lenta, se apaga, no da imagen, etc.)"
              />
            </div>

            <div className="mt-5 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
              <div className="text-[12px] text-black/45">
                Este formulario es informativo de momento. Para respuesta inmediata, usá
                WhatsApp.
              </div>

              <div className="flex gap-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex"
                >
                  <button className="inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold text-black/90 border border-black/10 bg-black/[0.03] hover:bg-black/[0.06] transition">
                    <FaWhatsapp />
                    Ir a WhatsApp
                  </button>
                </a>

                <button
                  type="button"
                  onClick={() => {
                    // Solo UI: si después querés, lo conectamos a un backend o mail.
                    alert(
                      'SOFT Alerta funcionando'
                    );
                  }}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_55px_rgba(0,0,0,0.14)]"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(222,174,97,0.98), rgba(157,112,63,0.95))'
                  }}
                >
                  <FaPaperPlane />
                  Enviar
                </button>
              </div>
            </div>

            {/* corner accent */}
            <div
              aria-hidden
              className="pointer-events-none absolute -top-28 -right-28 size-[22rem] rounded-full blur-3xl opacity-35"
              style={{
                background:
                  'radial-gradient(circle at 30% 30%, rgba(222,174,97,0.28), rgba(0,0,0,0) 65%)'
              }}
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
