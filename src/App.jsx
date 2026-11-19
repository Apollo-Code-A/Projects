import DiscoveryMap from "./components/DiscoveryMap";
import { useEffect, useState } from "react";
import {
  Compass, MapPin, Globe2, Menu, X, ArrowRight,
  Leaf, Award, BookOpen, LogOut, User, Lock,
  Mail, CheckCircle2, Sparkles
} from "lucide-react";
import { supabase } from "./supabase";
import "./App.css";

const translations = {
  en: {
    nav: ["Discover", "Our mission", "My passport"],
    eyebrow: "YOUR ISLAND. YOUR ADVENTURE.",
    title: "Don't just visit Curaçao.",
    accent: "Discover it.",
    description: "Explore hidden gems, experience our culture and help protect the island we call home.",
    explore: "Start exploring",
    learn: "Our story",
    kit: "Your adventure starts here",
    kitText: "Every discovery brings you closer to the heart of Curaçao.",
    map: "Discover the island",
    mapText: "Find beautiful places, local culture and unforgettable experiences.",
    passport: "Your digital passport",
    passportText: "Collect stamps as you complete island missions.",
    rewards: "Earn your rewards",
    rewardsText: "Every completed challenge brings a new achievement.",
    missions: "Island missions",
    missionsText: "Small adventures. Big discoveries.",
    complete: "Complete mission",
    completed: "Completed",
    progress: "Your progress",
    stamps: "Stamps earned",
    login: "Log in",
    signup: "Create account",
    name: "Your name",
    email: "Email address",
    password: "Password",
    welcome: "Welcome back!",
    create: "Join the adventure",
    logout: "Log out",
    noAccount: "Don't have an account?",
    hasAccount: "Already have an account?",
    signupHere: "Sign up",
    loginHere: "Log in",
    loginRequired: "Log in to collect your passport stamps.",
    success: "Your adventure is underway!",
    checkEmail: "Check your email to confirm your account.",
    about: "More than a tourist experience",
    aboutText: "We connect visitors with the culture, communities and natural beauty of Curaçao through meaningful adventures.",
    culture: "Experience culture",
    community: "Support local communities",
    nature: "Protect our nature",
    footer: "Discover. Experience. Protect.",
    allMissions: "All missions",
    loading: "Loading your adventure...",
    error: "Something went wrong. Please try again.",
    alreadyDone: "You've already completed this mission."
  },
  pap: {
    nav: ["Deskubrí", "Nos propósito", "Mi pasport"],
    eyebrow: "BO ISLA. BO AVENTURA.",
    title: "No solamente bishitá Kòrsou.",
    accent: "Deskubrí dje.",
    description: "Eksplorá lugánan skondí, eksperensiá nos kultura i yuda protehá e isla ku nos ta yama kas.",
    explore: "Kuminsá eksplorá",
    learn: "Nos historia",
    kit: "Bo aventura ta kuminsá aki",
    kitText: "Kada deskubrimentu ta hiba bo mas serka di kurason di Kòrsou.",
    map: "Deskubrí e isla",
    mapText: "Topa lugánan bunita, kultura lokal i eksperensianan inolvidabel.",
    passport: "Bo pasport digital",
    passportText: "Rekolektá sello ora bo kompletá reto di e isla.",
    rewards: "Gana bo premio",
    rewardsText: "Kada reto kompletá ta trese un logro nobo.",
    missions: "Retonan di e isla",
    missionsText: "Pequeño aventuranan. Grandi deskubrimentunan.",
    complete: "Kompletá reto",
    completed: "Kompletá",
    progress: "Bo progreso",
    stamps: "Seyonan gana",
    login: "Drenta",
    signup: "Krea kuenta",
    name: "Bo nòmber",
    email: "Direkshon di email",
    password: "Kontraseña",
    welcome: "Bon biní bèk!",
    create: "Hasi parti di e aventura",
    logout: "Sali",
    noAccount: "Bo no tin kuenta?",
    hasAccount: "Ya bo tin kuenta?",
    signupHere: "Registrá",
    loginHere: "Drenta",
    loginRequired: "Drenta pa kolektá bo seyonan di pasport.",
    success: "Bo aventura a kuminsá!",
    checkEmail: "Kontrolá bo email pa konfirmá bo kuenta.",
    about: "Mas ku un eksperensia turistiko",
    aboutText: "Nos ta konektá bishitantenan ku kultura, komunidat i naturalesa di Kòrsou.",
    culture: "Eksperensiá kultura",
    community: "Apoyá komunidat lokal",
    nature: "Protehá nos naturalesa",
    footer: "Deskubrí. Eksperensiá. Protehá.",
    allMissions: "Tur e reto nan",
    loading: "Kargando bo aventura...",
    error: "Algu a bai robes. Purba atrobe.",
    alreadyDone: "Ya bo a kompletá e reto aki."
  },
  nl: {
    nav: ["Ontdekken", "Onze missie", "Mijn paspoort"],
    eyebrow: "JOUW EILAND. JOUW AVONTUUR.",
    title: "Bezoek Curaçao niet alleen.",
    accent: "Ontdek het.",
    description: "Ontdek verborgen parels, beleef onze cultuur en help het eiland beschermen.",
    explore: "Begin met ontdekken",
    learn: "Ons verhaal",
    kit: "Jouw avontuur begint hier",
    kitText: "Elke ontdekking brengt je dichter bij het hart van Curaçao.",
    map: "Ontdek het eiland",
    mapText: "Vind bijzondere plekken, lokale cultuur en onvergetelijke ervaringen.",
    passport: "Jouw digitale paspoort",
    passportText: "Verzamel stempels door eilandmissies te voltooien.",
    rewards: "Verdien beloningen",
    rewardsText: "Elke voltooide uitdaging levert een nieuwe prestatie op.",
    missions: "Eilandmissies",
    missionsText: "Kleine avonturen. Grote ontdekkingen.",
    complete: "Voltooi missie",
    completed: "Voltooid",
    progress: "Jouw voortgang",
    stamps: "Verdiende stempels",
    login: "Inloggen",
    signup: "Account aanmaken",
    name: "Jouw naam",
    email: "E-mailadres",
    password: "Wachtwoord",
    welcome: "Welkom terug!",
    create: "Begin het avontuur",
    logout: "Uitloggen",
    noAccount: "Nog geen account?",
    hasAccount: "Heb je al een account?",
    signupHere: "Registreren",
    loginHere: "Inloggen",
    loginRequired: "Log in om paspoortstempels te verzamelen.",
    success: "Jouw avontuur is begonnen!",
    checkEmail: "Controleer je e-mail om je account te bevestigen.",
    about: "Meer dan een toeristische ervaring",
    aboutText: "We verbinden bezoekers met de cultuur, gemeenschappen en natuur van Curaçao.",
    culture: "Beleef de cultuur",
    community: "Steun lokale gemeenschappen",
    nature: "Bescherm onze natuur",
    footer: "Ontdek. Beleef. Bescherm.",
    allMissions: "Alle missies",
    loading: "Je avontuur wordt geladen...",
    error: "Er ging iets mis. Probeer het opnieuw.",
    alreadyDone: "Je hebt deze missie al voltooid."
  }
};

