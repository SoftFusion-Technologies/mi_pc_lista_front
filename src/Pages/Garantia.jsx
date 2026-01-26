import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  FaShieldAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaTools,
  FaClipboardList,
  FaWhatsapp,
  FaRegClock,
  FaArrowRight,
  FaExclamationTriangle
} from 'react-icons/fa';
import ParticlesBackground from '../components/ParticlesBackground';

const cx = (...c) => c.filter(Boolean).join(' ');

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (d = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut', delay: d }
  })
};

function Pill({ icon, title, desc, tone = 'neutral' }) {
  const toneStyles =
    tone === 'ok'
      ? {
          borderColor: 'rgba(60,255,210,0.18)',
          bg: 'rgba(60,255,210,0.06)',
          iconColor: 'rgba(60,255,210,0.85)'
        }
      : tone === 'bad'
        ? {
            borderColor: 'rgba(255,90,90,0.18)',
            bg: 'rgba(255,90,90,0.06)',
            iconColor: 'rgba(255,90,90,0.85)'
          }
        : {
            borderColor: 'rgba(222,174,97,0.18)',
            bg: 'rgba(222,174,97,0.06)',
            iconColor: 'rgba(245,214,187,0.85)'
          };

  return (
    <div
      className="rounded-3xl border bg-white/5 backdrop-blur-xl p-5"
      style={{ borderColor: toneStyles.borderColor, background: toneStyles.bg }}
    >
      <div className="flex items-start gap-3">
        <div
          className="h-10 w-10 rounded-2xl border bg-black/25 flex items-center justify-center shrink-0"
          style={{ borderColor: 'rgba(255,255,255,0.10)' }}
        >
          <span style={{ color: toneStyles.iconColor }}>{icon}</span>
        </div>
        <div className="min-w-0">
          <div className="text-[13px] font-semibold text-white/90">{title}</div>
          <div className="mt-1 text-[12px] sm:text-[13px] text-white/65 leading-relaxed">
            {desc}
          </div>
        </div>
      </div>
    </div>
  );
}

function Block({ title, subtitle, children }) {
  return (
    <div className="rounded-[30px] border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-8">
      <div className="text-[11px] uppercase tracking-[0.22em] text-white/55">
        {subtitle}
      </div>
      <h2 className="titulo mt-2 text-2xl sm:text-3xl text-white/90">
        {title}
      </h2>
      <div className="mt-5">{children}</div>
    </div>
  );
}

function ListItem({ ok, text }) {
  return (
    <div className="flex items-start gap-2">
      {ok ? (
        <FaCheckCircle
          style={{ color: 'rgba(60,255,210,0.80)' }}
          className="mt-[3px]"
        />
      ) : (
        <FaTimesCircle
          style={{ color: 'rgba(255,90,90,0.78)' }}
          className="mt-[3px]"
        />
      )}
      <div className="text-[13px] text-white/70 leading-relaxed">{text}</div>
    </div>
  );
}

