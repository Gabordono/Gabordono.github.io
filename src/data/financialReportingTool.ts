export const financialReportCode = `# ═══════════════════════════════════════════════════════════════
# Automated Financial Reporting Tool  |  main.py
# ═══════════════════════════════════════════════════════════════
"""
Supports three data modes:
  1. Live Yahoo Finance:  python main.py --ticker AAPL
  2. Local CSV:           python main.py --input transactions.csv
  3. Synthetic sample:   python main.py
Outputs:
  <PREFIX>_Financial_Report.xlsx  – multi-sheet Excel workbook
  <PREFIX>_Financial_Report.pdf   – executive PDF with charts
"""
import argparse, sys, time
from pathlib import Path
import pandas as pd
from analysis import kpi_snapshot
from excel_report import build_excel
from pdf_report import build_pdf

REQUIRED_COLS = {"date","category","type","actual_amount","budget_amount"}

def _load_csv(path):
    df = pd.read_csv(path, parse_dates=["date"])
    missing = REQUIRED_COLS - set(df.columns)
    if missing:
        sys.exit(f"Missing required columns: {missing}")
    df["actual_amount"] = pd.to_numeric(df["actual_amount"],errors="coerce").fillna(0)
    df["budget_amount"] = pd.to_numeric(df["budget_amount"],errors="coerce").fillna(0)
    df["month"]      = df["date"].dt.month
    df["month_name"] = df["date"].dt.strftime("%b")
    df["year"]       = df["date"].dt.year
    for col, default in [("department","Unknown"),("cost_center","N/A"),
                          ("status","Posted"),("currency","USD")]:
        if col not in df.columns:
            df[col] = default
    meta = {"ticker":"CSV","company":Path(path).stem,"currency":"USD",
            "sector":"N/A","industry":"N/A",
            "fetched_at":pd.Timestamp.now().strftime("%Y-%m-%d %H:%M"),
            "source":f"CSV: {path}"}
    print(f"  Loaded {len(df):,} transactions from {path}")
    return df, meta

def _load_yahoo(ticker, quarters):
    from data_sources.yahoo_finance import fetch_yahoo
    return fetch_yahoo(ticker, quarters=quarters, verbose=True)

def _load_synthetic(year):
    from generate_data import build_transactions
    df = build_transactions(year=year)
    meta = {"ticker":"SAMPLE","company":"Acme Corp (Sample Data)",
            "currency":"USD","sector":"Technology","industry":"Software",
            "fetched_at":pd.Timestamp.now().strftime("%Y-%m-%d %H:%M"),
            "source":"Synthetic sample data"}
    return df, meta

def _try_macro():
    try:
        from data_sources.fred import fetch_macro_context
        print("  Fetching macro context from FRED...")
        return fetch_macro_context()
    except Exception:
        return {"available": False}

def _print_summary(kpi, meta):
    print("\\n" + "="*58)
    print(f"  {meta['company']}  ({meta['ticker']})")
    print("="*58)
    print(f"  Revenue   : \${kpi['Revenue_Actual']:>16,.0f}  ({kpi['Revenue_Var_Pct']:+.1%} vs budget)")
    print(f"  Costs     : \${kpi['TotalCost_Actual']:>16,.0f}  ({kpi['Cost_Var_Pct']:+.1%} vs budget)")
    print(f"  Net Income: \${kpi['NetIncome_Actual']:>16,.0f}  ({kpi['NI_Var_Pct']:+.1%} vs budget)")
    print(f"  GP Margin : {kpi['GP_Margin']:>17.1%}")
    print(f"  EBITDA Mgn: {kpi['EBITDA_Margin']:>17.1%}")
    print(f"  Best Month: {kpi['Best_Month']:>17}")
    print("="*58 + "\\n")

def main():
    parser = argparse.ArgumentParser(description="Automated Financial Reporting Tool")
    src = parser.add_mutually_exclusive_group()
    src.add_argument("--ticker", type=str, metavar="SYMBOL")
    src.add_argument("--input", type=str, metavar="FILE.csv")
    parser.add_argument("--quarters",   type=int, default=8)
    parser.add_argument("--year",       type=int, default=2024)
    parser.add_argument("--output-dir", type=str, default=".")
    parser.add_argument("--prefix",     type=str, default=None)
    parser.add_argument("--excel-only", action="store_true")
    parser.add_argument("--pdf-only",   action="store_true")
    parser.add_argument("--no-macro",   action="store_true")
    args = parser.parse_args()

    output_dir = Path(args.output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)

    t0 = time.time()
    print("\\n Automated Financial Reporting Tool")
    print("-" * 45)

    if args.ticker:
        df, meta = _load_yahoo(args.ticker, args.quarters)
    elif args.input:
        df, meta = _load_csv(args.input)
    else:
        print(f"  Generating synthetic sample data for FY{args.year}...")
        df, meta = _load_synthetic(args.year)
        print(f"  {len(df):,} transactions generated")

    macro_ctx = {} if args.no_macro else _try_macro()
    kpi = kpi_snapshot(df)
    _print_summary(kpi, meta)

    prefix     = args.prefix or meta["ticker"].replace("/", "-")
    excel_path = output_dir / f"{prefix}_Financial_Report.xlsx"
    pdf_path   = output_dir / f"{prefix}_Financial_Report.pdf"

    if not args.pdf_only:
        print("  Building Excel report...")
        build_excel(df, str(excel_path), meta=meta)

    if not args.excel_only:
        print("  Building PDF report...")
        build_pdf(df, str(pdf_path), meta=meta, macro_ctx=macro_ctx)

    elapsed = time.time() - t0
    print(f"\\nDone in {elapsed:.1f}s")
    if not args.pdf_only:   print(f"   Excel → {excel_path}")
    if not args.excel_only: print(f"   PDF   → {pdf_path}")
    print()

if __name__ == "__main__":
    main()


# ═══════════════════════════════════════════════════════════════
# analysis.py  –  Financial variance analysis engine
# ═══════════════════════════════════════════════════════════════
import pandas as pd
import numpy as np

def variance(actual, budget):
    return actual - budget

def variance_pct(actual, budget):
    return (actual - budget) / budget if budget != 0 else np.nan

def flag(actual, budget, cat_type, threshold=0.05):
    pct = variance_pct(actual, budget)
    if pd.isna(pct): return "—"
    if cat_type == "income":
        if pct >= threshold:  return "✅ Favorable"
        if pct >= -threshold: return "🟡 On Target"
        return "🔴 Unfavorable"
    else:
        if pct <= -threshold: return "✅ Favorable"
        if pct <= threshold:  return "🟡 On Target"
        return "🔴 Unfavorable"

def monthly_summary(df):
    grp = df.groupby(["month","month_name","type"])[
        ["actual_amount","budget_amount"]].sum().reset_index()
    income  = grp[grp["type"]=="income"].set_index("month")[
        ["month_name","actual_amount","budget_amount"]]
    expense = grp[grp["type"]=="expense"].set_index("month")[
        ["actual_amount","budget_amount"]]
    records = []
    for m in sorted(df["month"].unique()):
        ra = income.loc[m,"actual_amount"] if m in income.index else 0.0
        rb = income.loc[m,"budget_amount"] if m in income.index else 0.0
        ca = expense.loc[m,"actual_amount"] if m in expense.index else 0.0
        cb = expense.loc[m,"budget_amount"] if m in expense.index else 0.0
        mn = income.loc[m,"month_name"]    if m in income.index else f"M{m}"
        cogs_actual = df[(df["month"]==m)&(df["category"]=="COGS")]["actual_amount"].sum()
        cogs_budget = df[(df["month"]==m)&(df["category"]=="COGS")]["budget_amount"].sum()
        dep_actual  = df[(df["month"]==m)&(df["category"]=="Depreciation")]["actual_amount"].sum()
        gp_a = ra - cogs_actual; gp_b = rb - cogs_budget
        ebitda_a = ra - ca + dep_actual
        ni_a = ra - ca;  ni_b = rb - cb
        records.append({
            "Month": m, "Month_Name": mn,
            "Revenue_Actual": ra,  "Revenue_Budget": rb,
            "Revenue_Var_Pct": variance_pct(ra, rb),
            "TotalCost_Actual": ca,"TotalCost_Budget": cb,
            "GrossProfit_Actual": gp_a, "GrossProfit_Budget": gp_b,
            "GP_Margin_Actual": gp_a/ra if ra else np.nan,
            "EBITDA_Actual": ebitda_a,
            "EBITDA_Margin_Actual": ebitda_a/ra if ra else np.nan,
            "NetIncome_Actual": ni_a, "NetIncome_Budget": ni_b,
            "NI_Variance": variance(ni_a, ni_b),
            "NI_Var_Pct": variance_pct(ni_a, ni_b),
        })
    return pd.DataFrame(records)

def kpi_snapshot(df):
    ms = monthly_summary(df)
    total_rev_a = ms["Revenue_Actual"].sum()
    total_rev_b = ms["Revenue_Budget"].sum()
    total_cost_a= ms["TotalCost_Actual"].sum()
    total_cost_b= ms["TotalCost_Budget"].sum()
    ni_a = total_rev_a - total_cost_a
    ni_b = total_rev_b - total_cost_b
    return {
        "Revenue_Actual": total_rev_a, "Revenue_Budget": total_rev_b,
        "Revenue_Var": variance(total_rev_a,total_rev_b),
        "Revenue_Var_Pct": variance_pct(total_rev_a,total_rev_b),
        "TotalCost_Actual": total_cost_a,"TotalCost_Budget": total_cost_b,
        "NetIncome_Actual": ni_a, "NetIncome_Budget": ni_b,
        "NI_Var": variance(ni_a,ni_b),
        "NI_Var_Pct": variance_pct(ni_a,ni_b),
        "GP_Margin": ms["GrossProfit_Actual"].sum()/total_rev_a,
        "EBITDA_Margin": ms["EBITDA_Actual"].sum()/total_rev_a,
        "Best_Month": ms.loc[ms["Revenue_Actual"].idxmax(),"Month_Name"],
        "Worst_Month": ms.loc[ms["Revenue_Actual"].idxmin(),"Month_Name"],
        "Avg_Monthly_Revenue": ms["Revenue_Actual"].mean(),
    }


# ═══════════════════════════════════════════════════════════════
# generate_data.py  –  Synthetic transaction generator
# ═══════════════════════════════════════════════════════════════
import pandas as pd
import numpy as np
from datetime import date

np.random.seed(42)

CATEGORIES = {
    "Revenue":       {"budget_base": 850_000, "volatility": 0.08,  "type": "income"},
    "COGS":          {"budget_base": 340_000, "volatility": 0.06,  "type": "expense"},
    "Salaries":      {"budget_base": 210_000, "volatility": 0.02,  "type": "expense"},
    "Marketing":     {"budget_base":  75_000, "volatility": 0.18,  "type": "expense"},
    "Operations":    {"budget_base":  55_000, "volatility": 0.12,  "type": "expense"},
    "R&D":           {"budget_base":  40_000, "volatility": 0.15,  "type": "expense"},
    "Admin & Legal": {"budget_base":  22_000, "volatility": 0.09,  "type": "expense"},
    "Depreciation":  {"budget_base":  18_000, "volatility": 0.01,  "type": "expense"},
}
DEPARTMENTS  = ["Finance","Sales","Technology","Operations","HR"]
COST_CENTERS = ["CC-101","CC-202","CC-303","CC-404","CC-505"]

def seasonal_factor(month, category):
    if category == "Revenue":
        factors = [0.82,0.85,0.93,0.97,1.02,1.06,0.95,0.90,1.05,1.10,1.18,1.38]
    elif category == "Marketing":
        factors = [0.75,0.80,0.95,1.10,1.15,1.00,0.85,0.90,1.10,1.20,1.30,1.40]
    else:
        factors = [1.0]*12
    return factors[month-1]

def build_transactions(year=2024):
    rows = []; txn_id = 1000
    for month in range(1,13):
        month_date = date(year, month, 1)
        for cat, cfg in CATEGORIES.items():
            sf     = seasonal_factor(month, cat)
            budget = cfg["budget_base"] * sf
            noise  = np.random.normal(0, cfg["volatility"] * budget)
            actual = max(budget + noise, 0)
            n_txn  = np.random.randint(3, 9)
            for i in range(n_txn):
                rows.append({
                    "transaction_id": f"TXN-{txn_id:05d}",
                    "date":       date(year, month, np.random.randint(1,28)),
                    "month":      month,
                    "month_name": month_date.strftime("%b"),
                    "category":   cat,
                    "type":       cfg["type"],
                    "department": np.random.choice(DEPARTMENTS),
                    "cost_center":np.random.choice(COST_CENTERS),
                    "actual_amount": round(actual/n_txn, 2),
                    "budget_amount": round(budget/n_txn, 2),
                    "currency":   "USD",
                    "status":     "Posted",
                })
                txn_id += 1
    return pd.DataFrame(rows).sort_values(["date","category"]).reset_index(drop=True)

if __name__ == "__main__":
    df = build_transactions()
    df.to_csv("transactions_raw.csv", index=False)
    print(f"Generated {len(df):,} transactions → transactions_raw.csv")
`;

