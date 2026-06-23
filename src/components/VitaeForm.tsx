import React from 'react';
import { VitaeData, SocialLink, Project, Experience, Education } from '../types/vitae';

interface VitaeFormProps {
  data: VitaeData;
  onChange: (newData: VitaeData) => void;
}

export const VitaeForm: React.FC<VitaeFormProps> = ({ data, onChange }) => {
  const [skillsText, setSkillsText] = React.useState(data.skills.technical.join(', '));
  const [jobDescription, setJobDescription] = React.useState('');
  const [isTailoring, setIsTailoring] = React.useState(false);
  const [suggestedInvention, setSuggestedInvention] = React.useState<{title: string, description: string, bullets: string[]} | null>(null);
  const [previousExperience, setPreviousExperience] = React.useState<Experience[] | null>(null);

  const handleTailorResume = async () => {
    if (!jobDescription) return alert('Please enter a job description first.');
    setIsTailoring(true);
    setSuggestedInvention(null);
    try {
      const res = await fetch('/api/tailor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobDescription,
          experience: data.experience,
          projects: data.projects,
        }),
      });
      
      const result = await res.json();
      
      if (!res.ok) {
        throw new Error(result.error || 'Failed to tailor resume');
      }

      setPreviousExperience(data.experience);
      onChange({
        ...data,
        experience: result.tailoredExperience,
      });

      if (result.suggestedInvention) {
        setSuggestedInvention(result.suggestedInvention);
      } else {
        alert('Resume successfully tailored!');
      }

    } catch (error: any) {
      alert(`Error: ${error.message}`);
    } finally {
      setIsTailoring(false);
    }
  };

  React.useEffect(() => {
    const newTextCleaned = data.skills.technical.join(', ');
    const currentTextCleaned = skillsText.split(',').map(s => s.trim()).filter(Boolean).join(', ');
    if (newTextCleaned !== currentTextCleaned) {
      setSkillsText(newTextCleaned);
    }
  }, [data.skills.technical, skillsText]);

  const handlePersonalInfoChange = (field: string, value: string) => {
    onChange({
      ...data,
      personalInfo: { ...data.personalInfo, [field]: value }
    });
  };

  // Generic helpers
  const generateId = () => Math.random().toString(36).substring(2, 11);

  return (
    <div className="space-y-12 pb-24">
      {/* AI Tailoring */}
      <section className="bg-zinc-900 border border-indigo-500/30 p-8 rounded-3xl shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
           <svg className="w-32 h-32 text-indigo-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
        </div>
        <h3 className="text-2xl font-bold tracking-tighter text-white mb-4 border-b border-white/5 pb-4 flex items-center gap-3">
          <span className="text-indigo-400">✨</span> AI Resume Tailor
        </h3>
        <p className="text-zinc-400 text-sm mb-6">Paste the target job description below. Our AI will perfectly align your work experience achievements to match the role requirements, without altering your projects.</p>
        
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          rows={5}
          className="w-full bg-zinc-800/50 text-white rounded-xl border border-white/5 p-4 focus:outline-none focus:border-indigo-500 transition-colors mb-4"
          placeholder="Paste job description here..."
        />
        
        <div className="flex flex-wrap gap-4">
          <button
            onClick={handleTailorResume}
            disabled={isTailoring || !jobDescription}
            className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-zinc-800 disabled:text-zinc-500 text-white font-bold py-3 px-6 rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-indigo-500/20"
          >
            {isTailoring ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                Optimizing Experience...
              </>
            ) : 'Tailor Resume to Job'}
          </button>

          {previousExperience && (
            <button
              onClick={() => {
                onChange({ ...data, experience: previousExperience });
                setPreviousExperience(null);
                setSuggestedInvention(null);
              }}
              className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold py-3 px-6 rounded-xl transition-all flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"/></svg>
              Undo AI Changes
            </button>
          )}
        </div>

        {suggestedInvention && (
          <div className="mt-8 bg-indigo-500/10 border border-indigo-500/20 p-6 rounded-2xl relative">
             <button onClick={() => setSuggestedInvention(null)} className="absolute top-4 right-4 text-zinc-500 hover:text-white">✕</button>
             <h4 className="text-indigo-400 font-bold mb-2 flex items-center gap-2">💡 AI Suggested Invention</h4>
             <p className="text-sm text-zinc-300 mb-4">Based on the job description, the employer would love this project:</p>
             <div className="bg-black/20 p-4 rounded-xl mb-4">
               <h5 className="font-bold text-white text-lg">{suggestedInvention.title}</h5>
               <p className="text-zinc-400 text-sm mb-2">{suggestedInvention.description}</p>
               <ul className="list-disc pl-5 text-sm text-zinc-300 space-y-1">
                 {suggestedInvention.bullets.map((b, i) => <li key={i}>{b}</li>)}
               </ul>
             </div>
             <button 
               onClick={() => {
                 onChange({
                   ...data,
                   projects: [{
                     id: generateId(),
                     title: suggestedInvention.title,
                     description: suggestedInvention.description,
                     link: '',
                     bullets: suggestedInvention.bullets,
                   }, ...data.projects]
                 });
                 setSuggestedInvention(null);
                 alert('Suggested invention added to your Projects!');
               }}
               className="bg-white text-black font-bold py-2 px-6 rounded-lg text-sm hover:bg-zinc-200 transition-colors"
             >
               Add to Projects
             </button>
          </div>
        )}
      </section>

      {/* Appearance & Settings */}
      <section className="bg-zinc-900 border border-white/10 p-8 rounded-3xl shadow-2xl">
        <h3 className="text-2xl font-bold tracking-tighter text-white mb-8 border-b border-white/5 pb-4">Appearance & Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-6">
            <Input 
              label="Document Title" 
              value={data.documentTitle || ''} 
              onChange={(v) => onChange({ ...data, documentTitle: v })} 
            />
            <Input 
              label="Logo URL (leave blank to hide)" 
              value={data.logoUrl || ''} 
              onChange={(v) => onChange({ ...data, logoUrl: v })} 
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-2 px-1">Background Theme Color</label>
            <div className="flex items-center gap-4">
              <input
                type="color"
                value={data.themeColor || '#2a3439'}
                onChange={(e) => onChange({ ...data, themeColor: e.target.value })}
                className="w-12 h-12 rounded cursor-pointer bg-zinc-800/50 border border-white/5"
              />
              <div className="flex gap-2">
                {['#2a3439', '#1e1e1e', '#0f172a', '#172554', '#3f1d38', '#f5f5f4'].map(color => (
                  <button
                    key={color}
                    onClick={() => onChange({ ...data, themeColor: color })}
                    className={`w-8 h-8 rounded-full border-2 ${data.themeColor === color ? 'border-indigo-500' : 'border-white/10'}`}
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Personal Info */}
      <section className="bg-zinc-900 border border-white/10 p-8 rounded-3xl shadow-2xl">
        <h3 className="text-2xl font-bold tracking-tighter text-white mb-8 border-b border-white/5 pb-4">Personal Info</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input label="Full Name" value={data.personalInfo.fullName} onChange={(v) => handlePersonalInfoChange('fullName', v)} />
          <Input label="Target Position" value={data.personalInfo.targetPosition} onChange={(v) => handlePersonalInfoChange('targetPosition', v)} />
          <Input label="Email" value={data.personalInfo.email} onChange={(v) => handlePersonalInfoChange('email', v)} />
          <Input label="Phone Number" value={data.personalInfo.phone || ''} onChange={(v) => handlePersonalInfoChange('phone', v)} />
          <Input label="Location" value={data.personalInfo.location} onChange={(v) => handlePersonalInfoChange('location', v)} />
          <Input label="Relocation" value={data.personalInfo.relocation} onChange={(v) => handlePersonalInfoChange('relocation', v)} />
        </div>
        
        <div className="mt-8 space-y-4">
          <div className="flex justify-between items-center px-2">
            <h4 className="text-sm font-semibold text-zinc-400 uppercase tracking-widest">Social Links</h4>
            <button onClick={() => {
              onChange({ ...data, personalInfo: { ...data.personalInfo, socialLinks: [...data.personalInfo.socialLinks, { name: '', url: '' }] } });
            }} className="text-xs bg-indigo-500/20 text-indigo-400 px-3 py-1 rounded hover:bg-indigo-500/30">Add Link</button>
          </div>
          {data.personalInfo.socialLinks.map((link, i) => (
            <div key={i} className="flex gap-4 items-center bg-zinc-800/50 p-4 rounded-xl border border-white/5 relative">
              <Input label="Site Name" value={link.name} onChange={(v) => {
                const newLinks = [...data.personalInfo.socialLinks];
                newLinks[i].name = v;
                onChange({ ...data, personalInfo: { ...data.personalInfo, socialLinks: newLinks } });
              }} className="flex-1" />
              <Input label="URL" value={link.url} onChange={(v) => {
                const newLinks = [...data.personalInfo.socialLinks];
                newLinks[i].url = v;
                onChange({ ...data, personalInfo: { ...data.personalInfo, socialLinks: newLinks } });
              }} className="flex-1" />
              <button onClick={() => {
                const newLinks = data.personalInfo.socialLinks.filter((_, idx) => idx !== i);
                onChange({ ...data, personalInfo: { ...data.personalInfo, socialLinks: newLinks } });
              }} className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs hover:bg-red-600">✕</button>
            </div>
          ))}
        </div>
      </section>

      {/* Cover Letter */}
      <section className="bg-zinc-900 border border-white/10 p-8 rounded-3xl shadow-2xl">
        <h3 className="text-2xl font-bold tracking-tighter text-white mb-8 border-b border-white/5 pb-4">Cover Letter</h3>
        <textarea
          value={data.coverLetter || ''}
          onChange={(e) => onChange({ ...data, coverLetter: e.target.value })}
          rows={8}
          className="w-full bg-zinc-800/50 text-white rounded-xl border border-white/5 p-4 focus:outline-none focus:border-indigo-500 transition-colors"
          placeholder="Craft your cover letter..."
        />
      </section>

      {/* Summary */}
      <section className="bg-zinc-900 border border-white/10 p-8 rounded-3xl shadow-2xl">
        <h3 className="text-2xl font-bold tracking-tighter text-white mb-8 border-b border-white/5 pb-4">Professional Summary</h3>
        <textarea
          value={data.summary}
          onChange={(e) => onChange({ ...data, summary: e.target.value })}
          rows={4}
          className="w-full bg-zinc-800/50 text-white rounded-xl border border-white/5 p-4 focus:outline-none focus:border-indigo-500 transition-colors"
          placeholder="Craft your 3-4 sentence professional summary..."
        />
      </section>

      {/* Skills */}
      <section className="bg-zinc-900 border border-white/10 p-8 rounded-3xl shadow-2xl">
        <h3 className="text-2xl font-bold tracking-tighter text-white mb-8 border-b border-white/5 pb-4">Technical Skills</h3>
        <textarea
          value={skillsText}
          onChange={(e) => {
            const val = e.target.value;
            setSkillsText(val);
            onChange({ ...data, skills: { ...data.skills, technical: val.split(',').map(s => s.trim()).filter(Boolean) } });
          }}
          rows={2}
          className="w-full bg-zinc-800/50 text-white rounded-xl border border-white/5 p-4 focus:outline-none focus:border-indigo-500 transition-colors"
          placeholder="Comma separated list of skills..."
        />
      </section>

      {/* Experience */}
      <section className="bg-zinc-900 border border-white/10 p-8 rounded-3xl shadow-2xl">
        <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
          <h3 className="text-2xl font-bold tracking-tighter text-white">Work Experience</h3>
          <button onClick={() => {
            onChange({ ...data, experience: [{ id: generateId(), company: '', role: '', startDate: '', endDate: '', link: '', achievements: [''] }, ...data.experience] });
          }} className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-indigo-500">Add Experience</button>
        </div>
        <div className="space-y-8">
          {data.experience.map((exp, i) => (
            <div key={exp.id} className="relative bg-zinc-800/20 p-6 rounded-2xl border border-white/5 group">
              <button onClick={() => {
                const newExp = data.experience.filter((_, idx) => idx !== i);
                onChange({ ...data, experience: newExp });
              }} className="absolute -top-3 -right-3 bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-red-600 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity">✕</button>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <Input label="Company" value={exp.company} onChange={(v) => {
                  const newExp = [...data.experience];
                  newExp[i].company = v;
                  onChange({ ...data, experience: newExp });
                }} />
                <Input label="Role" value={exp.role} onChange={(v) => {
                  const newExp = [...data.experience];
                  newExp[i].role = v;
                  onChange({ ...data, experience: newExp });
                }} />
                <Input label="Start Date" value={exp.startDate} onChange={(v) => {
                  const newExp = [...data.experience];
                  newExp[i].startDate = v;
                  onChange({ ...data, experience: newExp });
                }} />
                <Input label="End Date" value={exp.endDate} onChange={(v) => {
                  const newExp = [...data.experience];
                  newExp[i].endDate = v;
                  onChange({ ...data, experience: newExp });
                }} />
                <Input label="Company Link (Optional)" value={exp.link || ''} className="md:col-span-2" onChange={(v) => {
                  const newExp = [...data.experience];
                  newExp[i].link = v;
                  onChange({ ...data, experience: newExp });
                }} />
              </div>
              <div className="mb-4">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">Key Achievements</h4>
                  <button onClick={() => {
                    const newExp = [...data.experience];
                    newExp[i].achievements.push('');
                    onChange({ ...data, experience: newExp });
                  }} className="text-[10px] bg-zinc-700 text-zinc-300 px-2 py-1 rounded hover:bg-zinc-600">Add Bullet</button>
                </div>
                {exp.achievements.map((ach, achIdx) => (
                  <div key={achIdx} className="relative mb-2 flex items-start gap-2">
                    <textarea
                      value={ach}
                      onChange={(e) => {
                        const newExp = [...data.experience];
                        newExp[i].achievements[achIdx] = e.target.value;
                        onChange({ ...data, experience: newExp });
                      }}
                      rows={2}
                      className="w-full bg-zinc-800/50 text-white rounded-lg border border-white/5 p-3 text-sm focus:outline-none focus:border-indigo-500"
                    />
                    <button onClick={() => {
                      const newExp = [...data.experience];
                      newExp[i].achievements = newExp[i].achievements.filter((_, idx) => idx !== achIdx);
                      onChange({ ...data, experience: newExp });
                    }} className="mt-2 text-zinc-500 hover:text-red-500">✕</button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section className="bg-zinc-900 border border-white/10 p-8 rounded-3xl shadow-2xl">
        <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
          <h3 className="text-2xl font-bold tracking-tighter text-white">Tech Projects</h3>
          <button onClick={() => {
            onChange({ ...data, projects: [{ id: generateId(), title: '', description: '', link: '', bullets: [''] }, ...data.projects] });
          }} className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-indigo-500">Add Project</button>
        </div>
        <div className="space-y-8">
          {data.projects.map((proj, i) => (
            <div key={proj.id} className="relative bg-zinc-800/20 p-6 rounded-2xl border border-white/5 group">
              <button onClick={() => {
                const newProj = data.projects.filter((_, idx) => idx !== i);
                onChange({ ...data, projects: newProj });
              }} className="absolute -top-3 -right-3 bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-red-600 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity">✕</button>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <Input label="Title" value={proj.title} onChange={(v) => {
                  const newProj = [...data.projects];
                  newProj[i].title = v;
                  onChange({ ...data, projects: newProj });
                }} />
                <Input label="Link (Source/Live)" value={proj.link} onChange={(v) => {
                  const newProj = [...data.projects];
                  newProj[i].link = v;
                  onChange({ ...data, projects: newProj });
                }} />
              </div>
              <div className="mb-4">
                <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-2 px-1">One-line Description</label>
                <input
                  type="text"
                  value={proj.description}
                  onChange={(e) => {
                    const newProj = [...data.projects];
                    newProj[i].description = e.target.value;
                    onChange({ ...data, projects: newProj });
                  }}
                  className="w-full bg-zinc-800/50 text-white rounded-xl border border-white/5 h-12 px-4 mb-4 focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div className="mb-4">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">Project Bullets</h4>
                  <button onClick={() => {
                    const newProj = [...data.projects];
                    newProj[i].bullets.push('');
                    onChange({ ...data, projects: newProj });
                  }} className="text-[10px] bg-zinc-700 text-zinc-300 px-2 py-1 rounded hover:bg-zinc-600">Add Bullet</button>
                </div>
                {proj.bullets.map((bullet, achIdx) => (
                  <div key={achIdx} className="relative mb-2 flex items-start gap-2">
                    <textarea
                      value={bullet}
                      onChange={(e) => {
                        const newProj = [...data.projects];
                        newProj[i].bullets[achIdx] = e.target.value;
                        onChange({ ...data, projects: newProj });
                      }}
                      rows={2}
                      className="w-full bg-zinc-800/50 text-white rounded-lg border border-white/5 p-3 text-sm focus:outline-none focus:border-indigo-500"
                    />
                    <button onClick={() => {
                      const newProj = [...data.projects];
                      newProj[i].bullets = newProj[i].bullets.filter((_, idx) => idx !== achIdx);
                      onChange({ ...data, projects: newProj });
                    }} className="mt-2 text-zinc-500 hover:text-red-500">✕</button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="bg-zinc-900 border border-white/10 p-8 rounded-3xl shadow-2xl">
        <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
          <h3 className="text-2xl font-bold tracking-tighter text-white">Education & Certificates</h3>
          <button onClick={() => {
            onChange({ ...data, education: [{ id: generateId(), school: '', degree: '', program: '', field: '', startDate: '', endDate: '' }, ...data.education] });
          }} className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-indigo-500">Add Education</button>
        </div>
        <div className="space-y-6">
          {data.education.map((edu, i) => (
            <div key={edu.id} className="relative grid grid-cols-1 md:grid-cols-2 gap-4 bg-zinc-800/20 p-6 rounded-2xl border border-white/5 group">
              <button onClick={() => {
                const newEdu = data.education.filter((_, idx) => idx !== i);
                onChange({ ...data, education: newEdu });
              }} className="absolute -top-3 -right-3 bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-red-600 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity z-10">✕</button>
              
              <Input label="School/Institution" value={edu.school} onChange={(v) => {
                const newEdu = [...data.education];
                newEdu[i].school = v;
                onChange({ ...data, education: newEdu });
              }} />
              <Input label="Degree Type (e.g. Certificate, BS)" value={edu.degree} onChange={(v) => {
                const newEdu = [...data.education];
                newEdu[i].degree = v;
                onChange({ ...data, education: newEdu });
              }} />
              <Input label="Program/Major" value={edu.program} onChange={(v) => {
                const newEdu = [...data.education];
                newEdu[i].program = v;
                onChange({ ...data, education: newEdu });
              }} />
              <Input label="Field (Optional)" value={edu.field || ''} onChange={(v) => {
                const newEdu = [...data.education];
                newEdu[i].field = v;
                onChange({ ...data, education: newEdu });
              }} />
              <Input label="Start Date" value={edu.startDate} onChange={(v) => {
                const newEdu = [...data.education];
                newEdu[i].startDate = v;
                onChange({ ...data, education: newEdu });
              }} />
              <Input label="End Date" value={edu.endDate} onChange={(v) => {
                const newEdu = [...data.education];
                newEdu[i].endDate = v;
                onChange({ ...data, education: newEdu });
              }} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const Input: React.FC<{ label: string; value: string; onChange: (v: string) => void; className?: string }> = ({ label, value, onChange, className }) => (
  <div className={className}>
    <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-2 px-1">{label}</label>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-zinc-800/50 text-white rounded-xl border border-white/5 h-12 px-4 focus:outline-none focus:border-indigo-500 transition-colors"
    />
  </div>
);

const SkillsTextarea: React.FC<{ skills: string[]; onChange: (skills: string[]) => void }> = ({ skills, onChange }) => {
  const [text, setText] = React.useState(() => skills.join(', '));

  return (
    <textarea
      value={text}
      onChange={(e) => {
        setText(e.target.value);
        onChange(e.target.value.split(',').map(s => s.trim()).filter(Boolean));
      }}
      onBlur={() => {
        setText(skills.join(', '));
      }}
      rows={2}
      className="w-full bg-zinc-800/50 text-white rounded-xl border border-white/5 p-4 focus:outline-none focus:border-indigo-500 transition-colors"
      placeholder="Comma separated list of skills..."
    />
  );
};
