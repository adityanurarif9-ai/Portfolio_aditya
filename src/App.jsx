import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [formStatus, setFormStatus] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);

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

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormStatus('Pesan berhasil terkirim! Terima kasih.');
    setTimeout(() => setFormStatus(''), 5000);
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="bg-[#030712] text-slate-100 font-sans min-h-screen selection:bg-cyan-500 selection:text-slate-950 overflow-x-hidden relative">
      
      {/* BACKGROUND AMBIENT LIGHTS */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-10 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px]"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-[150px]"></div>
      </div>

      {/* NAVBAR */}
      <header className="fixed top-0 left-0 w-full z-50 bg-[#030712]/85 backdrop-blur-md border-b border-slate-800/60">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-slate-950 text-sm shadow-lg shadow-cyan-500/20">
              A
            </div>
            <span className="font-bold text-lg tracking-tight text-white">
              Aditya<span className="text-cyan-400">.Dev</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-1 bg-slate-900/50 border border-slate-800/80 px-3 py-1 rounded-full">
            {['Home', 'About', 'Skills', 'Portfolio', 'Experience', 'Contact'].map((item) => {
              const sectionId = item.toLowerCase();
              const isActive = activeSection === sectionId;
              return (
                <a 
                  key={item} 
                  href={`#${sectionId}`} 
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    isActive ? 'text-white bg-cyan-500/20 border border-cyan-500/30' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {item}
                </a>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center">
            <a 
              href="#contact" 
              className="px-5 py-2 rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-cyan-500/20"
            >
              Kontak
            </a>
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

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-[#030712] border-b border-slate-800 px-6 py-4 space-y-2"
            >
              {['Home', 'About', 'Education', 'Skills', 'Portfolio', 'Experience', 'Contact'].map((item) => (
                <a 
                  key={item} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  href={`#${item.toLowerCase()}`} 
                  className="block text-slate-300 hover:text-cyan-400 py-1.5 text-sm font-medium"
                >
                  {item}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* HERO SECTION */}
      <section id="home" className="pt-32 pb-20 max-w-7xl mx-auto px-6 min-h-screen flex items-center relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
              <span className="text-xs font-semibold text-cyan-300">Available for Projects & Collaboration</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight text-white">
              Crafting <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Digital Solutions</span> & Creative Games.
            </h1>

            <p className="text-slate-400 text-base leading-relaxed max-w-xl">
              Halo, saya <strong className="text-white font-medium">Aditya Nur Arif</strong>. Seorang Web Developer & UI/UX Designer yang memadukan logika pemrograman dengan estetika visual.
            </p>
            
            <p className="text-slate-500 italic text-sm border-l-2 border-cyan-400 pl-3">
              "Banggalah dengan siapa dirimu, jangan malu cara orang lain melihatmu."
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a 
                href="/cv_aditya.pdf" 
                download="CV_Aditya_Nur_Arif.pdf"
                className="px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg shadow-cyan-500/20 hover:opacity-90 hover:scale-105 active:scale-95"
              >
                Download CV
              </a>
              <a 
                href="#portfolio" 
                className="px-6 py-3 rounded-full bg-slate-900 border border-slate-700 hover:border-cyan-500/50 text-white font-bold text-xs uppercase tracking-wider transition-all hover:scale-105 active:scale-95"
              >
                Lihat Karya
              </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="w-full max-w-sm bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-2xl relative hover:border-cyan-500/40 transition-all duration-300">
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-2xl overflow-hidden mb-4 border border-cyan-400/30 shadow-md">
                  <img src="/profile.png" alt="Aditya Nur Arif" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-xl font-bold text-white">Aditya Nur Arif</h3>
                <p className="text-xs font-semibold text-cyan-400 mt-0.5 mb-5">Web Dev & UI/UX Designer</p>

                <div className="w-full bg-slate-950 rounded-xl p-4 text-left font-mono text-xs border border-slate-800/80">
                  <div className="text-pink-400">const <span className="text-white">stack</span> = [</div>
                  <div className="pl-4 text-amber-300">'JavaScript', 'PHP', 'Laravel', 'Figma'</div>
                  <div className="text-white">];</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ABOUT ME SECTION */}
      <section id="about" className="py-24 bg-slate-950/40 relative z-10 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <span className="text-xs font-bold text-cyan-400 tracking-widest uppercase mb-2 block">TENTANG SAYA</span>
            <h2 className="text-3xl font-extrabold text-white mb-8">Logika, Kreativitas & Keseimbangan</h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
              className="lg:col-span-7 space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed"
            >
              <p>
                Saya antusias dalam merancang antarmuka visual yang fungsional sekaligus membangun sistem backend yang andal. Mulai dari baris kode hingga prototype desain, saya menikmati setiap proses pembuatan aplikasi.
              </p>
              <p className="text-slate-400">
                Aktif dalam berbagai organisasi seperti Majelis Perwakilan Kelas (MPK), Pramuka, Paskibraka, serta dipercaya sebagai Brand Ambassador sekolah.
              </p>
              <div className="pt-4">
                <h4 className="text-xs font-bold uppercase text-slate-400 mb-3">Minat & Hobi:</h4>
                <div className="flex flex-wrap gap-2">
                  {['⚽ Sepak Bola & Futsal', '🪘 Kesenian Kentongan', '🏃 Jogging'].map((hobby) => (
                    <span key={hobby} className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-medium text-slate-200 hover:border-cyan-500/40 transition-all">
                      {hobby}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
              className="lg:col-span-5 space-y-4"
            >
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 hover:border-cyan-500/40 transition-all">
                <h4 className="font-bold text-white mb-1">Tech Enthusiast</h4>
                <p className="text-xs text-slate-400">Mengeksplorasi framework modern, bahasa pemrograman, dan engine game interaktif.</p>
              </div>
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 hover:border-cyan-500/40 transition-all">
                <h4 className="font-bold text-white mb-1">Leadership & Public Speaking</h4>
                <p className="text-xs text-slate-400">Berpengalaman memimpin organisasi, memegang acara formal, dan komunikasi publik.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* EDUCATION SECTION */}
      <section id="education" className="py-24 relative z-10">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-12">
            <span className="text-xs font-bold text-cyan-400 tracking-widest uppercase">PENDIDIKAN</span>
            <h2 className="text-3xl font-extrabold text-white mt-1">Latar Belakang Sekolah</h2>
          </motion.div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
            className="bg-slate-950 border border-slate-800/80 rounded-3xl p-8 shadow-xl hover:border-cyan-500/40 transition-all"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-xl font-bold text-white">SMK Telkom Purwokerto</h3>
                <p className="text-xs text-slate-400">Purwokerto, Jawa Tengah</p>
              </div>
              <span className="px-4 py-1.5 rounded-full bg-cyan-500/10 text-cyan-300 text-xs font-semibold border border-cyan-500/30">
                Rekayasa Perangkat Lunak (RPL)
              </span>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              Fokus mendalam pada pengembangan web, manajemen basis data, desain UI/UX, serta logika pemrograman berorientasi objek.
            </p>
          </motion.div>
        </div>
      </section>

    {/* SKILLS SECTION (MARQUEE ANIMATION & CLEAN LOGOS) */}
      <section id="skills" className="py-24 bg-slate-950/40 relative z-10 border-t border-slate-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center mb-12">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <span className="text-xs font-bold text-cyan-400 tracking-widest uppercase">KEAHLIAN</span>
            <h2 className="text-3xl font-extrabold text-white mt-1">Tech Stack & Tools</h2>
          </motion.div>
        </div>

        {/* Marquee Container */}
        <div className="relative w-full overflow-hidden flex flex-col gap-6">
          
          {/* Gradient Blur di Pinggir */}
          <div className="absolute left-0 inset-y-0 w-24 bg-gradient-to-r from-[#030712] to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 inset-y-0 w-24 bg-gradient-to-l from-[#030712] to-transparent z-10 pointer-events-none"></div>

          {/* Baris 1: Berjalan ke Kiri */}
          <div className="flex overflow-hidden whitespace-nowrap">
            <motion.div 
              animate={{ x: ["0%", "-50%"] }} 
              transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
              className="flex gap-6 items-center shrink-0 pr-6"
            >
              {[
                { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
                { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
                { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
                { name: "PHP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" },
                { name: "Laravel", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg" },
                { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
                { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
                { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
                // Duplikasi untuk looping mulus
                { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
                { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
                { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
                { name: "PHP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" },
                { name: "Laravel", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg" },
                { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
                { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
                { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
              ].map((tech, idx) => (
                <div key={idx} className="flex items-center gap-3.5 bg-slate-900/90 border border-slate-800/80 hover:border-cyan-500/50 px-6 py-3.5 rounded-2xl shadow-xl transition-all">
                  <img src={tech.icon} alt={tech.name} className="w-7 h-7 object-contain drop-shadow" />
                  <span className="text-sm font-semibold text-slate-200 tracking-wide">{tech.name}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Baris 2: Berjalan ke Kanan */}
          <div className="flex overflow-hidden whitespace-nowrap">
            <motion.div 
              animate={{ x: ["-50%", "0%"] }} 
              transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
              className="flex gap-6 items-center shrink-0 pr-6"
            >
              {[
                { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
                { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
                // Menggunakan logo GitHub putih terang agar jelas di background gelap
                { name: "GitHub", icon: "https://api.iconify.design/logos:github-icon.svg" },
                { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
                { name: "XAMPP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apache/apache-original.svg" },
                { name: "Canva", icon: "https://www.vectorlogo.zone/logos/canva/canva-icon.svg" },
                { name: "Tailwind CSS", icon: "https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg" },
                { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
                // Duplikasi untuk looping mulus
                { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
                { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
                { name: "GitHub", icon: "https://api.iconify.design/logos:github-icon.svg" },
                { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
                { name: "XAMPP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apache/apache-original.svg" },
                { name: "Canva", icon: "https://www.vectorlogo.zone/logos/canva/canva-icon.svg" },
                { name: "Tailwind CSS", icon: "https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg" },
                { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
              ].map((tech, idx) => (
                <div key={idx} className="flex items-center gap-3.5 bg-slate-900/90 border border-slate-800/80 hover:border-cyan-500/50 px-6 py-3.5 rounded-2xl shadow-xl transition-all">
                  <img src={tech.icon} alt={tech.name} className="w-7 h-7 object-contain drop-shadow" />
                  <span className="text-sm font-semibold text-slate-200 tracking-wide">{tech.name}</span>
                </div>
              ))}
            </motion.div>
          </div>

        </div>
      </section>

      {/* PORTFOLIO SECTION (DENGAN IMAGE & ANIMASI) */}
      <section id="portfolio" className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div>
              <span className="text-xs font-bold text-cyan-400 tracking-widest uppercase">PORTOFOLIO</span>
              <h2 className="text-3xl font-extrabold text-white mt-1">Project Terpilih</h2>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm">Klik salah satu kartu untuk melihat detail informasi project.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { 
                title: "Bar Bar Es Duren", 
                type: "Web App E-Commerce", 
                desc: "Aplikasi web e-commerce berbasis Laravel lengkap dengan integrasi gateway pembayaran Midtrans.", 
                tags: ["Laravel", "Midtrans", "MySQL"], 
                badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
                image: "/es-duren.png",
                details: "Platform e-commerce kuliner untuk pemesanan es duren online. Dilengkapi keranjang belanja dinamis, admin panel, database relasional MySQL, dan integrasi Midtrans Payment Gateway."
              },
              { 
                title: "PPDB SMK Telkom", 
                type: "Web Application", 
                desc: "Antarmuka web Penerimaan Peserta Didik Baru interaktif dengan formulir pendaftaran multi-step.", 
                tags: ["HTML5", "Tailwind CSS", "JavaScript"], 
                badgeColor: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
                image: "/ppdb.png",
                details: "Sistem web PPDB online untuk pengalaman pendaftaran sekolah yang interaktif, user-friendly, dan responsif."
              },
              { 
                title: "GDevelop Game", 
                type: "Interactive Game", 
                desc: "Game 2D seru dengan mekanika permainan interaktif, grafis kustom, dan sistem skoring.", 
                tags: ["GDevelop Engine", "Game Design"], 
                badgeColor: "bg-purple-500/20 text-purple-300 border-purple-500/30",
                image: "/game.png",
                details: "Proyek pengembangan game 2D mandiri menggunakan GDevelop dengan kontrol mulus dan sistem skor tinggi."
              },
              { 
                title: "Prime Atelier Hair Tonic", 
                type: "Visual Branding", 
                desc: "Perancangan identitas produk, kemasan box, cetak label stiker, dan konsep visual marketing.", 
                tags: ["Figma", "Illustrator", "Branding"], 
                badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
                image: "/prime-atelier.png",
                details: "Karya desain grafis komprehensif mulai dari konsep logo, kemasan box produk, label botol, hingga materi promosi digital."
              }
            ].map((project, idx) => (
              <motion.div 
                key={project.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                onClick={() => setSelectedProject(project)}
                className="bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 flex flex-col justify-between shadow-xl group hover:-translate-y-1.5"
              >
                {/* CONTAINER GAMBAR PROJECT */}
                <div className="w-full h-48 bg-slate-950 overflow-hidden relative border-b border-slate-800">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                    onError={(e) => {
                      // Fallback jika gambar belum dimasukkan ke folder public
                      e.target.src = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80";
                    }}
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold border backdrop-blur-md ${project.badgeColor}`}>
                      {project.type}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">{project.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-400 mb-6 leading-relaxed">{project.desc}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-800/80">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-2.5 py-1 bg-slate-950 border border-slate-800 rounded-md text-[11px] text-cyan-300 font-medium">
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
      <section id="experience" className="py-24 bg-slate-950/40 relative z-10 border-t border-slate-900">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-12">
            <span className="text-xs font-bold text-cyan-400 tracking-widest uppercase">ORGANISASI</span>
            <h2 className="text-3xl font-extrabold text-white mt-1">Pengalaman & Kepemimpinan</h2>
          </motion.div>

          <div className="space-y-4">
            {[
              { 
                title: "Wakil Ketua Majelis Perwakilan Kelas (MPK)", 
                inst: "SMK Telkom Purwokerto", 
                desc: "Mengoordinasikan pengawasan program kerja OSIS, menampung aspirasi siswa, dan menyusun agenda strategis sekolah." 
              },
              { 
                title: "Brand Ambassador Sekolah", 
                inst: "SMK Telkom Purwokerto", 
                desc: "Mewakili institusi dalam public speaking, pembuatan konten promosi, dan presentasi sekolah." 
              },
              { 
                title: "Anggota Paskibraka (Pastema) & Pramuka", 
                inst: "SMK Telkom Purwokerto", 
                desc: "Melatih kedisiplinan, kerja sama tim, dan kepemimpinan dalam kegiatan upacara resmi." 
              }
            ].map((exp, idx) => (
              <motion.div 
                key={exp.title}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-md hover:border-cyan-500/40 transition-all"
              >
                <h3 className="text-lg font-bold text-white">{exp.title}</h3>
                <p className="text-xs font-semibold text-cyan-400 uppercase mt-0.5 mb-2">{exp.inst}</p>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{exp.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="lg:col-span-5 space-y-4">
            <span className="text-xs font-bold text-cyan-400 tracking-widest uppercase">KONTAK</span>
            <h2 className="text-3xl font-extrabold text-white">Mari Berdiskusi</h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Punya ide proyek atau ingin bekerja sama? Kirimkan pesan melalui formulir di samping.
            </p>
            <div className="pt-2 text-sm text-slate-300 space-y-2">
              <p>📍 Banyumas, Jawa Tengah, Indonesia</p>
              <p>✉️ adityanurarif9@gmail.com</p>
            </div>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input required type="text" placeholder="Nama Lengkap" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-all" />
                <input required type="email" placeholder="Alamat Email" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-all" />
              </div>
              <input required type="text" placeholder="Subjek Pesan" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-all" />
              <textarea required rows="4" placeholder="Tuliskan pesan..." className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 resize-none transition-all"></textarea>

              {formStatus && (
                <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold text-center">
                  {formStatus}
                </div>
              )}

              <button type="submit" className="w-full py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md hover:scale-[1.01] active:scale-[0.99]">
                Kirim Pesan
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 bg-slate-950 border-t border-slate-900 text-center text-xs text-slate-500 relative z-10">
        <p>© 2026 Aditya Nur Arif. All rights reserved.</p>
      </footer>

      {/* MODAL / TAB DETAIL PROJECT */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)} 
            className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()} 
              className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 sm:p-8 relative shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <button onClick={() => setSelectedProject(null)} className="absolute top-5 right-5 text-slate-400 hover:text-white bg-slate-800/60 w-8 h-8 rounded-full flex items-center justify-center transition-colors">
                ✕
              </button>
              
              {/* GAMBAR DI MODAL */}
              <div className="w-full h-40 sm:h-52 bg-slate-950 rounded-2xl overflow-hidden mb-5 border border-slate-800">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80";
                  }}
                />
              </div>

              <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold border mb-3 ${selectedProject.badgeColor}`}>
                {selectedProject.type}
              </span>
              <h3 className="text-2xl font-bold text-white mb-2">{selectedProject.title}</h3>
              <p className="text-slate-300 text-sm mb-4 leading-relaxed">{selectedProject.desc}</p>
              
              <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 mb-4">
                <h4 className="text-xs font-bold uppercase text-cyan-400 mb-1">Detail Fitur:</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{selectedProject.details}</p>
              </div>

              <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800">
                {selectedProject.tags.map(tag => (
                  <span key={tag} className="px-2.5 py-1 bg-slate-950 border border-slate-800 rounded-md text-xs text-cyan-300 font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}