const categoryIcons = {
  culture: "🎨",
  language: "💬",
  community: "🤝",
  nature: "🌿",
  exploration: "🧭"
};

const categoryImages = {
  culture: "https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=700",
  language: "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=700",
  community: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=700",
  nature: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=700",
  exploration: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=700"
};

export default function App() {
  const [language, setLanguage] = useState("en");
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [missions, setMissions] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState("signup");
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", password: ""
  });

  const t = translations[language];

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (mounted) setSession(data.session);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        if (mounted) setSession(newSession);
      }
    );

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    async function loadPublicMissions() {
      const { data, error } = await supabase
        .from("missions")
        .select("*")
        .eq("is_active", true)
        .order("created_at");

      if (!error) setMissions(data || []);
      else console.error(error.message);

      setLoading(false);
    }
    loadPublicMissions();
  }, []);

  useEffect(() => {
    if (!session) {
      setProfile(null);
      setCompleted([]);
      return;
    }

    async function loadUserData() {
      const [profileResult, progressResult] = await Promise.all([
        supabase.from("profiles").select("*")
          .eq("id", session.user.id).maybeSingle(),
        supabase.from("user_missions").select("mission_id")
          .eq("user_id", session.user.id)
      ]);

      if (profileResult.error) console.error(profileResult.error.message);
      else setProfile(profileResult.data);

      if (progressResult.error) console.error(progressResult.error.message);
      else setCompleted((progressResult.data || []).map(row => row.mission_id));
    }

    loadUserData();
  }, [session]);

  async function handleAuth(event) {
    event.preventDefault();
    setBusy(true);
    setNotice("");

    try {
      if (authMode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email: form.email,
          password: form.password,
          options: {
            data: { display_name: form.name },
            emailRedirectTo: window.location.origin
          }
        });
        if (error) throw error;

        if (!data.session) {
          setNotice(t.checkEmail);
        } else {
          setNotice(t.success);
          setAuthOpen(false);
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: form.email,
          password: form.password
        });
        if (error) throw error;
        setAuthOpen(false);
      }
    } catch (error) {
      setNotice(error.message || t.error);
    } finally {
      setBusy(false);
    }
  }

  async function logout() {
    const { error } = await supabase.auth.signOut();
    if (error) setNotice(error.message);
    else setNotice("");
  }

  async function completeMission(missionId) {
    if (!session) {
      setAuthMode("signup");
      setAuthOpen(true);
      setNotice(t.loginRequired);
      return;
    }

    if (completed.includes(missionId)) {
      setNotice(t.alreadyDone);
      return;
    }

    setBusy(true);
    setNotice("");

    const { data, error } = await supabase.rpc("complete_mission", {
      p_mission_id: missionId
    });

    if (error) {
      setNotice(error.message);
    } else if (data?.success) {
      setCompleted(previous => [...previous, missionId]);
      setNotice(data.message);
    } else {
      setNotice(data?.message || t.error);
    }

    setBusy(false);
  }

  async function changeLanguage(nextLanguage) {
    setLanguage(nextLanguage);
    if (session) {
      const { error } = await supabase.from("profiles")
        .update({ preferred_language: nextLanguage })
        .eq("id", session.user.id);
      if (error) console.error(error.message);
    }
  }

  function localized(value) {
    if (!value) return "";
    return value[language] || value.en || Object.values(value)[0] || "";
  }

  const stamps = completed.length;
  const progress = missions.length
    ? Math.round((stamps / missions.length) * 100)
    : 0;

  return (
    <div className="app">
      <header className="navbar">
        <a href="#home" className="brand">
          <span className="brand-mark"><Compass size={25}/></span>
          <span>DUSHI <b>ISLAND</b><small>EXPERIENCE</small></span>
        </a>

        <nav className={mobileMenu ? "nav-links open" : "nav-links"}>
          <a href="#discover" onClick={() => setMobileMenu(false)}>{t.nav[0]}</a>
          <a href="#about" onClick={() => setMobileMenu(false)}>{t.nav[1]}</a>
          <a href="#passport" onClick={() => setMobileMenu(false)}>{t.nav[2]}</a>
        </nav>

        <div className="nav-actions">
          <div className="language-picker">
            <Globe2 size={16}/>
            <select value={language} onChange={e => changeLanguage(e.target.value)} aria-label="Language">
              <option value="en">EN</option>
              <option value="pap">PAP</option>
              <option value="nl">NL</option>
            </select>
          </div>
          {session ? (
            <button className="nav-button logged-in" onClick={logout}>
              <LogOut size={16}/> {t.logout}
            </button>
          ) : (
            <button className="nav-button" onClick={() => {
              setAuthMode("signup"); setAuthOpen(true); setNotice("");
            }}>{t.signup}</button>
          )}
        </div>

        <button className="mobile-toggle" onClick={() => setMobileMenu(!mobileMenu)} aria-label="Toggle menu">
          {mobileMenu ? <X/> : <Menu/>}
        </button>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-shade"/>
          <div className="hero-content">
            <div className="eyebrow"><span/> {t.eyebrow}</div>
            <h1>{t.title}<br/><em>{t.accent}</em></h1>
            <p>{t.description}</p>
            <div className="hero-buttons">
              <a href="#discover" className="primary-button">{t.explore} <ArrowRight size={18}/></a>
              <a href="#about" className="secondary-button">{t.learn}</a>
            </div>
            <div className="hero-note"><Leaf size={16}/> {t.footer}</div>
          </div>
          <div className="hero-location"><MapPin size={15}/> CURAÇAO · DUTCH CARIBBEAN</div>
          <div className="hero-scroll">SCROLL TO DISCOVER <span/></div>
        </section>

	<DiscoveryMap />	
	
        <section className="intro section-wrap" id="discover">
          <div className="section-kicker">01 / {t.nav[0]}</div>
          <div className="intro-heading">
            <div>
              <h2>{t.kit}</h2>
              <p>{t.kitText}</p>
            </div>
            <span className="sun-symbol">✳</span>
          </div>

          <div className="feature-grid">
            <article className="feature-card map-card">
              <div className="feature-icon"><Compass/></div>
              <span className="feature-number">01 — EXPLORE</span>
              <h3>{t.map}</h3>
              <p>{t.mapText}</p>
              <span className="feature-emoji">🗺️</span>
            </article>
            <article className="feature-card passport-card">
              <div className="feature-icon"><BookOpen/></div>
              <span className="feature-number">02 — COLLECT</span>
              <h3>{t.passport}</h3>
              <p>{t.passportText}</p>
              <span className="feature-emoji">📖</span>
            </article>
            <article className="feature-card reward-card">
              <div className="feature-icon"><Award/></div>
              <span className="feature-number">03 — EARN</span>
              <h3>{t.rewards}</h3>
              <p>{t.rewardsText}</p>
              <span className="feature-emoji">🏅</span>
            </article>
          </div>
        </section>

        <section className="about-section" id="about">
          <div className="about-image">
            <div className="image-caption"><MapPin size={15}/> KÒRSOU, NOS ISLA</div>
          </div>
          <div className="about-copy">
            <div className="section-kicker">02 / OUR PURPOSE</div>
            <h2>{t.about}</h2>
            <p>{t.aboutText}</p>
            <div className="purpose-list">
              <div><span>01</span><Leaf/>{t.culture}</div>
              <div><span>02</span><User/>{t.community}</div>
              <div><span>03</span><Sparkles/>{t.nature}</div>
            </div>
          </div>
        </section>

        <section className="missions-section section-wrap" id="missions">
          <div className="section-kicker">03 / YOUR ADVENTURE</div>
          <div className="intro-heading">
            <div>
              <h2>{t.missions}</h2>
              <p>{t.missionsText}</p>
            </div>
            <span className="sun-symbol">✳</span>
          </div>

          {loading ? (
            <p className="loading-text">{t.loading}</p>
          ) : (
            <div className="mission-grid">
              {missions.map((mission, index) => {
                const done = completed.includes(mission.id);
                return (
                  <article className="mission-card" key={mission.id}>
                    <div className="mission-image" style={{
                      backgroundImage: `url(${categoryImages[mission.category] || categoryImages.exploration})`
                    }}>
                      <span className="mission-category">
                        {categoryIcons[mission.category] || "🧭"} {mission.category}
                      </span>
                      <span className="mission-index">0{index + 1}</span>
                    </div>
                    <div className="mission-content">
                      <h3>{localized(mission.title)}</h3>
                      <p>{localized(mission.description)}</p>
                      <div className="mission-bottom">
                        <span className="stamp-label"><Award size={16}/> {localized(mission.stamp_name)}</span>
                        <button
                          className={done ? "complete-button done" : "complete-button"}
                          disabled={busy || done}
                          onClick={() => completeMission(mission.id)}
                        >
                          {done ? <><CheckCircle2 size={15}/> {t.completed}</> : <>{t.complete} <ArrowRight size={15}/></>}
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
              {missions.length === 0 && <p>{t.error}</p>}
            </div>
          )}
        </section>

        <section className="passport-section" id="passport">
          <div className="passport-decoration">✳</div>
          <div className="passport-inner">
            <div className="passport-copy">
              <div className="section-kicker light">04 / YOUR PERSONAL JOURNEY</div>
              <h2>{t.progress}</h2>
              <p>{session
                ? `${profile?.display_name || session.user.email} — ${t.stamps}`
                : t.loginRequired}</p>
              {!session && (
                <button className="passport-login" onClick={() => {
                  setAuthMode("signup"); setAuthOpen(true); setNotice("");
                }}>{t.signup} <ArrowRight size={17}/></button>
              )}
            </div>
            <div className="passport-stats">
              <div className="stamp-circle">
                <Award size={32}/>
                <strong>{stamps}</strong>
                <span>{t.stamps}</span>
              </div>
              <div className="progress-area">
                <div className="progress-label"><span>{t.progress}</span><b>{progress}%</b></div>
                <div className="progress-track"><span style={{ width: `${progress}%` }}/></div>
                <div className="passport-count">{stamps} / {missions.length} missions</div>
              </div>
            </div>
          </div>
        </section>

        {notice && <div className="notice" role="status">{notice}</div>}
      </main>

      <footer className="footer">
        <a href="#home" className="brand footer-brand">
          <span className="brand-mark"><Compass size={23}/></span>
          <span>DUSHI <b>ISLAND</b><small>EXPERIENCE</small></span>
        </a>
        <p>{t.footer}</p>
        <span>© {new Date().getFullYear()} DUSHI ISLAND EXPERIENCE · CURAÇAO</span>
      </footer>

      {authOpen && (
        <div className="modal-backdrop" onMouseDown={e => {
          if (e.target === e.currentTarget) setAuthOpen(false);
        }}>
          <div className="auth-modal">
            <button className="modal-close" onClick={() => setAuthOpen(false)} aria-label="Close"><X/></button>
            <div className="modal-brand"><Compass size={30}/></div>
            <div className="section-kicker">YOUR ISLAND ADVENTURE</div>
            <h2>{authMode === "signup" ? t.create : t.welcome}</h2>
            <p>{t.loginRequired}</p>
            <form onSubmit={handleAuth}>
              {authMode === "signup" && (
                <label><User size={17}/><input required placeholder={t.name} value={form.name}
                  onChange={e => setForm({...form, name: e.target.value})}/></label>
              )}
              <label><Mail size={17}/><input type="email" required placeholder={t.email} value={form.email}
                onChange={e => setForm({...form, email: e.target.value})}/></label>
              <label><Lock size={17}/><input type="password" required minLength={6} placeholder={t.password}
                value={form.password} onChange={e => setForm({...form, password: e.target.value})}/></label>
              <button className="auth-submit" disabled={busy}>
                {busy ? "..." : authMode === "signup" ? t.signup : t.login}
                <ArrowRight size={17}/>
              </button>
            </form>
            {notice && <div className="auth-notice">{notice}</div>}
            <div className="auth-switch">
              {authMode === "signup" ? t.hasAccount : t.noAccount}
              <button onClick={() => {
                setAuthMode(authMode === "signup" ? "login" : "signup");
                setNotice("");
              }}>{authMode === "signup" ? t.loginHere : t.signupHere}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
