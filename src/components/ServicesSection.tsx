import { motion } from 'framer-motion';
import FadeIn from './FadeIn';

const SERVICES = [
  {
    number: '01',
    title: 'VLSI Design',
    description:
      'Designing efficient digital circuits and semiconductor systems using Verilog, FPGA, and CMOS concepts — focused on performance, optimization, and hardware reliability.',
  },
  {
    number: '02',
    title: 'Embedded systems',
    description:
      'Building microcontroller-based systems with Arduino, ESP32, and sensors for automation, robotics, and real-time applications.',
  },
  {
    number: '03',
    title: 'Digital Signal Processing ',
    description:
      'Working on signal analysis, filtering, and communication systems using MATLAB and DSP techniques for modern electronic applications.',
  },
  {
    number: '04',
    title: 'PCB & Hardware Design',
    description:
      'Designing circuit layouts, interfacing modules, and developing hardware prototypes for IoT, robotics, and embedded electronics projects.',
  },
  {
    number: '05',
    title: 'FPGA Development',
    description:
      'Implementing and testing high-speed digital systems on FPGA platforms with simulation and verification workflows.',
  },
];

const ServicesSection = () => {
  return (
    <section
      id="services"
      className="relative w-full bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
    >
      <FadeIn y={40}>
        <h2
          className="text-center font-black uppercase text-[#0C0C0C] mb-16 sm:mb-20 md:mb-28 leading-none"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Services
        </h2>
      </FadeIn>

      <div className="mx-auto max-w-5xl">
        {SERVICES.map((service, i) => (
          <FadeIn key={service.number} delay={i * 0.15} y={35}>
            <div className="relative flex flex-row items-start gap-6 sm:gap-10 md:gap-14 py-8 sm:py-10 md:py-12">
              
              {/* Staggered left-to-right line draw reveal on TOP border */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{
                  delay: i * 0.18,
                  duration: 1.2,
                  ease: [0.16, 1, 0.3, 1], // Custom premium ease-out cubic
                }}
                style={{ transformOrigin: 'left' }}
                className="absolute top-0 left-0 w-full h-[1px] bg-[#0C0C0C]/15"
              />

              <div
                className="shrink-0 font-black text-[#0C0C0C] leading-none"
                style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
              >
                {service.number}
              </div>

              <div className="group flex flex-col gap-3 sm:gap-4 md:gap-5 pt-2 sm:pt-3 md:pt-4">
                <h3
                  className="font-medium uppercase text-[#0C0C0C] leading-tight relative inline-block w-fit"
                  style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
                >
                  {service.title}
                  <span className="absolute left-0 -bottom-1 h-px w-0 bg-[#0C0C0C]/60 transition-all duration-500 group-hover:w-full" />
                </h3>
                <p
                  className="font-light leading-relaxed text-[#0C0C0C] max-w-2xl"
                  style={{
                    fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)',
                    opacity: 0.6,
                  }}
                >
                  {service.description}
                </p>
              </div>

              {/* For the last item: Staggered bottom border draw reveal */}
              {i === SERVICES.length - 1 && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{
                    delay: (i + 1) * 0.18,
                    duration: 1.2,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  style={{ transformOrigin: 'left' }}
                  className="absolute bottom-0 left-0 w-full h-[1px] bg-[#0C0C0C]/15"
                />
              )}

            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
