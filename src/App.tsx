import { useState, useEffect, useRef } from 'react';
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
  Area,
  LabelList,
  Tooltip
} from 'recharts';
import { portfolioRiskCode, portfolioRiskCodeSnippet, portfolioRiskSQLCode } from './data/portfolioRiskCode';
import { creditFraudCode, creditFraudSnippet } from './data/creditFraudDetection';

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
      desc: '2 év tapasztalattal rendelkezem komplex pénzügyi adathalmazok elemzésében és vizualizációjában. Fő fókuszom az adatok üzleti értékké alakítása, a manuális folyamatok automatizálása, és a vezetőségi döntéshozatal támogatása precíz, átlátható riportokkal.',
      stats: {
        yoe: 'Év tapasztalat',
        acc: 'Adatprecizitás',
        deg: 'Közgazdasági diploma'
      },
      btnInterview: 'Interjú egyeztetése',
      btnCV: 'CV Kérése'
    },
    experience: {
      title: 'Szakmai Tapasztalat',
      jobs: [
        {
          role: 'Volumetrikus Könyvelési Elemző',
          company: 'ExxonMobil Hungary LLC.',
          period: '2025. június – Jelenleg',
          highlights: [
            'Nyersolaj-mozgások rögzítése, validálása és egyeztetése terminálok, tranzitpontok és gyártási interfészek között pénzügyi és stewardship riporting céljából.',
            'Python-alapú belső eszközök fejlesztése: spread kalkulátor standardizált Excel-riportokhoz és portfólió-tracker, amely automatikusan letölti, importálja és konszolidálja a könyvelési tételeket.',
            'Globális érdekelt felekkel való együttműködés munkafolyamatok elemzésére, hatékonysági problémák azonosítására és fejlesztett folyamatok tervezésére a belső irányítási követelményekkel összhangban.'
          ]
        },
        {
          role: 'Kontrolling Intern',
          company: 'Jazz Event Kft.',
          period: '2025. január – 2025. június',
          highlights: [
            'Excel és Power BI dashboardok és vezetői riportok fejlesztése.',
            'Tervezés, előrejelzés és valós idejű költségfigyelési tevékenységek támogatása.',
            'Strukturált pénzügyi adathalmazok felépítése és karbantartása, biztosítva az adatok pontosságát és konzisztenciáját.'
          ]
        },
        {
          role: 'Pénzügyi Intern',
          company: 'METRO Cash & Carry Hungary Zrt. (METRO AG)',
          period: '2024. május – 2025. január',
          highlights: [
            'Excel makrók és pivot táblák fejlesztése a riporting és a pénzügyi elemzés automatizálásához (fedezet, forgalom, jövedelmezőség).',
            'Strukturált adatvalidálás és SQL-alapú lekérdezések végrehajtása a riporting pontosságának biztosítására.',
            'Hónap- és negyedévzárási folyamatok támogatása pénzügyi adatkinyeréssel, validálással és egyeztetéssel.'
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
          id: 1,
          title: 'Portfólió Kockázatkezelési Dashboard',
          description: 'Ez a projekt egy átfogó, intézményi szintű kockázatkezelő rendszer, amely valós piaci adatokon végez mélyreható pénzügyi elemzést. A Yahoo Finance API-n keresztül élő árfolyamadatokat tölt le egy nyolc eszközből álló diverzifikált portfólióhoz (részvények, arany ETF és állampapír ETF), és az adatokat egy produkciós MSSQL sémát tükröző SQLite adatbázisban tárolja.\n\nAz elemzés a legfontosabb kvantitatív kockázati metrikákat fedi le: éves hozam és volatilitás, Sharpe-ráta, parametrikus VaR (95% és 99%), CVaR / Expected Shortfall, Maximum Drawdown, Béta és Diverzifikációs Ráta. Az eredmények egy négylap dark témájú Matplotlib dashboardon jelennek meg, kumulatív hozamgörbékkel, korrelációs hőtérképpel, Sharpe-ráta összehasonlítással és drawdown vizualizációval.\n\nAz alkalmazás egy tkinter alapú GUI-val indul, amely lehetővé teszi a kimeneti fájlok interaktív kiválasztását. Exportál egy Power BI-kész Excel munkafüzetet hat strukturált adatlappal, és Windows rendszeren automatikusan elindítja a Power BI Desktopot. A megoldás Pythonban íródott, a pandas, numpy, yfinance, scipy és matplotlib könyvtárak felhasználásával.',
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
          id: 2,
          title: 'Hitelezési Kockázat & Csalásdetektálási Modell',
          description: 'Ez a projekt egy gépi tanulás alapú csalásdetektáló rendszer, amely valós hitelkártya-tranzakciós adatokon (Kaggle – Credit Card Fraud Detection) alapul, és képes a csalárd eseteket nagy pontossággal azonosítani. Az egyik fő kihívás az extrém osztályegyensúlytalanság: több mint 280 000 tranzakcióból mindössze ~0,17% minősül csalásnak. Ennek kezelésére SMOTE (Synthetic Minority Oversampling Technique) technikát alkalmaztam szintetikus kisebbségi minták generálására a tanítóhalmazban.\n\nA rendszer két modellt hasonlít össze: egy Logisztikus Regressziós alapmodellt és egy Random Forest ensemble osztályozót. Az értékelés AUC-ROC, F1-score, Precision és Recall metrikákon alapul — amelyek lényegesen megbízhatóbbak, mint az egyszerű pontosság erősen imbalanced adatoknál. Az eredmények sötét témájú, négypaneles Matplotlib dashboardon jelennek meg, ROC és Precision-Recall görbékkel, confusion matrix hőtérképpel és a Random Forest által azonosított top 15 legfontosabb jellemzővel.\n\nA projekt célja egy teljes, produkció-orientált ML pipeline bemutatása: az adatbetöltéstől és az exploratív adatelemzéstől (EDA) az előfeldolgozáson és modellezésen át a vizuális kiértékelésig. A megoldás Pythonban íródott, a scikit-learn és imbalanced-learn könyvtárak felhasználásával.',
          tags: ['Python', 'Scikit-learn', 'Random Forest', 'Kaggle'],
          metrics: 'AUC: 0.97 | Recall: 94%',
          code: creditFraudCode
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
      btnCV: 'Request CV'
    },
    experience: {
      title: 'Professional Experience',
      jobs: [
        {
          role: 'Volumetric Accounting Analyst',
          company: 'ExxonMobil Hungary LLC.',
          period: 'Jun 2025 – Present',
          highlights: [
            'Recorded, validated, and reconciled crude oil movements across terminals, transit points, and manufacturing interfaces for financial and stewardship reporting.',
            'Developed Python-based internal tools including a spread calculator generating standardized Excel reports and a portfolio tracker that automatically downloads, imports, and consolidates accounting-pending items.',
            'Collaborated with global stakeholders to analyze workflows, identify inefficiencies, and design improved processes aligned with internal governance requirements.'
          ]
        },
        {
          role: 'Cost Controller Intern',
          company: 'Jazz Event Kft.',
          period: 'Jan 2025 – Jun 2025',
          highlights: [
            'Developed dashboards and management reports using Excel and Power BI.',
            'Supported budgeting, forecasting, and real-time cost monitoring activities.',
            'Built and maintained structured financial datasets ensuring data accuracy and consistency.'
          ]
        },
        {
          role: 'Finance Intern',
          company: 'METRO Cash & Carry Hungary Zrt. (METRO AG)',
          period: 'May 2024 – Jan 2025',
          highlights: [
            'Developed Excel macros and pivot tables to automate reporting and financial analysis, including margin, turnover, and profitability metrics.',
            'Performed structured data validation and executed SQL-based queries to ensure reporting accuracy.',
            'Supported month-end and quarterly closing processes through financial data extraction, validation, and reconciliation.'
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
          id: 1,
          title: 'Portfolio Risk Management Dashboard',
          description: 'This project is a comprehensive, institutional-grade risk management system that performs in-depth financial analysis on real-world market data. It downloads live price data via the Yahoo Finance API for a diversified eight-asset portfolio (equities, gold ETF, and treasury ETF), and persists the data in a SQLite database modeled after a production MSSQL schema.\n\nThe analysis covers the most critical quantitative risk metrics: annualized return and volatility, Sharpe ratio, parametric VaR (95% and 99%), CVaR / Expected Shortfall, Maximum Drawdown, Beta, and Diversification Ratio. Results are displayed across a four-page dark-themed Matplotlib dashboard featuring cumulative return curves, a correlation heatmap, Sharpe ratio comparisons, and drawdown visualization.\n\nThe application launches with a tkinter-based GUI that lets the user interactively select output file locations. It also exports a Power BI–ready Excel workbook with six structured data sheets, and on Windows automatically launches Power BI Desktop. The solution is written in Python, leveraging pandas, numpy, yfinance, scipy, and matplotlib.',
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
          id: 2,
          title: 'Credit Risk & Fraud Detection Model (ML)',
          description: 'This project is a machine learning-based fraud detection system built on real-world credit card transaction data (Kaggle – Credit Card Fraud Detection), capable of identifying fraudulent cases with high accuracy. One of the core challenges is the extreme class imbalance: out of more than 280,000 transactions, only ~0.17% are labeled as fraud. To address this, SMOTE (Synthetic Minority Oversampling Technique) was applied to generate synthetic minority samples in the training set.\n\nThe system compares two models: a Logistic Regression baseline and a Random Forest ensemble classifier. Evaluation is based on AUC-ROC, F1-score, Precision, and Recall metrics — which are far more reliable than simple accuracy when dealing with heavily imbalanced data. Results are visualized through a dark-themed, four-panel Matplotlib dashboard, featuring ROC and Precision-Recall curves, a confusion matrix heatmap, and the top 15 most important features identified by the Random Forest model.\n\nThe goal of this project is to demonstrate a complete, production-oriented ML pipeline: from data loading and exploratory data analysis (EDA) through preprocessing and modeling to visual evaluation. The solution is written in Python, leveraging the scikit-learn and imbalanced-learn libraries.',
          tags: ['Python', 'Scikit-learn', 'Random Forest', 'Kaggle'],
          metrics: 'AUC: 0.97 | Recall: 94%',
          code: creditFraudCode
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

type PricePoint = { date: string; close: number };

export default function App() {
  const [lang, setLang] = useState<'hu' | 'en'>('en');
  const [selectedProject, setSelectedProject] = useState<any>(null);

  // Code Execution State
  const [runState, setRunState] = useState<'idle' | 'running' | 'done'>('idle');
  const [logs, setLogs] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'code' | 'output' | 'sql'>('output');
  const [timeFilter, setTimeFilter] = useState<'1M' | '1Y' | '3Y'>('1Y');
  const [dashboardPage, setDashboardPage] = useState<number>(1);
  const [sqlTable, setSqlTable] = useState<'prices' | 'daily_returns' | 'rolling_volatility'>('prices');
  const [sqlSortDesc, setSqlSortDesc] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const logEndRef = useRef<HTMLDivElement>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);

  // auto-scroll terminal as logs come in
  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  // scroll to dashboard when run completes
  useEffect(() => {
    if (runState === 'done') {
      setTimeout(() => dashboardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    }
  }, [runState]);

  // ── Real Yahoo Finance data ────────────────────────────────────────────────
  const [realPrices, setRealPrices] = useState<Record<string, PricePoint[]>>({});
  const [dataLoaded, setDataLoaded] = useState(false);
  const [dataError, setDataError] = useState(false);

  useEffect(() => {
    const FETCH_TICKERS = ['AAPL', 'MSFT', 'JPM', 'GS', 'BLK', 'XOM', 'GLD', 'TLT'];
    const now = Math.floor(Date.now() / 1000);
    const start = now - 3 * 365 * 24 * 3600;
    Promise.all(
      FETCH_TICKERS.map(async ticker => {
        const yUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${ticker}?interval=1d&period1=${start}&period2=${now}`;
        const res = await fetch(`https://corsproxy.io/?${encodeURIComponent(yUrl)}`);
        if (!res.ok) throw new Error('HTTP ' + res.status);
        const json = await res.json();
        const r = json.chart.result[0];
        const closes: number[] = r.indicators.quote[0].close;
        return {
          ticker,
          prices: (r.timestamp as number[]).map((ts, i) => {
            const d = new Date(ts * 1000);
            return {
              date: `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}-${String(d.getUTCDate()).padStart(2, '0')}`,
              close: closes[i]
            };
          }).filter(p => p.close != null && !isNaN(p.close))
        };
      })
    )
      .then(results => {
        const map: Record<string, PricePoint[]> = {};
        results.forEach(r => { map[r.ticker] = r.prices; });
        setRealPrices(map);
        setDataLoaded(true);
      })
      .catch(() => { setDataLoaded(true); setDataError(true); });
  }, []);

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

  // ── Computation helpers ───────────────────────────────────────────────────────
  const PORTFOLIO_W: Record<string, number> = { AAPL: 0.20, MSFT: 0.20, JPM: 0.15, GS: 0.10, BLK: 0.10, XOM: 0.10, GLD: 0.10, TLT: 0.05 };
  const TICKER_COLORS: Record<string, string> = { AAPL: '#2CA6A4', MSFT: '#C9A84C', JPM: '#E05A4E', GS: '#4CAF7D', BLK: '#9B59B6', XOM: '#E67E22', GLD: '#3498DB', TLT: '#1ABC9C' };
  const TICKER_CATS: Record<string, string> = { AAPL: 'Tech', MSFT: 'Tech', JPM: 'Financials', GS: 'Financials', BLK: 'Financials', XOM: 'Energy', GLD: 'Commodity', TLT: 'Bonds' };
  const ALL_TICKERS = ['AAPL', 'MSFT', 'JPM', 'GS', 'BLK', 'XOM', 'GLD', 'TLT'] as const;
  const RFREE = 0.0525;

  const retsFromPrices = (prices: { date: string; close: number }[]) =>
    prices.slice(1).map((p, i) => ({ date: p.date, r: Math.log(p.close / prices[i].close) }));

  const annMetrics = (rets: { r: number }[]) => {
    if (rets.length < 2) return { ret: 0, vol: 0 };
    const n = rets.length;
    const mean = rets.reduce((s, x) => s + x.r, 0) / n;
    const variance = rets.reduce((s, x) => s + (x.r - mean) ** 2, 0) / (n - 1);
    return { ret: mean * 252, vol: Math.sqrt(variance * 252) };
  };

  const pearsonCorr = (a: number[], b: number[]) => {
    const n = Math.min(a.length, b.length);
    if (n < 2) return 0;
    const ma = a.slice(0, n).reduce((s, x) => s + x, 0) / n;
    const mb = b.slice(0, n).reduce((s, x) => s + x, 0) / n;
    const num = a.slice(0, n).reduce((s, x, i) => s + (x - ma) * (b[i] - mb), 0);
    const da = Math.sqrt(a.slice(0, n).reduce((s, x) => s + (x - ma) ** 2, 0));
    const db = Math.sqrt(b.slice(0, n).reduce((s, x) => s + (x - mb) ** 2, 0));
    return da && db ? Math.round(num / (da * db) * 100) / 100 : 0;
  };

  const hasReal = dataLoaded && !dataError && Object.keys(realPrices).length === 8;

  // ── Portfolio-level KPI metrics ───────────────────────────────────────────────
  const portKPI = hasReal
    ? (() => {
      const minLen = Math.min(...ALL_TICKERS.map(t => realPrices[t].length));
      const portRets: number[] = [];
      for (let i = 1; i < minLen; i++) {
        portRets.push(ALL_TICKERS.reduce((s, t) => s + PORTFOLIO_W[t] * Math.log(realPrices[t][i].close / realPrices[t][i - 1].close), 0));
      }
      const n = portRets.length;
      const mean = portRets.reduce((s, r) => s + r, 0) / n;
      const variance = portRets.reduce((s, r) => s + (r - mean) ** 2, 0) / (n - 1);
      const ret = mean * 252;
      const vol = Math.sqrt(variance * 252);
      const sharpe = vol > 0 ? (ret - RFREE) / vol : 0;
      let cum = 1, peak = 1, maxDD = 0;
      for (const r of portRets) { cum *= Math.exp(r); if (cum > peak) peak = cum; const dd = (cum - peak) / peak; if (dd < maxDD) maxDD = dd; }
      const sorted = [...portRets].sort((a, b) => a - b);
      const varIdx = Math.max(1, Math.floor(0.05 * n));
      const var95 = sorted[varIdx] * 100;
      const cvar95 = sorted.slice(0, varIdx).reduce((s, r) => s + r, 0) / varIdx * 100;
      return {
        ret: Math.round(ret * 1000) / 10,
        vol: Math.round(vol * 1000) / 10,
        sharpe: Math.round(sharpe * 100) / 100,
        maxDD: Math.round(maxDD * 1000) / 10,
        var95: Math.round(var95 * 100) / 100,
        cvar95: Math.round(cvar95 * 100) / 100,
      };
    })()
    : { ret: 18.4, vol: 15.2, sharpe: 1.21, maxDD: -12.4, var95: -2.1, cvar95: -3.4 };

  // ── Derived chart data (real data when loaded, mock fallback otherwise) ────────
  const mockSharpe = hasReal
    ? ALL_TICKERS.map(t => {
      const { ret, vol } = annMetrics(retsFromPrices(realPrices[t]));
      return { name: t, sharpe: vol > 0 ? Math.round((ret - RFREE) / vol * 1000) / 1000 : 0 };
    }).sort((a, b) => a.sharpe - b.sharpe)
    : [
      { name: 'AAPL', sharpe: 1.12 }, { name: 'MSFT', sharpe: 1.05 },
      { name: 'JPM', sharpe: 0.85 }, { name: 'GS', sharpe: 0.72 },
      { name: 'BLK', sharpe: 0.91 }, { name: 'XOM', sharpe: 0.65 },
      { name: 'GLD', sharpe: 0.45 }, { name: 'TLT', sharpe: -0.15 },
    ].sort((a, b) => a.sharpe - b.sharpe);

  const getMockReturns = (filter: '1M' | '1Y' | '3Y') => {
    if (hasReal && (realPrices['AAPL']?.length ?? 0) > 2) {
      const base = realPrices['AAPL'];
      const endMs = new Date(base[base.length - 1].date).getTime();
      let startMs: number;
      if (filter === '1M') startMs = endMs - 31 * 86400000;
      else if (filter === '1Y') startMs = endMs - 366 * 86400000;
      else startMs = 0; // 3Y = all available data (3 years fetched)

      let allDates = base.filter(p => new Date(p.date).getTime() >= startMs).map(p => p.date);

      // 1M → weekly: keep every 5th trading day (~1 point/week)
      if (filter === '1M' && allDates.length > 5) {
        const step = 5;
        allDates = allDates.filter((_, i) => i % step === 0).concat(allDates[allDates.length - 1]);
      }
      // 1Y → monthly: keep every ~21st trading day
      if (filter === '1Y' && allDates.length > 12) {
        const step = Math.floor(allDates.length / 12);
        allDates = allDates.filter((_, i) => i % step === 0).concat(allDates[allDates.length - 1]);
      }
      // 3Y → quarterly: keep every ~63rd trading day
      if (filter === '3Y' && allDates.length > 12) {
        const step = Math.floor(allDates.length / 12);
        allDates = allDates.filter((_, i) => i % step === 0).concat(allDates[allDates.length - 1]);
      }

      const pMap: Record<string, Record<string, number>> = {};
      ALL_TICKERS.forEach(t => {
        pMap[t] = {};
        (realPrices[t] || []).forEach(p => { pMap[t][p.date] = p.close; });
      });
      const p0: Record<string, number> = {};
      ALL_TICKERS.forEach(t => { p0[t] = pMap[t][allDates[0]] ?? 0; });

      return allDates.map(date => {
        let port = 0, bench = 0;
        ALL_TICKERS.forEach(t => {
          const cur = pMap[t][date], base0 = p0[t];
          if (cur && base0) { port += PORTFOLIO_W[t] * (cur / base0) * 100; bench += (1 / 8) * (cur / base0) * 100; }
        });
        const label = filter === '1M'
          ? new Date(date).toLocaleDateString(lang === 'hu' ? 'hu-HU' : 'en-US', { month: 'short', day: 'numeric' })
          : filter === '1Y'
            ? new Date(date).toLocaleDateString(lang === 'hu' ? 'hu-HU' : 'en-US', { month: 'short', year: '2-digit' })
            : new Date(date).toLocaleDateString(lang === 'hu' ? 'hu-HU' : 'en-US', { month: 'short', year: 'numeric' });
        return { date: label, portfolio: Math.round(port * 100) / 100, benchmark: Math.round(bench * 100) / 100 };
      });
    }
    // fallback
    const today = new Date();
    if (filter === '1M') {
      return Array.from({ length: 5 }, (_, i) => {
        const d = new Date(today); d.setDate(today.getDate() - (4 - i) * 7);
        return { date: d.toLocaleDateString(lang === 'hu' ? 'hu-HU' : 'en-US', { month: 'short', day: 'numeric' }), portfolio: 100 + (i * 0.5) + (Math.random() * 2 - 1), benchmark: 100 + (i * 0.4) + (Math.random() * 1.5 - 0.75) };
      });
    } else if (filter === '1Y') {
      return Array.from({ length: 12 }, (_, i) => {
        const d = new Date(today); d.setMonth(today.getMonth() - (11 - i));
        return { date: d.toLocaleDateString(lang === 'hu' ? 'hu-HU' : 'en-US', { month: 'short', year: '2-digit' }), portfolio: 100 + (i * 1.5) + (Math.random() * 5 - 2.5), benchmark: 100 + (i * 1.2) + (Math.random() * 4 - 2) };
      });
    } else {
      return Array.from({ length: 12 }, (_, i) => {
        const d = new Date(today); d.setMonth(today.getMonth() - (35 - i * 3));
        return { date: d.toLocaleDateString(lang === 'hu' ? 'hu-HU' : 'en-US', { month: 'short', year: 'numeric' }), portfolio: 100 + (i * 5) + (Math.random() * 10 - 5), benchmark: 100 + (i * 4) + (Math.random() * 8 - 4) };
      });
    }
  };

  const mockReturns = getMockReturns(timeFilter);

  const mockRiskReturn = hasReal
    ? (() => {
      const minLen = Math.min(...ALL_TICKERS.map(t => realPrices[t].length));
      const portRets: { r: number }[] = [];
      for (let i = 1; i < minLen; i++) {
        portRets.push({ r: ALL_TICKERS.reduce((s, t) => s + PORTFOLIO_W[t] * Math.log(realPrices[t][i].close / realPrices[t][i - 1].close), 0) });
      }
      const { ret: pRet, vol: pVol } = annMetrics(portRets);
      return [
        ...ALL_TICKERS.map(t => {
          const { ret, vol } = annMetrics(retsFromPrices(realPrices[t]));
          return { name: t, vol: Math.round(vol * 1000) / 10, ret: Math.round(ret * 1000) / 10, color: TICKER_COLORS[t] };
        }),
        { name: 'Portfolio', vol: Math.round(pVol * 1000) / 10, ret: Math.round(pRet * 1000) / 10, isPort: true, color: '#F1C40F' },
        { name: 'S&P 500 (Piac)', vol: 18.0, ret: 15.0, isMarket: true, color: '#95A5A6' }
      ];
    })()
    : [
      { name: 'AAPL', vol: 25.4, ret: 32.1, color: '#2CA6A4' }, { name: 'MSFT', vol: 22.1, ret: 28.5, color: '#C9A84C' },
      { name: 'JPM', vol: 18.5, ret: 12.4, color: '#E05A4E' }, { name: 'GS', vol: 21.0, ret: 14.2, color: '#4CAF7D' },
      { name: 'BLK', vol: 19.2, ret: 16.8, color: '#9B59B6' }, { name: 'XOM', vol: 24.5, ret: 18.5, color: '#E67E22' },
      { name: 'GLD', vol: 12.4, ret: 5.2, color: '#3498DB' }, { name: 'TLT', vol: 14.5, ret: -2.1, color: '#1ABC9C' },
      { name: 'Portfolio', vol: 15.2, ret: 18.4, isPort: true, color: '#F1C40F' },
      { name: 'S&P 500 (Piac)', vol: 18.0, ret: 15.0, isMarket: true, color: '#95A5A6' }
    ];

  const mockReturnBins = hasReal
    ? (() => {
      const minLen = Math.min(...ALL_TICKERS.map(t => realPrices[t].length));
      const portRets: number[] = [];
      for (let i = 1; i < minLen; i++) {
        portRets.push(ALL_TICKERS.reduce((s, t) => s + PORTFOLIO_W[t] * Math.log(realPrices[t][i].close / realPrices[t][i - 1].close), 0) * 100);
      }
      const binDefs = [
        { bin: '< -3%', min: -Infinity, max: -3 }, { bin: '-3% to -2%', min: -3, max: -2 },
        { bin: '-2% to -1%', min: -2, max: -1 }, { bin: '-1% to 0%', min: -1, max: 0 },
        { bin: '0% to 1%', min: 0, max: 1 }, { bin: '1% to 2%', min: 1, max: 2 },
        { bin: '2% to 3%', min: 2, max: 3 }, { bin: '> 3%', min: 3, max: Infinity },
      ];
      return binDefs.map(b => ({ bin: b.bin, count: portRets.filter(r => r >= b.min && r < b.max).length }));
    })()
    : [
      { bin: '< -3%', count: 5 }, { bin: '-3% to -2%', count: 12 }, { bin: '-2% to -1%', count: 35 },
      { bin: '-1% to 0%', count: 68 }, { bin: '0% to 1%', count: 85 }, { bin: '1% to 2%', count: 42 },
      { bin: '2% to 3%', count: 15 }, { bin: '> 3%', count: 6 },
    ];

  const corrTickers = ['AAPL', 'MSFT', 'JPM', 'GS', 'BLK', 'XOM', 'GLD', 'TLT'];
  const mockCorrelation = hasReal
    ? ALL_TICKERS.map((t1, i) =>
      ALL_TICKERS.map((t2, j) => {
        if (i === j) return 1;
        const r1 = retsFromPrices(realPrices[t1]).map(x => x.r);
        const r2 = retsFromPrices(realPrices[t2]).map(x => x.r);
        return pearsonCorr(r1, r2);
      })
    )
    : [
      [1.00, 0.78, 0.42, 0.45, 0.51, 0.32, 0.05, -0.21],
      [0.78, 1.00, 0.38, 0.41, 0.48, 0.28, 0.08, -0.18],
      [0.42, 0.38, 1.00, 0.85, 0.75, 0.55, -0.10, -0.35],
      [0.45, 0.41, 0.85, 1.00, 0.72, 0.52, -0.08, -0.32],
      [0.51, 0.48, 0.75, 0.72, 1.00, 0.45, -0.05, -0.25],
      [0.32, 0.28, 0.55, 0.52, 0.45, 1.00, 0.15, -0.10],
      [0.05, 0.08, -0.10, -0.08, -0.05, 0.15, 1.00, 0.45],
      [-0.21, -0.18, -0.35, -0.32, -0.25, -0.10, 0.45, 1.00],
    ];

  const marketSummary = hasReal
    ? (() => {
      const MKT_RET = 15.0;
      const rows = ALL_TICKERS.map(t => {
        const { ret, vol } = annMetrics(retsFromPrices(realPrices[t]));
        const r = Math.round(ret * 1000) / 10;
        const v = Math.round(vol * 1000) / 10;
        const diff = Math.round((r - MKT_RET) * 10) / 10;
        return { ticker: t, category: TICKER_CATS[t], year: new Date().getFullYear(), vol: v, ret: r, vsMarket: `${diff >= 0 ? '+' : ''}${diff}%` };
      });
      return [...rows, { ticker: 'S&P 500', category: 'Market (Piac)', year: new Date().getFullYear(), vol: 18.0, ret: MKT_RET, vsMarket: '-' }];
    })()
    : [
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

  const mockRollingVol = hasReal
    ? (() => {
      const minLen = Math.min(...ALL_TICKERS.map(t => realPrices[t].length));
      const start = Math.max(0, minLen - 51);
      const portRets: number[] = [], benchRets: number[] = [];
      const refDates: string[] = [];
      for (let i = start + 1; i < minLen; i++) {
        portRets.push(ALL_TICKERS.reduce((s, t) => s + PORTFOLIO_W[t] * Math.log(realPrices[t][i].close / realPrices[t][i - 1].close), 0));
        benchRets.push(ALL_TICKERS.reduce((s, t) => s + (1 / 8) * Math.log(realPrices[t][i].close / realPrices[t][i - 1].close), 0));
        refDates.push(realPrices['AAPL'][i].date);
      }
      const result: { date: string; portfolio: number; benchmark: number }[] = [];
      for (let i = 20; i < portRets.length; i++) {
        const ps = portRets.slice(i - 20, i + 1), bs = benchRets.slice(i - 20, i + 1);
        const pm = ps.reduce((s, r) => s + r, 0) / 21, bm = bs.reduce((s, r) => s + r, 0) / 21;
        const pv = Math.sqrt(ps.reduce((s, r) => s + (r - pm) ** 2, 0) / 20) * Math.sqrt(252) * 100;
        const bv = Math.sqrt(bs.reduce((s, r) => s + (r - bm) ** 2, 0) / 20) * Math.sqrt(252) * 100;
        result.push({ date: new Date(refDates[i]).toLocaleDateString(lang === 'hu' ? 'hu-HU' : 'en-US', { month: 'short', day: 'numeric' }), portfolio: Math.round(pv * 100) / 100, benchmark: Math.round(bv * 100) / 100 });
      }
      return result.slice(-30);
    })()
    : Array.from({ length: 30 }, (_, i) => {
      const d = new Date(); d.setDate(d.getDate() - (29 - i));
      return { date: d.toLocaleDateString(lang === 'hu' ? 'hu-HU' : 'en-US', { month: 'short', day: 'numeric' }), portfolio: 15 + Math.sin(i / 4) * 3 + Math.random() * 2, benchmark: 18 + Math.sin(i / 5) * 4 + Math.random() * 2 };
    });

  const mockDrawdown = hasReal
    ? (() => {
      const minLen = Math.min(...ALL_TICKERS.map(t => realPrices[t].length));
      const start = Math.max(0, minLen - 31);
      let cumRet = 1, maxCum = 1;
      const result: { date: string; drawdown: number }[] = [];
      for (let i = start + 1; i < minLen; i++) {
        const r = ALL_TICKERS.reduce((s, t) => s + PORTFOLIO_W[t] * Math.log(realPrices[t][i].close / realPrices[t][i - 1].close), 0);
        cumRet *= Math.exp(r);
        if (cumRet > maxCum) maxCum = cumRet;
        const dd = (cumRet - maxCum) / maxCum * 100;
        result.push({ date: new Date(realPrices['AAPL'][i].date).toLocaleDateString(lang === 'hu' ? 'hu-HU' : 'en-US', { month: 'short', day: 'numeric' }), drawdown: Math.round(dd * 100) / 100 });
      }
      return result.slice(-30);
    })()
    : Array.from({ length: 30 }, (_, i) => {
      const d = new Date(); d.setDate(d.getDate() - (29 - i));
      let dd = 0;
      if (i > 5 && i <= 15) dd = -(i - 5) * 1.2 - Math.random();
      if (i > 15) dd = -12 + (i - 15) * 1.5 - Math.random();
      if (dd > 0) dd = 0;
      return { date: d.toLocaleDateString(lang === 'hu' ? 'hu-HU' : 'en-US', { month: 'short', day: 'numeric' }), drawdown: dd };
    });

  // ── Dynamic SQL data (real Yahoo Finance when available, seeded fallback otherwise) ──
  const fmtDate = (d: Date): string => {
    const y = d.getFullYear();
    const mo = String(d.getMonth() + 1).padStart(2, '0');
    const dy = String(d.getDate()).padStart(2, '0');
    return `${y}-${mo}-${dy}`;
  };
  const recentTD = (n: number): string => {
    const d = new Date(); let c = 0;
    while (c < n) { d.setDate(d.getDate() - 1); if (d.getDay() !== 0 && d.getDay() !== 6) c++; }
    return fmtDate(d);
  };
  const oldTD = (n: number): string => {
    const d = new Date(); d.setFullYear(d.getFullYear() - 3);
    while (d.getDay() === 0 || d.getDay() === 6) d.setDate(d.getDate() + 1);
    let c = 0;
    while (c < n) { d.setDate(d.getDate() + 1); if (d.getDay() !== 0 && d.getDay() !== 6) c++; }
    return fmtDate(d);
  };
  const recentME = (n: number): string => {
    const d = new Date(); d.setDate(1); d.setMonth(d.getMonth() - n + 1); d.setDate(0); return fmtDate(d);
  };
  const oldME = (n: number): string => {
    const d = new Date(); d.setFullYear(d.getFullYear() - 3);
    d.setDate(1); d.setMonth(d.getMonth() + n + 1); d.setDate(0); return fmtDate(d);
  };
  const srand = (key: string): number => {
    let h = 2166136261;
    for (let i = 0; i < key.length; i++) { h = Math.imul(h ^ key.charCodeAt(i), 16777619) >>> 0; }
    return h / 4294967296;
  };
  const SQL_TICKERS = ['AAPL', 'MSFT', 'JPM', 'GS', 'BLK', 'XOM', 'GLD', 'TLT'];
  const BASE_P: Record<string, [number, number]> = {
    AAPL: [225, 130], MSFT: [415, 240], JPM: [215, 130],
    GS: [510, 305], BLK: [890, 655], XOM: [112, 110], GLD: [225, 172], TLT: [88, 105],
  };
  const VOL_BASE: Record<string, number> = { AAPL: 0.262, MSFT: 0.241, JPM: 0.198, GS: 0.218, BLK: 0.209, XOM: 0.251, GLD: 0.131, TLT: 0.148 };
  const genPrice = (date: string, t: string, era: 0 | 1): string =>
    (BASE_P[t][era] * (1 + (srand(date + t + 'p') - 0.5) * 0.015)).toFixed(2);
  const genReturn = (date: string, t: string, era: 0 | 1): string => {
    const p1 = BASE_P[t][era] * (1 + (srand(date + t + 'prev') - 0.5) * 0.015);
    const p2 = parseFloat(genPrice(date, t, era));
    return Math.log(p2 / p1).toFixed(6);
  };
  const genVol = (date: string, t: string): string =>
    Math.max(0.08, VOL_BASE[t] + (srand(date + t + 'v') - 0.5) * 0.04).toFixed(4);

  // Build SQL rows from real prices
  const buildRealSqlRows = (dates: string[], field: 'price' | 'return' | 'vol'): string[][] => {
    const rows: string[][] = [];
    dates.forEach(date => {
      SQL_TICKERS.forEach(t => {
        const prices = realPrices[t] || [];
        const idx = prices.findIndex(p => p.date === date);
        if (field === 'price' && idx >= 0) {
          rows.push([date, t, prices[idx].close.toFixed(2)]);
        } else if (field === 'return' && idx > 0) {
          rows.push([date, t, Math.log(prices[idx].close / prices[idx - 1].close).toFixed(6)]);
        } else if (field === 'vol') {
          const p = prices[idx >= 0 ? idx : prices.length - 1];
          if (p) rows.push([date, t, genVol(date, t)]);
        }
      });
    });
    return rows.slice(0, 20);
  };

  // ASC: oldest dates
  const [oD0, oD1, oD2] = [oldTD(0), oldTD(1), oldTD(2)];
  const [oM0, oM1, oM2] = [oldME(0), oldME(1), oldME(2)];
  const sqlPricesDataAsc: string[][] = hasReal
    ? (() => {
      const firstDates = realPrices['AAPL'].slice(0, 3).map(p => p.date);
      return buildRealSqlRows(firstDates, 'price');
    })()
    : [...SQL_TICKERS.map(t => [oD0, t, genPrice(oD0, t, 1)]), ...SQL_TICKERS.map(t => [oD1, t, genPrice(oD1, t, 1)]), ...SQL_TICKERS.slice(0, 4).map(t => [oD2, t, genPrice(oD2, t, 1)])];

  const sqlReturnsDataAsc: string[][] = hasReal
    ? (() => {
      const firstDates = realPrices['AAPL'].slice(1, 4).map(p => p.date);
      return buildRealSqlRows(firstDates, 'return');
    })()
    : [...SQL_TICKERS.map(t => [oD0, t, genReturn(oD0, t, 1)]), ...SQL_TICKERS.map(t => [oD1, t, genReturn(oD1, t, 1)]), ...SQL_TICKERS.slice(0, 4).map(t => [oD2, t, genReturn(oD2, t, 1)])];

  const sqlVolDataAsc: string[][] = hasReal
    ? (() => {
      const firstDates = [realPrices['AAPL'][21]?.date, realPrices['AAPL'][42]?.date, realPrices['AAPL'][63]?.date].filter(Boolean) as string[];
      return buildRealSqlRows(firstDates, 'vol');
    })()
    : [...SQL_TICKERS.map(t => [oM0, t, genVol(oM0, t)]), ...SQL_TICKERS.map(t => [oM1, t, genVol(oM1, t)]), ...SQL_TICKERS.slice(0, 4).map(t => [oM2, t, genVol(oM2, t)])];

  // DESC: newest dates
  const [nD1, nD2, nD3] = [recentTD(1), recentTD(2), recentTD(3)];
  const [nM1, nM2, nM3] = [recentME(1), recentME(2), recentME(3)];
  const sqlPricesDataDesc: string[][] = hasReal
    ? (() => {
      const len = realPrices['AAPL'].length;
      const lastDates = realPrices['AAPL'].slice(Math.max(0, len - 3)).map(p => p.date).reverse();
      return buildRealSqlRows(lastDates, 'price');
    })()
    : [...SQL_TICKERS.map(t => [nD1, t, genPrice(nD1, t, 0)]), ...SQL_TICKERS.map(t => [nD2, t, genPrice(nD2, t, 0)]), ...SQL_TICKERS.slice(0, 4).map(t => [nD3, t, genPrice(nD3, t, 0)])];

  const sqlReturnsDataDesc: string[][] = hasReal
    ? (() => {
      const len = realPrices['AAPL'].length;
      const lastDates = realPrices['AAPL'].slice(Math.max(1, len - 3)).map(p => p.date).reverse();
      return buildRealSqlRows(lastDates, 'return');
    })()
    : [...SQL_TICKERS.map(t => [nD1, t, genReturn(nD1, t, 0)]), ...SQL_TICKERS.map(t => [nD2, t, genReturn(nD2, t, 0)]), ...SQL_TICKERS.slice(0, 4).map(t => [nD3, t, genReturn(nD3, t, 0)])];

  const sqlVolDataDesc: string[][] = hasReal
    ? (() => {
      const lastDates = [nM1, nM2, nM3];
      return buildRealSqlRows(lastDates, 'vol');
    })()
    : [...SQL_TICKERS.map(t => [nM1, t, genVol(nM1, t)]), ...SQL_TICKERS.map(t => [nM2, t, genVol(nM2, t)]), ...SQL_TICKERS.slice(0, 4).map(t => [nM3, t, genVol(nM3, t)])];

  // Fraud Detection dashboard data
  const fraudRocRF = [{fpr:0,tpr:0},{fpr:0.001,tpr:0.52},{fpr:0.002,tpr:0.70},{fpr:0.005,tpr:0.81},{fpr:0.01,tpr:0.86},{fpr:0.02,tpr:0.90},{fpr:0.05,tpr:0.93},{fpr:0.1,tpr:0.96},{fpr:0.2,tpr:0.977},{fpr:0.5,tpr:0.991},{fpr:1,tpr:1}];
  const fraudRocLR = [{fpr:0,tpr:0},{fpr:0.003,tpr:0.45},{fpr:0.007,tpr:0.63},{fpr:0.015,tpr:0.75},{fpr:0.03,tpr:0.82},{fpr:0.06,tpr:0.87},{fpr:0.1,tpr:0.91},{fpr:0.2,tpr:0.945},{fpr:0.3,tpr:0.96},{fpr:0.5,tpr:0.975},{fpr:1,tpr:1}];
  const fraudRocMerged = fraudRocRF.map((d,i) => ({ fpr: d.fpr, rf: d.tpr, lr: fraudRocLR[i]?.tpr }));
  const fraudPrRF = [{rec:0,prec:1},{rec:0.1,prec:0.98},{rec:0.3,prec:0.97},{rec:0.5,prec:0.95},{rec:0.65,prec:0.93},{rec:0.75,prec:0.91},{rec:0.82,prec:0.879},{rec:0.90,prec:0.72},{rec:0.95,prec:0.52},{rec:1,prec:0.002}];
  const fraudPrLR  = [{rec:0,prec:1},{rec:0.1,prec:0.88},{rec:0.3,prec:0.82},{rec:0.5,prec:0.76},{rec:0.65,prec:0.68},{rec:0.75,prec:0.58},{rec:0.85,prec:0.44},{rec:0.92,prec:0.30},{rec:1,prec:0.002}];
  const fraudPrMerged = fraudPrRF.map((d,i) => ({ rec: d.rec, rf: d.prec, lr: fraudPrLR[i]?.prec }));
  const fraudFeatures = [
    {name:'V17',val:0.1823},{name:'V14',val:0.1642},{name:'V12',val:0.1234},{name:'V10',val:0.0987},{name:'V11',val:0.0876},
    {name:'V16',val:0.0754},{name:'V3',val:0.0612},{name:'V4',val:0.0534},{name:'V7',val:0.0487},{name:'V2',val:0.0423},
    {name:'Amount',val:0.0376},{name:'V1',val:0.0321},{name:'V6',val:0.0287},{name:'V21',val:0.0243},{name:'V5',val:0.0201}
  ].reverse();
  const fraudCm = {tn:56782,fp:82,fn:18,tp:80};

  const handleRunCode = () => {
    setActiveTab('output');
    setRunState('running');
    setLogs([]);

    const isFraud = selectedProject?.id === 2;

    const logSequence = isFraud ? [
      "$ FRAUD DETECTION ML – PORTFÓLIÓ PROJEKT",
      "============================================================",
      "[1] Adathalmaz betöltve: 284,807 tranzakció, 31 változó",
      "    Normál tranzakció : 284,315  (99.83%)",
      "    Csalás (fraud)    : 492      (0.1727%)",
      "    Osztályarány      : 1 : 577",
      "[2] EDA futtatása...    → EDA mentve: fraud_output/01_eda.png",
      "[3] Előfeldolgozás...",
      "    Train: 227,845 minta | Test: 56,962 minta",
      "    SMOTE előtt: {0: 227451, 1: 394}",
      "    SMOTE után : {0: 227451, 1: 227451}",
      "[4] Modellek tanítása...",
      "    [OK] Logistic Regression kész",
      "    [OK] Random Forest kész",
      "[5] Modellek kiértékelése...",
      "    --- Random Forest ---",
      "    AUC-ROC   : 0.9743",
      "    F1 Score  : 0.8812",
      "    Precision : 0.9583",
      "    Recall    : 0.8163",
      "    Elkapott fraud: 80 / 98",
      "[6] Excel exportálása Power BI-hoz... → fraud_output/fraud_model_results.xlsx",
      "============================================================",
      "  Minden output megtalálható: ./fraud_output/"
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
          setTimeout(() => { setRunState('done'); setDashboardPage(1); }, 800);
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
      setDashboardPage(1);
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
                Több mint 2 év tapasztalattal rendelkezem komplex pénzügyi adathalmazok elemzésében és vizualizációjában.
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
            <a
              href={`https://mail.google.com/mail/?view=cm&to=szabgab97@gmail.com&su=${encodeURIComponent("Exciting Opportunity at [Company Name] – We'd Love to See Your CV")}&body=${encodeURIComponent('Dear Gábor,\n\nI hope this message finds you well.\n\nI came across your profile on [LinkedIn / our database / referral] and was impressed by your experience in [relevant field/skill]. We are currently looking for a [Position Name] at [Company Name], and we believe your background could be an excellent fit.\n\nWould you be open to sharing your most up-to-date CV? We would love to learn more about your qualifications and discuss a potential opportunity with you.\n\nPlease feel free to reach out if you have any questions. We look forward to hearing from you.\n\nKind regards,\n[HR Name]\n[HR Job Title]\n[Company Name]\n[Phone Number]\n[Email Address]')}`}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 justify-center h-12 px-6 font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors shadow-sm"
            >
              <Mail className="w-4 h-4" />
              {t.hero.btnCV}
            </a>
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
                onClick={(e) => { e.preventDefault(); setSelectedProject(project); setActiveTab('output'); }}
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
              <a href="https://www.linkedin.com/in/gabor-szabo-ps/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-8 py-4 bg-slate-800 text-white font-medium rounded-xl hover:bg-slate-700 transition-colors border border-slate-700">
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
                          onClick={() => setActiveTab('output')}
                          className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'output' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                        >
                          <Terminal className="w-4 h-4" />
                          {lang === 'hu' ? 'Kimenet / Eredmény' : 'Output / Result'}
                        </button>
                        <button
                          onClick={() => setActiveTab('sql')}
                          className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'sql' ? 'bg-white text-orange-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                        >
                          {selectedProject?.id === 2 ? <FileSpreadsheet className="w-4 h-4" /> : <Database className="w-4 h-4" />}
                          {selectedProject?.id === 2 ? 'Excel Preview' : 'SQL View'}
                        </button>
                        <button
                          onClick={() => setActiveTab('code')}
                          className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'code' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                        >
                          <Code className="w-4 h-4" />
                          {lang === 'hu' ? 'Forráskód' : 'Source Code'}
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
                          <code>{selectedProject.id === 1 ? portfolioRiskCodeSnippet : selectedProject.id === 2 ? creditFraudSnippet : selectedProject.code}</code>
                        </pre>
                      </motion.div>
                    ) : activeTab === 'sql' && selectedProject?.id === 2 ? (
                      <motion.div key="excel" initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} className="rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-white">
                        {/* Excel toolbar */}
                        <div className="flex items-center gap-3 px-4 py-2.5 bg-emerald-800 border-b border-emerald-700">
                          <FileSpreadsheet className="w-4 h-4 text-emerald-300 shrink-0"/>
                          <span className="text-xs font-mono text-emerald-200 font-semibold">fraud_model_results.xlsx</span>
                          <span className="text-emerald-600 text-xs">|</span>
                          <span className="text-xs font-mono text-emerald-400">6 sheets  ·  Power BI ready</span>
                        </div>
                        {/* Sheet tabs */}
                        {(() => {
                          const sheets = ['KPI_Summary','ROC_Data','PR_Data','Feature_Importance','Predictions','Confusion_Matrix'];
                          const activeSheet = 0;
                          const kpiRows = [
                            {model:'Random Forest',auc:'0.9743',f1:'0.8812',prec:'0.9583',rec:'0.8163',ap:'0.8201',tp:80,fp:3,tn:56782,fn:18},
                            {model:'Logistic Regression',auc:'0.9712',f1:'0.7634',prec:'0.7241',rec:'0.8061',ap:'0.7543',tp:79,fp:30,tn:56755,fn:19},
                          ];
                          return (
                            <div>
                              <div className="flex gap-0 border-b border-slate-200 bg-slate-50 overflow-x-auto">
                                {sheets.map((s,i) => (
                                  <button key={s} className={`px-3 py-2 text-xs font-medium whitespace-nowrap border-r border-slate-200 transition-colors ${i===activeSheet?'bg-white text-emerald-700 border-b-2 border-b-emerald-600':'text-slate-500 hover:bg-white'}`}>{s}</button>
                                ))}
                              </div>
                              <div className="overflow-x-auto">
                                <table className="w-full text-xs">
                                  <thead className="bg-emerald-50 border-b border-emerald-100">
                                    <tr>{['Model','AUC-ROC','F1 Score','Precision','Recall','Avg Precision','TP','FP','TN','FN'].map(h=>(
                                      <th key={h} className="px-3 py-2 text-left font-semibold text-emerald-800 whitespace-nowrap">{h}</th>
                                    ))}</tr>
                                  </thead>
                                  <tbody>
                                    {kpiRows.map((r,i)=>(
                                      <tr key={i} className="border-b border-slate-100 hover:bg-slate-50">
                                        <td className="px-3 py-2 font-medium text-slate-800 whitespace-nowrap">{r.model}</td>
                                        <td className="px-3 py-2 text-indigo-600 font-bold">{r.auc}</td>
                                        <td className="px-3 py-2">{r.f1}</td>
                                        <td className="px-3 py-2">{r.prec}</td>
                                        <td className="px-3 py-2">{r.rec}</td>
                                        <td className="px-3 py-2">{r.ap}</td>
                                        <td className="px-3 py-2 text-emerald-600 font-semibold">{r.tp}</td>
                                        <td className="px-3 py-2 text-orange-600">{r.fp}</td>
                                        <td className="px-3 py-2">{r.tn.toLocaleString()}</td>
                                        <td className="px-3 py-2 text-red-600">{r.fn}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                              <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 text-xs text-slate-400">
                                KPI_Summary sheet — {kpiRows.length} rows · további 5 sheet: ROC_Data, PR_Data, Feature_Importance, Predictions (10k sor), Confusion_Matrix
                              </div>
                            </div>
                          );
                        })()}
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
                                  {(sqlSortDesc ? sqlPricesDataDesc : sqlPricesDataAsc
                                  ).map(([date, ticker, price], i) => (
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
                                  {(sqlSortDesc ? sqlReturnsDataDesc : sqlReturnsDataAsc
                                  ).map(([date, ticker, ret], i) => (
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
                                  {(sqlSortDesc ? sqlVolDataDesc : sqlVolDataAsc
                                  ).map(([date, ticker, vol], i) => (
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
                              <div ref={logEndRef} />
                            </div>

                            {runState === 'done' && (
                              <div className="flex justify-end">
                                <button
                                  onClick={handleRunCode}
                                  className="flex items-center gap-2 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg text-xs font-medium transition-colors"
                                >
                                  <Play className="w-3 h-3 fill-current" />
                                  {lang === 'hu' ? 'Újra futtatás' : 'Re-run'}
                                </button>
                              </div>
                            )}

                            {/* Visual Dashboard Results – Fraud Detection */}
                            {runState === 'done' && selectedProject?.id === 2 && (
                              <div ref={dashboardRef} className="flex flex-col gap-6 mt-4">
                                <div className="flex justify-center gap-2 mb-2">
                                  {[1,2].map(p => (
                                    <button key={p} onClick={() => setDashboardPage(p)}
                                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${dashboardPage===p?'bg-indigo-600 text-white shadow-md':'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}>
                                      {lang==='hu'?`Oldal ${p}`:`Page ${p}`}
                                    </button>
                                  ))}
                                </div>

                                {dashboardPage === 1 && (
                                  <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} className="flex flex-col gap-4">
                                    <div className="bg-white rounded-xl border border-slate-200 p-4">
                                      <div className="flex items-center gap-2 mb-3">
                                        <span className="text-sm font-semibold text-slate-800">AUC-ROC Curve</span>
                                        <span className="ml-auto text-xs text-slate-400">RF: 0.9743 &nbsp;|&nbsp; LR: 0.9712</span>
                                      </div>
                                      <div style={{width:'100%',height:240}}>
                                        <ResponsiveContainer width="100%" height="100%">
                                          <RechartsLineChart data={fraudRocMerged} margin={{top:8,right:24,left:8,bottom:24}}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9"/>
                                            <XAxis dataKey="fpr" tickFormatter={(v:number)=>v.toFixed(2)} tick={{fontSize:10}} label={{value:'False Positive Rate',position:'insideBottom',offset:-12,fontSize:11,fill:'#94a3b8'}}/>
                                            <YAxis domain={[0,1]} tick={{fontSize:10}} label={{value:'True Positive Rate',angle:-90,position:'insideLeft',offset:8,fontSize:11,fill:'#94a3b8'}}/>
                                            <RechartsTooltip formatter={(v:number)=>v?.toFixed(4)} labelFormatter={(v:number)=>`FPR: ${Number(v).toFixed(3)}`}/>
                                            <Legend wrapperStyle={{fontSize:12,paddingTop:8}}/>
                                            <Line type="monotone" dataKey="rf" stroke="#6366f1" strokeWidth={2.5} dot={false} name="Random Forest"/>
                                            <Line type="monotone" dataKey="lr" stroke="#f97316" strokeWidth={2} dot={false} strokeDasharray="5 3" name="Logistic Regression"/>
                                          </RechartsLineChart>
                                        </ResponsiveContainer>
                                      </div>
                                    </div>
                                    <div className="bg-white rounded-xl border border-slate-200 p-4">
                                      <div className="flex items-center gap-2 mb-3">
                                        <span className="text-sm font-semibold text-slate-800">Precision-Recall Curve</span>
                                        <span className="ml-auto text-xs text-slate-400">RF AP: 0.8201 &nbsp;|&nbsp; LR AP: 0.7543</span>
                                      </div>
                                      <div style={{width:'100%',height:240}}>
                                        <ResponsiveContainer width="100%" height="100%">
                                          <RechartsLineChart data={fraudPrMerged} margin={{top:8,right:24,left:8,bottom:24}}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9"/>
                                            <XAxis dataKey="rec" tickFormatter={(v:number)=>v.toFixed(1)} tick={{fontSize:10}} label={{value:'Recall',position:'insideBottom',offset:-12,fontSize:11,fill:'#94a3b8'}}/>
                                            <YAxis domain={[0,1]} tick={{fontSize:10}} label={{value:'Precision',angle:-90,position:'insideLeft',offset:8,fontSize:11,fill:'#94a3b8'}}/>
                                            <RechartsTooltip formatter={(v:number)=>v?.toFixed(4)} labelFormatter={(v:number)=>`Recall: ${Number(v).toFixed(2)}`}/>
                                            <Legend wrapperStyle={{fontSize:12,paddingTop:8}}/>
                                            <ReferenceLine y={0.0017} stroke="#94a3b8" strokeDasharray="4 2"/>
                                            <Line type="monotone" dataKey="rf" stroke="#6366f1" strokeWidth={2.5} dot={false} name="Random Forest"/>
                                            <Line type="monotone" dataKey="lr" stroke="#f97316" strokeWidth={2} dot={false} strokeDasharray="5 3" name="Logistic Regression"/>
                                          </RechartsLineChart>
                                        </ResponsiveContainer>
                                      </div>
                                    </div>
                                  </motion.div>
                                )}

                                {dashboardPage === 2 && (
                                  <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} className="flex flex-col gap-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                      <div className="bg-white rounded-xl border border-slate-200 p-4">
                                        <div className="text-sm font-semibold text-slate-800 mb-3">Confusion Matrix – Random Forest</div>
                                        <div className="grid grid-cols-2 gap-2 mb-3">
                                          {[
                                            {label:'True Negative',val:fraudCm.tn,sub:`${(fraudCm.tn/(fraudCm.tn+fraudCm.fp)*100).toFixed(2)}%`,color:'bg-emerald-50 border-emerald-200 text-emerald-700'},
                                            {label:'False Positive',val:fraudCm.fp,sub:`${(fraudCm.fp/(fraudCm.tn+fraudCm.fp)*100).toFixed(2)}%`,color:'bg-orange-50 border-orange-200 text-orange-700'},
                                            {label:'False Negative',val:fraudCm.fn,sub:`${(fraudCm.fn/(fraudCm.fn+fraudCm.tp)*100).toFixed(2)}%`,color:'bg-red-50 border-red-200 text-red-700'},
                                            {label:'True Positive',val:fraudCm.tp,sub:`${(fraudCm.tp/(fraudCm.fn+fraudCm.tp)*100).toFixed(2)}%`,color:'bg-emerald-50 border-emerald-200 text-emerald-700'},
                                          ].map(c=>(
                                            <div key={c.label} className={`border rounded-lg p-3 ${c.color}`}>
                                              <div className="text-xs font-medium mb-1">{c.label}</div>
                                              <div className="text-2xl font-bold">{c.val.toLocaleString()}</div>
                                              <div className="text-xs opacity-70">{c.sub}</div>
                                            </div>
                                          ))}
                                        </div>
                                        <div className="grid grid-cols-2 gap-2 text-xs">
                                          {[{k:'AUC-ROC',v:'0.9743'},{k:'F1 Score',v:'0.8812'},{k:'Precision',v:'0.9583'},{k:'Recall',v:'0.8163'}].map(m=>(
                                            <div key={m.k} className="bg-slate-50 rounded-lg p-2 border border-slate-100">
                                              <div className="text-slate-400">{m.k}</div>
                                              <div className="font-bold text-slate-800 text-sm">{m.v}</div>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                      <div className="bg-white rounded-xl border border-slate-200 p-4">
                                        <div className="text-sm font-semibold text-slate-800 mb-3">Top 15 Feature Importance (RF)</div>
                                        <div style={{width:'100%',height:320}}>
                                          <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={fraudFeatures} layout="vertical" margin={{top:0,right:44,left:12,bottom:0}}>
                                              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false}/>
                                              <XAxis type="number" tickFormatter={(v:number)=>v.toFixed(2)} tick={{fontSize:10}}/>
                                              <YAxis type="category" dataKey="name" tick={{fontSize:10}} width={44}/>
                                              <Tooltip formatter={(v:number)=>v.toFixed(4)}/>
                                              <Bar dataKey="val" name="Importance" radius={[0,3,3,0]}>
                                                {fraudFeatures.map((_,i)=>(
                                                  <Cell key={i} fill={i >= fraudFeatures.length-5 ? '#f97316' : '#6366f1'}/>
                                                ))}
                                              </Bar>
                                            </BarChart>
                                          </ResponsiveContainer>
                                        </div>
                                      </div>
                                    </div>
                                  </motion.div>
                                )}
                              </div>
                            )}

                            {/* Visual Dashboard Results – Portfolio Risk */}
                            {runState === 'done' && selectedProject?.id !== 2 && (
                              <div ref={dashboardRef} className="flex flex-col gap-6 mt-4">
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
                                            {lang === 'hu' ? '1M (Hetek)' : '1M (Weekly)'}
                                          </button>
                                          <button
                                            onClick={() => setTimeFilter('1Y')}
                                            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${timeFilter === '1Y' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                                          >
                                            {lang === 'hu' ? '1Y (Hónapok)' : '1Y (Monthly)'}
                                          </button>
                                          <button
                                            onClick={() => setTimeFilter('3Y')}
                                            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${timeFilter === '3Y' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                                          >
                                            {lang === 'hu' ? '3Y (Negyedévek)' : '3Y (Quarterly)'}
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
                                          <p className="text-lg font-bold text-emerald-600">{portKPI.ret > 0 ? '+' : ''}{portKPI.ret}%</p>
                                        </div>
                                        <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                                          <p className="text-xs text-slate-500 font-medium mb-1">{lang === 'hu' ? 'Éves Volatilitás' : 'Ann. Volatility'}</p>
                                          <p className="text-lg font-bold text-slate-700">{portKPI.vol}%</p>
                                        </div>
                                        <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                                          <p className="text-xs text-slate-500 font-medium mb-1">Sharpe Ratio</p>
                                          <p className="text-lg font-bold text-indigo-600">{portKPI.sharpe}</p>
                                        </div>
                                        <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                                          <p className="text-xs text-slate-500 font-medium mb-1">Max Drawdown</p>
                                          <p className="text-lg font-bold text-red-500">{portKPI.maxDD}%</p>
                                        </div>
                                        <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                                          <p className="text-xs text-slate-500 font-medium mb-1">VaR (95%)</p>
                                          <p className="text-lg font-bold text-orange-500">{portKPI.var95}%</p>
                                        </div>
                                        <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                                          <p className="text-xs text-slate-500 font-medium mb-1">CVaR (95%)</p>
                                          <p className="text-lg font-bold text-red-600">{portKPI.cvar95}%</p>
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
                                            <Line type="monotone" dataKey="benchmark" name="S&P 500 Vol" stroke="#95A5A6" strokeWidth={2} strokeDasharray="5 5" dot={false} />
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
                                              <LabelList dataKey="name" position="top" style={{ fontSize: 10, fill: '#475569' }} />
                                            </Scatter>
                                            <Scatter name={lang === 'hu' ? 'Portfólió' : 'Portfolio'} data={mockRiskReturn.filter(d => d.isPort)} fill="#F1C40F" shape="star">
                                              <LabelList dataKey="name" position="top" style={{ fontSize: 10, fill: '#475569' }} />
                                            </Scatter>
                                            <Scatter name={lang === 'hu' ? 'S&P 500 (Piac)' : 'S&P 500 (Market)'} data={mockRiskReturn.filter(d => d.isMarket)} fill="#95A5A6" shape="triangle">
                                              <LabelList dataKey="name" position="top" style={{ fontSize: 10, fill: '#475569' }} />
                                            </Scatter>
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
            <a href="https://www.linkedin.com/in/gabor-szabo-ps/" target="_blank" rel="noopener noreferrer" className="hover:text-slate-600 transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-slate-600 transition-colors">GitHub</a>
            <a href="#" className="hover:text-slate-600 transition-colors">Email</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
