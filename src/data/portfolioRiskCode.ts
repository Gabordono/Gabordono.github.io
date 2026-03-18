export const portfolioRiskCode = String.raw`# =============================================================================
#   PORTFOLIO RISK MANAGEMENT DASHBOARD
#   Volatility | Returns | Sharpe Ratio | Diversification
#   Google Colab verzió – .py formátum
# =============================================================================
#   Futtatás: Google Colab → File → Upload → portfolio_risk_colab.py
#             majd: !python portfolio_risk_colab.py
# =============================================================================

# ── CELL 1: Csomagok telepítése ───────────────────────────────────────────────
import subprocess
subprocess.run(["pip", "install", "yfinance", "pandas", "numpy",
                "matplotlib", "seaborn", "scipy", "openpyxl", "-q"])

# ── CELL 2: Import-ok ─────────────────────────────────────────────────────────
import sqlite3
import warnings
import os

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import matplotlib.gridspec as gridspec
import matplotlib.ticker as mticker
import seaborn as sns
import yfinance as yf

from scipy.stats import norm
from datetime import datetime, timedelta

try:
    from google.colab import files
    IN_COLAB = True
except ImportError:
    IN_COLAB = False

warnings.filterwarnings("ignore")
plt.switch_backend("Agg" if not IN_COLAB else "inline")

print("  Imports OK")


# ── CELL 3: CONFIGURATION ─────────────────────────────────────────────────────
PORTFOLIO = {
    "AAPL":  0.20,   # Apple
    "MSFT":  0.20,   # Microsoft
    "JPM":   0.15,   # JPMorgan Chase
    "GS":    0.10,   # Goldman Sachs
    "BLK":   0.10,   # BlackRock
    "XOM":   0.10,   # ExxonMobil
    "GLD":   0.10,   # Gold ETF
    "TLT":   0.05,   # Long-Term Treasury ETF
}

START_DATE  = (datetime.today() - timedelta(days=3 * 365)).strftime("%Y-%m-%d")
END_DATE    = datetime.today().strftime("%Y-%m-%d")
RISK_FREE   = 0.0525   # ~5.25% US Fed Funds Rate

DB_PATH     = "/content/portfolio_risk.db"
EXPORT_PATH = "/content/powerbi_export.xlsx"

TICKERS = list(PORTFOLIO.keys())
WEIGHTS = np.array(list(PORTFOLIO.values()))

assert abs(sum(WEIGHTS) - 1.0) < 1e-6, " A súlyok összege nem 1.0!"
print(f"  Portfólió betöltve: {TICKERS}")
print(f"   Időszak: {START_DATE} → {END_DATE}")
print(f"   Kockázatmentes ráta: {RISK_FREE*100:.2f}%")


# ── CELL 4: Színséma ──────────────────────────────────────────────────────────
COLORS = {
    "primary": "#0A1628",
    "accent":  "#1E3A5F",
    "gold":    "#C9A84C",
    "teal":    "#2CA6A4",
    "danger":  "#E05A4E",
    "success": "#4CAF7D",
    "light":   "#ECF0F1",
    "muted":   "#7F8C8D",
    "bg":      "#0D1B2A",
}

plt.rcParams.update({
    "figure.facecolor": COLORS["bg"],
    "axes.facecolor":   COLORS["primary"],
    "axes.edgecolor":   COLORS["accent"],
    "axes.labelcolor":  COLORS["light"],
    "xtick.color":      COLORS["muted"],
    "ytick.color":      COLORS["muted"],
    "text.color":       COLORS["light"],
    "grid.color":       COLORS["accent"],
    "grid.linestyle":   "--",
    "grid.alpha":       0.4,
    "font.family":      "monospace",
    "legend.facecolor": COLORS["primary"],
    "legend.edgecolor": COLORS["accent"],
})

palette = [COLORS["teal"], COLORS["gold"], COLORS["danger"],
           COLORS["success"], "#9B59B6", "#E67E22", "#3498DB", "#1ABC9C"]

print("  Színséma beállítva")


# ── CELL 5: Adatletöltés ──────────────────────────────────────────────────────
def fetch_data(tickers, start, end):
    print("📡  Adatok letöltése Yahoo Finance-ről...")
    raw = yf.download(tickers, start=start, end=end, auto_adjust=True, progress=False)
    prices = raw["Close"][tickers].dropna()
    prices.index.name = "Date"
    print(f"  Letöltve: {len(prices)} kereskedési nap × {len(tickers)} eszköz")
    return prices

prices = fetch_data(TICKERS, START_DATE, END_DATE)
print(prices.tail(3))


# ── CELL 6: SQLite mentés ─────────────────────────────────────────────────────
def store_to_sqlite(prices, db_path):
    print(f"  SQLite mentés: {db_path}")
    conn = sqlite3.connect(db_path)

    prices_long = prices.reset_index().melt(id_vars="Date", var_name="ticker", value_name="close_price")
    prices_long.to_sql("prices", conn, if_exists="replace", index=False)

    log_ret = np.log(prices / prices.shift(1)).dropna()
    ret_long = log_ret.reset_index().melt(id_vars="Date", var_name="ticker", value_name="log_return")
    ret_long.to_sql("daily_returns", conn, if_exists="replace", index=False)

    roll_vol = log_ret.rolling(21).std() * np.sqrt(252)
    vol_long = roll_vol.reset_index().melt(id_vars="Date", var_name="ticker", value_name="rolling_vol_21d")
    vol_long.to_sql("rolling_volatility", conn, if_exists="replace", index=False)

    conn.commit()
    conn.close()
    print("  3 táblázat mentve → prices | daily_returns | rolling_volatility")

store_to_sqlite(prices, DB_PATH)

if IN_COLAB:
    files.download(DB_PATH)


# ── CELL 7: Kockázati mutatók ─────────────────────────────────────────────────
def compute_metrics(prices, weights, risk_free):
    log_ret = np.log(prices / prices.shift(1)).dropna()

    ann_return = log_ret.mean() * 252
    ann_vol    = log_ret.std()  * np.sqrt(252)
    sharpe     = (ann_return - risk_free) / ann_vol

    port_ret_daily  = log_ret @ weights
    port_ann_return = port_ret_daily.mean() * 252
    port_ann_vol    = port_ret_daily.std()  * np.sqrt(252)
    port_sharpe     = (port_ann_return - risk_free) / port_ann_vol

    z95, z99 = norm.ppf(0.05), norm.ppf(0.01)
    var_95   = -(port_ret_daily.mean() + z95 * port_ret_daily.std())
    var_99   = -(port_ret_daily.mean() + z99 * port_ret_daily.std())

    cutoff  = port_ret_daily.quantile(0.05)
    cvar_95 = -port_ret_daily[port_ret_daily <= cutoff].mean()

    cum_ret  = (1 + port_ret_daily).cumprod()
    roll_max = cum_ret.cummax()
    drawdown = (cum_ret - roll_max) / roll_max
    max_dd   = drawdown.min()

    corr_matrix = log_ret.corr()
    cov_matrix  = log_ret.cov() * 252

    weighted_vol = np.sum(weights * ann_vol.values)
    div_ratio    = weighted_vol / port_ann_vol

    market_ret = log_ret.mean(axis=1)
    betas = {}
    for col in log_ret.columns:
        cov_  = np.cov(log_ret[col].values, market_ret.values)[0][1]
        var_m = np.var(market_ret.values)
        betas[col] = cov_ / var_m if var_m != 0 else np.nan

    return {
        "log_ret": log_ret, "ann_return": ann_return, "ann_vol": ann_vol,
        "sharpe": sharpe, "port_ret_daily": port_ret_daily,
        "port_ann_return": port_ann_return, "port_ann_vol": port_ann_vol,
        "port_sharpe": port_sharpe, "var_95": var_95, "var_99": var_99,
        "cvar_95": cvar_95, "max_dd": max_dd, "drawdown": drawdown,
        "cum_ret": cum_ret, "corr_matrix": corr_matrix, "cov_matrix": cov_matrix,
        "div_ratio": div_ratio, "betas": betas,
        "roll_vol": log_ret.rolling(21).std() * np.sqrt(252),
    }

print("  Kockázati mutatók számítása...")
metrics = compute_metrics(prices, WEIGHTS, RISK_FREE)
print("  Kész!")


# ── CELL 8: Piaci és Kategória Összefoglaló (Éves) ────────────────────────────
def compute_market_summary(prices):
    CATEGORIES = {
        "AAPL": "Tech", "MSFT": "Tech",
        "JPM": "Finance", "GS": "Finance", "BLK": "Finance",
        "XOM": "Energy", "GLD": "Commodities", "TLT": "Bonds"
    }
    
    yearly_prices = prices.resample('YE').last()
    yearly_returns = yearly_prices.pct_change().dropna()
    
    summary_data = []
    for date in yearly_returns.index:
        year = date.year
        year_rets = yearly_returns.loc[date]
        
        cat_returns = {}
        for t in prices.columns:
            cat = CATEGORIES.get(t, "Other")
            if cat not in cat_returns:
                cat_returns[cat] = []
            cat_returns[cat].append(year_rets[t])
            
        cat_avg = {cat: np.mean(vals) for cat, vals in cat_returns.items()}
        
        for t in prices.columns:
            cat = CATEGORIES.get(t, "Other")
            summary_data.append({
                "Year": year,
                "Ticker": t,
                "Category": cat,
                "MarketAvg_%": round(cat_avg[cat] * 100, 2),
                "AssetReturn_%": round(year_rets[t] * 100, 2)
            })
            
    return pd.DataFrame(summary_data)

print("  Piaci és kategória összefoglaló számítása...")
market_summary_df = compute_market_summary(prices)
print("  Kész!")


# ── CELL 9: Excel export ──────────────────────────────────────────────────────
def export_for_powerbi(prices, m, weights, tickers, summary_df, path):
    print(f"  Excel exportálás: {path}")
    with pd.ExcelWriter(path, engine="openpyxl") as xl:
        prices.to_excel(xl, sheet_name="Prices")
        m["log_ret"].to_excel(xl, sheet_name="Daily_Returns")

        kpi_df = pd.DataFrame({
            "Ticker":           tickers,
            "Weight_%":         (weights * 100).round(2),
            "Ann_Return_%":     (m["ann_return"].values * 100).round(2),
            "Ann_Volatility_%": (m["ann_vol"].values * 100).round(2),
            "Sharpe_Ratio":      m["sharpe"].values.round(3),
            "Beta":             [round(m["betas"][t], 3) for t in tickers],
        })
        kpi_df.to_excel(xl, sheet_name="Asset_KPIs", index=False)

        summary = pd.DataFrame([
            {"Metric": "Portfolio Annual Return %",    "Value": round(m["port_ann_return"] * 100, 2)},
            {"Metric": "Portfolio Annual Volatility %","Value": round(m["port_ann_vol"] * 100, 2)},
            {"Metric": "Portfolio Sharpe Ratio",       "Value": round(m["port_sharpe"], 3)},
            {"Metric": "VaR 95% (Daily)",              "Value": round(m["var_95"] * 100, 3)},
            {"Metric": "VaR 99% (Daily)",              "Value": round(m["var_99"] * 100, 3)},
            {"Metric": "CVaR 95% (Daily)",             "Value": round(m["cvar_95"] * 100, 3)},
            {"Metric": "Max Drawdown %",               "Value": round(m["max_dd"] * 100, 2)},
            {"Metric": "Diversification Ratio",        "Value": round(m["div_ratio"], 3)},
        ])
        summary.to_excel(xl, sheet_name="Portfolio_Summary", index=False)
        m["corr_matrix"].round(3).to_excel(xl, sheet_name="Correlation_Matrix")
        m["roll_vol"].to_excel(xl, sheet_name="Rolling_Volatility_21d")
        summary_df.to_excel(xl, sheet_name="Market_Summary", index=False)

    print(f"  Excel kész → {path}")

export_for_powerbi(prices, metrics, WEIGHTS, TICKERS, market_summary_df, EXPORT_PATH)

if IN_COLAB:
    files.download(EXPORT_PATH)


# ── CELL 10: Konzol riport ────────────────────────────────────────────────────
sep = "─" * 62
print(f"\n{'═'*62}")
print("  EXECUTIVE RISK SUMMARY  –  BlackRock / Morgan Stanley Style")
print(f"{'═'*62}")
print(f"  Portfolio Annual Return   : {metrics['port_ann_return']*100:>7.2f}%")
print(f"  Portfolio Annual Volatility: {metrics['port_ann_vol']*100:>6.2f}%")
print(f"  Sharpe Ratio              : {metrics['port_sharpe']:>7.3f}")
print(f"  VaR (95%, daily)          : {metrics['var_95']*100:>7.3f}%")
print(f"  VaR (99%, daily)          : {metrics['var_99']*100:>7.3f}%")
print(f"  CVaR / ES (95%, daily)    : {metrics['cvar_95']*100:>7.3f}%")
print(f"  Maximum Drawdown          : {metrics['max_dd']*100:>7.2f}%")
print(f"  Diversification Ratio     : {metrics['div_ratio']:>7.3f}")
print(sep)
print(f"  {'TICKER':<6} {'WEIGHT':>7} {'RET%':>8} {'VOL%':>8} {'SHARPE':>8} {'BETA':>7}")
print(sep)
for t, w, r, v, s, b in zip(
    TICKERS, WEIGHTS,
    metrics["ann_return"].values, metrics["ann_vol"].values, metrics["sharpe"].values,
    [metrics["betas"][t] for t in TICKERS]
):
    print(f"  {t:<6} {w*100:>6.1f}%  {r*100:>7.2f}%  {v*100:>7.2f}%  {s:>7.3f}  {b:>6.3f}")
print(f"{'═'*62}\n")


# ── CELL 11: Dashboard – Page 1 ───────────────────────────────────────────────
fig = plt.figure(figsize=(18, 10), facecolor=COLORS["bg"])
fig.suptitle("PAGE 1  –  PORTFOLIO OVERVIEW", fontsize=18, fontweight="bold",
             color=COLORS["gold"], y=0.97, fontfamily="monospace")
subtitle = (f"Ann. Return: {metrics['port_ann_return']*100:.1f}%   |   "
            f"Ann. Vol: {metrics['port_ann_vol']*100:.1f}%   |   "
            f"Sharpe: {metrics['port_sharpe']:.2f}   |   "
            f"Max DD: {metrics['max_dd']*100:.1f}%")
fig.text(0.5, 0.925, subtitle, ha="center", fontsize=9, color=COLORS["teal"], fontfamily="monospace")
gs = gridspec.GridSpec(2, 3, figure=fig, hspace=0.52, wspace=0.38,
                       left=0.06, right=0.97, top=0.88, bottom=0.08)

ax1 = fig.add_subplot(gs[0, :2])
ax1.set_title("  Cumulative Portfolio Return", color=COLORS["gold"], fontsize=12, pad=8)
cum = metrics["cum_ret"]
ax1.fill_between(cum.index, cum.values, 1, alpha=0.18, color=COLORS["teal"])
ax1.plot(cum.index, cum.values, color=COLORS["teal"], linewidth=2, label="Portfolio NAV")
ax1.axhline(1.0, color=COLORS["muted"], linewidth=0.8, linestyle="--")
ax1.yaxis.set_major_formatter(mticker.FuncFormatter(lambda x, _: f"{(x-1)*100:+.0f}%"))
ax1.set_xlabel("Date"); ax1.set_ylabel("Cumulative Return")
ax1.legend(loc="upper left", fontsize=9); ax1.grid(True)

ax2 = fig.add_subplot(gs[0, 2])
ax2.set_title("  Portfolio Allocation", color=COLORS["gold"], fontsize=12, pad=8)
wedges, texts, autotexts = ax2.pie(
    WEIGHTS, labels=TICKERS, autopct="%1.0f%%", colors=palette,
    startangle=140, wedgeprops={"edgecolor": COLORS["bg"], "linewidth": 1.5},
    textprops={"color": COLORS["light"], "fontsize": 9})
for at in autotexts:
    at.set_fontsize(8); at.set_color(COLORS["bg"]); at.set_fontweight("bold")

ax3 = fig.add_subplot(gs[1, :])
ax3.axis("off")
ax3.set_title("  Asset KPI Summary", color=COLORS["gold"], fontsize=12, pad=8)
headers = ["Ticker", "Weight", "Ann. Return", "Ann. Vol", "Sharpe", "Beta"]
rows = []
for t, w, r, v, s in zip(TICKERS, WEIGHTS, metrics["ann_return"].values,
                           metrics["ann_vol"].values, metrics["sharpe"].values):
    rows.append([t, f"{w*100:.0f}%", f"{r*100:.1f}%", f"{v*100:.1f}%",
                 f"{s:.2f}", f"{metrics['betas'][t]:.2f}"])
tbl = ax3.table(cellText=rows, colLabels=headers, loc="center", cellLoc="center")
tbl.auto_set_font_size(False); tbl.set_fontsize(10); tbl.scale(1, 2.2)
for (r, c), cell in tbl.get_celld().items():
    cell.set_facecolor(COLORS["accent"] if r == 0 else COLORS["primary"])
    cell.set_text_props(color=COLORS["gold"] if r == 0 else COLORS["light"])
    cell.set_edgecolor(COLORS["accent"])

plt.savefig("/content/page1_overview.png", dpi=150, bbox_inches="tight", facecolor=COLORS["bg"])
plt.show()
print("  Page 1 mentve")


# ── CELL 12: Dashboard – Page 2 ───────────────────────────────────────────────
fig = plt.figure(figsize=(18, 10), facecolor=COLORS["bg"])
fig.suptitle("PAGE 2  –  RETURNS & VOLATILITY", fontsize=18, fontweight="bold",
             color=COLORS["gold"], y=0.97, fontfamily="monospace")
gs = gridspec.GridSpec(1, 2, figure=fig, hspace=0.4, wspace=0.38,
                       left=0.07, right=0.97, top=0.86, bottom=0.10)

ax1 = fig.add_subplot(gs[0, 0])
ax1.set_title("  Sharpe Ratio by Asset", color=COLORS["gold"], fontsize=13, pad=10)
sharpe_vals = metrics["sharpe"].sort_values(ascending=True)
bar_colors  = [COLORS["success"] if v >= 0 else COLORS["danger"] for v in sharpe_vals.values]
bars = ax1.barh(sharpe_vals.index, sharpe_vals.values,
                color=bar_colors, edgecolor=COLORS["bg"], linewidth=0.6, height=0.6)
ax1.axvline(0, color=COLORS["muted"], linewidth=0.8)
ax1.axvline(RISK_FREE, color=COLORS["gold"], linewidth=1.2, linestyle=":",
            label=f"Risk-Free {RISK_FREE*100:.2f}%")
for bar, v in zip(bars, sharpe_vals.values):
    ax1.text(v + (0.02 if v >= 0 else -0.08), bar.get_y() + bar.get_height()/2,
             f"{v:.2f}", va="center", fontsize=10, color=COLORS["light"])
ax1.legend(fontsize=9); ax1.set_xlabel("Sharpe Ratio", fontsize=10)
ax1.tick_params(labelsize=10); ax1.grid(True, axis="x")

ax2 = fig.add_subplot(gs[0, 1])
ax2.set_title("  Rolling 21-Day Volatility (Ann.)", color=COLORS["gold"], fontsize=13, pad=10)
vol_palette = sns.color_palette("coolwarm", len(TICKERS))
for i, ticker in enumerate(TICKERS):
    ax2.plot(metrics["roll_vol"].index, metrics["roll_vol"][ticker],
             linewidth=1.2, alpha=0.8, label=ticker, color=vol_palette[i])
ax2.yaxis.set_major_formatter(mticker.PercentFormatter(1.0))
ax2.legend(fontsize=8, ncol=2, loc="upper right")
ax2.set_xlabel("Date", fontsize=10); ax2.set_ylabel("Annualised Vol", fontsize=10)
ax2.tick_params(labelsize=9); ax2.grid(True)

plt.savefig("/content/page2_returns.png", dpi=150, bbox_inches="tight", facecolor=COLORS["bg"])
plt.show()
print("  Page 2 mentve")


# ── CELL 13: Dashboard – Page 3 ───────────────────────────────────────────────
fig = plt.figure(figsize=(18, 10), facecolor=COLORS["bg"])
fig.suptitle("PAGE 3  –  CORRELATION & DIVERSIFICATION", fontsize=18, fontweight="bold",
             color=COLORS["gold"], y=0.97, fontfamily="monospace")
fig.text(0.5, 0.925, f"Diversification Ratio: {metrics['div_ratio']:.3f}",
         ha="center", fontsize=9, color=COLORS["teal"], fontfamily="monospace")
gs = gridspec.GridSpec(1, 2, figure=fig, hspace=0.4, wspace=0.42,
                       left=0.06, right=0.97, top=0.86, bottom=0.10)

ax1 = fig.add_subplot(gs[0, 0])
ax1.set_title("  Asset Correlation Matrix", color=COLORS["gold"], fontsize=13, pad=10)
cmap = sns.diverging_palette(220, 20, as_cmap=True)
sns.heatmap(metrics["corr_matrix"], cmap=cmap, vmin=-1, vmax=1, center=0,
            square=True, linewidths=0.6, annot=True, fmt=".2f",
            annot_kws={"size": 9}, ax=ax1, cbar_kws={"shrink": 0.85})
ax1.tick_params(axis="x", labelsize=9, rotation=45)
ax1.tick_params(axis="y", labelsize=9)

ax2 = fig.add_subplot(gs[0, 1])
ax2.set_title("  Risk / Return by Asset", color=COLORS["gold"], fontsize=13, pad=10)
for i, ticker in enumerate(TICKERS):
    ax2.scatter(metrics["ann_vol"][ticker]*100, metrics["ann_return"][ticker]*100,
                s=WEIGHTS[i]*1800, color=palette[i],
                edgecolors=COLORS["light"], linewidths=0.8, zorder=3, alpha=0.9)
    ax2.annotate(ticker, xy=(metrics["ann_vol"][ticker]*100, metrics["ann_return"][ticker]*100),
                 xytext=(5, 5), textcoords="offset points",
                 fontsize=10, color=COLORS["light"], fontweight="bold")
ax2.scatter(metrics["port_ann_vol"]*100, metrics["port_ann_return"]*100,
            s=350, color=COLORS["gold"], marker="*",
            edgecolors=COLORS["light"], linewidths=1.0, zorder=5, label="Portfolio ★")
ax2.axhline(0, color=COLORS["muted"], linewidth=0.6, linestyle="--")
ax2.set_xlabel("Annual Volatility %", fontsize=10)
ax2.set_ylabel("Annual Return %", fontsize=10)
ax2.tick_params(labelsize=9); ax2.legend(fontsize=9); ax2.grid(True)

plt.savefig("/content/page3_correlation.png", dpi=150, bbox_inches="tight", facecolor=COLORS["bg"])
plt.show()
print("  Page 3 mentve")


# ── CELL 14: Dashboard – Page 4 ───────────────────────────────────────────────
fig = plt.figure(figsize=(18, 10), facecolor=COLORS["bg"])
fig.suptitle("PAGE 4  –  RISK MANAGEMENT", fontsize=18, fontweight="bold",
             color=COLORS["gold"], y=0.97, fontfamily="monospace")
subtitle = (f"VaR 95%: {metrics['var_95']*100:.2f}%   |   "
            f"VaR 99%: {metrics['var_99']*100:.2f}%   |   "
            f"CVaR 95%: {metrics['cvar_95']*100:.2f}%   |   "
            f"Max Drawdown: {metrics['max_dd']*100:.1f}%")
fig.text(0.5, 0.925, subtitle, ha="center", fontsize=9, color=COLORS["teal"], fontfamily="monospace")
gs = gridspec.GridSpec(1, 2, figure=fig, hspace=0.4, wspace=0.38,
                       left=0.07, right=0.97, top=0.86, bottom=0.10)

ax1 = fig.add_subplot(gs[0, 0])
ax1.set_title("  Return Distribution & Value-at-Risk", color=COLORS["gold"], fontsize=13, pad=10)
ret = metrics["port_ret_daily"].dropna()
ax1.hist(ret, bins=90, color=COLORS["accent"], edgecolor=COLORS["bg"], alpha=0.85, density=True)
mu, sigma = ret.mean(), ret.std()
x = np.linspace(ret.min(), ret.max(), 300)
ax1.plot(x, norm.pdf(x, mu, sigma), color=COLORS["teal"], linewidth=2.5, label="Normal fit")
ax1.axvline(-metrics["var_95"], color=COLORS["gold"], linewidth=2.0, linestyle="--",
            label=f"VaR 95%: {metrics['var_95']*100:.2f}%")
ax1.axvline(-metrics["var_99"], color=COLORS["danger"], linewidth=2.0, linestyle="--",
            label=f"VaR 99%: {metrics['var_99']*100:.2f}%")
ax1.axvline(-metrics["cvar_95"], color="#E67E22", linewidth=1.5, linestyle=":",
            label=f"CVaR 95%: {metrics['cvar_95']*100:.2f}%")
ax1.xaxis.set_major_formatter(mticker.PercentFormatter(1.0))
ax1.legend(fontsize=9); ax1.set_xlabel("Daily Return", fontsize=10)
ax1.tick_params(labelsize=9); ax1.grid(True)

ax2 = fig.add_subplot(gs[0, 1])
ax2.set_title("  Portfolio Drawdown", color=COLORS["gold"], fontsize=13, pad=10)
dd = metrics["drawdown"]
ax2.fill_between(dd.index, dd.values, 0, color=COLORS["danger"], alpha=0.55)
ax2.plot(dd.index, dd.values, color=COLORS["danger"], linewidth=1.2)
ax2.axhline(metrics["max_dd"], color=COLORS["gold"], linewidth=1.5, linestyle=":",
            label=f"Max DD: {metrics['max_dd']*100:.1f}%")
ax2.yaxis.set_major_formatter(mticker.PercentFormatter(1.0))
ax2.legend(fontsize=9); ax2.set_xlabel("Date", fontsize=10)
ax2.set_ylabel("Drawdown %", fontsize=10)
ax2.tick_params(labelsize=9); ax2.grid(True)

plt.savefig("/content/page4_risk.png", dpi=150, bbox_inches="tight", facecolor=COLORS["bg"])
plt.show()
print("  Page 4 mentve")

print("\n  Elemzés kész!")
print("   Mentett fájlok a /content/ mappában:")
print("   - portfolio_risk.db")
print("   - powerbi_export.xlsx")
print("   - page1_overview.png")
print("   - page2_returns.png")
print("   - page3_correlation.png")
print("   - page4_risk.png")
`;