export const financialReportSnippet = `# analysis.py – Financial variance analysis engine
import pandas as pd
import numpy as np

def variance_pct(actual, budget):
    return (actual - budget) / budget if budget != 0 else np.nan

def flag(actual, budget, cat_type, threshold=0.05):
    pct = variance_pct(actual, budget)
    if pd.isna(pct): return "—"
    if cat_type == "income":
        return "✅ Favorable" if pct >= threshold else ("🟡 On Target" if pct >= -threshold else "🔴 Unfavorable")
    return "✅ Favorable" if pct <= -threshold else ("🟡 On Target" if pct <= threshold else "🔴 Unfavorable")

def monthly_summary(df):
    grp = df.groupby(["month","month_name","type"])[
        ["actual_amount","budget_amount"]].sum().reset_index()
    records = []
    for m in sorted(df["month"].unique()):
        income  = grp[(grp["month"]==m)&(grp["type"]=="income")]
        expense = grp[(grp["month"]==m)&(grp["type"]=="expense")]
        ra = float(income["actual_amount"].sum())
        rb = float(income["budget_amount"].sum())
        ca = float(expense["actual_amount"].sum())
        cb = float(expense["budget_amount"].sum())
        cogs_a = df[(df["month"]==m)&(df["category"]=="COGS")]["actual_amount"].sum()
        dep_a  = df[(df["month"]==m)&(df["category"]=="Depreciation")]["actual_amount"].sum()
        records.append({
            "Month_Name":       df[df["month"]==m]["month_name"].iloc[0],
            "Revenue_Actual":   ra, "Revenue_Budget":   rb,
            "Revenue_Var_Pct":  variance_pct(ra, rb),
            "TotalCost_Actual": ca, "TotalCost_Budget": cb,
            "GP_Margin_Actual": (ra-cogs_a)/ra if ra else np.nan,
            "EBITDA_Actual":    ra - ca + dep_a,
            "NetIncome_Actual": ra - ca,
            "NetIncome_Budget": rb - cb,
            "NI_Variance":      (ra-ca) - (rb-cb),
            "NI_Var_Pct":       variance_pct(ra-ca, rb-cb),
        })
    return pd.DataFrame(records)

def kpi_snapshot(df):
    ms = monthly_summary(df)
    rev_a  = ms["Revenue_Actual"].sum()
    rev_b  = ms["Revenue_Budget"].sum()
    cost_a = ms["TotalCost_Actual"].sum()
    ni_a   = rev_a - cost_a
    ni_b   = ms["NetIncome_Budget"].sum()
    return {
        "Revenue_Actual":  rev_a,  "Revenue_Budget":  rev_b,
        "Revenue_Var_Pct": variance_pct(rev_a, rev_b),
        "NetIncome_Actual":ni_a,   "NetIncome_Budget":ni_b,
        "NI_Var_Pct":      variance_pct(ni_a, ni_b),
        "GP_Margin":       ms["GP_Margin_Actual"].mean(),
        "EBITDA_Margin":   ms["EBITDA_Actual"].sum()/rev_a,
        "Best_Month":      ms.loc[ms["Revenue_Actual"].idxmax(),"Month_Name"],
        "Worst_Month":     ms.loc[ms["Revenue_Actual"].idxmin(),"Month_Name"],
    }
`;
