---
id:          PROMPT_EVALUATE_RESEARCH_REPORT
type:        PROMPT
subsystem:   EVALUATION
version:     1.1
status:      ACTIVE
created:     2026-01-24
updated:     2026-02-22
owner_chat:  evaluation-dev
implements:  RESOURCE_EVALUATION_FRAMEWORK_v1.0
---

## CHANGELOG
| Version | Date | Author | Summary |
|---------|------|--------|---------|
| v1.1 | 2026-02-22 | evaluation-dev | Adopt evaluation contract (RESOURCE_EVALUATION_FRAMEWORK v1.0). Add PART VII with canonical EVALUATION_RESULT. Clarify RAMA A (RESEARCH_DEEP_DIVE) coverage alongside RAMA B. |
| v1.0 | 2026-01-24 | JM | Initial version. Four-dimension framework: Source / Claim / Coverage / Methodology. |

## DEPENDENCIES
inputs:  [RESOURCE_EVALUATION_FRAMEWORK, KNOWLEDGE_BASE/SOURCE_AUTHORITY_HIERARCHY, KNOWLEDGE_BASE/CLAIM_VALIDATION_CRITERIA]
outputs: []
calls:   []

---

# PROMPT: EVALUATE_RESEARCH_REPORT

**Propósito:** Evaluar la calidad de RESEARCH_REPORT(s) y RESEARCH_DEEP_DIVE(s) antes de su uso como base para publicaciones  
**Contexto:** Sistema de Investigación "Método Centauro" - Tinta Artificial  
**Inputs:** Uno o múltiples RESEARCH_REPORT o RESEARCH_DEEP_DIVE, SOURCE_AUTHORITY_HIERARCHY, CLAIM_VALIDATION_CRITERIA

---

## PART I: OVERVIEW

### Purpose and Scope

Este prompt evalúa la calidad de uno o múltiples RESEARCH_REPORTs para determinar si son aptos como base para publicaciones (posts, libro, etc.).

**Evaluación en dos dimensiones:**

1. **SOURCE QUALITY:** ¿Las fuentes son autoritativas y apropiadas?
2. **CLAIM QUALITY:** ¿Los claims están adecuadamente sustentados?

**Output:** RESEARCH_EVALUATION_REPORT que permite al editor decidir:
- ¿Puede usarse el report como está?
- ¿Qué secciones requieren refuerzo?
- ¿Qué gaps críticos existen?
- ¿Qué nivel de confianza tiene cada parte del report?

### When to Use This Prompt

**Use cuando:**
- Has completado uno o múltiples RESEARCH_REPORTs (RAMA B) **o** RESEARCH_DEEP_DIVEs (RAMA A)
- Antes de comenzar la fase de escritura
- Quieres validar calidad antes de invertir tiempo editorial
- Quieres identificar secciones que necesitan investigación adicional

**Cobertura por RAMA:**
- **RAMA A (RESEARCH_DEEP_DIVE):** Investigación profunda en una sola sesión. Evaluar con el mismo framework de 4 dimensiones. El RESEARCH_DEEP_DIVE tiene estructura más compacta que el RESEARCH_REPORT; adaptar el muestreo de claims en consecuencia.
- **RAMA B (RESEARCH_REPORT):** Investigación modular multi-sesión. Evaluación individual por report + evaluación colectiva si hay múltiples. Ver Sección "When Evaluating Multiple Reports".

**No uses cuando:**
- Todavía estás en fase de planning
- Quieres evaluar REFERENCE_SUMMARY (usa otros criterios)
- El report está en versión draft muy temprana

### Integration with System

Este prompt es **post-EXECUTE_RESEARCH_PLAN** y **pre-writing**.

```
EXECUTE_RESEARCH_PLAN v1.0
         ↓
   RESEARCH_REPORT(s)
         ↓
→ EVALUATE_RESEARCH_REPORT v1.0 ← (este prompt)
         ↓
   EVALUATION_REPORT
         ↓
   Decisión del Editor:
   - Aprobar para escritura
   - Solicitar refuerzo de secciones
   - Iterar investigación
```

---

## PART II: INPUTS REQUIRED

### 1. RESEARCH_REPORT(s)

**Uno o múltiples research reports a evaluar.**

**Nombre típico:** `RESEARCH_REPORT_[TOPIC]_[FOCUS]_v[X.Y].md`

**Estructura esperada:**
- Section 0: METADATA
- Section 1: EXECUTIVE SUMMARY
- Section 2: INTRODUCTION
- Sections 3-N: BODY (varía según template)
- Section N: METHODOLOGY
- Section N+1: SYNTHESIS, CONCLUSIONS, IMPLICATIONS
- Section N+2: TIMELINE AND CAST
- REFERENCES
- APPENDICES (opcional)

**Si múltiples reports:** Evaluar cada uno individualmente y luego evaluar conjunto.

### 2. SOURCE_AUTHORITY_HIERARCHY

**Versión global actualizada con el tema del report.**

**Uso:** Verificar que fuentes en report coinciden con jerarquía establecida.

**Secciones relevantes por tema:**
- Tier 1-3 sources del tema específico
- Search Strategy del tema
- Validation Checks del tema
- Red Flags del tema

### 3. CLAIM_VALIDATION_CRITERIA

**Framework conceptual de validación.**

**Uso:** Evaluar si claims en report cumplen criterios de evidencia.

**Secciones relevantes:**
- Evidence Sufficiency Guidelines
- Confidence Level Definitions (STRONG/MODERATE/TENTATIVE/SPECULATIVE)
- Red Flags for Claims

### 4. METADATA DEL PROCESO (opcional pero recomendado)

Si disponible, proveer:
- RESEARCH_PLAN_DETAILED (para entender intención original)
- Tiempo invertido en investigación
- Número de iteraciones
- Research jobs ejecutados

---

## PART III: EVALUATION FRAMEWORK

### Evaluation Dimensions

**DIMENSION 1: SOURCE QUALITY**
- Source Authority Distribution (% Tier 1, 2, 3)
- Source Diversity (disciplines, geographies, perspectives)
- Source Currency (recency for time-sensitive topics)
- Source Alignment (adherence to SOURCE_AUTHORITY_HIERARCHY)

**DIMENSION 2: CLAIM QUALITY**
- Evidence Strength Distribution (% STRONG, MODERATE, TENTATIVE, SPECULATIVE)
- Citation Density (claims per reference, over/under-citation)
- Claim-Evidence Alignment (does evidence actually support claim?)
- Validation Compliance (adherence to CLAIM_VALIDATION_CRITERIA)

**DIMENSION 3: COVERAGE QUALITY**
- Disciplinary Coverage (all relevant fields represented?)
- Perspective Coverage (all major schools of thought represented?)
- Geographic Coverage (if relevant: local/regional perspectives)
- Temporal Coverage (historical context + current state)

**DIMENSION 4: METHODOLOGICAL QUALITY**
- Transparency (methodology section clear and complete?)
- Limitations (acknowledged and reasonable?)
- Gaps (identified and assessed?)
- Consistency (methods match stated approach?)

### Quality Thresholds

**PUBLICATION-READY (Green Light):**
- ≥50% Tier 1 sources for central claims
- ≥60% STRONG + MODERATE confidence claims
- All major perspectives represented
- No critical gaps unaddressed
- Methodology transparent