export const portfolioRiskCodeSnippet = String.raw`# =============================================================================
#   PORTFOLIO RISK MANAGEMENT DASHBOARD (Részlet)
#   A legfontosabb kockázati és piaci mutatók számítása
# =============================================================================

import numpy as np
import pandas as pd
import yfinance as yf
from scipy.stats import norm

# ── CONFIGURATION ─────────────────────────────────────────────────────────────
PORTFOLIO = {
    "AAPL":  0.20, "MSFT":  0.20, "JPM":   0.15, "GS":    0.10,
    "BLK":   0.10, "XOM":   0.10, "GLD":   0.10, "TLT":   0.05
}
TICKERS = list(PORTFOLIO.keys())
WEIGHTS = np.array(list(PORTFOLIO.values()))

START_DATE = "2020-01-01"
END_DATE = "2024-01-01"
RISK_FREE_RATE = 0.04

# ── ADATLETÖLTÉS ──────────────────────────────────────────────────────────────
print("  Adatok letöltése (Yahoo Finance)...")
data = yf.download(TICKERS, start=START_DATE, end=END_DATE)["Adj Close"]
returns = data.pct_change().dropna()

# ── KOCKÁZATI MUTATÓK SZÁMÍTÁSA ───────────────────────────────────────────────
def compute_risk_metrics(returns, weights, rf=0.04):
    """Kiszámítja a portfólió főbb kockázati mutatóit (VaR, CVaR, Sharpe, Drawdown)."""
    port_return = returns.dot(weights)
    
    # Évesített hozam és volatilitás
    ann_return = port_return.mean() * 252
    ann_volatility = port_return.std() * np.sqrt(252)
    
    # Sharpe mutató
    sharpe_ratio = (ann_return - rf) / ann_volatility
    
    # Value at Risk (VaR) & Conditional VaR (CVaR) - 95%
    var_95 = np.percentile(port_return.dropna(), 5)
    cvar_95 = port_return[port_return <= var_95].mean()
    
    # Max Drawdown
    cum_returns = (1 + port_return).cumprod()
    rolling_max = cum_returns.cummax()
    drawdown = (cum_returns - rolling_max) / rolling_max
    max_drawdown = drawdown.min()
    
    return {
        "Ann_Return": ann_return,
        "Ann_Volatility": ann_volatility,
        "Sharpe_Ratio": sharpe_ratio,
        "VaR_95": var_95,
        "CVaR_95": cvar_95,
        "Max_Drawdown": max_drawdown
    }

metrics = compute_risk_metrics(returns, WEIGHTS, RISK_FREE_RATE)
print(f"  Portfólió Sharpe: {metrics['Sharpe_Ratio']:.2f}, Volatilitás: {metrics['Ann_Volatility']*100:.1f}%")

# ── PIACI ÉS KATEGÓRIA ÖSSZEFOGLALÓ ───────────────────────────────────────────
def compute_market_summary(prices):
    """Éves hozamok és kategória átlagok számítása."""
    yearly_prices = prices.resample('Y').last()
    yearly_returns = yearly_prices.pct_change().dropna()
    
    # Kategória mapping
    categories = {
        "AAPL": "Tech", "MSFT": "Tech",
        "JPM": "Financials", "GS": "Financials", "BLK": "Financials",
        "XOM": "Energy", "GLD": "Commodity", "TLT": "Bonds"
    }
    
    # ... (A teljes kód tartalmazza az SQLite mentést, 
    # a Matplotlib/Seaborn vizualizációkat és az Excel exportot is.)
    return yearly_returns

market_summary = compute_market_summary(data)
`;

