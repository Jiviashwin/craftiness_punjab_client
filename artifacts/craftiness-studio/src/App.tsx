import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Baby,
  Check,
  Gift,
  Instagram,
  Layers3,
  Menu,
  PenLine,
  Scissors,
  Send,
  Shapes,
  Sparkles,
  X,
} from "lucide-react";
import { business } from "@/data/business";
import paperFlatlay from "@/assets/paper-flatlay.webp";
import wrappedKeepsake from "@/assets/wrapped-keepsake.webp";
import invitationDetail from "@/assets/invitation-detail.webp";
import workshopHands from "@/assets/workshop-hands.webp";
import keepsakeRibbon from "@/assets/keepsake-ribbon.webp";
import paperStack from "@/assets/paper-stack.webp";

const navItems = [
  { label: "Collections", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Studio", href: "#studio" },
  { label: "Workshops", href: "#workshops" },
  { label: "Journal", href: "#instagram" },
  { label: "Contact", href: "#contact" },
];

// Editorial placeholder imagery: generated local still-life studies stand in until real studio work is provided.
const workItems = [
  { title: "Paper, folded with feeling", type: "Bespoke paperie", image: paperFlatlay, className: "work-wide" },
  { title: "The art of the little detail", type: "Gifts & favors", image: wrappedKeepsake, className: "work-tall" },
  { title: "An invitation to linger", type: "Birth announcements", image: invitationDetail, className: "work-square" },
  { title: "Made at the table", type: "Workshops", image: workshopHands, className: "work-wide" },
  { title: "Wrapped, then remembered", type: "Packaging & design", image: keepsakeRibbon, className: "work-square" },
  { title: "A study in texture", type: "Graphics", image: paperStack, className: "work-tall" },
];

const iconMap = { layers: Layers3, scissors: Scissors, pen: PenLine, gift: Gift, baby: Baby, shapes: Shapes, sparkles: Sparkles };

function SectionLabel({ children }: { children: ReactNode }) {
  return <p className="eyebrow text-[#b5654a]">{children}</p>;
}

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return <div className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

function WordHeading({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={className}>{children}</span>;
}

function App() {
  const [navScrolled, setNavScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const dialogRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setNavScrolled(window.scrollY > 40);
      if (heroImageRef.current) {
        const parallaxY = Math.min(56, Math.max(-20, window.scrollY * 0.12));
        heroImageRef.current.style.setProperty("--parallax-y", `${parallaxY}px`);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    const sections = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    }), { threshold: 0.12 });
    sections.forEach((section) => observer.observe(section));
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    document.title = "Craftiness by Tanvi G. Kalra | Packaging & Design Studio, Est. 2012";
    const description = "Craftiness is a bespoke packaging and design studio established in 2012 — creating handmade paperie, invitations, gifts, and workshops.";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) { meta = document.createElement("meta"); meta.setAttribute("name", "description"); document.head.appendChild(meta); }
    meta.setAttribute("content", description);
    [["og:title", document.title], ["og:description", description], ["og:type", "website"]].forEach(([property, content]) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) { tag = document.createElement("meta"); tag.setAttribute("property", property); document.head.appendChild(tag); }
      tag.setAttribute("content", content);
    });
  }, []);

  useEffect(() => {
    if (!modalOpen) return;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setModalOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [modalOpen]);

  const openModal = () => { setSubmitted(false); setErrors({}); setModalOpen(true); };
  const closeModal = () => setModalOpen(false);
  const submitEnquiry = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const nextErrors: Record<string, string> = {};
    ["name", "email", "message"].forEach((field) => { if (!String(form.get(field) || "").trim()) nextErrors[field] = "This field is required."; });
    if (String(form.get("email") || "").trim() && !/^\S+@\S+\.\S+$/.test(String(form.get("email")))) nextErrors.email = "Please enter a valid email.";
    setErrors(nextErrors);
    if (!Object.keys(nextErrors).length) setSubmitted(true);
  };

  return (
    <div className="site-shell">
      <div className="paper-grain" aria-hidden="true" />
      <header className={`navbar fixed top-0 z-40 w-full border-b border-transparent ${navScrolled ? "scrolled" : ""}`}>
        <div className="mx-auto flex w-[min(100%-40px,1360px)] items-center justify-between py-5 md:py-6">
          <a href="#top" className="group z-50 leading-none" aria-label="Craftiness home" data-testid="link-home">
            <span className="font-serif text-[25px] tracking-[-.045em]">CRAFTINESS</span>
            <span className="mt-1 block font-mono text-[8px] uppercase tracking-[.12em] text-[#756c62]">by Tanvi G. Kalra · Est. 2012</span>
          </a>
          <nav className="hidden items-center gap-6 lg:flex" aria-label="Main navigation">
            {navItems.map((item) => <a className="editorial-link font-mono text-[9px] uppercase tracking-[.13em] text-[#514a43]" href={item.href} key={item.href} data-testid={`link-nav-${item.label.toLowerCase()}`}>{item.label}</a>)}
          </nav>
          <div className="flex items-center gap-3">
            <button onClick={openModal} className="hidden border border-[#3a3530] px-4 py-3 font-mono text-[9px] uppercase tracking-[.14em] transition hover:-translate-y-0.5 hover:bg-[#1c1a17] hover:text-[#f7f3ec] md:block" data-testid="button-nav-enquiry">Start an enquiry</button>
            <button onClick={() => setMenuOpen(!menuOpen)} className="relative z-50 flex h-11 w-11 items-center justify-center border border-[#3a3530] lg:hidden" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} data-testid="button-mobile-menu">
              {menuOpen ? <X size={18} strokeWidth={1.5} /> : <Menu size={18} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
        {menuOpen && <div className="absolute left-0 top-full w-full border-y border-[#1c1a17]/15 bg-[#f7f3ec] px-5 py-7 shadow-[0_15px_30px_rgba(65,46,30,.08)] lg:hidden">
          <nav className="flex flex-col gap-5" aria-label="Mobile navigation">
            {navItems.map((item) => <a onClick={() => setMenuOpen(false)} className="font-serif text-3xl" href={item.href} key={item.href} data-testid={`link-mobile-${item.label.toLowerCase()}`}>{item.label}</a>)}
            <button onClick={() => { setMenuOpen(false); openModal(); }} className="mt-3 flex items-center gap-2 self-start border border-[#3a3530] px-4 py-3 font-mono text-[9px] uppercase tracking-[.14em]" data-testid="button-mobile-enquiry">Start an enquiry <ArrowUpRight size={13} /></button>
          </nav>
        </div>}
      </header>

      <main id="top">
        <section className="relative min-h-[720px] overflow-hidden pt-[104px] md:min-h-[calc(100vh-0px)] md:pt-[106px]" aria-labelledby="hero-heading">
          <div className="section-wrap grid min-h-[calc(100dvh-106px)] items-center gap-12 pb-16 pt-12 md:grid-cols-[1.06fr_.94fr] md:gap-16 md:pb-12 md:pt-10">
            <div className="relative z-10 max-w-[635px]">
              <div className="hero-entrance mb-7 flex items-center gap-3"><span className="h-px w-8 bg-[#b5654a]" /><SectionLabel>Packaging & Design Studio · Est. 2012</SectionLabel></div>
              <h1 id="hero-heading" className="hero-entrance font-serif text-[clamp(3.65rem,7.3vw,7.9rem)] leading-[.9] tracking-[-.055em] text-[#1c1a17]">
                Made by hand.<br /><em className="font-serif text-[#b5654a]">Meant to be kept.</em>
              </h1>
              <p className="hero-entrance mt-8 max-w-[450px] text-[15px] leading-[1.8] text-[#514a43] md:text-[17px]">A bespoke paperie and design studio creating thoughtful packaging, invitations, and keepsakes for life&apos;s most meaningful moments.</p>
              <div className="hero-entrance mt-9 flex flex-wrap items-center gap-5">
                <a href="#studio" className="cta flex items-center gap-4 bg-[#1c1a17] px-5 py-4 font-mono text-[9px] uppercase tracking-[.15em] text-[#f7f3ec] transition hover:-translate-y-0.5 hover:bg-[#b5654a]" data-testid="link-explore-studio">Explore the studio <ArrowRight className="arrow-icon" size={15} /></a>
                <button onClick={openModal} className="cta group flex items-center gap-3 border-b border-[#3a3530] py-3 font-mono text-[9px] uppercase tracking-[.15em]" data-testid="button-hero-enquiry">Start an enquiry <ArrowUpRight className="arrow-icon" size={14} /></button>
              </div>
            </div>
             <div className="relative ml-auto h-[440px] w-full max-w-[520px] overflow-hidden md:h-[min(69vh,680px)]">
               <div ref={heroImageRef} className="hero-parallax h-full w-full">
                 <img className="hero-drift h-full w-full object-cover" src={paperFlatlay} alt="Warm editorial arrangement of handmade paper, terracotta envelope and linen ribbon" />
               </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#35291e]/15 to-transparent" />
              <span className="float-paper absolute -left-10 top-[22%] hidden h-24 w-16 rotate-12 border border-[#b99d7c]/50 bg-[#f4ede1]/70 md:block" />
              <span className="float-paper delay absolute -right-7 bottom-[14%] hidden h-20 w-20 rounded-full border border-[#b5654a]/30 md:block" />
              <span className="absolute bottom-4 left-4 bg-[#f7f3ec]/85 px-3 py-2 font-mono text-[8px] uppercase tracking-[.14em] text-[#514a43]">Editorial image · placeholder</span>
            </div>
          </div>
        </section>

        <section className="border-y border-[#1c1a17]/15 bg-[#efe7da]" aria-label="Studio facts">
          <div className="mx-auto grid w-[min(100%-40px,1180px)] md:grid-cols-3">
            {[["Est. 2012", "A studio with a long love for paper"], ["30.8K", "Community on Instagram"], ["Bespoke", "Made to order, always"]].map(([strong, text], index) => <div className={`flex items-center gap-4 py-6 md:justify-center md:py-8 ${index !== 0 ? "border-t border-[#1c1a17]/15 md:border-l md:border-t-0" : ""}`} key={strong}><span className="font-serif text-2xl text-[#b5654a]">{strong}</span><span className="max-w-[130px] font-mono text-[8px] uppercase leading-[1.5] tracking-[.12em] text-[#62584e]">{text}</span></div>)}
          </div>
        </section>

        <section id="studio" className="section-pad section-wrap" aria-labelledby="studio-heading">
          <Reveal className="grid gap-10 md:grid-cols-[.9fr_1.1fr] md:gap-28">
            <div><SectionLabel>The studio</SectionLabel><h2 id="studio-heading" className="mt-6 max-w-[510px] font-serif text-[clamp(2.9rem,5vw,5.25rem)] leading-[.98] tracking-[-.045em]"><WordHeading>A studio built on paper, patience and detail.</WordHeading></h2></div>
            <div className="max-w-[540px] self-end text-[15px] leading-[1.85] text-[#514a43] md:pb-1 md:text-[16px]">
              <p>Craftiness is a packaging and design studio for pieces that ask to be held a little longer. We work with the quiet language of paper: its grain, weight, fold, edge and the small surprise inside.</p>
              <p className="mt-6">Our approach is considered and collaborative. Ideas are given time to become tangible, and every finish has a reason to be there. The result is personal, tactile and made for the moment it belongs to.</p>
              <a href="#services" className="editorial-link mt-9 inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[.14em] text-[#b5654a]" data-testid="link-studio-services">See what we make <ArrowRight size={14} /></a>
            </div>
          </Reveal>
        </section>

        <section id="services" className="border-y border-[#1c1a17]/15 bg-[#f1eadd] section-pad" aria-labelledby="services-heading">
          <div className="section-wrap">
            <Reveal className="mb-14 flex flex-wrap items-end justify-between gap-6"><div><SectionLabel>What we do</SectionLabel><h2 id="services-heading" className="mt-5 font-serif text-[clamp(3rem,6vw,6rem)] leading-[.9] tracking-[-.055em]"><WordHeading>Made for your<br /><em>meaningful moments.</em></WordHeading></h2></div><p className="max-w-[260px] pb-1 font-mono text-[9px] uppercase leading-[1.7] tracking-[.12em] text-[#71665b]">Seven ways to bring a little more feeling to the things you give, send and celebrate.</p></Reveal>
            <div className="grid grid-cols-1 border-l border-t border-[#1c1a17]/15 sm:grid-cols-2 lg:grid-cols-4">
              {business.services.map((service, index) => {
                const Icon = iconMap[service.icon as keyof typeof iconMap];
                return <Reveal delay={index * 50} className={`service-tile group border-b border-r border-[#1c1a17]/15 p-7 transition md:p-9 ${index === 0 ? "lg:col-span-2 lg:row-span-2 lg:min-h-[350px]" : ""}`} key={service.title}><div className="flex h-full flex-col justify-between gap-16"><Icon className="service-icon text-[#b5654a]" size={index === 0 ? 30 : 22} strokeWidth={1.3} /><div><span className="mb-4 block font-mono text-[10px] text-[#938578]">0{index + 1}</span><h3 className="font-serif text-[clamp(1.65rem,2.2vw,2.3rem)] leading-none tracking-[-.03em]">{service.title}</h3><p className="mt-4 max-w-[285px] text-[13px] leading-[1.65] text-[#655b51]">{service.description}</p></div></div></Reveal>;
              })}
            </div>
          </div>
        </section>

        <section className="section-pad section-wrap" aria-labelledby="process-heading">
          <Reveal><div className="mb-14 grid gap-7 md:grid-cols-[.8fr_1.2fr]"><div><SectionLabel>From thought to touch</SectionLabel><h2 id="process-heading" className="mt-5 font-serif text-[clamp(3rem,5vw,5.2rem)] leading-[.92] tracking-[-.05em]"><WordHeading>The studio<br /><em>process.</em></WordHeading></h2></div><p className="max-w-[410px] self-end text-[15px] leading-[1.8] text-[#514a43]">There is no rushing the good part. We take an idea through conversation, sketch, craft and into the hands of the person it was made for.</p></div></Reveal>
          <div className="relative grid gap-10 border-t border-[#1c1a17]/20 pt-10 md:grid-cols-4 md:gap-5">
            <div className="absolute left-[7%] right-[7%] top-[43px] hidden border-t border-dashed border-[#b5654a]/50 md:block" />
            {business.process.map((step, index) => <Reveal delay={index * 90} key={step.number} className="relative"><div className="mb-7 flex items-center justify-between md:block"><span className="font-mono text-[11px] text-[#b5654a]">{step.number}</span><span className="h-2 w-2 rounded-full border border-[#b5654a] bg-[#f7f3ec] md:absolute md:left-0 md:top-[-15px]" /></div><h3 className="font-serif text-[27px] leading-none capitalize">{step.title}</h3><p className="mt-4 max-w-[220px] text-[13px] leading-[1.7] text-[#655b51]">{step.text}</p></Reveal>)}
          </div>
        </section>

        <section id="work" className="bg-[#1c1a17] py-[100px] text-[#f7f3ec] md:py-[150px]" aria-labelledby="work-heading">
          <div className="section-wrap">
            <Reveal className="mb-14 flex items-end justify-between gap-6"><div><SectionLabel>Selected work</SectionLabel><h2 id="work-heading" className="mt-5 font-serif text-[clamp(3rem,6vw,6rem)] leading-[.88] tracking-[-.055em]"><WordHeading>Things made<br /><em>to be kept.</em></WordHeading></h2></div><span className="hidden pb-2 font-mono text-[9px] uppercase tracking-[.15em] text-[#cdbca7] md:block">Editorial image studies · 01—06</span></Reveal>
            <div className="work-grid grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-5">
              {workItems.map((item, index) => <Reveal delay={index * 100} className={`work-card ${item.className} group md:col-span-4`} key={item.title}><figure className="overflow-hidden"><div className="portfolio-reveal aspect-[4/5] overflow-hidden"><img loading="lazy" className="work-image h-full w-full object-cover" src={item.image} alt={`${item.title} — ${item.type}, editorial placeholder imagery`} /></div><figcaption className="flex items-start justify-between gap-3 pt-4"><div><h3 className="font-serif text-[21px] leading-[1.05]">{item.title}</h3><p className="mt-2 font-mono text-[8px] uppercase tracking-[.14em] text-[#bca995]">{item.type}</p></div><ArrowUpRight className="mt-1 text-[#b5654a]" size={16} /></figcaption></figure></Reveal>)}
            </div>
            <Reveal className="mt-16 flex justify-center"><span className="font-mono text-[9px] uppercase tracking-[.14em] text-[#ad9b88]">A selection of editorial placeholder imagery · Real work to be added</span></Reveal>
          </div>
        </section>

        <section id="workshops" className="relative overflow-hidden bg-[#d9cbb6] py-[100px] md:py-[145px]" aria-labelledby="workshop-heading">
          <span className="float-paper absolute right-[12%] top-14 hidden h-36 w-28 rotate-12 border border-[#7a6a58]/30 bg-[#efe7da]/30 md:block" />
          <span className="float-paper delay-two absolute bottom-16 left-[8%] hidden h-20 w-20 rounded-full border border-[#b5654a]/30 md:block" />
          <div className="section-wrap grid items-center gap-12 md:grid-cols-[1.2fr_.8fr]">
            <Reveal><SectionLabel>Slow making</SectionLabel><h2 id="workshop-heading" className="mt-6 max-w-[680px] font-serif text-[clamp(3.6rem,7vw,8rem)] leading-[.83] tracking-[-.06em]">Learn the <em>craft.</em></h2><p className="mt-8 max-w-[470px] text-[15px] leading-[1.85] text-[#51483d]">Workshops are an invitation to pause, get your hands on the material and leave with something made by you. Enquire to find out what&apos;s taking shape.</p><button onClick={openModal} className="cta mt-9 flex items-center gap-4 border-b border-[#1c1a17] py-3 font-mono text-[9px] uppercase tracking-[.15em]" data-testid="button-workshop-enquiry">Enquire about workshops <ArrowRight className="arrow-icon" size={15} /></button></Reveal>
            <Reveal delay={120} className="relative ml-auto w-full max-w-[420px] rotate-[2deg]"><img loading="lazy" className="h-[350px] w-full object-cover md:h-[440px]" src={workshopHands} alt="Hands folding paper at a Craftiness workshop, editorial placeholder imagery" /><span className="absolute bottom-3 left-3 bg-[#f7f3ec]/90 px-3 py-2 font-mono text-[8px] uppercase tracking-[.13em] text-[#514a43]">Editorial image · placeholder</span></Reveal>
          </div>
        </section>

        <section id="instagram" className="section-pad section-wrap" aria-labelledby="instagram-heading">
          <Reveal className="flex flex-wrap items-end justify-between gap-8"><div><SectionLabel>From the journal</SectionLabel><h2 id="instagram-heading" className="mt-5 font-serif text-[clamp(3rem,5.5vw,5.8rem)] leading-[.9] tracking-[-.055em]"><WordHeading>Follow the<br /><em>studio.</em></WordHeading></h2></div><div className="flex items-center gap-4"><Instagram size={20} strokeWidth={1.4} className="text-[#b5654a]" /><div><a href={business.instagramUrl} target="_blank" rel="noreferrer" className="editorial-link block font-mono text-[10px] uppercase tracking-[.14em]" data-testid="link-instagram-handle">{business.instagram}</a><span className="mt-1 block font-mono text-[9px] text-[#776d63]">{business.followers} followers</span></div></div></Reveal>
          <div className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">{[paperFlatlay, wrappedKeepsake, invitationDetail, keepsakeRibbon, paperStack, workshopHands].map((image, index) => <Reveal delay={index * 70} className="aspect-square overflow-hidden" key={image}><a href={business.instagramUrl} target="_blank" rel="noreferrer" data-testid={`link-instagram-tile-${index + 1}`}><img loading="lazy" className="h-full w-full object-cover transition duration-700 hover:scale-[1.03]" src={image} alt={`Craftiness Instagram editorial image placeholder ${index + 1}`} /></a></Reveal>)}</div>
          <Reveal className="mt-10 flex justify-center"><a href={business.instagramUrl} target="_blank" rel="noreferrer" className="cta flex items-center gap-3 border-b border-[#1c1a17] pb-3 font-mono text-[9px] uppercase tracking-[.14em]" data-testid="link-follow-instagram">Follow {business.instagram} <ArrowUpRight className="arrow-icon" size={14} /></a></Reveal>
        </section>

        <section className="border-y border-[#1c1a17]/15 bg-[#efe7da] section-pad" aria-labelledby="why-heading">
          <div className="section-wrap"><Reveal><SectionLabel>The Craftiness way</SectionLabel><h2 id="why-heading" className="mt-5 max-w-[780px] font-serif text-[clamp(3rem,5.7vw,6rem)] leading-[.9] tracking-[-.055em]"><WordHeading>Quietly particular.<br /><em>Always personal.</em></WordHeading></h2></Reveal><div className="mt-16 grid border-t border-[#1c1a17]/15 md:grid-cols-4">{business.reasons.map((reason, index) => <Reveal delay={index * 90} className="border-b border-[#1c1a17]/15 py-8 md:border-b-0 md:border-r md:px-7 md:first:pl-0 md:last:border-r-0" key={reason.title}><span className="font-mono text-[10px] text-[#b5654a]">0{index + 1}</span><h3 className="mt-9 max-w-[185px] font-serif text-[25px] leading-[.95]">{reason.title}</h3><p className="mt-4 max-w-[190px] text-[12px] leading-[1.65] text-[#655b51]">{reason.text}</p></Reveal>)}</div></div>
        </section>

        {/* Populate when real testimonials are provided. */}
        <section aria-hidden="true" className="hidden" id="testimonials" />

        <section id="contact" className="relative overflow-hidden bg-[#b5654a] py-[105px] text-[#f7f3ec] md:py-[145px]" aria-labelledby="contact-heading">
          <div className="section-wrap relative z-10"><Reveal><SectionLabel>Begin with a conversation</SectionLabel><h2 id="contact-heading" className="mt-6 max-w-[900px] font-serif text-[clamp(3.5rem,8vw,8.6rem)] leading-[.82] tracking-[-.065em]">Let&apos;s make something <em>worth keeping.</em></h2><div className="mt-10 flex flex-wrap items-center gap-6"><button onClick={openModal} className="cta flex items-center gap-4 bg-[#1c1a17] px-5 py-4 font-mono text-[9px] uppercase tracking-[.15em] transition hover:-translate-y-0.5 hover:bg-[#efe7da] hover:text-[#1c1a17]" data-testid="button-contact-enquiry">Start an enquiry <ArrowRight className="arrow-icon" size={15} /></button><a href={business.instagramUrl} target="_blank" rel="noreferrer" className="editorial-link flex items-center gap-2 font-mono text-[9px] uppercase tracking-[.14em]" data-testid="link-instagram-dm">Prefer Instagram? Send a DM <ArrowUpRight size={14} /></a></div></Reveal></div>
        </section>
      </main>

      <footer className="bg-[#1c1a17] py-12 text-[#f7f3ec] md:py-16"><div className="section-wrap"><div className="flex flex-col justify-between gap-12 md:flex-row md:items-end"><div><a href="#top" className="font-serif text-4xl tracking-[-.05em]" data-testid="link-footer-home">CRAFTINESS</a><p className="mt-3 font-mono text-[9px] uppercase tracking-[.13em] text-[#bca995]">A studio by Tanvi G. Kalra · Est. 2012</p></div><div className="flex gap-10 font-mono text-[9px] uppercase tracking-[.14em] text-[#cdbca7]"><a href={business.instagramUrl} target="_blank" rel="noreferrer" className="editorial-link" data-testid="link-footer-instagram">Instagram</a><button onClick={openModal} className="editorial-link" data-testid="button-footer-enquiry">Enquiry</button></div></div><div className="mt-14 flex justify-between border-t border-[#f7f3ec]/20 pt-5 font-mono text-[8px] uppercase tracking-[.13em] text-[#8d7d6c]"><span>© 2025 Craftiness</span><span>Made slowly, with feeling.</span></div></div></footer>

      {modalOpen && <div className="modal-backdrop fixed inset-0 z-[60] flex items-end justify-center bg-[#1c1a17]/65 p-0 md:items-center md:p-6" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) closeModal(); }}>
        <div ref={dialogRef} tabIndex={-1} role="dialog" aria-modal="true" aria-labelledby="enquiry-heading" className="modal-panel max-h-[92dvh] w-full max-w-[640px] overflow-auto bg-[#f7f3ec] p-6 outline-none md:p-10">
          <div className="flex items-start justify-between gap-5"><div><SectionLabel>Start a conversation</SectionLabel><h2 id="enquiry-heading" className="mt-4 font-serif text-4xl tracking-[-.04em] md:text-5xl">Tell us a little.</h2></div><button onClick={closeModal} className="flex h-10 w-10 items-center justify-center border border-[#1c1a17]/20" aria-label="Close enquiry form" data-testid="button-close-enquiry"><X size={18} strokeWidth={1.5} /></button></div>
          {submitted ? <div className="border-t border-[#1c1a17]/15 mt-9 pt-9"><div className="flex h-12 w-12 items-center justify-center bg-[#b5654a] text-[#f7f3ec]"><Check size={22} /></div><h3 className="mt-6 font-serif text-3xl">Thank you for sharing.</h3><p className="mt-3 max-w-[420px] text-[14px] leading-[1.7] text-[#514a43]">Your enquiry is ready to be picked up by the studio. This is a preview flow — no message has been sent to a real endpoint.</p><button onClick={closeModal} className="mt-8 border border-[#1c1a17] px-5 py-3 font-mono text-[9px] uppercase tracking-[.14em]" data-testid="button-success-close">Close</button></div> : <form onSubmit={submitEnquiry} className="mt-9 border-t border-[#1c1a17]/15 pt-8" noValidate><div className="grid gap-6 md:grid-cols-2"><Field label="Name *" name="name" error={errors.name} /><Field label="Email *" name="email" type="email" error={errors.email} /><Field label="Phone" name="phone" /><Field label="Occasion" name="occasion" /></div><label className="mt-6 block"><span className="font-mono text-[9px] uppercase tracking-[.14em] text-[#655b51]">Message *</span><textarea name="message" rows={4} className={`mt-2 w-full resize-none border-b bg-transparent px-0 py-3 text-[14px] outline-none placeholder:text-[#a09589] ${errors.message ? "border-[#b5654a]" : "border-[#1c1a17]/30 focus:border-[#b5654a]"}`} placeholder="What are you imagining?" data-testid="input-message" />{errors.message && <span className="mt-1 block text-[11px] text-[#b5654a]">{errors.message}</span>}</label><div className="mt-8 flex items-center justify-between gap-4"><p className="max-w-[280px] font-mono text-[8px] uppercase leading-[1.5] tracking-[.1em] text-[#897d71]">No email or phone is published yet. This form is a private preview.</p><button type="submit" className="flex shrink-0 items-center gap-3 bg-[#1c1a17] px-5 py-4 font-mono text-[9px] uppercase tracking-[.14em] text-[#f7f3ec] transition hover:bg-[#b5654a]" data-testid="button-submit-enquiry">Prepare enquiry <Send size={14} /></button></div></form>}
        </div>
      </div>}
    </div>
  );
}

function Field({ label, name, type = "text", error }: { label: string; name: string; type?: string; error?: string }) {
  return <label className="block"><span className="font-mono text-[9px] uppercase tracking-[.14em] text-[#655b51]">{label}</span><input name={name} type={type} className={`mt-2 w-full border-b bg-transparent px-0 py-3 text-[14px] outline-none placeholder:text-[#a09589] ${error ? "border-[#b5654a]" : "border-[#1c1a17]/30 focus:border-[#b5654a]"}`} data-testid={`input-${name}`} />{error && <span className="mt-1 block text-[11px] text-[#b5654a]">{error}</span>}</label>;
}

export default App;