**NEEDS REFINEMENT (Yellow Light):**
- 30-50% Tier 1 sources
- 40-60% STRONG + MODERATE confidence
- Most major perspectives represented
- Some critical gaps identified
- Methodology mostly clear

**REQUIRES REWORK (Red Light):**
- <30% Tier 1 sources
- <40% STRONG + MODERATE confidence
- Major perspectives missing
- Critical gaps unaddressed
- Methodology unclear or problematic

---

## PART IV: EVALUATION PROCESS

### STEP 0: SETUP AND VERIFICATION

**Actions:**

1. **Request filenames:**
   ```
   "Please provide:
   1. RESEARCH_REPORT filename(s): _________________
   2. SOURCE_AUTHORITY_HIERARCHY filename: _________________
   3. CLAIM_VALIDATION_CRITERIA filename: _________________
   4. [Optional] RESEARCH_PLAN_DETAILED: _________________
   5. [Optional] Process metadata (time, iterations, etc.): _________________"
   ```

2. **Verify access to all files**
   - Read each file to confirm accessibility
   - Note versions of each document

3. **Understand evaluation scope**
   ```
   "Evaluating:
   - Report(s): [list]
   - Topic: [extract from report metadata]
   - Focus: [extract from report metadata]
   - For use in: [Post / Book chapter / Other - ask editor]"
   ```

---

### STEP 1: SOURCE QUALITY ANALYSIS

**Objective:** Assess the quality, diversity, and appropriateness of sources used.

#### 1.1 Extract All Sources

**From RESEARCH_REPORT → REFERENCES section:**

For each reference [N]:
1. Extract: Author(s), Title, Venue, Year, URL/DOI
2. Categorize: Type (journal, book, report, news, blog, etc.)
3. Identify: Primary author credentials (if stated or inferable)
4. Identify: Publishing institution/platform

**Create master list:**
```markdown
## Source Inventory

[1] Author A et al. (2024). "Title". *Journal of X*. [Tier TBD]
[2] Author B. (2023). "Title". *Conference Proceedings Y*. [Tier TBD]
[3] Author C. (2025). "Title". Blog Post. [Tier TBD]
...
```

#### 1.2 Classify Sources by Tier

**Using SOURCE_AUTHORITY_HIERARCHY for the topic:**

For each source:
1. **Check if already in hierarchy:** If source is listed → use that Tier
2. **If not listed:** Apply Tier Classification Criteria:
   
   **Tier 1 indicators:**
   - Peer-reviewed journal in top quartile of field
   - Book from academic press with peer review
   - Report from authoritative institution (e.g., IPCC, national academy)
   - Seminal work widely cited (>500 citations for recent, >1000 for older)
   
   **Tier 2 indicators:**
   - Peer-reviewed journal (not top quartile but reputable)
   - Industry reports from established firms
   - Conference proceedings from major conferences
   - Books from reputable publishers (non-peer-reviewed)
   - Working papers from known institutions
   
   **Tier 3 indicators:**
   - Credible journalism (major outlets)
   - Professional/trade publications
   - Technical blogs from recognized experts
   - Grey literature from credible organizations
   - Preprints (if from authors with track record)

**Document classification:**
```markdown
## Source Classification

**Tier 1 Sources (N sources, X% of total):**
[1] Author A et al. (2024). *Journal of X*. 
    Rationale: Peer-reviewed, top quartile journal (Impact Factor 8.3)

**Tier 2 Sources (N sources, X% of total):**
[2] Author B. (2023). *Conference Proceedings Y*.
    Rationale: Major conference, peer-reviewed proceedings

**Tier 3 Sources (N sources, X% of total):**
[3] Author C. (2025). Expert Blog.
    Rationale: Industry expert (20+ years), credible platform

**Unclassified / Problematic (N sources, X% of total):**
[Note any sources that don't fit or are questionable]
```

#### 1.3 Analyze Source Distribution

**Quantitative metrics:**

1. **Overall distribution:**
   - Total sources: [N]
   - Tier 1: [N] ([X]%)
   - Tier 2: [N] ([X]%)
   - Tier 3: [N] ([X]%)
   - Unclassified: [N] ([X]%)

2. **Distribution by report section:**
   
   Analyze which sections use which tiers:
   ```markdown
   Section 3: [Topic A - High priority]
   - Tier 1: 60% (✓ Good)
   - Tier 2: 30%
   - Tier 3: 10%
   
   Section 4: [Topic B - Medium priority]
   - Tier 1: 30%
   - Tier 2: 50%
   - Tier 3: 20% (⚠ Consider upgrading if possible)
   ```

3. **Source currency (if time-sensitive topic):**
   - Sources from last 2 years: [X]%
   - Sources from 2-5 years: [X]%
   - Sources >5 years: [X]%
   - Seminal/foundational works (expected to be older): [list]

**Qualitative assessment:**

1. **Source diversity - Disciplines:**
   
   List disciplines represented:
   - Computer Science: [N] sources
   - Economics: [N] sources
   - Sociology: [N] sources
   - [etc.]
   
   **Assessment:** Are all relevant disciplines present? Any glaring omissions?

2. **Source diversity - Perspectives:**
   
   Identify schools of thought or approaches:
   - Perspective A (e.g., "Behavioral Economics"): [N] sources
   - Perspective B (e.g., "Neoclassical"): [N] sources
   - Perspective C: [N] sources
   
   **Assessment:** Are multiple perspectives represented or is there bias toward one view?

3. **Source diversity - Geography:**
   
   If relevant to topic:
   - North American sources: [N]
   - European sources: [N]
   - Asian sources: [N]
   - Latin American sources: [N]
   - Other: [N]
   
   **Assessment:** Is geographic diversity appropriate for the topic?

4. **Institutional diversity:**
   
   - Academic institutions: [N]
   - Industry/Corporate: [N]
   - Government/Policy: [N]
   - NGO/Think tanks: [N]
   - Independent: [N]
   
   **Assessment:** Healthy mix or dominated by one type?

#### 1.4 Check Alignment with SOURCE_AUTHORITY_HIERARCHY

**Compare report sources with hierarchy:**

1. **Sources that should have been used (from hierarchy) but weren't:**
   
   List Tier 1 sources from hierarchy that are relevant but absent from report:
   ```markdown
   **Missing Tier 1 Sources:**
   - [Source X from hierarchy]: Relevant to [section of report]
     Reason missing: [Unknown / Hard to access / Possibly overlooked]
   ```

2. **Sources used that aren't in hierarchy:**
   
   This is often expected (new sources), but note:
   - Are they appropriate additions? (Should be added to hierarchy)
   - Are they lower quality than hierarchy sources? (Red flag)

3. **Validation checks performed:**
   
   From hierarchy's "Validation Checks" section for this topic:
   - Check 1: [Was it performed in the report?]
   - Check 2: [Was it performed?]
   - Check 3: [Was it performed?]

4. **Red flags from hierarchy:**
   
   From hierarchy's "Red Flags" section:
   - Red Flag 1: [Did report avoid this?]
   - Red Flag 2: [Did report avoid this?]

