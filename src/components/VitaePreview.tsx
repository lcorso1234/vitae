import React from 'react';
import { VitaeData } from '../types/vitae';

const formatUrl = (url: string) => {
  if (!url) return '#';
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('mailto:') || url.startsWith('tel:')) {
    return url;
  }
  return `https://${url}`;
};

interface VitaePreviewProps {
  data: VitaeData;
}

export const VitaePreview: React.FC<VitaePreviewProps> = ({ data }) => {
  const certificates = data.education.filter(e => e.degree.toLowerCase().includes('certificate') || e.program.toLowerCase().includes('certificate'));
  const degrees = data.education.filter(e => !e.degree.toLowerCase().includes('certificate') && !e.program.toLowerCase().includes('certificate'));

  const isLightTheme = data.themeColor === '#f5f5f4' || data.themeColor === '#ffffff';

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @page { margin: 0; }
        @media print {
          html, body { 
            background-color: ${data.themeColor || '#2a3439'} !important;
            background-image: ${isLightTheme ? 'none' : "url('/texture.svg')"} !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      `}} />
      <div 
        id="vitae-preview" 
        className="text-[var(--text-main)] min-h-[1056px] w-full max-w-[816px] mx-auto font-sans relative print:w-[816px] print:min-h-[1056px] print:max-h-[2112px] print:overflow-hidden print:mx-auto shadow-xl print:shadow-none"
        style={{ 
          fontFamily: "'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif",
          backgroundColor: data.themeColor || '#2a3439',
          backgroundImage: isLightTheme ? 'none' : "url('/texture.svg')",
          '--text-main': isLightTheme ? '#111827' : '#ffffff',
          '--text-muted': isLightTheme ? '#4b5563' : '#d1d5db',
          '--text-divider': isLightTheme ? '#9ca3af' : '#64748b',
          '--text-link': isLightTheme ? '#0284c7' : '#38bdf8',
          '--text-link-hover': isLightTheme ? '#0369a1' : '#7dd3fc',
          '--border-main': isLightTheme ? '#d1d5db' : '#475569',
        } as React.CSSProperties}
      >
      <table className="w-full border-collapse border-0 m-0 p-0">
        <thead className="table-header-group">
          <tr>
            <td className="p-0 m-0 border-0 align-top">
              <div className="h-[60px] print:h-[40px] w-full flex justify-center items-start pt-4">
                 <span className="text-[9px] text-[var(--text-muted)] opacity-60 italic hidden print:inline">
                   * Note: To open links, please ensure this PDF is opened fully on a computer.
                 </span>
              </div>
            </td>
          </tr>
        </thead>
        <tfoot className="table-footer-group">
          <tr><td className="p-0 m-0 border-0"><div className="h-[60px] print:h-[40px] w-full" /></td></tr>
        </tfoot>
        <tbody className="border-0 p-0 m-0">
          <tr>
            <td className="p-0 m-0 border-0 px-[60px] align-top">
              {/* Header */}
              <header className="mb-[32px] pb-6 text-center break-inside-avoid">
                <div className="text-[10px] font-bold tracking-[0.3em] uppercase text-[var(--text-main)] mb-4">{data.documentTitle || "Curriculum Vitae 2026"}</div>
                <h1 className="text-[38px] font-extrabold tracking-tighter leading-none mb-5 text-[var(--text-main)]">
                  {data.personalInfo.fullName}
                </h1>
                <h2 className="text-[14px] font-bold tracking-[0.2em] uppercase leading-none mb-4 text-[var(--text-main)]">
                  {data.personalInfo.targetPosition}
                </h2>
                
                <div className="flex justify-center flex-wrap gap-x-3 gap-y-1 text-[12px] text-[var(--text-main)]">
                  <span>{data.personalInfo.location}</span>
                  <span className="text-[var(--text-divider)]">|</span>
                  <a href={`mailto:${data.personalInfo.email}`} className="text-[var(--text-link)] hover:text-[var(--text-link-hover)] transition-colors font-semibold">
                    {data.personalInfo.email}
                  </a>
                  {data.personalInfo.phone && (
                    <>
                      <span className="text-[var(--text-divider)]">|</span>
                      <a href={`tel:${data.personalInfo.phone.replace(/[^0-9+]/g, '')}`} className="text-[var(--text-link)] hover:text-[var(--text-link-hover)] transition-colors font-semibold">
                        {data.personalInfo.phone}
                      </a>
                    </>
                  )}
                  {data.personalInfo.socialLinks.map((link, i) => (
                    <React.Fragment key={i}>
                      <span className="text-[var(--text-divider)]">|</span>
                      <a href={formatUrl(link.url)} target="_blank" rel="noopener noreferrer" className="text-[var(--text-link)] hover:text-[var(--text-link-hover)] transition-colors font-semibold">
                        {link.name}
                      </a>
                    </React.Fragment>
                  ))}
                </div>
              </header>

              <div className="space-y-7">
                {/* Objective / Summary */}
                <section>
                  <h3 className="text-[12px] font-bold mb-3 uppercase tracking-[0.2em] border-b border-[var(--border-main)] pb-2 text-[var(--text-muted)] break-after-avoid">Summary</h3>
                  <p className="text-[12.5px] leading-[1.8] whitespace-pre-wrap text-[var(--text-main)] font-normal">
                    {data.summary}
                  </p>
                </section>

                {/* Technical Skills */}
                {data.skills.technical.length > 0 && (
                  <section>
                    <h3 className="text-[12px] font-bold mb-3 uppercase tracking-[0.2em] border-b border-[var(--border-main)] pb-2 text-[var(--text-muted)] break-after-avoid">Technical Skills</h3>
                    <p className="text-[12.5px] leading-[1.8] text-[var(--text-main)] font-normal">
                      {data.skills.technical.join(', ')}
                    </p>
                  </section>
                )}

                {/* Experience */}
                <section>
                  <h3 className="text-[12px] font-bold mb-4 uppercase tracking-[0.2em] border-b border-[var(--border-main)] pb-2 text-[var(--text-muted)] break-after-avoid">Work Experience</h3>
                  <div className="space-y-6">
                    {data.experience.map(exp => (
                      <div key={exp.id} className="print:py-1">
                        <div className="flex justify-between items-baseline mb-1">
                          <h4 className="text-[14px] font-bold text-[var(--text-main)] tracking-tight">{exp.role}</h4>
                          <span className="text-[11.5px] font-medium text-[var(--text-main)] tracking-widest uppercase">{exp.startDate} – {exp.endDate}</span>
                        </div>
                        <div className="text-[13px] font-medium mb-2.5 text-[var(--text-main)]">
                          {exp.company}
                        </div>
                        <ul className="list-disc pl-5 space-y-1.5">
                          {exp.achievements.map((ach, i) => (
                            <li key={i} className="text-[12.5px] leading-[1.7] text-[var(--text-main)] font-normal pl-1 marker:text-[var(--text-divider)]">
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
                  <section>
                    <h3 className="text-[12px] font-bold mb-4 uppercase tracking-[0.2em] border-b border-[var(--border-main)] pb-2 text-[var(--text-muted)] break-after-avoid">Tech Projects</h3>
                    <div className="space-y-6">
                      {data.projects.map(proj => (
                        <div key={proj.id} className="print:py-1">
                          <div className="flex justify-between items-baseline mb-1">
                            <h4 className="text-[14px] font-bold text-[var(--text-main)] tracking-tight">
                              {proj.title}
                            </h4>
                          </div>
                          <p className="text-[13px] font-medium mb-2.5 text-[var(--text-main)]">{proj.description}</p>
                          <ul className="list-disc pl-5 space-y-1.5">
                            {proj.bullets.map((bullet, i) => (
                              <li key={i} className="text-[12.5px] leading-[1.7] text-[var(--text-main)] font-normal pl-1 marker:text-[var(--text-divider)]">
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
                <section>
                  <h3 className="text-[12px] font-bold mb-4 uppercase tracking-[0.2em] border-b border-[var(--border-main)] pb-2 text-[var(--text-muted)] break-after-avoid">Education & Certificates</h3>
                  <div className="space-y-5">
                    {degrees.map(edu => (
                      <div key={edu.id} className="flex justify-between items-baseline">
                        <div>
                          <h4 className="text-[14px] font-bold text-[var(--text-main)] tracking-tight">{edu.school}</h4>
                          <p className="text-[12.5px] text-[var(--text-main)] font-normal leading-relaxed mt-0.5">{edu.degree} {edu.field && `in ${edu.field}`}</p>
                        </div>
                        <span className="text-[11.5px] font-medium text-[var(--text-main)] tracking-widest uppercase">{edu.startDate} – {edu.endDate}</span>
                      </div>
                    ))}
                    {certificates.map(cert => (
                      <div key={cert.id} className="flex justify-between items-baseline">
                        <div>
                          <h4 className="text-[14px] font-bold text-[var(--text-main)] tracking-tight">{cert.school}</h4>
                          <p className="text-[12.5px] text-[var(--text-main)] font-normal leading-relaxed mt-0.5">{cert.program} (Certificate)</p>
                        </div>
                        <span className="text-[11.5px] font-medium text-[var(--text-main)] tracking-widest uppercase">{cert.startDate} – {cert.endDate}</span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    </>
  );
};