export default function Garantia() {
  const whatsappUrl = 'https://wa.me/5493517612425';

  // Esto está redactado “genérico” y correcto para no prometer plazos específicos.
  // Si después me decís “cuántos días” o “cómo es exactamente tu garantía”, lo ajustamos a tu política real.
  const cubre = useMemo(
    () => [
      'Fallas relacionadas al trabajo realizado (por ejemplo: ajuste, configuración, instalación o armado).',
      'Problemas de estabilidad derivados del servicio (siempre que no haya cambios externos posteriores).',
      'Revisión sin vueltas si aparece el mismo síntoma dentro del período de garantía del servicio.'
    ],
    []
  );

  const noCubre = useMemo(
    () => [
      'Daños por golpes, líquidos, humedad, polvo extremo o uso fuera de condiciones normales.',
      'Intervenciones de terceros o cambios no coordinados (instalaciones, overclock, manipulación interna).',
      'Software o configuraciones modificadas después (tweaks agresivos, “optimizadores”, cracks, malware).',
      'Desgaste normal de componentes o fallas propias de hardware ajeno al servicio realizado.'
    ],
    []
  );

  const pasos = useMemo(
    () => [
      {
        icon: <FaWhatsapp />,
        title: '1) Nos escribís',
        desc: 'Nos contás qué pasó y cuándo. Si podés, mandá foto o video del problema.'
      },
      {
        icon: <FaClipboardList />,
        title: '2) Validamos el caso',
        desc: 'Revisamos el historial del servicio y definimos si aplica garantía o si es un caso nuevo.'
      },
      {
        icon: <FaTools />,
        title: '3) Revisamos y resolvemos',
        desc: 'Se revisa el equipo y se aplica la solución correspondiente, con explicación clara.'
      }
    ],
    []
  );

  return (
      <div className="bg-fondo text-white">
          <ParticlesBackground></ParticlesBackground>
      {/* Background marca */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div
          className="absolute -top-44 left-[10%] size-[48rem] rounded-full blur-3xl opacity-65"
          style={{
            background:
              'radial-gradient(circle at 35% 30%, rgba(245,214,187,0.12), rgba(222,174,97,0.14) 40%, rgba(0,0,0,0) 74%)'
          }}
        />
        <div
          className="absolute -bottom-52 right-[8%] size-[52rem] rounded-full blur-3xl opacity-55"
          style={{
            background:
              'radial-gradient(circle at 30% 30%, rgba(222,174,97,0.16), rgba(157,112,63,0.10) 42%, rgba(0,0,0,0) 76%)'
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(245,214,187,.10) 1px, transparent 1px), linear-gradient(to bottom, rgba(245,214,187,.10) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
            maskImage:
              'radial-gradient(70% 56% at 50% 40%, rgba(0,0,0,1) 42%, rgba(0,0,0,0) 100%)',
            WebkitMaskImage:
              'radial-gradient(70% 56% at 50% 40%, rgba(0,0,0,1) 42%, rgba(0,0,0,0) 100%)'
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(72% 60% at 50% 34%, rgba(0,0,0,0) 35%, rgba(0,0,0,0.60) 100%)'
          }}
        />
      </div>

      <section className="mx-auto max-w-6xl px-4 pt-10 pb-14 md:pt-14 md:pb-16">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0}
          className="rounded-[30px] border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-8 md:p-10 shadow-[0_28px_90px_rgba(0,0,0,0.55)]"
        >
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-4 py-2">
                <span className="font-bignoodle tracking-[0.22em] text-[11px] uppercase crema">
                  garantía
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--pc-oro)] shadow-[0_0_12px_rgba(222,174,97,0.45)]" />
                <span className="text-[12px] text-white/70">
                  claridad y respaldo
                </span>
              </div>

              <h1 className="mt-5 leading-[1.05]">
                <span className="titulo uppercase block text-3xl sm:text-4xl md:text-5xl text-white/95">
                  Garantía
                </span>
                <span className="titulo block mt-1 text-2xl sm:text-3xl md:text-4xl text-white/85">
                  Lo que cubre, lo que no, y cómo se gestiona
                </span>
              </h1>

              <p className="cuerpo mt-4 text-white/70 text-[15px] sm:text-base md:text-lg max-w-2xl">
                Nuestro foco es que la solución quede estable. Si algo
                relacionado al servicio vuelve a aparecer, lo revisamos con
                prioridad y con total transparencia.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex"
              >
                <button
                  className={cx(
                    'group relative inline-flex items-center justify-center gap-2',
                    'rounded-2xl px-6 py-3 text-sm md:text-base font-semibold',
                    'text-[color:var(--pc-bg)] shadow-[0_18px_50px_rgba(0,0,0,0.45)]',
                    'ring-1 ring-[rgba(222,174,97,0.35)]',
                    'transition-transform duration-200 hover:-translate-y-[1px] active:translate-y-0'
                  )}
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(222,174,97,0.98), rgba(157,112,63,0.95))'
                  }}
                >
                  <FaWhatsapp />
                  Consultar garantía
                  <FaArrowRight className="opacity-80" />
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl"
                  >
                    <span className="absolute -left-1/2 top-0 h-full w-1/2 bg-[rgba(255,246,238,0.35)] opacity-0 blur-md skew-x-[-12deg] group-hover:opacity-60 animate-[ray_1.2s_ease-out_infinite]" />
                  </span>
                </button>
              </a>

              <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                <div className="flex items-center gap-2 text-[12px] text-white/65">
                  <FaRegClock />
                  Te respondemos y coordinamos por WhatsApp
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3">
            <Pill
              tone="ok"
              icon={<FaShieldAlt />}
              title="Respaldo real"
              desc="Si es del servicio, se revisa y se corrige con prioridad."
            />
            <Pill
              icon={<FaClipboardList />}
              title="Transparencia"
              desc="Te mostramos qué se hizo y qué se recomienda para mantenerlo."
            />
            <Pill
              tone="bad"
              icon={<FaExclamationTriangle />}
              title="Sin confusión"
              desc="Queda claro qué cubre y qué no, para evitar malentendidos."
            />
          </div>

          <div
            aria-hidden
            className="mt-7 h-px w-full"
            style={{
              background:
                'linear-gradient(90deg, transparent, rgba(222,174,97,0.35), transparent)'
            }}
          />
        </motion.div>

        {/* Cubre / No cubre */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-3">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            custom={0}
          >
            <Block title="Qué cubre" subtitle="incluido">
              <div className="grid gap-2.5">
                {cubre.map((t) => (
                  <ListItem key={t} ok text={t} />
                ))}
              </div>
              <div className="mt-4 text-[12px] text-white/55 leading-relaxed">
                Nota: la garantía aplica sobre el trabajo realizado. Si el
                origen es distinto, te lo explicamos y te proponemos opciones.
              </div>
            </Block>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            custom={0.06}
          >
            <Block title="Qué no cubre" subtitle="exclusiones típicas">
              <div className="grid gap-2.5">
                {noCubre.map((t) => (
                  <ListItem key={t} ok={false} text={t} />
                ))}
              </div>
              <div className="mt-4 text-[12px] text-white/55 leading-relaxed">
                Si tenés dudas, consultá. Preferimos aclararlo antes y dejarlo
                por escrito.
              </div>
            </Block>
          </motion.div>
        </div>

        {/* Cómo se gestiona */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          custom={0}
          className="mt-10"
        >
          <div className="rounded-[30px] border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-8">
            <div className="text-[11px] uppercase tracking-[0.22em] text-white/55">
              proceso
            </div>
            <h2 className="titulo mt-2 text-2xl sm:text-3xl text-white/90">
              Cómo gestionar la garantía
            </h2>
            <p className="cuerpo mt-2 text-white/70 max-w-2xl">
              Queremos que sea simple: nos hablás, validamos el caso y lo
              resolvemos con un diagnóstico claro.
            </p>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3">
              {pasos.map((s, i) => (
                <div
                  key={s.title}
                  className="rounded-3xl border border-white/10 bg-black/20 p-5"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="h-10 w-10 rounded-2xl border bg-white/5 flex items-center justify-center"
                      style={{ borderColor: 'rgba(222,174,97,0.20)' }}
                    >
                      <span style={{ color: 'rgba(245,214,187,0.90)' }}>
                        {s.icon}
                      </span>
                    </div>
                    <div>
                      <div className="text-[13px] font-semibold text-white/90">
                        {s.title}
                      </div>
                      <div className="mt-1 text-[12px] text-white/65 leading-relaxed">
                        {s.desc}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div
              aria-hidden
              className="mt-7 h-px w-full"
              style={{
                background:
                  'linear-gradient(90deg, transparent, rgba(222,174,97,0.30), transparent)'
              }}
            />

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="rounded-3xl border border-white/10 bg-black/20 p-5">
                <div className="flex items-start gap-3">
                  <div
                    className="h-10 w-10 rounded-2xl border bg-white/5 flex items-center justify-center"
                    style={{ borderColor: 'rgba(157,112,63,0.20)' }}
                  >
                    <FaClipboardList
                      style={{ color: 'rgba(245,214,187,0.85)' }}
                    />
                  </div>
                  <div>
                    <div className="text-[13px] font-semibold text-white/90">
                      Qué ayuda a resolver más rápido
                    </div>
                    <div className="mt-2 grid gap-2">
                      {[
                        'Qué síntoma aparece y cuándo.',
                        'Si cambió algo (software, periféricos, cables).',
                        'Foto/video del error si se puede.'
                      ].map((t) => (
                        <div key={t} className="flex items-start gap-2">
                          <FaCheckCircle
                            className="mt-[3px]"
                            style={{ color: 'rgba(222,174,97,0.75)' }}
                          />
                          <div className="text-[12px] text-white/65 leading-relaxed">
                            {t}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-black/20 p-5">
                <div className="flex items-start gap-3">
                  <div
                    className="h-10 w-10 rounded-2xl border bg-white/5 flex items-center justify-center"
                    style={{ borderColor: 'rgba(157,112,63,0.20)' }}
                  >
                    <FaTools style={{ color: 'rgba(245,214,187,0.85)' }} />
                  </div>
                  <div>
                    <div className="text-[13px] font-semibold text-white/90">
                      Buenas prácticas para cuidar tu PC
                    </div>
                    <div className="mt-2 text-[12px] text-white/65 leading-relaxed">
                      Mantenerla ventilada, evitar “optimizadores mágicos”, y
                      usar software confiable ayuda a sostener rendimiento y
                      estabilidad.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA final */}
            <div className="mt-7 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
              <div className="text-[12px] text-white/60">
                Si no estás seguro si aplica garantía, escribinos y lo vemos sin
                complicarlo.
              </div>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex"
              >
                <button className="inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold border border-white/10 bg-white/5 text-white/85 hover:bg-white/10 transition">
                  <FaWhatsapp />
                  Hablar ahora
                  <FaArrowRight className="opacity-70" />
                </button>
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      <style>{`
        @keyframes ray {
          0%   { transform: translateX(-40%) skewX(-12deg); opacity: 0; }
          15%  { opacity: .85; }
          100% { transform: translateX(40%)  skewX(-12deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