#### 1.5 Identify Key Authors and Their Credentials

**Extract and categorize authors:**

**Primary authors (cited multiple times or for central claims):**

```markdown
1. **Author Name A**
   - Credentials: PhD, Professor at University X
   - Discipline: Computer Science / AI Ethics
   - Institution: University X (Tier 1 research institution)
   - Citations in report: 5 times
   - Tier of sources: Primarily Tier 1
   - School of thought: Interpretability-focused AI safety

2. **Author Name B**
   - Credentials: Industry researcher, 15 years experience
   - Discipline: Machine Learning Engineering
   - Institution: Company Y
   - Citations in report: 3 times
   - Tier of sources: Mix of Tier 1-2
   - School of thought: Capabilities-focused AI development
```

**Assessment:**
- Are key authors credible and authoritative?
- Are authors from diverse backgrounds and perspectives?
- Any problematic authors (conflicts of interest, discredited work)?

---

### STEP 2: CLAIM QUALITY ANALYSIS

**Objective:** Assess how well claims are supported by evidence.

#### 2.1 Extract All Claims

**From report body sections (3-N):**

A "claim" is any factual assertion. Identify claims by type:

**Type A - Empirical claims:**
"Studies show X increases Y by 30%"
"Adoption rate has grown from 10% to 45% since 2020"

**Type B - Conceptual claims:**
"Theory X posits that Y causes Z"
"Researchers define W as..."

**Type C - Causal claims:**
"X causes Y"
"Implementing A led to outcome B"

**Type D - Evaluative claims:**
"Approach X is more effective than Y"
"Method A has significant limitations"

**For evaluation, sample strategically:**
- All claims in Executive Summary
- All claims in central sections (Sections 3-5 typically)
- Sample of claims in secondary sections
- All claims in Conclusions

**Create claim inventory:**
```markdown
## Claim Inventory

### Section 1: Executive Summary

**Claim 1.1:** "Smart building adoption increased 45% between 2020-2023" [1,3,5]
- Type: Empirical
- Evidence: [1] Tier 1, [3] Tier 2, [5] Tier 2
- Confidence stated in report: STRONG

**Claim 1.2:** "Centralized control systems are more energy-efficient than distributed ones" [7,12]
- Type: Evaluative
- Evidence: [7] Tier 2, [12] Tier 3
- Confidence stated in report: MODERATE
```

#### 2.2 Evaluate Evidence for Each Claim

**For each claim, assess:**

1. **Number of sources:**
   - 0 sources: ❌ CRITICAL FAILURE
   - 1 source: ⚠️ Weak (unless Tier 1 + recent + comprehensive)
   - 2-3 sources: ✓ Adequate if from different origins
   - 4+ sources: ✓ Strong

2. **Tier distribution of sources:**
   - All/mostly Tier 1: ✓✓ Excellent
   - Mix Tier 1-2: ✓ Good
   - Mostly Tier 2: ⚠️ Adequate for non-critical claims
   - Contains Tier 3 only: ⚠️ Weak (acceptable for context/examples only)
   - No high-tier sources: ❌ Problematic

3. **Evidence type match:**
   
   Does evidence actually support claim type?
   
   **For empirical claims:** Need quantitative data, studies with methodology
   **For conceptual claims:** Need theoretical papers, definitions from authorities
   **For causal claims:** Need experimental or quasi-experimental evidence, meta-analyses
   **For evaluative claims:** Need comparative studies or comprehensive reviews

4. **Recency (if relevant):**
   
   For time-sensitive claims, are sources current?

5. **Convergence:**
   
   Do multiple sources agree or is there contradiction?
   - Convergent: ✓ Strengthens claim
   - Divergent with explanation: ✓ Acceptable (report should note debate)
   - Divergent without explanation: ⚠️ Problem

**Apply CLAIM_VALIDATION_CRITERIA:**

From CLAIM_VALIDATION_CRITERIA document, check:

**Evidence Sufficiency:**
- Does claim meet criteria for its stated confidence level?
- If claim is STRONG, is evidence actually strong (multiple Tier 1, convergent)?
- If claim is MODERATE, is evidence moderate (mix of tiers, or fewer sources)?

**Red Flags:**
- Check if claim exhibits any red flags from criteria document
- Examples: Overgeneralization, correlation ≠ causation, cherry-picking

#### 2.3 Assess Confidence Level Accuracy

**Compare stated vs. appropriate confidence:**

```markdown
## Confidence Level Assessment

**Claim 1.1:** "Smart building adoption increased 45%"
- Stated confidence: STRONG
- Evidence: 3 sources (1 Tier 1, 2 Tier 2), convergent, recent
- Appropriate confidence: STRONG ✓
- Assessment: Correctly labeled

**Claim 1.2:** "Centralized systems more efficient"
- Stated confidence: MODERATE
- Evidence: 2 sources (1 Tier 2, 1 Tier 3), limited
- Appropriate confidence: TENTATIVE
- Assessment: OVERSTATED ⚠️
- Recommendation: Downgrade to TENTATIVE or add Tier 1 sources
```

#### 2.4 Calculate Claim Quality Metrics

**Quantitative distribution:**

```markdown
## Claim Confidence Distribution

Total claims evaluated: [N]

**By stated confidence:**
- STRONG: [N] ([X]%)
- MODERATE: [N] ([X]%)
- TENTATIVE: [N] ([X]%)
- SPECULATIVE: [N] ([X]%)

**By appropriate confidence (after evaluation):**
- STRONG: [N] ([X]%)
- MODERATE: [N] ([X]%)
- TENTATIVE: [N] ([X]%)
- SPECULATIVE: [N] ([X]%)

**Mismatch analysis:**
- Claims overstated: [N] ([X]%)
- Claims understated: [N] ([X]%)
- Claims correctly stated: [N] ([X]%)
```

**By section:**

Identify which sections are strong vs. weak:
```markdown
Section 3: [Core Topic]
- Appropriate STRONG/MODERATE: 75% ✓ Good
- Overstated: 15%
- Understated: 10%

Section 4: [Secondary Topic]
- Appropriate STRONG/MODERATE: 40% ⚠️ Weak
- Overstated: 30% ⚠️ Concerning
- Understated: 30%
```

---

### STEP 3: COVERAGE QUALITY ANALYSIS

**Objective:** Assess whether all relevant perspectives, disciplines, and approaches are covered.

#### 3.1 Identify Relevant Disciplines

**From report content + domain knowledge:**

List all disciplines that SHOULD be involved in this topic:
```markdown
## Expected Disciplines

1. **Computer Science** (core discipline for AI topic)
2. **Ethics / Philosophy** (for normative questions)
3. **Sociology** (for social impact)
4. **Economics** (for market dynamics)
5. **Law / Policy** (for regulatory aspects)
6. [etc.]
```

#### 3.2 Assess Disciplinary Representation

**For each discipline:**

```markdown
## Disciplinary Coverage

**1. Computer Science**
- Sources: [N] (Tier 1: X, Tier 2: Y, Tier 3: Z)
- Coverage: Comprehensive ✓
- Key subtopics: Machine learning, interpretability, robustness
- Assessment: Well-represented

**2. Ethics / Philosophy**
- Sources: [N] (Tier 1: X, Tier 2: Y, Tier 3: Z)
- Coverage: Limited ⚠️
- Key subtopics: Only consequentialist ethics; deontological absent
- Assessment: Needs expansion

**3. Law / Policy**
- Sources: 0
- Coverage: Absent ❌
- Key subtopics: N/A
- Assessment: CRITICAL GAP if policy implications are discussed
```

