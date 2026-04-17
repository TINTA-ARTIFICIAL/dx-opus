# RESEARCH_DEEP_DIVE: INVESTIGACIÓN PROFUNDA ORIENTADA A POST

**Version:** 1.1  
**Date:** January 26, 2026  
**Optimized for:** Claude Sonnet 4.5 and similar LLMs  
**Context:** "Tinta Artificial" - RAMA A del Sistema de Investigación

**Changelog v1.1:**
- ✅ Added SECTION N+1: TIMELINE AND CAST OF CHARACTERS (400-600 words)
- ✅ Aligned structure with WRITING_INSTRUCTIONS_RESEARCH_REPORT_v2.1
- ✅ Added detailed guidelines for Timeline (table vs narrative format)
- ✅ Added detailed guidelines for Key Actors (researchers, institutions, schools)
- ✅ Updated quality checklists to include Timeline and Cast verification
- ✅ Renumbered sections: Methodology → N+2, Implications → N+3

---

## PART I: MISSION AND CONTEXT

### 1.1 Purpose

This prompt guides the execution of **RAMA A: Research Profundo Orientado a Post**, which produces a comprehensive research document based on editor annotations. Unlike RAMA B (which follows a predefined Research Focus template), RAMA A is **neutral and flexible**, deeply investigating whatever the editor flagged as important through TASK, LINE, and COMMENT annotations.

### 1.2 Position in Workflow

```
[PREVIOUS PHASES - COMPLETED]
├─ PHASE 1: SUMMARIZE_REFERENCES executed
│  └─ REFERENCE_SUMMARY, RESEARCH_PLAN, NARRATIVE_BRIDGE generated
├─ PHASE 2: UPDATE_VALIDATION_CHECKLIST executed
│  └─ SOURCE_AUTHORITY_HIERARCHY, CLAIM_VALIDATION_CRITERIA updated
└─ PHASE 3: Editor annotation completed
   └─ ANNOTATED_REFERENCE_SUMMARY created
   └─ ANNOTATED_RESEARCH_PLAN created

[CURRENT PHASE - RAMA A EXECUTION]
    ↓
RESEARCH_DEEP_DIVE (this prompt)
    ↓
OUTPUT: RESEARCH_DEEP_DIVE document (flexible structure)
    ↓
[NEXT PHASE]
└─ PHASE 5: EVALUATE_RESEARCH_REPORT (optional for RAMA A)
    ↓
[FUTURE USE]
├─ Direct base for writing POST
└─ Additional context for RAMA B (if also executed for LIBRO)
```

### 1.3 Key Differences: RAMA A vs RAMA B

| ASPECT | RAMA A (This Prompt) | RAMA B (CREATE + EXECUTE) |
|--------|---------------------|---------------------------|
| **Purpose** | Neutral deep investigation | Structured report for book |
| **Structure** | Flexible, follows editor's concerns | Rigid, follows Research Focus template |
| **Length** | 5,000-10,000 words typical | 8,000-15,000 words typical |
| **Use case** | POST (also useful for LIBRO) | LIBRO primarily |
| **Focus selection** | Not required | Required (1 of 7 types) |
| **Narrative arc** | Not required | Optional but recommended |
| **Effort** | Lower (5-15 hours) | Higher (17-33 hours) |

### 1.4 When to Use RAMA A

**ALWAYS use RAMA A when:**
- ✓ Editor has created substantial annotations (≥15 TASK/LINE/COMMENT flags)
- ✓ Goal is to write a POST
- ✓ Editor wants neutral deep dive before committing to book structure

**OPTIONALLY use RAMA A when:**
- Goal is LIBRO but editor wants exploratory research first
- Combined with RAMA B: RAMA A explores → RAMA B structures

**DO NOT use RAMA A when:**
- Minimal annotations (≤5 flags) - not worth the effort
- Goal is LIBRO and structure is already clear - go straight to RAMA B

### 1.5 Quality Standards

The resulting RESEARCH_DEEP_DIVE must provide:
- **Complete responses** to all TASK annotations (100%)
- **Thoughtful consideration** of all COMMENT contexts
- **Appropriate handling** of all LINE modifications
- **Rigorous sourcing** validated against SOURCE_AUTHORITY_HIERARCHY
- **Claim validation** using CLAIM_VALIDATION_CRITERIA
- **Confidence levels** assigned to all major claims (STRONG/MODERATE/TENTATIVE/SPECULATIVE)
- **Publication-grade quality** comparable to RAMA B outputs

---

## PART II: INPUT SPECIFICATION

### 2.1 Mandatory Inputs

**FROM PHASE 3 (Editor Annotations):**

1. **ANNOTATED_REFERENCE_SUMMARY**
   - REFERENCE_SUMMARY with editor's TASK and COMMENT flags
   - Focus on sections with annotations (not all sections equally important)
   
2. **ANNOTATED_RESEARCH_PLAN**
   - RESEARCH_PLAN with editor's LINE, TASK, and COMMENT flags
   - LINE modifications indicate priority changes

**FROM PHASE 2 (Validation System):**

3. **SOURCE_AUTHORITY_HIERARCHY** (current version)
   - For evaluating new sources found during research
   - For prioritizing which sources to pursue
   
4. **CLAIM_VALIDATION_CRITERIA** (current version)
   - For validating claims in both existing references and new research
   - For assigning appropriate confidence levels

**FROM PHASE 1 (For Context):**

5. **REFERENCE_SUMMARY** (clean version, not annotated)
   - To understand baseline knowledge before annotation
   - Sections 0, 2, 3, 5, 7 most relevant

6. **NARRATIVE_BRIDGE** (optional but helpful)
   - For understanding potential narrative directions
   - Not binding, but provides context

### 2.2 File Access Verification

Before proceeding, verify access to all mandatory files:

```
□ ANNOTATED_REFERENCE_SUMMARY accessible
□ ANNOTATED_RESEARCH_PLAN accessible
□ SOURCE_AUTHORITY_HIERARCHY accessible
□ CLAIM_VALIDATION_CRITERIA accessible
□ REFERENCE_SUMMARY accessible (for context)
□ NARRATIVE_BRIDGE accessible (optional)
```

If any mandatory file is missing, request from user before proceeding.

---

## PART III: EXECUTION WORKFLOW

### OVERVIEW OF STEPS

