import { useEffect, useRef, useState } from "react";
import "./index.css";

// ─── CONFIG ──────────────────────────────────────────────────────────────────
// TODO: replace with your real GitHub username
const GITHUB_USERNAME = "gopalsognigbe";

// These repos are already in FEATURED_PROJECTS below — exclude from GitHub fetch
const EXCLUDED_REPOS = ["dramabot", "legal-rag-assistant", "compound-interest-simulator"];

// ─── FEATURED PROJECTS (always pinned at top, manually curated) ───────────────
// These are your most important projects — thesis, DramaBot, etc.
// GitHub repos fill in automatically BELOW these.
const FEATURED_PROJECTS = [
  {
    id: "thesis",
    featured: true,
    tag: "✦ Thesis · M2",
    title: "Legal RAG Assistant",
    description:
      "RAG chatbot for accessing Beninese law (Constitution, OHADA Codes). Comparative study of retrieval methods (Dense, Sparse, Hybrid) for hallucination reduction.",
    stack: ["LangGraph", "Mistral", "ChromaDB", "Python", "FastAPI"],
    link: "#",        // TODO: your Vercel URL if deployed
    github: "#",      // TODO: your GitHub repo URL
    screenshot: null,
  },
  {
    id: "dramabot",
    featured: false,
    tag: "RAG · Chat",
    title: "DramaBot",
    description:
      "AI chatbot for Asian and international drama discovery. Built with LangGraph, MMR retrieval, streaming responses, and a cinematic dark-themed frontend.",
    stack: ["React", "LangGraph", "ChromaDB", "FastAPI", "Python"],
    link: "#",
    github: "#",
    screenshot: null,
  },
];

// ─── STACK ───────────────────────────────────────────────────────────────────
const STACK = [
  {
    category: "AI & ML",
    items: ["LangGraph", "LangChain", "Mistral", "LLaMA", "ChromaDB", "Hugging Face", "RAG"],
  },
  {
    category: "Frontend",
    items: ["React", "TypeScript", "Tailwind CSS", "Vite", "Next.js"],
  },
  {
    category: "Backend",
    items: ["FastAPI", "Python", "Node.js", "REST APIs"],
  },
  {
    category: "Tools & Ops",
    items: ["Cursor", "Git", "GitHub", "Docker", "VS Code"],
  },
];