export const portfolioRiskSQLCode = String.raw`-- =============================================================================
--   PORTFOLIO RISK MANAGEMENT DASHBOARD
--   SQLite Schema & Analytics Queries
--   Database: portfolio_risk.db  (generated by the Python pipeline)
-- =============================================================================

-- ── TABLE DEFINITIONS ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS prices (
    Date        TEXT    NOT NULL,
    ticker      TEXT    NOT NULL,
    close_price REAL    NOT NULL,
    PRIMARY KEY (Date, ticker)
);

CREATE TABLE IF NOT EXISTS daily_returns (
    Date        TEXT    NOT NULL,
    ticker      TEXT    NOT NULL,
    log_return  REAL,
    PRIMARY KEY (Date, ticker)
);

CREATE TABLE IF NOT EXISTS rolling_volatility (
    Date              TEXT NOT NULL,
    ticker            TEXT NOT NULL,
    rolling_vol_21d   REAL,
    PRIMARY KEY (Date, ticker)
);

-- ── ASSET KPI VIEW ────────────────────────────────────────────────────────────
-- Annualised return, volatility and Sharpe ratio per ticker
CREATE VIEW IF NOT EXISTS v_asset_kpis AS
SELECT
    ticker,
    ROUND(AVG(log_return) * 252,           4)  AS ann_return,
    ROUND(STDEV(log_return) * SQRT(252),   4)  AS ann_volatility,
    ROUND(
        (AVG(log_return) * 252 - 0.0525) /
        (STDEV(log_return) * SQRT(252)),   3)  AS sharpe_ratio
FROM  daily_returns
GROUP BY ticker
ORDER BY sharpe_ratio DESC;

-- ── PORTFOLIO SUMMARY QUERY ───────────────────────────────────────────────────
-- Weighted portfolio-level risk metrics (weights from Python config)
WITH portfolio_weights AS (
    SELECT 'AAPL' AS ticker, 0.20 AS weight UNION ALL
    SELECT 'MSFT',           0.20            UNION ALL
    SELECT 'JPM',            0.15            UNION ALL
    SELECT 'GS',             0.10            UNION ALL
    SELECT 'BLK',            0.10            UNION ALL
    SELECT 'XOM',            0.10            UNION ALL
    SELECT 'GLD',            0.10            UNION ALL
    SELECT 'TLT',            0.05
),
daily_portfolio AS (
    SELECT
        dr.Date,
        SUM(dr.log_return * pw.weight) AS port_return
    FROM  daily_returns dr
    JOIN  portfolio_weights pw USING (ticker)
    GROUP BY dr.Date
)
SELECT
    ROUND(AVG(port_return) * 252,            4)  AS ann_return,
    ROUND(STDEV(port_return) * SQRT(252),    4)  AS ann_volatility,
    ROUND(
        (AVG(port_return) * 252 - 0.0525) /
        (STDEV(port_return) * SQRT(252)),    3)  AS sharpe_ratio
FROM daily_portfolio;

-- ── VALUE AT RISK (VaR 95%) ───────────────────────────────────────────────────
-- Parametric VaR using normal approximation per ticker
SELECT
    ticker,
    ROUND(AVG(log_return) * 252,          4)  AS ann_return,
    ROUND(STDEV(log_return) * SQRT(252),  4)  AS ann_vol,
    -- 95% VaR: μ + z(0.05)*σ  where z(0.05) ≈ -1.6449
    ROUND(
        -(AVG(log_return) + (-1.6449) * STDEV(log_return)),
    4)                                         AS var_95_daily,
    -- 99% VaR: z(0.01) ≈ -2.3263
    ROUND(
        -(AVG(log_return) + (-2.3263) * STDEV(log_return)),
    4)                                         AS var_99_daily
FROM  daily_returns
GROUP BY ticker
ORDER BY var_95_daily DESC;

-- ── ROLLING 21-DAY VOLATILITY (LATEST) ───────────────────────────────────────
SELECT
    rv.ticker,
    rv.Date,
    ROUND(rv.rolling_vol_21d * 100, 2) AS vol_pct
FROM  rolling_volatility rv
WHERE rv.Date = (
    SELECT MAX(Date) FROM rolling_volatility WHERE ticker = rv.ticker
)
ORDER BY vol_pct DESC;

-- ── CORRELATION PROXY: CATEGORY AVERAGE ───────────────────────────────────────
-- Average pairwise log-return by sector (SQLite lacks CORR(); use Python/Power BI)
WITH categorised AS (
    SELECT
        dr.Date,
        dr.ticker,
        dr.log_return,
        CASE dr.ticker
            WHEN 'AAPL' THEN 'Tech'
            WHEN 'MSFT' THEN 'Tech'
            WHEN 'JPM'  THEN 'Finance'
            WHEN 'GS'   THEN 'Finance'
            WHEN 'BLK'  THEN 'Finance'
            WHEN 'XOM'  THEN 'Energy'
            WHEN 'GLD'  THEN 'Commodity'
            WHEN 'TLT'  THEN 'Bonds'
        END AS category
    FROM daily_returns dr
)
SELECT
    category,
    ROUND(AVG(log_return) * 252,          4)  AS avg_ann_return,
    ROUND(STDEV(log_return) * SQRT(252),  4)  AS avg_ann_vol,
    COUNT(DISTINCT ticker)                     AS asset_count
FROM  categorised
GROUP BY category
ORDER BY avg_ann_return DESC;

-- ── EXECUTIVE SUMMARY ─────────────────────────────────────────────────────────
-- Top-3 and Bottom-3 assets by Sharpe Ratio
SELECT 'TOP'    AS rank_group, ticker, ROUND(sharpe_ratio, 3) AS sharpe
FROM   v_asset_kpis
ORDER  BY sharpe_ratio DESC
LIMIT  3
UNION ALL
SELECT 'BOTTOM' AS rank_group, ticker, ROUND(sharpe_ratio, 3) AS sharpe
FROM   v_asset_kpis
ORDER  BY sharpe_ratio ASC
LIMIT  3;
`;
