import React from 'react';
import { VitaeData } from '../types/vitae';

interface VitaePreviewProps {
  data: VitaeData;
}

export const VitaePreview: React.FC<VitaePreviewProps> = ({ data }) => {
  const certificates = data.education.filter(e => e.degree.toLowerCase().includes('certificate') || e.program.toLowerCase().includes('certificate'));
  const degrees = data.education.filter(e => !e.degree.toLowerCase().includes('certificate') && !e.program.toLowerCase().includes('certificate'));

  return (
    <div 
      id="vitae-preview" 
      className="bg-[#faf9f6] text-[#1c1917] min-h-[1056px] w-full max-w-[816px] mx-auto font-sans relative print:w-[816px] print:min-h-0 print:mx-auto shadow-xl print:shadow-none"
      style={{ fontFamily: "'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif" }}
    >
      <table className="w-full border-collapse border-0 m-0 p-0">
        <thead className="table-header-group">
          <tr><td className="p-0 m-0 border-0"><div className="h-[60px] print:h-[20px] w-full" /></td></tr>
        </thead>
        <tfoot className="table-footer-group">
          <tr><td className="p-0 m-0 border-0"><div className="h-[60px] print:h-[20px] w-full" /></td></tr>
        </tfoot>
        <tbody className="border-0 p-0 m-0">
          <tr>
            <td className="p-0 m-0 border-0 px-[60px] align-top">
              {/* Header */}
              <header className="mb-[32px] print:mb-[20px] pb-6 print:pb-4 text-center break-inside-avoid">
                <div className="flex justify-center mb-6 print:mb-4">
                  <img src="/lc-logo.png" alt="Logo" className="w-16 h-16 object-cover rounded-xl shadow-sm border border-black/5" />
                </div>
                <div className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#57534e] mb-4">Curriculum Vitae 2026</div>
                <h1 className="text-[38px] font-extrabold tracking-tighter leading-none mb-5 text-[#1c1917]">
                  {data.personalInfo.fullName}
                </h1>
                <h2 className="text-[14px] font-bold tracking-[0.2em] uppercase leading-none mb-4 text-[#57534e]">
                  {data.personalInfo.targetPosition}
                </h2>
                
                <div className="flex justify-center flex-wrap gap-x-3 gap-y-1 text-[12px] text-[#1c1917]">
                  <span>{data.personalInfo.location}</span>
                  <span className="text-[#78716c]">|</span>
                  <span>{data.personalInfo.email}</span>
                  {data.personalInfo.phone && (
                    <>
                      <span className="text-[#78716c]">|</span>
                      <span>{data.personalInfo.phone}</span>
                    </>
                  )}
                  {data.personalInfo.socialLinks.map((link, i) => (
                    <React.Fragment key={i}>
                      <span className="text-[#78716c]">|</span>
                      <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-[#0284c7] hover:text-[#0369a1] transition-colors font-semibold">
                        {link.name}
                      </a>
                    </React.Fragment>
                  ))}
                </div>
              </header>

              <div className="space-y-7 print:space-y-5">
                {/* Objective / Summary */}
                <section className="break-inside-avoid">
                  <h3 className="text-[12px] font-bold mb-3 uppercase tracking-[0.2em] border-b border-[#d6d3d1] pb-2 text-[#57534e]">Summary</h3>
                  <p className="text-[12.5px] leading-[1.8] whitespace-pre-wrap text-[#1c1917] font-light">
                    {data.summary}
                  </p>
                </section>

                {/* Technical Skills */}
                {data.skills.technical.length > 0 && (
                  <section className="break-inside-avoid">
                    <h3 className="text-[12px] font-bold mb-3 uppercase tracking-[0.2em] border-b border-[#d6d3d1] pb-2 text-[#57534e]">Technical Skills</h3>
                    <p className="text-[12.5px] leading-[1.8] text-[#1c1917] font-light">
                      {data.skills.technical.join(', ')}
                    </p>
                  </section>
                )}

                {/* Experience */}
                <section>
                  <h3 className="text-[12px] font-bold mb-4 uppercase tracking-[0.2em] border-b border-[#d6d3d1] pb-2 text-[#57534e]">Work Experience</h3>
                  <div className="space-y-6">
                    {data.experience.map(exp => (
                      <div key={exp.id} className="print:py-1">
                        <div className="break-inside-avoid">
                          <div className="flex justify-between items-baseline mb-1">
                            <h4 className="text-[14px] font-bold text-[#1c1917] tracking-tight">{exp.role}</h4>
                            <span className="text-[11.5px] font-medium text-[#57534e] tracking-widest uppercase">{exp.startDate} – {exp.endDate}</span>
                          </div>
                          <div className="text-[13px] font-medium mb-2.5 text-[#57534e]">
                            {exp.company}
                            {exp.link && (
                              <>
                                <span className="font-normal mx-2 text-[#78716c]">|</span>
                                <a href={exp.link} target="_blank" rel="noopener noreferrer" className="text-[#0284c7] hover:text-[#0369a1] font-medium">Website</a>
                              </>
                            )}
                          </div>
                        </div>
                        <ul className="list-disc pl-5 space-y-1.5">
                          {exp.achievements.map((ach, i) => (
                            <li key={i} className="text-[12.5px] leading-[1.7] text-[#1c1917] font-light pl-1 marker:text-[#78716c] break-inside-avoid">
                              {ach}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Projects */}
                {data.projects.length > 0 && (
                  <section className="print:break-before-page print:pt-8">
                    <h3 className="text-[12px] font-bold mb-4 uppercase tracking-[0.2em] border-b border-[#d6d3d1] pb-2 text-[#57534e]">Tech Projects</h3>
                    <div className="space-y-6">
                      {data.projects.map(proj => (
                        <div key={proj.id} className="print:py-1">
                          <div className="break-inside-avoid">
                            <div className="flex justify-between items-baseline mb-1">
                              <h4 className="text-[14px] font-bold text-[#1c1917] tracking-tight">
                                {proj.title} <span className="font-normal mx-2 text-[#78716c]">|</span> <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-[#0284c7] hover:text-[#0369a1] font-medium">Source</a>
                              </h4>
                            </div>
                            <p className="text-[13px] font-medium mb-2.5 text-[#57534e]">{proj.description}</p>
                          </div>
                          <ul className="list-disc pl-5 space-y-1.5">
                            {proj.bullets.map((bullet, i) => (
                              <li key={i} className="text-[12.5px] leading-[1.7] text-[#1c1917] font-light pl-1 marker:text-[#78716c] break-inside-avoid">
                                {bullet}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Education & Certificates */}
                <section className="break-inside-avoid">
                  <h3 className="text-[12px] font-bold mb-4 uppercase tracking-[0.2em] border-b border-[#d6d3d1] pb-2 text-[#57534e]">Education & Certificates</h3>
                  <div className="space-y-5">
                    {data.education.map(edu => {
                      const isCert = edu.degree.toLowerCase().includes('certificate') || edu.program.toLowerCase().includes('certificate');
                      return (
                        <div key={edu.id} className="flex justify-between items-baseline break-inside-avoid">
                          <div>
                            <h4 className="text-[14px] font-bold text-[#1c1917] tracking-tight">{edu.school}</h4>
                            <p className="text-[12.5px] text-[#1c1917] font-light leading-relaxed mt-0.5">
                              {isCert ? `${edu.program} (Certificate)` : `${edu.degree} ${edu.field ? `in ${edu.field}` : ''}`}
                            </p>
                          </div>
                          <span className="text-[11.5px] font-medium text-[#57534e] tracking-widest uppercase">{edu.startDate} – {edu.endDate}</span>
                        </div>
                      );
                    })}
                  </div>
                </section>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

