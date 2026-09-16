import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [formStatus, setFormStatus] = useState('');

  // Efek memantau scroll untuk navbar active state
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'education', 'skills', 'portfolio', 'experience', 'contact'];
      const scrollPosition = window.scrollY + 200;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDownloadCV = () => {
    const cvContent = `========================================\nADITYA NUR ARIF - CURRICULUM VITAE\n========================================\nRole: Web Developer & UI/UX Designer\nInstitution: SMK Telkom Purwokerto\nTech Stack: HTML, CSS, JS, Python, PHP, Laravel, Figma, GDevelop\n========================================`;
    const element = document.createElement("a");
    const file = new Blob([cvContent], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "CV_Aditya_Nur_Arif_Official.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormStatus('Pesan berhasil terkirim! Terima kasih.');
    setTimeout(() => setFormStatus(''), 5000);
  };

  return (
    <div className="bg-[#030712] text-slate-100 font-sans min-h-screen selection:bg-cyan-500 selection:text-slate-950 overflow-x-hidden relative">
      
      {/* AMBIENT BACKGROUND GLOW LIGHTS (Biar warnanya mewah bernuansa modern studio) */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-1/3 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[160px] pointer-events-none"></div>

      {/* NAVBAR */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 w-full z-50 bg-[#030712]/80 backdrop-blur-xl border-b border-slate-800/80 shadow-2xl shadow-cyan-950/20"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
          <motion.a 
            href="#home" 
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-slate-950 text-base shadow-lg shadow-cyan-500/30 group-hover:rotate-6 transition-transform">
              A
            </div>
            <span className="font-extrabold text-xl text-white tracking-tight">
              Aditya<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">.Dev.</span>
            </span>
          </motion.a>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center space-x-1 bg-slate-900/60 border border-slate-800 px-4 py-1.5 rounded-full shadow-inner">
            {['Home', 'About', 'Education', 'Skills', 'Portfolio', 'Experience', 'Contact'].map((item) => {
              const sectionId = item.toLowerCase();
              const isActive = activeSection === sectionId;
              return (
                <a 
                  key={item} 
                  href={`#${sectionId}`} 
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 relative ${
                    isActive ? 'text-white bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 shadow-sm' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  {item}
                </a>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center">
            <motion.a 
              href="#contact" 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/25 transition-all"
            >
              Hubungi Saya
            </motion.a>
          </div>

          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className="lg:hidden text-slate-300 p-2 rounded-lg bg-slate-900 border border-slate-800"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-[#030712]/95 border-b border-slate-800 px-6 py-6 space-y-3"
            >
              {['Home', 'About', 'Education', 'Skills', 'Portfolio', 'Experience', 'Contact'].map((item) => (
                <a 
                  key={item} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  href={`#${item.toLowerCase()}`} 
                  className="block text-slate-300 hover:text-cyan-400 font-medium py-2 border-b border-slate-900 text-sm"
                >
                  {item}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* HERO SECTION */}
      <section id="home" className="pt-36 pb-20 max-w-7xl mx-auto px-6 lg:px-8 min-h-screen flex items-center relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
          
          <motion.div 
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="lg:col-span-7 space-y-6"
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 shadow-inner"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
              <span className="text-xs font-bold tracking-wide text-cyan-300">Available for Projects & Collaboration</span>
            </motion.div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] text-white">
              Crafting <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500 drop-shadow-sm">Digital</span> <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500">Solution</span> & Creative <br />
              Game.
            </h1>

            <p className="text-slate-400 text-base lg:text-lg leading-relaxed max-w-xl font-normal">
              Halo, saya <strong className="text-white font-semibold">Aditya Nur Arif</strong>. Seorang Web Developer & UI/UX Designer yang memadukan logika pemrograman dengan estetika visual tingkat tinggi.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <motion.button 
                onClick={handleDownloadCV} 
                whileHover={{ scale: 1.05, boxShadow: "0px 0px 25px rgba(6, 182, 212, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="px-7 py-3.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-extrabold text-sm tracking-wide transition-all flex items-center gap-2.5 shadow-xl shadow-cyan-500/20"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                Download CV
              </motion.button>
              
              <motion.a 
                href="#portfolio" 
                whileHover={{ scale: 1.05, backgroundColor: "rgba(30, 41, 59, 0.7)" }}
                whileTap={{ scale: 0.95 }}
                className="px-7 py-3.5 rounded-full bg-slate-900/80 border border-slate-700/80 hover:border-cyan-500/50 text-white font-bold text-sm tracking-wide transition-all flex items-center gap-2.5 shadow-md"
              >
                <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                Lihat Karya
              </motion.a>
            </div>
          </motion.div>

          {/* Hero Card Code Showcase */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="w-full max-w-md bg-gradient-to-b from-slate-900/90 to-[#070d1d] border border-slate-800/80 rounded-3xl p-8 shadow-2xl shadow-cyan-950/40 relative overflow-hidden group">
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl group-hover:bg-cyan-500/30 transition-all duration-500"></div>
              
              <div className="flex flex-col items-center text-center relative z-10">
                {/* Ganti bagian kotak "AA" dengan tag img ini */}
                <motion.div 
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className="w-28 h-28 rounded-3xl overflow-hidden mb-6 shadow-xl shadow-cyan-500/30 border-2 border-cyan-400/40 relative group"
>
                <img 
                src="/profile.png"  // <-- Ganti dengan nama file foto kamu di folder public
                alt="Aditya Nur Arif" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                </motion.div>
                
                <h3 className="text-2xl font-extrabold text-white tracking-tight">Aditya Nur Arif</h3>
                <p className="text-xs font-bold uppercase tracking-widest text-cyan-400 mt-1 mb-6">Web Dev & UI/UX Designer</p>

                <div className="w-full bg-slate-950/90 rounded-2xl p-5 text-left font-mono text-xs border border-slate-800/80 shadow-inner group-hover:border-cyan-500/30 transition-colors">
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-[10px] text-slate-500">
                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-500"></span><span className="w-2 h-2 rounded-full bg-yellow-500"></span><span className="w-2 h-2 rounded-full bg-green-500"></span> stack.js</span>
                    <span className="text-cyan-400 font-semibold">Active</span>
                  </div>
                  <div className="text-pink-400 font-semibold">const <span className="text-white">stack</span> = [</div>
                  <div className="pl-5 text-amber-300 py-0.5">'JavaScript', 'Python', 'PHP',</div>
                  <div className="pl-5 text-amber-300 py-0.5">'Figma', 'GDevelop', 'Laravel'</div>
                  <div className="text-white font-semibold">];</div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ABOUT ME SECTION */}
      <section id="about" className="py-28 bg-slate-950/40 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-black text-cyan-400 tracking-[0.2em] uppercase mb-3 flex items-center gap-2"
          >
            <span className="w-8 h-0.5 bg-cyan-400"></span> PROFILE PRIBADI
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-6"
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Logika, Kreativitas & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Keseimbangan</span>
              </h2>
              <p className="text-slate-300 text-base lg:text-lg leading-relaxed font-light">
                Saya sangat antusias dalam merancang antarmuka visual yang indah sekaligus membangun sistem backend yang fungsional. Mulai dari merangkai baris kode hingga mendesain prototype, saya selalu menikmati proses menciptakan karya digital.
              </p>
              <p className="text-slate-400 text-sm lg:text-base leading-relaxed">
                Di luar dunia IT, saya memegang teguh nilai kepemimpinan dan budaya. Saya aktif di berbagai organisasi seperti Majelis Perwakilan Kelas (MPK), Pramuka, Paskibraka, serta ditunjuk sebagai Brand Ambassador sekolah.
              </p>

              <div className="pt-4">
                <h4 className="text-xs font-bold tracking-wider text-slate-400 uppercase mb-4">Hobi & Minat di Luar Kode:</h4>
                <div className="flex flex-wrap gap-3">
                  {['⚽ Sepak Bola & Futsal', '🪘 Kesenian Kentongan', '🏃 Jogging & Sport'].map((hobby, i) => (
                    <motion.div 
                      key={hobby}
                      whileHover={{ scale: 1.08, y: -3 }}
                      className="px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-200 flex items-center gap-2 shadow-md hover:border-cyan-500/40 transition-all cursor-default"
                    >
                      {hobby}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 space-y-5"
            >
              {[
                { 
                  title: "Tech Enthusiast", 
                  desc: "Mengeksplorasi bahasa pemrograman, framework modern, serta engine game interaktif terbaru.", 
                  icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" 
                },
                { 
                  title: "Leadership & Public Speaking", 
                  desc: "Berpengalaman memimpin organisasi besar, kegiatan formal, dan komunikasi publik instansi.", 
                  icon: "M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" 
                }
              ].map((card, i) => (
                <motion.div 
                  key={card.title}
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="bg-gradient-to-r from-slate-900/90 to-slate-950 border border-slate-800/80 rounded-2xl p-6 flex gap-5 items-start shadow-xl hover:border-cyan-500/40 transition-all duration-300"
                >
                  <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={card.icon}/></svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">{card.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{card.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* EDUCATION SECTION */}
      <section id="education" className="py-28 relative">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-xs font-black text-cyan-400 tracking-[0.2em] uppercase">LATAR BELAKANG SEKOLAH</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 mb-12">Pendidikan Formal</h2>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.01 }}
            className="bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-[#070d1d] border border-slate-800/80 rounded-3xl p-8 sm:p-10 text-left shadow-2xl relative overflow-hidden group hover:border-cyan-500/40 transition-all duration-500"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 pb-6 border-b border-slate-800/80">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-2xl text-cyan-400 border border-cyan-500/30 shadow-inner">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /></svg>
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white tracking-tight">SMK Telkom Purwokerto</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Purwokerto, Jawa Tengah</p>
                </div>
              </div>
              <span className="px-5 py-2 rounded-full bg-cyan-500/10 text-cyan-300 text-xs font-bold tracking-wide border border-cyan-500/30 shadow-sm">
                Rekayasa Perangkat Lunak (RPL)
              </span>
            </div>
            
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
              Fokus mendalam pada pengembangan perangkat lunak, pemrograman web interaktif, manajemen basis data, desain UI/UX, serta logika algoritma tingkat lanjut. Aktif dalam organisasi sekolah serta kegiatan kepemimpinan dan minat seni budaya.
            </p>
          </motion.div>
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section id="skills" className="py-28 bg-slate-950/40 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-xs font-black text-cyan-400 tracking-[0.2em] uppercase">KEAHLIAN UTAMA</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 mb-16">Tech Stack & Tools</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {[
              {
                title: "Programming & Web",
                desc: "Mengembangkan aplikasi web dan logika sistem berskala modern dengan performa tinggi.",
                icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
                tags: ['HTML & CSS', 'JavaScript', 'PHP', 'Python', 'C#', 'Laravel', 'MySQL']
              },
              {
                title: "Design & Visual",
                desc: "Merancang UI/UX interaktif, wireframing, layout, hingga identitas visual branding yang elegan.",
                icon: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01",
                tags: ['Figma', 'Canva', 'Adobe Illustrator', 'Wireframing', 'Prototyping']
              },
              {
                title: "Game Dev & Tools",
                desc: "Mengembangkan game 2D seru dan memanfaatkan alur kerja developer secara efisien.",
                icon: "M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 002 2h14a2 2 0 002-2V7a2 2 0 00-2-2H5z",
                tags: ['GDevelop', 'Git & GitHub', 'VS Code', 'XAMPP', 'Composer']
              }
            ].map((skill, index) => (
              <motion.div 
                key={skill.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                whileHover={{ y: -8 }}
                className="bg-gradient-to-b from-slate-900/90 to-[#070d1d] border border-slate-800/80 rounded-3xl p-8 hover:border-cyan-500/50 shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={skill.icon}/></svg>
                  </div>
                  <h3 className="text-xl font-extrabold text-white mb-3">{skill.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-400 mb-8 leading-relaxed">{skill.desc}</p>
                </div>
                
                <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-800/60">
                  {skill.tags.map(t => (
                    <span key={t} className="px-3 py-1 bg-slate-950 border border-slate-800 rounded-lg text-[11px] font-semibold text-slate-300">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO SECTION */}
      <section id="portfolio" className="py-28 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4"
          >
            <div>
              <span className="text-xs font-black text-cyan-400 tracking-[0.2em] uppercase">HASIL KARYA</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">Project Terpilih</h2>
            </div>
            <p className="text-slate-400 max-w-md text-xs sm:text-sm leading-relaxed">
              Kumpulan proyek web development, desain UI/UX, game interaktif, dan branding visual yang telah saya rancang dan kembangkan.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { 
                title: "Bar Bar Es Duren", 
                type: "Web App E-Commerce", 
                desc: "Aplikasi web e-commerce berbasis Laravel lengkap dengan integrasi gateway pembayaran Midtrans untuk sistem checkout pesanan secara mulus.", 
                tags: ["Laravel", "Midtrans", "MySQL"], 
                badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
                accentStyle: "text-amber-400 text-3xl" 
              },
              { 
                title: "PPDB SMK Telkom", 
                type: "Web Application", 
                desc: "Desain dan antarmuka web Penerimaan Peserta Didik Baru (PPDB) interaktif lengkap dengan formulir pendaftaran multi-step sistem verifikasi.", 
                tags: ["HTML5", "Tailwind CSS", "JavaScript"], 
                badgeColor: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
                accentStyle: "text-cyan-400 text-2xl" 
              },
              { 
                title: "GDevelop Game", 
                type: "Interactive Game", 
                desc: "Game 2D seru yang dikembangkan menggunakan GDevelop, dilengkapi mekanika permainan interaktif, grafis kustom, dan sistem skoring.", 
                tags: ["GDevelop Engine", "Game Design"], 
                badgeColor: "bg-purple-500/20 text-purple-300 border-purple-500/30",
                accentStyle: "text-purple-400 text-2xl" 
              },
              { 
                title: "Prime Atelier Hair Tonic", 
                type: "Visual Branding", 
                desc: "Perancangan identitas produk, kemasan box, cetak label stiker, serta konsep visual marketing branding yang profesional untuk produk Prime Atelier.", 
                tags: ["Figma", "Illustrator", "Branding"], 
                badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
                accentStyle: "text-emerald-400 text-2xl" 
              }
            ].map((project, index) => (
              <motion.div 
                key={project.title}
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                whileHover={{ y: -10 }}
                className="bg-gradient-to-b from-slate-900/90 to-[#070d1d] rounded-3xl overflow-hidden border border-slate-800/80 hover:border-cyan-500/50 transition-all shadow-xl group cursor-pointer flex flex-col justify-between"
              >
                <div className="h-60 bg-slate-950 relative flex justify-center items-center overflow-hidden border-b border-slate-800/60">
                   <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80 z-10"></div>
                   
                   {/* Background Glow Ornament */}
                   <div className="absolute w-40 h-40 bg-cyan-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                   
                   <div className={`text-center font-black tracking-wider relative z-20 ${project.accentStyle} drop-shadow-lg`}>
                     {project.title.toUpperCase()}
                   </div>
                   
                   <span className={`absolute top-4 right-4 px-3.5 py-1 rounded-full text-[11px] font-bold border z-30 shadow-sm ${project.badgeColor}`}>
                     {project.type}
                   </span>
                </div>
                
                <div className="p-8 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="text-2xl font-black text-white mb-3 group-hover:text-cyan-400 transition-colors">{project.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-400 mb-6 leading-relaxed font-light">{project.desc}</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-800/80">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-slate-950 border border-slate-800/80 rounded-lg text-xs font-medium text-cyan-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE SECTION */}
      <section id="experience" className="py-28 bg-slate-950/40 relative">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-xs font-black text-cyan-400 tracking-[0.2em] uppercase">REKAM JEJAK ORGANISASI</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">Pengalaman & Kepemimpinan</h2>
          </motion.div>

          <div className="space-y-6 relative border-l-2 border-cyan-500/30 ml-4 md:ml-8 pl-6 md:pl-10">
            {[
              { 
                title: "Wakil Ketua Majelis Perwakilan Kelas (MPK)", 
                inst: "SMK Telkom Purwokerto", 
                desc: "Mengoordinasikan pengawasan program kerja OSIS, menampung serta merealisasikan aspirasi siswa, serta menyusun pengumuman resmi dan agenda strategis sekolah." 
              },
              { 
                title: "Brand Ambassador Sekolah", 
                inst: "SMK Telkom Purwokerto", 
                desc: "Mewakili institusi dalam public speaking, pembuatan konten promosi kreatif, serta mempresentasikan keunggulan sekolah kepada calon siswa baru dan masyarakat luas." 
              },
              { 
                title: "Anggota Aktif Paskibraka (Pastema) & Pramuka", 
                inst: "SMK Telkom Purwokerto", 
                desc: "Melatih kedisiplinan tingkat tinggi, kerjasama tim yang solid, serta kepemimpinan lapangan dalam berbagai kegiatan upacara resmi kenegaraan dan perkemahan." 
              }
            ].map((exp, index) => (
              <motion.div 
                key={exp.title}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                className="relative bg-gradient-to-br from-slate-900/90 to-[#070d1d] border border-slate-800/80 rounded-2xl p-7 shadow-xl hover:border-cyan-500/40 transition-all duration-300 group"
              >
                {/* Dot indicator on timeline */}
                <div className="absolute -left-[31px] md:-left-[47px] top-8 w-4 h-4 rounded-full bg-cyan-400 border-4 border-slate-950 shadow-md group-hover:scale-125 transition-transform"></div>

                <h3 className="text-lg sm:text-xl font-black text-white group-hover:text-cyan-400 transition-colors">{exp.title}</h3>
                <p className="text-xs font-bold tracking-wider text-cyan-400 uppercase mt-1 mb-3">{exp.inst}</p>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light">{exp.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-28 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-6"
          >
            <div>
              <span className="text-xs font-black text-cyan-400 tracking-[0.2em] uppercase">MARI TERHUBUNG</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 mb-4">Mari Berdiskusi & Bekerja Sama</h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                Punya ide proyek menarik, butuh bantuan pengembangan website, atau sekadar ingin berdiskusi seputar teknologi dan desain? Jangan ragu untuk mengirimkan pesan!
              </p>
            </div>
            
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-md">
                <div className="p-3 bg-cyan-500/10 rounded-xl text-cyan-400 border border-cyan-500/20">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Lokasi</h4>
                  <p className="text-sm font-semibold text-white">Banyumas, Jawa Tengah, Indonesia</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-md">
                <div className="p-3 bg-cyan-500/10 rounded-xl text-cyan-400 border border-cyan-500/20">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Email Kontak</h4>
                  <p className="text-sm font-semibold text-white">adityanurarif9@gmail.com</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 bg-gradient-to-br from-slate-900/90 via-slate-900/70 to-[#070d1d] p-8 sm:p-10 rounded-3xl border border-slate-800/80 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <form onSubmit={handleFormSubmit} className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-300">Nama Lengkap</label>
                  <input required type="text" placeholder="Masukkan nama Anda" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all shadow-inner" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-300">Alamat Email</label>
                  <input required type="email" placeholder="nama@email.com" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all shadow-inner" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300">Subjek Pesan</label>
                <input required type="text" placeholder="Topik diskusi atau penawaran proyek" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all shadow-inner" />
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300">Pesan Anda</label>
                <textarea required rows="4" placeholder="Tuliskan detail pesan atau kolaborasi di sini..." className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all shadow-inner resize-none"></textarea>
              </div>

              {formStatus && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold text-center">
                  {formStatus}
                </motion.div>
              )}

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit" 
                className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black text-xs uppercase tracking-widest shadow-lg shadow-cyan-500/25 transition-all"
              >
                Kirim Pesan Sekarang
              </motion.button>
            </form>
          </motion.div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 bg-slate-950 border-t border-slate-800 text-center relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">© 2026 Aditya Nur Arif. All rights reserved.</p>
          <div className="flex items-center gap-6 text-xs text-slate-400">
            <a href="#home" className="hover:text-cyan-400 transition-colors">Privacy Policy</a>
            <a href="#home" className="hover:text-cyan-400 transition-colors">Terms of Service</a>
            <a href="#contact" className="hover:text-cyan-400 transition-colors">Support</a>
          </div>
        </div>
      </footer>

    </div>
  );
}