```
STEP 0: Preparation and Input Analysis
   ↓
STEP 1: Extract and Categorize Annotations
   ↓
STEP 2: Create Research Plan
   ↓
STEP 3: Execute Research (Iterative)
   ↓
STEP 4: Validate and Assign Confidence
   ↓
STEP 5: Structure and Write RESEARCH_DEEP_DIVE
   ↓
OUTPUT: RESEARCH_DEEP_DIVE document
```

**Estimated total time:** 5-15 hours depending on annotation density and complexity

---

### STEP 0: PREPARATION AND INPUT ANALYSIS

**Objective:** Understand the scope and priorities before starting research.

**Process:**

#### 0.1 Load and Parse Inputs

1. Read ANNOTATED_REFERENCE_SUMMARY completely
   - Identify all TASK annotations
   - Identify all COMMENT annotations
   - Note which sections have dense annotation (indicates priority)

2. Read ANNOTATED_RESEARCH_PLAN completely
   - Identify all LINE modifications (PRIORITY, Focus, OMIT, Merge)
   - Identify all TASK annotations associated with lines
   - Identify all COMMENT annotations providing context

3. Read clean REFERENCE_SUMMARY for baseline
   - Understand what knowledge exists pre-annotation
   - Identify gaps editor is trying to fill

4. Consult SOURCE_AUTHORITY_HIERARCHY and CLAIM_VALIDATION_CRITERIA
   - Understand validation standards for this topic
   - Note Tier 1-2 sources already identified

#### 0.2 Generate Annotation Inventory

Create internal inventory (not shown to user yet):

**TASK Annotations:**
```
TASK-001: [Text of task] (Source: REFERENCE_SUMMARY Section X)
TASK-002: [Text of task] (Source: RESEARCH_PLAN Line Y)
[...]
Total TASK count: [N]
```

**LINE Modifications:**
```
LINE-001: [Line name] → PRIORITY HIGH (Rationale: [editor comment])
LINE-002: [Line name] → Focus on European context
LINE-003: [Line name] → OMIT - Out of scope
[...]
Total LINE count: [N]
Active lines (not OMIT): [N]
```

**COMMENT Annotations:**
```
COMMENT-001: [Editor context] (Associated with: [section/line])
COMMENT-002: [Editor perspective]
[...]
Total COMMENT count: [N]
```

#### 0.3 Identify Priority Signals

**Maximum priority (appears in BOTH documents):**
- Topics annotated in ANNOTATED_REFERENCE_SUMMARY AND ANNOTATED_RESEARCH_PLAN
- These are CRITICAL to editor

**High priority:**
- LINEs marked PRIORITY HIGH
- TASKs with extensive detail
- Sections with multiple annotations

**Medium priority:**
- LINEs not modified (default MEDIUM)
- Single TASKs on a topic

**Low priority:**
- LINEs marked PRIORITY LOW
- Sections with minimal annotation

**Excluded:**
- LINEs marked OMIT

#### 0.4 Confirm Scope with User

Present summary to user for confirmation:

```
"RESEARCH_DEEP_DIVE Scope Analysis
==================================

Annotations Summary:
- TASK annotations: [N]
- LINE modifications: [N] ([N] active, [N] omitted)
- COMMENT contexts: [N]

Priority Distribution:
- CRITICAL topics (in both docs): [N]
- HIGH priority lines: [N]
- MEDIUM priority lines: [N]
- LOW priority lines: [N]

Estimated Effort:
- Research time: [X-Y hours]
- Expected document length: [Z-W words]

Confirm to proceed with research execution? [Y/N]"
```

Wait for user confirmation before proceeding to STEP 1.

---

### STEP 1: EXTRACT AND CATEGORIZE ANNOTATIONS

**Objective:** Organize all editor annotations into actionable research categories.

**Process:**

#### 1.1 Create Research Themes

Group related annotations into coherent research themes.

**Method:**
1. Look for annotations about the same concept/topic
2. Group by thematic similarity (not by document location)
3. Each theme should have clear research question(s)

**Example grouping:**
```
THEME 1: Energy Efficiency Quantification
├─ TASK-003 (REFERENCE_SUMMARY): Verify 25% savings claim with 2024 data
├─ TASK-012 (RESEARCH_PLAN Line 3): Find case studies with quantitative data
├─ COMMENT-005: Editor is skeptical of this claim
└─ Priority: CRITICAL (appears in both documents)

THEME 2: User Control vs Automation Trade-offs
├─ COMMENT-007: This is central to editor's philosophical argument
├─ TASK-018: Find studies on user satisfaction with different control levels
├─ LINE-004: PRIORITY HIGH - User experience focus
└─ Priority: HIGH
```

**Target:** 5-10 themes typically (fewer if simple, more if complex)

#### 1.2 Define Research Questions per Theme

For each theme, extract specific research questions:

```
THEME: [Name]
Priority: [CRITICAL/HIGH/MEDIUM/LOW]

Research Questions:
1. [Question from TASK annotation]
2. [Question implied by COMMENT]
3. [Question from LINE focus modification]

Expected Outputs:
- [What kind of information needed]
- [What would satisfy this theme]

Source Strategy:
- Tier 1 targets: [journals, institutions]
- Keywords: [search terms]
- Time frame: [e.g., "2020-2025 for recent data"]
```

#### 1.3 Map Themes to Priority

Create priority-ordered list:

```
CRITICAL PRIORITY (research first):
1. THEME: [Name] - [1-line description]
2. THEME: [Name] - [1-line description]

HIGH PRIORITY (research second):
3. THEME: [Name] - [1-line description]
4. THEME: [Name] - [1-line description]

MEDIUM PRIORITY (research third):
5. THEME: [Name] - [1-line description]

LOW PRIORITY (research if time permits):
6. THEME: [Name] - [1-line description]
```

---

### STEP 2: CREATE RESEARCH PLAN

**Objective:** Transform themes into executable research jobs.

**Process:**

#### 2.1 Create Research Job for Each Theme

For each theme identified in STEP 1, create a structured research job.

**Template:**

