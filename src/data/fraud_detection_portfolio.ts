export const fraudDetectionPortfolioCode = String.raw`# =============================================================================
#   FRAUD DETECTION ML MODEL – PORTFÓLIÓ PROJEKT
#   Kaggle: Credit Card Fraud Detection (nyilvános adathalmaz)
#   Modellek: Logistic Regression + Random Forest
#   Metrikák: AUC-ROC, Precision-Recall, F1, Confusion Matrix
#   Output:   Matplotlib dashboard + Excel export (Power BI-hoz)
# =============================================================================
#   pip install pandas numpy matplotlib seaborn scikit-learn imbalanced-learn
#               openpyxl kaggle
# =============================================================================

import os
import warnings
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import matplotlib.gridspec as gridspec
import seaborn as sns

from sklearn.model_selection import train_test_split, StratifiedKFold, cross_val_score
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import (
    confusion_matrix, classification_report,
    roc_auc_score, roc_curve,
    precision_recall_curve, average_precision_score,
    f1_score
)
from imblearn.over_sampling import SMOTE

warnings.filterwarnings("ignore")

# ─────────────────────────────────────────────────────────────────────────────
# KONFIGURÁCIÓ
# ─────────────────────────────────────────────────────────────────────────────

DATA_PATH   = "creditcard.csv"           # Kaggle-ről letöltött CSV
OUTPUT_DIR  = "fraud_output"             # Ide kerülnek a kimeneti fájlok
RANDOM_SEED = 42
TEST_SIZE   = 0.2

# Dashboard stílus (BlackRock / Morgan Stanley ihlet)
DARK_BG     = "#0A0E1A"
PANEL_BG    = "#111827"
ACCENT1     = "#00D4FF"   # kék
ACCENT2     = "#FF6B35"   # narancs
ACCENT3     = "#00FF88"   # zöld
TEXT_COLOR  = "#E2E8F0"
GRID_COLOR  = "#1E2D40"

os.makedirs(OUTPUT_DIR, exist_ok=True)

# ─────────────────────────────────────────────────────────────────────────────
# 1. ADATBETÖLTÉS
# Kaggle letöltés: https://www.kaggle.com/datasets/mlg-ulb/creditcardfraud
# Parancs: kaggle datasets download -d mlg-ulb/creditcardfraud
# ─────────────────────────────────────────────────────────────────────────────

def load_data(path: str) -> pd.DataFrame:
    """Betölti és alapvetően ellenőrzi az adathalmazt."""
    print("=" * 60)
    print("  FRAUD DETECTION ML – PORTFÓLIÓ PROJEKT")
    print("=" * 60)
    
    if not os.path.exists(path):
        print(f"\n[!] '{path}' nem található.")
        print("    Kaggle letöltési parancs:")
        print("    kaggle datasets download -d mlg-ulb/creditcardfraud --unzip")
        print("\n    Ha nincs Kaggle-fiókod:")
        print("    https://www.kaggle.com/datasets/mlg-ulb/creditcardfraud")
        raise FileNotFoundError(f"Az adatfájl nem található: {path}")
    
    df = pd.read_csv(path)
    print(f"\n[1] Adathalmaz betöltve: {df.shape[0]:,} tranzakció, {df.shape[1]} változó")
    
    fraud_count  = df["Class"].sum()
    normal_count = len(df) - fraud_count
    fraud_pct    = fraud_count / len(df) * 100
    
    print(f"    Normál tranzakció : {normal_count:,}  ({100 - fraud_pct:.2f}%)")
    print(f"    Csalás (fraud)    : {fraud_count:,}   ({fraud_pct:.4f}%)")
    print(f"    Osztályarány      : 1 : {int(normal_count / fraud_count):,}")
    
    return df


# ─────────────────────────────────────────────────────────────────────────────
# 2. EXPLORATIVE DATA ANALYSIS (EDA)
# ─────────────────────────────────────────────────────────────────────────────

def run_eda(df: pd.DataFrame) -> None:
    """EDA: összefoglaló statisztikák és vizualizáció."""
    print("\n[2] EDA futtatása...")
    
    fig, axes = plt.subplots(1, 3, figsize=(18, 5))
    fig.patch.set_facecolor(DARK_BG)
    
    for ax in axes:
        ax.set_facecolor(PANEL_BG)
        ax.tick_params(colors=TEXT_COLOR)
        ax.spines[:].set_color(GRID_COLOR)
    
    # 2a. Osztályeloszlás
    counts = df["Class"].value_counts()
    bars = axes[0].bar(
        ["Normál", "Fraud"],
        counts.values,
        color=[ACCENT1, ACCENT2],
        edgecolor=DARK_BG,
        linewidth=1.5
    )
    axes[0].set_title("Osztályeloszlás", color=TEXT_COLOR, fontsize=13, pad=10)
    axes[0].set_ylabel("Tranzakciók száma", color=TEXT_COLOR)
    for bar, val in zip(bars, counts.values):
        axes[0].text(
            bar.get_x() + bar.get_width() / 2,
            bar.get_height() * 0.5,
            f"{val:,}",
            ha="center", va="center",
            color=DARK_BG, fontsize=11, fontweight="bold"
        )
    
    # 2b. Összeg (Amount) eloszlása class szerint
    for cls, color, label in [(0, ACCENT1, "Normál"), (1, ACCENT2, "Fraud")]:
        data = df[df["Class"] == cls]["Amount"]
        axes[1].hist(
            np.log1p(data),
            bins=50,
            alpha=0.6,
            color=color,
            label=f"{label} (n={len(data):,})"
        )
    axes[1].set_title("Összeg log-eloszlása", color=TEXT_COLOR, fontsize=13, pad=10)
    axes[1].set_xlabel("log(1 + Amount)", color=TEXT_COLOR)
    axes[1].legend(facecolor=PANEL_BG, labelcolor=TEXT_COLOR)
    
    # 2c. Időbeli eloszlás
    axes[2].scatter(
        df[df["Class"] == 0]["Time"],
        np.random.uniform(0, 1, (df["Class"] == 0).sum()),
        c=ACCENT1, alpha=0.01, s=1, label="Normál"
    )
    axes[2].scatter(
        df[df["Class"] == 1]["Time"],
        np.random.uniform(0, 1, (df["Class"] == 1).sum()),
        c=ACCENT2, alpha=0.3, s=5, label="Fraud"
    )
    axes[2].set_title("Időbeli eloszlás", color=TEXT_COLOR, fontsize=13, pad=10)
    axes[2].set_xlabel("Idő (másodperc)", color=TEXT_COLOR)
    axes[2].legend(facecolor=PANEL_BG, labelcolor=TEXT_COLOR)
    
    plt.suptitle("EDA – Credit Card Fraud Detection", color=TEXT_COLOR,
                 fontsize=15, fontweight="bold", y=1.02)
    plt.tight_layout()
    
    eda_path = os.path.join(OUTPUT_DIR, "01_eda.png")
    plt.savefig(eda_path, dpi=150, bbox_inches="tight", facecolor=DARK_BG)
    plt.close()
    print(f"    EDA mentve: {eda_path}")


# ─────────────────────────────────────────────────────────────────────────────
# 3. ELŐFELDOLGOZÁS
# ─────────────────────────────────────────────────────────────────────────────

def preprocess(df: pd.DataFrame):
    """
    - Amount és Time standardizálása
    - Train/test split (stratifikált)
    - SMOTE az osztályegyensúlyért a train seten
    """
    print("\n[3] Előfeldolgozás...")
    
    scaler = StandardScaler()
    df = df.copy()
    df["Amount"] = scaler.fit_transform(df[["Amount"]])
    df["Time"]   = scaler.fit_transform(df[["Time"]])
    
    X = df.drop("Class", axis=1)
    y = df["Class"]
    
    X_train, X_test, y_train, y_test = train_test_split(
        X, y,
        test_size=TEST_SIZE,
        stratify=y,
        random_state=RANDOM_SEED
    )
    
    print(f"    Train: {len(X_train):,} minta | Test: {len(X_test):,} minta")
    
    # SMOTE: szintetikus kisebbségi osztály generálás
    smote = SMOTE(random_state=RANDOM_SEED)
    X_train_res, y_train_res = smote.fit_resample(X_train, y_train)
    
    print(f"    SMOTE előtt: {y_train.value_counts().to_dict()}")
    print(f"    SMOTE után : {pd.Series(y_train_res).value_counts().to_dict()}")
    
    return X_train_res, X_test, y_train_res, y_test


# ─────────────────────────────────────────────────────────────────────────────
# 4. MODELLEK TANÍTÁSA
# ─────────────────────────────────────────────────────────────────────────────

def train_models(X_train, y_train):
    """Logistic Regression + Random Forest tanítása."""
    print("\n[4] Modellek tanítása...")
    
    # Logistic Regression
    lr = LogisticRegression(
        max_iter=1000,
        C=0.01,
        class_weight="balanced",
        random_state=RANDOM_SEED
    )
    lr.fit(X_train, y_train)
    print("    [OK] Logistic Regression kész")
    
    # Random Forest
    rf = RandomForestClassifier(
        n_estimators=100,
        max_depth=12,
        min_samples_leaf=5,
        class_weight="balanced",
        random_state=RANDOM_SEED,
        n_jobs=-1
    )
    rf.fit(X_train, y_train)
    print("    [OK] Random Forest kész")
    
    return {"Logistic Regression": lr, "Random Forest": rf}


# ─────────────────────────────────────────────────────────────────────────────
# 5. KIÉRTÉKELÉS
# ─────────────────────────────────────────────────────────────────────────────

def evaluate_models(models: dict, X_test, y_test) -> dict:
    """AUC-ROC, F1, Precision, Recall, Confusion Matrix minden modellre."""
    print("\n[5] Modellek kiértékelése...")
    
    results = {}
    
    for name, model in models.items():
        y_pred      = model.predict(X_test)
        y_prob      = model.predict_proba(X_test)[:, 1]
        
        auc_roc     = roc_auc_score(y_test, y_prob)
        f1          = f1_score(y_test, y_pred)
        avg_prec    = average_precision_score(y_test, y_prob)
        cm          = confusion_matrix(y_test, y_pred)
        
        tn, fp, fn, tp = cm.ravel()
        precision   = tp / (tp + fp) if (tp + fp) > 0 else 0
        recall      = tp / (tp + fn) if (tp + fn) > 0 else 0
        
        results[name] = {
            "AUC-ROC"          : round(auc_roc, 4),
            "F1 Score"         : round(f1, 4),
            "Precision"        : round(precision, 4),
            "Recall"           : round(recall, 4),
            "Avg Precision"    : round(avg_prec, 4),
            "TP"               : int(tp),
            "FP"               : int(fp),
            "TN"               : int(tn),
            "FN"               : int(fn),
            "y_prob"           : y_prob,
            "y_pred"           : y_pred,
            "confusion_matrix" : cm,
        }
        
        print(f"\n    --- {name} ---")
        print(f"    AUC-ROC   : {auc_roc:.4f}")
        print(f"    F1 Score  : {f1:.4f}")
        print(f"    Precision : {precision:.4f}")
        print(f"    Recall    : {recall:.4f}")
        print(f"    Avg Prec  : {avg_prec:.4f}")
        print(f"    Elkapott fraud: {tp} / {tp + fn}")
    
    return results


# ─────────────────────────────────────────────────────────────────────────────
# 6. VIZUALIZÁCIÓ – FŐDASHBOARD
# ─────────────────────────────────────────────────────────────────────────────

def plot_dashboard(results: dict, models: dict, X_test, y_test) -> None:
    """4 paneles fő dashboard: AUC-ROC, PR-görbe, Confusion Matrix, Feature Importance."""
    print("\n[6] Dashboard generálása...")
    
    fig = plt.figure(figsize=(20, 16), facecolor=DARK_BG)
    gs  = gridspec.GridSpec(2, 2, figure=fig, hspace=0.4, wspace=0.35)
    
    colors = {
        "Logistic Regression" : ACCENT1,
        "Random Forest"       : ACCENT2,
    }
    
    # ── Panel 1: AUC-ROC görbe ────────────────────────────────────────────
    ax1 = fig.add_subplot(gs[0, 0])
    ax1.set_facecolor(PANEL_BG)
    ax1.tick_params(colors=TEXT_COLOR)
    ax1.spines[:].set_color(GRID_COLOR)
    
    for name, res in results.items():
        fpr, tpr, _ = roc_curve(y_test, res["y_prob"])
        ax1.plot(fpr, tpr, color=colors[name],
                 linewidth=2.5, label=f"{name}\n(AUC = {res['AUC-ROC']:.4f})")
    
    ax1.plot([0, 1], [0, 1], "w--", linewidth=1, alpha=0.4, label="Véletlen (AUC = 0.50)")
    ax1.fill_between([0, 1], [0, 1], alpha=0.05, color="white")
    ax1.set_xlabel("False Positive Rate", color=TEXT_COLOR, fontsize=11)
    ax1.set_ylabel("True Positive Rate", color=TEXT_COLOR, fontsize=11)
    ax1.set_title("AUC-ROC görbe", color=TEXT_COLOR, fontsize=13, fontweight="bold", pad=12)
    ax1.legend(facecolor=PANEL_BG, labelcolor=TEXT_COLOR, fontsize=9)
    ax1.set_xlim([0, 1]); ax1.set_ylim([0, 1.02])
    ax1.grid(color=GRID_COLOR, linewidth=0.5)
    
    # ── Panel 2: Precision-Recall görbe ───────────────────────────────────
    ax2 = fig.add_subplot(gs[0, 1])
    ax2.set_facecolor(PANEL_BG)
    ax2.tick_params(colors=TEXT_COLOR)
    ax2.spines[:].set_color(GRID_COLOR)
    
    for name, res in results.items():
        prec, rec, _ = precision_recall_curve(y_test, res["y_prob"])
        ax2.plot(rec, prec, color=colors[name],
                 linewidth=2.5,
                 label=f"{name}\n(AP = {res['Avg Precision']:.4f})")
    
    baseline = y_test.mean()
    ax2.axhline(y=baseline, color="white", linestyle="--", linewidth=1, alpha=0.4,
                label=f"Baseline ({baseline:.4f})")
    ax2.set_xlabel("Recall", color=TEXT_COLOR, fontsize=11)
    ax2.set_ylabel("Precision", color=TEXT_COLOR, fontsize=11)
    ax2.set_title("Precision-Recall görbe", color=TEXT_COLOR, fontsize=13, fontweight="bold", pad=12)
    ax2.legend(facecolor=PANEL_BG, labelcolor=TEXT_COLOR, fontsize=9)
    ax2.set_xlim([0, 1]); ax2.set_ylim([0, 1.02])
    ax2.grid(color=GRID_COLOR, linewidth=0.5)
    
    # ── Panel 3: Confusion Matrix (Random Forest) ─────────────────────────
    ax3 = fig.add_subplot(gs[1, 0])
    ax3.set_facecolor(PANEL_BG)
    
    best_name = max(results, key=lambda k: results[k]["AUC-ROC"])
    cm = results[best_name]["confusion_matrix"]
    
    cm_pct = cm.astype(float) / cm.sum(axis=1)[:, np.newaxis] * 100
    labels = np.array([
        [f"{cm[0,0]:,}\n({cm_pct[0,0]:.1f}%)", f"{cm[0,1]:,}\n({cm_pct[0,1]:.1f}%)"],
        [f"{cm[1,0]:,}\n({cm_pct[1,0]:.1f}%)", f"{cm[1,1]:,}\n({cm_pct[1,1]:.1f}%)"],
    ])
    
    cmap = sns.diverging_palette(220, 10, as_cmap=True)
    sns.heatmap(
        cm_pct, annot=labels, fmt="", ax=ax3,
        cmap=cmap,
        xticklabels=["Normál (pred)", "Fraud (pred)"],
        yticklabels=["Normál (valós)", "Fraud (valós)"],
        linewidths=1, linecolor=DARK_BG,
        annot_kws={"size": 12, "color": "white"},
        cbar_kws={"shrink": 0.8}
    )
    ax3.set_title(f"Confusion Matrix – {best_name}",
                  color=TEXT_COLOR, fontsize=13, fontweight="bold", pad=12)
    ax3.tick_params(colors=TEXT_COLOR, labelsize=9)
    ax3.yaxis.label.set_color(TEXT_COLOR)
    ax3.xaxis.label.set_color(TEXT_COLOR)
    
    # ── Panel 4: Feature Importance (Random Forest) ───────────────────────
    ax4 = fig.add_subplot(gs[1, 1])
    ax4.set_facecolor(PANEL_BG)
    ax4.tick_params(colors=TEXT_COLOR)
    ax4.spines[:].set_color(GRID_COLOR)
    
    rf_model   = models["Random Forest"]
    importances = pd.Series(
        rf_model.feature_importances_,
        index=X_test.columns
    ).sort_values(ascending=True).tail(15)
    
    colors_feat = [
        ACCENT2 if i >= len(importances) - 5 else ACCENT1
        for i in range(len(importances))
    ]
    
    bars = ax4.barh(importances.index, importances.values,
                    color=colors_feat, edgecolor=DARK_BG, linewidth=0.8)
    ax4.set_title("Top 15 Feature Importance (RF)",
                  color=TEXT_COLOR, fontsize=13, fontweight="bold", pad=12)
    ax4.set_xlabel("Fontossági érték", color=TEXT_COLOR, fontsize=11)
    ax4.grid(color=GRID_COLOR, linewidth=0.5, axis="x")
    ax4.tick_params(labelsize=9)
    
    # Értékek a sávokon
    for bar in bars:
        ax4.text(
            bar.get_width() + 0.0002, bar.get_y() + bar.get_height() / 2,
            f"{bar.get_width():.4f}", va="center", ha="left",
            color=TEXT_COLOR, fontsize=7
        )
    
    # ── Főcím ─────────────────────────────────────────────────────────────
    fig.text(0.5, 0.98,
             "FRAUD DETECTION ML DASHBOARD  |  Credit Card Fraud  |  Kaggle",
             ha="center", va="top", color=TEXT_COLOR,
             fontsize=16, fontweight="bold")
    
    dashboard_path = os.path.join(OUTPUT_DIR, "02_dashboard.png")
    plt.savefig(dashboard_path, dpi=150, bbox_inches="tight", facecolor=DARK_BG)
    plt.close()
    print(f"    Dashboard mentve: {dashboard_path}")


# ─────────────────────────────────────────────────────────────────────────────
# 7. EXCEL EXPORT (Power BI-hoz)
# ─────────────────────────────────────────────────────────────────────────────

def export_to_excel(results: dict, models: dict, X_test, y_test) -> None:
    """
    6 lapot exportál Excelbe:
      1. KPI Summary
      2. ROC Data
      3. PR Data
      4. Feature Importance
      5. Predictions (test set)
      6. Confusion Matrix
    """
    print("\n[7] Excel exportálása Power BI-hoz...")
    
    excel_path = os.path.join(OUTPUT_DIR, "fraud_model_results.xlsx")
    
    with pd.ExcelWriter(excel_path, engine="openpyxl") as writer:
        
        # Lap 1: KPI Summary
        kpi_rows = []
        for name, res in results.items():
            kpi_rows.append({
                "Model"         : name,
                "AUC-ROC"       : res["AUC-ROC"],
                "F1 Score"      : res["F1 Score"],
                "Precision"     : res["Precision"],
                "Recall"        : res["Recall"],
                "Avg Precision" : res["Avg Precision"],
                "TP"            : res["TP"],
                "FP"            : res["FP"],
                "TN"            : res["TN"],
                "FN"            : res["FN"],
            })
        pd.DataFrame(kpi_rows).to_excel(writer, sheet_name="KPI_Summary", index=False)
        
        # Lap 2-3: ROC + PR adatok
        for name, res in results.items():
            safe = name.replace(" ", "_")
            
            fpr, tpr, thresh_roc = roc_curve(y_test, res["y_prob"])
            pd.DataFrame({"FPR": fpr, "TPR": tpr, "Threshold": thresh_roc}).to_excel(
                writer, sheet_name=f"ROC_{safe[:12]}", index=False)
            
            prec, rec, thresh_pr = precision_recall_curve(y_test, res["y_prob"])
            pd.DataFrame({
                "Precision": prec[:-1], "Recall": rec[:-1], "Threshold": thresh_pr
            }).to_excel(writer, sheet_name=f"PR_{safe[:13]}", index=False)
        
        # Lap 4: Feature Importance
        rf_model = models["Random Forest"]
        fi_df = pd.DataFrame({
            "Feature"   : X_test.columns,
            "Importance": rf_model.feature_importances_
        }).sort_values("Importance", ascending=False)
        fi_df.to_excel(writer, sheet_name="Feature_Importance", index=False)
        
        # Lap 5: Predictions (test set) – az első 10,000 sor
        best_name  = max(results, key=lambda k: results[k]["AUC-ROC"])
        pred_df = X_test.copy().head(10000)
        pred_df["True_Label"] = y_test.values[:10000]
        pred_df["Predicted"]  = results[best_name]["y_pred"][:10000]
        pred_df["Fraud_Prob"] = results[best_name]["y_prob"][:10000].round(4)
        pred_df.to_excel(writer, sheet_name="Predictions", index=False)

        # Lap 6: Confusion Matrix
        cm_rows = []
        for name, res in results.items():
            cm = res["confusion_matrix"]
            cm_df = pd.DataFrame(
                cm,
                index=["Actual Normál", "Actual Fraud"],
                columns=["Predicted Normál", "Predicted Fraud"]
            )
            cm_df.insert(0, "Model", name)
            cm_rows.append(cm_df)
        pd.concat(cm_rows).to_excel(writer, sheet_name="Confusion_Matrix", index=True)

    print(f"    Excel mentve: {excel_path}")


# ─────────────────────────────────────────────────────────────────────────────
# 8. ÖSSZEFOGLALÓ NYOMTATÁSA
# ─────────────────────────────────────────────────────────────────────────────

def print_summary(results: dict) -> None:
    print("\n" + "=" * 60)
    print("  VÉGEREDMÉNY – MODELL ÖSSZEHASONLÍTÁS")
    print("=" * 60)
    
    header = f"{'Metrika':<20} {'Logistic Regression':>20} {'Random Forest':>16}"
    print(header)
    print("-" * len(header))
    
    metrics = ["AUC-ROC", "F1 Score", "Precision", "Recall", "Avg Precision"]
    lr_res  = results["Logistic Regression"]
    rf_res  = results["Random Forest"]
    
    for m in metrics:
        lr_val = lr_res[m]
        rf_val = rf_res[m]
        winner = "<< RF nyert" if rf_val > lr_val else ("<< LR nyert" if lr_val > rf_val else "")
        print(f"{m:<20} {lr_val:>20.4f} {rf_val:>16.4f}  {winner}")
    
    print("\n  LinkedIn szöveg:")
    print("  " + "-" * 56)
    best = max(results, key=lambda k: results[k]["AUC-ROC"])
    print(f"""
  Gépi tanulással alapú csalásdetektáló rendszer Pythonban –
  Random Forest + Logistic Regression modellek, SMOTE
  osztályegyensúlyozással, AUC-ROC: {results[best]['AUC-ROC']:.4f}.
  Kaggle Credit Card Fraud adathalmazon, Power BI dashboarddal.
""")
    print("=" * 60)


# ─────────────────────────────────────────────────────────────────────────────
# MAIN
# ─────────────────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    # 1. Adatbetöltés
    df = load_data(DATA_PATH)
    
    # 2. EDA
    run_eda(df)
    
    # 3. Előfeldolgozás
    X_train, X_test, y_train, y_test = preprocess(df)
    
    # 4. Tanítás
    models = train_models(X_train, y_train)
    
    # 5. Kiértékelés
    results = evaluate_models(models, X_test, y_test)
    
    # 6. Dashboard
    plot_dashboard(results, models, X_test, y_test)
    
    # 7. Excel
    export_to_excel(results, models, X_test, y_test)
    
    # 8. Összefoglaló
    print_summary(results)
    
    print(f"\n  Minden output megtalálható: ./{OUTPUT_DIR}/\n")
`;

