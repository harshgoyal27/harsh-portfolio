import FadeIn from './FadeIn';

interface ExperienceItem {
  role: string;
  company: string;
  duration: string;
  location: string;
  description: string[];
}

const EXPERIENCES: ExperienceItem[] = [
  {
    role: 'Kendriya Vidyalaya ',
    company: 'Web Development & Finance Enthusiast',
    duration: 'Jan 2008 — Mar 2023',
    location: 'Ghatshila, Jharkhand',
    description: [
      'Passionate about web development, full-stack technologies, and finance, with a strong interest in building modern digital solutions and continuously learning new skills across tech and business domains.'
    ]
  },
  {
    role: 'KIIT Polytechnic',
    company: 'Electronics & Telecommunication Engineering',
    duration: 'Aug 2023 — May 2026',
    location: 'Bhubaneswar, Odisha',
    description: [
      'Passionate about Electronics and Telecommunication with a strong interest in DSP and Control Systems, focused on signal processing, system analysis, and intelligent electronic technologies.'
    ]
  },
  {
    role: 'KIIT University',
    company: 'VLSI Design & Electronics Engineering',
    duration: 'Aug 2026 — PRESENT',
    location: 'Bhubaneswar, Odisha',
    description: [
      'Driven by a passion for semiconductor technology, digital systems, DSP, and Control Systems, with a focus on designing efficient and intelligent electronic hardware.'
    ]
  }
];

const ExperienceSection = () => {
  return (
    <section
      id="experience"
      className="relative w-full bg-[#0C0C0C] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
    >
      <FadeIn y={40}>
        <h2
          className="hero-heading text-center font-black uppercase tracking-tight leading-none mb-16 sm:mb-20 md:mb-28"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Experience
        </h2>
      </FadeIn>

      <div className="relative mx-auto max-w-4xl">
        
        {/* Central glowing timeline spine */}
        <div className="absolute left-4 md:left-1/2 top-0 h-full w-[2px] -translate-x-1/2 bg-gradient-to-b from-purple-500/80 via-fuchsia-500/40 to-indigo-500/10 shadow-[0_0_10px_rgba(168,85,247,0.15)]" />

        <div className="flex flex-col gap-12 sm:gap-16">
          {EXPERIENCES.map((exp, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={index}
                className={`relative flex flex-col md:flex-row items-start ${
                  isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                
                {/* Timeline node */}
                <div className="absolute left-4 md:left-1/2 top-1.5 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-purple-500 bg-[#0C0C0C] shadow-[0_0_10px_#a855f7] z-10" />

                {/* Content block */}
                <div className={`w-full md:w-[45%] pl-10 md:pl-0 ${isEven ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                  <FadeIn delay={index * 0.15} x={isEven ? -40 : 40} y={0}>
                    <div className="rounded-[20px] border border-white/5 bg-white/[0.02] p-6 hover:border-purple-500/30 hover:bg-white/[0.04] transition-all duration-500 group">
                      
                      {/* Duration */}
                      <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-purple-400 mb-2">
                        {exp.duration}
                      </span>

                      {/* Job Title */}
                      <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-purple-400 transition-colors duration-300">
                        {exp.role}
                      </h3>

                      {/* Company Name */}
                      <div className={`mt-1 flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#D7E2EA]/60 ${
                        isEven ? 'md:justify-end' : 'md:justify-start'
                      } group-hover:text-[#D7E2EA]/85 transition-colors duration-300`}>
                        <span>{exp.company}</span>
                        <span className="text-purple-500/60">•</span>
                        <span>{exp.location}</span>
                      </div>

                      {/* Description List */}
                      <ul className={`mt-4 space-y-2 text-xs sm:text-sm text-[#D7E2EA]/75 leading-relaxed text-left ${
                        isEven ? 'md:text-right' : ''
                      }`}>
                        {exp.description.map((bullet, bIdx) => (
                          <li key={bIdx} className="relative pl-4 md:pl-0">
                            {/* Custom bullet point indicator */}
                            <span className={`absolute left-0 top-2 h-1.5 w-1.5 rounded-full bg-purple-500/80 ${
                              isEven ? 'md:hidden' : ''
                            }`} />
                            {bullet}
                          </li>
                        ))}
                      </ul>

                    </div>
                  </FadeIn>
                </div>

                {/* Empty placeholder spacer for desktop layouts */}
                <div className="hidden md:block w-[45%]" />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ExperienceSection;