```markdown
### RESEARCH JOB [ID]: [Theme Name]

**Priority:** [CRITICAL/HIGH/MEDIUM/LOW]

**Motivation:**
[Why this is important - synthesize from COMMENT annotations and LINE priorities]

**Research Questions:**
1. [Specific question 1]
2. [Specific question 2]
3. [Specific question 3]

**Source Strategy:**
- **Tier 1 Priority:** [Specific journals/institutions from SOURCE_AUTHORITY_HIERARCHY]
- **Keywords:** [Search terms - informed by REFERENCE_SUMMARY terminology]
- **Databases:** [Google Scholar, Scopus, specific repositories]
- **Time Frame:** [e.g., "Prioritize 2020-2025, include foundational works if needed"]
- **Saturation Criteria:** [When to stop - e.g., "3+ Tier 1 sources converge"]

**Expected Outputs:**
- [Specific data/findings needed]
- [Format: narrative paragraph, comparison table, etc.]

**Validation Approach:**
- **Claims to validate:** [From TASK annotations]
- **Validation checks:** [From CLAIM_VALIDATION_CRITERIA]
- **Confidence target:** [STRONG for CRITICAL jobs, MODERATE acceptable for others]

**Estimated Effort:** [X hours research + Y hours synthesis]
```

#### 2.2 Handle Special Cases

**LINE: OMIT annotations:**
- Create NO research job
- Document exclusion in plan

**LINE: Merge annotations:**
- Combine into single research job
- Note merger in job description

**LINE: Focus modifications:**
- Adjust scope of research job accordingly
- Example: "LINE: Focus on European context" → Restrict search to EU sources

**COMMENT: Context annotations:**
- Integrate into "Motivation" section of relevant jobs
- Use to inform interpretation of findings

#### 2.3 Estimate Total Effort

Calculate:
```
Total Research Jobs: [N]
├─ CRITICAL: [N jobs] × [avg 2-4h] = [X-Y hours]
├─ HIGH: [N jobs] × [avg 1-3h] = [X-Y hours]
├─ MEDIUM: [N jobs] × [avg 1-2h] = [X-Y hours]
└─ LOW: [N jobs] × [avg 0.5-1h] = [X-Y hours]

Total Estimated Research Time: [X-Y hours]
Writing Time (STEP 5): [~30% of research time]

TOTAL EFFORT: [X-Y hours]
```

#### 2.4 Present Research Plan to User

Show user the complete plan before executing:

```markdown
# RESEARCH PLAN FOR DEEP_DIVE

## Summary
- Total research jobs: [N]
- Priority distribution: [N] CRITICAL, [N] HIGH, [N] MEDIUM, [N] LOW
- Estimated effort: [X-Y hours]

## Research Jobs

[LIST ALL JOBS WITH STRUCTURE FROM 2.1]

---

**Confirm to proceed with research execution? [Y/N]**
**Or adjust priorities/scope? [ADJUST]**
```

Allow user to:
- Approve as-is
- Adjust job priorities
- Add/remove jobs
- Modify scope of specific jobs

**CRITICAL:** Do not proceed to STEP 3 until user approves.

---

### STEP 3: EXECUTE RESEARCH (ITERATIVE)

**Objective:** Execute each research job and gather findings.

**Process:**

Execute jobs in priority order: CRITICAL → HIGH → MEDIUM → LOW

For each job:

#### 3.1 Search Phase

1. **Execute searches** according to source strategy
   - Use specified keywords in specified databases
   - Prioritize Tier 1 sources from SOURCE_AUTHORITY_HIERARCHY
   - Apply time frame filters

2. **Collect sources** until saturation criteria met
   - Track: Source name, Tier, Key findings, Relevance
   - Stop when: Saturation criteria reached OR effort limit hit

3. **Quick quality check**
   - Verify source is actually relevant (not just keyword match)
   - Classify source Tier if not in SOURCE_AUTHORITY_HIERARCHY
   - Discard low-quality or off-topic sources

#### 3.2 Analysis Phase

1. **Extract key information** from each source
   - Facts, statistics, claims
   - Methodologies used
   - Limitations acknowledged
   - Author credentials and affiliations

2. **Identify convergences and divergences**
   - Do sources agree?
   - Where do they disagree?
   - Why might they disagree? (methodology, perspective, data)

3. **Evaluate against editor's question**
   - Does this answer the TASK annotation?
   - Does this confirm or challenge the COMMENT perspective?
   - Is this aligned with LINE focus?

#### 3.3 Synthesis Phase

1. **Synthesize findings into coherent narrative**
   - NOT a list of "Source X says Y"
   - Integrated synthesis: "Evidence suggests X, with Y% of studies showing..."

2. **Note confidence level** for each major claim
   - **STRONG:** 2+ Tier 1 sources converge, methodology sound
   - **MODERATE:** 1 Tier 1 source, or 3+ Tier 2 sources converge
   - **TENTATIVE:** Limited evidence, or conflicting evidence
   - **SPECULATIVE:** Hypothesis, not yet well-tested

3. **Document sources used**
   - Keep citation list for each claim
   - Format: [Author, Year, Source Type, Tier]

#### 3.4 Validation Phase

1. **Apply CLAIM_VALIDATION_CRITERIA**
   - Check each claim against relevant validation checks
   - Identify red flags if any
   - Downgrade confidence if validation concerns arise

2. **Cross-check with REFERENCE_SUMMARY**
   - Does new finding contradict initial references?
   - If yes, investigate why (new data? different methodology?)
   - Reconcile or acknowledge contradiction

#### 3.5 Documentation Phase

For each completed research job, create internal research note:

```markdown
### RESEARCH JOB [ID] - FINDINGS

**Questions Addressed:**
[List of research questions from job]

**Sources Consulted:**
[List with Tier classification]
- [Author, Year] (Tier X) - [Source type]
- [...]
Total: [N] sources ([N] Tier 1, [N] Tier 2, [N] Tier 3)

**Key Findings:**

**Finding 1: [Topic]**
[Narrative synthesis - 1-3 paragraphs]
Confidence: [STRONG/MODERATE/TENTATIVE/SPECULATIVE]
Evidence: [Citation list]
Validation: [Any red flags or concerns]

**Finding 2: [Topic]**
[...]

**Gaps Identified:**
[What remains unanswered]

**Editor's Question Status:**
✓ Fully answered / ⚠ Partially answered / ✗ Unanswered
[Explanation]
```

#### 3.6 Progress Reporting (Optional)

If research is extensive (>10 jobs), consider reporting progress:

```
"Research Progress Update
========================
Completed: [N]/[Total] jobs
- CRITICAL: [N]/[N] ✓
- HIGH: [N]/[N] ...
- MEDIUM: [N]/[N] pending
- LOW: [N]/[N] pending

Time invested: ~[X] hours
Estimated remaining: ~[Y] hours

Continue? [Y/N]"
```

---

### STEP 4: VALIDATE AND ASSIGN CONFIDENCE

**Objective:** Review all findings and ensure quality standards.

**Process:**

#### 4.1 Global Validation Pass

