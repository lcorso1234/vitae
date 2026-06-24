import React from 'react';
import { VitaeData } from '../types/vitae';

const formatUrl = (url: string) => {
  if (!url) return '#';
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('mailto:') || url.startsWith('tel:')) {
    return url;
  }
  return `https://${url}`;
};

interface CoverLetterPreviewProps {
  data: VitaeData;
}

export const CoverLetterPreview: React.FC<CoverLetterPreviewProps> = ({ data }) => {
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
        id="cover-letter-preview" 
        className="print-cover-letter text-[var(--text-main)] min-h-[1056px] w-full max-w-[816px] mx-auto font-sans relative print:w-[816px] print:min-h-[1056px] print:mx-auto shadow-xl print:shadow-none mt-12 print:mt-0"
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
              <div className="h-[60px] print:h-[20px] w-full flex justify-center items-start pt-2">
                 <span className="text-[9px] text-[var(--text-muted)] opacity-60 italic hidden print:inline">
                   * Note: To open links, please ensure this PDF is opened fully on a computer.
                 </span>
              </div>
            </td>
          </tr>
        </thead>
        <tfoot className="table-footer-group">
          <tr><td className="p-0 m-0 border-0"><div className="h-[60px] print:h-[20px] w-full" /></td></tr>
        </tfoot>
        <tbody className="border-0 p-0 m-0">
          <tr>
            <td className="p-0 m-0 border-0 px-[60px] align-top">
              {/* Header */}
              <header className="mb-[40px] print:mb-[32px] pb-6 print:pb-4 text-center break-inside-avoid">
                {data.logoUrl && (
                  <div className="flex justify-center mb-6 print:mb-4">
                    <img src={data.logoUrl} alt="Logo" className="w-16 h-16 object-cover rounded-xl shadow-sm border border-black/5" />
                  </div>
                )}
                <div className="text-[10px] font-bold tracking-[0.3em] uppercase text-[var(--text-main)] mb-4">Cover Letter</div>
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

              <div className="space-y-7 print:space-y-5 text-[12.5px] leading-[2] whitespace-pre-wrap text-[var(--text-main)] font-normal">
                {data.coverLetter || "Please add your cover letter content in the editor."}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    </>
  );
};