// ─── GITHUB HOOK — auto-fetches your public repos ────────────────────────────
function useGitHubProjects(username) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!username || username === "your-github-username") {
      setLoading(false);
      return;
    }

    fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=30`
    )
      .then((res) => {
        if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
        return res.json();
      })
      .then((repos) => {
        const mapped = repos
          // Only deployed repos (homepage set on GitHub) — exclude forks and featured duplicates
          .filter(
            (r) =>
              !r.fork &&
              !EXCLUDED_REPOS.includes(r.name.toLowerCase()) &&
              r.homepage &&
              r.homepage.startsWith("http")
          )
          .map((repo) => ({
            id: repo.id,
            featured: false,
            // Format tag: use first topic, or language, or "Project"
            tag: repo.topics?.[0]
              ? repo.topics[0].replace(/-/g, " ")
              : repo.language || "Project",
            // Format title: "my-project" → "My Project"
            title: repo.name
              .split(/[-_]/)
              .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
              .join(" "),
            description: repo.description || "Open source project on GitHub.",
            // Stack: primary language + first 3 topics
            stack: [
              repo.language,
              ...(repo.topics || []).slice(0, 3),
            ].filter(Boolean),
            link: repo.homepage,
            github: repo.html_url,
            screenshot: null, // auto-generated from link by microlink.io
          }));
        setProjects(mapped);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [username]);

  return { projects, loading, error };
}

// ─── SKELETON CARD — shown while GitHub repos are loading ─────────────────────
function ProjectCardSkeleton() {
  return (
    <div className="bg-surface border border-border rounded-xl overflow-hidden animate-pulse">
      {/* Fake browser bar */}
      <div className="bg-[#0A0C16] px-3 py-2 flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-border"></span>
        <span className="w-2 h-2 rounded-full bg-border"></span>
        <span className="w-2 h-2 rounded-full bg-border"></span>
        <span className="flex-1 h-2 bg-border rounded ml-2"></span>
      </div>
      {/* Fake screenshot */}
      <div className="bg-bg" style={{ aspectRatio: "16/9" }}></div>
      {/* Fake content */}
      <div className="p-6 flex flex-col gap-3">
        <div className="h-3 bg-border rounded w-1/4"></div>
        <div className="h-4 bg-border rounded w-2/3"></div>
        <div className="h-3 bg-border rounded w-full"></div>
        <div className="h-3 bg-border rounded w-4/5"></div>
        <div className="flex gap-2 mt-2">
          <div className="h-5 w-12 bg-border rounded"></div>
          <div className="h-5 w-16 bg-border rounded"></div>
          <div className="h-5 w-10 bg-border rounded"></div>
        </div>
      </div>
    </div>
  );
}

// ─── NEURAL CANVAS (Signature Element) ───────────────────────────────────────
function NeuralCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const nodes = Array.from({ length: 45 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.8 + 0.8,
    }));

    let animId;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 150) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(245,158,11,${0.15 * (1 - d / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
        ctx.beginPath();
        ctx.arc(nodes[i].x, nodes[i].y, nodes[i].r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(245,158,11,0.5)";
        ctx.fill();
        nodes[i].x += nodes[i].vx;
        nodes[i].y += nodes[i].vy;
        if (nodes[i].x < 0 || nodes[i].x > canvas.width) nodes[i].vx *= -1;
        if (nodes[i].y < 0 || nodes[i].y > canvas.height) nodes[i].vy *= -1;
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
    />
  );
}

// ─── NAVBAR ──────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 px-8 py-4 flex items-center justify-between transition-all duration-300 ${
        scrolled ? "bg-bg/90 backdrop-blur-md border-b border-border" : ""
      }`}
    >
      <a href="#" className="font-mono text-accent text-sm tracking-widest hover:opacity-80">
        gopal.dev
      </a>
      <ul className="flex gap-8 list-none m-0 p-0">
        {["About", "Projects", "Stack", "Contact"].map((item) => (
          <li key={item}>
            <a
              href={`#${item.toLowerCase()}`}
              className="text-muted text-sm font-medium hover:text-body transition-colors duration-200"
            >
              {item}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center px-8 overflow-hidden bg-bg">
      <NeuralCanvas />
      <div className="relative z-10 max-w-2xl">
        <p className="font-mono text-accent text-xs tracking-widest2 uppercase mb-6">
          // AI Student · Freelance Dev · Bénin
        </p>
        <h1 className="text-5xl md:text-6xl font-bold text-body leading-tight tracking-tight mb-5">
          Building the <span className="text-accent">future</span>
          <br />
          with code & intelligence
        </h1>
        <p className="text-muted text-lg leading-relaxed mb-10 max-w-xl">
          M2 AI student at ESGIS, Cotonou. I specialize in RAG systems,
          open-source LLMs, and turning AI research into real, production-ready
          products.
        </p>
        <div className="flex gap-4 items-center flex-wrap">
          <a
            href="#projects"
            className="bg-accent text-bg font-semibold text-sm px-7 py-3 rounded-md hover:bg-amber-400 transition-colors"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="border border-border text-body text-sm px-7 py-3 rounded-md hover:border-muted transition-colors"
          >
            Contact me →
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── ABOUT ───────────────────────────────────────────────────────────────────
function About() {
  return (
    <section id="about" className="py-28 px-8 bg-bg border-t border-border">
      <div className="max-w-3xl">
        <p className="font-mono text-accent text-xs tracking-widest2 uppercase mb-3">
          About
        </p>
        <h2 className="text-4xl font-bold text-body tracking-tight mb-10">
          Who I am
        </h2>
        <p className="text-muted text-lg leading-relaxed mb-5">
          I'm <span className="text-body font-medium">Gopal</span>, an M2 AI
          student at ESGIS in Cotonou, Bénin, specializing in
          Retrieval-Augmented Generation (RAG) systems and open-source LLMs.
        </p>
        <p className="text-muted text-lg leading-relaxed mb-5">
          As a freelance front-end developer, I bring a full-stack perspective
          to every AI project — from designing the retrieval pipeline to
          shipping the production interface.
        </p>
        <p className="text-muted text-lg leading-relaxed">
          My current focus is my M2 thesis: a comparative study of retrieval
          methods for a legal RAG assistant grounded in Beninese law
          (Constitution, OHADA Codes), with a focus on hallucination reduction.
        </p>
      </div>
    </section>
  );
}

// ─── SITE PREVIEW ────────────────────────────────────────────────────────────
function SitePreview({ url, screenshot, title }) {
  const [imgError, setImgError] = useState(false);

  const hasRealUrl = url && url !== "#";
  const imgSrc =
    screenshot ||
    (hasRealUrl
      ? `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&meta=false&embed=screenshot.url`
      : null);

  const displayUrl = hasRealUrl
    ? url.replace(/^https?:\/\//, "").replace(/\/$/, "")
    : "not deployed yet";

  return (
    <div className="border-b border-border">
      {/* Browser bar */}
      <div className="bg-[#0A0C16] flex items-center gap-1.5 px-3 py-2 border-b border-border">
        <span className="w-2 h-2 rounded-full bg-[#FF5F57]"></span>
        <span className="w-2 h-2 rounded-full bg-[#FFBD2E]"></span>
        <span className="w-2 h-2 rounded-full bg-[#28CA41]"></span>
        <span className="font-mono text-[9px] text-muted ml-2 truncate flex-1">
          {displayUrl}
        </span>
      </div>

      {/* Screenshot */}
      <div
        className="relative overflow-hidden bg-bg group/preview"
        style={{ aspectRatio: "16/9" }}
      >
        {imgSrc && !imgError ? (
          <>
            <img
              src={imgSrc}
              alt={`Preview of ${title}`}
              className="w-full h-full object-cover object-top"
              onError={() => setImgError(true)}
              loading="lazy"
            />
            {hasRealUrl && (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 bg-bg/75 opacity-0 group-hover/preview:opacity-100 transition-opacity duration-200 flex items-center justify-center"
              >
                <span className="bg-accent text-bg font-semibold text-xs px-5 py-2.5 rounded-md pointer-events-none">
                  Visit site ↗
                </span>
              </a>
            )}
          </>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2">
            <span className="font-mono text-xs text-border">◻</span>
            <span className="font-mono text-[10px] text-muted">
              {hasRealUrl ? "Preview loading..." : "Not deployed yet"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── PROJECT CARD ─────────────────────────────────────────────────────────────
function ProjectCard({ project }) {
  const isFeatured = project.featured;

  return (
    <div
      className={`bg-surface rounded-xl overflow-hidden flex flex-col transition-all duration-250 hover:-translate-y-1 ${
        isFeatured
          ? "border border-accent-2/60 border-t-2 border-t-[#818CF8]"
          : "border border-border hover:border-accent/40"
      }`}
    >
      <SitePreview url={project.link} screenshot={project.screenshot} title={project.title} />

      <div className="p-6 flex flex-col flex-1">
        <span
          className={`font-mono text-xs px-2.5 py-1 rounded mb-4 inline-block w-fit ${
            isFeatured
              ? "bg-[#818CF8]/10 text-[#818CF8]"
              : "bg-accent/10 text-accent"
          }`}
        >
          {project.tag}
        </span>

        <h3 className="text-body font-semibold text-lg mb-2">{project.title}</h3>
        <p className="text-muted text-sm leading-relaxed mb-5 flex-1">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-5">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="font-mono text-xs bg-bg border border-border rounded px-2.5 py-1 text-muted"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex gap-4 pt-4 border-t border-border">
          {project.link !== "#" && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted hover:text-accent transition-colors font-mono"
            >
              Live ↗
            </a>
          )}
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted hover:text-body transition-colors font-mono"
          >
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── PROJECTS — merges featured + GitHub repos ────────────────────────────────
function Projects() {
  const { projects: githubProjects, loading, error } = useGitHubProjects(GITHUB_USERNAME);
  const deployedFeatured = FEATURED_PROJECTS.filter(
    (p) => p.link && p.link.startsWith("http")
  );
  const totalProjects = deployedFeatured.length + githubProjects.length;

  return (
    <section id="projects" className="py-28 px-8 bg-bg border-t border-border">
      <p className="font-mono text-accent text-xs tracking-widest2 uppercase mb-3">
        Selected Work
      </p>
      <h2 className="text-4xl font-bold text-body tracking-tight mb-3">
        Projects
      </h2>

      {/* GitHub status badge */}
      <p className="text-muted text-sm mb-14 font-mono">
        {loading && "Loading your GitHub repos..."}
        {error && <span className="text-amber-400">{error}</span>}
        {!loading && !error && (
          <>
            {totalProjects} projects · {totalProjects} live on Vercel
          </>
        )}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Featured projects with a live deployment */}
        {deployedFeatured.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}

        {/* Skeleton cards while loading */}
        {loading &&
          [1, 2, 3].map((i) => <ProjectCardSkeleton key={`skeleton-${i}`} />)}

        {/* GitHub repos after loading */}
        {!loading &&
          githubProjects.map((p) => <ProjectCard key={p.id} project={p} />)}
      </div>
    </section>
  );
}

// ─── STACK ───────────────────────────────────────────────────────────────────
function Stack() {
  return (
    <section id="stack" className="py-28 px-8 bg-surface border-t border-border">
      <p className="font-mono text-accent text-xs tracking-widest2 uppercase mb-3">
        Tech Stack
      </p>
      <h2 className="text-4xl font-bold text-body tracking-tight mb-14">
        What I build with
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {STACK.map(({ category, items }) => (
          <div key={category}>
            <h3 className="font-mono text-xs text-muted uppercase tracking-widest mb-4">
              {category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {items.map((item) => (
                <span
                  key={item}
                  className="bg-bg border border-border text-muted text-xs font-mono px-3 py-1.5 rounded hover:border-accent/50 hover:text-body transition-all duration-200"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── CONTACT ─────────────────────────────────────────────────────────────────
function Contact() {
  return (
    <section id="contact" className="py-28 px-8 bg-bg border-t border-border">
      <p className="font-mono text-accent text-xs tracking-widest2 uppercase mb-3">
        Contact
      </p>
      <h2 className="text-4xl font-bold text-body tracking-tight mb-5">
        Let's work together
      </h2>
      <p className="text-muted text-lg leading-relaxed mb-10 max-w-lg">
        Open to freelance projects, AI consulting, and interesting
        collaborations. Based in Cotonou — working worldwide.
      </p>
      <div className="flex flex-wrap gap-4">
        <a
          href="mailto:sognigbegopal@gmail.com"
          className="bg-accent text-bg font-semibold text-sm px-7 py-3 rounded-md hover:bg-amber-400 transition-colors"
        >
          Send an email
        </a>
        <a
          href={`https://github.com/${GITHUB_USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          className="border border-border text-body text-sm px-7 py-3 rounded-md hover:border-muted transition-colors"
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/gopal-sognigbe-1a09742b1"
          target="_blank"
          rel="noopener noreferrer"
          className="border border-border text-body text-sm px-7 py-3 rounded-md hover:border-muted transition-colors"
        >
          LinkedIn
        </a>
      </div>
    </section>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="py-8 px-8 bg-bg border-t border-border flex items-center justify-between flex-wrap gap-4">
      <span className="font-mono text-muted text-xs">© 2025 gopal.dev</span>
      <span className="font-mono text-muted text-xs">
        Built with React + Vite + Tailwind CSS
      </span>
    </footer>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="bg-bg text-body font-sans antialiased">
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Stack />
      <Contact />
      <Footer />
    </div>
  );
}