Review ALL findings from all research jobs:

1. **Consistency check**
   - Do findings from different jobs contradict each other?
   - If yes, investigate and reconcile or acknowledge

2. **Coverage check**
   - Have all CRITICAL and HIGH priority jobs been completed?
   - Have all TASKs been addressed?
   - Are there remaining gaps?

3. **Source quality check**
   - Calculate overall Tier distribution
   - Target: ≥30% Tier 1 sources ideal
   - Flag if too reliant on Tier 3 sources

#### 4.2 Confidence Level Calibration

Review confidence assignments:

1. **STRONG confidence requires:**
   - 2+ Tier 1 sources converge, OR
   - Systematic review / meta-analysis from Tier 1, OR
   - 1 Tier 1 + 3+ Tier 2 sources converge

2. **MODERATE confidence requires:**
   - 1 Tier 1 source, OR
   - 3+ Tier 2 sources converge, OR
   - Strong Tier 2 sources with sound methodology

3. **TENTATIVE requires:**
   - Limited evidence (1-2 Tier 2 sources), OR
   - Conflicting evidence, OR
   - Methodological concerns

4. **SPECULATIVE applies to:**
   - Hypotheses not yet tested
   - Early-stage research
   - Projections or forecasts

**Red flag:** If too many TENTATIVE or SPECULATIVE findings, consider additional research.

**Target distribution:**
- STRONG: ≥40% for publication-ready quality
- MODERATE: 30-40%
- TENTATIVE: ≤20%
- SPECULATIVE: ≤10%

#### 4.3 Create Source Inventory

Compile complete list of all sources used:

```markdown
## SOURCE INVENTORY

### Tier 1 Sources ([N] total)
1. [Author, Year]. [Title]. [Journal/Publisher]. [DOI/URL]
2. [...]

### Tier 2 Sources ([N] total)
[...]

### Tier 3 Sources ([N] total)
[...]

**Distribution:**
- Tier 1: [N]% 
- Tier 2: [N]%
- Tier 3: [N]%
```

#### 4.4 Identify Remaining Gaps

Document what couldn't be answered:

```markdown
## GAPS AND LIMITATIONS

### Critical Gaps (would significantly strengthen findings):
1. [Gap description]
   - Why it exists: [Reason - e.g., "No studies found on X"]
   - Impact: [How this limits conclusions]
   - Potential resolution: [What would fill this gap]

### Minor Gaps (desirable but not critical):
[...]

### Exclusions (deliberate):
[Based on LINE: OMIT annotations]
```

---

### STEP 5: STRUCTURE AND WRITE RESEARCH_DEEP_DIVE

**Objective:** Organize findings into coherent, publication-grade document.

**Process:**

#### 5.1 Select Document Structure

RESEARCH_DEEP_DIVE uses **flexible structure** adapted to content, but follows this general framework:

```markdown
# [TITLE]

**Subtitle:** Deep Dive Research Report

## METADATA
- Topic: [...]
- Date: [...]
- Research Focus: Neutral Deep Investigation
- Editor: [...]
- Basis: RAMA A - Editor Annotation-Driven Research

## EXECUTIVE SUMMARY (400-600 words)
[High-level synthesis of all findings]
[Key takeaways for editor]

## 1. INTRODUCTION (600-1,000 words)
### 1.1 Research Context
[Why this research was conducted]
[What annotations drove this investigation]

### 1.2 Scope and Objectives
[What was investigated]
[What was deliberately excluded]

### 1.3 Approach
[How research was conducted]
[Source strategy overview]

## 2-N. BODY SECTIONS (organized by theme)

[FLEXIBLE STRUCTURE - See 5.2 below]

## N. SYNTHESIS AND CROSS-CUTTING INSIGHTS (800-1,200 words)
[Integrate findings across themes]
[Highlight connections between themes]
[Address editor's broader questions from COMMENTs]

## N+1. TIMELINE AND CAST OF CHARACTERS (400-600 words)
### N+1.1 Historical Timeline
[Key events, publications, and developments in chronological order]
[Format: Table (if 10+ events) or Narrative (if <10 events)]

### N+1.2 Key Actors
[Main researchers/authors with affiliations and contributions]
[Key institutions and their roles]
[Schools of thought if applicable]

## N+2. METHODOLOGY (400-600 words)
### N+2.1 Sources and Search Strategy
[How sources were found and evaluated]

### N+2.2 Validation Approach
[How claims were validated]
[Confidence level assignments]

### N+2.3 Limitations
[What this research doesn't cover]
[Gaps identified]
[Methodological constraints]

### N+2.4 Quality Metrics
[Source distribution]
[Confidence distribution]
[Coverage assessment]

## N+3. IMPLICATIONS FOR [POST/LIBRO] (300-500 words)
[How these findings inform writing]
[Key points to emphasize]
[Potential angles or arguments]

## REFERENCES
[Complete list in IEEE format]
```

#### 5.2 Organize Body Sections by Theme

**Option A: Thematic Organization (Most Common)**

Organize sections by research themes from STEP 1:

```markdown
## 2. [THEME 1 NAME] (1,000-1,500 words)

### 2.1 Context and Editor's Question
[What annotation(s) drove this research]
[Why this matters to the editor]

### 2.2 Findings
[Integrated narrative of research findings]
[NOT a list of sources, but synthesis]

**Key Finding 1:** [Statement]
[Evidence and elaboration - 2-3 paragraphs]
[Confidence: STRONG]

**Key Finding 2:** [Statement]
[...]
[Confidence: MODERATE]

### 2.3 Implications
[What this means for the topic]
[How this addresses editor's concern]

### 2.4 Remaining Questions
[What remains unclear or contested]

---

## 3. [THEME 2 NAME] (800-1,200 words)
[Same structure...]
```

**Option B: Question-Answer Organization**

If research was very TASK-driven:

```markdown
## 2. RESPONSES TO CRITICAL QUESTIONS

### 2.1 [Question from TASK annotation]
[Answer with evidence]
[Confidence level]
[Sources]

### 2.2 [Question from TASK annotation]
[...]

## 3. RESPONSES TO HIGH PRIORITY QUESTIONS
[...]
```

**Option C: Hybrid**

Combine thematic sections for major topics with Q&A sections for specific tasks.

**Guidance:** Choose structure that best serves the content and editor's annotations.

#### 5.3 Writing Guidelines

