import { useState, useEffect, useRef, useCallback } from "react";

/* ─── FONTS & GLOBAL CSS ─── */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Manrope:wght@300;400;500;600;700;800&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; font-size: 16px; }

    :root {
      --ink:      #111827;
      --ink2:     #1f2937;
      --slate:    #4b5563;
      --mist:     #9ca3af;
      --amber:    #b45309;
      --amber-lt: #d97706;
      --amber-gl: rgba(180,83,9,.10);
      --sand:     #faf8f4;
      --sand2:    #f3efe7;
      --white:    #ffffff;
      --border:   rgba(17,24,39,.08);
      --shadow-s: 0 2px 12px rgba(17,24,39,.07);
      --shadow-m: 0 8px 32px rgba(17,24,39,.10);
      --shadow-l: 0 20px 64px rgba(17,24,39,.13);
      --r:        12px;
      --head:     'Cormorant Garamond', Georgia, serif;
      --body:     'Manrope', sans-serif;
      --nav-h:    66px;
    }

    body { font-family: var(--body); background: var(--sand); color: var(--ink); -webkit-font-smoothing: antialiased; }

    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: var(--sand); }
    ::-webkit-scrollbar-thumb { background: var(--amber); border-radius: 2px; }

    /* ── TYPOGRAPHY ── */
    h1,h2,h3 { font-family: var(--head); font-weight: 700; color: var(--ink); line-height: 1.15; }

    /* ── BUTTONS ── */
    .btn {
      display: inline-flex; align-items: center; gap: .5rem;
      font-family: var(--body); font-weight: 700; font-size: .82rem;
      letter-spacing: .08em; text-transform: uppercase;
      border: none; cursor: pointer; border-radius: 8px;
      transition: transform .22s, box-shadow .22s, background .22s, color .22s;
      text-decoration: none;
    }
    .btn:active { transform: scale(.97); }

    .btn-amber {
      background: var(--amber); color: #fff;
      padding: .82rem 1.9rem;
      box-shadow: 0 4px 20px rgba(180,83,9,.28);
    }
    .btn-amber:hover { background: var(--amber-lt); box-shadow: 0 8px 30px rgba(180,83,9,.38); transform: translateY(-2px); }

    .btn-border {
      background: transparent; color: var(--ink);
      border: 2px solid rgba(17,24,39,.18); padding: .78rem 1.8rem;
    }
    .btn-border:hover { border-color: var(--amber); color: var(--amber); transform: translateY(-2px); }

    .btn-ghost {
      background: transparent; color: var(--amber);
      border: 2px solid rgba(180,83,9,.30); padding: .78rem 1.8rem;
    }
    .btn-ghost:hover { background: var(--amber-gl); border-color: var(--amber); }

    /* ── CARDS ── */
    .card {
      background: var(--white); border-radius: 16px;
      border: 1px solid var(--border);
      box-shadow: var(--shadow-s);
      transition: transform .3s cubic-bezier(.4,0,.2,1), box-shadow .3s;
    }
    .card:hover { transform: translateY(-5px); box-shadow: var(--shadow-l); }

    /* ── BADGE ── */
    .eyebrow {
      display: inline-block; font-family: var(--body); font-size: .72rem;
      font-weight: 800; letter-spacing: .18em; text-transform: uppercase;
      color: var(--amber); margin-bottom: .85rem;
    }

    /* ── SECTION ── */
    .sec { padding: 90px 24px; }
    .wrap { max-width: 1100px; margin: 0 auto; }
    .sec-head { text-align: center; margin-bottom: 56px; }
    .sec-head h2 { font-size: clamp(2rem,4vw,2.9rem); }
    .sec-head p { font-family: var(--body); font-weight: 400; color: var(--slate); max-width: 500px; margin: .9rem auto 0; line-height: 1.85; font-size: .97rem; }
    .rule { width: 44px; height: 3px; border-radius: 2px; background: var(--amber); margin: .8rem auto 0; }

    /* ── INPUTS ── */
    .field { display: flex; flex-direction: column; gap: .45rem; }
    .field label { font-family: var(--body); font-size: .72rem; font-weight: 800; letter-spacing: .12em; text-transform: uppercase; color: var(--mist); }
    .field input, .field textarea, .field select {
      font-family: var(--body); font-size: .93rem; color: var(--ink);
      background: var(--white); border: 1.5px solid var(--border);
      border-radius: 10px; padding: .82rem 1rem; outline: none;
      transition: border-color .2s, box-shadow .2s; width: 100%;
    }
    .field input:focus, .field textarea:focus, .field select:focus {
      border-color: var(--amber); box-shadow: 0 0 0 3px rgba(180,83,9,.10);
    }

    /* ── PHOTO SLOT ── */
    .photo-slot {
      border-radius: 18px; overflow: hidden;
      background: linear-gradient(145deg, #f0ebe0, #e8e0d0);
      border: 2.5px dashed rgba(180,83,9,.30);
      display: flex; flex-direction: column;
      align-items: center; justify-content: center;
      gap: .85rem; padding: 2rem; text-align: center;
    }

    /* ── ANIMATIONS ── */
    @keyframes fadeUp   { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:translateY(0); } }
    @keyframes fadeIn   { from { opacity:0; } to { opacity:1; } }
    @keyframes slideL   { from { opacity:0; transform:translateX(-28px); } to { opacity:1; transform:translateX(0); } }
    @keyframes slideR   { from { opacity:0; transform:translateX(28px); }  to { opacity:1; transform:translateX(0); } }
    @keyframes shimmer  {
      0%   { background-position: -400px 0; }
      100% { background-position: 400px 0; }
    }
    @keyframes float {
      0%,100% { transform: translateY(0); }
      50%      { transform: translateY(-8px); }
    }
    @keyframes dotPulse {
      0%,100% { box-shadow: 0 0 0 0 rgba(34,197,94,.45); }
      60%      { box-shadow: 0 0 0 8px rgba(34,197,94,0); }
    }

    .fade-up  { opacity: 0; transition: opacity .65s ease, transform .65s ease; transform: translateY(28px); }
    .fade-up.visible  { opacity: 1; transform: translateY(0); }
    .fade-in  { opacity: 0; transition: opacity .55s ease; }
    .fade-in.visible  { opacity: 1; }
    .slide-l  { opacity: 0; transition: opacity .65s ease, transform .65s ease; transform: translateX(-28px); }
    .slide-l.visible  { opacity: 1; transform: translateX(0); }
    .slide-r  { opacity: 0; transition: opacity .65s ease, transform .65s ease; transform: translateX(28px); }
    .slide-r.visible  { opacity: 1; transform: translateX(0); }
    .delay-1 { transition-delay: .12s !important; }
    .delay-2 { transition-delay: .24s !important; }
    .delay-3 { transition-delay: .36s !important; }
    .delay-4 { transition-delay: .48s !important; }

    /* ── WHATSAPP FLOAT ── */
    .wa-float {
      position: fixed; bottom: 28px; right: 28px; z-index: 999;
      width: 56px; height: 56px; border-radius: 50%;
      background: #25d366; box-shadow: 0 6px 24px rgba(37,211,102,.4);
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; transition: transform .2s, box-shadow .2s;
      text-decoration: none; border: none;
      animation: float 3.5s ease-in-out infinite;
    }
    .wa-float:hover { transform: scale(1.1) translateY(-2px); box-shadow: 0 12px 36px rgba(37,211,102,.5); animation: none; }

    /* ── PROCESS STEPS MOBILE ── */
    @media (max-width: 600px) {
      .process-grid { grid-template-columns: 1fr 1fr !important; gap: 1rem !important; }
    }

    /* ── RESPONSIVE ── */
    @media (max-width: 860px) {
      .two-col { grid-template-columns: 1fr !important; }
      .three-col { grid-template-columns: 1fr 1fr !important; }
      .hide-mob { display: none !important; }
      .sec { padding: 64px 20px; }
      .sec-head { margin-bottom: 40px; }
    }
    @media (max-width: 540px) {
      .three-col { grid-template-columns: 1fr !important; }
      .form-row { grid-template-columns: 1fr !important; }
    }
    @media (min-width: 861px) {
      .hide-desk { display: none !important; }
    }

    /* ── NAV LINK ── */
    .nav-lnk {
      font-family: var(--body); font-size: .78rem; font-weight: 700;
      letter-spacing: .1em; text-transform: uppercase; color: var(--ink);
      background: none; border: none; cursor: pointer; padding: .28rem 0;
      border-bottom: 2px solid transparent;
      transition: color .2s, border-color .2s;
    }
    .nav-lnk:hover, .nav-lnk.on { color: var(--amber); border-bottom-color: var(--amber); }

    /* ── FOOTER LINKS ── */
    .foot-lnk {
      font-family: var(--body); font-size: .85rem; color: rgba(255,255,255,.5);
      background: none; border: none; cursor: pointer; transition: color .2s; display: block; padding: .25rem 0;
    }
    .foot-lnk:hover { color: #d97706; }

    /* ── FAQ ── */
    .faq-item {
      border: 1px solid var(--border); border-radius: 12px;
      background: var(--white); overflow: hidden;
      box-shadow: var(--shadow-s); margin-bottom: .85rem;
    }
    .faq-trigger {
      width: 100%; display: flex; justify-content: space-between; align-items: center;
      padding: 1.2rem 1.5rem; background: none; border: none; cursor: pointer; text-align: left;
      font-family: var(--body); font-weight: 600; font-size: .92rem; color: var(--ink);
      gap: 1rem;
    }
    .faq-trigger:hover { background: var(--sand); }
    .faq-body { padding: 0 1.5rem 1.2rem; font-family: var(--body); font-size: .88rem; color: var(--slate); line-height: 1.85; }

    /* ── ICON BOX ── */
    .icon-box {
      width: 52px; height: 52px; border-radius: 14px;
      background: var(--amber-gl); display: flex; align-items: center; justify-content: center;
      font-size: 1.45rem; margin-bottom: 1.1rem; flex-shrink: 0;
      border: 1px solid rgba(180,83,9,.12);
    }

    /* ── TESTIMONIAL ── */
    .testi-card { padding: 2rem; }
    .quote-mark { font-family: Georgia,serif; font-size: 3.5rem; line-height: 1; color: var(--amber); opacity: .25; margin-bottom: -.2rem; }

    /* ── MOBILE MENU OVERLAY ── */
    .mob-overlay {
      position: fixed; inset: 0; z-index: 300;
      background: var(--ink); display: flex; flex-direction: column;
      align-items: center; justify-content: center; gap: 2.2rem;
      animation: fadeIn .18s ease;
    }

    /* ── LEGAL PAGE ── */
    .legal-body h3 { font-family: var(--head); font-size: 1.3rem; margin: 2rem 0 .6rem; color: var(--ink); }
    .legal-body p, .legal-body li { font-family: var(--body); font-size: .92rem; color: var(--slate); line-height: 1.9; margin-bottom: .6rem; }
    .legal-body ul { padding-left: 1.4rem; }
    .legal-body a { color: var(--amber); }
  `}</style>
);

/* ─── SCROLL ANIMATION HOOK ─── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".fade-up, .fade-in, .slide-l, .slide-r");
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); });
    }, { threshold: 0.12 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  });
}

/* ─── DATA ─── */
const PAGES = ["Home","About","Services","Contact"];

const SERVICES = [
  {
    icon: "🎯",
    title: "Meta Ads & Paid Advertising",
    tag: "High Impact",
    desc: "I plan and run Facebook and Instagram ad campaigns that reach the right people at the right time. Whether your goal is more sales, more enquiries, or more foot traffic — every ad is built with a clear purpose and a defined audience."
  },
  {
    icon: "📱",
    title: "Social Media Management",
    tag: "Ongoing",
    desc: "Consistent posting, audience engagement, and a content plan that reflects your brand. I manage your social media accounts so you can focus on running your business while your pages stay active and professional."
  },
  {
    icon: "✍️",
    title: "Content Creation & Strategy",
    tag: "Brand Building",
    desc: "From captions to graphic ideas to monthly content calendars — I help you figure out what to say, how to say it, and when to post it. Good content builds trust before a single rupee is spent on ads."
  },
  {
    icon: "🌐",
    title: "Taking Your Business Online",
    tag: "Starter Package",
    desc: "If your business only exists offline, you're missing out on thousands of potential customers who are searching for exactly what you offer. I set up your pages, write your bio, present your products properly, and give your business a professional digital presence from scratch."
  },
];

const TESTIMONIALS = [
  {
    name: "Tanveer Hasan", role: "CEO, Bake-Well Bakery", initials: "TH", color: "#b45309",
    text: "Our online orders went up noticeably within a few weeks. The ad targeting was spot-on — we started getting customers from areas we had never reached before."
  },
  {
    name: "Abdul Hanan", role: "Marketing Manager, Amazone", initials: "AH", color: "#1d4ed8",
    text: "He asks the right questions before doing anything. The campaigns were measured, results were trackable, and communication was always clear and prompt."
  },
  {
    name: "Sana Farooq", role: "Manager, TRC", initials: "SF", color: "#be185d",
    text: "Very honest about what to expect — which I appreciated. He didn't overpromise. Our page engagement improved steadily and the content looked professional."
  },
];

const SOCIALS = [
  { label:"LinkedIn",  short:"in", href:"https://www.linkedin.com/in/muhammad-ansar-shahzad-04728a39b", bg:"#0077b5" },
  { label:"Facebook",  short:"f",  href:"https://www.facebook.com/share/1CbsHtC2xA/",               bg:"#1877f2" },
  { label:"Instagram", short:"ig", href:"https://www.instagram.com/m.ansar971",                     bg:"#e1306c" },
  { label:"Twitter/X", short:"𝕏",  href:"https://x.com/M_Ansar971",                                 bg:"#000"    },
];
const WA_LINK = "https://wa.me/923117420474";

/* ─── LOGO ─── */
function Logo({ onClick, dark = false }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:".55rem", cursor:"pointer" }} onClick={onClick}>
      <div style={{
        width:38, height:38, borderRadius:10, flexShrink:0,
        background:"linear-gradient(135deg,#111827,#1f2937)",
        display:"flex", alignItems:"center", justifyContent:"center",
        boxShadow:"0 4px 14px rgba(17,24,39,.22)",
      }}>
        <span style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:700, fontSize:"1.15rem", color:"#d97706" }}>A</span>
      </div>
      <div>
        <div style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:700, fontSize:"1.02rem", lineHeight:1.1, color: dark?"#fff":"#111827" }}>
          ansar<span style={{ color:"#b45309" }}>.me</span>
        </div>
        <div style={{ fontFamily:"'Manrope',sans-serif", fontSize:".6rem", fontWeight:800, letterSpacing:".14em", textTransform:"uppercase", color: dark?"rgba(255,255,255,.4)":"#9ca3af" }}>
          Digital Marketing
        </div>
      </div>
    </div>
  );
}

/* ─── HEADER ─── */
function Header({ page, go }) {
  const [scrolled, setScrolled] = useState(false);
  const [mob, setMob] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 36);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  useEffect(() => { window.scrollTo(0,0); }, [page]);

  return (
    <>
      <header style={{
        position:"fixed", top:0, left:0, right:0, zIndex:200,
        height:"var(--nav-h)",
        background: scrolled ? "rgba(250,248,244,.96)" : "rgba(250,248,244,.80)",
        backdropFilter:"blur(18px)",
        borderBottom: scrolled ? "1px solid rgba(17,24,39,.07)" : "1px solid transparent",
        boxShadow: scrolled ? "0 2px 16px rgba(17,24,39,.07)" : "none",
        transition:"all .28s",
      }}>
        <div style={{
          maxWidth:1100, margin:"0 auto", padding:"0 24px",
          height:"100%", display:"flex", alignItems:"center", justifyContent:"space-between",
        }}>
          <Logo onClick={() => go("Home")} />

          {/* desktop nav */}
          <nav className="hide-mob" style={{ display:"flex", gap:"2.2rem", alignItems:"center" }}>
            {PAGES.map(p => (
              <button key={p} className={`nav-lnk ${page===p?"on":""}`} onClick={() => go(p)}>{p}</button>
            ))}
            <button className="btn btn-amber" style={{ padding:".6rem 1.4rem", fontSize:".76rem" }} onClick={() => go("Contact")}>
              Free Consultation
            </button>
          </nav>

          {/* hamburger */}
          <button className="hide-desk" onClick={() => setMob(true)} style={{
            background:"none", border:"none", cursor:"pointer",
            display:"flex", flexDirection:"column", gap:"5px", padding:"6px",
          }}>
            {[0,1,2].map(i => (
              <span key={i} style={{ display:"block", width:24, height:2.5, borderRadius:2, background:"var(--ink)" }} />
            ))}
          </button>
        </div>
      </header>

      {/* mobile overlay */}
      {mob && (
        <div className="mob-overlay">
          <button onClick={() => setMob(false)} style={{
            position:"absolute", top:20, right:24,
            background:"none", border:"none", cursor:"pointer",
            color:"#fff", fontSize:"1.8rem", lineHeight:1,
          }}>✕</button>
          <Logo onClick={() => { go("Home"); setMob(false); }} dark />
          {PAGES.map(p => (
            <button key={p}
              style={{ fontFamily:"'Manrope',sans-serif", fontSize:"1.2rem", fontWeight:700, color: page===p?"#d97706":"rgba(255,255,255,.85)", background:"none", border:"none", cursor:"pointer", letterSpacing:".04em" }}
              onClick={() => { go(p); setMob(false); }}>{p}</button>
          ))}
          <button className="btn btn-amber" onClick={() => { go("Contact"); setMob(false); }}>
            Free Consultation
          </button>
        </div>
      )}
    </>
  );
}

/* ─── WHATSAPP FAB ─── */
function WAButton() {
  return (
    <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="wa-float" title="Chat on WhatsApp">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="#fff">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    </a>
  );
}

/* ─── FAQ ITEM ─── */
function FAQ({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="faq-item">
      <button className="faq-trigger" onClick={() => setOpen(o => !o)}>
        <span>{q}</span>
        <span style={{ color:"var(--amber)", fontSize:"1.3rem", flexShrink:0, transition:"transform .2s", transform: open?"rotate(45deg)":"none" }}>+</span>
      </button>
      {open && <div className="faq-body">{a}</div>}
    </div>
  );
}

/* ─── HOME PAGE ─── */
function Home({ go }) {
  useReveal();
  return (
    <div style={{ paddingTop:"var(--nav-h)" }}>

      {/* HERO */}
      <section style={{
        minHeight:"calc(100vh - var(--nav-h))", display:"flex", alignItems:"center",
        padding:"60px 24px 80px",
        background:"linear-gradient(155deg, #faf8f4 50%, #f3efe7 100%)",
        position:"relative", overflow:"hidden",
      }}>
        {/* background texture lines */}
        <div style={{
          position:"absolute", inset:0, pointerEvents:"none", opacity:.4,
          backgroundImage:"repeating-linear-gradient(0deg,transparent,transparent 59px,rgba(17,24,39,.04) 60px), repeating-linear-gradient(90deg,transparent,transparent 59px,rgba(17,24,39,.04) 60px)",
        }} />
        <div style={{
          position:"absolute", top:"-20%", right:"-12%", width:560, height:560,
          background:"radial-gradient(circle, rgba(180,83,9,.07) 0%, transparent 68%)",
          borderRadius:"50%", pointerEvents:"none",
        }} />

        <div className="wrap" style={{ position:"relative", width:"100%" }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"3.5rem", alignItems:"center" }} className="two-col">

            {/* left */}
            <div>
              <div style={{ display:"inline-flex", alignItems:"center", gap:".5rem", marginBottom:"1.3rem" }} className="fade-in">
                <span style={{
                  display:"inline-block", width:9, height:9, borderRadius:"50%", background:"#22c55e",
                  animation:"dotPulse 2s infinite",
                }} />
                <span style={{ fontFamily:"'Manrope',sans-serif", fontSize:".75rem", fontWeight:700, letterSpacing:".12em", textTransform:"uppercase", color:"#15803d" }}>
                  Open to new clients
                </span>
              </div>

              <h1 className="fade-up delay-1" style={{ fontSize:"clamp(2.4rem,5.5vw,3.8rem)", marginBottom:"1.1rem" }}>
                Helping Local Businesses<br />
                <span style={{ color:"var(--amber)", fontStyle:"italic" }}>Get Found Online</span>
              </h1>

              <p className="fade-up delay-2" style={{ fontFamily:"'Manrope',sans-serif", fontWeight:400, fontSize:"clamp(.97rem,2vw,1.1rem)", color:"var(--slate)", lineHeight:1.85, maxWidth:470, marginBottom:"2rem" }}>
                I'm <strong style={{ color:"var(--ink)", fontWeight:700 }}>Muhammad Ansar</strong> — a digital marketer from Pakistan who helps small businesses and local brands grow their customer base through Meta Ads, social media, and building an online presence that actually works.
              </p>

              <div className="fade-up delay-3" style={{ display:"flex", gap:"1rem", flexWrap:"wrap" }}>
                <button className="btn btn-amber" onClick={() => go("Services")}>Explore My Services</button>
                <button className="btn btn-border" onClick={() => go("Contact")}>Let's Talk →</button>
              </div>

              {/* trust strip */}
              <div className="fade-up delay-4" style={{
                display:"flex", gap:"1.75rem", marginTop:"2.5rem", paddingTop:"2rem",
                borderTop:"1px solid rgba(17,24,39,.08)", flexWrap:"wrap",
              }}>
                {[["15+","Clients Served"],["2+","Years Learning"],["24hr","Response Time"]].map(([n,l]) => (
                  <div key={l}>
                    <div style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:700, fontSize:"1.9rem", color:"var(--ink)", lineHeight:1 }}>{n}</div>
                    <div style={{ fontFamily:"'Manrope',sans-serif", fontSize:".72rem", fontWeight:600, letterSpacing:".09em", textTransform:"uppercase", color:"var(--mist)", marginTop:".2rem" }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* right — photo placeholder */}
            <div className="slide-r delay-1" style={{ position:"relative" }}>
              <div style={{
                position:"absolute", inset:-16, borderRadius:24,
                background:"linear-gradient(145deg, rgba(180,83,9,.08), rgba(17,24,39,.04))",
              }} />
              <div className="photo-slot" style={{ height:480, position:"relative", zIndex:1, boxShadow:"var(--shadow-l)" }}>
                <div style={{ fontSize:"3rem", opacity:.55 }}>📷</div>
                <p style={{ fontFamily:"'Manrope',sans-serif", fontWeight:700, fontSize:".82rem", color:"var(--amber)", letterSpacing:".08em", textTransform:"uppercase" }}>
                  Your Photo Here
                </p>
                <p style={{ fontFamily:"'Manrope',sans-serif", fontSize:".79rem", color:"#9ca3af", maxWidth:220, lineHeight:1.7 }}>
                  Place a professional headshot here — well-lit, plain background, looking directly at the camera.
                </p>
              </div>
              {/* floating card */}
              <div style={{
                position:"absolute", bottom:32, left:-32, zIndex:2,
                background:"var(--white)", borderRadius:14, padding:".9rem 1.2rem",
                boxShadow:"0 10px 40px rgba(17,24,39,.14)", border:"1px solid var(--border)",
                display:"flex", alignItems:"center", gap:".75rem",
              }}>
                <div style={{
                  width:38, height:38, borderRadius:10, background:"var(--amber-gl)",
                  display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.2rem",
                }}>🤝</div>
                <div>
                  <div style={{ fontFamily:"'Manrope',sans-serif", fontWeight:700, fontSize:".82rem", color:"var(--ink)" }}>Results-First Approach</div>
                  <div style={{ fontFamily:"'Manrope',sans-serif", fontSize:".7rem", color:"var(--mist)" }}>Real goals, honest strategy</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section className="sec" style={{ background:"var(--white)" }}>
        <div className="wrap">
          <div className="sec-head fade-up">
            <span className="eyebrow">What I Do</span>
            <h2>Services That Move Your Business <em style={{ fontStyle:"italic", color:"var(--amber)" }}>Forward</em></h2>
            <div className="rule" />
            <p>Practical digital marketing for businesses that want to grow — without the jargon or wasted budget.</p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:"1.5rem" }} className="two-col">
            {SERVICES.map((s,i) => (
              <div key={s.title} className={`card fade-up delay-${i+1}`} style={{ padding:"1.85rem" }}>
                <div className="icon-box">{s.icon}</div>
                <span style={{ fontFamily:"'Manrope',sans-serif", fontSize:".68rem", fontWeight:800, letterSpacing:".14em", textTransform:"uppercase", color:"var(--amber)", display:"block", marginBottom:".5rem" }}>{s.tag}</span>
                <h3 style={{ fontSize:"1.12rem", marginBottom:".65rem" }}>{s.title}</h3>
                <p style={{ fontFamily:"'Manrope',sans-serif", fontSize:".88rem", color:"var(--slate)", lineHeight:1.8 }}>{s.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign:"center", marginTop:"2.5rem" }}>
            <button className="btn btn-border fade-up" onClick={() => go("Services")}>See Full Service Details →</button>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="sec" style={{ background:"var(--sand2)" }}>
        <div className="wrap">
          <div className="sec-head fade-up">
            <span className="eyebrow">Client Feedback</span>
            <h2>What the People I've Worked With <em style={{ fontStyle:"italic", color:"var(--amber)" }}>Actually Say</em></h2>
            <div className="rule" />
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"1.5rem" }} className="three-col">
            {TESTIMONIALS.map((t,i) => (
              <div key={t.name} className={`card testi-card fade-up delay-${i+1}`}>
                <div className="quote-mark">"</div>
                <p style={{ fontFamily:"'Manrope',sans-serif", fontSize:".9rem", color:"#374151", lineHeight:1.85, fontStyle:"italic", marginBottom:"1.5rem" }}>"{t.text}"</p>
                <div style={{ display:"flex", alignItems:"center", gap:".75rem" }}>
                  <div style={{
                    width:42, height:42, borderRadius:"50%", flexShrink:0,
                    background:t.color, display:"flex", alignItems:"center", justifyContent:"center",
                    fontFamily:"'Manrope',sans-serif", fontWeight:800, fontSize:".82rem", color:"#fff",
                  }}>{t.initials}</div>
                  <div>
                    <div style={{ fontFamily:"'Manrope',sans-serif", fontWeight:700, fontSize:".88rem", color:"var(--ink)" }}>{t.name}</div>
                    <div style={{ fontFamily:"'Manrope',sans-serif", fontSize:".74rem", color:"var(--mist)" }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section style={{
        padding:"72px 24px", textAlign:"center",
        background:"linear-gradient(135deg,#111827 0%,#1f2937 100%)",
        position:"relative", overflow:"hidden",
      }}>
        <div style={{ position:"absolute", top:"-40%", right:"-10%", width:500, height:500, background:"radial-gradient(circle,rgba(180,83,9,.13) 0%,transparent 70%)", borderRadius:"50%", pointerEvents:"none" }} />
        <div style={{ position:"relative", maxWidth:580, margin:"0 auto" }}>
          <span className="eyebrow fade-up" style={{ color:"#d97706" }}>Let's Build Something</span>
          <h2 className="fade-up delay-1" style={{ color:"#fff", fontSize:"clamp(1.9rem,4vw,2.7rem)", margin:".6rem 0 1rem" }}>
            Ready to Grow Your Business Online?
          </h2>
          <p className="fade-up delay-2" style={{ fontFamily:"'Manrope',sans-serif", color:"rgba(255,255,255,.55)", lineHeight:1.85, marginBottom:"2rem" }}>
            Book a free call. No sales pitch — just an honest conversation about what's possible for your business.
          </p>
          <button className="btn btn-amber fade-up delay-3" style={{ fontSize:".92rem", padding:"1rem 2.4rem" }} onClick={() => go("Contact")}>
            Book a Free Call →
          </button>
        </div>
      </section>
    </div>
  );
}

/* ─── ABOUT PAGE ─── */
function About({ go }) {
  useReveal();
  return (
    <div style={{ paddingTop:"var(--nav-h)" }}>
      {/* page header */}
      <div style={{
        background:"linear-gradient(150deg,#111827,#1f2937)", padding:"64px 24px 56px",
        textAlign:"center", position:"relative", overflow:"hidden",
      }}>
        <div style={{ position:"absolute", top:0, left:"50%", transform:"translateX(-50%)", width:600, height:280, background:"radial-gradient(ellipse,rgba(180,83,9,.14) 0%,transparent 70%)", pointerEvents:"none" }} />
        <div style={{ position:"relative" }}>
          <span className="eyebrow" style={{ color:"#d97706" }}>About Me</span>
          <h1 style={{ color:"#fff", fontSize:"clamp(2rem,5vw,3rem)", marginTop:".5rem" }}>The Person Behind the Work</h1>
          <p style={{ fontFamily:"'Manrope',sans-serif", color:"rgba(255,255,255,.5)", maxWidth:440, margin:".9rem auto 0", lineHeight:1.85, fontSize:".95rem" }}>
            A straightforward introduction — who I am, why I do this, and how I approach my work.
          </p>
        </div>
      </div>

      {/* bio section */}
      <section className="sec" style={{ background:"var(--white)" }}>
        <div className="wrap">
          <div style={{ display:"grid", gridTemplateColumns:".85fr 1.15fr", gap:"3.5rem", alignItems:"start" }} className="two-col">
            {/* photo placeholder */}
            <div className="slide-l">
              <div className="photo-slot" style={{ height:460, boxShadow:"var(--shadow-l)" }}>
                <div style={{ fontSize:"2.8rem", opacity:.5 }}>📷</div>
                <p style={{ fontFamily:"'Manrope',sans-serif", fontWeight:700, fontSize:".82rem", color:"var(--amber)", letterSpacing:".08em", textTransform:"uppercase" }}>Your Photo Here</p>
                <p style={{ fontFamily:"'Manrope',sans-serif", fontSize:".79rem", color:"#9ca3af", maxWidth:220, lineHeight:1.7 }}>
                  Place a professional headshot here — well-lit, plain background, looking directly at the camera.
                </p>
              </div>
              {/* contact mini */}
              <div style={{ marginTop:"1.25rem", padding:"1.4rem", background:"var(--sand)", borderRadius:14, border:"1px solid var(--border)" }}>
                <div style={{ fontFamily:"'Manrope',sans-serif", fontSize:".68rem", fontWeight:800, letterSpacing:".14em", textTransform:"uppercase", color:"var(--mist)", marginBottom:".85rem" }}>Reach Me Directly</div>
                {[["📞","+92 311 7420474","tel:+923117420474"],["✉️","hello@ansar.me","mailto:hello@ansar.me"],["📍","Pakistan · Worldwide",null]].map(([ic,v,h]) => (
                  <div key={v} style={{ display:"flex", alignItems:"center", gap:".7rem", marginBottom:".65rem" }}>
                    <span>{ic}</span>
                    {h ? <a href={h} style={{ fontFamily:"'Manrope',sans-serif", fontSize:".88rem", color:"var(--amber)", fontWeight:600, textDecoration:"none" }}>{v}</a>
                       : <span style={{ fontFamily:"'Manrope',sans-serif", fontSize:".88rem", color:"var(--ink)" }}>{v}</span>}
                  </div>
                ))}
              </div>
            </div>

            {/* story */}
            <div className="slide-r">
              <span className="eyebrow">My Story</span>
              <h2 style={{ fontSize:"clamp(1.7rem,3.5vw,2.5rem)", marginBottom:"1.4rem" }}>
                Muhammad Ansar Shahzad
              </h2>
              <p style={{ fontFamily:"'Manrope',sans-serif", fontWeight:400, fontSize:".96rem", color:"var(--slate)", lineHeight:1.9, marginBottom:"1rem" }}>
                I'm a digital marketer from Pakistan, and I work with small businesses and local brands to help them get customers through social media and online advertising. I'm currently studying at Allama Iqbal Open University — but everything I know about marketing, I've learned by actually doing it.
              </p>
              <p style={{ fontFamily:"'Manrope',sans-serif", fontWeight:400, fontSize:".96rem", color:"var(--slate)", lineHeight:1.9, marginBottom:"1rem" }}>
                I started because I kept seeing the same pattern: a great business, doing good work, with barely any online presence. Their competitors — sometimes with worse products — were getting more customers simply because they showed up online. That gap felt like something I could fix.
              </p>
              <p style={{ fontFamily:"'Manrope',sans-serif", fontWeight:400, fontSize:".96rem", color:"var(--slate)", lineHeight:1.9, marginBottom:"1.75rem" }}>
                I don't pretend to have years of corporate experience. What I do have is genuine interest in this work, a habit of tracking what actually works, and the honesty to tell a client when something isn't going to deliver results. I'm still growing — and I think that's exactly why I'm a good fit for businesses that are also on their way up.
              </p>
              <div style={{ display:"flex", gap:"1rem", flexWrap:"wrap" }}>
                <button className="btn btn-amber" onClick={() => go("Services")}>See My Services</button>
                <button className="btn btn-border" onClick={() => go("Contact")}>Let's Have a Call</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* what to expect */}
      <section className="sec" style={{ background:"var(--sand2)" }}>
        <div className="wrap">
          <div className="sec-head fade-up">
            <span className="eyebrow">Working Together</span>
            <h2>What You Can Expect From Me</h2>
            <div className="rule" />
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"1.5rem" }} className="three-col">
            {[
              { icon:"🗣️", title:"Straight Talking", body:"I'll tell you what's realistic for your situation. If something isn't worth spending money on, I'll say so — even if it means less work for me." },
              { icon:"📐", title:"Deliberate Decisions", body:"I don't run campaigns on guesswork. Everything is tracked, measured, and adjusted based on what the numbers actually say." },
              { icon:"📬", title:"You'll Always Know What's Happening", body:"I send clear updates and I respond quickly. You won't be left wondering what's going on with your account." },
            ].map((v,i) => (
              <div key={v.title} className={`card fade-up delay-${i+1}`} style={{ padding:"2rem", textAlign:"center" }}>
                <div style={{ fontSize:"2rem", marginBottom:".85rem" }}>{v.icon}</div>
                <h3 style={{ fontSize:"1.05rem", marginBottom:".55rem" }}>{v.title}</h3>
                <p style={{ fontFamily:"'Manrope',sans-serif", fontSize:".87rem", color:"var(--slate)", lineHeight:1.8 }}>{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ─── SERVICES PAGE ─── */
function Services({ go }) {
  useReveal();
  const faqs = [
    { q:"What are the benefits of taking your business online?",
      a:"When your business has a proper online presence, you stop relying entirely on word-of-mouth and foot traffic. People search for products and services online every single day — and if you're not there, they find your competitor instead. Going online means you can reach customers in your city (or beyond), present your products professionally, collect reviews, run affordable ads to a targeted audience, and stay relevant in a market that's increasingly digital. It also builds credibility — most customers check a business online before deciding to visit or buy. A well-maintained page with clear information and real photos instantly builds trust that a random phone number or sign on a wall never could." },
    { q:"What are you losing by staying offline in today's world?",
      a:"Every day your business isn't online, you're missing potential customers who are actively looking for what you offer. They search, they find someone else, and they never even know you exist. Beyond lost sales, staying offline means no way to build a loyal following, no way to showcase your work or products, and no way to compete with businesses that are already running ads and collecting reviews. Your prices may be better. Your product may be better. But the business that shows up first — with a clean page, photos, and positive feedback — almost always wins. The cost of not being online isn't just lost sales today. It's a growing gap between you and competitors who are building their audience while you're standing still." },
    { q:"How much budget do I need to start with Meta Ads?",
      a:"You don't need a large budget to get started. A modest daily spend can generate meaningful results if the targeting and creative are done correctly. I'll always be upfront about what's realistic for your specific budget before any money is spent." },
    { q:"I already have a Facebook page. Can you improve it?",
      a:"Absolutely. Having a page is just the beginning. Most pages I've seen are inconsistently posted, poorly optimised, and don't convert visitors into enquiries. I can audit what you have, clean it up, and put a proper strategy in place." },
    { q:"Do I need to be tech-savvy to work with you?",
      a:"Not at all. My job is to handle the technical side so you don't have to. I'll explain things clearly when needed, but you won't need to learn anything complicated to see results." },
  ];

  return (
    <div style={{ paddingTop:"var(--nav-h)" }}>
      <div style={{
        background:"linear-gradient(150deg,#111827,#1f2937)", padding:"64px 24px 56px",
        textAlign:"center", position:"relative", overflow:"hidden",
      }}>
        <div style={{ position:"absolute", top:0, left:"50%", transform:"translateX(-50%)", width:600, height:280, background:"radial-gradient(ellipse,rgba(180,83,9,.14) 0%,transparent 70%)", pointerEvents:"none" }} />
        <div style={{ position:"relative" }}>
          <span className="eyebrow" style={{ color:"#d97706" }}>Services</span>
          <h1 style={{ color:"#fff", fontSize:"clamp(2rem,5vw,3rem)", marginTop:".5rem" }}>What I Can Do for Your Business</h1>
          <p style={{ fontFamily:"'Manrope',sans-serif", color:"rgba(255,255,255,.5)", maxWidth:480, margin:".9rem auto 0", lineHeight:1.85, fontSize:".95rem" }}>
            No packages pulled from a template. These are the specific things I actually do well — and the reasons businesses hire me.
          </p>
        </div>
      </div>

      {/* all services */}
      <section className="sec" style={{ background:"var(--white)" }}>
        <div className="wrap">
          <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:"1.75rem" }} className="two-col">
            {SERVICES.map((s,i) => (
              <div key={s.title} className={`card fade-up delay-${i+1}`} style={{ padding:"2.1rem" }}>
                <div className="icon-box">{s.icon}</div>
                <span style={{ fontFamily:"'Manrope',sans-serif", fontSize:".68rem", fontWeight:800, letterSpacing:".14em", textTransform:"uppercase", color:"var(--amber)", display:"block", marginBottom:".5rem" }}>{s.tag}</span>
                <h3 style={{ fontSize:"1.15rem", marginBottom:".7rem" }}>{s.title}</h3>
                <p style={{ fontFamily:"'Manrope',sans-serif", fontSize:".9rem", color:"var(--slate)", lineHeight:1.82 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS — 2-col mobile */}
      <section className="sec" style={{ background:"var(--sand2)" }}>
        <div className="wrap">
          <div className="sec-head fade-up">
            <span className="eyebrow">How It Works</span>
            <h2>Four Steps, One Clear Direction</h2>
            <div className="rule" />
            <p>From first conversation to ongoing results — here's what working together actually looks like.</p>
          </div>
          <div className="process-grid" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"1.5rem" }}>
            {[
              { n:"01", icon:"☎️", title:"Free Discovery Call", body:"We talk through your business, your goals, and what you've tried before. No pitch, no pressure — just a real conversation." },
              { n:"02", icon:"🗺️", title:"Strategy & Plan", body:"I put together a focused plan based on your budget and business type. You'll know exactly what will be done and why." },
              { n:"03", icon:"⚙️", title:"Setup & Execution", body:"I handle the technical work — setting up campaigns, creating content, launching ads — so you don't have to manage any of it." },
              { n:"04", icon:"📈", title:"Review & Improve", body:"You get regular updates. We look at what the numbers say, keep what's working, and adjust what isn't." },
            ].map((p,i) => (
              <div key={p.n} className={`card fade-up delay-${i+1}`} style={{ padding:"1.75rem" }}>
                <div style={{
                  width:44, height:44, borderRadius:"50%",
                  background:"linear-gradient(135deg,var(--amber),var(--amber-lt))",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontFamily:"'Manrope',sans-serif", fontWeight:800, fontSize:".78rem", color:"#fff",
                  marginBottom:"1rem",
                }}>{p.n}</div>
                <div style={{ fontSize:"1.5rem", marginBottom:".7rem" }}>{p.icon}</div>
                <h3 style={{ fontSize:"1rem", marginBottom:".55rem" }}>{p.title}</h3>
                <p style={{ fontFamily:"'Manrope',sans-serif", fontSize:".85rem", color:"var(--slate)", lineHeight:1.8 }}>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="sec" style={{ background:"var(--white)" }}>
        <div className="wrap">
          <div className="sec-head fade-up">
            <span className="eyebrow">FAQ</span>
            <h2>Questions Worth Answering Honestly</h2>
            <div className="rule" />
          </div>
          <div style={{ maxWidth:740, margin:"0 auto" }} className="fade-up">
            {faqs.map((f,i) => <FAQ key={i} q={f.q} a={f.a} />)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding:"72px 24px", textAlign:"center", background:"linear-gradient(135deg,#111827,#1f2937)" }}>
        <div style={{ maxWidth:560, margin:"0 auto" }}>
          <h2 className="fade-up" style={{ color:"#fff", fontSize:"clamp(1.8rem,4vw,2.6rem)", marginBottom:"1rem" }}>Not Sure Where to Start?</h2>
          <p className="fade-up delay-1" style={{ fontFamily:"'Manrope',sans-serif", color:"rgba(255,255,255,.5)", lineHeight:1.85, marginBottom:"2rem" }}>
            Tell me about your business and I'll recommend what would actually help — even if it's not something I offer.
          </p>
          <button className="btn btn-amber fade-up delay-2" style={{ fontSize:".92rem", padding:"1rem 2.4rem" }} onClick={() => go("Contact")}>
            Get Free Advice →
          </button>
        </div>
      </section>
    </div>
  );
}

/* ─── CONTACT PAGE ─── */
function Contact() {
  useReveal();
  const [form, setForm] = useState({ name:"", email:"", phone:"", service:"", message:"" });
  const [sent, setSent] = useState(false);
  const set = (k,v) => setForm(f => ({ ...f, [k]:v }));
  const submit = e => { e.preventDefault(); setSent(true); setForm({ name:"", email:"", phone:"", service:"", message:"" }); };

  return (
    <div style={{ paddingTop:"var(--nav-h)" }}>
      <div style={{
        background:"linear-gradient(150deg,#111827,#1f2937)", padding:"64px 24px 56px",
        textAlign:"center", position:"relative", overflow:"hidden",
      }}>
        <div style={{ position:"absolute", top:0, left:"50%", transform:"translateX(-50%)", width:600, height:280, background:"radial-gradient(ellipse,rgba(180,83,9,.14) 0%,transparent 70%)", pointerEvents:"none" }} />
        <div style={{ position:"relative" }}>
          <span className="eyebrow" style={{ color:"#d97706" }}>Contact</span>
          <h1 style={{ color:"#fff", fontSize:"clamp(2rem,5vw,3rem)", marginTop:".5rem" }}>Let's Have a Real Conversation</h1>
          <p style={{ fontFamily:"'Manrope',sans-serif", color:"rgba(255,255,255,.5)", maxWidth:430, margin:".9rem auto 0", lineHeight:1.85, fontSize:".95rem" }}>
            Whether you have a question or want to get started — I'm easy to reach and quick to respond.
          </p>
        </div>
      </div>

      <section className="sec" style={{ background:"var(--white)" }}>
        <div className="wrap">
          <div style={{ display:"grid", gridTemplateColumns:".85fr 1.15fr", gap:"3rem", alignItems:"start" }} className="two-col">

            {/* info */}
            <div className="slide-l">
              <h2 style={{ fontSize:"1.5rem", marginBottom:"1.5rem" }}>My Contact Details</h2>
              <div style={{ display:"flex", flexDirection:"column", gap:".85rem", marginBottom:"2rem" }}>
                {[
                  ["📞","Phone","+92 311 7420474","tel:+923117420474"],
                  ["✉️","Email","hello@ansar.me","mailto:hello@ansar.me"],
                  ["💬","WhatsApp","Chat with me directly",WA_LINK],
                  ["📍","Location","Pakistan · Available Worldwide",null],
                  ["⏱️","Response Time","Within 24 hours",null],
                ].map(([ic,lbl,val,href]) => (
                  <div key={lbl} style={{
                    display:"flex", gap:".9rem", alignItems:"center",
                    padding:"1rem 1.2rem", borderRadius:12,
                    background:"var(--sand)", border:"1px solid var(--border)",
                  }}>
                    <span style={{ fontSize:"1.2rem" }}>{ic}</span>
                    <div>
                      <div style={{ fontFamily:"'Manrope',sans-serif", fontSize:".68rem", fontWeight:800, letterSpacing:".12em", textTransform:"uppercase", color:"var(--mist)" }}>{lbl}</div>
                      {href
                        ? <a href={href} target={href.startsWith("http")?"_blank":undefined} rel="noopener noreferrer" style={{ fontFamily:"'Manrope',sans-serif", fontWeight:600, fontSize:".88rem", color:"var(--amber)", textDecoration:"none" }}>{val}</a>
                        : <div style={{ fontFamily:"'Manrope',sans-serif", fontWeight:600, fontSize:".88rem", color:"var(--ink)" }}>{val}</div>}
                    </div>
                  </div>
                ))}
              </div>
              <div>
                <div style={{ fontFamily:"'Manrope',sans-serif", fontSize:".68rem", fontWeight:800, letterSpacing:".14em", textTransform:"uppercase", color:"var(--mist)", marginBottom:".9rem" }}>Find Me On</div>
                <div style={{ display:"flex", gap:".6rem", flexWrap:"wrap" }}>
                  {SOCIALS.map(s => (
                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" style={{
                      display:"flex", alignItems:"center", gap:".45rem",
                      padding:".55rem 1rem", borderRadius:9,
                      background:"var(--sand)", border:"1px solid var(--border)",
                      textDecoration:"none", color:"var(--ink)",
                      fontFamily:"'Manrope',sans-serif", fontWeight:700, fontSize:".78rem",
                      transition:"all .2s",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = s.bg; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = s.bg; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "var(--sand)"; e.currentTarget.style.color = "var(--ink)"; e.currentTarget.style.borderColor = "var(--border)"; }}
                    ><span>{s.short}</span> {s.label}</a>
                  ))}
                  <a href={WA_LINK} target="_blank" rel="noopener noreferrer" style={{
                    display:"flex", alignItems:"center", gap:".45rem",
                    padding:".55rem 1rem", borderRadius:9,
                    background:"#25d366", border:"1px solid #25d366",
                    textDecoration:"none", color:"#fff",
                    fontFamily:"'Manrope',sans-serif", fontWeight:700, fontSize:".78rem",
                  }}>💬 WhatsApp</a>
                </div>
              </div>
            </div>

            {/* form */}
            <div className="slide-r" style={{
              background:"var(--sand)", border:"1px solid var(--border)",
              borderRadius:20, padding:"2.2rem",
              boxShadow:"var(--shadow-m)",
            }}>
              {sent ? (
                <div style={{ textAlign:"center", padding:"3rem 1rem" }}>
                  <div style={{ fontSize:"3.5rem", marginBottom:"1rem" }}>✅</div>
                  <h3 style={{ fontSize:"1.5rem", marginBottom:".75rem" }}>Message Sent!</h3>
                  <p style={{ fontFamily:"'Manrope',sans-serif", color:"var(--slate)", lineHeight:1.8 }}>Thank you for reaching out. I'll reply within 24 hours.</p>
                  <button className="btn btn-border" style={{ marginTop:"1.5rem" }} onClick={() => setSent(false)}>Send Another</button>
                </div>
              ) : (
                <form onSubmit={submit} style={{ display:"flex", flexDirection:"column", gap:"1.1rem" }}>
                  <h3 style={{ fontSize:"1.25rem", marginBottom:".2rem" }}>Send Me a Message</h3>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1rem" }} className="form-row">
                    <div className="field">
                      <label>Your Name</label>
                      <input type="text" required placeholder="Ali Hassan" value={form.name} onChange={e=>set("name",e.target.value)} />
                    </div>
                    <div className="field">
                      <label>Phone (optional)</label>
                      <input type="tel" placeholder="+92 300 0000000" value={form.phone} onChange={e=>set("phone",e.target.value)} />
                    </div>
                  </div>
                  <div className="field">
                    <label>Email Address</label>
                    <input type="email" required placeholder="you@example.com" value={form.email} onChange={e=>set("email",e.target.value)} />
                  </div>
                  <div className="field">
                    <label>What do you need help with?</label>
                    <select value={form.service} onChange={e=>set("service",e.target.value)}>
                      <option value="">Choose a service (optional)</option>
                      {SERVICES.map(s => <option key={s.title} value={s.title}>{s.title}</option>)}
                      <option value="Not sure yet">Not sure yet</option>
                    </select>
                  </div>
                  <div className="field">
                    <label>Tell Me About Your Business</label>
                    <textarea rows={4} required placeholder="What do you do, who are your customers, and what would you like to achieve?" value={form.message} onChange={e=>set("message",e.target.value)} style={{ resize:"vertical" }} />
                  </div>
                  <button type="submit" className="btn btn-amber" style={{ justifyContent:"center", fontSize:".88rem", padding:".9rem" }}>
                    Send Message →
                  </button>
                  <p style={{ fontFamily:"'Manrope',sans-serif", fontSize:".73rem", color:"var(--mist)", textAlign:"center" }}>
                    Your information is kept private and never shared. I typically reply within one business day.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ─── TERMS PAGE ─── */
function Terms({ go }) {
  useReveal();
  return (
    <div style={{ paddingTop:"var(--nav-h)" }}>
      <div style={{ background:"linear-gradient(150deg,#111827,#1f2937)", padding:"52px 24px 44px", textAlign:"center" }}>
        <span className="eyebrow" style={{ color:"#d97706" }}>Legal</span>
        <h1 style={{ color:"#fff", fontSize:"clamp(1.8rem,4vw,2.6rem)", marginTop:".5rem" }}>Terms & Conditions</h1>
        <p style={{ fontFamily:"'Manrope',sans-serif", color:"rgba(255,255,255,.45)", marginTop:".8rem", fontSize:".88rem" }}>Last updated: May 2025</p>
      </div>
      <section className="sec" style={{ background:"var(--white)" }}>
        <div className="wrap" style={{ maxWidth:780 }}>
          <div className="legal-body fade-up">
            <p>By engaging Muhammad Ansar Shahzad ("the Service Provider") for any digital marketing services, you agree to the following terms. Please read them carefully before committing to any service.</p>
            <h3>1. Services Provided</h3>
            <p>Services include Meta Ads & Paid Advertising, Social Media Management, Content Creation & Strategy, and building online presence for offline businesses. All services are delivered remotely unless otherwise agreed.</p>
            <h3>2. Payment Terms</h3>
            <p>Payment terms will be agreed upon in writing before work begins. The Service Provider reserves the right to pause or discontinue services in the event of non-payment. No refunds will be issued for work already completed.</p>
            <h3>3. Client Responsibilities</h3>
            <ul>
              <li>Providing accurate business information and timely feedback.</li>
              <li>Granting access to any social media pages or ad accounts necessary for the service.</li>
              <li>Ensuring that products, services, and promotional claims comply with Meta's advertising policies and applicable local laws.</li>
            </ul>
            <h3>4. Ad Spend & Third-Party Platforms</h3>
            <p>Any advertising budget paid to Meta (Facebook/Instagram) is separate from the service fee. The Service Provider does not control Meta's policies, ad approval decisions, or platform changes. Results are not guaranteed, as ad performance depends on multiple factors including market conditions, budget, and audience.</p>
            <h3>5. Confidentiality</h3>
            <p>All business information shared by the client will be kept strictly confidential and will not be disclosed to any third party without explicit written consent.</p>
            <h3>6. Intellectual Property</h3>
            <p>Content created for the client becomes the client's property upon full payment. The Service Provider retains the right to reference the work in a portfolio unless the client requests otherwise in writing.</p>
            <h3>7. Termination</h3>
            <p>Either party may terminate the agreement with 7 days' written notice. Any work completed up to the point of termination will be invoiced accordingly.</p>
            <h3>8. Limitation of Liability</h3>
            <p>The Service Provider is not liable for any indirect or consequential losses arising from the use of digital marketing services, including changes to platform algorithms, account suspensions by third-party platforms, or market fluctuations.</p>
            <h3>9. Governing Law</h3>
            <p>These terms are governed by the laws of Pakistan. Any disputes will be resolved through mutual discussion in good faith before any formal action is considered.</p>
            <h3>10. Contact</h3>
            <p>For any questions regarding these terms, contact: <a href="mailto:hello@ansar.me">hello@ansar.me</a></p>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ─── PRIVACY PAGE ─── */
function Privacy({ go }) {
  useReveal();
  return (
    <div style={{ paddingTop:"var(--nav-h)" }}>
      <div style={{ background:"linear-gradient(150deg,#111827,#1f2937)", padding:"52px 24px 44px", textAlign:"center" }}>
        <span className="eyebrow" style={{ color:"#d97706" }}>Legal</span>
        <h1 style={{ color:"#fff", fontSize:"clamp(1.8rem,4vw,2.6rem)", marginTop:".5rem" }}>Privacy Policy</h1>
        <p style={{ fontFamily:"'Manrope',sans-serif", color:"rgba(255,255,255,.45)", marginTop:".8rem", fontSize:".88rem" }}>Last updated: May 2025</p>
      </div>
      <section className="sec" style={{ background:"var(--white)" }}>
        <div className="wrap" style={{ maxWidth:780 }}>
          <div className="legal-body fade-up">
            <p>This Privacy Policy describes how Muhammad Ansar Shahzad ("I", "me") collects, uses, and protects the personal information you share when you contact me or engage my services through <a href="https://ansar.me">ansar.me</a>.</p>
            <h3>1. What Information I Collect</h3>
            <ul>
              <li>Your name, email address, and phone number when you contact me via the website form or WhatsApp.</li>
              <li>Business information you voluntarily share during discussions.</li>
              <li>Access credentials to social media or ad accounts, only when required for the service and with your explicit permission.</li>
            </ul>
            <h3>2. How I Use Your Information</h3>
            <ul>
              <li>To respond to your enquiries and deliver the agreed services.</li>
              <li>To send project updates, reports, or invoices related to your account.</li>
              <li>I do not use your information for unrelated marketing without your consent.</li>
            </ul>
            <h3>3. Data Sharing</h3>
            <p>I do not sell, rent, or share your personal information with third parties, except where required to deliver the service (for example, accessing Meta Business Suite on your behalf). Any third-party platforms used are subject to their own privacy policies.</p>
            <h3>4. Data Retention</h3>
            <p>Your information is retained only for as long as necessary to deliver the service and fulfil any legal obligations. You may request deletion of your data at any time by contacting me directly.</p>
            <h3>5. Security</h3>
            <p>I take reasonable steps to protect your information. Access credentials shared for service purposes are stored securely and revoked after the service period unless you choose otherwise.</p>
            <h3>6. Your Rights</h3>
            <p>You have the right to access, correct, or request deletion of any personal data I hold about you. To exercise these rights, please email: <a href="mailto:hello@ansar.me">hello@ansar.me</a></p>
            <h3>7. Cookies & Website Analytics</h3>
            <p>This website does not currently use cookies or analytics tracking tools. If this changes, this policy will be updated accordingly.</p>
            <h3>8. Changes to This Policy</h3>
            <p>This policy may be updated from time to time. The date at the top of this page reflects the most recent revision.</p>
            <h3>9. Contact</h3>
            <p>For any privacy-related questions: <a href="mailto:hello@ansar.me">hello@ansar.me</a> · <a href={WA_LINK} target="_blank" rel="noopener noreferrer">WhatsApp</a></p>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ─── FOOTER ─── */
function Footer({ go }) {
  return (
    <footer style={{ background:"#111827", color:"rgba(255,255,255,.45)", paddingTop:"56px" }}>
      <div className="wrap" style={{ padding:"0 24px" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1.4fr 1fr 1fr", gap:"2.5rem", paddingBottom:"48px" }} className="three-col">
          {/* brand */}
          <div>
            <Logo onClick={() => go("Home")} dark />
            <p style={{ fontFamily:"'Manrope',sans-serif", fontSize:".85rem", lineHeight:1.85, maxWidth:260, marginTop:"1.1rem" }}>
              Helping local businesses and small brands grow through honest, practical digital marketing.
            </p>
            {/* socials */}
            <div style={{ display:"flex", gap:".6rem", marginTop:"1.3rem", flexWrap:"wrap" }}>
              {SOCIALS.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  style={{
                    width:36, height:36, borderRadius:9,
                    background:"rgba(255,255,255,.07)", border:"1px solid rgba(255,255,255,.1)",
                    display:"flex", alignItems:"center", justifyContent:"center",
                    textDecoration:"none", color:"rgba(255,255,255,.55)",
                    fontFamily:"'Manrope',sans-serif", fontWeight:700, fontSize:".74rem",
                    transition:"all .2s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = s.bg; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = s.bg; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,.07)"; e.currentTarget.style.color = "rgba(255,255,255,.55)"; e.currentTarget.style.borderColor = "rgba(255,255,255,.1)"; }}
                >{s.short}</a>
              ))}
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer" style={{
                width:36, height:36, borderRadius:9,
                background:"#25d366", border:"1px solid #25d366",
                display:"flex", alignItems:"center", justifyContent:"center",
                textDecoration:"none", color:"#fff", fontSize:"1rem",
                transition:"all .2s",
              }}>💬</a>
            </div>
          </div>

          {/* pages */}
          <div>
            <div style={{ fontFamily:"'Manrope',sans-serif", fontSize:".68rem", fontWeight:800, letterSpacing:".16em", textTransform:"uppercase", color:"rgba(255,255,255,.25)", marginBottom:"1.1rem" }}>Pages</div>
            {PAGES.map(p => (
              <button key={p} className="foot-lnk" onClick={() => go(p)}>{p}</button>
            ))}
          </div>

          {/* contact */}
          <div>
            <div style={{ fontFamily:"'Manrope',sans-serif", fontSize:".68rem", fontWeight:800, letterSpacing:".16em", textTransform:"uppercase", color:"rgba(255,255,255,.25)", marginBottom:"1.1rem" }}>Get in Touch</div>
            <a href="tel:+923117420474" style={{ fontFamily:"'Manrope',sans-serif", fontSize:".85rem", color:"rgba(255,255,255,.5)", display:"block", marginBottom:".4rem", textDecoration:"none" }}>+92 311 7420474</a>
            <a href="mailto:hello@ansar.me" style={{ fontFamily:"'Manrope',sans-serif", fontSize:".85rem", color:"rgba(255,255,255,.5)", display:"block", marginBottom:".4rem", textDecoration:"none" }}>hello@ansar.me</a>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" style={{ fontFamily:"'Manrope',sans-serif", fontSize:".85rem", color:"#4ade80", display:"block", textDecoration:"none" }}>WhatsApp →</a>
          </div>
        </div>

        {/* bottom bar */}
        <div style={{ borderTop:"1px solid rgba(255,255,255,.07)", padding:"20px 0", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:".75rem" }}>
          <p style={{ fontFamily:"'Manrope',sans-serif", fontSize:".76rem" }}>
            © 2025 Muhammad Ansar Shahzad · ansar.me
          </p>
          <div style={{ display:"flex", gap:"1.5rem" }}>
            <button className="foot-lnk" style={{ fontSize:".76rem" }} onClick={() => go("Terms")}>Terms & Conditions</button>
            <button className="foot-lnk" style={{ fontSize:".76rem" }} onClick={() => go("Privacy")}>Privacy Policy</button>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─── APP ROOT ─── */
export default function App() {
  const [page, setPage] = useState("Home");
  const go = useCallback((p) => { setPage(p); window.scrollTo({ top:0, behavior:"smooth" }); }, []);

  return (
    <div style={{ minHeight:"100vh", display:"flex", flexDirection:"column" }}>
      <GlobalStyles />
      <Header page={page} go={go} />
      <main style={{ flex:1 }}>
        {page==="Home"    && <Home     go={go} />}
        {page==="About"   && <About    go={go} />}
        {page==="Services"&& <Services go={go} />}
        {page==="Contact" && <Contact          />}
        {page==="Terms"   && <Terms    go={go} />}
        {page==="Privacy" && <Privacy  go={go} />}
      </main>
      <Footer go={go} />
      <WAButton />
    </div>
  );
}
