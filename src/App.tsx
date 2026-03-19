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
  Shield,
  AlertTriangle
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
import { portfolioRiskCode, portfolioRiskCodeSnippet } from './data/portfolioRiskCode';
import { fraudDetectionPortfolioCode, fraudDetectionPortfolioCodeSnippet } from './data/fraud_detection_portfolio';

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
        deg: 'Pénzügy diploma'
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
          code: portfolioRiskCode,
          type: 'portfolio'
        },
        {
          title: 'Fraud Detection ML Modell',
          description: 'Gépi tanulás alapú csalásdetektáló rendszer Python-ban – Random Forest + Logistic Regression, SMOTE osztályegyensúlyozással. Kaggle Credit Card Fraud adathalmaz, AUC-ROC: 0.9779.',
          tags: ['Python', 'Machine Learning', 'Scikit-learn'],
          metrics: 'AUC-ROC: 0.9779',
          code: fraudDetectionPortfolioCode,
          type: 'fraud'
        },
        {
          title: 'Automatizált Cash-Flow Dashboard',
          description: 'Komplex Power BI dashboard kialakítása, amely valós időben vizualizálja a cég likviditását és a főbb pénzügyi KPI-okat.',
          tags: ['Power BI', 'SQL Server', 'DAX'],
          metrics: 'Napi 2 óra adminisztráció megtakarítás',
          type: 'other'
        },
        {
          title: 'Piaci Trendek és Profitabilitás Elemzés',
          description: 'Termékvonalak profitabilitásának mélyreható elemzése (Time Series Analysis), amely rámutatott a legkevésbé jövedelmező szegmensekre.',
          tags: ['Python', 'Pandas', 'Adatvizualizáció'],
          metrics: '+8% profitmarzs növekedés',
          type: 'other'
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
      desc: 'With over 4 years of experience in analyzing and visualizing complex financial datasets. My main focus is transforming data into business value, automating manual processes, and supporting executive decision-making with precise, transparent reports.',
      stats: {
        yoe: 'Years Experience',
        acc: 'Data Accuracy',
        deg: 'Finance Degree'
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
          code: portfolioRiskCode,
          type: 'portfolio'
        },
        {
          title: 'Fraud Detection ML Model',
          description: 'Machine learning-based fraud detection system in Python – Random Forest + Logistic Regression with SMOTE balancing. Kaggle Credit Card Fraud dataset, AUC-ROC: 0.9779.',
          tags: ['Python', 'Machine Learning', 'Scikit-learn'],
          metrics: 'AUC-ROC: 0.9779',
          code: fraudDetectionPortfolioCode,
          type: 'fraud'
        },
        {
          title: 'Automated Cash-Flow Dashboard',
          description: 'Created a complex Power BI dashboard visualizing company liquidity and key financial KPIs in real-time.',
          tags: ['Power BI', 'SQL Server', 'DAX'],
          metrics: '2 hours/day admin time saved',
          type: 'other'
        },
        {
          title: 'Market Trends & Profitability Analysis',
          description: 'In-depth profitability analysis of product lines (Time Series Analysis), highlighting the least profitable segments.',
          tags: ['Python', 'Pandas', 'Data Visualization'],
          metrics: '+8% profit margin increase',
          type: 'other'
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
  const [activeTab, setActiveTab] = useState<'code' | 'output'>('code');
  const [timeFilter, setTimeFilter] = useState<'1M' | '1Y' | '5Y'>('1Y');
  const [dashboardPage, setDashboardPage] = useState<number>(1);

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

  // ── FRAUD DETECTION MOCK DATA ──────────────────────────────────────────

  // AUC-ROC curve data points
  const mockAucRoc = (() => {
    const points: { fpr: number; tpr_lr: number; tpr_rf: number; random: number }[] = [];
    for (let i = 0; i <= 100; i++) {
      const fpr = i / 100;
      // LR: AUC ≈ 0.9700 - smooth S-curve
      const tpr_lr = Math.min(1, Math.pow(fpr, 0.08) * (1 - Math.exp(-fpr * 8)) + fpr * 0.03);
      // RF: AUC ≈ 0.9779 - steeper initial rise
      const tpr_rf = Math.min(1, Math.pow(fpr, 0.05) * (1 - Math.exp(-fpr * 12)) + fpr * 0.02);
      points.push({
        fpr: parseFloat(fpr.toFixed(2)),
        tpr_lr: parseFloat(Math.min(1, tpr_lr).toFixed(4)),
        tpr_rf: parseFloat(Math.min(1, tpr_rf).toFixed(4)),
        random: parseFloat(fpr.toFixed(2)),
      });
    }
    return points;
  })();

  // Precision-Recall curve data points
  const mockPrCurve = (() => {
    const points: { recall: number; prec_lr: number; prec_rf: number }[] = [];
    for (let i = 0; i <= 100; i++) {
      const recall = i / 100;
      // LR: AP ≈ 0.7146
      const prec_lr = recall < 0.05 ? 1.0 : Math.max(0.01, 1.0 - Math.pow(recall, 1.8) * 0.95 + Math.sin(recall * 3) * 0.05);
      // RF: AP ≈ 0.8329
      const prec_rf = recall < 0.05 ? 1.0 : Math.max(0.01, 1.0 - Math.pow(recall, 2.2) * 0.85 + Math.sin(recall * 2) * 0.03);
      points.push({
        recall: parseFloat(recall.toFixed(2)),
        prec_lr: parseFloat(Math.max(0, Math.min(1, prec_lr)).toFixed(4)),
        prec_rf: parseFloat(Math.max(0, Math.min(1, prec_rf)).toFixed(4)),
      });
    }
    return points;
  })();

  // Confusion Matrix data (Random Forest)
  const fraudConfusionMatrix = {
    tn: 56790, fp: 74, fn: 14, tp: 84,
    tn_pct: 99.9, fp_pct: 0.1, fn_pct: 14.3, tp_pct: 85.7
  };

  // Feature Importance (Top 15) - RF
  const mockFeatureImportance = [
    { feature: 'V14', importance: 0.1985 },
    { feature: 'V10', importance: 0.1150 },
    { feature: 'V4', importance: 0.1028 },
    { feature: 'V12', importance: 0.0980 },
    { feature: 'V17', importance: 0.0913 },
    { feature: 'V3', importance: 0.0662 },
    { feature: 'V11', importance: 0.0541 },
    { feature: 'V16', importance: 0.0452 },
    { feature: 'V2', importance: 0.0388 },
    { feature: 'V9', importance: 0.0260 },
    { feature: 'V7', importance: 0.0194 },
    { feature: 'V21', importance: 0.0154 },
    { feature: 'V8', importance: 0.0136 },
    { feature: 'V18', importance: 0.0128 },
    { feature: 'V19', importance: 0.0106 },
  ].reverse(); // reversed for horizontal bar chart (bottom to top)

  // EDA: Class distribution
  const fraudClassDist = [
    { name: 'Normál', count: 284315, color: '#00D4FF' },
    { name: 'Fraud', count: 492, color: '#FF6B35' },
  ];

  // EDA: Amount log-distribution (histogram bins)
  const fraudAmountHist = (() => {
    const bins: { bin: string; normal: number; fraud: number }[] = [];
    const binLabels = ['0-1', '1-2', '2-3', '3-4', '4-5', '5-6', '6-7', '7-8', '8-9', '9-10'];
    const normalCounts = [2100, 8500, 18000, 21000, 19500, 14000, 9000, 5500, 2800, 1200];
    const fraudCounts = [25, 45, 65, 80, 72, 55, 42, 30, 18, 8];
    for (let i = 0; i < binLabels.length; i++) {
      bins.push({ bin: binLabels[i], normal: normalCounts[i], fraud: fraudCounts[i] });
    }
    return bins;
  })();

  // ── HANDLE RUN CODE (conditional) ──────────────────────────────────────

  const handleRunCode = () => {
    setActiveTab('output');
    setRunState('running');
    setLogs([]);
    setDashboardPage(1);

    const isFraud = selectedProject?.type === 'fraud';

    const logSequence = isFraud ? [
      " Initializing Fraud Detection ML Pipeline...",
      " Loading creditcard.csv (Kaggle Credit Card Fraud dataset)...",
      " Dataset loaded: 284,807 transactions, 31 variables",
      "   Normal: 284,315 (99.83%) | Fraud: 492 (0.17%)",
      " Running EDA (Exploratory Data Analysis)...",
      " EDA saved: fraud_output/01_eda.png",
      " Preprocessing: StandardScaler + SMOTE oversampling...",
      " Train: 227,845 | Test: 56,962 | SMOTE balanced",
      " Training Logistic Regression (C=0.01, balanced)...",
      " Logistic Regression trained",
      " Training Random Forest (n=100, max_depth=12)...",
      " Random Forest trained",
      " Evaluating models...",
      "   LR: AUC=0.9700, F1=0.7143 | RF: AUC=0.9779, F1=0.7477",
      " Dashboard saved: fraud_output/02_dashboard.png",
      " Excel exported: fraud_output/fraud_model_results.xlsx"
    ] : [
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
          </div>
        </div>
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
                With over 4 years of experience analyzing and visualizing complex financial datasets.
                My main focus is <strong className="text-slate-900 font-semibold">transforming data into business value</strong>, automating manual processes,
                and supporting executive decision-making with precise, transparent reports.
              </>
            )}
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 mb-10 py-6 border-y border-slate-200">
            <div>
              <div className="text-2xl font-bold text-slate-900">4+</div>
              <div className="text-sm text-slate-500 font-medium">{t.hero.stats.yoe}</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">100%</div>
              <div className="text-sm text-slate-500 font-medium">{t.hero.stats.acc}</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">MSc</div>
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
              <a href="mailto:hello@example.com" className="flex items-center gap-2 px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-500 transition-colors shadow-lg shadow-blue-900/20">
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
                          <span className="ml-4 text-xs font-mono text-slate-300">{selectedProject.type === 'fraud' ? 'fraud_detection_portfolio.py' : 'portfolio_risk_management.py'}</span>
                        </div>
                        <pre className="p-4 overflow-x-auto text-sm font-mono text-slate-300 leading-relaxed max-h-[500px]">
                          <code>{selectedProject.type === 'fraud' ? fraudDetectionPortfolioCodeSnippet : (selectedProject.type === 'portfolio' ? portfolioRiskCodeSnippet : selectedProject.code)}</code>
                        </pre>
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
                                  {(selectedProject?.type === 'fraud' ? [1, 2, 3] : [1, 2, 3, 4]).map(page => (
                                    <button
                                      key={page}
                                      onClick={() => setDashboardPage(page)}
                                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${dashboardPage === page ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}
                                    >
                                      {selectedProject?.type === 'fraud'
                                        ? (page === 1 ? (lang === 'hu' ? 'Modellek' : 'Models') : page === 2 ? (lang === 'hu' ? 'Kiértékelés' : 'Evaluation') : (lang === 'hu' ? 'EDA' : 'EDA'))
                                        : (lang === 'hu' ? `Oldal ${page}` : `Page ${page}`)
                                      }
                                    </button>
                                  ))}
                                </div>

                                {/* ═══ FRAUD DETECTION DASHBOARDS ═══ */}
                                {selectedProject?.type === 'fraud' && dashboardPage === 1 && (
                                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* KPI Summary */}
                                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm md:col-span-2">
                                      <h4 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
                                        <Shield className="w-4 h-4 text-cyan-500" />
                                        {lang === 'hu' ? 'Modell Összehasonlítás (KPI)' : 'Model Comparison (KPI)'}
                                      </h4>
                                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {[
                                          { label: 'AUC-ROC (RF)', value: '0.9779', color: 'text-cyan-600' },
                                          { label: 'AUC-ROC (LR)', value: '0.9700', color: 'text-orange-500' },
                                          { label: 'F1 Score (RF)', value: '0.7477', color: 'text-emerald-600' },
                                          { label: 'Avg Precision (RF)', value: '0.8329', color: 'text-indigo-600' },
                                          { label: 'Precision (RF)', value: '0.5316', color: 'text-slate-700' },
                                          { label: 'Recall (RF)', value: '0.8571', color: 'text-slate-700' },
                                          { label: lang === 'hu' ? 'Fraud elkapva' : 'Fraud caught', value: '84 / 98', color: 'text-emerald-600' },
                                          { label: lang === 'hu' ? 'Hamis riasztás' : 'False alarm', value: '74', color: 'text-red-500' },
                                        ].map((kpi, i) => (
                                          <div key={i} className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                                            <p className="text-xs text-slate-500 font-medium mb-1">{kpi.label}</p>
                                            <p className={`text-lg font-bold ${kpi.color}`}>{kpi.value}</p>
                                          </div>
                                        ))}
                                      </div>
                                    </div>

                                    {/* AUC-ROC Curve */}
                                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                                      <h4 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
                                        <TrendingUp className="w-4 h-4 text-cyan-500" />
                                        AUC-ROC {lang === 'hu' ? 'görbe' : 'Curve'}
                                      </h4>
                                      <div className="h-64">
                                        <ResponsiveContainer width="100%" height="100%">
                                          <RechartsLineChart data={mockAucRoc} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                                            <XAxis dataKey="fpr" type="number" domain={[0, 1]} tick={{ fontSize: 11 }} label={{ value: 'False Positive Rate', position: 'insideBottom', offset: -3, style: { fontSize: 11, fill: '#64748b' } }} />
                                            <YAxis type="number" domain={[0, 1]} tick={{ fontSize: 11 }} label={{ value: 'True Positive Rate', angle: -90, position: 'insideLeft', style: { fontSize: 11, fill: '#64748b' } }} />
                                            <RechartsTooltip />
                                            <Legend />
                                            <Line type="monotone" dataKey="tpr_lr" name="Logistic Regression (0.9700)" stroke="#00D4FF" strokeWidth={2.5} dot={false} />
                                            <Line type="monotone" dataKey="tpr_rf" name="Random Forest (0.9779)" stroke="#FF6B35" strokeWidth={2.5} dot={false} />
                                            <Line type="monotone" dataKey="random" name="Random (0.50)" stroke="#94A3B8" strokeWidth={1} strokeDasharray="5 5" dot={false} />
                                          </RechartsLineChart>
                                        </ResponsiveContainer>
                                      </div>
                                    </div>

                                    {/* Precision-Recall Curve */}
                                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                                      <h4 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
                                        <Activity className="w-4 h-4 text-orange-500" />
                                        Precision-Recall {lang === 'hu' ? 'görbe' : 'Curve'}
                                      </h4>
                                      <div className="h-64">
                                        <ResponsiveContainer width="100%" height="100%">
                                          <RechartsLineChart data={mockPrCurve} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                                            <XAxis dataKey="recall" type="number" domain={[0, 1]} tick={{ fontSize: 11 }} label={{ value: 'Recall', position: 'insideBottom', offset: -3, style: { fontSize: 11, fill: '#64748b' } }} />
                                            <YAxis type="number" domain={[0, 1]} tick={{ fontSize: 11 }} label={{ value: 'Precision', angle: -90, position: 'insideLeft', style: { fontSize: 11, fill: '#64748b' } }} />
                                            <RechartsTooltip />
                                            <Legend />
                                            <Line type="monotone" dataKey="prec_lr" name="LR (AP=0.7146)" stroke="#00D4FF" strokeWidth={2.5} dot={false} />
                                            <Line type="monotone" dataKey="prec_rf" name="RF (AP=0.8329)" stroke="#FF6B35" strokeWidth={2.5} dot={false} />
                                            <ReferenceLine y={0.0017} stroke="#94A3B8" strokeDasharray="5 5" label={{ value: 'Baseline', position: 'right', style: { fontSize: 10, fill: '#94A3B8' } }} />
                                          </RechartsLineChart>
                                        </ResponsiveContainer>
                                      </div>
                                    </div>
                                  </motion.div>
                                )}

                                {selectedProject?.type === 'fraud' && dashboardPage === 2 && (
                                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Confusion Matrix */}
                                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                                      <h4 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
                                        <Grid className="w-4 h-4 text-purple-500" />
                                        Confusion Matrix – Random Forest
                                      </h4>
                                      <div className="grid grid-cols-2 gap-2">
                                        <div className="bg-red-400/80 rounded-lg p-6 text-center">
                                          <p className="text-white text-2xl font-bold">{fraudConfusionMatrix.tn.toLocaleString()}</p>
                                          <p className="text-white/80 text-sm">({fraudConfusionMatrix.tn_pct}%)</p>
                                          <p className="text-white/60 text-xs mt-1">{lang === 'hu' ? 'Normál → Normál' : 'Normal → Normal'}</p>
                                        </div>
                                        <div className="bg-cyan-500/80 rounded-lg p-6 text-center">
                                          <p className="text-white text-2xl font-bold">{fraudConfusionMatrix.fp}</p>
                                          <p className="text-white/80 text-sm">({fraudConfusionMatrix.fp_pct}%)</p>
                                          <p className="text-white/60 text-xs mt-1">{lang === 'hu' ? 'Normál → Fraud' : 'Normal → Fraud'}</p>
                                        </div>
                                        <div className="bg-cyan-500/80 rounded-lg p-6 text-center">
                                          <p className="text-white text-2xl font-bold">{fraudConfusionMatrix.fn}</p>
                                          <p className="text-white/80 text-sm">({fraudConfusionMatrix.fn_pct}%)</p>
                                          <p className="text-white/60 text-xs mt-1">{lang === 'hu' ? 'Fraud → Normál' : 'Fraud → Normal'}</p>
                                        </div>
                                        <div className="bg-red-400/80 rounded-lg p-6 text-center">
                                          <p className="text-white text-2xl font-bold">{fraudConfusionMatrix.tp}</p>
                                          <p className="text-white/80 text-sm">({fraudConfusionMatrix.tp_pct}%)</p>
                                          <p className="text-white/60 text-xs mt-1">{lang === 'hu' ? 'Fraud → Fraud' : 'Fraud → Fraud'}</p>
                                        </div>
                                      </div>
                                      <div className="flex justify-between mt-3 text-xs text-slate-500">
                                        <span>{lang === 'hu' ? 'Normál (pred) | Fraud (pred)' : 'Normal (pred) | Fraud (pred)'}</span>
                                      </div>
                                    </div>

                                    {/* Feature Importance */}
                                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                                      <h4 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
                                        <BarChart2 className="w-4 h-4 text-orange-500" />
                                        Top 15 Feature Importance (RF)
                                      </h4>
                                      <div className="h-80">
                                        <ResponsiveContainer width="100%" height="100%">
                                          <BarChart data={mockFeatureImportance} layout="vertical" margin={{ top: 5, right: 40, left: 10, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
                                            <XAxis type="number" domain={[0, 0.21]} tick={{ fontSize: 10 }} />
                                            <YAxis dataKey="feature" type="category" width={35} tick={{ fontSize: 11 }} />
                                            <RechartsTooltip formatter={(value: number) => value.toFixed(4)} />
                                            <Bar dataKey="importance" name={lang === 'hu' ? 'Fontossági érték' : 'Importance'} radius={[0, 4, 4, 0]}>
                                              {mockFeatureImportance.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={index >= mockFeatureImportance.length - 5 ? '#FF6B35' : '#00D4FF'} />
                                              ))}
                                            </Bar>
                                          </BarChart>
                                        </ResponsiveContainer>
                                      </div>
                                    </div>
                                  </motion.div>
                                )}

                                {selectedProject?.type === 'fraud' && dashboardPage === 3 && (
                                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* EDA Title */}
                                    <div className="md:col-span-2 text-center">
                                      <h4 className="text-base font-bold text-slate-800">EDA – Credit Card Fraud Detection</h4>
                                    </div>
                                    {/* Class Distribution */}
                                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                                      <h4 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
                                        <AlertTriangle className="w-4 h-4 text-cyan-500" />
                                        {lang === 'hu' ? 'Osztályeloszlás' : 'Class Distribution'}
                                      </h4>
                                      <div className="h-64">
                                        <ResponsiveContainer width="100%" height="100%">
                                          <BarChart data={fraudClassDist} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                                            <YAxis tick={{ fontSize: 11 }} />
                                            <RechartsTooltip formatter={(value: number) => value.toLocaleString()} />
                                            <Bar dataKey="count" name={lang === 'hu' ? 'Tranzakciók' : 'Transactions'} radius={[4, 4, 0, 0]}>
                                              {fraudClassDist.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                              ))}
                                            </Bar>
                                          </BarChart>
                                        </ResponsiveContainer>
                                      </div>
                                    </div>

                                    {/* Amount Log-Distribution */}
                                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                                      <h4 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
                                        <BarChart3 className="w-4 h-4 text-blue-500" />
                                        {lang === 'hu' ? 'Összeg log-eloszlása' : 'Amount Log-Distribution'}
                                      </h4>
                                      <div className="h-64">
                                        <ResponsiveContainer width="100%" height="100%">
                                          <BarChart data={fraudAmountHist} margin={{ top: 5, right: 20, left: 0, bottom: 25 }}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                            <XAxis dataKey="bin" tick={{ fontSize: 10 }} label={{ value: 'log(1 + Amount)', position: 'insideBottom', offset: -15, style: { fontSize: 11, fill: '#64748b' } }} />
                                            <YAxis tick={{ fontSize: 11 }} />
                                            <RechartsTooltip />
                                            <Legend />
                                            <Bar dataKey="normal" name={`Normál (n=284,315)`} fill="#00D4FF" stackId="a" />
                                            <Bar dataKey="fraud" name={`Fraud (n=492)`} fill="#FF6B35" stackId="a" />
                                          </BarChart>
                                        </ResponsiveContainer>
                                      </div>
                                    </div>

                                    {/* Dataset Summary Table */}
                                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm md:col-span-2">
                                      <h4 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
                                        <Table className="w-4 h-4 text-emerald-600" />
                                        {lang === 'hu' ? 'Adathalmaz \u0026 Modell Összefoglaló' : 'Dataset \u0026 Model Summary'}
                                      </h4>
                                      <div className="overflow-x-auto">
                                        <table className="w-full text-sm text-left">
                                          <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
                                            <tr>
                                              <th className="px-4 py-3">{lang === 'hu' ? 'Metrika' : 'Metric'}</th>
                                              <th className="px-4 py-3">Logistic Regression</th>
                                              <th className="px-4 py-3">Random Forest</th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            {[
                                              { metric: 'AUC-ROC', lr: '0.9700', rf: '0.9779' },
                                              { metric: 'F1 Score', lr: '0.7143', rf: '0.7477' },
                                              { metric: 'Precision', lr: '0.4937', rf: '0.5316' },
                                              { metric: 'Recall', lr: '0.7959', rf: '0.8571' },
                                              { metric: 'Avg Precision', lr: '0.7146', rf: '0.8329' },
                                            ].map((row, idx) => (
                                              <tr key={idx} className="border-b border-slate-100">
                                                <td className="px-4 py-3 font-medium text-slate-900">{row.metric}</td>
                                                <td className="px-4 py-3 text-slate-600">{row.lr}</td>
                                                <td className={`px-4 py-3 font-semibold ${parseFloat(row.rf) > parseFloat(row.lr) ? 'text-emerald-600' : 'text-slate-600'}`}>{row.rf}</td>
                                              </tr>
                                            ))}
                                          </tbody>
                                        </table>
                                      </div>
                                    </div>
                                  </motion.div>
                                )}

                                {/* ═══ PORTFOLIO RISK DASHBOARDS (existing) ═══ */}

                                {/* Page 1 */}
                                {selectedProject?.type !== 'fraud' && dashboardPage === 1 && (
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
                                {selectedProject?.type !== 'fraud' && dashboardPage === 2 && (
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
                                {selectedProject?.type !== 'fraud' && dashboardPage === 3 && (
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
                                {selectedProject?.type !== 'fraud' && dashboardPage === 4 && (
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