**Style:**
- **Narrative, not lists:** Write in flowing prose, not bullet points
- **Synthesis, not summary:** Integrate multiple sources, don't just list them
- **Critical analysis:** Don't just report what sources say, evaluate quality and consistency
- **Editor's voice considered:** Acknowledge editor's perspective from COMMENTs but maintain neutral tone

**Citation:**
- Format: [N] where N is number in reference list
- Cite after claim: "Energy savings average 25% [1,3,7]."
- Multiple sources when convergent evidence
- Single source for unique claims

**Confidence signaling:**
- Use language appropriate to confidence level:
  - STRONG: "Evidence demonstrates...", "Studies consistently show..."
  - MODERATE: "Evidence suggests...", "Research indicates..."
  - TENTATIVE: "Limited evidence suggests...", "Some studies indicate..."
  - SPECULATIVE: "It is hypothesized...", "Projections suggest..."

**Paragraph length:**
- Target: 150-250 words per paragraph
- Maximum: 300 words
- Break long paragraphs for readability

**Section length:**
- CRITICAL theme sections: 1,000-1,500 words
- HIGH priority sections: 800-1,200 words
- MEDIUM priority sections: 600-1,000 words
- LOW priority sections: 400-600 words

#### 5.4 Timeline and Cast of Characters

**Purpose:** Provide historical context and map the ecosystem of researchers/institutions.

**Length:** 400-600 words total

**When to include:**
- ALWAYS for Tipo A (Revisión Histórica) - make timeline extensive
- RECOMMENDED for all other types when topic has significant history or multiple actors
- OPTIONAL if topic is very recent (<2 years) or has minimal historical development

**Structure:**

##### (N+1).1 Historical Timeline

**Format A: Table** (if many events, 10+)

```markdown
La siguiente cronología presenta los hitos principales en la evolución de [TOPIC]:

| Año | Evento/Publicación | Significancia |
|-----|-------------------|---------------|
| 1995 | [Event description] | [Why this mattered - paradigm shift, new methodology, etc.] |
| 2003 | [Publication: Author, "Title"] | [Impact on field] |
| 2010 | [Institutional development] | [Significance] |

[Follow with interpretive paragraph discussing patterns, phases, accelerations]
```

**Format B: Narrative** (if fewer events, <10)

```markdown
La evolución de [TOPIC] puede trazarse a través de varios momentos clave. 
Los orígenes del campo se remontan a [year/event], cuando [description] [source]. 
Este desarrollo inicial estableció [foundation].

La siguiente fase significativa ocurrió en [year], con [event/publication]. 
[Author/institution] [contribution] [source], lo que representó [significance - 
e.g., cambio de paradigma, avance metodológico, expansión de aplicaciones].

[Continue chronologically, showing evolution and building toward current state]

Más recientemente, entre [years], el campo ha experimentado [recent trends], 
evidenciado por [examples]. Estos desarrollos sugieren [where field is heading].
```

##### (N+1).2 Key Actors (Cast of Characters)

**Format:**

```markdown
**Autores Principales:**

**[Author 1 Name]** ([Affiliation])
- Background: [Academic/professional background relevant to topic]
- Key Contributions: [What they've contributed to the field]
- Theoretical Position: [Which school of thought/approach]
- Notable Works: [1-2 key publications with citations]

**[Author 2 Name]** ([Affiliation])
[Same structure]

[Continue for major authors - typically 5-10]

---

**Instituciones Clave:**

**[Institution 1]**
- Role in field: [What this institution contributes - research, standards, practice]
- Notable work: [Key publications, projects, or initiatives]
- Influence: [How they've shaped the field]

[Continue for major institutions - typically 3-7]

---

**Escuelas de Pensamiento:** [If applicable]

**[School 1 Name]**
- Core tenets: [What defines this approach]
- Main proponents: [Key figures]
- Institutional base: [Where this school is strongest]
- Influence: [Impact on field]

[Continue if there are distinct schools]
```

**Writing guidelines:**
- Be concise - brief profiles, not full biographies
- Focus on relevance to the TOPIC
- Show the ecosystem: who influences whom, institutional connections
- Distinguish between historical foundational figures and current active researchers
- Cite sources for biographical information and contributions

**When to skip:**
- Topic has no significant history (very new development)
- Single-author work with no broader ecosystem
- Editor explicitly indicated this is not needed

#### 5.6 Special Sections

**SYNTHESIS Section:**

This is critical for RESEARCH_DEEP_DIVE. Must include:

1. **Cross-theme connections**
   - How findings from different themes relate
   - Emergent patterns not visible in individual sections

2. **Response to editor's broader perspective**
   - Address COMMENT annotations that provided philosophical context
   - Show how research informs editor's hypotheses

3. **Contradictions and tensions**
   - Acknowledge where evidence conflicts
   - Explain why (methodology, perspective, data differences)

4. **Confidence about confidence**
   - Meta-assessment: How solid is the overall evidence base?
   - What are the strongest vs weakest areas?

**IMPLICATIONS Section:**

Directly useful for next phase (writing):

1. **Key points for POST/LIBRO**
   - What are the must-include findings?
   - What are the most compelling arguments?

2. **Potential angles**
   - Based on this research, what narrative angles are strongest?
   - What angles lack support?

3. **Remaining research needs**
   - If editor wants to strengthen further, what should be prioritized?

#### 5.7 Generate Reference List

```markdown
## REFERENCES

[1] Author, A. A., & Author, B. B. (Year). Title of article. *Journal Name*, volume(issue), pages. DOI

[2] Author, C. C. (Year). *Title of book*. Publisher.

[3] Institution Name. (Year). *Title of report*. Retrieved from URL

[...]
```

**Format:** IEEE style (numbered)

**Order:** Order of appearance in text (not alphabetical)

**Completeness:** Every [N] citation must have corresponding reference

#### 5.8 Quality Self-Check Before Finalizing

Before presenting to user, verify:

**Structure:**
- ✓ All required sections present
- ✓ Timeline and Cast of Characters included (unless topic exempts)
- ✓ Metadata complete
- ✓ Length within target range (5,000-10,000 words typical)

**Content:**
- ✓ All TASK annotations addressed (100%)
- ✓ All COMMENT contexts considered
- ✓ All LINE priorities reflected
- ✓ No LINE: OMIT topics included

**Timeline and Cast:**
- ✓ Timeline format appropriate (table vs narrative)
- ✓ Key events included with significance explained
- ✓ Main researchers/institutions profiled
- ✓ Ecosystem connections shown
- ✓ Sources cited for biographical/historical claims