**Overall disciplinary balance:**
- Core disciplines well-covered: [Yes/No]
- Peripheral disciplines represented: [Yes/No]
- Unjustified absences: [List]

#### 3.3 Identify Schools of Thought / Perspectives

**For the topic, what are the major perspectives or approaches?**

Example for AI Safety topic:
```markdown
## Schools of Thought

**Identified approaches:**

1. **Technical AI Safety (Alignment-focused)**
   - Representative authors: [names]
   - Sources: [N]
   - Representation: HIGH ✓

2. **Governance / Policy Approach**
   - Representative authors: [names]
   - Sources: [N]
   - Representation: MODERATE ✓

3. **AI Capabilities Advancement Perspective**
   - Representative authors: [names]
   - Sources: [N]
   - Representation: LOW ⚠️
   - Note: This is a significant perspective but underrepresented

4. **AI Ethics / Justice Perspective**
   - Representative authors: [names]
   - Sources: [N]
   - Representation: ABSENT ❌
   - Note: Critical omission given social impact focus in report
```

#### 3.4 Assess Perspective Balance

**Evaluate representation:**

```markdown
## Perspective Balance Assessment

**Balanced representation (multiple perspectives substantively covered):**
- [Yes/No]

**Dominant perspective(s):**
- [Identify if report skews heavily toward one view]
- Is dominance justified by: Topic focus / Evidence base / Other

**Underrepresented perspectives:**
- [List perspectives that should have more coverage]
- Severity: CRITICAL / SIGNIFICANT / MINOR

**Missing perspectives:**
- [List perspectives entirely absent but relevant]
- Severity: CRITICAL / SIGNIFICANT / MINOR
```

#### 3.5 Geographic and Temporal Coverage (if relevant)

**Geographic coverage:**

If topic has regional variation or local perspectives matter:
```markdown
## Geographic Coverage

**Represented:**
- North America: HIGH
- Europe: MODERATE
- Asia: LOW ⚠️
- Latin America: ABSENT
- Africa: ABSENT

**Assessment:**
- Appropriate for topic? [If topic is global → gaps are problematic]
- Justified absences? [If research on topic is NA/EU-centric → acceptable]
```

**Temporal coverage:**

```markdown
## Temporal Coverage

**Historical context:**
- Foundational work (pre-2010): [N sources]
- Establishment period (2010-2020): [N sources]
- Recent developments (2020-present): [N sources]

**Assessment:**
- Adequate historical grounding? [Yes/No]
- Up-to-date on current state? [Yes/No]
- Balance past vs. present appropriate? [Yes/No]
```

---

### STEP 4: METHODOLOGICAL QUALITY ANALYSIS

**Objective:** Assess transparency and rigor of research methodology.

#### 4.1 Review Methodology Section

**From RESEARCH_REPORT → Section N: METHODOLOGY:**

Check for presence and quality of:

1. **Research Design:**
   - Clearly stated? [Yes/No]
   - Appropriate for topic? [Yes/No]
   - Matches actual execution? [Yes/No]

2. **Sources and Search Strategy:**
   - Tier distribution documented? [Yes/No]
   - Databases/platforms listed? [Yes/No]
   - Keywords/search terms provided? [Yes/No]
   - Saturation criteria explained? [Yes/No]

3. **Validation Approach:**
   - References SOURCE_AUTHORITY_HIERARCHY? [Yes/No]
   - References CLAIM_VALIDATION_CRITERIA? [Yes/No]
   - Confidence levels explained? [Yes/No]

4. **Limitations:**
   - Acknowledged? [Yes/No]
   - Specific and substantive? [Yes/No]
   - Include: Language barriers, access issues, time constraints, gaps

5. **Quality Metrics:**
   - Confidence distribution provided? [Yes/No]
   - Tier 1 percentage stated? [Yes/No]
   - Sources per claim metric? [Yes/No]

#### 4.2 Assess Transparency

**Score transparency (High / Medium / Low):**

**HIGH transparency:**
- All methodology elements present
- Clear documentation of search process
- Limitations explicitly stated
- Quality metrics provided

**MEDIUM transparency:**
- Most elements present
- Some documentation gaps
- Limitations mentioned but vague
- Some metrics missing

**LOW transparency:**
- Methodology section incomplete or absent
- Search process unclear
- Limitations not addressed
- No metrics

#### 4.3 Check for Gaps Identification

**From report, are gaps identified?**

```markdown
## Gaps Identified in Report

**Research gaps (topics not covered due to lack of sources):**
1. Gap A: [Description]
   - Impact: CRITICAL / SIGNIFICANT / MINOR
   - Acknowledged in report? [Yes/No]

**Methodological gaps (limitations of approach):**
1. Gap B: [Description]
   - Impact: CRITICAL / SIGNIFICANT / MINOR
   - Acknowledged in report? [Yes/No]
```

**Assess gap handling:**
- Are all critical gaps identified and acknowledged? [Yes/No]
- Are gaps justified (genuinely no research vs. oversight)? [Yes/No]

---

### STEP 5: SYNTHESIS AND OVERALL ASSESSMENT

**Objective:** Integrate all analyses into coherent evaluation with clear recommendations.

#### 5.1 Calculate Overall Scores

**Source Quality Score:**

Weighted formula:
- Tier 1 %: Weight 0.5
- Source diversity (disciplines): Weight 0.2
- Source diversity (perspectives): Weight 0.2
- Alignment with hierarchy: Weight 0.1

Example:
```
Source Quality Score = (0.6 * 0.5) + (0.8 * 0.2) + (0.7 * 0.2) + (0.9 * 0.1)
                     = 0.30 + 0.16 + 0.14 + 0.09
                     = 0.69 (69%)
```

Interpretation:
- ≥70%: EXCELLENT
- 60-69%: GOOD
- 50-59%: ADEQUATE
- 40-49%: WEAK
- <40%: POOR

**Claim Quality Score:**

Weighted formula:
- Appropriate STRONG+MODERATE %: Weight 0.5
- Claim-evidence alignment: Weight 0.3
- Confidence accuracy (1 - overstatement %): Weight 0.2

Example:
```
Claim Quality Score = (0.65 * 0.5) + (0.75 * 0.3) + (0.85 * 0.2)
                    = 0.325 + 0.225 + 0.17
                    = 0.72 (72%)
```

Interpretation: Same as above

**Coverage Quality Score:**

Qualitative assessment → convert to score:
- All major disciplines + perspectives represented: 100%
- Most represented, minor gaps: 80%
- Significant gaps in disciplines or perspectives: 60%
- Critical gaps or major bias: 40%
- Severely incomplete: <40%

**Methodological Quality Score:**

Based on transparency + gap identification:
- High transparency + all gaps identified: 100%
- Medium transparency + most gaps identified: 75%
- Low transparency or major gaps unidentified: 50%
- Methodology unclear and gaps hidden: <50%

