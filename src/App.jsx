import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [formStatus, setFormStatus] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'education', 'skills', 'portfolio', 'certificates', 'experience', 'contact'];
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

  return (
    <div className="bg-[#030712] text-slate-100 font-sans min-h-screen selection:bg-cyan-500 selection:text-slate-950 overflow-x-hidden relative">
      
      {/* BACKGROUND AMBIENT LIGHTS */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-10 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px]"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-[150px]"></div>
      </div>

      {/* NAVBAR (DIBIKIN LEBIH BERSIH & TIDAK MENUMPUK) */}
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
              {['Home', 'About', 'Education', 'Skills', 'Portfolio', 'Certificates', 'Experience', 'Contact'].map((item) => (
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
          <div className="lg:col-span-7 space-y-6">
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
                href="/cv-aditya.pdf" 
                download
                className="px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg shadow-cyan-500/20 hover:opacity-90"
              >
                Download CV
              </a>
              <a 
                href="#portfolio" 
                className="px-6 py-3 rounded-full bg-slate-900 border border-slate-700 hover:border-cyan-500/50 text-white font-bold text-xs uppercase tracking-wider transition-all"
              >
                Lihat Karya
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-sm bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-2xl relative">
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-2xl overflow-hidden mb-4 border border-cyan-400/30">
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
          </div>
        </div>
      </section>

      {/* ABOUT ME SECTION */}
      <section id="about" className="py-24 bg-slate-950/40 relative z-10 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-xs font-bold text-cyan-400 tracking-widest uppercase mb-2">TENTANG SAYA</div>
          <h2 className="text-3xl font-extrabold text-white mb-8">Logika, Kreativitas & Keseimbangan</h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7 space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
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
                    <span key={hobby} className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-medium text-slate-200">
                      {hobby}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-4">
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5">
                <h4 className="font-bold text-white mb-1">Tech Enthusiast</h4>
                <p className="text-xs text-slate-400">Mengeksplorasi framework modern, bahasa pemrograman, dan engine game interaktif.</p>
              </div>
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5">
                <h4 className="font-bold text-white mb-1">Leadership & Public Speaking</h4>
                <p className="text-xs text-slate-400">Berpengalaman memimpin organisasi, memegang acara formal, dan komunikasi publik.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EDUCATION SECTION */}
      <section id="education" className="py-24 relative z-10">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-cyan-400 tracking-widest uppercase">PENDIDIKAN</span>
            <h2 className="text-3xl font-extrabold text-white mt-1">Latar Belakang Sekolah</h2>
          </div>

          <div className="bg-slate-950 border border-slate-800/80 rounded-3xl p-8 shadow-xl">
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
          </div>
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section id="skills" className="py-24 bg-slate-950/40 relative z-10 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="text-xs font-bold text-cyan-400 tracking-widest uppercase">KEAHLIAN</span>
          <h2 className="text-3xl font-extrabold text-white mt-1 mb-12">Tech Stack & Tools</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {[
              { title: "Programming & Web", tags: ['HTML & CSS', 'JavaScript', 'PHP', 'Python', 'Laravel', 'MySQL'] },
              { title: "Design & Visual", tags: ['Figma', 'Canva', 'Adobe Illustrator', 'Wireframing'] },
              { title: "Game Dev & Tools", tags: ['GDevelop', 'Git & GitHub', 'VS Code', 'XAMPP'] }
            ].map((skill) => (
              <div key={skill.title} className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white mb-4">{skill.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skill.tags.map(t => (
                    <span key={t} className="px-3 py-1 bg-slate-950 border border-slate-800 rounded-lg text-xs font-medium text-cyan-300">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO SECTION */}
      <section id="portfolio" className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div>
              <span className="text-xs font-bold text-cyan-400 tracking-widest uppercase">PORTOFOLIO</span>
              <h2 className="text-3xl font-extrabold text-white mt-1">Project Terpilih</h2>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm">Klik salah satu kartu untuk melihat detail informasi project.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { 
                title: "Bar Bar Es Duren", 
                type: "Web App E-Commerce", 
                desc: "Aplikasi web e-commerce berbasis Laravel lengkap dengan integrasi gateway pembayaran Midtrans.", 
                tags: ["Laravel", "Midtrans", "MySQL"], 
                badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
                details: "Platform e-commerce kuliner untuk pemesanan es duren online. Dilengkapi keranjang belanja dinamis, admin panel, database relasional MySQL, dan integrasi Midtrans Payment Gateway."
              },
              { 
                title: "PPDB SMK Telkom", 
                type: "Web Application", 
                desc: "Antarmuka web Penerimaan Peserta Didik Baru interaktif dengan formulir pendaftaran multi-step.", 
                tags: ["HTML5", "Tailwind CSS", "JavaScript"], 
                badgeColor: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
                details: "Sistem web PPDB online untuk pengalaman pendaftaran sekolah yang interaktif, user-friendly, dan responsif."
              },
              { 
                title: "GDevelop Game", 
                type: "Interactive Game", 
                desc: "Game 2D seru dengan mekanika permainan interaktif, grafis kustom, dan sistem skoring.", 
                tags: ["GDevelop Engine", "Game Design"], 
                badgeColor: "bg-purple-500/20 text-purple-300 border-purple-500/30",
                details: "Proyek pengembangan game 2D mandiri menggunakan GDevelop dengan kontrol mulus dan sistem skor tinggi."
              },
              { 
                title: "Prime Atelier Hair Tonic", 
                type: "Visual Branding", 
                desc: "Perancangan identitas produk, kemasan box, cetak label stiker, dan konsep visual marketing.", 
                tags: ["Figma", "Illustrator", "Branding"], 
                badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
                details: "Karya desain grafis komprehensif mulai dari konsep logo, kemasan box produk, label botol, hingga materi promosi digital."
              }
            ].map((project) => (
              <div 
                key={project.title}
                onClick={() => setSelectedProject(project)}
                className="bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 rounded-3xl p-6 cursor-pointer transition-all flex flex-col justify-between shadow-lg"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold border ${project.badgeColor}`}>{project.type}</span>
                    <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-400 mb-6 leading-relaxed">{project.desc}</p>
                </div>
                <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-800">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-2.5 py-1 bg-slate-950 border border-slate-800 rounded-md text-[11px] text-cyan-300 font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE SECTION */}
      <section id="experience" className="py-24 bg-slate-950/40 relative z-10 border-t border-slate-900">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-cyan-400 tracking-widest uppercase">ORGANISASI</span>
            <h2 className="text-3xl font-extrabold text-white mt-1">Pengalaman & Kepemimpinan</h2>
          </div>

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
            ].map((exp) => (
              <div key={exp.title} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-md">
                <h3 className="text-lg font-bold text-white">{exp.title}</h3>
                <p className="text-xs font-semibold text-cyan-400 uppercase mt-0.5 mb-2">{exp.inst}</p>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{exp.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-bold text-cyan-400 tracking-widest uppercase">KONTAK</span>
            <h2 className="text-3xl font-extrabold text-white">Mari Berdiskusi</h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Punya ide proyek atau ingin bekerja sama? Kirimkan pesan melalui formulir di samping.
            </p>
            <div className="pt-2 text-sm text-slate-300 space-y-2">
              <p>📍 Banyumas, Jawa Tengah, Indonesia</p>
              <p>✉️ adityanurarif9@gmail.com</p>
            </div>
          </div>

          <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input required type="text" placeholder="Nama Lengkap" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500" />
                <input required type="email" placeholder="Alamat Email" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500" />
              </div>
              <input required type="text" placeholder="Subjek Pesan" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500" />
              <textarea required rows="4" placeholder="Tuliskan pesan..." className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 resize-none"></textarea>

              {formStatus && (
                <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold text-center">
                  {formStatus}
                </div>
              )}

              <button type="submit" className="w-full py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md">
                Kirim Pesan
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 bg-slate-950 border-t border-slate-900 text-center text-xs text-slate-500 relative z-10">
        <p>© 2026 Aditya Nur Arif. All rights reserved.</p>
      </footer>

      {/* MODAL / TAB DETAIL PROJECT */}
      <AnimatePresence>
        {selectedProject && (
          <div onClick={() => setSelectedProject(null)} className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div onClick={(e) => e.stopPropagation()} className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 sm:p-8 relative shadow-2xl">
              <button onClick={() => setSelectedProject(null)} className="absolute top-5 right-5 text-slate-400 hover:text-white">
                ✕
              </button>
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
            </div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}