**Quality:**
- ✓ Source distribution acceptable (≥30% Tier 1 ideal)
- ✓ Confidence distribution acceptable (≥40% STRONG ideal)
- ✓ All major claims cited
- ✓ Confidence levels assigned and signaled in text

**Writing:**
- ✓ Narrative style (not lists)
- ✓ Synthesis (not just summaries)
- ✓ Paragraph length controlled
- ✓ Citations formatted correctly

**Validation:**
- ✓ CLAIM_VALIDATION_CRITERIA applied
- ✓ Red flags noted if any
- ✓ Limitations acknowledged
- ✓ Gaps documented

---

## PART IV: OUTPUT SPECIFICATIONS

### 4.1 Document Identification

**File Naming:**
```
RESEARCH_DEEP_DIVE_[TOPIC]_[DATE]_v[X.Y].md

Examples:
- RESEARCH_DEEP_DIVE_SmartBuildings_20260125_v1.0.md
- RESEARCH_DEEP_DIVE_AIAlignment_20260201_v1.0.md
```

**Metadata Block:**
```markdown
**Topic:** [Full topic name]
**Research Type:** RAMA A - Deep Dive
**Editor:** [Editor name]
**Date:** [Completion date]
**Version:** [Version number]
**Status:** [Draft / Final / Revised]
**Word Count:** [Approximate count]
**Source Count:** [N sources] ([N] Tier 1, [N] Tier 2, [N] Tier 3)
**Intended Use:** [POST / LIBRO / Both]
```

### 4.2 Length Targets

**Total Length:** 5,000-10,000 words typical

**Distribution (flexible):**
- Executive Summary: 400-600 words (5-8%)
- Introduction: 600-1,000 words (8-12%)
- Body Sections: 3,000-6,000 words (60-70%)
- Synthesis: 800-1,200 words (10-15%)
- Methodology: 400-600 words (5-8%)
- Implications: 300-500 words (3-5%)
- References: Variable

**Adjustment factors:**
- High annotation density → longer
- Complex topic → longer
- Multiple CRITICAL themes → longer
- Simple TASKs → potentially shorter (but maintain depth)

**Minimum threshold:** 5,000 words to ensure sufficient depth

**Maximum recommended:** 12,000 words (beyond this, consider RAMA B structure)

### 4.3 Quality Checklist

Use this checklist before delivering final document:

**Completeness:**
- [ ] All TASK annotations addressed
- [ ] All LINE priorities reflected
- [ ] All COMMENT contexts considered
- [ ] No OMIT lines included
- [ ] All research jobs from STEP 2 completed or justified if skipped

**Source Quality:**
- [ ] Tier 1 sources ≥30% (ideal ≥40%)
- [ ] All sources classified by Tier
- [ ] Source inventory included
- [ ] Reference list complete and formatted

**Claim Quality:**
- [ ] All major claims cited
- [ ] Confidence levels assigned (STRONG/MODERATE/TENTATIVE/SPECULATIVE)
- [ ] STRONG confidence ≥40% of claims
- [ ] TENTATIVE + SPECULATIVE ≤30% of claims
- [ ] Confidence signaled in text language

**Validation:**
- [ ] CLAIM_VALIDATION_CRITERIA applied
- [ ] Red flags identified if any
- [ ] Contradictions acknowledged and explained
- [ ] Gaps documented in Methodology section

**Structure:**
- [ ] All required sections present
- [ ] Timeline and Cast of Characters included (if applicable)
- [ ] Timeline format appropriate (table vs narrative)
- [ ] Key actors profiled with sources
- [ ] Sections organized logically
- [ ] Length targets approximately met
- [ ] Metadata complete

**Writing Quality:**
- [ ] Narrative style (not bullet lists in body)
- [ ] Synthesis not just summary
- [ ] Paragraphs ≤300 words
- [ ] Smooth transitions between sections
- [ ] Critical analysis present (not just reporting)

**Utility:**
- [ ] Directly useful for writing POST/LIBRO
- [ ] Implications section provides actionable guidance
- [ ] Synthesis section integrates findings
- [ ] Remaining gaps clearly identified

---

## PART V: SPECIAL CASES AND EDGE CONDITIONS

### 5.1 Minimal Annotations (<10 flags)

**Situation:** Editor provided few annotations.

**Decision:** Reconsider if RAMA A is necessary.

**Options:**
1. Execute RAMA A but with reduced scope (3-5 hours, 3,000-5,000 words)
2. Suggest skipping RAMA A and going to writing directly
3. Suggest executing RAMA B instead if goal is LIBRO

**Communication with user:**
```
"Low Annotation Density Detected
================================

Annotations found:
- TASK: [N] (<10)
- LINE modifications: [N]
- COMMENT: [N]

RAMA A is optimized for substantial annotation (≥15 flags).
With current annotation level, options:

1. Execute lightweight RAMA A (3-5h, 3,000-5,000 words)
2. Skip RAMA A and proceed to writing
3. If goal is LIBRO, consider RAMA B instead

Your preference? [1/2/3]"
```

### 5.2 Extreme Annotation Density (>40 flags)

**Situation:** Editor provided very extensive annotations.

**Decision:** Warn about effort and consider multi-stage approach.

**Communication:**
```
"High Annotation Density Detected
=================================

Annotations found:
- TASK: [N]
- LINE modifications: [N]
- COMMENT: [N]
Total: [N] flags (>40)

Estimated effort: [X-Y hours] (higher than typical RAMA A)

Options:
1. Execute full RAMA A (may take 15-25 hours)
2. Prioritize subset of annotations (which ones?)
3. Consider multi-stage: Execute CRITICAL+HIGH now, MEDIUM+LOW later

Your preference? [1/2/3]"
```

### 5.3 Conflicting Annotations

**Situation:** LINE says OMIT but TASK asks to research it, or similar contradiction.

**Resolution:**
1. Flag contradiction to user
2. Ask for clarification
3. Default: OMIT takes precedence (exclusion is explicit)

**Communication:**
```
"Annotation Conflict Detected
============================

LINE 5: [Topic] marked OMIT - Out of scope
BUT
TASK in REFERENCE_SUMMARY: [Task asking to research same topic]

How to resolve?
1. OMIT takes precedence (exclude from research)
2. TASK takes precedence (include in research)
3. Editor clarifies intent

Your preference? [1/2/3]"
```

### 5.4 No Suitable Sources Found

**Situation:** Research job finds insufficient sources.

