import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  ArrowRight,
  BarChart3,
  BrainCircuit,
  ChevronDown,
  Code2,
  Database,
  ExternalLink,
  FileDown,
  Github,
  Globe,
  GraduationCap,
  Heart,
  Layers,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Star,
  Users,
  Wrench,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

// ---------- SCROLL OBSERVER HOOK ----------
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          obs.unobserve(el);
        }
      },
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

// ---------- RESUME MODAL ----------
const RESUME_SKILLS = {
  Programming: ["Python", "SQL"],
  "Data Analysis": [
    "Pandas",
    "NumPy",
    "Matplotlib",
    "Seaborn",
    "EDA",
    "Feature Engineering",
  ],
  "Machine Learning": [
    "Scikit-learn",
    "K-Means Clustering",
    "Regression",
    "Deep Learning",
    "NLP",
  ],
  "Tools & Platforms": [
    "Power BI",
    "Jupyter Notebook",
    "Streamlit",
    "Git",
    "GitHub",
  ],
};

const RESUME_PROJECTS = [
  {
    title: "Flight Fare Prediction",
    stack: "Python · Scikit-learn · Streamlit · EDA",
    desc: "ML model to predict flight ticket prices based on airline, journey date, source, destination, duration, and stops.",
    url: "https://github.com/premprasad1707/flight_fare_prediction",
  },
  {
    title: "Food Online Delivery Analysis",
    stack: "Python · Power BI · Jupyter Notebook",
    desc: "End-to-end BI workflow integrating Python with Power BI for comprehensive food orders data analysis.",
    url: "https://github.com/premprasad1707/food_online_delivery_analysis",
  },
  {
    title: "Iris Dataset Clustering",
    stack: "Python · Scikit-learn · Matplotlib",
    desc: "K-Means Clustering on the Iris dataset dividing data into 3 distinct clusters.",
    url: "https://github.com/premprasad1707/iris_dataset_clustering",
  },
  {
    title: "Telecom EDA & Prediction",
    stack: "Python · Jupyter Notebook · Pandas",
    desc: "EDA and ML predictions for telecom systems analysis.",
    url: "https://github.com/premprasad1707/telecom_predict",
  },
  {
    title: "Job Market Data Analysis",
    stack: "Python · Pandas · Matplotlib",
    desc: "Analyzed job market dataset to identify demand trends, salary ranges, and industry insights.",
    url: "https://github.com/premprasad1707/Job_Market_Exploitery-Data-Analysis",
  },
  {
    title: "Titanic EDA",
    stack: "Python · Pandas · Seaborn",
    desc: "Exploratory data analysis to uncover survival prediction insights and passenger patterns.",
    url: "https://github.com/premprasad1707/Titanic-Exploitery-Data-Analysis",
  },
];

function ResumeModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const bodyRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      window.open("/assets/uploads/Prem_resume-1.pdf", "_blank");
      return;
    }

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<title>Prem Prasad Swain - Resume</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:'Inter',Arial,sans-serif;background:#fff;color:#1a1a2e;font-size:10pt;line-height:1.5;padding:24px 32px}
  h1{font-size:22pt;font-weight:700;color:#7c3aed;text-align:center;margin-bottom:4px}
  .subtitle{text-align:center;font-size:9pt;color:#7c3aed;letter-spacing:2px;text-transform:uppercase;margin-bottom:8px}
  .contact-row{display:flex;flex-wrap:wrap;justify-content:center;gap:12px 20px;font-size:8.5pt;color:#555;margin-bottom:16px}
  .contact-row a{color:#555;text-decoration:none}
  hr{border:none;border-top:1px solid #e0d0ff;margin:10px 0}
  h2{font-size:10pt;font-weight:700;color:#7c3aed;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:6px;border-bottom:1px solid #e0d0ff;padding-bottom:3px}
  section{margin-bottom:12px}
  p{margin-bottom:4px;font-size:9.5pt;color:#333}
  ul{padding-left:16px;margin-top:4px}
  li{font-size:9pt;color:#444;margin-bottom:2px}
  .row{display:flex;justify-content:space-between;align-items:flex-start;gap:8px}
  .label{font-weight:600;font-size:9pt;color:#1a1a2e}
  .sub{font-size:8.5pt;color:#7c3aed}
  .badge{display:inline-block;background:#f0e8ff;color:#7c3aed;padding:1px 7px;border-radius:3px;font-size:7.5pt;font-weight:600;border:1px solid #d0b0ff}
  .skill-row{display:flex;flex-wrap:wrap;align-items:flex-start;gap:4px;margin-bottom:4px}
  .skill-cat{font-size:8.5pt;color:#7c3aed;font-weight:600;min-width:120px;padding-top:2px}
  .skill-tags{display:flex;flex-wrap:wrap;gap:3px}
  .skill-tag{background:#f0e8ff;color:#7c3aed;border:1px solid #d0b0ff;padding:1px 6px;border-radius:3px;font-size:7.5pt}
  .project-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:4px}
  .project-card{border:1px solid #e0d0ff;border-radius:4px;padding:6px 8px}
  .project-title{font-size:9pt;font-weight:600;color:#1a1a2e}
  .project-stack{font-size:7.5pt;color:#7c3aed;margin:1px 0}
  .project-desc{font-size:8pt;color:#555}
  .edu-row{display:flex;justify-content:space-between;align-items:flex-start;border-left:2px solid #d0b0ff;padding-left:8px;margin-bottom:6px}
  @media print{body{padding:12px 20px}@page{margin:12mm}}
</style>
</head>
<body>
<h1>Prem Prasad Swain</h1>
<div class="subtitle">Data Analyst &amp; Data Scientist Aspirant</div>
<div class="contact-row">
  <a href="mailto:premprasad6370@gmail.com">premprasad6370@gmail.com</a>
  <a href="tel:+916370959392">+91 6370959392</a>
  <a href="https://linkedin.com/in/premprasad1707">linkedin.com/in/premprasad1707</a>
  <a href="https://github.com/premprasad1707">github.com/premprasad1707</a>
</div>
<hr/>
<section>
<h2>Professional Summary</h2>
<p>Aspiring Data Analyst and Data Scientist with a strong foundation in Python, SQL, and Machine Learning. Experienced in EDA, feature engineering, model development, and data visualization using tools like Power BI and Streamlit. Passionate about transforming raw data into actionable insights.</p>
</section>
<section>
<h2>Technical Skills</h2>
<div class="skill-row"><span class="skill-cat">Programming</span><div class="skill-tags"><span class="skill-tag">Python</span><span class="skill-tag">SQL</span></div></div>
<div class="skill-row"><span class="skill-cat">Data Analysis</span><div class="skill-tags"><span class="skill-tag">Pandas</span><span class="skill-tag">NumPy</span><span class="skill-tag">Matplotlib</span><span class="skill-tag">Seaborn</span><span class="skill-tag">EDA</span><span class="skill-tag">Feature Engineering</span></div></div>
<div class="skill-row"><span class="skill-cat">Machine Learning</span><div class="skill-tags"><span class="skill-tag">Scikit-learn</span><span class="skill-tag">K-Means Clustering</span><span class="skill-tag">Regression</span><span class="skill-tag">Deep Learning</span><span class="skill-tag">NLP</span></div></div>
<div class="skill-row"><span class="skill-cat">Tools &amp; Platforms</span><div class="skill-tags"><span class="skill-tag">Power BI</span><span class="skill-tag">Jupyter Notebook</span><span class="skill-tag">Streamlit</span><span class="skill-tag">Git</span><span class="skill-tag">GitHub</span></div></div>
</section>
<section>
<h2>Internship Experience</h2>
<div class="row">
  <div><p class="label">Data Science Intern</p><p class="sub">Teks Academy</p></div>
  <span class="badge">Jan 2026 – Feb 2026</span>
</div>
<ul>
  <li>Conducted exploratory data analysis on multiple datasets to identify trends and insights.</li>
  <li>Developed a flight ticket price prediction model using regression techniques.</li>
  <li>Performed data cleaning, preprocessing, and feature engineering.</li>
  <li>Created visualizations and dashboards to present findings.</li>
  <li>Published project work on GitHub for collaboration and documentation.</li>
</ul>
</section>
<section>
<h2>Projects</h2>
<div class="project-grid">
  <div class="project-card"><div class="project-title">Flight Fare Prediction</div><div class="project-stack">Python · Scikit-learn · Streamlit · EDA</div><div class="project-desc">ML model to predict flight ticket prices based on airline, journey date, source, destination, duration, and stops.</div></div>
  <div class="project-card"><div class="project-title">Food Online Delivery Analysis</div><div class="project-stack">Python · Power BI · Jupyter Notebook</div><div class="project-desc">End-to-end BI workflow integrating Python with Power BI for comprehensive food orders data analysis.</div></div>
  <div class="project-card"><div class="project-title">Iris Dataset Clustering</div><div class="project-stack">Python · Scikit-learn · Matplotlib</div><div class="project-desc">K-Means Clustering on the Iris dataset dividing data into 3 distinct clusters.</div></div>
  <div class="project-card"><div class="project-title">Telecom EDA &amp; Prediction</div><div class="project-stack">Python · Jupyter Notebook · Pandas</div><div class="project-desc">EDA and ML predictions for telecom systems analysis.</div></div>
  <div class="project-card"><div class="project-title">Job Market Data Analysis</div><div class="project-stack">Python · Pandas · Matplotlib</div><div class="project-desc">Analyzed job market dataset to identify demand trends, salary ranges, and industry insights.</div></div>
  <div class="project-card"><div class="project-title">Titanic EDA</div><div class="project-stack">Python · Pandas · Seaborn</div><div class="project-desc">Exploratory data analysis to uncover survival prediction insights and passenger patterns.</div></div>
</div>
</section>
<section>
<h2>Education</h2>
<div class="edu-row"><div><p class="label">Bachelor of Computer Applications (BCA)</p><p class="sub">Science College (Autonomous), Hinjilicut</p></div><div style="text-align:right"><p style="font-size:8.5pt;color:#7c3aed">2022 – 2025</p><span class="badge">CGPA: 7.71</span></div></div>
<div class="edu-row"><div><p class="label">Intermediate (Science)</p><p class="sub">Kalam Institute of Technology</p></div><div style="text-align:right"><p style="font-size:8.5pt;color:#7c3aed">2020 – 2022</p><span class="badge">76%</span></div></div>
<div class="edu-row"><div><p class="label">Secondary School Certificate (SSC)</p><p class="sub">Basudev Govt High School</p></div><div style="text-align:right"><p style="font-size:8.5pt;color:#7c3aed">2020</p><span class="badge">73%</span></div></div>
</section>
<section>
<h2>Achievements</h2>
<ul>
  <li>Completed multiple Data Science projects using Python and Machine Learning techniques.</li>
  <li>Built a Flight Fare Prediction model using regression algorithms.</li>
  <li>Published data science projects on GitHub demonstrating data science and visualization skills.</li>
  <li>Performed Exploratory Data Analysis on real-world datasets including the Titanic dataset.</li>
</ul>
</section>
<script>window.onload=function(){window.print();}</script>
</body>
</html>`;

    printWindow.document.write(html);
    printWindow.document.close();
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        className="max-w-3xl w-full p-0 bg-card border-border overflow-hidden"
        data-ocid="resume.dialog"
      >
        {/* Sticky top bar */}
        <div className="sticky top-0 z-10 bg-card/95 backdrop-blur border-b border-border px-6 py-4 flex items-center justify-between gap-4">
          <DialogHeader className="p-0">
            <DialogTitle className="font-display text-base text-foreground">
              Resume Preview
            </DialogTitle>
          </DialogHeader>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-mono text-xs flex items-center gap-1.5"
              onClick={handleDownload}
              data-ocid="resume.primary_button"
            >
              <FileDown size={14} />
              "Download"
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="text-muted-foreground hover:text-foreground w-8 h-8 p-0"
              onClick={onClose}
              data-ocid="resume.close_button"
            >
              <X size={16} />
            </Button>
          </div>
        </div>

        {/* Scrollable resume body */}
        <ScrollArea className="h-[78vh]">
          <div className="px-8 py-8 space-y-8" ref={bodyRef}>
            {/* ---- HEADER ---- */}
            <div className="text-center space-y-2">
              <h1 className="font-display text-3xl md:text-4xl font-bold text-gradient leading-tight">
                Prem Prasad Swain
              </h1>
              <p className="font-mono text-sm text-primary/90 tracking-widest uppercase">
                Data Analyst &amp; Data Scientist Aspirant
              </p>
              {/* Contact row */}
              <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 pt-2">
                <a
                  href="mailto:premprasad6370@gmail.com"
                  className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail size={12} />
                  premprasad6370@gmail.com
                </a>
                <a
                  href="tel:+916370959392"
                  className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground hover:text-primary transition-colors"
                >
                  <Phone size={12} />
                  +91 6370959392
                </a>
                <a
                  href="https://linkedin.com/in/premprasad1707"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground hover:text-primary transition-colors"
                >
                  <Linkedin size={12} />
                  linkedin.com/in/premprasad1707
                </a>
                <a
                  href="https://github.com/premprasad1707"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground hover:text-primary transition-colors"
                >
                  <Github size={12} />
                  github.com/premprasad1707
                </a>
              </div>
            </div>

            <Separator className="bg-primary/20" />

            {/* ---- SUMMARY ---- */}
            <div>
              <h2 className="resume-section-heading">Professional Summary</h2>
              <p className="text-muted-foreground text-sm leading-relaxed mt-3">
                Aspiring Data Analyst and Data Scientist with a strong
                foundation in Python, SQL, and Machine Learning. Experienced in
                EDA, feature engineering, model development, and data
                visualization using tools like Power BI and Streamlit.
                Passionate about transforming raw data into actionable insights.
              </p>
            </div>

            <Separator className="bg-border/60" />

            {/* ---- SKILLS ---- */}
            <div>
              <h2 className="resume-section-heading">Technical Skills</h2>
              <div className="mt-3 space-y-3">
                {Object.entries(RESUME_SKILLS).map(([category, skills]) => (
                  <div
                    key={category}
                    className="flex flex-wrap items-start gap-2"
                  >
                    <span className="font-mono text-xs text-primary/80 w-36 flex-shrink-0 pt-0.5">
                      {category}
                    </span>
                    <div className="flex flex-wrap gap-1.5 flex-1">
                      {skills.map((skill) => (
                        <span
                          key={skill}
                          className="font-mono text-xs px-2 py-0.5 rounded-sm bg-primary/10 text-primary border border-primary/20"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Separator className="bg-border/60" />

            {/* ---- INTERNSHIP ---- */}
            <div>
              <h2 className="resume-section-heading">Internship Experience</h2>
              <div className="mt-3">
                <div className="flex items-start justify-between gap-4 mb-1">
                  <div>
                    <p className="font-display font-semibold text-foreground text-sm">
                      Data Science Intern
                    </p>
                    <p className="font-mono text-xs text-primary/80">
                      Teks Academy
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className="font-mono text-xs border-primary/30 text-primary flex-shrink-0"
                  >
                    Jan 2026 – Feb 2026
                  </Badge>
                </div>
                <ul className="mt-2 space-y-1 pl-4">
                  {[
                    "Conducted exploratory data analysis on multiple datasets to identify trends and insights.",
                    "Developed a flight ticket price prediction model using regression techniques.",
                    "Performed data cleaning, preprocessing, and feature engineering.",
                    "Created visualizations and dashboards to present findings.",
                    "Published project work on GitHub for collaboration and documentation.",
                  ].map((point) => (
                    <li
                      key={point}
                      className="text-muted-foreground text-xs leading-relaxed list-disc"
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <Separator className="bg-border/60" />

            {/* ---- PROJECTS ---- */}
            <div>
              <h2 className="resume-section-heading">Projects</h2>
              <div className="mt-3 grid sm:grid-cols-2 gap-3">
                {RESUME_PROJECTS.map((proj) => (
                  <div
                    key={proj.title}
                    className="p-3 rounded-md bg-muted/40 border border-border hover:border-primary/40 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className="font-display font-semibold text-foreground text-xs leading-snug">
                        {proj.title}
                      </p>
                      <a
                        href={proj.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary/60 hover:text-primary transition-colors flex-shrink-0"
                      >
                        <ExternalLink size={11} />
                      </a>
                    </div>
                    <p className="font-mono text-[10px] text-primary/70 mb-1">
                      {proj.stack}
                    </p>
                    <p className="text-muted-foreground text-xs leading-relaxed">
                      {proj.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <Separator className="bg-border/60" />

            {/* ---- EDUCATION ---- */}
            <div>
              <h2 className="resume-section-heading">Education</h2>
              <div className="mt-3 space-y-3">
                {[
                  {
                    degree: "Bachelor of Computer Applications (BCA)",
                    institution: "Science College (Autonomous), Hinjilicut",
                    period: "2022 – 2025",
                    result: "CGPA: 7.71",
                  },
                  {
                    degree: "Intermediate (Science)",
                    institution: "Kalam Institute of Technology",
                    period: "2020 – 2022",
                    result: "76%",
                  },
                  {
                    degree: "Secondary School Certificate (SSC)",
                    institution: "Basudev Govt High School",
                    period: "2020",
                    result: "73%",
                  },
                ].map((edu) => (
                  <div
                    key={edu.degree}
                    className="flex items-start justify-between gap-4 pl-3 border-l-2 border-primary/30"
                  >
                    <div>
                      <p className="font-display font-semibold text-foreground text-xs">
                        {edu.degree}
                      </p>
                      <p className="flex items-center gap-1 font-mono text-xs text-muted-foreground mt-0.5">
                        <MapPin size={10} />
                        {edu.institution}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="font-mono text-xs text-primary/80">
                        {edu.period}
                      </p>
                      <Badge
                        variant="secondary"
                        className="font-mono text-[10px] mt-0.5 bg-primary/10 text-primary border-0"
                      >
                        {edu.result}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Separator className="bg-border/60" />

            {/* ---- ACHIEVEMENTS ---- */}
            <div>
              <h2 className="resume-section-heading">Achievements</h2>
              <ul className="mt-3 space-y-1.5 pl-4">
                {[
                  "Completed multiple Data Science projects using Python and Machine Learning techniques.",
                  "Built a Flight Fare Prediction model using regression algorithms.",
                  "Published data science projects on GitHub demonstrating data analysis and visualization skills.",
                  "Performed Exploratory Data Analysis on real-world datasets including the Titanic dataset.",
                ].map((item) => (
                  <li
                    key={item}
                    className="text-muted-foreground text-xs leading-relaxed list-disc"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Bottom padding */}
            <div className="h-4" />
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

// ---------- DATA ----------
const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Internship", href: "#internship" },
  { label: "Education", href: "#education" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];

const STATS = [
  { value: "6", label: "Projects Built", icon: Code2 },
  { value: "5+", label: "Technologies", icon: Layers },
  { value: "3", label: "ML Models", icon: BrainCircuit },
];

const SKILL_GROUPS = [
  {
    title: "Programming & Data",
    icon: Database,
    color: "primary",
    skills: [
      "Python",
      "SQL",
      "Pandas",
      "NumPy",
      "Matplotlib",
      "Seaborn",
      "Scikit-learn",
    ],
  },
  {
    title: "ML & AI",
    icon: BrainCircuit,
    color: "accent",
    skills: [
      "Machine Learning",
      "Deep Learning",
      "NLP",
      "EDA",
      "Feature Engineering",
      "K-Means Clustering",
    ],
  },
  {
    title: "Tools & Platforms",
    icon: Wrench,
    color: "secondary",
    skills: ["Power BI", "Jupyter Notebook", "Streamlit", "Git", "GitHub"],
  },
  {
    title: "Soft Skills",
    icon: Users,
    color: "muted",
    skills: [
      "Analytical Thinking",
      "Problem Solving",
      "Attention to Detail",
      "Continuous Learning",
    ],
  },
];

const PROJECTS = [
  {
    title: "Flight Fare Prediction",
    description:
      "ML model to predict flight ticket prices based on airline, journey date, source, destination, duration, and stops.",
    stack: ["Python", "Scikit-learn", "Streamlit", "EDA"],
    github: "https://github.com/premprasad1707/flight_fare_prediction",
    icon: BarChart3,
  },
  {
    title: "Food Online Delivery Analysis",
    description:
      "End-to-end BI workflow integrating Python with Power BI for comprehensive food orders data analysis and dashboards.",
    stack: ["Python", "Power BI", "Jupyter Notebook"],
    github: "https://github.com/premprasad1707/food_online_delivery_analysis",
    icon: Database,
  },
  {
    title: "Iris Dataset Clustering",
    description:
      "K-Means Clustering on the Iris dataset using sepal features, dividing data into 3 distinct clusters.",
    stack: ["Python", "Scikit-learn", "Matplotlib"],
    github: "https://github.com/premprasad1707/iris_dataset_clustering",
    icon: BrainCircuit,
  },
  {
    title: "Telecom EDA & Prediction",
    description:
      "Event-driven architecture analysis for telecom systems with exploratory data analysis and ML predictions.",
    stack: ["Python", "Jupyter Notebook", "Pandas"],
    github: "https://github.com/premprasad1707/telecom_predict",
    icon: Layers,
  },
  {
    title: "Job Market Data Analysis",
    description:
      "Analyzes job market dataset to identify demand trends, salary ranges, and industry insights across roles.",
    stack: ["Python", "Pandas", "Matplotlib", "Jupyter Notebook"],
    github:
      "https://github.com/premprasad1707/Job_Market_Exploitery-Data-Analysis",
    icon: BarChart3,
  },
  {
    title: "Titanic EDA",
    description:
      "Exploratory data analysis on the Titanic dataset to uncover survival prediction insights and passenger patterns.",
    stack: ["Python", "Pandas", "Seaborn", "Jupyter Notebook"],
    github:
      "https://github.com/premprasad1707/Titanic-Exploitery-Data-Analysis",
    icon: Database,
  },
];

const EDUCATION = [
  {
    degree: "Bachelor of Computer Applications (BCA)",
    institution: "Science College (Autonomous), Hinjilicut",
    period: "2022 – 2025",
    result: "CGPA: 7.71",
  },
  {
    degree: "Intermediate (Science)",
    institution: "Kalam Institute of Technology",
    period: "2020 – 2022",
    result: "Percentage: 76%",
  },
  {
    degree: "Secondary School Certificate (SSC)",
    institution: "Basudev Govt High School",
    period: "2020",
    result: "Percentage: 73%",
  },
];

const ACHIEVEMENTS = [
  "Completed multiple Data Science projects using Python and Machine Learning techniques.",
  "Built a Flight Fare Prediction model using regression algorithms.",
  "Published data science projects on GitHub demonstrating data analysis and visualization skills.",
  "Performed Exploratory Data Analysis on real-world datasets including the Titanic dataset.",
];

// Data science watermark words
const DS_WORDS = [
  "Data Science",
  "Machine Learning",
  "Python",
  "EDA",
  "AI",
  "Deep Learning",
  "NLP",
  "Pandas",
  "NumPy",
  "Scikit-learn",
  "Power BI",
  "Data Analyst",
  "SQL",
  "Visualization",
  "Clustering",
  "Regression",
  "Neural Network",
  "Statistics",
  "Feature Engineering",
  "Aspirant",
];

// ---------- DATA SCIENCE WATERMARK BACKGROUND ----------
function DataScienceWatermark() {
  const words = DS_WORDS;
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 overflow-hidden pointer-events-none z-0 select-none"
      style={{ opacity: 0.04 }}
    >
      <div
        className="flex flex-wrap gap-6 p-8 h-full content-start"
        style={{ filter: "blur(0.3px)" }}
      >
        {Array.from({ length: 8 }).flatMap((_, row) =>
          words.map((word, col) => (
            <span
              key={"$row-$word"}
              className="font-mono text-primary whitespace-nowrap"
              style={{
                fontSize: "$0.65 + ((row * words.length + col) % 4) * 0.2rem",
                transform: `rotate(${((row * words.length + col) % 3) * -8 + 4}deg)`,
                opacity: 0.7 + ((row * words.length + col) % 3) * 0.1,
              }}
            >
              {word}
            </span>
          )),
        )}
      </div>
    </div>
  );
}

// ---------- SECTION WRAPPER ----------
function Section({
  id,
  children,
  className = "",
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useScrollReveal();
  return (
    <section id={id} className={`py-20 md:py-28 ${className}`}>
      <div ref={ref} className="fade-in container mx-auto px-4 max-w-6xl">
        {children}
      </div>
    </section>
  );
}

// ---------- SECTION HEADING ----------
function SectionHeading({ label, title }: { label: string; title: string }) {
  return (
    <div className="mb-12">
      <p className="section-label text-primary mb-3">{label}</p>
      <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground leading-tight">
        {title}
      </h2>
      <div className="mt-4 h-px w-16 bg-primary" />
    </div>
  );
}

// ---------- NAVBAR ----------
function Navbar({ onOpenResume }: { onOpenResume: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [_scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 $
        scrolled
          ? "bg-background/90 backdrop-blur-md border-b border-border shadow-lg"
          : "bg-transparent"`}
    >
      <nav className="container mx-auto px-4 max-w-6xl flex items-center justify-between h-16">
        {/* Logo */}
        <button
          type="button"
          onClick={() => handleNavClick("#hero")}
          className="font-display font-bold text-xl text-foreground hover:text-primary transition-colors bg-transparent border-none p-0 cursor-pointer"
          data-ocid="nav.link"
        >
          <span className="text-primary">prem</span>
          <span className="text-muted-foreground">.</span>prasad
        </button>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link, _i) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="px-4 py-2 text-sm text-muted-foreground hover:text-primary transition-colors rounded-md hover:bg-muted/50"
                data-ocid={"nav.link.$i + 1"}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop resume button */}
        <Button
          size="sm"
          variant="outline"
          className="hidden md:flex items-center gap-2 border-primary/40 text-primary hover:bg-primary/10 font-mono text-xs"
          onClick={onOpenResume}
          data-ocid="nav.primary_button"
        >
          <FileDown size={14} />
          Resume
        </Button>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="md:hidden p-2 text-muted-foreground hover:text-foreground"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          data-ocid="nav.toggle"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-b border-border">
          <ul className="container mx-auto px-4 py-4 flex flex-col gap-1">
            {NAV_LINKS.map((link, _i) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="block px-4 py-3 text-sm text-muted-foreground hover:text-primary transition-colors rounded-md hover:bg-muted/50"
                  data-ocid={"nav.mobile.link.$i + 1"}
                >
                  {link.label}
                </a>
              </li>
            ))}
            {/* Mobile resume button */}
            <li>
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  onOpenResume();
                }}
                className="flex items-center gap-2 w-full px-4 py-3 text-sm text-primary hover:bg-primary/10 transition-colors rounded-md font-mono"
                data-ocid="nav.mobile.primary_button"
              >
                <FileDown size={16} />
                View Resume
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

// ---------- HERO ----------
function Hero({ onOpenResume }: { onOpenResume: () => void }) {
  const handleScroll = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('/assets/generated/hero-data-bg.dim_1600x900.jpg')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/50" />
      <div className="absolute inset-0 dot-grid opacity-20" />

      {/* Violet glow blob — top right */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/8 blur-[120px] pointer-events-none" />
      {/* Second violet blob — bottom left */}
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[100px] pointer-events-none" />

      <div className="relative container mx-auto px-4 max-w-6xl pt-24 pb-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div>
            <p className="section-label text-primary mb-4 animate-pulse-glow">
              Hello, World —
            </p>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-4">
              <span className="text-foreground">Prem Prasad</span>
              <br />
              <span className="text-gradient">Swain</span>
            </h1>
            <p className="font-mono text-sm text-primary/80 mb-4 tracking-wide">
              Data Analyst &amp; Data Scientist Aspirant
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-lg">
              Passionate about transforming raw data into meaningful insights.
              Strong background in Python, SQL, Power BI, Machine Learning, and
              Deep Learning. Building data-driven solutions to real-world
              problems.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-8 glow-teal"
                onClick={() => handleScroll("#projects")}
                data-ocid="hero.primary_button"
              >
                View Projects
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-border text-foreground hover:bg-muted/50 hover:border-primary font-semibold px-8"
                onClick={() => handleScroll("#contact")}
                data-ocid="hero.secondary_button"
              >
                Contact Me
              </Button>
            </div>

            {/* Quick links */}
            <div className="flex gap-4 mt-8 items-center">
              <a
                href="https://github.com/premprasad1707"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="GitHub"
                data-ocid="hero.link.1"
              >
                <Github size={20} />
              </a>
              <a
                href={window.location.origin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Portfolio"
                title="My Portfolio"
                data-ocid="hero.link.portfolio"
              >
                <Globe size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/premprasad1707/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="LinkedIn"
                data-ocid="hero.link.2"
              >
                <Linkedin size={20} />
              </a>
              <button
                type="button"
                onClick={onOpenResume}
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="View Resume"
                title="View ATS-Friendly Resume"
                data-ocid="hero.open_modal_button"
              >
                <FileDown size={20} />
              </button>
            </div>
          </div>

          {/* Profile photo */}
          <div className="flex justify-center md:justify-end">
            <div className="relative">
              {/* Outer glow ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/40 via-accent/20 to-transparent blur-2xl scale-110" />
              {/* Decorative ring */}
              <div className="absolute -inset-3 rounded-full border border-primary/20" />
              <div className="absolute -inset-6 rounded-full border border-primary/10" />
              <img
                src="/assets/uploads/Gemini_Generated_Image_fzr7jmfzr7jmfzr7-1-1.png"
                alt="Prem Prasad Swain"
                className="relative w-56 h-56 md:w-72 md:h-72 rounded-full object-cover object-top border-2 border-primary/40 shadow-2xl animate-float"
              />
              {/* Status badge */}
              <div className="absolute bottom-4 right-0 bg-card border border-border rounded-full px-3 py-1.5 flex items-center gap-2 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="font-mono text-xs text-muted-foreground">
                  Open to Work
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted-foreground/50">
          <span className="font-mono text-xs">scroll</span>
          <ChevronDown size={16} className="animate-bounce" />
        </div>
      </div>
    </section>
  );
}

// ---------- ABOUT ----------
function About() {
  return (
    <Section id="about" className="bg-card/30">
      <SectionHeading label="// 01. about" title="Who I Am" />
      <div className="grid md:grid-cols-5 gap-12 items-start">
        <div className="md:col-span-3">
          <p className="text-muted-foreground text-lg leading-relaxed mb-6">
            I&apos;m an aspiring Data Analyst and Data Scientist with a strong
            foundation in Python programming, SQL, and business intelligence
            tools. I enjoy uncovering patterns in data and building machine
            learning models that solve real-world problems.
          </p>
          <p className="text-muted-foreground text-lg leading-relaxed">
            With hands-on experience in EDA, feature engineering, model
            training, and deployment using Streamlit, I&apos;m constantly
            growing my skills and building projects that showcase my passion for
            data science.
          </p>
        </div>
        <div className="md:col-span-2 grid grid-cols-1 gap-4">
          {STATS.map((stat, _i) => (
            <Card
              key={stat.label}
              className="bg-card border-border card-hover"
              data-ocid={"about.card.$i + 1"}
            >
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <stat.icon className="text-primary" size={22} />
                </div>
                <div>
                  <p className="font-display text-3xl font-bold text-foreground">
                    {stat.value}
                  </p>
                  <p className="font-mono text-xs text-muted-foreground mt-0.5">
                    {stat.label}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ---------- SKILLS ----------
function Skills() {
  return (
    <Section id="skills">
      <SectionHeading label="// 02. skills" title="Technical Arsenal" />
      <div className="grid sm:grid-cols-2 gap-6">
        {SKILL_GROUPS.map((group, _gi) => (
          <Card
            key={group.title}
            className="bg-card border-border"
            data-ocid={"skills.card.$gi + 1"}
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-md bg-primary/10 flex items-center justify-center">
                  <group.icon className="text-primary" size={18} />
                </div>
                <h3 className="font-display font-semibold text-foreground">
                  {group.title}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="font-mono text-xs px-2.5 py-1 rounded-sm bg-muted text-muted-foreground border border-border hover:border-primary/50 hover:text-primary transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
}

// ---------- PROJECTS ----------
function Projects() {
  return (
    <Section id="projects" className="bg-card/20">
      <SectionHeading label="// 03. projects" title="What I've Built" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {PROJECTS.map((project, i) => (
          <Card
            key={project.title}
            className="bg-card border-border card-hover flex flex-col"
            data-ocid={"projects.item.$i + 1"}
          >
            <CardContent className="p-6 flex flex-col flex-1">
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <project.icon className="text-primary" size={20} />
                </div>
                <span className="font-mono text-xs text-primary/60">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              <h3 className="font-display font-semibold text-foreground text-base mb-2 leading-snug">
                {project.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-4">
                {project.description}
              </p>

              {/* Stack */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {project.stack.map((tech) => (
                  <Badge
                    key={tech}
                    variant="secondary"
                    className="font-mono text-xs px-2 py-0.5 bg-muted text-muted-foreground border border-border"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>

              <Separator className="mb-4 bg-border" />

              {/* GitHub link */}
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors font-mono"
                data-ocid={"projects.link.$i + 1"}
              >
                <Github size={14} />
                View on GitHub
                <ExternalLink size={12} className="ml-auto" />
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
}

// ---------- INTERNSHIP ----------
function Internship() {
  return (
    <Section id="internship">
      <SectionHeading label="// 04. internship" title="Internship Experience" />
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 top-0 bottom-0 w-px bg-border md:left-6" />

        <div className="space-y-8">
          <div
            className="relative pl-12 md:pl-16"
            data-ocid="internship.item.1"
          >
            <div className="absolute left-2.5 top-1.5 w-3 h-3 rounded-full bg-primary border-2 border-background md:left-[18px]" />
            <Card className="bg-card border-border card-hover">
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <h3 className="font-display font-semibold text-foreground text-base">
                      Data Science Intern
                    </h3>
                    <p className="font-mono text-sm text-primary/80 mt-1">
                      Teks Academy
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className="font-mono text-xs border-primary/30 text-primary flex-shrink-0"
                  >
                    Jan 2026 – Feb 2026
                  </Badge>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Conducted exploratory data analysis on multiple datasets to
                  identify trends and insights. Developed a flight ticket price
                  prediction model using regression techniques and performed
                  data cleaning and preprocessing. Created visualizations and
                  dashboards to present findings and shared project work through
                  GitHub for collaboration and documentation.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Section>
  );
}

// ---------- EDUCATION ----------
function Education() {
  return (
    <Section id="education" className="bg-card/20">
      <SectionHeading label="// 05. education" title="Academic Background" />
      <div className="grid md:grid-cols-3 gap-6">
        {EDUCATION.map((edu, _i) => (
          <Card
            key={edu.degree}
            className="bg-card border-border card-hover"
            data-ocid={"education.card.$i + 1"}
          >
            <CardContent className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-foreground text-sm leading-snug">
                    {edu.degree}
                  </h3>
                </div>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p className="text-foreground/80 text-sm leading-snug">
                  {edu.institution}
                </p>
                <div className="flex items-center justify-between pt-1">
                  <span className="font-mono text-xs text-primary/70">
                    {edu.period}
                  </span>
                  <Badge
                    variant="secondary"
                    className="font-mono text-xs bg-primary/10 text-primary border-0"
                  >
                    {edu.result}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
}

// ---------- ACHIEVEMENTS ----------
function Achievements() {
  return (
    <Section id="achievements">
      <SectionHeading label="// 06. achievements" title="Achievements" />
      <div className="max-w-3xl">
        <ul className="space-y-4">
          {ACHIEVEMENTS.map((achievement, _i) => (
            <li
              key={achievement}
              className="flex items-start gap-4"
              data-ocid={"achievements.item.$i + 1"}
            >
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Star className="text-primary" size={16} />
              </div>
              <Card className="bg-card border-border flex-1">
                <CardContent className="p-4">
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {achievement}
                  </p>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

// ---------- CONTACT ----------
function Contact() {
  return (
    <Section id="contact" className="bg-card/20">
      <SectionHeading label="// 07. contact" title="Get In Touch" />
      <div className="max-w-2xl">
        <p className="text-muted-foreground text-lg leading-relaxed mb-10">
          Feel free to reach out for collaboration, internships, or just a chat
          about data!
        </p>
        <div className="grid sm:grid-cols-3 gap-4">
          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/premprasad1707/"
            target="_blank"
            rel="noopener noreferrer"
            className="group"
            data-ocid="contact.link.1"
          >
            <Card className="bg-card border-border card-hover h-full">
              <CardContent className="p-6 flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[oklch(0.45_0.13_250)]/20 flex items-center justify-center group-hover:bg-[oklch(0.45_0.13_250)]/30 transition-colors">
                  <Linkedin className="text-[oklch(0.65_0.13_250)]" size={24} />
                </div>
                <div>
                  <p className="font-display font-semibold text-foreground text-sm">
                    LinkedIn
                  </p>
                  <p className="font-mono text-xs text-muted-foreground mt-1">
                    premprasad1707
                  </p>
                </div>
              </CardContent>
            </Card>
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/premprasad1707"
            target="_blank"
            rel="noopener noreferrer"
            className="group"
            data-ocid="contact.link.2"
          >
            <Card className="bg-card border-border card-hover h-full">
              <CardContent className="p-6 flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-foreground/5 flex items-center justify-center group-hover:bg-foreground/10 transition-colors">
                  <Github className="text-foreground" size={24} />
                </div>
                <div>
                  <p className="font-display font-semibold text-foreground text-sm">
                    GitHub
                  </p>
                  <p className="font-mono text-xs text-muted-foreground mt-1">
                    premprasad1707
                  </p>
                </div>
              </CardContent>
            </Card>
          </a>

          {/* Email */}
          <a
            href="mailto:premprasad6370@gmail.com"
            className="group"
            data-ocid="contact.link.3"
          >
            <Card className="bg-card border-border card-hover h-full">
              <CardContent className="p-6 flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Mail className="text-primary" size={24} />
                </div>
                <div>
                  <p className="font-display font-semibold text-foreground text-sm">
                    Email
                  </p>
                  <p className="font-mono text-xs text-muted-foreground mt-1 break-all">
                    premprasad6370@gmail.com
                  </p>
                </div>
              </CardContent>
            </Card>
          </a>
        </div>
      </div>
    </Section>
  );
}

// ---------- THANK YOU SECTION ----------
function ThankYou({ onOpenResume }: { onOpenResume: () => void }) {
  return (
    <section
      id="thankyou"
      className="relative py-20 overflow-hidden"
      data-ocid="thankyou.section"
    >
      {/* Glowing background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-primary/10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-primary/10 blur-[100px] pointer-events-none" />

      <div className="relative container mx-auto px-4 max-w-3xl text-center">
        {/* Thank you heading */}
        <div className="mb-6">
          <Heart
            className="inline-block text-primary mb-4 animate-pulse"
            size={40}
            fill="currentColor"
          />
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Thank You for Visiting!
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-xl mx-auto">
            I appreciate you taking the time to explore my portfolio. I&apos;m
            always open to new opportunities, collaborations, or a friendly
            conversation about data science. Let&apos;s connect!
          </p>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 justify-center my-8">
          <div className="h-px flex-1 max-w-24 bg-border" />
          <span className="font-mono text-xs text-muted-foreground">
            connect with me
          </span>
          <div className="h-px flex-1 max-w-24 bg-border" />
        </div>

        {/* Connect icons */}
        <div className="flex items-center justify-center gap-6">
          {/* WhatsApp */}
          <a
            href="https://wa.me/916370959392"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Connect on WhatsApp"
            data-ocid="thankyou.link.1"
            className="group flex flex-col items-center gap-3"
          >
            <div className="w-16 h-16 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/30 flex items-center justify-center group-hover:bg-[#25D366]/20 group-hover:border-[#25D366]/60 group-hover:scale-110 transition-all duration-200 shadow-lg">
              <MessageCircle
                size={32}
                className="text-[#25D366] group-hover:scale-110 transition-transform"
              />
            </div>
            <span className="font-mono text-xs text-muted-foreground group-hover:text-[#25D366] transition-colors">
              WhatsApp
            </span>
          </a>

          {/* Email */}
          <a
            href="mailto:premprasad6370@gmail.com"
            aria-label="Send an Email"
            data-ocid="thankyou.link.2"
            className="group flex flex-col items-center gap-3"
          >
            <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center group-hover:bg-primary/20 group-hover:border-primary/60 group-hover:scale-110 transition-all duration-200 shadow-lg">
              <Mail
                size={32}
                className="text-primary group-hover:scale-110 transition-transform"
              />
            </div>
            <span className="font-mono text-xs text-muted-foreground group-hover:text-primary transition-colors">
              Email Me
            </span>
          </a>

          {/* Resume view */}
          <button
            type="button"
            onClick={onOpenResume}
            aria-label="View Resume"
            data-ocid="thankyou.open_modal_button"
            className="group flex flex-col items-center gap-3"
          >
            <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center group-hover:bg-primary/20 group-hover:border-primary/60 group-hover:scale-110 transition-all duration-200 shadow-lg">
              <FileDown
                size={32}
                className="text-primary group-hover:scale-110 transition-transform"
              />
            </div>
            <span className="font-mono text-xs text-muted-foreground group-hover:text-primary transition-colors">
              Resume
            </span>
          </button>
        </div>

        <p className="mt-10 font-mono text-xs text-muted-foreground/50">
          — Prem Prasad Swain · Data Scientist Aspirant
        </p>
      </div>
    </section>
  );
}

// ---------- FOOTER ----------
function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border py-8">
      <div className="container mx-auto px-4 max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-mono text-xs text-muted-foreground">
          © {year} Prem Prasad Swain. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

// ---------- APP ----------
export default function App() {
  const [resumeOpen, setResumeOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      {/* Data Science watermark background -- spans entire page */}
      <DataScienceWatermark />

      <div className="relative z-10">
        <Navbar onOpenResume={() => setResumeOpen(true)} />
        <main>
          <Hero onOpenResume={() => setResumeOpen(true)} />
          <About />
          <Skills />
          <Projects />
          <Internship />
          <Education />
          <Achievements />
          <Contact />
          <ThankYou onOpenResume={() => setResumeOpen(true)} />
        </main>
        <Footer />
      </div>

      <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} />
    </div>
  );
}
