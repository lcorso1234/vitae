import React from 'react';
import { VitaeData, SocialLink, Project, Experience, Education } from '../types/vitae';

interface VitaeFormProps {
  data: VitaeData;
  onChange: (newData: VitaeData) => void;
}

export const VitaeForm: React.FC<VitaeFormProps> = ({ data, onChange }) => {
  const [skillsText, setSkillsText] = React.useState(data.skills.technical.join(', '));

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
      {/* Personal Info */}
      <section className="bg-zinc-900 border border-white/10 p-8 rounded-3xl shadow-2xl">
        <h3 className="text-2xl font-bold tracking-tighter text-white mb-8 border-b border-white/5 pb-4">Personal Info</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input label="Full Name" value={data.personalInfo.fullName} onChange={(v) => handlePersonalInfoChange('fullName', v)} />
          <Input label="Target Position" value={data.personalInfo.targetPosition} onChange={(v) => handlePersonalInfoChange('targetPosition', v)} />
          <Input label="Email" value={data.personalInfo.email} onChange={(v) => handlePersonalInfoChange('email', v)} />
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
