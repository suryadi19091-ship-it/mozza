
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, Phone, Linkedin, MapPin, 
  Download, ChevronRight, Briefcase, 
  GraduationCap, Award, Terminal, Camera, RefreshCw,
  Settings, Plus, Trash2, Code, Save, X, Zap
} from 'lucide-react';
import { portfolioData } from './data/portfolioData';
import ThreeBackground from './components/ThreeBackground';
import Chatbot from './components/Chatbot';
import { Experience, Project } from './types';

// Extend local types for the management console
interface SkillGroup {
  category: string;
  items: string[];
}

const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
  >
    {children}
  </motion.div>
);

const SectionHeading = ({ children, icon: Icon }: { children: React.ReactNode, icon: any }) => (
  <div className="flex items-center gap-4 mb-12">
    <div className="p-3 bg-zinc-900/50 border border-blue-500/20 rounded-xl text-blue-400">
      <Icon size={24} />
    </div>
    <h2 className="text-3xl md:text-4xl font-extrabold text-white uppercase tracking-tighter">
      {children}
    </h2>
    <div className="h-px flex-1 bg-gradient-to-r from-blue-500/30 to-transparent ml-4"></div>
  </div>
);

const App: React.FC = () => {
  const [heroImage, setHeroImage] = useState<string>("profile.jpeg");
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [localExperience, setLocalExperience] = useState<Experience[]>([]);
  const [localProjects, setLocalProjects] = useState<Project[]>([]);
  const [localSkills, setLocalSkills] = useState<SkillGroup[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Merge static data with local overrides
  const allExperience = [...localExperience, ...portfolioData.experience];
  const allProjects = [...localProjects, ...portfolioData.projects];
  const allSkills = [...localSkills, ...portfolioData.skills];

  // Load saved data from localStorage
  useEffect(() => {
    const savedImage = localStorage.getItem('mozza_profile_img');
    if (savedImage) setHeroImage(savedImage);

    const savedExp = localStorage.getItem('mozza_custom_experience');
    if (savedExp) setLocalExperience(JSON.parse(savedExp));

    const savedProj = localStorage.getItem('mozza_custom_projects');
    if (savedProj) setLocalProjects(JSON.parse(savedProj));

    const savedSkills = localStorage.getItem('mozza_custom_skills');
    if (savedSkills) setLocalSkills(JSON.parse(savedSkills));
  }, []);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setHeroImage(base64String);
        localStorage.setItem('mozza_profile_img', base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetImage = () => {
    setHeroImage("profile.jpeg");
    localStorage.removeItem('mozza_profile_img');
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const addProject = (project: Project) => {
    const updated = [project, ...localProjects];
    setLocalProjects(updated);
    localStorage.setItem('mozza_custom_projects', JSON.stringify(updated));
  };

  const addExperience = (exp: Experience) => {
    const updated = [exp, ...localExperience];
    setLocalExperience(updated);
    localStorage.setItem('mozza_custom_experience', JSON.stringify(updated));
  };

  const addSkill = (skill: SkillGroup) => {
    const updated = [skill, ...localSkills];
    setLocalSkills(updated);
    localStorage.setItem('mozza_custom_skills', JSON.stringify(updated));
  };

  const deleteProject = (index: number) => {
    const updated = localProjects.filter((_, i) => i !== index);
    setLocalProjects(updated);
    localStorage.setItem('mozza_custom_projects', JSON.stringify(updated));
  };

  const deleteExperience = (index: number) => {
    const updated = localExperience.filter((_, i) => i !== index);
    setLocalExperience(updated);
    localStorage.setItem('mozza_custom_experience', JSON.stringify(updated));
  };

  const deleteSkill = (index: number) => {
    const updated = localSkills.filter((_, i) => i !== index);
    setLocalSkills(updated);
    localStorage.setItem('mozza_custom_skills', JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen relative bg-[#050505] text-zinc-200">
      <ThreeBackground />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-6 glass border-b border-white/5 flex justify-between items-center">
        <div 
          className="text-xl font-black text-white tracking-widest cursor-pointer" 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          MT <span className="text-blue-500 italic">.07</span>
        </div>
        <div className="hidden md:flex gap-8 text-xs font-bold uppercase tracking-widest text-zinc-400">
          <button onClick={() => scrollToSection('about')} className="hover:text-white transition-colors">About</button>
          <button onClick={() => scrollToSection('experience')} className="hover:text-white transition-colors">Experience</button>
          <button onClick={() => scrollToSection('skills')} className="hover:text-white transition-colors">Skills</button>
          <button onClick={() => scrollToSection('projects')} className="hover:text-white transition-colors">Projects</button>
          <button onClick={() => scrollToSection('contact')} className="hover:text-white transition-colors">Contact</button>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsAdminOpen(true)}
            className="p-2 text-zinc-500 hover:text-blue-400 transition-colors"
            title="System Console"
          >
            <Settings size={20} />
          </button>
          <a 
            href={`mailto:${portfolioData.contact.email}`}
            className="px-6 py-2 border border-blue-500/50 text-blue-400 text-xs font-bold uppercase rounded-lg hover:bg-blue-500 hover:text-white transition-all shadow-[0_0_20px_rgba(59,130,246,0.1)]"
          >
            Hire Me
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-44 pb-20 px-6 max-w-7xl mx-auto overflow-hidden">
        <div className="flex flex-col md:flex-row items-center gap-16 relative z-10">
          
          <motion.div className="relative group cursor-pointer" whileHover="hover" initial="initial">
            <motion.div 
              className="w-72 h-72 md:w-[450px] md:h-[450px] relative flex-shrink-0"
              variants={{ initial: { scale: 1 }, hover: { scale: 1.02 } }}
            >
              <motion.div className="absolute inset-0 rounded-[3rem] border-2 border-blue-500/20 -rotate-3 scale-105" variants={{ hover: { borderColor: "rgba(59, 130, 246, 0.6)", rotate: -5, scale: 1.08 } }}></motion.div>
              <motion.div className="absolute inset-0 rounded-[3rem] border-2 border-purple-500/10 rotate-2 scale-105" variants={{ hover: { borderColor: "rgba(168, 85, 247, 0.4)", rotate: 4, scale: 1.08 } }}></motion.div>
              
              <motion.div className="w-full h-full rounded-[2.5rem] overflow-hidden border-4 border-zinc-900 shadow-2xl relative z-10 bg-zinc-900 flex items-center justify-center" variants={{ hover: { boxShadow: "0 0 50px rgba(59, 130, 246, 0.4)" } }}>
                <motion.img 
                  src={heroImage} 
                  alt={portfolioData.name} 
                  className="w-full h-full object-cover block"
                  variants={{ initial: { filter: "brightness(1)" }, hover: { filter: "brightness(1.1) contrast(1.05)" } }}
                  onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=800'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-12 gap-6 z-20">
                  <button onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }} className="p-4 bg-blue-600/90 text-white rounded-2xl shadow-[0_0_20px_rgba(59,130,246,0.5)]"><Camera size={24} /></button>
                  <button onClick={(e) => { e.stopPropagation(); resetImage(); }} className="p-4 bg-zinc-800/90 text-white rounded-2xl"><RefreshCw size={24} /></button>
                </div>
                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
              </motion.div>
              <motion.div className="absolute inset-0 bg-blue-500/10 blur-[120px] -z-10 rounded-full scale-125" variants={{ hover: { backgroundColor: "rgba(59, 130, 246, 0.25)", scale: 1.4 } }}></motion.div>
            </motion.div>
          </motion.div>

          <div className="flex-1 text-center md:text-left">
            <FadeIn>
              <h1 className="text-6xl md:text-[120px] font-black text-white leading-[0.85] tracking-tighter mb-6">
                {portfolioData.name.split(' ')[0]} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-600 to-purple-600">
                  {portfolioData.name.split(' ').slice(1).join(' ')}
                </span>
              </h1>
              <p className="text-xl md:text-3xl text-zinc-400 font-medium mb-12 max-w-2xl leading-tight">
                {portfolioData.headline}
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-6">
                <button onClick={() => scrollToSection('experience')} className="px-12 py-5 bg-white text-black font-black uppercase text-sm rounded-2xl hover:bg-blue-600 hover:text-white transition-all shadow-2xl flex items-center gap-3 group">
                  Explore Work <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <a href={`mailto:${portfolioData.contact.email}`} className="px-12 py-5 bg-zinc-900/80 text-white font-black uppercase text-sm rounded-2xl border border-white/10 hover:border-blue-500 transition-all flex items-center gap-3 backdrop-blur-md">
                  Contact Me <Mail size={20} />
                </a>
              </div>
            </FadeIn>
          </div>
        </div>
      </header>

      <main className="px-6 max-w-7xl mx-auto space-y-40 py-20 relative z-10">
        <section id="about" className="scroll-mt-32">
          <FadeIn>
            <div className="grid md:grid-cols-2 gap-16 items-start">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-3 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-xs font-bold uppercase tracking-widest">
                  <Terminal size={14} /> Professional Intent
                </div>
                <p className="text-2xl md:text-3xl text-zinc-300 leading-snug font-light italic border-l-4 border-blue-500 pl-8 py-2">
                  "{portfolioData.summary}"
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div className="p-6 glass rounded-2xl border border-white/5 shadow-xl">
                    <p className="text-[10px] text-zinc-500 uppercase font-black mb-2 tracking-widest">Certification</p>
                    <p className="text-lg font-bold text-white">BNSP Accredited</p>
                  </div>
                  <div className="p-6 glass rounded-2xl border border-white/5 shadow-xl">
                    <p className="text-[10px] text-zinc-500 uppercase font-black mb-2 tracking-widest">Specialization</p>
                    <p className="text-lg font-bold text-white">AI Integration</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(portfolioData.contact).map(([key, val], idx) => (
                  <div key={idx} className="flex items-center gap-5 p-6 glass rounded-2xl hover:bg-zinc-800/50 transition-all border border-white/5 group">
                    <div className="text-blue-500 group-hover:scale-110 transition-transform">
                      {key === 'email' && <Mail size={24} />}
                      {key === 'phone' && <Phone size={24} />}
                      {key === 'linkedin' && <Linkedin size={24} />}
                      {key === 'location' && <MapPin size={24} />}
                    </div>
                    <div className="overflow-hidden text-sm font-mono text-zinc-300 truncate">{val}</div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </section>

        <section id="experience" className="scroll-mt-32">
          <SectionHeading icon={Briefcase}>Professional Experience</SectionHeading>
          <div className="space-y-16">
            {allExperience.map((exp, idx) => (
              <FadeIn key={idx} delay={idx * 0.1}>
                <div className="group relative pl-8 md:pl-16 border-l-2 border-zinc-800 hover:border-blue-500 transition-colors">
                  <div className="absolute -left-[11px] top-0 w-5 h-5 rounded-full bg-zinc-900 border-2 border-zinc-700 group-hover:bg-blue-500 transition-all"></div>
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-8">
                    <div>
                      <h4 className="text-3xl font-black text-white group-hover:text-blue-400">{exp.role}</h4>
                      <p className="text-blue-500 font-black text-sm uppercase mt-2">{exp.company} • {exp.type}</p>
                    </div>
                    <div className="mt-4 md:mt-0 md:text-right">
                      <p className="text-xs font-black text-blue-500 uppercase tracking-widest mb-1">{exp.period}</p>
                      <p className="text-xs text-zinc-500 font-bold uppercase">{exp.location}</p>
                    </div>
                  </div>
                  <ul className="grid md:grid-cols-2 gap-6">
                    {exp.achievements.map((achievement, aIdx) => (
                      <li key={aIdx} className="text-sm text-zinc-400 flex gap-4 p-4 glass rounded-xl border border-white/5">
                        <ChevronRight size={16} className="text-blue-500 shrink-0 mt-1" />
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        <section id="skills" className="scroll-mt-32">
          <SectionHeading icon={Terminal}>Capability Matrix</SectionHeading>
          <div className="grid md:grid-cols-3 gap-8">
            {allSkills.map((skillGroup, idx) => (
              <FadeIn key={idx} delay={idx * 0.1}>
                <div className="p-10 glass rounded-[2rem] border border-white/5 h-full hover:border-blue-500/30 transition-all group relative overflow-hidden">
                  <h4 className="text-xs font-black text-blue-500 uppercase tracking-[0.3em] mb-8">{skillGroup.category}</h4>
                  <div className="flex flex-wrap gap-3">
                    {skillGroup.items.map((skill, sIdx) => (
                      <span key={sIdx} className="px-4 py-2 bg-zinc-900/50 text-zinc-300 text-xs font-bold uppercase rounded-lg border border-white/5 hover:border-blue-500/20 transition-all">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        <section id="projects" className="scroll-mt-32">
          <SectionHeading icon={Briefcase}>Featured Projects</SectionHeading>
          <div className="grid md:grid-cols-2 gap-8">
            {allProjects.map((project, idx) => (
              <FadeIn key={idx} delay={idx * 0.1}>
                <div className="p-10 glass rounded-[2.5rem] border border-white/5 hover:border-blue-500/30 transition-all group">
                  <div className="flex justify-between items-start mb-6">
                    <h4 className="text-2xl font-black text-white group-hover:text-blue-400 transition-colors">{project.title}</h4>
                    <span className="text-[10px] font-black bg-blue-500/10 text-blue-500 px-3 py-1 rounded-full uppercase">{project.year}</span>
                  </div>
                  <p className="text-sm text-zinc-400 mb-8 leading-relaxed italic">"{project.description}"</p>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech, tIdx) => (
                      <span key={tIdx} className="text-[10px] font-bold text-zinc-500 uppercase tracking-tighter">#{tech}</span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        <section id="contact" className="py-24 border-t border-white/5">
          <FadeIn>
            <div className="text-center max-w-4xl mx-auto space-y-12">
              <h2 className="text-6xl md:text-9xl font-black text-white tracking-tighter leading-none">LET'S WORK.</h2>
              <div className="flex justify-center gap-8 pt-8">
                <a href={`mailto:${portfolioData.contact.email}`} className="w-16 h-16 rounded-2xl glass border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:border-blue-500 transition-all"><Mail size={28} /></a>
                <a href={`https://${portfolioData.contact.linkedin}`} target="_blank" rel="noopener noreferrer" className="w-16 h-16 rounded-2xl glass border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:border-blue-500 transition-all"><Linkedin size={28} /></a>
              </div>
              <p className="text-[10px] text-zinc-600 font-black uppercase tracking-[0.8em] pt-12">© {new Date().getFullYear()} MOZZA BUNGA TARMUJI</p>
            </div>
          </FadeIn>
        </section>
      </main>

      <Chatbot />

      {/* Admin Console Overlay */}
      <AnimatePresence>
        {isAdminOpen && (
          <AdminConsole 
            onClose={() => setIsAdminOpen(false)}
            onAddProject={addProject}
            onAddExperience={addExperience}
            onAddSkill={addSkill}
            localProjects={localProjects}
            localExperience={localExperience}
            localSkills={localSkills}
            onDeleteProject={deleteProject}
            onDeleteExperience={deleteExperience}
            onDeleteSkill={deleteSkill}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// Admin Console Sub-component
const AdminConsole = ({ onClose, onAddProject, onAddExperience, onAddSkill, localProjects, localExperience, localSkills, onDeleteProject, onDeleteExperience, onDeleteSkill }: any) => {
  const [activeTab, setActiveTab] = useState<'project' | 'experience' | 'skill' | 'export'>('project');
  
  // Forms
  const [projectForm, setProjectForm] = useState<Project>({ title: '', description: '', year: new Date().getFullYear().toString(), stack: [], impact: '' });
  const [expForm, setExpForm] = useState<Experience>({ role: '', company: '', period: '', location: '', type: 'Professional', achievements: [] });
  const [skillForm, setSkillForm] = useState<SkillGroup>({ category: '', items: [] });
  
  const [newAchievement, setNewAchievement] = useState('');
  const [newStack, setNewStack] = useState('');
  const [newSkillItem, setNewSkillItem] = useState('');

  const generateCode = () => {
    const data = { 
      experience: localExperience, 
      projects: localProjects, 
      skills: localSkills 
    };
    return JSON.stringify(data, null, 2);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl p-4 md:p-12 overflow-y-auto"
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-4xl font-black text-white tracking-tighter">SYSTEM MANAGEMENT</h2>
            <p className="text-blue-500 font-mono text-xs uppercase tracking-widest mt-1">Admin Console v1.08 // Data Override Active</p>
          </div>
          <button onClick={onClose} className="p-4 bg-zinc-900 rounded-full hover:bg-zinc-800 transition-colors border border-white/5"><X size={24} /></button>
        </div>

        <div className="flex flex-wrap gap-4 mb-8">
          {[
            { id: 'project', icon: Plus, label: 'Add Project' },
            { id: 'experience', icon: Briefcase, label: 'Add Experience' },
            { id: 'skill', icon: Zap, label: 'Add Skill' },
            { id: 'export', icon: Code, label: 'Publish Data' }
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-3 px-6 py-3 rounded-xl font-bold uppercase text-xs tracking-widest transition-all ${activeTab === tab.id ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'bg-zinc-900 text-zinc-400 border border-white/5'}`}
            >
              <tab.icon size={16} /> {tab.label}
            </button>
          ))}
        </div>

        <div className="glass p-8 md:p-12 rounded-[2.5rem] border border-white/5 shadow-2xl">
          {activeTab === 'project' && (
            <div className="space-y-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] font-black text-zinc-500 uppercase mb-2 block">Project Title</label>
                  <input value={projectForm.title} onChange={e => setProjectForm({...projectForm, title: e.target.value})} className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none" placeholder="e.g. AI Marketing Tool" />
                </div>
                <div>
                  <label className="text-[10px] font-black text-zinc-500 uppercase mb-2 block">Year</label>
                  <input value={projectForm.year} onChange={e => setProjectForm({...projectForm, year: e.target.value})} className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none" placeholder="2025" />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-black text-zinc-500 uppercase mb-2 block">Description</label>
                <textarea value={projectForm.description} onChange={e => setProjectForm({...projectForm, description: e.target.value})} className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-white h-32 focus:border-blue-500 outline-none" placeholder="Briefly describe the project..." />
              </div>
              <div>
                <label className="text-[10px] font-black text-zinc-500 uppercase mb-2 block">Tech Stack (press Enter to add)</label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {projectForm.stack.map(s => <span key={s} className="px-3 py-1 bg-blue-500/10 text-blue-500 text-[10px] font-bold rounded uppercase">{s}</span>)}
                </div>
                <input 
                  value={newStack} 
                  onChange={e => setNewStack(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' && newStack.trim()) {
                      setProjectForm({...projectForm, stack: [...projectForm.stack, newStack.trim()]});
                      setNewStack('');
                    }
                  }}
                  className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none" 
                  placeholder="e.g. React, AI Tools..." 
                />
              </div>
              <button onClick={() => { onAddProject(projectForm); onClose(); }} className="w-full py-4 bg-white text-black font-black uppercase text-sm rounded-2xl hover:bg-blue-500 hover:text-white transition-all">Add Project to Portfolio</button>
            </div>
          )}

          {activeTab === 'experience' && (
            <div className="space-y-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] font-black text-zinc-500 uppercase mb-2 block">Role</label>
                  <input value={expForm.role} onChange={e => setExpForm({...expForm, role: e.target.value})} className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none" placeholder="Staff Administrasi" />
                </div>
                <div>
                  <label className="text-[10px] font-black text-zinc-500 uppercase mb-2 block">Company</label>
                  <input value={expForm.company} onChange={e => setExpForm({...expForm, company: e.target.value})} className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none" placeholder="PT Company Name" />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] font-black text-zinc-500 uppercase mb-2 block">Period</label>
                  <input value={expForm.period} onChange={e => setExpForm({...expForm, period: e.target.value})} className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none" placeholder="Jan 2024 - Dec 2024" />
                </div>
                <div>
                  <label className="text-[10px] font-black text-zinc-500 uppercase mb-2 block">Location</label>
                  <input value={expForm.location} onChange={e => setExpForm({...expForm, location: e.target.value})} className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none" placeholder="Karawang, Indonesia" />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-black text-zinc-500 uppercase mb-2 block">Achievements (press Enter to add)</label>
                <div className="space-y-2 mb-4">
                  {expForm.achievements.map((a, i) => (
                    <div key={i} className="flex gap-3 text-sm text-zinc-400 bg-white/5 p-3 rounded-lg border border-white/5">
                      <ChevronRight size={16} className="text-blue-500 shrink-0 mt-0.5" /> {a}
                    </div>
                  ))}
                </div>
                <input 
                  value={newAchievement} 
                  onChange={e => setNewAchievement(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' && newAchievement.trim()) {
                      setExpForm({...expForm, achievements: [...expForm.achievements, newAchievement.trim()]});
                      setNewAchievement('');
                    }
                  }}
                  className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none" 
                  placeholder="e.g. Managed 50+ documents daily..." 
                />
              </div>
              <button onClick={() => { onAddExperience(expForm); onClose(); }} className="w-full py-4 bg-white text-black font-black uppercase text-sm rounded-2xl hover:bg-blue-500 hover:text-white transition-all">Add Experience to Portfolio</button>
            </div>
          )}

          {activeTab === 'skill' && (
            <div className="space-y-8">
              <div>
                <label className="text-[10px] font-black text-zinc-500 uppercase mb-2 block">Skill Category</label>
                <input 
                  value={skillForm.category} 
                  onChange={e => setSkillForm({...skillForm, category: e.target.value})} 
                  className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none" 
                  placeholder="e.g. Design Tools, Cloud Services..." 
                />
              </div>
              <div>
                <label className="text-[10px] font-black text-zinc-500 uppercase mb-2 block">Skills / Items (press Enter to add)</label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {skillForm.items.map(s => <span key={s} className="px-3 py-1 bg-blue-500/10 text-blue-500 text-[10px] font-bold rounded uppercase">{s}</span>)}
                </div>
                <input 
                  value={newSkillItem} 
                  onChange={e => setNewSkillItem(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' && newSkillItem.trim()) {
                      setSkillForm({...skillForm, items: [...skillForm.items, newSkillItem.trim()]});
                      setNewSkillItem('');
                    }
                  }}
                  className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none" 
                  placeholder="e.g. Photoshop, AWS, Figma..." 
                />
              </div>
              <button onClick={() => { onAddSkill(skillForm); onClose(); }} className="w-full py-4 bg-white text-black font-black uppercase text-sm rounded-2xl hover:bg-blue-500 hover:text-white transition-all">Add Skill Group to Portfolio</button>
            </div>
          )}

          {activeTab === 'export' && (
            <div className="space-y-8">
              <div className="p-6 bg-blue-500/10 border border-blue-500/20 rounded-2xl">
                <h4 className="text-white font-bold mb-2">How to Publish Permanently?</h4>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  The data you add here is only visible to you. To make it permanent for all visitors, copy the code below and paste it into your <code className="text-blue-400">data/portfolioData.ts</code> file.
                </p>
              </div>
              <div className="relative">
                <pre className="w-full bg-black/50 border border-white/10 rounded-2xl p-6 text-[10px] font-mono text-blue-300 overflow-x-auto h-64">
                  {generateCode()}
                </pre>
                <button 
                  onClick={() => { navigator.clipboard.writeText(generateCode()); alert('Code copied to clipboard!'); }}
                  className="absolute top-4 right-4 p-3 bg-zinc-800 rounded-xl hover:bg-blue-600 transition-all border border-white/10 text-white"
                >
                  <Save size={18} />
                </button>
              </div>
              
              <div className="space-y-4">
                <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Local Session Data</h4>
                <div className="grid gap-4 max-h-64 overflow-y-auto pr-2">
                  {localExperience.map((e, i) => (
                    <div key={i} className="flex justify-between items-center p-4 bg-zinc-900 border border-white/5 rounded-xl">
                      <div className="text-xs font-bold text-zinc-300">Experience: {e.role} @ {e.company}</div>
                      <button onClick={() => onDeleteExperience(i)} className="text-red-500 hover:text-red-400 p-2"><Trash2 size={16} /></button>
                    </div>
                  ))}
                  {localProjects.map((p, i) => (
                    <div key={i} className="flex justify-between items-center p-4 bg-zinc-900 border border-white/5 rounded-xl">
                      <div className="text-xs font-bold text-zinc-300">Project: {p.title}</div>
                      <button onClick={() => onDeleteProject(i)} className="text-red-500 hover:text-red-400 p-2"><Trash2 size={16} /></button>
                    </div>
                  ))}
                  {localSkills.map((s, i) => (
                    <div key={i} className="flex justify-between items-center p-4 bg-zinc-900 border border-white/5 rounded-xl">
                      <div className="text-xs font-bold text-zinc-300">Skill Category: {s.category}</div>
                      <button onClick={() => onDeleteSkill(i)} className="text-red-500 hover:text-red-400 p-2"><Trash2 size={16} /></button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default App;
