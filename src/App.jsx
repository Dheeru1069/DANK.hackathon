import { useState } from "react";

import {
  questionBank,
  evaluateAssessment,
  getOverallScore,
  getRecommendations,
} from "./assessmentLogic";
import {
  Brain,
  Target,
  BookOpen,
  BarChart3,
  ArrowRight,
  CheckCircle,
  Clock,
  TrendingUp,
  Sparkles,
  ChevronRight,
  Home,
  User,
  ClipboardCheck,
  Lightbulb,
} from "lucide-react";
import "./App.css";

const skills = [
  { name: "Algebra", score: 82 },
  { name: "Calculus", score: 64 },
  { name: "Probability", score: 28 },
  { name: "Trigonometry", score: 71 },
  { name: "Coordinate Geometry", score: 48 },
];

const questions = [
  {
    skill: "Algebra",
    question: "If 2x + 5 = 15, what is x?",
    options: ["3", "5", "7", "10"],
    answer: 1,
  },
  {
    skill: "Calculus",
    question: "What is the derivative of x²?",
    options: ["x", "2x", "x²", "2"],
    answer: 1,
  },
  {
    skill: "Probability",
    question: "What is the probability of getting heads on a fair coin?",
    options: ["0", "1/4", "1/2", "1"],
    answer: 2,
  },
  {
    skill: "Trigonometry",
    question: "What is sin 90°?",
    options: ["0", "1/2", "1", "-1"],
    answer: 2,
  },
  {
    skill: "Coordinate Geometry",
    question: "What is the distance between (0,0) and (3,4)?",
    options: ["3", "4", "5", "7"],
    answer: 2,
  },
];

function App() {
  const [page, setPage] = useState("home");
  const [profile, setProfile] = useState({
    name: "",
    grade: "Class 12",
    exam: "JEE",
    hours: 2,
  });

  const [answers, setAnswers] = useState({});
  const [completed, setCompleted] = useState(false);

  const startAssessment = () => {
    setPage("assessment");
  };

  const submitAssessment = () => {
    setCompleted(true);
    setPage("analysis");
  };

  return (
    <div className="app">
      {page !== "home" && (
        <aside className="sidebar">
          <div className="logo">
            <div className="logo-icon">
              <Brain size={22} />
            </div>
            <span>LearnPath<span className="purple">AI</span></span>
          </div>

          <nav>
            <SideButton
              icon={<Home size={19} />}
              text="Overview"
              active={page === "profile"}
              onClick={() => setPage("profile")}
            />
            <SideButton
              icon={<ClipboardCheck size={19} />}
              text="Assessment"
              active={page === "assessment"}
              onClick={() => setPage("assessment")}
            />
            <SideButton
              icon={<BarChart3 size={19} />}
              text="Analysis"
              active={page === "analysis"}
              onClick={() => setPage("analysis")}
            />
            <SideButton
              icon={<Lightbulb size={19} />}
              text="Recommendations"
              active={page === "recommendations"}
              onClick={() => setPage("recommendations")}
            />
            <SideButton
              icon={<BookOpen size={19} />}
              text="Learning Path"
              active={page === "learning"}
              onClick={() => setPage("learning")}
            />
            <SideButton
              icon={<TrendingUp size={19} />}
              text="Progress"
              active={page === "dashboard"}
              onClick={() => setPage("dashboard")}
            />
          </nav>

          <div className="sidebar-bottom">
            <div className="mini-profile">
              <div className="avatar">
                {profile.name ? profile.name[0].toUpperCase() : "A"}
              </div>
              <div>
                <strong>{profile.name || "Demo Student"}</strong>
                <span>{profile.grade} • {profile.exam}</span>
              </div>
            </div>
          </div>
        </aside>
      )}

      <main className={page === "home" ? "main full" : "main"}>
        {page === "home" && (
          <HomePage onStart={startAssessment} />
        )}

        {page === "profile" && (
          <ProfilePage
            profile={profile}
            setProfile={setProfile}
            onContinue={startAssessment}
          />
        )}

        {page === "assessment" && (
          <AssessmentPage
            answers={answers}
            setAnswers={setAnswers}
            onSubmit={submitAssessment}
          />
        )}

        {page === "analysis" && (
          <AnalysisPage
            onNext={() => setPage("recommendations")}
          />
        )}

        {page === "recommendations" && (
          <RecommendationsPage
            onNext={() => setPage("learning")}
          />
        )}

        {page === "learning" && (
          <LearningPathPage
            onNext={() => setPage("dashboard")}
          />
        )}

        {page === "dashboard" && (
          <DashboardPage />
        )}
      </main>
    </div>
  );
}

