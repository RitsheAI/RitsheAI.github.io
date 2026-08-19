import { type FormEvent, type ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation } from 'wouter';
import {
  ArrowDown, ArrowUp, ArrowUpRight, BrainCircuit, Check, ChevronRight, Code2, Command, FlaskConical,
  Github, Mail, Menu, Moon, Search, Send, Sun, Terminal,
  Workflow, X, Zap,
} from 'lucide-react';
import { buildAreas, nowItems, posts, projects, tools } from '@/data/portfolio';

const queryClient = new QueryClient();

const iconMap = { brain: BrainCircuit, code: Code2, workflow: Workflow, flask: FlaskConical };

function Home() {
  const [dark, setDark] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [commandValue, setCommandValue] = useState('');
  const [filter, setFilter] = useState('All');
  const [terminalValue, setTerminalValue] = useState('');
  const [terminalOutput, setTerminalOutput] = useState('ready — ask the lab about a project, a tool, or the current direction');
  const [sent, setSent] = useState(false);
  const [formError, setFormError] = useState('');
  const [showTop, setShowTop] = useState(false);
  const [cursor, setCursor] = useState({ x: -300, y: -300 });
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('ritsheai-theme', dark ? 'dark' : 'light');
  }, [dark]);
  useEffect(() => {
    const saved = localStorage.getItem('ritsheai-theme');
    if (saved === 'dark') setDark(true);
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault(); setCommandOpen(true);
      }
      if (event.key === 'Escape') { setCommandOpen(false); setMobileOpen(false); }
    };
    const onScroll = () => setShowTop(window.scrollY > 650);
    const onMove = (event: MouseEvent) => setCursor({ x: event.clientX, y: event.clientY });
    window.addEventListener('keydown', onKey); window.addEventListener('scroll', onScroll); window.addEventListener('mousemove', onMove);
    return () => { window.removeEventListener('keydown', onKey); window.removeEventListener('scroll', onScroll); window.removeEventListener('mousemove', onMove); };
  }, []);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('visible')), { threshold: .12 });
    document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const filteredProjects = useMemo(() => filter === 'All' ? projects : projects.filter((project) => project.kind.includes(filter)), [filter]);
  const scrollTo = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); setMobileOpen(false); setCommandOpen(false); };
  const runTerminal = (event: FormEvent) => {
    event.preventDefault();
    const query = terminalValue.trim().toLowerCase();
    if (!query) return;
    const answer = query.includes('project') ? 'projects — 04 active threads, 01 shipping now' : query.includes('tool') ? 'toolchain — React · Python · PostgreSQL · local-first thinking' : query.includes('who') ? 'ritsheai — an independent lab by Ritesh Pandey' : 'lab response — this is a placeholder interface for a future live index';
    setTerminalOutput(answer); setTerminalValue('');
  };
  const submitContact = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setFormError(''); setSent(false);
    const form = new FormData(event.currentTarget);
    const name = String(form.get('name') || '').trim(); const email = String(form.get('email') || '').trim(); const message = String(form.get('message') || '').trim();
    if (!name || !email || !message) { setFormError('Please complete your name, email, and message.'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setFormError('That email address needs another look.'); return; }
    setSent(true); formRef.current?.reset();
  };

  return (
    <div className="site-shell">
      <div className="cursor-glow" style={{ left: cursor.x, top: cursor.y }} aria-hidden="true" />
      <header className="topbar" data-testid="navigation-header">
        <a className="brand" href="#top" data-testid="link-brand"><span className="brand-mark">R</span><span>RitsheAI</span></a>
        <nav className="topnav" aria-label="Main navigation">
          {['about', 'build', 'projects', 'lab', 'contact'].map((item) => <a key={item} href={`#${item}`} data-testid={`link-nav-${item}`}>{item}</a>)}
        </nav>
        <div className="topbar-actions">
          <button className="icon-button" onClick={() => setCommandOpen(true)} aria-label="Open command palette" data-testid="button-command"><Search size={15} /></button>
          <button className="icon-button" onClick={() => setDark((value) => !value)} aria-label={dark ? 'Use light theme' : 'Use dark theme'} data-testid="button-theme">{dark ? <Sun size={15} /> : <Moon size={15} />}</button>
          <button className="icon-button menu-button" onClick={() => setMobileOpen((value) => !value)} aria-label={mobileOpen ? 'Close menu' : 'Open menu'} data-testid="button-mobile-menu">{mobileOpen ? <X size={16} /> : <Menu size={16} />}</button>
        </div>
      </header>
      <div className={`mobile-panel ${mobileOpen ? 'open' : ''}`} aria-label="Mobile navigation">
        {['about', 'build', 'projects', 'lab', 'contact'].map((item) => <a key={item} href={`#${item}`} onClick={() => setMobileOpen(false)} data-testid={`link-mobile-${item}`}>{item}</a>)}
      </div>

      <main id="top">
        <section className="hero wrap">
          <div className="hero-grid">
            <div className="reveal">
              <div className="eyebrow"><span className="status-dot" /> Independent technology laboratory · {new Date().getFullYear()}</div>
              <h1>Building the<br /><em>Future</em> with<br />AI &amp; Code.</h1>
              <p className="hero-lede">RitsheAI is the personal technology portfolio and open-source lab of <strong>Ritesh Pandey</strong> — a place for useful intelligence, sharp software, and experiments worth sharing.</p>
              <div className="hero-actions"><a className="button button-dark" href="#projects" data-testid="link-hero-projects">Explore the lab <ArrowDown size={15} /></a><a className="button button-quiet" href="#contact" data-testid="link-hero-contact">Start a conversation <ArrowUpRight size={15} /></a></div>
              <div className="hero-note"><span><span className="status-dot" /> Available for interesting problems</span><span className="mono">/ ritsheai.systems</span></div>
            </div>
            <div className="lab-orbit reveal" aria-label="RitsheAI system visualization">
              <div className="orbit-ring"><i className="orbit-node" /></div><div className="orbit-ring two"><i className="orbit-node" /></div>
              <div className="lab-core"><div><strong>RA</strong><br /><span>LIVE CORE</span></div></div>
              <span className="orbit-label a">models</span><span className="orbit-label b">systems</span><span className="orbit-label c">open source</span><span className="orbit-label d">curiosity</span>
              <div className="lab-readout"><b>●</b> signal detected<br /><span>building in public</span></div>
            </div>
          </div>
        </section>
        <div className="ticker" aria-label="RitsheAI areas of focus"><div className="ticker-track">{Array.from({ length: 2 }).flatMap((_, index) => ['AI systems', 'developer tools', 'open source', 'web experiments', 'automation', 'technical writing'].map((item) => <span key={`${item}-${index}`}>{item} <i>＋</i></span>))}</div></div>

        <section id="about" className="section wrap reveal">
          <div className="section-head"><div><div className="eyebrow">01 / The operator</div><h2 className="section-title">A small lab.<br />A wide aperture.</h2></div><p className="section-copy">Not a startup. Not a content machine. A focused practice for turning questions into working things.</p></div>
          <div className="about-grid"><p className="about-big">I make technology feel a little more <span>legible</span>, a little more human, and a lot more useful.</p><div><p className="about-text">RitsheAI is where Ritesh explores the edges between artificial intelligence, software, and the web. It is a public record of the tools, prototypes, and field notes that survive contact with real use.</p><p className="about-text">The rule is simple: stay curious, ship the small version, share what was learned. The lab is independent, but never isolated.</p><p className="about-signature">— Ritesh Pandey / builder, researcher, optimistic skeptic</p></div></div>
        </section>

        <section id="build" className="section wrap reveal"><div className="section-head"><div><div className="eyebrow">02 / Practice areas</div><h2 className="section-title">What gets built<br />in here.</h2></div><p className="section-copy">Four connected threads. One intention: make the next useful thing real.</p></div><div className="build-grid">{buildAreas.map((area) => { const Icon = iconMap[area.icon as keyof typeof iconMap]; return <article className="build-card" key={area.number} data-testid={`card-build-${area.number}`}><span className="card-index">{area.number}</span><Icon size={27} strokeWidth={1.5} /><h3>{area.title}</h3><p>{area.description}</p></article>; })}</div></section>

        <section id="projects" className="section projects reveal"><div className="wrap"><div className="section-head"><div><div className="eyebrow">03 / Selected work</div><h2 className="section-title">Things with<br />a pulse.</h2></div><p className="section-copy">A living index of shipped, shipping, and deliberately unfinished work.</p></div><div className="filter-row" role="group" aria-label="Filter projects">{['All', 'AI', 'Developer', 'Automation', 'Web'].map((item) => <button className={`filter ${filter === item ? 'active' : ''}`} key={item} onClick={() => setFilter(item)} data-testid={`button-filter-${item.toLowerCase()}`}>{item}</button>)}</div><div className="project-list">{filteredProjects.map((project) => <article className="project-row" key={project.name} data-testid={`card-project-${project.name.replaceAll(' ', '-').toLowerCase()}`}><div className="project-name">{project.name}</div><div className="project-desc">{project.description}</div><div className="project-tags">{project.tags.map((tag) => <span className="project-tag" key={tag}>{tag}</span>)}</div><ChevronRight className="project-arrow" size={20} /><div className="eyebrow">{project.status}</div></article>)}</div></div></section>

        <section className="section wrap reveal"><div className="tools-layout"><div><div className="eyebrow">04 / Working stack</div><h2 className="section-title">The tools<br />behind the tools.</h2><div className="tools-list">{tools.map(([name, detail]) => <div className="tool-row" key={name}><div className="tool-icon"><Zap size={16} /></div><span className="tool-name">{name}</span><span className="tool-detail">{detail}</span></div>)}</div></div><div className="tool-feature"><div className="eyebrow">Lab principle / 004</div><h3>Use the tool. Then question the tool.</h3><p>The stack is never the point. It is the leverage that lets an idea leave the notebook.</p><a className="button" href="#lab" data-testid="link-stack-lab">Enter the terminal <Terminal size={15} /></a></div></div></section>

        <section className="section wrap reveal"><div className="oss-grid"><div className="oss-main"><div className="eyebrow">05 / Open source</div><h3>Shared work compounds.</h3><p>Useful experiments should travel. RitsheAI publishes building blocks, notes, and small utilities for anyone curious enough to fork them.</p><a className="button button-dark" href="https://github.com/RitsheAI" target="_blank" rel="noreferrer" data-testid="link-github">View the GitHub <Github size={15} /></a></div><div className="oss-stat"><span>PUBLIC REPOSITORIES</span><b>12</b><span>and counting</span></div></div></section>

        <div className="stack-section"><div className="wrap stack-line"><span>TECHNOLOGY INDEX</span><strong>TypeScript</strong><strong>Python</strong><strong>React</strong><strong>Node.js</strong><strong>PostgreSQL</strong><strong>LLM APIs</strong><span>+ the next unknown</span></div></div>

        <section className="section wrap reveal"><div className="section-head"><div><div className="eyebrow">06 / Right now</div><h2 className="section-title">Currently<br />building.</h2></div><p className="section-copy">The lab is a moving target. These are the threads getting attention this week.</p></div><div className="now-grid"><div><p className="about-text">There is no roadmap carved in stone. Just a few good questions, a desk, and enough time protected to follow the interesting edge.</p><p className="about-signature">Last updated / 14.02.25</p></div><div className="now-list">{nowItems.map((item, index) => <div className="now-item" key={item.title} data-testid={`status-building-${index}`}><span className="now-num">0{index + 1}</span><div><strong>{item.title}</strong><p>{item.detail}</p></div><div className="progress"><i style={{ width: `${item.progress}%` }} /></div></div>)}</div></div></section>

        <section className="section wrap reveal"><div className="section-head"><div><div className="eyebrow">07 / Dispatches</div><h2 className="section-title">Notes from<br />the edge.</h2></div><p className="section-copy">Writing is how the lab turns motion into memory. These posts are placeholders until the archive opens.</p></div><div className="blog-list">{posts.map((post, index) => <article className="blog-card" key={post.title} data-testid={`card-post-${index}`}><div className="eyebrow">{post.type}</div><h3>{post.title}</h3><div className="blog-meta"><span>{post.meta}</span><ArrowUpRight size={15} /></div></article>)}</div></section>

        <section id="lab" className="section wrap reveal"><div className="section-head"><div><div className="eyebrow">08 / RitsheAI Lab</div><h2 className="section-title">Ask the<br />machine.</h2></div><p className="section-copy">A tiny terminal for the living index. Try “projects”, “tools”, or “who”.</p></div><div className="terminal-wrap"><div className="terminal"><div className="terminal-top"><i /><i /><i /><span>ritsheai-lab — zsh — 80 × 24</span></div><div className="terminal-body"><div><span className="terminal-line">ritshe@lab:~$ </span><span className="terminal-value">status</span></div><div className="terminal-value">system online / curiosity level: high</div><br /><div><span className="terminal-line">ritshe@lab:~$ </span><span className="terminal-value">{terminalOutput}</span></div><form className="terminal-prompt" onSubmit={runTerminal}><span>ritshe@lab:~$</span><input className="terminal-input" value={terminalValue} onChange={(event) => setTerminalValue(event.target.value)} aria-label="Ask the RitsheAI lab" placeholder="type a query and press enter" data-testid="input-terminal" /></form><div className="terminal-hint">tip: the lab knows about projects, tools, and who made this place</div></div></div></div></section>

        <section className="section philosophy reveal"><div className="wrap phil-grid"><p className="phil-quote">“Stay close to the <span>question.</span> Let the output surprise you.”</p><p className="phil-aside">The best work starts before the answer is obvious. RitsheAI is a practice of staying with that productive uncertainty long enough to find something honest.</p></div></section>

        <section id="contact" className="section wrap reveal"><div className="contact-grid"><div><div className="eyebrow">09 / Open channel</div><h2 className="contact-title">Bring a<br />good question.</h2><p className="contact-copy">Have a strange problem, an early idea, or a useful rabbit hole? Send a note. This form validates locally and does not send email yet.</p><div className="contact-links">
  <a href="mailto:hello@ritsheai.dev" data-testid="link-email"><Mail size={14} /> hello@ritsheai.dev</a>
  <a href="https://github.com/ritsheai" target="_blank" rel="noreferrer" data-testid="link-contact-github"><Github size={14} /> github.com/ritsheai</a>
  <a href="https://x.com/ritsheai" target="_blank" rel="noreferrer" data-testid="link-contact-x"><span className="mono">𝕏</span> x.com/ritsheai</a>
  <a href="https://linkedin.com/in/ritsheai" target="_blank" rel="noreferrer" data-testid="link-contact-linkedin"><span className="mono">in</span> linkedin.com/in/ritsheai</a>
  <a href="https://youtube.com/@ritsheai" target="_blank" rel="noreferrer" data-testid="link-contact-youtube"><span className="mono">▶</span> youtube.com/@ritsheai</a>
  <a href="https://instagram.com/ritsheai" target="_blank" rel="noreferrer" data-testid="link-contact-instagram"><span className="mono">📷</span> instagram.com/ritsheai</a>
</div></div><form ref={formRef} className="contact-form" onSubmit={submitContact} noValidate><div className="field"><label htmlFor="name">Your name</label><input id="name" name="name" required placeholder="Ritesh's next collaborator" data-testid="input-contact-name" /></div><div className="field"><label htmlFor="email">Email address</label><input id="email" name="email" type="email" required placeholder="you@somewhere.good" data-testid="input-contact-email" /></div><div className="field"><label htmlFor="message">The question</label><textarea id="message" name="message" required placeholder="What are you working on?" data-testid="input-contact-message" /></div><div className="form-foot"><span className="form-error" role="alert">{formError}</span><button className="button button-dark" type="submit" data-testid="button-contact-submit">Validate note <Send size={15} /></button></div>{sent && <div className="form-success" role="status"><Check size={14} /> Note validated locally. No email was sent — connect a mail service when you are ready.</div>}</form></div></section>
      </main>
      <footer className="footer wrap"><span>© {new Date().getFullYear()} RitsheAI / made by Ritesh Pandey</span><span>AI · software · experiments · <a href="#top" data-testid="link-footer-top">back to top</a></span></footer>
      <button className={`icon-button back-top ${showTop ? 'show' : ''}`} onClick={() => scrollTo('top')} aria-label="Back to top" data-testid="button-back-top"><ArrowUp size={15} /></button>
      {commandOpen && <div className="command-backdrop" role="dialog" aria-modal="true" aria-label="Command palette" onClick={() => setCommandOpen(false)}><div className="command-box" onClick={(event) => event.stopPropagation()}><div className="command-search"><Command size={16} /><input autoFocus value={commandValue} onChange={(event) => setCommandValue(event.target.value)} placeholder="Jump to a section..." aria-label="Search commands" data-testid="input-command" /><button className="icon-button" onClick={() => setCommandOpen(false)} aria-label="Close command palette" data-testid="button-close-command"><X size={15} /></button></div><div className="command-items">{['about', 'build', 'projects', 'lab', 'contact'].filter((item) => item.includes(commandValue.toLowerCase())).map((item, index) => <button className="command-item" key={item} onClick={() => scrollTo(item)} data-testid={`button-command-${item}`}><ChevronRight size={15} /> Go to {item}<span className="command-key">{index + 1}</span></button>)}</div></div></div>}
    </div>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/home" component={Home} />
        <Route path="/RitsheAI" component={Home} />
        <Route path="/RitsheAI/home" component={Home} />
        <Route component={Home} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Router />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
