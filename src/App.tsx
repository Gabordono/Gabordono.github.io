import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  BarChart3,
  Briefcase,
  Database,
  FileSpreadsheet,
  Github,
  LineChart,
  Linkedin,
  Mail,
  PieChart,
  TrendingUp,
  Download,
  Users,
  Target,
  Calendar,
  Globe,
  ArrowUpRight,
  X,
  Code,
  Play,
  Terminal,
  Activity,
  Grid,
  Table,
  BarChart2,
  Menu,
  X as XIcon
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  ScatterChart,
  Scatter,
  ZAxis,
  Label,
  ReferenceLine,
  AreaChart,
  Area
} from 'recharts';
import { portfolioRiskCode, portfolioRiskCodeSnippet, portfolioRiskSQLCode } from './data/portfolioRiskCode';

const content = {
  hu: {
    nav: {
      summary: 'Összegzés',
      experience: 'Tapasztalat',
      skills: 'Készségek',
      projects: 'Projektek',
      contact: 'Kapcsolatfelvétel'
    },
    hero: {
      badge: 'Nyitott az új lehetőségekre',
      title1: 'Üzleti fókuszú',
      title2: 'Pénzügyi Adatelemző',
      desc: 'Több mint 4 év tapasztalattal rendelkezem komplex pénzügyi adathalmazok elemzésében és vizualizációjában. Fő fókuszom az adatok üzleti értékké alakítása, a manuális folyamatok automatizálása, és a vezetőségi döntéshozatal támogatása precíz, átlátható riportokkal.',
      stats: {
        yoe: 'Év tapasztalat',
        acc: 'Adatprecizitás',
        deg: 'Közgazdasági diploma'
      },
      btnInterview: 'Interjú egyeztetése',
      btnCV: 'Önéletrajz letöltése (PDF)'
    },
    experience: {
      title: 'Szakmai Tapasztalat',
      jobs: [
        {
          role: 'Financial Data Analyst',
          company: 'Példa Vállalat Zrt.',
          period: '2021 - Jelenleg',
          highlights: [
            'Automatizált pénzügyi riporting rendszer kialakítása, amely havi 40 munkaórát takarított meg a pénzügyi osztálynak.',
            'Vezetői dashboardok (Power BI) fejlesztése a C-level menedzsment számára, felgyorsítva a stratégiai döntéshozatalt.',
            'Költségoptimalizálási adatelemzés végrehajtása, amely 12%-os megtakarítást azonosított az operatív kiadásokban.'
          ]
        },
        {
          role: 'Junior Pénzügyi Elemző',
          company: 'Pénzügyi Tanácsadó Kft.',
          period: '2019 - 2021',
          highlights: [
            'Részvétel az éves üzleti tervezésben (budgeting & forecasting) és a havi variancia elemzésben.',
            'Nagy méretű adathalmazok tisztítása és strukturálása SQL és Excel Power Query segítségével.',
            'Adatminőség javítási projekt támogatása, amely 99.5%-os adatintegritást eredményezett.'
          ]
        }
      ]
    },
    skills: {
      title: 'Készségek & Kompetenciák',
      techTitle: 'Technikai Készségek (Hard Skills)',
      bizTitle: 'Üzleti Készségek (Soft Skills)',
      tech: ['Python (Pandas, NumPy)', 'SQL & Adatbázisok', 'Power BI / Tableau', 'Excel (VBA, Power Query)'],
      biz: ['Pénzügyi Modellezés', 'Költségoptimalizálás', 'Stakeholder Menedzsment', 'Vezetői Riporting']
    },
    projects: {
      title: 'Eredmények & Projektek',
      subtitle: 'Konkrét üzleti problémákra adott adatalapú megoldásaim.',
      items: [
        {
          title: 'Portfólió Kockázatkezelési Dashboard',
          description: 'Interaktív Power BI dashboard befektetési portfóliók kockázatának (VaR, Sharpe-mutató) és hozamának valós idejű nyomon követésére.',
          tags: ['Power BI', 'Python', 'SQL'],
          metrics: 'Valós idejű monitorozás',
          code: portfolioRiskCode
        },
        {
          title: 'Kockázatelemzési Modell (Risk Analysis)',
          description: 'Python alapú prediktív modell fejlesztése a hitelkockázatok előrejelzésére. A projekt célja a nemfizetési arány csökkentése volt.',
          tags: ['Python', 'Machine Learning', 'SQL'],
          metrics: '15%-os pontosság-növekedés',
        },
        {
          title: 'Automatizált Cash-Flow Dashboard',
          description: 'Komplex Power BI dashboard kialakítása, amely valós időben vizualizálja a cég likviditását és a főbb pénzügyi KPI-okat.',
          tags: ['Power BI', 'SQL Server', 'DAX'],
          metrics: 'Napi 2 óra adminisztráció megtakarítás',
        },
        {
          title: 'Piaci Trendek és Profitabilitás Elemzés',
          description: 'Termékvonalak profitabilitásának mélyreható elemzése (Time Series Analysis), amely rámutatott a legkevésbé jövedelmező szegmensekre.',
          tags: ['Python', 'Pandas', 'Adatvizualizáció'],
          metrics: '+8% profitmarzs növekedés',
        }
      ]
    },
    contact: {
      title: 'Készen áll az adatalapú döntésekre?',
      desc: 'Ha egy precíz, üzleti szemléletű és proaktív adatelemzőt keres a csapatába, szívesen részt veszek egy bemutatkozó beszélgetésen.',
      btnEmail: 'Kapcsolatfelvétel e-mailben',
      btnLinkedIn: 'LinkedIn Profil'
    }
  },
  en: {
    nav: {
      summary: 'Summary',
      experience: 'Experience',
      skills: 'Skills',
      projects: 'Projects',
      contact: 'Contact'
    },
    hero: {
      badge: 'Open to new opportunities',
      title1: 'Business-focused',
      title2: 'Financial Data Analyst',
      desc: 'With over 2 years of experience in analyzing and visualizing complex financial datasets. My main focus is transforming data into business value, automating manual processes, and supporting executive decision-making with precise, transparent reports.',
      stats: {
        yoe: 'Years Experience',
        acc: 'Data Accuracy',
        deg: 'Economic Degree'
      },
      btnInterview: 'Schedule Interview',
      btnCV: 'Download CV (PDF)'
    },
    experience: {
      title: 'Professional Experience',
      jobs: [
        {
          role: 'Financial Data Analyst',
          company: 'Example Company Ltd.',
          period: '2021 - Present',
          highlights: [
            'Developed an automated financial reporting system, saving the finance department 40 hours per month.',
            'Created executive (Power BI) dashboards for C-level management, accelerating strategic decision-making.',
            'Conducted cost optimization data analysis, identifying a 12% saving in operational expenses.'
          ]
        },
        {
          role: 'Junior Financial Analyst',
          company: 'Financial Consulting LLC',
          period: '2019 - 2021',
          highlights: [
            'Participated in annual business planning (budgeting & forecasting) and monthly variance analysis.',
            'Cleaned and structured large datasets using SQL and Excel Power Query.',
            'Supported a data quality improvement project resulting in 99.5% data integrity.'
          ]
        }
      ]
    },
    skills: {
      title: 'Skills & Competencies',
      techTitle: 'Technical Skills (Hard Skills)',
      bizTitle: 'Business Skills (Soft Skills)',
      tech: ['Python (Pandas, NumPy)', 'SQL & Databases', 'Power BI / Tableau', 'Excel (VBA, Power Query)'],
      biz: ['Financial Modeling', 'Cost Optimization', 'Stakeholder Management', 'Executive Reporting']
    },
    projects: {
      title: 'Achievements & Projects',
      subtitle: 'Data-driven solutions to specific business problems.',
      items: [
        {
          title: 'Portfolio Risk Management Dashboard',
          description: 'Interactive Power BI dashboard for real-time tracking of investment portfolio risk (VaR, Sharpe ratio) and return performance.',
          tags: ['Power BI', 'Python', 'SQL'],
          metrics: 'Real-time monitoring',
          code: portfolioRiskCode
        },
        {
          title: 'Risk Analysis Model',
          description: 'Developed a Python-based predictive model for forecasting credit risks. The project aimed to reduce default rates.',
          tags: ['Python', 'Machine Learning', 'SQL'],
          metrics: '+15% accuracy increase',
        },
        {
          title: 'Automated Cash-Flow Dashboard',
          description: 'Created a complex Power BI dashboard visualizing company liquidity and key financial KPIs in real-time.',
          tags: ['Power BI', 'SQL Server', 'DAX'],
          metrics: '2 hours/day admin time saved',
        },
        {
          title: 'Market Trends & Profitability Analysis',
          description: 'In-depth profitability analysis of product lines (Time Series Analysis), highlighting the least profitable segments.',
          tags: ['Python', 'Pandas', 'Data Visualization'],
          metrics: '+8% profit margin increase',
        }
      ]
    },
    contact: {
      title: 'Ready for data-driven decisions?',
      desc: 'If you are looking for a precise, business-minded, and proactive data analyst for your team, I would be happy to have an introductory chat.',
      btnEmail: 'Contact via Email',
      btnLinkedIn: 'LinkedIn Profile'
    }
  }
};