function SideButton({ icon, text, active, onClick }) {
  return (
    <button className={`side-button ${active ? "active" : ""}`} onClick={onClick}>
      {icon}
      <span>{text}</span>
    </button>
  );
}

function HomePage({ onStart }) {
  return (
    <section className="home-page">
      <div className="hero-glow"></div>

      <div className="hero-content">
        <div className="badge">
          <Sparkles size={15} />
          AI-Powered Personalized Learning
        </div>

        <h1>
          Learn smarter.
          <br />
          <span>Not harder.</span>
        </h1>

        <p>
          LearnPath AI analyzes your strengths, identifies your skill gaps,
          and builds a personalized learning path that adapts to you.
        </p>

        <div className="hero-buttons">
          <button className="primary-btn big" onClick={onStart}>
            Build My Learning Path
            <ArrowRight size={19} />
          </button>

          <button className="secondary-btn">
            See How It Works
          </button>
        </div>

        <div className="hero-stats">
          <div>
            <strong>01</strong>
            <span>Assess</span>
          </div>
          <div>
            <strong>02</strong>
            <span>Analyze</span>
          </div>
          <div>
            <strong>03</strong>
            <span>Personalize</span>
          </div>
          <div>
            <strong>04</strong>
            <span>Improve</span>
          </div>
        </div>
      </div>

      <div className="hero-preview">
        <div className="preview-card">
          <div className="preview-top">
            <div>
              <span className="small-label">STUDENT ANALYSIS</span>
              <h3>Arjun's Learning Profile</h3>
            </div>
            <div className="score-circle">
              <strong>68%</strong>
              <span>overall</span>
            </div>
          </div>

          {skills.slice(0, 4).map((skill) => (
            <div className="skill-preview" key={skill.name}>
              <div>
                <span>{skill.name}</span>
                <strong>{skill.score}%</strong>
              </div>
              <div className="progress-bg">
                <div
                  className="progress-fill"
                  style={{ width: `${skill.score}%` }}
                ></div>
              </div>
            </div>
          ))}

          <div className="ai-insight">
            <Sparkles size={17} />
            <span>
              <strong>AI Insight:</strong> Focus on Probability first.
              It has the highest skill gap.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProfilePage({ profile, setProfile, onContinue }) {
  return (
    <div className="page">
      <PageHeader
        eyebrow="STEP 01"
        title="Create your learning profile"
        description="Tell us a little about yourself so we can personalize your journey."
      />

      <div className="form-card">
        <div className="form-icon">
          <User size={24} />
        </div>

        <label>Your Name</label>
        <input
          value={profile.name}
          onChange={(e) =>
            setProfile({ ...profile, name: e.target.value })
          }
          placeholder="Enter your name"
        />

        <div className="form-grid">
          <div>
            <label>Grade</label>
            <select
              value={profile.grade}
              onChange={(e) =>
                setProfile({ ...profile, grade: e.target.value })
              }
            >
              <option>Class 11</option>
              <option>Class 12</option>
              <option>College</option>
            </select>
          </div>

          <div>
            <label>Target Exam</label>
            <select
              value={profile.exam}
              onChange={(e) =>
                setProfile({ ...profile, exam: e.target.value })
              }
            >
              <option>JEE</option>
              <option>NEET</option>
              <option>Board Exams</option>
            </select>
          </div>
        </div>

        <label>Daily study time</label>
        <div className="hours-options">
          {[1, 2, 3, 4, 5].map((hour) => (
            <button
              key={hour}
              className={profile.hours === hour ? "selected" : ""}
              onClick={() => setProfile({ ...profile, hours: hour })}
            >
              {hour}h
            </button>
          ))}
        </div>

        <button className="primary-btn full-btn" onClick={onContinue}>
          Continue to Assessment
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}

function AssessmentPage({ answers, setAnswers, onSubmit }) {
  return (
    <div className="page">
      <PageHeader
        eyebrow="STEP 02"
        title="Let's understand what you know"
        description="Answer these questions honestly. This helps us identify your strengths and gaps."
      />

      <div className="assessment-card">
        <div className="assessment-progress">
          <span>Diagnostic Assessment</span>
          {Object.keys(answers).length}/{questionBank.length} answered
        </div>

        <div className="progress-bg large">
          <div
            className="progress-fill"
            style={{
              width: `${(Object.keys(answers).length / questionBank.length) * 100}%`,
            }}
          ></div>
        </div>

        {questionBank.map((q, index) => (
          <div className="question" key={index}>
            <div className="question-number">0{index + 1}</div>
            <div className="question-content">
              <span className="skill-tag">{q.skill}</span>
              <h3>{q.question}</h3>

              <div className="options">
                {q.options.map((option, i) => (
                  <button
                    key={option}
                    className={
                      answers[index] === i ? "option selected-option" : "option"
                    }
                    onClick={() =>
                      setAnswers({ ...answers, [index]: i })
                    }
                  >
                    <span className="option-letter">
                      {String.fromCharCode(65 + i)}
                    </span>
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}

        <button
          className="primary-btn full-btn"
          onClick={onSubmit}
          disabled={Object.keys(answers).length < 5}
        >
          Analyze My Performance
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}

function AnalysisPage({ onNext }) {
  return (
    <div className="page">
      <PageHeader
        eyebrow="STEP 03"
        title="Your learning profile"
        description="We've analyzed your performance and identified where your time will have the most impact."
      />

      <div className="analysis-grid">
        <div className="card overall-card">
          <span className="small-label">OVERALL PERFORMANCE</span>
          <div className="big-score">68<span>%</span></div>
          <div className="score-change">
            <TrendingUp size={15} />
            Baseline established
          </div>
        </div>

        <div className="card">
          <span className="small-label">LEARNING LEVEL</span>
          <h2 className="level-title">Intermediate</h2>
          <p className="muted">
            Your fundamentals are solid, but a few specific skills need focused practice.
          </p>
        </div>

        <div className="card skill-card">
          <div className="card-heading">
            <span className="small-label">SKILL ANALYSIS</span>
            <Target size={18} />
          </div>

          {skills.map((skill) => (
            <div className="analysis-skill" key={skill.name}>
              <div className="skill-row">
                <span>{skill.name}</span>
                <strong>{skill.score}%</strong>
              </div>
              <div className="progress-bg">
                <div
                  className="progress-fill"
                  style={{ width: `${skill.score}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        <div className="card gap-card">
          <div className="card-heading">
            <span className="small-label">BIGGEST SKILL GAP</span>
            <Target size={18} />
          </div>

          <h2>Probability</h2>
          <div className="gap-score">28%</div>
          <p>
            This is currently your highest-priority topic. Improving it can
            significantly raise your overall performance.
          </p>

          <div className="ai-insight">
            <Sparkles size={17} />
            AI recommends starting with Probability fundamentals.
          </div>
        </div>
      </div>

      <button className="primary-btn next-btn" onClick={onNext}>
        Get My Recommendations
        <ArrowRight size={18} />
      </button>
    </div>
  );
}

function RecommendationsPage({ onNext }) {
  const recommendations = [
    {
      title: "Probability Fundamentals",
      type: "Video Course",
      level: "Beginner",
      time: "32 min",
      reason: "Targets your largest skill gap",
    },
    {
      title: "JEE Probability Practice Set",
      type: "Practice",
      level: "Intermediate",
      time: "25 min",
      reason: "Builds application skills",
    },
    {
      title: "Probability: Previous Year Questions",
      type: "Practice",
      level: "Intermediate",
      time: "40 min",
      reason: "Exam-focused reinforcement",
    },
  ];

  return (
    <div className="page">
      <PageHeader
        eyebrow="STEP 04"
        title="Recommended for you"
        description="Resources selected based on your performance, skill gaps and learning level."
      />

      <div className="ai-banner">
        <div className="ai-banner-icon">
          <Sparkles size={21} />
        </div>
        <div>
          <strong>Your path is personalized</strong>
          <p>
            We prioritized Probability because it is your biggest gap and matched
            resources to your current level.
          </p>
        </div>
      </div>

      <div className="recommendations">
        {recommendations.map((item, index) => (
          <div className="resource-card" key={item.title}>
            <div className="resource-number">0{index + 1}</div>

            <div className="resource-main">
              <span className="resource-type">{item.type}</span>
              <h3>{item.title}</h3>
              <p>{item.reason}</p>

              <div className="resource-meta">
                <span>
                  <Target size={14} />
                  {item.level}
                </span>
                <span>
                  <Clock size={14} />
                  {item.time}
                </span>
              </div>
            </div>

            <button className="circle-btn">
              <ChevronRight size={20} />
            </button>
          </div>
        ))}
      </div>

      <button className="primary-btn next-btn" onClick={onNext}>
        Generate My Learning Path
        <ArrowRight size={18} />
      </button>
    </div>
  );
}

function LearningPathPage({ onNext }) {
  const days = [
    {
      day: "DAY 01",
      title: "Probability Basics",
      tasks: ["Watch fundamentals lesson", "Solve 10 basic questions"],
      time: "60 min",
      status: "Today",
    },
    {
      day: "DAY 02",
      title: "Conditional Probability",
      tasks: ["Learn conditional probability", "Solve practice set"],
      time: "75 min",
      status: "Tomorrow",
    },
    {
      day: "DAY 03",
      title: "Bayes' Theorem",
      tasks: ["Concept lesson", "5 JEE-level problems"],
      time: "80 min",
      status: "Day 3",
    },
    {
      day: "DAY 04",
      title: "Mixed Practice",
      tasks: ["Timed practice", "Review mistakes"],
      time: "90 min",
      status: "Day 4",
    },
  ];

  return (
    <div className="page">
      <PageHeader
        eyebrow="STEP 05"
        title="Your personalized learning path"
        description="A dynamic roadmap designed around your current ability and available study time."
      />

      <div className="path-header card">
        <div>
          <span className="small-label">CURRENT FOCUS</span>
          <h2>Probability → Intermediate</h2>
          <p>4-day focused improvement plan</p>
        </div>

        <div className="path-progress">
          <strong>25%</strong>
          <span>complete</span>
        </div>
      </div>

      <div className="timeline">
        {days.map((day, index) => (
          <div className="timeline-item" key={day.day}>
            <div className={`timeline-dot ${index === 0 ? "current" : ""}`}>
              {index === 0 ? <BookOpen size={17} /> : index}
            </div>

            <div className="day-card">
              <div className="day-top">
                <span className="small-label">{day.day}</span>
                <span className="day-status">{day.status}</span>
              </div>

              <h3>{day.title}</h3>

              {day.tasks.map((task) => (
                <div className="task" key={task}>
                  <CheckCircle size={16} />
                  <span>{task}</span>
                </div>
              ))}

              <div className="day-time">
                <Clock size={14} />
                {day.time}
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="primary-btn next-btn" onClick={onNext}>
        View Progress Dashboard
        <ArrowRight size={18} />
      </button>
    </div>
  );
}

function DashboardPage() {
  return (
    <div className="page">
      <PageHeader
        eyebrow="PROGRESS"
        title="Keep getting better"
        description="Track your growth and let LearnPath AI adapt your learning path over time."
      />

      <div className="dashboard-grid">
        <div className="card progress-big">
          <div className="card-heading">
            <span className="small-label">WEEKLY PROGRESS</span>
            <TrendingUp size={18} />
          </div>

          <div className="weekly-number">72%</div>
          <p className="muted">Learning path completed</p>

          <div className="weekly-bar">
            <div></div>
          </div>

          <div className="weekly-stats">
            <span><strong>5</strong> sessions</span>
            <span><strong>4.2h</strong> studied</span>
            <span><strong>+12%</strong> improvement</span>
          </div>
        </div>

        <div className="card">
          <div className="card-heading">
            <span className="small-label">SKILL GROWTH</span>
            <BarChart3 size={18} />
          </div>

          <div className="bars">
            {[
              ["Algebra", 82],
              ["Calculus", 64],
              ["Probability", 52],
              ["Trigonometry", 71],
              ["Geometry", 48],
            ].map(([name, value]) => (
              <div className="bar-row" key={name}>
                <span>{name}</span>
                <div className="bar-bg">
                  <div style={{ height: `${value}%` }}></div>
                </div>
                <strong>{value}%</strong>
              </div>
            ))}
          </div>
        </div>

        <div className="card adaptation-card">
          <div className="ai-banner-icon">
            <Sparkles size={21} />
          </div>

          <span className="small-label">ADAPTIVE LEARNING</span>
          <h2>Your path is changing with you.</h2>
          <p>
            As your Probability score improves, LearnPath AI will automatically
            increase the difficulty and move you toward advanced problems.
          </p>

          <div className="adaptation">
            <span>Beginner</span>
            <div className="adapt-line"></div>
            <span>Intermediate</span>
            <div className="adapt-line"></div>
            <span>Advanced</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function PageHeader({ eyebrow, title, description }) {
  return (
    <div className="page-header">
      <span className="eyebrow">{eyebrow}</span>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
}

export default App;