#### 5.2 Overall Quality Rating

**Aggregate all scores:**

```markdown
## Overall Quality Scores

| Dimension | Score | Rating |
|-----------|-------|--------|
| Source Quality | 69% | GOOD |
| Claim Quality | 72% | GOOD |
| Coverage Quality | 60% | ADEQUATE |
| Methodological Quality | 75% | GOOD |
| **OVERALL** | **69%** | **GOOD** |
```

**Overall Rating:**
- Average: 69% → GOOD
- No dimension below 50% → No critical failures
- One dimension ADEQUATE (Coverage) → Recommendation: Address gaps

#### 5.3 Publication Readiness Assessment

**Based on thresholds from Part III:**

```markdown
## Publication Readiness

**Status:** NEEDS REFINEMENT (Yellow Light) ⚠️

**Rationale:**
- Source Quality: GOOD (✓)
- Claim Quality: GOOD (✓)
- Coverage Quality: ADEQUATE (⚠️ - perspective gaps)
- Methodological Quality: GOOD (✓)

**Recommendation:** Address coverage gaps before using as publication base.
Specifically:
1. Add sources from [missing perspective X]
2. Expand coverage of [discipline Y]
3. Balance geographic representation (if relevant)

**Estimated effort:** 4-8 hours additional research
```

#### 5.4 Strengths and Weaknesses

**List top strengths:**
```markdown
## Strengths

1. **Strong source base:** 60% Tier 1 sources, excellent for core claims
2. **High claim accuracy:** 85% of confidence levels correctly assigned
3. **Transparent methodology:** Clear documentation of process
4. **Good disciplinary diversity:** Core fields well-represented
5. **Recent sources:** 70% from last 3 years, appropriate for fast-moving field
```

**List top weaknesses:**
```markdown
## Weaknesses

1. **Perspective imbalance:** Over-representation of [approach X], under-representation of [approach Y]
2. **Geographic gaps:** Minimal coverage of [region], relevant given global scope
3. **Missing sub-discipline:** [Field Z] not represented despite relevance to Sections 4-5
4. **Some overconfident claims:** 15% of claims overstated (Sections 6-7 particularly)
5. **Limited practitioner perspectives:** Mostly academic sources, few industry voices
```

#### 5.5 Critical Gaps and Risks

**Identify any critical issues:**

```markdown
## Critical Gaps

**GAP 1: [Missing perspective X]**
- Severity: CRITICAL
- Sections affected: 3, 5, 7
- Impact on publication: Claims in these sections may be one-sided
- Recommendation: Add 3-5 sources from this perspective, revise affected claims
- Effort: 6-8 hours

**GAP 2: [Discipline Y absent]**
- Severity: SIGNIFICANT
- Sections affected: 4
- Impact on publication: Incomplete analysis of [topic]
- Recommendation: Add 2-3 sources, expand Section 4.2
- Effort: 3-4 hours
```

```markdown
## Risks for Publication

**RISK 1: Potential bias perception**
- Issue: Over-reliance on [perspective X] may make report appear biased
- Likelihood: MEDIUM
- Impact: MEDIUM
- Mitigation: Balance with alternative perspectives

**RISK 2: Claim overstatement**
- Issue: 15% of claims overstated, particularly in Sections 6-7
- Likelihood: HIGH (will be noticed by critical readers)
- Impact: MEDIUM (credibility hit)
- Mitigation: Downgrade confidence levels or strengthen evidence
```

---

## PART V: OUTPUT SPECIFICATIONS

### Document Structure

**Filename:** `RESEARCH_EVALUATION_REPORT_[TOPIC]_[DATE].md`

**Complete structure:**

```markdown
# RESEARCH EVALUATION REPORT: [Topic]

**Metadata:**
- Report(s) Evaluated: [filenames]
- Evaluation Date: [date]
- Evaluator: [if human-assisted, note]
- Evaluation Framework: EVALUATE_RESEARCH_REPORT v1.0
- Intended Use: [Post / Book chapter / Other]

---

## EXECUTIVE SUMMARY

[2-3 paragraphs synthesizing key findings]

**Overall Rating:** [PUBLICATION-READY / NEEDS REFINEMENT / REQUIRES REWORK]

**Key Strengths:** [3-5 bullet points]

**Key Weaknesses:** [3-5 bullet points]

**Recommendation:** [Clear action items]

---

## SECTION 1: SOURCE QUALITY ANALYSIS

### 1.1 Source Classification and Distribution
[From Step 1.2-1.3]

### 1.2 Source Diversity
[From Step 1.3 qualitative]

### 1.3 Alignment with SOURCE_AUTHORITY_HIERARCHY
[From Step 1.4]

### 1.4 Key Authors Assessment
[From Step 1.5]

**Source Quality Score:** [XX%] - [RATING]

---

## SECTION 2: CLAIM QUALITY ANALYSIS

### 2.1 Claim Inventory Summary
[High-level overview from Step 2.1]

### 2.2 Evidence Strength Assessment
[From Step 2.2]

### 2.3 Confidence Level Accuracy
[From Step 2.3-2.4]

**Claim Quality Score:** [XX%] - [RATING]

---

## SECTION 3: COVERAGE QUALITY ANALYSIS

### 3.1 Disciplinary Coverage
[From Step 3.1-3.2]

### 3.2 Perspective Balance
[From Step 3.3-3.4]

### 3.3 Geographic and Temporal Coverage
[From Step 3.5]

**Coverage Quality Score:** [XX%] - [RATING]

---

## SECTION 4: METHODOLOGICAL QUALITY ANALYSIS

### 4.1 Transparency Assessment
[From Step 4.1-4.2]

### 4.2 Gap Identification and Handling
[From Step 4.3]

**Methodological Quality Score:** [XX%] - [RATING]

---

## SECTION 5: OVERALL ASSESSMENT

### 5.1 Quality Scores Summary
[Table from Step 5.1-5.2]

### 5.2 Publication Readiness
[From Step 5.3]

### 5.3 Strengths
[From Step 5.4]

### 5.4 Weaknesses
[From Step 5.4]

### 5.5 Critical Gaps and Risks
[From Step 5.5]

---

## SECTION 6: RECOMMENDATIONS

### 6.1 Required Actions (before publication)
[List with estimated effort]

### 6.2 Suggested Improvements (optional but valuable)
[List with estimated effort]

### 6.3 Section-Specific Notes
[Any specific guidance for using certain sections]

---

## APPENDICES

### Appendix A: Detailed Source Inventory
[Complete list with Tiers]

### Appendix B: Claim-by-Claim Analysis (sample)
[Detailed breakdown for key claims]

### Appendix C: Methodology Section Review
[Extracted methodology with annotations]
```

---

## PART VI: USAGE NOTES

### For the Editor

**When to act on this evaluation:**

**GREEN LIGHT (Publication-Ready):**
- Proceed to writing phase
- Use report with confidence
- Minor refinements can be made during writing

**YELLOW LIGHT (Needs Refinement):**
- Prioritize critical gaps identified in Section 6.1
- Allocate additional research time (typically 4-12 hours)
- Re-evaluate after refinements (optional: run this prompt again)
- Can begin outline while refinements happen

