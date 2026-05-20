import React from 'react';
import { VitaeData } from '../types/vitae';

interface CoverLetterPreviewProps {
  data: VitaeData;
}

export const CoverLetterPreview: React.FC<CoverLetterPreviewProps> = ({ data }) => {
  return (
    <div 
      id="cover-letter-preview" 
      className="print-cover-letter bg-[#faf9f6] text-[#1c1917] min-h-[1056px] w-full max-w-[816px] mx-auto font-sans relative print:w-[816px] print:min-h-0 print:mx-auto shadow-xl print:shadow-none mt-12 print:mt-0"
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
              <header className="mb-[40px] print:mb-[32px] pb-6 print:pb-4 text-center break-inside-avoid">
                <div className="flex justify-center mb-6 print:mb-4">
                  <img src="/lc-logo.png" alt="Logo" className="w-16 h-16 object-cover rounded-xl shadow-sm border border-black/5" />
                </div>
                <div className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#57534e] mb-4">Cover Letter</div>
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

              <div className="space-y-7 print:space-y-5 text-[12.5px] leading-[2] whitespace-pre-wrap text-[#1c1917] font-light">
                {data.coverLetter || "Please add your cover letter content in the editor."}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
