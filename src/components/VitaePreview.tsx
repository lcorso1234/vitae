import React from 'react';
import { VitaeData } from '../types/vitae';

interface VitaePreviewProps {
  data: VitaeData;
}

export const VitaePreview: React.FC<VitaePreviewProps> = ({ data }) => {
  const certificates = data.education.filter(e => e.degree.toLowerCase().includes('certificate') || e.program.toLowerCase().includes('certificate'));
  const degrees = data.education.filter(e => !e.degree.toLowerCase().includes('certificate') && !e.program.toLowerCase().includes('certificate'));

  // Hardcoded soft skills/experience paragraph from design (fallback to summary if needed, but we'll use a fixed string as requested)
  const secondaryExperience = "Proven ability to bridge complex UI/UX design with scalable backend infrastructure. Skilled at entering organizations, solving massive technical bottlenecks, and exiting seamlessly. Framed strictly around execution and delivering business outcomes.";

  return (
    <div 
      id="vitae-preview" 
      className="bg-white text-zinc-900 min-h-[1056px] w-full max-w-[816px] mx-auto font-sans relative print:w-[816px] print:min-h-0 print:mx-auto shadow-xl print:shadow-none flex flex-col"
      style={{ fontFamily: "'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif" }}
    >
      {/* Header */}
      <header className="bg-[#f4f4f5] px-10 pt-10 pb-6 shrink-0 print:bg-[#f4f4f5]">
        <div className="flex flex-col gap-2">
          <h1 className="text-[44px] font-extrabold tracking-tighter leading-none text-zinc-900 uppercase">
            {data.personalInfo.fullName}
          </h1>
          <h2 className="text-[18px] font-medium tracking-[0.1em] uppercase leading-none text-zinc-600">
            {data.personalInfo.targetPosition}
          </h2>
          
          <div className="flex justify-between items-end mt-6 text-[11px] font-semibold tracking-wider uppercase text-zinc-500 border-t border-zinc-300 pt-3">
            <div className="flex gap-4">
              <span>{data.personalInfo.location}</span>
              {data.personalInfo.relocation && (
                <>
                  <span>|</span>
                  <span>{data.personalInfo.relocation}</span>
                </>
              )}
            </div>
            <div className="flex gap-4 items-center">
              <span>{data.personalInfo.email}</span>
              <span className="w-1 h-1 rounded-full bg-zinc-400"></span>
              <span className="text-zinc-900 font-bold">port.rumidesign.tech</span>
            </div>
          </div>
        </div>
      </header>

      {/* Body - Two Column Layout */}
      <div className="flex-grow grid grid-cols-[1fr_280px] px-10 py-8 relative">
        {/* Dotted Vertical Divider */}
        <div className="absolute left-[calc(100%-280px)] top-8 bottom-8 w-[1px] border-l-2 border-dotted border-zinc-300 transform -translate-x-1/2 hidden md:block print:block">
          <div className="absolute -top-1 -left-[3.5px] w-2 h-2 rounded-full bg-zinc-300"></div>
          <div className="absolute -bottom-1 -left-[3.5px] w-2 h-2 rounded-full bg-zinc-300"></div>
        </div>

        {/* Left Column */}
        <div className="pr-10 space-y-8">
          <section>
            <p className="text-[13px] leading-[1.8] text-zinc-800 font-medium whitespace-pre-wrap">
              {data.summary}
            </p>
          </section>

          <section>
            <h3 className="text-[13px] font-bold mb-5 uppercase tracking-[0.15em] text-zinc-900 pb-2 border-b border-zinc-200">Experience</h3>
            <div className="space-y-6">
              {data.experience.map((exp) => (
                <div key={exp.id} className="break-inside-avoid">
                  <div className="flex gap-3 items-start mb-2">
                    <div className="mt-1 shrink-0">
                      <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-400">
                        <polyline points="9 18 15 12 9 6"></polyline>
                      </svg>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-[14px] font-bold text-zinc-900 tracking-tight">{exp.role}</h4>
                        <span className="text-zinc-300">|</span>
                        <span className="text-[11.5px] font-bold text-zinc-500 uppercase">{exp.startDate} – {exp.endDate}</span>
                      </div>
                      <div className="text-[13px] font-medium italic text-zinc-600 mt-0.5">
                        {exp.company}
                      </div>
                    </div>
                  </div>
                  <ul className="pl-5 space-y-1.5 mt-2">
                    {exp.achievements.map((ach, i) => (
                      <li key={i} className="text-[12.5px] leading-[1.7] text-zinc-700">
                        {ach}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Projects (if any) */}
          {data.projects && data.projects.length > 0 && (
            <section>
              <h3 className="text-[13px] font-bold mb-5 uppercase tracking-[0.15em] text-zinc-900 pb-2 border-b border-zinc-200">Key Projects</h3>
              <div className="space-y-6">
                {data.projects.map(proj => (
                  <div key={proj.id} className="break-inside-avoid">
                    <div className="flex gap-3 items-start mb-2">
                       <div className="mt-1 shrink-0">
                        <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-400">
                          <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-[14px] font-bold text-zinc-900 tracking-tight">{proj.title}</h4>
                        <p className="text-[12.5px] font-medium text-zinc-600 mt-0.5">{proj.description}</p>
                      </div>
                    </div>
                    <ul className="pl-5 space-y-1.5 mt-2">
                      {proj.bullets.map((bullet, i) => (
                        <li key={i} className="text-[12.5px] leading-[1.7] text-zinc-700">
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

        </div>

        {/* Right Column */}
        <div className="pl-6 space-y-8">
          <section>
            <p className="text-[12.5px] leading-[1.7] text-zinc-700 font-medium italic">
              {secondaryExperience}
            </p>
          </section>

          <section>
            <h3 className="text-[11px] font-bold mb-3 uppercase tracking-[0.15em] text-zinc-900">Other Programs/Tools</h3>
            <div className="flex flex-col gap-1.5">
              {data.skills.technical.map((skill, i) => (
                <div key={i} className="text-[12px] text-zinc-700 font-medium">
                  {skill}
                </div>
              ))}
            </div>
          </section>

          {certificates.length > 0 && (
            <section>
              <h3 className="text-[11px] font-bold mb-3 uppercase tracking-[0.15em] text-zinc-900">Certificates</h3>
              <div className="space-y-4">
                {certificates.map(cert => (
                  <div key={cert.id}>
                    <h4 className="text-[12px] font-bold text-zinc-900">{cert.school}</h4>
                    <p className="text-[11.5px] text-zinc-700 mt-0.5">{cert.program}</p>
                    <p className="text-[10px] font-bold text-zinc-400 uppercase mt-1">{cert.startDate} – {cert.endDate}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {degrees.length > 0 && (
            <section>
              <h3 className="text-[11px] font-bold mb-3 uppercase tracking-[0.15em] text-zinc-900">Education</h3>
              <div className="space-y-4">
                {degrees.map(edu => (
                  <div key={edu.id}>
                    <h4 className="text-[12px] font-bold text-zinc-900">{edu.school}</h4>
                    <p className="text-[11.5px] text-zinc-700 mt-0.5">{edu.degree} {edu.field && `in ${edu.field}`}</p>
                    <p className="text-[10px] font-bold text-zinc-400 uppercase mt-1">{edu.startDate} – {edu.endDate}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section className="pt-4">
            <h3 className="text-[11px] font-bold mb-2 uppercase tracking-[0.15em] text-zinc-900">References</h3>
            <p className="text-[12px] leading-[1.6] text-zinc-700 italic">
              Will gladly furnish personal and professional references on request.
            </p>
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer className="h-6 bg-[#f4f4f5] w-full shrink-0 print:bg-[#f4f4f5]"></footer>
    </div>
  );
};