**Response:**
1. Document gap clearly
2. Lower confidence to TENTATIVE or SPECULATIVE
3. Explain why sources are lacking
4. Suggest alternative approaches if any

**Example in document:**
```markdown
### 2.3 [Theme]: Source Limitation

The editor's TASK requested [specific information]. However, 
extensive search across [databases] using keywords [X, Y, Z] 
yielded limited relevant sources:

- No Tier 1 sources found addressing this specific question
- 2 Tier 2 sources mentioned it tangentially [1,2]
- This gap likely exists because [reason - e.g., topic is very 
  recent, niche area, conflates concepts]

**Finding (TENTATIVE):** Based on limited evidence [synthesis]...

**Recommendation:** [Alternative approach or acceptance of gap]
```

### 5.5 Editor Hypothesis Contradicted by Evidence

**Situation:** COMMENT expresses editor's belief/hypothesis, but research finds contrary evidence.

**Response:**
1. Present evidence honestly
2. Acknowledge editor's perspective
3. Explain discrepancy
4. Maintain neutral, respectful tone

**Example:**
```markdown
The editor noted (COMMENT): "I'm skeptical of optimistic claims 
about user satisfaction with automated systems."

However, research findings present a more nuanced picture:

[Evidence showing user satisfaction can be high under certain conditions]
Confidence: STRONG

This apparent contradiction with the editor's intuition may be 
explained by:
1. Context-dependency: User satisfaction varies significantly by...
2. Measurement differences: Studies using [methodology] vs [methodology]...

The editor's skepticism is warranted for [specific contexts], but 
the evidence suggests [other contexts] show different patterns.
```

---

## PART VI: RELATIONSHIP TO OTHER SYSTEM COMPONENTS

### 6.1 Integration with RAMA B

**Sequential execution (RAMA A → RAMA B):**

If editor executes RAMA A first, then RAMA B:

1. RESEARCH_DEEP_DIVE becomes additional input to RAMA B
   - Provides context and preliminary findings
   - Can inform Research Focus selection
   - May suggest Research Jobs for RAMA B

2. Avoid duplication:
   - RAMA B should extend, not repeat, RAMA A findings
   - RAMA B research jobs can reference DEEP_DIVE findings
   - RAMA B final report can cite DEEP_DIVE as source

**Parallel execution (RAMA A + RAMA B simultaneously):**

Typically not recommended - sequential is more efficient.

**Use case for parallel:**
- Large team
- Very broad topic requiring both exploratory (RAMA A) and structured (RAMA B) investigation

### 6.2 Use in EVALUATE_RESEARCH_REPORT

**Optional:** RESEARCH_DEEP_DIVE can be evaluated using EVALUATE_RESEARCH_REPORT v1.0

**When to evaluate RAMA A:**
- Editor wants formal quality assessment before writing
- Very high-stakes POST where quality must be validated
- Editor plans to publish DEEP_DIVE directly (not just use as base)

**When to skip evaluation:**
- Editor trusts the process
- Low-stakes POST
- Time constraints

**Evaluation considerations:**
- RAMA A is more flexible than RAMA B, so some evaluation criteria may need adjustment
- Focus on: Source Quality, Claim Quality, Coverage (less on Methodological adherence to template)

### 6.3 Integration with Writing Phase

**RESEARCH_DEEP_DIVE → POST Writing:**