**RED LIGHT (Requires Rework):**
- Do NOT proceed to writing
- Extensive additional research required (12+ hours)
- Consider whether research plan needs revision
- May need to re-run EXECUTE_RESEARCH_PLAN with adjusted scope

### When Evaluating Multiple Reports

If evaluating multiple reports together (e.g., 3 reports with different foci on same topic for a book project):

**PROCESS:**

#### Phase 1: Individual Evaluation

Evaluate each report independently using Steps 1-5.

**Output per report:**
- Individual quality scores (4 dimensions)
- Individual publication readiness
- Individual strengths/weaknesses
- Individual critical gaps

#### Phase 2: Cross-Report Analysis

**STEP 6: MULTI-REPORT INTEGRATION ANALYSIS**

**Objective:** Assess how reports work together as a collection.

---

**6.1 COVERAGE INTEGRATION**

**Map each report's coverage:**

```markdown
## Coverage Map

| Topic/Subtopic | Report 1 (Historical) | Report 2 (State of Art) | Report 3 (Practical) |
|----------------|----------------------|------------------------|---------------------|
| Foundational concepts | ✓✓ PRIMARY | ✓ MENTIONED | ✗ NOT COVERED |
| Evolution 2000-2020 | ✓✓ PRIMARY | ✓ CONTEXT | ✗ NOT COVERED |
| Current approaches | ✓ CONTEXT | ✓✓ PRIMARY | ✓ MENTIONED |
| Methodology debates | ✓ MENTIONED | ✓✓ PRIMARY | ✗ NOT COVERED |
| Implementation cases | ✗ NOT COVERED | ✓ MENTIONED | ✓✓ PRIMARY |
| Best practices | ✗ NOT COVERED | ✓ MENTIONED | ✓✓ PRIMARY |
| Future directions | ✓ MENTIONED | ✓✓ PRIMARY | ✓ MENTIONED |
```

**Identify coverage patterns:**
- ✓✓ PRIMARY: Main focus of the report
- ✓ MENTIONED: Covered but not primary
- ✗ NOT COVERED: Not addressed

**Assess collective coverage:**

```markdown
## Collective Coverage Assessment

**Comprehensive coverage (all topics have PRIMARY in at least one report):**
- [Yes/No]

**Coverage gaps (topics with no PRIMARY coverage):**
- [List any topics that should be PRIMARY somewhere but aren't]

**Redundant coverage (topics PRIMARY in multiple reports):**
- [List topics that are PRIMARY in 2+ reports]
- Assessment: Is redundancy justified (different angles) or wasteful?

**Complementarity score:**
- Reports complement each other well: 85%
- Minimal wasteful overlap: 90%
- Good distribution of focus: 80%
- **Overall Complementarity: 85%** (GOOD ✓)
```

---

**6.2 DISCIPLINARY AND PERSPECTIVE INTEGRATION**

**Aggregate disciplines across all reports:**

```markdown
## Collective Disciplinary Coverage

| Discipline | Report 1 | Report 2 | Report 3 | COLLECTIVE |
|------------|----------|----------|----------|------------|
| Computer Science | 15 sources | 25 sources | 10 sources | 50 sources ✓✓ |
| Economics | 8 sources | 5 sources | 12 sources | 25 sources ✓ |
| Sociology | 3 sources | 8 sources | 2 sources | 13 sources ⚠️ |
| Law/Policy | 0 sources | 2 sources | 1 source | 3 sources ❌ |
| Ethics | 5 sources | 10 sources | 0 sources | 15 sources ✓ |

**Assessment:**
- Even individually weak, collectively STRONG: [List disciplines]
- Even collectively weak: Law/Policy (3 sources across 3 reports)
- Well-distributed vs. concentrated: [Analysis]
```

**Aggregate perspectives/schools of thought:**

```markdown
## Collective Perspective Balance

| Perspective | Report 1 | Report 2 | Report 3 | COLLECTIVE |
|-------------|----------|----------|----------|------------|
| Technical Safety | LOW | HIGH | MODERATE | HIGH ✓✓ |
| Governance | ABSENT | MODERATE | LOW | MODERATE ✓ |
| Capabilities | MODERATE | LOW | HIGH | HIGH ✓✓ |
| Ethics/Justice | LOW | HIGH | ABSENT | MODERATE ✓ |
| Industry/Market | ABSENT | LOW | HIGH | MODERATE ✓ |

**Assessment:**
- Collectively balanced? [Yes - all major perspectives represented]
- Any perspective still underrepresented? [No]
- Any unjustified concentration? [No - distribution makes sense given foci]
```

---

**6.3 SOURCE INTEGRATION AND DEDUPLICATION**

**Aggregate all sources across reports:**

```markdown
## Source Deduplication Analysis

**Total source citations across all reports:** 180
**Unique sources:** 95
**Duplication rate:** 47% (85 duplicate citations)

**Analysis of duplication:**

**High duplication (same source cited in all 3 reports):**
- Source [1]: Cited 6 times total (2+2+2)
- Source [5]: Cited 5 times total (2+2+1)
- Source [12]: Cited 4 times total (2+1+1)
- Assessment: Foundational sources, duplication justified ✓

**Moderate duplication (same source in 2 reports):**
- [N] sources duplicated across 2 reports
- Assessment: [Justified - different aspects covered / Wasteful overlap]

**Unique to each report:**
- Report 1 unique sources: 25
- Report 2 unique sources: 35
- Report 3 unique sources: 20
- Total unique sources: 80
- Assessment: Good - each report contributes new sources

**Collective source quality:**

| Tier | Report 1 | Report 2 | Report 3 | UNIQUE COLLECTIVE |
|------|----------|----------|----------|-------------------|
| Tier 1 | 20 (50%) | 30 (60%) | 15 (50%) | 45 sources (47%) |
| Tier 2 | 15 (38%) | 15 (30%) | 18 (60%) | 38 sources (40%) |
| Tier 3 | 5 (12%) | 5 (10%) | 3 (10%) | 12 sources (13%) |

**Collective source quality: 47% Tier 1** (vs. individual: 50%, 60%, 50%)
- Assessment: GOOD - slightly below best individual but still strong
```

---

**6.4 CLAIM CONSISTENCY AND CONTRADICTIONS**

**Check for contradictions across reports:**

```markdown
## Inter-Report Claim Consistency

**Method:** Compare claims on same topics across reports

**Claim reconciliation:**

**TOPIC: Adoption rates of technology X**

- Report 1 (Historical): "Adoption was 10% in 2015, 25% in 2020" [5,8] - STRONG
- Report 2 (State of Art): "Current adoption is approximately 45%" [12,15,18] - STRONG
- Report 3 (Practical): "Adoption in surveyed companies: 48%" [22] - MODERATE

**Consistency:** ✓ CONSISTENT
- Numbers align (25% → 45-48%)
- Timeline coherent
- Evidence levels appropriate

---

**TOPIC: Effectiveness of approach Y**

- Report 1 (Historical): Not covered
- Report 2 (State of Art): "Approach Y shows 30% improvement over baseline" [25,27] - MODERATE
- Report 3 (Practical): "Case studies show Y is less effective than Z" [31] - MODERATE

**Consistency:** ⚠️ POTENTIAL CONFLICT
- Report 2: Y is effective (30% improvement)
- Report 3: Y less effective than Z
- Analysis: Not necessarily contradictory (both can be true), but worth noting
- Recommendation: Clarify relationship between Y and Z when writing

---

**Summary of contradictions:**

| Type | Count | Severity |
|------|-------|----------|
| Direct contradictions (incompatible claims) | 0 | N/A |
| Apparent contradictions (resolvable) | 2 | LOW |
| Different emphasis (not contradictory) | 5 | N/A |

**Assessment:** No problematic contradictions ✓
```