export const fraudDetectionPortfolioCodeSnippet = String.raw`# =============================================================================
#   FRAUD DETECTION ML MODEL (Részlet)
#   A legfontosabb ML pipeline lépések és kiértékelés
# =============================================================================

import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import roc_auc_score, f1_score, confusion_matrix
from imblearn.over_sampling import SMOTE

# ── KONFIGURÁCIÓ ──────────────────────────────────────────────────────────────
DATA_PATH   = "creditcard.csv"
RANDOM_SEED = 42
TEST_SIZE   = 0.2

# ── ADATBETÖLTÉS ──────────────────────────────────────────────────────────────
print("  Adatok betöltése...")
df = pd.read_csv(DATA_PATH)
print(f"  {df.shape[0]:,} tranzakció, {df['Class'].sum():,} fraud ({df['Class'].mean()*100:.4f}%)")

# ── ELŐFELDOLGOZÁS & SMOTE ────────────────────────────────────────────────────
def preprocess(df):
    """Amount/Time standardizálás, stratifikált split, SMOTE."""
    scaler = StandardScaler()
    df = df.copy()
    df["Amount"] = scaler.fit_transform(df[["Amount"]])
    df["Time"]   = scaler.fit_transform(df[["Time"]])
    
    X = df.drop("Class", axis=1)
    y = df["Class"]
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=TEST_SIZE, stratify=y, random_state=RANDOM_SEED
    )
    
    smote = SMOTE(random_state=RANDOM_SEED)
    X_train_res, y_train_res = smote.fit_resample(X_train, y_train)
    return X_train_res, X_test, y_train_res, y_test

X_train, X_test, y_train, y_test = preprocess(df)

# ── MODELLEK TANÍTÁSA ─────────────────────────────────────────────────────────
def train_models(X_train, y_train):
    """Logistic Regression + Random Forest tanítása SMOTE-olt adatokon."""
    lr = LogisticRegression(max_iter=1000, C=0.01, class_weight="balanced", random_state=42)
    lr.fit(X_train, y_train)
    
    rf = RandomForestClassifier(n_estimators=100, max_depth=12, class_weight="balanced", random_state=42)
    rf.fit(X_train, y_train)
    
    return {"Logistic Regression": lr, "Random Forest": rf}

models = train_models(X_train, y_train)

# ── KIÉRTÉKELÉS ───────────────────────────────────────────────────────────────
def evaluate(models, X_test, y_test):
    """AUC-ROC, F1, Confusion Matrix minden modellre."""
    for name, model in models.items():
        y_pred = model.predict(X_test)
        y_prob = model.predict_proba(X_test)[:, 1]
        auc = roc_auc_score(y_test, y_prob)
        f1  = f1_score(y_test, y_pred)
        cm  = confusion_matrix(y_test, y_pred)
        tn, fp, fn, tp = cm.ravel()
        print(f"\n  {name}: AUC={auc:.4f}, F1={f1:.4f}, Fraud elkapva: {tp}/{tp+fn}")

    # ... (A teljes kód tartalmazza a Matplotlib dashboardot,
    # a Seaborn vizualizációkat és az Excel/Power BI exportot is.)

evaluate(models, X_test, y_test)
`;