1. Use as comprehensive reference
2. Extract key findings for post
3. Synthesize multiple findings into post's narrative
4. Use IMPLICATIONS section as starting point
5. Confidence levels inform tone (don't overstate TENTATIVE findings)

**RESEARCH_DEEP_DIVE → LIBRO Writing:**

1. Can serve as one chapter's research base
2. Can provide context for RAMA B reports
3. May identify angles that inform book structure

---

## PART VII: EXAMPLE EXECUTION SCENARIOS

### Scenario 1: Moderate Annotation Density (18 flags)

**Input:**
- ANNOTATED_REFERENCE_SUMMARY: 8 TASK, 4 COMMENT
- ANNOTATED_RESEARCH_PLAN: 3 LINE modifications (2 PRIORITY HIGH, 1 Focus), 3 TASK

**STEP 1 Output:**
- 5 research themes identified
- Priority: 2 CRITICAL, 2 HIGH, 1 MEDIUM

**STEP 2 Output:**
- 5 research jobs created
- Estimated effort: 8-12 hours

**STEP 3-4 Execution:**
- ~10 hours research
- 45 sources found (18 Tier 1, 20 Tier 2, 7 Tier 3)
- Confidence distribution: 55% STRONG, 30% MODERATE, 15% TENTATIVE

**STEP 5 Output:**
- RESEARCH_DEEP_DIVE: 7,500 words
- 5 main body sections + synthesis + methodology + implications
- Publication-ready quality

**Timeline:** ~14 hours total (10h research + 4h writing)

### Scenario 2: High Annotation Density (35 flags)

**Input:**
- ANNOTATED_REFERENCE_SUMMARY: 15 TASK, 8 COMMENT
- ANNOTATED_RESEARCH_PLAN: 6 LINE modifications (4 PRIORITY HIGH), 6 TASK

**STEP 1 Output:**
- 9 research themes identified
- Priority: 4 CRITICAL, 3 HIGH, 2 MEDIUM

**STEP 2 Output:**
- 9 research jobs created
- Estimated effort: 16-24 hours

**Editor adjustment:**
- Decides to execute CRITICAL + HIGH first (7 jobs)
- Defer MEDIUM for later if needed

**STEP 3-4 Execution:**
- ~18 hours research (7 jobs)
- 72 sources found (32 Tier 1, 28 Tier 2, 12 Tier 3)
- Confidence distribution: 48% STRONG, 35% MODERATE, 17% TENTATIVE

**STEP 5 Output:**
- RESEARCH_DEEP_DIVE: 9,800 words
- 7 main body sections + extensive synthesis + methodology + implications
- High quality, some gaps acknowledged in MEDIUM priority areas

**Timeline:** ~24 hours total (18h research + 6h writing)

### Scenario 3: Low Annotation, Clarification Focus (9 flags)

**Input:**
- ANNOTATED_REFERENCE_SUMMARY: 6 TASK (mostly "verify this statistic" type)
- ANNOTATED_RESEARCH_PLAN: 2 LINE modifications, 1 TASK

**STEP 1 Output:**
- 4 research themes (all narrow clarifications)
- Priority: 1 CRITICAL, 3 HIGH

**STEP 2 Output:**
- 4 lightweight research jobs
- Estimated effort: 4-6 hours

**STEP 3-4 Execution:**
- ~5 hours research
- 23 sources (8 Tier 1, 10 Tier 2, 5 Tier 3)
- Mostly verification/update of existing claims

**STEP 5 Output:**
- RESEARCH_DEEP_DIVE: 4,200 words (lightweight)
- 4 concise sections + brief synthesis + methodology
- Focused on clarifications, not expansive exploration

**Timeline:** ~7 hours total (5h research + 2h writing)

---

## PART VIII: TROUBLESHOOTING

### Issue 1: "I can't find enough sources for a research job"

**Diagnosis:**
- Topic is very niche
- Keywords may be wrong
- Sources may exist but behind paywalls
- Topic is too recent for published research

**Solutions:**
1. Broaden keywords
2. Search gray literature (reports, white papers)
3. Accept TENTATIVE confidence and document gap
4. Consult REFERENCE_SUMMARY for alternative terminology
5. Check if adjacent topics have transferable findings

### Issue 2: "Sources contradict each other significantly"

**Diagnosis:**
- Legitimate scientific debate
- Different methodologies
- Different definitions of key terms
- Different contexts (geography, industry, time period)

**Solutions:**
1. Don't force consensus - acknowledge debate
2. Analyze WHY they disagree (methodology, data, assumptions)
3. Assess quality of each side of debate
4. Assign MODERATE or TENTATIVE confidence
5. Present both perspectives in DEEP_DIVE

### Issue 3: "Research is taking much longer than estimated"

**Diagnosis:**
- Underestimated complexity
- Sources are dense/technical
- Many rabbit holes
- Saturation criteria unclear

**Solutions:**
1. Reassess scope with user
2. Apply stricter saturation criteria
3. Defer LOW priority jobs
4. Accept MODERATE confidence for some jobs instead of pursuing STRONG

### Issue 4: "Editor's TASK is ambiguous or unclear"

**Diagnosis:**
- TASK annotation not specific enough
- Context missing
- Multiple interpretations possible

**Solutions:**
1. Interpret charitably (best guess at intent)
2. Flag ambiguity in DEEP_DIVE
3. Provide multiple interpretations if truly unclear
4. If critical, pause and ask editor for clarification

### Issue 5: "Too many TENTATIVE/SPECULATIVE findings"

**Diagnosis:**
- Topic is immature field
- Editor asking questions ahead of evidence base
- Limited authoritative sources available

**Solutions:**
1. Accept limitation - document clearly
2. Use gray literature more (industry reports, white papers)
3. Consider qualitative sources (case studies, expert interviews if accessible)
4. Frame as "state of current knowledge" vs "what we wish we knew"
5. Flag in Methodology section as significant limitation

---

## PART IX: SUCCESS CRITERIA

### For the AI Executing This Prompt

**You have succeeded if:**

✅ **Completeness:**
- All TASK annotations addressed (100%)
- All LINE priorities reflected appropriately
- All COMMENT contexts meaningfully considered
- No OMIT lines inappropriately included

✅ **Quality:**
- Source distribution ≥30% Tier 1 (≥40% ideal)
- Confidence distribution ≥40% STRONG (≥50% ideal)
- All major claims cited with appropriate sources
- CLAIM_VALIDATION_CRITERIA applied throughout

✅ **Structure:**
- Document is coherent and readable
- Sections flow logically
- Length is appropriate to scope (5,000-10,000 words typical)
- All required sections present

✅ **Utility:**
- IMPLICATIONS section provides clear guidance for writing phase
- SYNTHESIS section integrates findings meaningfully
- Document is directly usable as base for POST/LIBRO
- Gaps and limitations clearly acknowledged

✅ **Neutrality:**
- Research is thorough and balanced
- Editor's perspective considered but not blindly followed
- Evidence presented honestly even if contradicts editor's hypothesis
- Multiple perspectives included when debate exists

### For the Editor Reviewing Output

**You should approve if:**

✅ Your questions (TASK annotations) are answered  
✅ Your priorities (LINE modifications) are reflected  
✅ Your perspective (COMMENT annotations) is considered  
✅ The research is thorough and well-sourced  
✅ Confidence levels seem appropriate (not overclaimed)  
✅ The document gives you what you need to write POST/LIBRO  
✅ Gaps and limitations are honestly acknowledged  

**You should request revision if:**

❌ Critical TASK not answered or poorly answered  
❌ Sources seem low-quality or insufficient  
❌ Findings seem overclaimed (confidence too high)  
❌ Your perspective was misunderstood  
❌ Document is too short/shallow  
❌ Structure is confusing  

---

## PART X: FINAL NOTES

### 10.1 Philosophical Approach

RAMA A embodies "neutral deep investigation" - it follows the editor's concerns (via annotations) but doesn't presuppose conclusions. It respects the editor's intelligence by:

1. **Taking annotations seriously** - Every flag is meaningful
2. **Investigating honestly** - Present evidence even if contradicts editor's hypothesis
3. **Maintaining rigor** - Same quality standards as RAMA B
4. **Being useful** - Direct utility for writing phase

### 10.2 Relationship to "Centauro Method"

RAMA A exemplifies the Centauro philosophy:

- **IA as researcher:** Executes systematic investigation
- **Editor as curator:** Guides via annotations what matters
- **Transparency:** All process documented
- **Collaboration:** Neither IA nor editor alone could produce this

### 10.3 When RAMA A Shines

RAMA A is optimal for:
- **Exploratory writing** - Editor knows topic matters but not exact angle
- **Verification-heavy projects** - Many claims to check
- **Hypothesis-testing** - Editor has hunches to investigate
- **Flexible post writing** - Structure emerges from research, not imposed

### 10.4 When RAMA B Is Better

RAMA B is optimal for:
- **Structured books** - Clear Research Focus from start
- **Comprehensive coverage** - Need systematic treatment of topic
- **Publication-grade rigor** - Book will be sold/published
- **Template-friendly topics** - Fits one of 7 Research Focus types clearly

### 10.5 Using Both

The most powerful approach for serious books:
1. **RAMA A first** - Explore, verify, test hypotheses
2. **Review findings** - Clarify what structure makes sense
3. **RAMA B second** - Execute structured report with Focus informed by RAMA A
4. **Result:** Deep, flexible exploration + structured, comprehensive coverage

---

**END OF PROMPT**

**Version:** 1.0  
**Status:** Ready for use  
**Next step:** Execute with real project annotations