---

**6.5 TEMPORAL AND NARRATIVE COHERENCE**

**Check if reports tell coherent story together:**

```markdown
## Narrative Coherence Assessment

**Temporal flow:**
- Report 1 (Historical): Covers 2000-2020
- Report 2 (State of Art): Focuses on 2020-2025
- Report 3 (Practical): Current practices (2023-2025)

**Timeline coverage:** ✓ COMPLETE (no gaps)
**Timeline overlap:** ✓ MINIMAL (Reports 2&3 overlap but from different angles)

**Conceptual flow:**

```
Report 1: How we got here (foundations + evolution)
    ↓
Report 2: Where we are now (current knowledge + debates)
    ↓
Report 3: How to apply it (implementation + practice)
```

**Flow assessment:** ✓ LOGICAL PROGRESSION
- Each report builds on previous conceptually
- Natural reading order: 1 → 2 → 3
- Together form complete narrative arc

**Terminology consistency:**

| Term | Report 1 | Report 2 | Report 3 | Consistent? |
|------|----------|----------|----------|-------------|
| "Smart building" | Used | Used | Used | ✓ YES |
| "Building automation" | Used interchangeably | Distinct from smart building | Used interchangeably | ⚠️ INCONSISTENT |
| "IoT integration" | Not used | Primary term | "IoT-enabled" variant | ⚠️ MINOR VARIATION |

**Assessment:** Mostly consistent, 2 terms need standardization
**Recommendation:** Define "building automation" vs "smart building" clearly in introduction
```

---

**6.6 COLLECTIVE GAPS ANALYSIS**

**Identify gaps that persist even across all reports:**

```markdown
## Collective Gaps

**Topics covered by NO report at PRIMARY level:**
1. **Cost-benefit analysis for retrofitting**
   - Report 1: Not covered (historical focus)
   - Report 2: Mentioned in 1 paragraph (not primary)
   - Report 3: Mentioned but no detailed analysis
   - **Severity:** SIGNIFICANT (relevant for practical application)
   - **Recommendation:** Add dedicated section or 4th focused report

2. **Workforce impact and training requirements**
   - Report 1: Not covered
   - Report 2: Not covered
   - Report 3: Mentioned in 2 paragraphs
   - **Severity:** MODERATE (interesting but not critical)

**Disciplines absent from ALL reports:**
- Urban Planning (potentially relevant for city-scale deployment)
- **Severity:** MINOR (arguably peripheral)

**Perspectives absent from ALL reports:**
- Building occupant perspective (end users)
- **Severity:** SIGNIFICANT (key stakeholder missing)
- **Recommendation:** Add 5-7 sources from occupant studies

**Geographic gaps across ALL reports:**
- Latin America: 0 sources
- Africa: 0 sources
- Southeast Asia: 1 source total
- **Severity:** MODERATE (if book claims "global perspective")
- **Recommendation:** Either add sources OR scope to "Global North perspective"
```

---

#### Phase 3: Collective Assessment and Recommendations

**STEP 7: MULTI-REPORT SYNTHESIS**

**7.1 Calculate Collective Scores**

**Collective Source Quality:**
- Unique Tier 1 percentage: 47%
- Collective disciplinary coverage: 80%
- Collective perspective balance: 85%
- Source deduplication efficiency: 90%
- **Collective Source Quality: 76%** (GOOD)

**Collective Claim Quality:**
- Maintain average of individual reports: 70%
- Consistency bonus (no contradictions): +5%
- **Collective Claim Quality: 75%** (GOOD)

**Collective Coverage Quality:**
- Individual average: 65%
- Complementarity bonus: +10%
- Collective gaps penalty: -5%
- **Collective Coverage Quality: 70%** (GOOD)

**Collective Methodological Quality:**
- Average of individual reports: 78%
- Narrative coherence bonus: +7%
- **Collective Methodological Quality: 85%** (EXCELLENT)

**OVERALL COLLECTIVE SCORE: 77%** (GOOD)

---

**7.2 Multi-Report Publication Readiness**

```markdown
## Collective Publication Readiness

**Status:** NEEDS MINOR REFINEMENT (Yellow-Green Light) ⚠️✓

**Individual reports:**
- Report 1: PUBLICATION-READY (Green)
- Report 2: PUBLICATION-READY (Green)
- Report 3: NEEDS REFINEMENT (Yellow)

**As a collection:**
- Complementarity: EXCELLENT
- Consistency: GOOD (2 minor terminology issues)
- Collective gaps: MODERATE (3 gaps identified)
- Narrative coherence: EXCELLENT

**Recommendation:**
1. Address collective gaps (Priority 1-2)
2. Standardize terminology across reports
3. Report 3: Complete individual refinements
4. THEN: Ready for book compilation

**Estimated effort:** 8-12 hours total
```

---

**7.3 Collection-Specific Strengths**

```markdown
## Collective Strengths

1. **Excellent complementarity:** Each report covers distinct ground, minimal wasteful overlap
2. **Strong collective source base:** 95 unique sources, 47% Tier 1
3. **Comprehensive temporal coverage:** 2000-2025 fully covered
4. **Logical narrative progression:** Reports build on each other naturally
5. **No contradictions:** Claims are consistent across reports
6. **Balanced perspectives:** Collectively, all major viewpoints represented
7. **Methodological consistency:** All reports use same validation framework
```

---

**7.4 Collection-Specific Weaknesses**

```markdown
## Collective Weaknesses

1. **Persistent coverage gaps:** 3 topics not adequately covered by any report
2. **Geographic imbalance:** Even collectively, Global South underrepresented
3. **Missing stakeholder:** Building occupant perspective absent across all reports
4. **Terminology inconsistency:** 2 key terms used inconsistently
5. **Uneven individual quality:** Report 3 weaker than 1&2, pulls collection down
```

---

**7.5 Collection Recommendations**

```markdown
## Recommendations for the Collection

### REQUIRED (before book publication):

**R1. Address collective coverage gaps (8-10h):**
- Add cost-benefit analysis section (to Report 3 or as new focused section)
- Add building occupant perspective sources (5-7 sources across all reports)
- Decision: Either add Geographic South coverage OR explicitly scope to Global North

**R2. Standardize terminology (2h):**
- Define "building automation" vs "smart building" in introduction/glossary
- Ensure consistent usage across all three reports
- Create terminology appendix

**R3. Strengthen Report 3 (4-6h):**
- Address individual weaknesses identified in Report 3 evaluation
- Bring to same quality level as Reports 1&2

**TOTAL REQUIRED EFFORT: 14-18 hours**

### SUGGESTED (valuable but not critical):

**S1. Add synthesizing introduction (4-6h):**
- Write overarching introduction explaining how reports relate
- Preview the narrative arc across all three
- Define scope and limitations collectively

**S2. Cross-reference optimization (2-3h):**
- Add cross-references between reports where topics overlap
- "For historical context, see Report 1, Section 3.2"
- Helps reader navigate the collection

**S3. Unified bibliography (2h):**
- Consolidate all references into single bibliography
- Remove duplicates
- Consistent formatting
```