export default function App() {
  const [lang, setLang] = useState<'hu' | 'en'>('en');
  const [selectedProject, setSelectedProject] = useState<any>(null);

  // Code Execution State
  const [runState, setRunState] = useState<'idle' | 'running' | 'done'>('idle');
  const [logs, setLogs] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'code' | 'output' | 'sql'>('code');
  const [timeFilter, setTimeFilter] = useState<'1M' | '1Y' | '5Y'>('1Y');
  const [dashboardPage, setDashboardPage] = useState<number>(1);
  const [sqlTable, setSqlTable] = useState<'prices' | 'daily_returns' | 'rolling_volatility'>('prices');
  const [sqlSortDesc, setSqlSortDesc] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const t = content[lang];

  const techIcons = [
    <Database key="db1" className="w-5 h-5" />,
    <Database key="db2" className="w-5 h-5" />,
    <PieChart key="pie" className="w-5 h-5" />,
    <FileSpreadsheet key="xls" className="w-5 h-5" />
  ];

  const bizIcons = [
    <TrendingUp key="trend" className="w-5 h-5" />,
    <Target key="target" className="w-5 h-5" />,
    <Users key="users" className="w-5 h-5" />,
    <BarChart3 key="bar" className="w-5 h-5" />
  ];

  // Mock data for the Python script execution results
  const mockAllocation = [
    { name: 'AAPL', value: 20, color: '#2CA6A4' },
    { name: 'MSFT', value: 20, color: '#C9A84C' },
    { name: 'JPM', value: 15, color: '#E05A4E' },
    { name: 'GS', value: 10, color: '#4CAF7D' },
    { name: 'BLK', value: 10, color: '#9B59B6' },
    { name: 'XOM', value: 10, color: '#E67E22' },
    { name: 'GLD', value: 10, color: '#3498DB' },
    { name: 'TLT', value: 5, color: '#1ABC9C' },
  ];

  const mockSharpe = [
    { name: 'AAPL', sharpe: 1.12 },
    { name: 'MSFT', sharpe: 1.05 },
    { name: 'JPM', sharpe: 0.85 },
    { name: 'GS', sharpe: 0.72 },
    { name: 'BLK', sharpe: 0.91 },
    { name: 'XOM', sharpe: 0.65 },
    { name: 'GLD', sharpe: 0.45 },
    { name: 'TLT', sharpe: -0.15 },
  ].sort((a, b) => a.sharpe - b.sharpe);

  const getMockReturns = (filter: '1M' | '1Y' | '5Y') => {
    const today = new Date();

    if (filter === '1M') {
      return Array.from({ length: 30 }, (_, i) => {
        const d = new Date(today);
        d.setDate(today.getDate() - (29 - i));
        return {
          date: d.toLocaleDateString(lang === 'hu' ? 'hu-HU' : 'en-US', { month: 'short', day: 'numeric' }),
          portfolio: 100 + (i * 0.1) + (Math.random() * 2 - 1),
          benchmark: 100 + (i * 0.08) + (Math.random() * 1.5 - 0.75),
        };
      });
    } else if (filter === '1Y') {
      return Array.from({ length: 12 }, (_, i) => {
        const d = new Date(today);
        d.setMonth(today.getMonth() - (11 - i));
        return {
          date: d.toLocaleDateString(lang === 'hu' ? 'hu-HU' : 'en-US', { month: 'short' }),
          portfolio: 100 + (i * 1.5) + (Math.random() * 5 - 2.5),
          benchmark: 100 + (i * 1.2) + (Math.random() * 4 - 2),
        };
      });
    } else {
      return Array.from({ length: 5 }, (_, i) => {
        const year = today.getFullYear() - (4 - i);
        return {
          date: `${year}`,
          portfolio: 100 + (i * 15) + (Math.random() * 20 - 10),
          benchmark: 100 + (i * 12) + (Math.random() * 15 - 7.5),
        };
      });
    }
  };

  const mockReturns = getMockReturns(timeFilter);

  const mockRiskReturn = [
    { name: 'AAPL', vol: 25.4, ret: 32.1, color: '#2CA6A4' },
    { name: 'MSFT', vol: 22.1, ret: 28.5, color: '#C9A84C' },
    { name: 'JPM', vol: 18.5, ret: 12.4, color: '#E05A4E' },
    { name: 'GS', vol: 21.0, ret: 14.2, color: '#4CAF7D' },
    { name: 'BLK', vol: 19.2, ret: 16.8, color: '#9B59B6' },
    { name: 'XOM', vol: 24.5, ret: 18.5, color: '#E67E22' },
    { name: 'GLD', vol: 12.4, ret: 5.2, color: '#3498DB' },
    { name: 'TLT', vol: 14.5, ret: -2.1, color: '#1ABC9C' },
    { name: 'Portfolio', vol: 15.2, ret: 18.4, isPort: true, color: '#F1C40F' },
    { name: 'S&P 500 (Piac)', vol: 18.0, ret: 15.0, isMarket: true, color: '#95A5A6' }
  ];

  const mockReturnBins = [
    { bin: '< -3%', count: 5 },
    { bin: '-3% to -2%', count: 12 },
    { bin: '-2% to -1%', count: 35 },
    { bin: '-1% to 0%', count: 68 },
    { bin: '0% to 1%', count: 85 },
    { bin: '1% to 2%', count: 42 },
    { bin: '2% to 3%', count: 15 },
    { bin: '> 3%', count: 6 },
  ];

  const corrTickers = ['AAPL', 'MSFT', 'JPM', 'GS', 'BLK', 'XOM', 'GLD', 'TLT'];
  const mockCorrelation = [
    [1.00, 0.78, 0.42, 0.45, 0.51, 0.32, 0.05, -0.21],
    [0.78, 1.00, 0.38, 0.41, 0.48, 0.28, 0.08, -0.18],
    [0.42, 0.38, 1.00, 0.85, 0.75, 0.55, -0.10, -0.35],
    [0.45, 0.41, 0.85, 1.00, 0.72, 0.52, -0.08, -0.32],
    [0.51, 0.48, 0.75, 0.72, 1.00, 0.45, -0.05, -0.25],
    [0.32, 0.28, 0.55, 0.52, 0.45, 1.00, 0.15, -0.10],
    [0.05, 0.08, -0.10, -0.08, -0.05, 0.15, 1.00, 0.45],
    [-0.21, -0.18, -0.35, -0.32, -0.25, -0.10, 0.45, 1.00],
  ];

  const marketSummary = [
    { ticker: 'AAPL', category: 'Tech', year: new Date().getFullYear(), vol: 25.4, ret: 32.1, vsMarket: '+17.1%' },
    { ticker: 'MSFT', category: 'Tech', year: new Date().getFullYear(), vol: 22.1, ret: 28.5, vsMarket: '+13.5%' },
    { ticker: 'JPM', category: 'Financials', year: new Date().getFullYear(), vol: 18.5, ret: 12.4, vsMarket: '-2.6%' },
    { ticker: 'GS', category: 'Financials', year: new Date().getFullYear(), vol: 21.0, ret: 14.2, vsMarket: '-0.8%' },
    { ticker: 'BLK', category: 'Financials', year: new Date().getFullYear(), vol: 19.2, ret: 16.8, vsMarket: '+1.8%' },
    { ticker: 'XOM', category: 'Energy', year: new Date().getFullYear(), vol: 24.5, ret: 18.5, vsMarket: '+3.5%' },
    { ticker: 'GLD', category: 'Commodity', year: new Date().getFullYear(), vol: 12.4, ret: 5.2, vsMarket: '-9.8%' },
    { ticker: 'TLT', category: 'Bonds', year: new Date().getFullYear(), vol: 14.5, ret: -2.1, vsMarket: '-17.1%' },
    { ticker: 'S&P 500', category: 'Market (Piac)', year: new Date().getFullYear(), vol: 18.0, ret: 15.0, vsMarket: '-' }
  ];

  const getCorrColor = (val: number) => {
    if (val === 1) return 'bg-emerald-500 text-white';
    if (val > 0.7) return 'bg-emerald-400 text-white';
    if (val > 0.4) return 'bg-emerald-300 text-slate-800';
    if (val > 0) return 'bg-emerald-100 text-slate-800';
    if (val < -0.3) return 'bg-red-400 text-white';
    if (val < 0) return 'bg-red-200 text-slate-800';
    return 'bg-slate-100 text-slate-800';
  };

  const mockRollingVol = Array.from({ length: 30 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (29 - i));
    return {
      date: d.toLocaleDateString(lang === 'hu' ? 'hu-HU' : 'en-US', { month: 'short', day: 'numeric' }),
      portfolio: 15 + Math.sin(i / 4) * 3 + Math.random() * 2,
      benchmark: 18 + Math.sin(i / 5) * 4 + Math.random() * 2,
    };
  });

  const mockDrawdown = Array.from({ length: 30 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (29 - i));
    let dd = 0;
    if (i > 5 && i <= 15) dd = -(i - 5) * 1.2 - Math.random();
    if (i > 15) dd = -12 + (i - 15) * 1.5 - Math.random();
    if (dd > 0) dd = 0;
    return {
      date: d.toLocaleDateString(lang === 'hu' ? 'hu-HU' : 'en-US', { month: 'short', day: 'numeric' }),
      drawdown: dd
    };
  });

  const handleRunCode = () => {
    setActiveTab('output');
    setRunState('running');
    setLogs([]);

    const logSequence = [
      "Initializing Portfolio Risk Management System...",
      " Fetching market data from Yahoo Finance (AAPL, MSFT, JPM, GS, BLK, XOM, GLD, TLT)...",
      " Downloaded 756 trading days × 8 assets",
      " Computing risk metrics (Volatility, Sharpe, VaR, CVaR)...",
      " Metrics computed successfully",
      "Calculating Market Average and Category data by Year and Ticker...",
      " Market Summary generated",
      " Generating correlation matrix and beta values...",
      " Rendering executive dashboard..."
    ];

    logSequence.forEach((log, index) => {
      setTimeout(() => {
        setLogs(prev => [...prev, log]);
        if (index === logSequence.length - 1) {
          setTimeout(() => setRunState('done'), 800);
        }
      }, index * 600);
    });
  };

  // Reset state when closing modal
  const handleCloseModal = () => {
    setSelectedProject(null);
    setTimeout(() => {
      setRunState('idle');
      setLogs([]);
      setActiveTab('code');
    }, 300);
  };

  return (
    <div className="min-h-screen font-sans selection:bg-blue-200 selection:text-blue-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-slate-50/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-mono font-bold text-slate-900 tracking-tight text-lg">Szabó Gábor</span>
          {/* Desktop nav links */}
          <div className="hidden md:flex gap-6 text-sm font-medium text-slate-600">
            <a href="#about" className="hover:text-slate-900 transition-colors">{t.nav.summary}</a>
            <a href="#experience" className="hover:text-slate-900 transition-colors">{t.nav.experience}</a>
            <a href="#skills" className="hover:text-slate-900 transition-colors">{t.nav.skills}</a>
            <a href="#projects" className="hover:text-slate-900 transition-colors">{t.nav.projects}</a>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setLang(lang === 'hu' ? 'en' : 'hu')}
              className="flex items-center gap-1.5 text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-full"
            >
              <Globe className="w-4 h-4" />
              {lang === 'hu' ? 'EN' : 'HU'}
            </button>
            <a href="#contact" className="hidden sm:inline-block text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
              {t.nav.contact} &rarr;
            </a>
            {/* Hamburger – mobile only */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
              aria-label="Toggle menu"
            >
              {menuOpen ? <XIcon className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="md:hidden bg-slate-50 border-t border-slate-200 px-6 py-4 flex flex-col gap-4"
          >
            {[
              { href: '#about', label: t.nav.summary },
              { href: '#experience', label: t.nav.experience },
              { href: '#skills', label: t.nav.skills },
              { href: '#projects', label: t.nav.projects },
              { href: '#contact', label: t.nav.contact },
            ].map(({ href, label }) => (
              <a
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="text-base font-medium text-slate-700 hover:text-blue-600 transition-colors py-1 border-b border-slate-100 last:border-0"
              >
                {label}
              </a>
            ))}
          </motion.div>
        )}
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-12 md:py-20 space-y-24">
        {/* Hero Section */}
        <motion.section
          id="about"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-mono font-medium mb-6 border border-emerald-100">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            {t.hero.badge}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6 leading-tight">
            {t.hero.title1} <span className="text-blue-600">{t.hero.title2}</span>
          </h1>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            {lang === 'hu' ? (
              <>
                Több mint 4 év tapasztalattal rendelkezem komplex pénzügyi adathalmazok elemzésében és vizualizációjában.
                Fő fókuszom az <strong className="text-slate-900 font-semibold">adatok üzleti értékké alakítása</strong>, a manuális folyamatok automatizálása,
                és a vezetőségi döntéshozatal támogatása precíz, átlátható riportokkal.
              </>
            ) : (
              <>
                With over 2 years of experience analyzing and visualizing complex financial datasets.
                My main focus is <strong className="text-slate-900 font-semibold">transforming data into business value</strong>, automating manual processes,
                and supporting executive decision-making with precise, transparent reports.
              </>
            )}
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 mb-10 py-6 border-y border-slate-200">
            <div>
              <div className="text-2xl font-bold text-slate-900">2</div>
              <div className="text-sm text-slate-500 font-medium">{t.hero.stats.yoe}</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">100%</div>
              <div className="text-sm text-slate-500 font-medium">{t.hero.stats.acc}</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">BSc</div>
              <div className="text-sm text-slate-500 font-medium">{t.hero.stats.deg}</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <a href="#contact" className="inline-flex items-center justify-center h-12 px-6 font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
              {t.hero.btnInterview}
            </a>
            <button className="inline-flex items-center gap-2 justify-center h-12 px-6 font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors shadow-sm">
              <Download className="w-4 h-4" />
              {t.hero.btnCV}
            </button>
          </div>
        </motion.section>

        {/* Experience Section */}
        <motion.section
          id="experience"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <Briefcase className="w-6 h-6 text-slate-400" />
            <h2 className="text-2xl font-bold text-slate-900">{t.experience.title}</h2>
          </div>
          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
            {t.experience.jobs.map((job, index) => (
              <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-100 text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  <Calendar className="w-4 h-4" />
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
                    <h3 className="font-bold text-slate-900 text-lg">{job.role}</h3>
                    <span className="text-sm font-mono font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-md whitespace-nowrap">{job.period}</span>
                  </div>
                  <div className="text-slate-600 font-medium mb-4">{job.company}</div>
                  <ul className="space-y-2">
                    {job.highlights.map((highlight, hIndex) => (
                      <li key={hIndex} className="text-slate-600 text-sm flex items-start gap-2">
                        <span className="text-blue-500 mt-1">•</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Skills Section */}
        <motion.section
          id="skills"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <LineChart className="w-6 h-6 text-slate-400" />
            <h2 className="text-2xl font-bold text-slate-900">{t.skills.title}</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Technical Skills */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900 mb-4 border-b border-slate-100 pb-2">{t.skills.techTitle}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {t.skills.tech.map((skill, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
                    <div className="text-blue-600">{techIcons[index]}</div>
                    <span className="font-medium text-slate-700 text-sm">{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Business Skills */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900 mb-4 border-b border-slate-100 pb-2">{t.skills.bizTitle}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {t.skills.biz.map((skill, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
                    <div className="text-emerald-600">{bizIcons[index]}</div>
                    <span className="font-medium text-slate-700 text-sm">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Projects Section */}
        <motion.section
          id="projects"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <Target className="w-6 h-6 text-slate-400" />
            <h2 className="text-2xl font-bold text-slate-900">{t.projects.title}</h2>
          </div>
          <p className="text-slate-500 mb-8">{t.projects.subtitle}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {t.projects.items.map((project, index) => (
              <a
                href="#"
                key={index}
                onClick={(e) => { e.preventDefault(); setSelectedProject(project); }}
                className="group flex flex-col bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-blue-300 hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <div className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md w-fit">
                      <TrendingUp className="w-3 h-3" />
                      {project.metrics}
                    </div>
                    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                      <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-600 text-sm mb-6 flex-1 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-slate-100">
                    {project.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="px-2 py-1 bg-slate-100 text-slate-500 text-xs font-medium rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section
          id="contact"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-500 rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-4">{t.contact.title}</h2>
            <p className="text-slate-300 max-w-2xl mx-auto mb-8 text-lg">
              {t.contact.desc}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="https://mail.google.com/mail/?view=cm&to=szabgab97@gmail.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-500 transition-colors shadow-lg shadow-blue-900/20">
                <Mail className="w-5 h-5" />
                {t.contact.btnEmail}
              </a>
              <a href="#" className="flex items-center gap-2 px-8 py-4 bg-slate-800 text-white font-medium rounded-xl hover:bg-slate-700 transition-colors border border-slate-700">
                <Linkedin className="w-5 h-5" />
                {t.contact.btnLinkedIn}
              </a>
            </div>
          </div>
        </motion.section>
      </main>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-5xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-slate-100">
                <h3 className="text-2xl font-bold text-slate-900">{selectedProject.title}</h3>
                <button onClick={handleCloseModal} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="p-6 overflow-y-auto flex-1">
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedProject.tags.map((tag: string, i: number) => (
                    <span key={i} className="px-3 py-1 bg-slate-100 text-slate-600 text-sm font-medium rounded-md">{tag}</span>
                  ))}
                </div>
                <p className="text-slate-700 text-lg leading-relaxed mb-8">{selectedProject.description}</p>

                {selectedProject.code && (
                  <div className="mt-8">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex bg-slate-100 p-1 rounded-lg">
                        <button
                          onClick={() => setActiveTab('code')}
                          className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'code' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                        >
                          <Code className="w-4 h-4" />
                          {lang === 'hu' ? 'Forráskód' : 'Source Code'}
                        </button>
                        <button
                          onClick={() => setActiveTab('sql')}
                          className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'sql' ? 'bg-white text-orange-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                        >
                          <Database className="w-4 h-4" />
                          SQL
                        </button>
                        <button
                          onClick={() => setActiveTab('output')}
                          className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'output' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                        >
                          <Terminal className="w-4 h-4" />
                          {lang === 'hu' ? 'Kimenet / Eredmény' : 'Output / Result'}
                        </button>
                      </div>

                      {activeTab === 'code' && (
                        <button
                          onClick={handleRunCode}
                          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors shadow-sm"
                        >
                          <Play className="w-4 h-4 fill-current" />
                          {lang === 'hu' ? 'Kód Futtatása' : 'Run Code'}
                        </button>
                      )}
                    </div>

                    {activeTab === 'code' ? (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-[#0D1B2A] rounded-xl overflow-hidden border border-slate-800 shadow-inner"
                      >
                        <div className="flex items-center px-4 py-2 bg-[#1E3A5F] border-b border-slate-700/50">
                          <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                          </div>
                          <span className="ml-4 text-xs font-mono text-slate-300">portfolio_risk_management.py</span>
                        </div>
                        <pre className="p-4 overflow-x-auto text-sm font-mono text-slate-300 leading-relaxed max-h-[500px]">
                          <code>{selectedProject.id === 1 ? portfolioRiskCodeSnippet : selectedProject.code}</code>
                        </pre>
                      </motion.div>
                    ) : activeTab === 'sql' ? (
                      <motion.div
                        key="sql"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-white"
                      >
                        {/* DB Browser toolbar */}
                        <div className="flex items-center gap-3 px-4 py-2.5 bg-slate-800 border-b border-slate-700">
                          <Database className="w-4 h-4 text-orange-400 shrink-0" />
                          <span className="text-xs font-mono text-orange-300 font-semibold">portfolio_risk.db</span>
                          <span className="text-slate-600 text-xs">|</span>
                          <span className="text-xs font-mono text-slate-400">SQLite 3.41  ·  3 tables  ·  756 rows</span>
                          <div className="ml-auto">
                            <button
                              onClick={() => setSqlSortDesc(prev => !prev)}
                              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono font-medium transition-colors border ${sqlSortDesc
                                ? 'bg-orange-500/20 border-orange-500/50 text-orange-300'
                                : 'bg-slate-700 border-slate-600 text-slate-400 hover:text-slate-200'
                                }`}
                            >
                              {sqlSortDesc ? '↓ Newest First' : '↑ Oldest First'}
                            </button>
                          </div>
                        </div>

                        <div className="flex" style={{ minHeight: '400px' }}>
                          {/* Left sidebar – table list */}
                          <div className="w-44 shrink-0 bg-slate-50 border-r border-slate-200 flex flex-col">
                            <div className="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-200">Tables</div>
                            {([
                              { id: 'prices', label: 'prices', rows: 6048, icon: '' },
                              { id: 'daily_returns', label: 'daily_returns', rows: 6040, icon: '' },
                              { id: 'rolling_volatility', label: 'rolling_volatility', rows: 5880, icon: '' },
                            ] as const).map(tbl => (
                              <button
                                key={tbl.id}
                                onClick={() => setSqlTable(tbl.id)}
                                className={`flex flex-col items-start px-3 py-2.5 text-left border-b border-slate-100 transition-colors ${sqlTable === tbl.id
                                  ? 'bg-orange-50 border-l-2 border-l-orange-400'
                                  : 'hover:bg-slate-100 border-l-2 border-l-transparent'
                                  }`}
                              >
                                <span className="text-xs font-mono font-semibold text-slate-700">{tbl.label}</span>
                                <span className="text-[10px] text-slate-400 mt-0.5">{tbl.rows.toLocaleString()} rows</span>
                              </button>
                            ))}
                          </div>

                          {/* Right panel – data grid */}
                          <div className="flex-1 overflow-auto">
                            {sqlTable === 'prices' && (
                              <table className="w-full text-xs text-left">
                                <thead className="sticky top-0 bg-slate-100 text-slate-500 uppercase text-[10px] tracking-wide">
                                  <tr>
                                    {['#', 'Date', 'ticker', 'close_price'].map(h => (
                                      <th key={h} className="px-3 py-2 font-semibold border-b border-slate-200 whitespace-nowrap">{h}</th>
                                    ))}
                                  </tr>
                                </thead>
                                <tbody className="font-mono">
                                  {(sqlSortDesc ? [
                                    ['2024-01-02', 'AAPL', '185.20'], ['2024-01-02', 'MSFT', '374.51'],
                                    ['2024-01-02', 'JPM', '170.40'], ['2024-01-02', 'GS', '381.22'],
                                    ['2024-01-02', 'BLK', '793.10'], ['2024-01-02', 'XOM', '100.85'],
                                    ['2024-01-02', 'GLD', '189.63'], ['2024-01-02', 'TLT', '95.44'],
                                    ['2024-01-03', 'AAPL', '184.37'], ['2024-01-03', 'MSFT', '370.15'],
                                    ['2024-01-03', 'JPM', '168.91'], ['2024-01-03', 'GS', '378.60'],
                                    ['2024-01-03', 'BLK', '788.45'], ['2024-01-03', 'XOM', '99.21'],
                                    ['2024-01-03', 'GLD', '190.10'], ['2024-01-03', 'TLT', '94.98'],
                                    ['2024-01-04', 'AAPL', '182.68'], ['2024-01-04', 'MSFT', '366.30'],
                                    ['2024-01-04', 'JPM', '167.55'], ['2024-01-04', 'GS', '375.40'],
                                  ].slice().reverse() : [
                                    ['2024-01-02', 'AAPL', '185.20'], ['2024-01-02', 'MSFT', '374.51'],
                                    ['2024-01-02', 'JPM', '170.40'], ['2024-01-02', 'GS', '381.22'],
                                    ['2024-01-02', 'BLK', '793.10'], ['2024-01-02', 'XOM', '100.85'],
                                    ['2024-01-02', 'GLD', '189.63'], ['2024-01-02', 'TLT', '95.44'],
                                    ['2024-01-03', 'AAPL', '184.37'], ['2024-01-03', 'MSFT', '370.15'],
                                    ['2024-01-03', 'JPM', '168.91'], ['2024-01-03', 'GS', '378.60'],
                                    ['2024-01-03', 'BLK', '788.45'], ['2024-01-03', 'XOM', '99.21'],
                                    ['2024-01-03', 'GLD', '190.10'], ['2024-01-03', 'TLT', '94.98'],
                                    ['2024-01-04', 'AAPL', '182.68'], ['2024-01-04', 'MSFT', '366.30'],
                                    ['2024-01-04', 'JPM', '167.55'], ['2024-01-04', 'GS', '375.40'],
                                  ]).map(([date, ticker, price], i) => (
                                    <tr key={i} className={`border-b border-slate-100 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'} hover:bg-orange-50/40 transition-colors`}>
                                      <td className="px-3 py-1.5 text-slate-400">{i + 1}</td>
                                      <td className="px-3 py-1.5 text-slate-600">{date}</td>
                                      <td className="px-3 py-1.5"><span className="font-bold text-indigo-600">{ticker}</span></td>
                                      <td className="px-3 py-1.5 text-emerald-700">{price}</td>
                                    </tr>
                                  ))}
                                  <tr className="border-t-2 border-slate-200 bg-slate-50">
                                    <td colSpan={4} className="px-3 py-2 text-slate-400 text-[10px] italic">… 6,028 more rows (showing 20 of 6,048)</td>
                                  </tr>
                                </tbody>
                              </table>
                            )}

                            {sqlTable === 'daily_returns' && (
                              <table className="w-full text-xs text-left">
                                <thead className="sticky top-0 bg-slate-100 text-slate-500 uppercase text-[10px] tracking-wide">
                                  <tr>
                                    {['#', 'Date', 'ticker', 'log_return'].map(h => (
                                      <th key={h} className="px-3 py-2 font-semibold border-b border-slate-200 whitespace-nowrap">{h}</th>
                                    ))}
                                  </tr>
                                </thead>
                                <tbody className="font-mono">
                                  {(sqlSortDesc ? [
                                    ['2024-01-03', 'AAPL', '-0.004491'], ['2024-01-03', 'MSFT', '-0.011636'],
                                    ['2024-01-03', 'JPM', '-0.008743'], ['2024-01-03', 'GS', '-0.007154'],
                                    ['2024-01-03', 'BLK', '-0.005886'], ['2024-01-03', 'XOM', '-0.016299'],
                                    ['2024-01-03', 'GLD', '0.002470'], ['2024-01-03', 'TLT', '-0.004823'],
                                    ['2024-01-04', 'AAPL', '-0.009155'], ['2024-01-04', 'MSFT', '-0.010423'],
                                    ['2024-01-04', 'JPM', '-0.008097'], ['2024-01-04', 'GS', '-0.008513'],
                                    ['2024-01-04', 'BLK', '-0.005916'], ['2024-01-04', 'XOM', '-0.016444'],
                                    ['2024-01-04', 'GLD', '-0.000578'], ['2024-01-04', 'TLT', '-0.003791'],
                                    ['2024-01-05', 'AAPL', '0.002186'], ['2024-01-05', 'MSFT', '0.005917'],
                                    ['2024-01-05', 'JPM', '0.003421'], ['2024-01-05', 'GS', '0.001832'],
                                  ].slice().reverse() : [
                                    ['2024-01-03', 'AAPL', '-0.004491'], ['2024-01-03', 'MSFT', '-0.011636'],
                                    ['2024-01-03', 'JPM', '-0.008743'], ['2024-01-03', 'GS', '-0.007154'],
                                    ['2024-01-03', 'BLK', '-0.005886'], ['2024-01-03', 'XOM', '-0.016299'],
                                    ['2024-01-03', 'GLD', '0.002470'], ['2024-01-03', 'TLT', '-0.004823'],
                                    ['2024-01-04', 'AAPL', '-0.009155'], ['2024-01-04', 'MSFT', '-0.010423'],
                                    ['2024-01-04', 'JPM', '-0.008097'], ['2024-01-04', 'GS', '-0.008513'],
                                    ['2024-01-04', 'BLK', '-0.005916'], ['2024-01-04', 'XOM', '-0.016444'],
                                    ['2024-01-04', 'GLD', '-0.000578'], ['2024-01-04', 'TLT', '-0.003791'],
                                    ['2024-01-05', 'AAPL', '0.002186'], ['2024-01-05', 'MSFT', '0.005917'],
                                    ['2024-01-05', 'JPM', '0.003421'], ['2024-01-05', 'GS', '0.001832'],
                                  ]).map(([date, ticker, ret], i) => (
                                    <tr key={i} className={`border-b border-slate-100 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'} hover:bg-orange-50/40 transition-colors`}>
                                      <td className="px-3 py-1.5 text-slate-400">{i + 1}</td>
                                      <td className="px-3 py-1.5 text-slate-600">{date}</td>
                                      <td className="px-3 py-1.5"><span className="font-bold text-indigo-600">{ticker}</span></td>
                                      <td className={`px-3 py-1.5 font-semibold ${parseFloat(ret) >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>{ret}</td>
                                    </tr>
                                  ))}
                                  <tr className="border-t-2 border-slate-200 bg-slate-50">
                                    <td colSpan={4} className="px-3 py-2 text-slate-400 text-[10px] italic">… 6,020 more rows (showing 20 of 6,040)</td>
                                  </tr>
                                </tbody>
                              </table>
                            )}

                            {sqlTable === 'rolling_volatility' && (
                              <table className="w-full text-xs text-left">
                                <thead className="sticky top-0 bg-slate-100 text-slate-500 uppercase text-[10px] tracking-wide">
                                  <tr>
                                    {['#', 'Date', 'ticker', 'rolling_vol_21d'].map(h => (
                                      <th key={h} className="px-3 py-2 font-semibold border-b border-slate-200 whitespace-nowrap">{h}</th>
                                    ))}
                                  </tr>
                                </thead>
                                <tbody className="font-mono">
                                  {(sqlSortDesc ? [
                                    ['2024-01-31', 'AAPL', '0.2541'], ['2024-01-31', 'MSFT', '0.2214'],
                                    ['2024-01-31', 'JPM', '0.1852'], ['2024-01-31', 'GS', '0.2103'],
                                    ['2024-01-31', 'BLK', '0.1921'], ['2024-01-31', 'XOM', '0.2447'],
                                    ['2024-01-31', 'GLD', '0.1238'], ['2024-01-31', 'TLT', '0.1451'],
                                    ['2024-02-29', 'AAPL', '0.2612'], ['2024-02-29', 'MSFT', '0.2295'],
                                    ['2024-02-29', 'JPM', '0.1905'], ['2024-02-29', 'GS', '0.2187'],
                                    ['2024-02-29', 'BLK', '0.1982'], ['2024-02-29', 'XOM', '0.2513'],
                                    ['2024-02-29', 'GLD', '0.1302'], ['2024-02-29', 'TLT', '0.1488'],
                                    ['2024-03-28', 'AAPL', '0.2489'], ['2024-03-28', 'MSFT', '0.2178'],
                                    ['2024-03-28', 'JPM', '0.1834'], ['2024-03-28', 'GS', '0.2071'],
                                  ].slice().reverse() : [
                                    ['2024-01-31', 'AAPL', '0.2541'], ['2024-01-31', 'MSFT', '0.2214'],
                                    ['2024-01-31', 'JPM', '0.1852'], ['2024-01-31', 'GS', '0.2103'],
                                    ['2024-01-31', 'BLK', '0.1921'], ['2024-01-31', 'XOM', '0.2447'],
                                    ['2024-01-31', 'GLD', '0.1238'], ['2024-01-31', 'TLT', '0.1451'],
                                    ['2024-02-29', 'AAPL', '0.2612'], ['2024-02-29', 'MSFT', '0.2295'],
                                    ['2024-02-29', 'JPM', '0.1905'], ['2024-02-29', 'GS', '0.2187'],
                                    ['2024-02-29', 'BLK', '0.1982'], ['2024-02-29', 'XOM', '0.2513'],
                                    ['2024-02-29', 'GLD', '0.1302'], ['2024-02-29', 'TLT', '0.1488'],
                                    ['2024-03-28', 'AAPL', '0.2489'], ['2024-03-28', 'MSFT', '0.2178'],
                                    ['2024-03-28', 'JPM', '0.1834'], ['2024-03-28', 'GS', '0.2071'],
                                  ]).map(([date, ticker, vol], i) => (
                                    <tr key={i} className={`border-b border-slate-100 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'} hover:bg-orange-50/40 transition-colors`}>
                                      <td className="px-3 py-1.5 text-slate-400">{i + 1}</td>
                                      <td className="px-3 py-1.5 text-slate-600">{date}</td>
                                      <td className="px-3 py-1.5"><span className="font-bold text-indigo-600">{ticker}</span></td>
                                      <td className="px-3 py-1.5 text-orange-600 font-semibold">{vol}</td>
                                    </tr>
                                  ))}
                                  <tr className="border-t-2 border-slate-200 bg-slate-50">
                                    <td colSpan={4} className="px-3 py-2 text-slate-400 text-[10px] italic">… 5,860 more rows (showing 20 of 5,880)</td>
                                  </tr>
                                </tbody>
                              </table>
                            )}
                          </div>
                        </div>

                        {/* Status bar */}
                        <div className="flex items-center justify-between px-4 py-1.5 bg-slate-800 border-t border-slate-700">
                          <span className="text-[10px] font-mono text-slate-400">Table: <span className="text-orange-300">{sqlTable}</span></span>
                          <span className="text-[10px] font-mono text-slate-500">Generated by portfolio_risk_management.py  ·  store_to_sqlite()</span>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-slate-50 rounded-xl border border-slate-200 p-6 min-h-[400px] flex flex-col"
                      >
                        {runState === 'idle' ? (
                          <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
                            <Terminal className="w-16 h-16 mb-4 opacity-20" />
                            <p>{lang === 'hu' ? 'Kattints a "Kód Futtatása" gombra az eredmények megtekintéséhez.' : 'Click "Run Code" to see the results.'}</p>
                            <button
                              onClick={handleRunCode}
                              className="mt-6 flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-sm"
                            >
                              <Play className="w-5 h-5 fill-current" />
                              {lang === 'hu' ? 'Futtatás Most' : 'Run Now'}
                            </button>
                          </div>
                        ) : (
                          <div className="flex flex-col gap-6">
                            {/* Terminal Output */}
                            <div className="bg-[#0D1B2A] rounded-lg p-4 font-mono text-sm shadow-inner">
                              {logs.map((log, i) => (
                                <motion.div
                                  key={i}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  className={`mb-1 ${log.includes('✅') ? 'text-emerald-400' : log.includes('📡') ? 'text-blue-400' : 'text-slate-300'}`}
                                >
                                  <span className="text-slate-500 mr-2">$</span> {log}
                                </motion.div>
                              ))}
                              {runState === 'running' && (
                                <motion.div
                                  animate={{ opacity: [1, 0] }}
                                  transition={{ repeat: Infinity, duration: 0.8 }}
                                  className="w-2 h-4 bg-slate-400 inline-block align-middle ml-1"
                                />
                              )}
                            </div>

                            {/* Visual Dashboard Results */}
                            {runState === 'done' && (
                              <div className="flex flex-col gap-6 mt-4">
                                {/* Pagination Controls */}
                                <div className="flex justify-center gap-2 mb-4">
                                  {[1, 2, 3, 4].map(page => (
                                    <button
                                      key={page}
                                      onClick={() => setDashboardPage(page)}
                                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${dashboardPage === page ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}
                                    >
                                      {lang === 'hu' ? `Oldal ${page}` : `Page ${page}`}
                                    </button>
                                  ))}
                                </div>

                                {/* Page 1 */}
                                {dashboardPage === 1 && (
                                  <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                                  >
                                    {/* Cumulative Return Line Chart */}
                                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm md:col-span-2">
                                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                                        <h4 className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                          <TrendingUp className="w-4 h-4 text-indigo-500" />
                                          {lang === 'hu' ? 'Kumulált Portfólió Hozam' : 'Cumulative Portfolio Return'}
                                        </h4>
                                        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg w-fit">
                                          <button
                                            onClick={() => setTimeFilter('1M')}
                                            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${timeFilter === '1M' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                                          >
                                            {lang === 'hu' ? '1M (Napok)' : '1M (Days)'}
                                          </button>
                                          <button
                                            onClick={() => setTimeFilter('1Y')}
                                            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${timeFilter === '1Y' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                                          >
                                            {lang === 'hu' ? '1Y (Hónapok)' : '1Y (Months)'}
                                          </button>
                                          <button
                                            onClick={() => setTimeFilter('5Y')}
                                            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${timeFilter === '5Y' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                                          >
                                            {lang === 'hu' ? '5Y (Évek)' : '5Y (Years)'}
                                          </button>
                                        </div>
                                      </div>
                                      <div className="h-64">
                                        <ResponsiveContainer width="100%" height="100%">
                                          <RechartsLineChart data={mockReturns} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                                            <YAxis domain={['auto', 'auto']} tick={{ fontSize: 12 }} />
                                            <RechartsTooltip />
                                            <Legend />
                                            <Line type="monotone" dataKey="portfolio" name="Portfolio NAV" stroke="#2CA6A4" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                                            <Line type="monotone" dataKey="benchmark" name="S&P 500 (Proxy)" stroke="#94A3B8" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                                          </RechartsLineChart>
                                        </ResponsiveContainer>
                                      </div>
                                    </div>

                                    {/* Allocation Pie Chart */}
                                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                                      <h4 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
                                        <PieChart className="w-4 h-4 text-blue-500" />
                                        Portfolio Allocation
                                      </h4>
                                      <div className="h-64">
                                        <ResponsiveContainer width="100%" height="100%">
                                          <RechartsPieChart>
                                            <Pie
                                              data={mockAllocation}
                                              cx="50%"
                                              cy="50%"
                                              innerRadius={60}
                                              outerRadius={80}
                                              paddingAngle={5}
                                              dataKey="value"
                                            >
                                              {mockAllocation.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                              ))}
                                            </Pie>
                                            <RechartsTooltip formatter={(value) => `${value}%`} />
                                            <Legend />
                                          </RechartsPieChart>
                                        </ResponsiveContainer>
                                      </div>
                                    </div>

                                    {/* KPI Table */}
                                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                                      <h4 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
                                        <Table className="w-4 h-4 text-emerald-600" />
                                        {lang === 'hu' ? 'Fő Mutatók (KPI)' : 'Key Performance Indicators'}
                                      </h4>
                                      <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                                          <p className="text-xs text-slate-500 font-medium mb-1">{lang === 'hu' ? 'Éves Hozam' : 'Ann. Return'}</p>
                                          <p className="text-lg font-bold text-emerald-600">18.4%</p>
                                        </div>
                                        <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                                          <p className="text-xs text-slate-500 font-medium mb-1">{lang === 'hu' ? 'Éves Volatilitás' : 'Ann. Volatility'}</p>
                                          <p className="text-lg font-bold text-slate-700">15.2%</p>
                                        </div>
                                        <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                                          <p className="text-xs text-slate-500 font-medium mb-1">Sharpe Ratio</p>
                                          <p className="text-lg font-bold text-indigo-600">1.21</p>
                                        </div>
                                        <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                                          <p className="text-xs text-slate-500 font-medium mb-1">Max Drawdown</p>
                                          <p className="text-lg font-bold text-red-500">-12.4%</p>
                                        </div>
                                        <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                                          <p className="text-xs text-slate-500 font-medium mb-1">VaR (95%)</p>
                                          <p className="text-lg font-bold text-orange-500">-2.1%</p>
                                        </div>
                                        <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                                          <p className="text-xs text-slate-500 font-medium mb-1">CVaR (95%)</p>
                                          <p className="text-lg font-bold text-red-600">-3.4%</p>
                                        </div>
                                      </div>
                                    </div>
                                  </motion.div>
                                )}

                                {/* Page 2 */}
                                {dashboardPage === 2 && (
                                  <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                                  >
                                    {/* Sharpe Ratio Bar Chart */}
                                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm md:col-span-2">
                                      <h4 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
                                        <Activity className="w-4 h-4 text-emerald-500" />
                                        Sharpe Ratio by Asset
                                      </h4>
                                      <div className="h-80">
                                        <ResponsiveContainer width="100%" height="100%">
                                          <BarChart data={mockSharpe} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
                                            <XAxis type="number" />
                                            <YAxis dataKey="name" type="category" width={50} tick={{ fontSize: 12 }} />
                                            <RechartsTooltip />
                                            <Bar dataKey="sharpe" radius={[0, 4, 4, 0]}>
                                              {mockSharpe.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.sharpe >= 0 ? '#4CAF7D' : '#E05A4E'} />
                                              ))}
                                            </Bar>
                                          </BarChart>
                                        </ResponsiveContainer>
                                      </div>
                                    </div>

                                    {/* Rolling Volatility Line Chart */}
                                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm md:col-span-2">
                                      <h4 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
                                        <TrendingUp className="w-4 h-4 text-orange-500" />
                                        {lang === 'hu' ? 'Gördülő Volatilitás (Rolling Volatility)' : 'Rolling Volatility'}
                                      </h4>
                                      <div className="h-64">
                                        <ResponsiveContainer width="100%" height="100%">
                                          <RechartsLineChart data={mockRollingVol} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                                            <YAxis domain={['auto', 'auto']} tick={{ fontSize: 12 }} unit="%" />
                                            <RechartsTooltip />
                                            <Legend />
                                            <Line type="monotone" dataKey="portfolio" name="Portfolio Vol" stroke="#F1C40F" strokeWidth={2} dot={false} />
                                            <Line type="monotone" dataKey="market" name="S&P 500 Vol" stroke="#95A5A6" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                                          </RechartsLineChart>
                                        </ResponsiveContainer>
                                      </div>
                                    </div>
                                  </motion.div>
                                )}

                                {/* Page 3 */}
                                {dashboardPage === 3 && (
                                  <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                                  >
                                    {/* Risk vs Return Scatter Chart */}
                                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm md:col-span-2">
                                      <h4 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
                                        <Target className="w-4 h-4 text-orange-500" />
                                        {lang === 'hu' ? 'Kockázat vs Hozam (Risk vs Return by Asset)' : 'Risk vs Return by Asset'}
                                      </h4>
                                      <div className="h-80">
                                        <ResponsiveContainer width="100%" height="100%">
                                          <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 20 }}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                                            <XAxis type="number" dataKey="vol" name="Ann. Volatility" unit="%" tick={{ fontSize: 12 }}>
                                              <Label value={lang === 'hu' ? 'Évesített Volatilitás (Kockázat) %' : 'Ann. Volatility (Risk) %'} offset={-15} position="insideBottom" style={{ fontSize: 12, fill: '#64748b' }} />
                                            </XAxis>
                                            <YAxis type="number" dataKey="ret" name="Ann. Return" unit="%" tick={{ fontSize: 12 }}>
                                              <Label value={lang === 'hu' ? 'Évesített Hozam %' : 'Ann. Return %'} angle={-90} position="insideLeft" style={{ fontSize: 12, fill: '#64748b' }} />
                                            </YAxis>
                                            <ZAxis type="category" dataKey="name" name="Asset" />
                                            <RechartsTooltip cursor={{ strokeDasharray: '3 3' }} />
                                            <Legend verticalAlign="top" height={36} />
                                            <Scatter name={lang === 'hu' ? 'Eszközök' : 'Assets'} data={mockRiskReturn.filter(d => !d.isPort && !d.isMarket)} fill="#8884d8">
                                              {mockRiskReturn.filter(d => !d.isPort && !d.isMarket).map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                              ))}
                                            </Scatter>
                                            <Scatter name={lang === 'hu' ? 'Portfólió' : 'Portfolio'} data={mockRiskReturn.filter(d => d.isPort)} fill="#F1C40F" shape="star" />
                                            <Scatter name={lang === 'hu' ? 'S&P 500 (Piac)' : 'S&P 500 (Market)'} data={mockRiskReturn.filter(d => d.isMarket)} fill="#95A5A6" shape="triangle" />
                                          </ScatterChart>
                                        </ResponsiveContainer>
                                      </div>
                                    </div>

                                    {/* Correlation Heatmap */}
                                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm md:col-span-2 overflow-hidden">
                                      <h4 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
                                        <Grid className="w-4 h-4 text-purple-500" />
                                        {lang === 'hu' ? 'Korrelációs Mátrix' : 'Correlation Matrix'}
                                      </h4>
                                      <div className="w-full overflow-x-auto pb-2">
                                        <div className="min-w-[500px]">
                                          <div className="grid grid-cols-9 gap-1 mb-1">
                                            <div className="text-xs font-bold text-slate-400 text-center"></div>
                                            {corrTickers.map(t => (
                                              <div key={t} className="text-xs font-bold text-slate-600 text-center truncate">{t}</div>
                                            ))}
                                          </div>
                                          {mockCorrelation.map((row, i) => (
                                            <div key={i} className="grid grid-cols-9 gap-1 mb-1">
                                              <div className="text-xs font-bold text-slate-600 flex items-center justify-end pr-2">{corrTickers[i]}</div>
                                              {row.map((val, j) => (
                                                <div
                                                  key={j}
                                                  className={`h-10 flex items-center justify-center text-xs rounded-sm font-medium ${getCorrColor(val)}`}
                                                  title={`${corrTickers[i]} vs ${corrTickers[j]}: ${val.toFixed(2)}`}
                                                >
                                                  {val.toFixed(2)}
                                                </div>
                                              ))}
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    </div>
                                  </motion.div>
                                )}

                                {/* Page 4 */}
                                {dashboardPage === 4 && (
                                  <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                                  >
                                    {/* Return Bins Histogram */}
                                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                                      <h4 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
                                        <BarChart2 className="w-4 h-4 text-blue-500" />
                                        {lang === 'hu' ? 'Hozam Eloszlás (Return Bins)' : 'Return Distribution (Bins)'}
                                      </h4>
                                      <div className="h-64">
                                        <ResponsiveContainer width="100%" height="100%">
                                          <BarChart data={mockReturnBins} margin={{ top: 5, right: 30, left: 0, bottom: 25 }}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                            <XAxis dataKey="bin" tick={{ fontSize: 10 }} angle={-45} textAnchor="end" />
                                            <YAxis tick={{ fontSize: 12 }} />
                                            <RechartsTooltip />
                                            <Bar dataKey="count" name={lang === 'hu' ? 'Gyakoriság (Napok)' : 'Frequency (Days)'} fill="#3b82f6" radius={[4, 4, 0, 0]} />
                                          </BarChart>
                                        </ResponsiveContainer>
                                      </div>
                                    </div>

                                    {/* Drawdown Area Chart */}
                                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                                      <h4 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
                                        <TrendingUp className="w-4 h-4 text-red-500" />
                                        {lang === 'hu' ? 'Visszaesés (Drawdown)' : 'Drawdown'}
                                      </h4>
                                      <div className="h-64">
                                        <ResponsiveContainer width="100%" height="100%">
                                          <AreaChart data={mockDrawdown} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                            <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                                            <YAxis tick={{ fontSize: 12 }} unit="%" />
                                            <RechartsTooltip />
                                            <Area type="monotone" dataKey="drawdown" name="Drawdown" stroke="#E05A4E" fill="#E05A4E" fillOpacity={0.3} />
                                          </AreaChart>
                                        </ResponsiveContainer>
                                      </div>
                                    </div>

                                    {/* Market Summary Table */}
                                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm md:col-span-2">
                                      <h4 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
                                        <Table className="w-4 h-4 text-emerald-600" />
                                        {lang === 'hu' ? 'Piaci Átlag & Kategória Összesítő' : 'Market Average & Category Summary'}
                                      </h4>
                                      <div className="overflow-x-auto">
                                        <table className="w-full text-sm text-left">
                                          <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
                                            <tr>
                                              <th className="px-4 py-3">{lang === 'hu' ? 'Ticker' : 'Ticker'}</th>
                                              <th className="px-4 py-3">{lang === 'hu' ? 'Kategória' : 'Category'}</th>
                                              <th className="px-4 py-3">{lang === 'hu' ? 'Év' : 'Year'}</th>
                                              <th className="px-4 py-3">{lang === 'hu' ? 'Ann. Volatility %' : 'Ann. Volatility %'}</th>
                                              <th className="px-4 py-3">{lang === 'hu' ? 'Ann. Return %' : 'Ann. Return %'}</th>
                                              <th className="px-4 py-3">{lang === 'hu' ? 'Piac Átlagához Képest' : 'Vs Market Avg'}</th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            {marketSummary.map((row, idx) => (
                                              <tr key={idx} className={`border-b border-slate-100 last:border-0 ${row.ticker === 'S&P 500' ? 'bg-slate-50 font-semibold' : ''}`}>
                                                <td className="px-4 py-3 font-medium text-slate-900">{row.ticker}</td>
                                                <td className="px-4 py-3 text-slate-600">{row.category}</td>
                                                <td className="px-4 py-3 text-slate-600">{row.year}</td>
                                                <td className="px-4 py-3 text-slate-600">{row.vol.toFixed(1)}%</td>
                                                <td className={`px-4 py-3 ${row.ret >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>{row.ret > 0 ? '+' : ''}{row.ret.toFixed(1)}%</td>
                                                <td className={`px-4 py-3 ${row.vsMarket.startsWith('+') ? 'text-emerald-600' : row.vsMarket.startsWith('-') && row.vsMarket !== '-' ? 'text-red-600' : 'text-slate-500'}`}>
                                                  {row.vsMarket}
                                                </td>
                                              </tr>
                                            ))}
                                          </tbody>
                                        </table>
                                      </div>
                                    </div>
                                  </motion.div>
                                )}
                              </div>
                            )}
                          </div>
                        )}
                      </motion.div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-8 mt-12">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm font-medium">
            © {new Date().getFullYear()} Szabó Gábor - Financial Data Analyst
          </p>
          <div className="flex gap-4 text-sm text-slate-400">
            <a href="#" className="hover:text-slate-600 transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-slate-600 transition-colors">GitHub</a>
            <a href="#" className="hover:text-slate-600 transition-colors">Email</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