---

### Output for Multiple Reports

When evaluating multiple reports, produce:

**1. Individual evaluation reports:**
- RESEARCH_EVALUATION_REPORT_[TOPIC]_[FOCUS1]_[DATE].md
- RESEARCH_EVALUATION_REPORT_[TOPIC]_[FOCUS2]_[DATE].md
- RESEARCH_EVALUATION_REPORT_[TOPIC]_[FOCUS3]_[DATE].md

**2. Collective evaluation report:**
- RESEARCH_EVALUATION_REPORT_[TOPIC]_COLLECTION_[DATE].md

**Structure of collective report:**

```markdown
# RESEARCH EVALUATION REPORT: [Topic] - COLLECTION

**Reports Evaluated:**
1. RESEARCH_REPORT_[TOPIC]_[FOCUS1]_v[X.Y].md
2. RESEARCH_REPORT_[TOPIC]_[FOCUS2]_v[X.Y].md
3. RESEARCH_REPORT_[TOPIC]_[FOCUS3]_v[X.Y].md

**Evaluation Date:** [date]
**Framework:** EVALUATE_RESEARCH_REPORT v1.0
**Intended Use:** Book compilation

---

## EXECUTIVE SUMMARY

### Individual Reports Summary

| Report | Focus | Overall Score | Status |
|--------|-------|---------------|--------|
| Report 1 | Historical Review | 82% (GOOD) | ✓ Publication-Ready |
| Report 2 | State of the Art | 85% (EXCELLENT) | ✓ Publication-Ready |
| Report 3 | Practical Implementation | 68% (ADEQUATE) | ⚠️ Needs Refinement |

### Collective Assessment

**Overall Collection Rating:** 77% (GOOD) - NEEDS MINOR REFINEMENT

**Complementarity:** EXCELLENT (85%)
**Consistency:** GOOD (no contradictions, 2 terminology issues)
**Collective Coverage:** GOOD (70%, with 3 gaps)
**Narrative Coherence:** EXCELLENT (85%)

**Key Recommendation:** Address 3 collective gaps and standardize terminology. Estimated 14-18h total effort. Then ready for book compilation.

---

## SECTION 1: INDIVIDUAL REPORTS SUMMARY

### 1.1 Report 1: [Focus] - Detailed Summary
[Synopsis of individual evaluation]

### 1.2 Report 2: [Focus] - Detailed Summary
[Synopsis of individual evaluation]

### 1.3 Report 3: [Focus] - Detailed Summary
[Synopsis of individual evaluation]

---

## SECTION 2: CROSS-REPORT INTEGRATION ANALYSIS

### 2.1 Coverage Integration
[From Step 6.1]

### 2.2 Disciplinary and Perspective Integration
[From Step 6.2]

### 2.3 Source Integration and Deduplication
[From Step 6.3]

### 2.4 Claim Consistency Analysis
[From Step 6.4]

### 2.5 Narrative Coherence
[From Step 6.5]

### 2.6 Collective Gaps
[From Step 6.6]

---

## SECTION 3: COLLECTIVE ASSESSMENT

### 3.1 Collective Quality Scores
[From Step 7.1]

### 3.2 Collection Publication Readiness
[From Step 7.2]

### 3.3 Collection Strengths
[From Step 7.3]

### 3.4 Collection Weaknesses
[From Step 7.4]

---

## SECTION 4: RECOMMENDATIONS FOR THE COLLECTION

### 4.1 Required Actions
[From Step 7.5 - Required]

### 4.2 Suggested Improvements
[From Step 7.5 - Suggested]

### 4.3 Reading Order Recommendation
"Recommended reading order: Report 1 → Report 2 → Report 3
Rationale: Logical temporal and conceptual progression"

---

## APPENDICES

### Appendix A: Complete Source List (Deduplicated)
[All 95 unique sources with Tiers]

### Appendix B: Coverage Matrix
[Complete topic x report matrix]

### Appendix C: Terminology Standardization Guide
[List of terms needing standardization]
```

---

### Limitations of This Evaluation

**This evaluation assesses:**
- ✓ Quality of sources used
- ✓ Strength of evidence for claims
- ✓ Coverage of perspectives and disciplines
- ✓ Methodological transparency

**This evaluation does NOT assess:**
- ✗ Accuracy of citations (assumes citations are correct)
- ✗ Quality of writing or narrative coherence
- ✗ Appropriateness of topic choice
- ✗ Alignment with editorial vision
- ✗ Reader engagement or accessibility

These are editorial concerns, not research quality concerns.

---

---

## PART VII: EVALUATION_RESULT CANÓNICO

Al finalizar la evaluación (Steps 1-5 para report individual, Steps 1-7 para colección), producir el EVALUATION_RESULT canónico según RESOURCE_EVALUATION_FRAMEWORK v1.0.

### Mapeo de scoring interno → contrato

| Score Overall | Status canónico | Condición adicional |
|---|---|---|
| ≥70 | GREEN | Ningún blocking issue |
| 50-69 | YELLOW | Ningún blocking issue |
| <50 | RED | — |
| Cualquiera | RED | Si existe al menos un blocking issue (ver abajo) |

**Blocking issues que fuerzan RED independientemente del score:**
- Menos del 30% de fuentes Tier 1 en secciones de claims centrales
- Claims causales sin soporte experimental o quasi-experimental
- Perspectivas mayoritarias del campo completamente ausentes
- Metodología ausente o incoherente con el contenido

### Formato de output requerido

```
EVALUATION_RESULT:
  status:            GREEN | YELLOW | RED
  score:             [Overall Score calculado en Step 5.1]/100
  decision_guidance: [instrucción directa para el editor]
  blocking_issues:   [lista según Step 5.5, vacío si GREEN o YELLOW]
  improvement_areas: [lista según Step 5.5, vacío si GREEN]
  strengths:         [top 3-5 fortalezas de Step 5.4]
```

### Correspondencia con terminología legacy

| Terminología interna (Steps 1-5) | Campo canónico |
|---|---|
| "Green Light / Publication-Ready" | `status: GREEN` |
| "Yellow Light / Needs Refinement" | `status: YELLOW` |
| "Red Light / Requires Rework" | `status: RED` |
| Overall Score (%) × 100 | `score` |
| Recommendation | `decision_guidance` (reformular como instrucción de acción) |
| Critical Gaps bloqueantes | `blocking_issues` |
| Critical Gaps no bloqueantes + Suggested improvements | `improvement_areas` |
| Strengths | `strengths` |

### Nota sobre evaluaciones de colección

Cuando se evalúan múltiples reports (RAMA B), producir:
1. Un EVALUATION_RESULT por report individual.
2. Un EVALUATION_RESULT colectivo (usa el Overall Collective Score de Step 7.1).

El status colectivo es el que determina si el editor puede proceder a escritura.

---

**END OF PROMPT**
