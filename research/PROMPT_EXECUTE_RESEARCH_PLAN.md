# EXECUTE_RESEARCH_PLAN: DEEP RESEARCH EXECUTION SYSTEM

**Version:** 1.0  
**Date:** January 24, 2026  
**Optimized for:** Claude Sonnet 4.5 and similar LLMs  
**Context:** "Tinta Artificial" - Deep Research Execution Phase

---

## PART I: MISSION AND CONTEXT

### 1.1 Purpose

This prompt guides the **execution** of a detailed research plan, transforming research jobs into a comprehensive academic research report. The execution involves systematic source searching, evidence gathering, validation, synthesis, and report writing.

### 1.2 Prerequisites

**This prompt can ONLY be executed after:**
1. CREATE_RESEARCH_PLAN v2.0 has been completed
2. Editor has reviewed and approved RESEARCH_PLAN_DETAILED
3. Editor has reviewed and approved WRITING_INSTRUCTIONS_ADAPTED

**Do not proceed without approved planning documents.**

### 1.3 Workflow Position

```
[PLANNING PHASE - COMPLETED]
└─ RESEARCH_PLAN_DETAILED v4.0 (approved)
└─ WRITING_INSTRUCTIONS_ADAPTED (approved)

[EXECUTION PHASE - CURRENT]
    ↓
EXECUTE_RESEARCH_PLAN (this prompt)
    ↓
├─ Task 1: Execute Research Jobs
├─ Task 2: Synthesize Findings
└─ Task 3: Write Research Report
    ↓
OUTPUT: RESEARCH_REPORT_[TOPIC]_[FOCUS]_v1.0.md
    ↓
[REVIEW AND ITERATION]
└─ Editor reviews
└─ Refinements if needed
    ↓
OUTPUT FINAL: RESEARCH_REPORT_[TOPIC]_[FOCUS]_FINAL.md
```

### 1.4 Core Principles

1. **Systematic Execution:** Follow research jobs sequentially respecting dependencies
2. **Rigorous Validation:** Apply SOURCE_AUTHORITY_HIERARCHY and CLAIM_VALIDATION_CRITERIA
3. **Evidence-Based:** Every claim must be supported by cited sources
4. **Transparent Methodology:** Document search process and limitations
5. **Quality Over Speed:** Thoroughness takes precedence over completion time

---

## PART II: INPUT VERIFICATION

### 2.1 Mandatory Inputs

Before starting, verify access to:

1. **RESEARCH_PLAN_DETAILED** v4.0 (or latest approved version)
   - Contains all research jobs with structured specifications
   - Source strategies defined
   - Integration mapping complete

2. **WRITING_INSTRUCTIONS_ADAPTED**
   - Customized structure for this topic and focus
   - Length targets set
   - Style and integration guidance provided

3. **SOURCE_AUTHORITY_HIERARCHY** (latest version)
   - Tier 1-3 sources for relevant topic(s)
   - Search strategies
   - Validation checks

4. **CLAIM_VALIDATION_CRITERIA**
   - Evidence sufficiency guidelines
   - Quality assessment frameworks

5. **REFERENCE_SUMMARY** (from planning phase)
   - Original context and initial references
   - May need to re-verify specific claims

6. **Original References** (if accessible)
   - PDFs, URLs, documents from initial phase
   - Useful for verification or direct citation

### 2.2 Verification Protocol

**Execute this before starting:**

```
STEP 0: INPUT VERIFICATION

1. Request filenames:
   - RESEARCH_PLAN_DETAILED: _______________
   - WRITING_INSTRUCTIONS_ADAPTED: _______________
   - SOURCE_AUTHORITY_HIERARCHY: _______________
   - CLAIM_VALIDATION_CRITERIA: _______________
   - REFERENCE_SUMMARY: _______________
   - Original References folder/files: _______________

2. Verify access to each file
   - [✓] RESEARCH_PLAN_DETAILED readable
   - [✓] WRITING_INSTRUCTIONS_ADAPTED readable
   - [✓] SOURCE_AUTHORITY_HIERARCHY readable
   - [✓] CLAIM_VALIDATION_CRITERIA readable
   - [✓] REFERENCE_SUMMARY readable
   - [✓] Original References accessible

3. Extract key metadata from RESEARCH_PLAN_DETAILED:
   - Total research jobs: [N]
   - Research focus: [X]
   - Narrative arc: [X or NEUTRAL]
   - Estimated total effort: [Y] hours

4. Confirm execution:
   "All inputs verified. Ready to execute research plan with [N] jobs.
   Estimated completion time: [Y] hours of AI work + editor review cycles.
   
   Confirm start execution: [Y/N]"
```

**Only proceed after explicit confirmation.**

---

## PART III: EXECUTION TASKS

### Overview

Execution proceeds in 3 main tasks:

```
TASK 1: EXECUTE RESEARCH JOBS
├─ For each job: search, extract, validate, document
├─ Respect dependencies and priorities
└─ Compile findings systematically

    ↓ [Editor Checkpoint]

TASK 2: SYNTHESIZE FINDINGS
├─ Organize findings by report section
├─ Resolve contradictions
├─ Assess evidence strength
└─ Prepare structured synthesis

    ↓ [Editor Checkpoint]

TASK 3: WRITE RESEARCH REPORT
├─ Follow WRITING_INSTRUCTIONS_ADAPTED
├─ Maintain narrative arc (if not NEUTRAL)
├─ Integrate all research jobs
└─ Include full methodology section

    ↓ [Editor Checkpoint]

OUTPUT: RESEARCH_REPORT
```

---

### TASK 1: EXECUTE RESEARCH JOBS

**Objective:** Systematically execute all research jobs from RESEARCH_PLAN_DETAILED, gathering evidence, validating claims, and documenting findings.

#### 1.1 Execution Sequence

**Determine order:**

1. **Priority-first approach:**
   - All CRITICAL jobs first
   - Then HIGH priority jobs
   - Then MEDIUM/LOW if time permits

2. **Dependency-first approach:**
   - Jobs with no dependencies first
   - Then jobs that depend on completed jobs
   - Ensures logical progression

**Recommended:** Hybrid approach
- Execute CRITICAL jobs respecting dependencies
- Interleave HIGH priority jobs
- Save MEDIUM/LOW for end

**Document sequence:**

Create execution log:

```markdown
# RESEARCH EXECUTION LOG - [TOPIC]

## Execution Order

| Order | Job ID | Title | Priority | Dependencies | Status |
|-------|--------|-------|----------|--------------|--------|
| 1 | JOB-001 | Core Concepts | CRITICAL | None | PENDING |
| 2 | JOB-004 | Historical Origins | HIGH | JOB-001 | PENDING |
| 3 | JOB-002 | Theoretical Frameworks | CRITICAL | JOB-001 | PENDING |
[...]

**Start Time:** [Timestamp]
```

#### 1.2 For Each Research Job

**Execute following protocol:**

---

**RESEARCH JOB EXECUTION PROTOCOL**

**JOB ID:** [XXX]  
**Title:** [Job title from plan]  
**Priority:** [Level]  
**Status:** EXECUTING

---

**PHASE A: SEARCH**

**Objective:** Find sources according to job's source strategy.

**Actions:**

1. **Review Source Strategy from job specification:**
   ```
   - Tier 1 priority: [sources from plan]
   - Keywords: [terms from plan]
   - Databases: [where to search]
   - Time frame: [when to focus]
   - Saturation criteria: [when to stop]
   ```

2. **Execute Tier 1 Search:**
   - Use SOURCE_AUTHORITY_HIERARCHY to identify Tier 1 sources
   - Search databases using keywords
   - Focus on time frame specified
   - Document sources found

3. **Assess Tier 1 Results:**
   - Did we find sufficient sources? (per saturation criteria)
   - Is evidence convergent or divergent?
   - Are research questions answerable?

4. **Expand to Tier 2 if needed:**
   - If Tier 1 insufficient or silent on topic
   - Or if looking for alternative perspectives
   - Document additional sources

5. **Use web_search if appropriate:**
   - For very recent developments (2024-2025)
   - For grey literature or industry reports
   - For specific statistics or data
   - **ALWAYS validate web search results against SOURCE_AUTHORITY_HIERARCHY**

6. **Document Search Process:**
   ```markdown
   **Search Log for JOB-XXX:**
   
   Tier 1 Search:
   - Database: Google Scholar
   - Keywords: "smart building energy efficiency 2023"
   - Results found: 15 papers
   - Reviewed: 8 papers (top ranked)
   - Relevant: 5 papers
   
   Tier 2 Search:
   - [If executed]
   
   Web Search:
   - Query: "smart building adoption statistics 2024"
   - Results: 3 industry reports
   - Validated: 2 reports (from known firms)
   
   **Saturation Assessment:** Reached saturation - 3 Tier 1 sources converge
   ```

---

**PHASE B: EXTRACT**

**Objective:** Extract relevant information from found sources.

**Actions:**

1. **For each source, extract:**
   - **Bibliographic data:** Author, title, publication, year, URL/DOI
   - **Source tier:** Verify against SOURCE_AUTHORITY_HIERARCHY
   - **Relevant findings:** Answers to job's research questions
   - **Evidence type:** Quantitative data / qualitative / case study / theoretical
   - **Methodology:** How did they reach conclusions?
   - **Confidence:** Author's own caveats or limitations

2. **Organize extractions by research question:**
   ```markdown
   **Extractions for JOB-XXX:**
   
   **Research Question 1:** [Question from job spec]
   
   Source [1] (Tier 1 - Journal of Building Tech, 2023):
   - Finding: "Energy savings averaged 23% ±5% in 15 case studies"
   - Evidence: Quantitative, n=15 buildings
   - Method: Pre-post comparison with control group
   - Confidence: High (peer-reviewed, good methodology)
   
   Source [2] (Tier 1 - European Commission Report, 2024):
   - Finding: "Adoption increased 34% in EU from 2021-2023"
   - Evidence: Survey data, n=500 buildings
   - Method: Industry survey
   - Confidence: Moderate (self-reported data, potential bias)
   
   Source [3] (Tier 2 - Industry white paper, 2023):
   - Finding: "ROI typically 3-5 years for medium-size installations"
   - Evidence: Case compilation
   - Method: Vendor case studies
   - Confidence: Lower (vendor-sponsored, selection bias likely)
   
   **Research Question 2:** [Next question]
   [...]
   ```

3. **Flag contradictions:**
   - Note when sources disagree
   - Document both positions
   - Don't resolve yet (that's in Phase C)

---

**PHASE C: VALIDATE**

**Objective:** Assess quality and confidence level of findings.

**Actions:**

1. **Apply Validation Checks from CLAIM_VALIDATION_CRITERIA:**
   
   For each finding:
   - Does it pass topic-specific validation checks?
   - Example: "Is sample size statistically significant?"
   - Example: "Is methodology appropriate for claim?"
   
   Document validation:
   ```markdown
   **Validation for Finding X:**
   
   Claim: "Energy savings average 23%"
   
   Checks Applied:
   - Sample size adequate? [✓] n=15 is acceptable for pilot evidence
   - Methodology sound? [✓] Pre-post with control is appropriate
   - Peer-reviewed? [✓] Published in reputable journal
   - Independent? [✓] University research, no vendor funding
   - Replicable? [~] Method described but some details missing
   
   Validation Result: PASS with minor caveats
   ```

2. **Assess Evidence Strength:**
   
   Using Evidence Sufficiency Guidelines from CLAIM_VALIDATION_CRITERIA:
   
   ```markdown
   **Evidence Assessment for Research Question 1:**
   
   Claim: "Smart building systems provide 20-25% energy savings"
   
   Evidence:
   - Tier 1 sources: 3 (convergent on 20-25% range)
   - Tier 2 sources: 2 (support, one slightly higher at 30%)
   - Methodological quality: High (controlled studies)
   - Convergence: Strong (narrow range)
   
   **Confidence Level: STRONG**
   Justification: Multiple Tier 1 sources with good methodology converge on similar figures
   ```
   
   Confidence levels:
   - **STRONG:** 2+ Tier 1 convergent, OR 1 Tier 1 + 3+ Tier 2 convergent, OR systematic review
   - **MODERATE:** 1 Tier 1, OR 3+ Tier 2 convergent, OR strong Tier 2 with caveats
   - **TENTATIVE:** Limited sources, OR single Tier 2/3, OR conflicting evidence
   - **INSUFFICIENT:** Cannot determine from available sources

3. **Resolve Contradictions:**
   
   When sources disagree:
   
   a) **Check if addressing same question:**
      - Different contexts? (geography, time period, subsector)
      - Different definitions? (what counts as "smart building"?)
      - If not same question → both may be valid in context
   
   b) **Assess methodological quality:**
      - Better methodology wins
      - Or: Flag methodological limitation as reason for divergence
   
   c) **Look for meta-analysis:**
      - Search for systematic reviews addressing the contradiction
      - These often resolve conflicts by identifying moderating factors
   
   d) **Document unresolved contradictions:**
      ```markdown
      **Contradiction Identified:**
      
      Source A (Tier 1): "ROI is 3-5 years"
      Source B (Tier 1): "ROI is 7-10 years"
      
      Analysis:
      - Both are high-quality sources
      - Difference likely due to: building size (A studied small-medium, B studied large buildings)
      - Context matters: ROI varies by scale
      
      Resolution: Present both with context - ROI depends on building size
      ```

4. **Document Gaps:**
   
   ```markdown
   **Gaps Identified in JOB-XXX:**
   
   - Research Question 4 partially unanswered: no data on Spanish market specifically
   - Evidence for claim Y is TENTATIVE: only one Tier 2 source found
   - Contradiction on Z remains unresolved: no meta-analysis available
   
   Recommendation: Note limitations in report methodology section
   ```

---

**PHASE D: DOCUMENT**

**Objective:** Compile findings into structured format for synthesis phase.

**Actions:**

1. **Create Job Completion Summary:**
   
   ```markdown
   ## JOB-XXX COMPLETION SUMMARY
   
   **Job:** [Title]  
   **Priority:** [Level]  
   **Status:** COMPLETED  
   **Completion Time:** [Hours actual vs estimated]
   
   ### Sources Consulted
   - Tier 1: [N] sources
   - Tier 2: [M] sources
   - Tier 3/Web: [P] sources
   - Total: [N+M+P]
   
   **Primary Sources:**
   [1] Author, "Title," Publication, Year. [Tier 1] [URL]
   [2] Author, "Title," Publication, Year. [Tier 1]
   [...]
   
   ### Research Questions Answered
   
   **Q1:** [Question]
   **Answer:** [Synthesized answer from sources]
   **Evidence Strength:** STRONG/MODERATE/TENTATIVE
   **Key Sources:** [1], [2], [3]
   
   **Q2:** [Question]
   **Answer:** [...]
   [...]
   
   ### Key Findings
   - Finding 1: [Statement] [Evidence: STRONG] [Sources: 1,2]
   - Finding 2: [Statement] [Evidence: MODERATE] [Sources: 3,4,5]
   - Finding 3: [Statement] [Evidence: TENTATIVE] [Source: 6]
   
   ### Contradictions/Debates
   - [If any, describe]
   
   ### Gaps/Limitations
   - [If any, describe]
   
   ### Report Integration
   - **Target Section:** [From WRITING_INSTRUCTIONS_ADAPTED mapping]
   - **Integration Method:** [DIRECT/SYNTHESIZED/SUPPORTING]
   - **Draft Passage:** [If DIRECT, draft the paragraph/section now]
   
   ### Validation
   - Checks applied: [List from CLAIM_VALIDATION_CRITERIA]
   - Overall quality: [Assessment]
   - Confidence in findings: [High/Medium/Low]
   
   ### Notes
   [Any special considerations for synthesis or writing]
   ```

2. **Update Execution Log:**
   
   ```markdown
   | Order | Job ID | Title | Priority | Status | Time | Findings | Evidence |
   |-------|--------|-------|----------|--------|------|----------|----------|
   | 1 | JOB-001 | Core Concepts | CRITICAL | ✅ DONE | 2.5h | 5 key findings | 3 STRONG, 2 MOD |
   ```

3. **Compile Reference List:**
   
   Add all new sources to master reference list:
   ```markdown
   ## MASTER REFERENCE LIST (Building)
   
   [1] Smith, J. (2023). "Energy Efficiency in Smart Buildings." J. Building Tech, 45(2), 123-145.
   [2] European Commission (2024). "Smart Building Adoption in EU." EC Report Series.
   [...]
   ```

---

**Repeat Protocol for Each Research Job**

Continue until all jobs are executed or saturation is reached.

---

#### 1.3 Execution Monitoring

**Throughout Task 1, maintain:**

**Progress Tracker:**
```markdown
## Execution Progress

**Jobs Completed:** [N] / [Total]  
**Priority Breakdown:**
- CRITICAL: [X] / [Y] completed
- HIGH: [X] / [Y] completed
- MEDIUM: [X] / [Y] completed
- LOW: [X] / [Y] completed

**Time Spent:** [Actual] vs [Estimated]

**Quality Metrics:**
- Findings with STRONG evidence: [N] ([%])
- Findings with MODERATE evidence: [N] ([%])
- Findings with TENTATIVE evidence: [N] ([%])
- Gaps identified: [N]

**Saturation Assessment:**
- Have we answered all CRITICAL research questions? [Y/N]
- Are there diminishing returns on further research? [Y/N]
```

#### 1.4 Task 1 Completion Checkpoint

**Before proceeding to Task 2, produce:**

```markdown
# TASK 1 COMPLETION REPORT

## Summary

**Total Jobs Executed:** [N]  
**Total Sources Consulted:** [M]  
- Tier 1: [X]
- Tier 2: [Y]
- Tier 3/Web: [Z]

**Total Time:** [Hours]

**Quality Assessment:**
- STRONG evidence findings: [N] ([%])
- MODERATE evidence findings: [N] ([%])
- TENTATIVE evidence findings: [N] ([%])

**Gaps Identified:** [N]
- [List major gaps]

**Contradictions Found:** [N]
- [List major unresolved contradictions]

## Readiness for Synthesis

**CRITICAL jobs:** [All/Most/Some] completed satisfactorily  
**HIGH jobs:** [All/Most/Some] completed satisfactorily  
**Evidence base:** [Strong/Adequate/Weak]

**Recommendation:**
[PROCEED to Task 2 / EXTEND research on specific jobs / DISCUSS with editor]

---

**Request Editor Confirmation:**

"Task 1 (Execute Research Jobs) is complete. Please review the completion report above.

[N] research jobs were executed, consulting [M] sources. Evidence quality is [assessment].

Confirm readiness to proceed to Task 2 (Synthesize Findings)? [Y/N]

If not ready, specify which jobs need more work or what additional research is needed."
```

**Only proceed after editor confirmation.**

---

### TASK 2: SYNTHESIZE FINDINGS

**Objective:** Organize research findings into structured synthesis ready for report writing.

#### 2.1 Organize by Report Section

**Using the mapping from WRITING_INSTRUCTIONS_ADAPTED:**

For each section of the report body:

```markdown
### SYNTHESIS FOR SECTION [X.Y]: [SECTION TITLE]

**Purpose:** [From writing instructions]

**Research Jobs Feeding This Section:**
- JOB-XXX: [findings summary]
- JOB-YYY: [findings summary]
- JOB-ZZZ: [findings summary]

**Key Claims to Make:**
1. [Claim 1] - Evidence: [STRONG/MOD/TENT] - Sources: [N,M,P]
2. [Claim 2] - Evidence: [...]
[...]

**Evidence Base:**
- Total sources for this section: [N]
- Tier 1: [X], Tier 2: [Y], Tier 3: [Z]
- Confidence in section content: [High/Medium/Low]

**Narrative Flow:**
[If narrative arc selected: How does this section advance the arc?]
[Outline the logical progression of subsection]

**Integration Decisions:**
- JOB-XXX findings: DIRECT integration (draft passage attached)
- JOB-YYY findings: SYNTHESIZED with JOB-ZZZ
- User-requested JOB-201: INTEGRATED seamlessly in subsection X.Y.2

**Potential Issues:**
- [Any contradictions within this section]
- [Any gaps limiting what can be said]
- [Any tentative findings requiring caveats]

**Draft Outline for Section:**
X.Y.1. [Subsection name]
   - Point A [Sources: X,Y]
   - Point B [Sources: Z]
X.Y.2. [Subsection name]
   - Point C [Sources: A,B,C]
   - [User-requested finding integrated here]
[...]

**Estimated Length:** [Words] based on [N] jobs and content density
```

**Repeat for all body sections.**

#### 2.2 Cross-Section Synthesis

**Identify themes that span multiple sections:**

```markdown
### CROSS-SECTION THEMES

**Theme 1:** [e.g., "Tension between automation and human control"]
- Appears in Sections: 3.2, 4.1, 6.3
- Sources: [list]
- Treatment strategy: Introduce in 3.2, develop in 4.1, resolve/discuss implications in 6.3

**Theme 2:** [e.g., "ROI variability by building size"]
- Appears in Sections: 5.2, 7.1
- Ensure consistent treatment

**Narrative Thread:** [If not NEUTRAL]
[How does the selected arc weave through sections?]
```

#### 2.3 Resolve Remaining Contradictions

**For contradictions not resolved in Task 1:**

```markdown
### CONTRADICTION RESOLUTION

**Contradiction [N]:** [Description]

**Sources:**
- Position A: [Source 1, Tier X]
- Position B: [Source 2, Tier Y]

**Analysis:**
[Reassess with full research context - do we now have evidence to resolve?]

**Resolution Strategy:**
a) Evidence now favors Position A → Present A as main view, mention B as minority position
b) Evidence still balanced → Present both, explain moderating factors
c) Evidence shows both are context-dependent → Explain contexts where each applies

**Treatment in Report:**
[How will this be presented in Section X.Y?]
```

#### 2.4 Gap Assessment

**Comprehensive gap documentation:**

```markdown
### RESEARCH GAPS IDENTIFIED

**Type A: Information Unavailable**
- Gap 1: [Description - e.g., "No Spanish-specific adoption data"]
  - Attempted searches: [what was tried]
  - Why unavailable: [not researched yet / proprietary / etc.]
  - Impact: [limits generalizability to Spanish context]
  - Treatment: [acknowledge in methodology section]

**Type B: Contradictory Without Resolution**
- Gap 2: [Description]
  - [Treatment strategy]

**Type C: Beyond Scope**
- Gap 3: [Description - e.g., "Long-term environmental impact"]
  - Why out of scope: [not core to research focus]
  - Treatment: [note in future directions]
```

#### 2.5 Evidence Strength Map

**Create quality map for transparency:**

```markdown
### EVIDENCE STRENGTH BY SECTION

| Section | Primary Claims | STRONG | MODERATE | TENTATIVE | Overall Confidence |
|---------|----------------|--------|----------|-----------|-------------------|
| 3.1 Foundational Concepts | 5 | 4 | 1 | 0 | High |
| 3.2 Market Trends | 7 | 3 | 3 | 1 | Medium-High |
| 4.1 Debate A vs B | 6 | 2 | 3 | 1 | Medium |
[...]

**Sections Requiring Caveats:**
- Section X.Y: Note limitation Z
- Section A.B: Tentative finding on C

**Sections with Strong Foundation:**
- Sections 3.1, 3.3, 5.2: High confidence throughout
```

#### 2.6 Prepare Special Elements

**Timeline Construction:**

```markdown
### TIMELINE SYNTHESIS

**Major Events/Publications (chronological):**

| Year | Event | Source | Significance |
|------|-------|--------|--------------|
| 1995 | [Event] | [Source X] | [Why important] |
| 2003 | [Publication Y] | [Source Z] | [Paradigm shift in...] |
[...]

**Narrative:** [If timeline is extensive, prepare prose version]
```

**Cast of Characters:**

```markdown
### KEY ACTORS SYNTHESIS

**Major Authors:**
- [Author 1]: [Background], [Affiliation], [Key contribution to field]
  - Sources: [where profiled]
- [Author 2]: [...]

**Institutions:**
- [Institution 1]: [Role in field]
- [Institution 2]: [...]

**Schools of Thought:** [If applicable]
- [School 1]: [Proponents], [Core tenets]
```

#### 2.7 Methodology Section Draft

**Prepare methodology documentation:**

```markdown
### METHODOLOGY SECTION (Draft)

**Sources Consulted:**
- Total sources: [N]
- Tier 1: [X] - [List key journals/institutions]
- Tier 2: [Y] - [List key industry sources]
- Tier 3/Web: [Z] - [List]

**Search Strategy:**
- Databases: [List with search periods]
- Keywords: [Primary terms used]
- Time frame focus: [e.g., "2020-2025 for current state, all time for foundations"]

**Validation Framework:**
- Source authority: SOURCE_AUTHORITY_HIERARCHY v[X.Y], topic: [topic name]
- Claim validation: CLAIM_VALIDATION_CRITERIA applied per research job
- Evidence assessment: Three-tier confidence system (STRONG/MODERATE/TENTATIVE)

**Research Process:**
- [N] research jobs executed over [X] hours
- Job prioritization: CRITICAL > HIGH > MEDIUM > LOW
- Saturation criteria: [describe when searches stopped]

**Limitations:**
- Language: Primarily English-language sources (may miss Spanish/other language research)
- Access: [Any paywalled sources not accessed]
- Time: Research conducted [dates], may not capture very latest (post-[date]) developments
- Gaps: [List major identified gaps from 2.4]

**Quality Metrics:**
- [X]% of claims supported by STRONG evidence
- [Y]% supported by MODERATE evidence
- [Z]% TENTATIVE (noted as such in text)
```

#### 2.8 Task 2 Completion Checkpoint

**Produce synthesis completion report:**

```markdown
# TASK 2 COMPLETION REPORT

## Synthesis Summary

**Sections Prepared:** [N]  
**All sections have:** 
- Structured outline ✓
- Evidence base documented ✓
- Integration strategy defined ✓
- Length estimated ✓

**Quality Assessment:**
- High-confidence sections: [N]
- Medium-confidence sections: [M]
- Sections with caveats needed: [P]

**Special Elements Ready:**
- Timeline: ✓ [N events/publications]
- Cast of Characters: ✓ [M authors/institutions]
- Methodology section: ✓ drafted

**Cross-Checks:**
- Narrative thread maintained: ✓ [or N/A if NEUTRAL]
- User-requested research integrated: ✓ [N jobs]
- Contradictions resolved or documented: ✓
- Gaps assessed: ✓

## Readiness for Writing

**Structure:** Complete and coherent  
**Evidence:** [Strong/Adequate/Adequate with caveats]  
**Integration:** All research jobs mapped

**Recommendation:**
[PROCEED to Task 3 / REFINE synthesis in areas X,Y / DISCUSS with editor]

---

**Request Editor Confirmation:**

"Task 2 (Synthesize Findings) is complete. Synthesis is organized across [N] sections with [quality assessment].

All research jobs have been integrated into report structure. Evidence strength is documented.

Confirm readiness to proceed to Task 3 (Write Research Report)? [Y/N]

If not ready, specify which sections need more synthesis work."
```

**Only proceed after editor confirmation.**

---

### TASK 3: WRITE RESEARCH REPORT

**Objective:** Write the complete research report following WRITING_INSTRUCTIONS_ADAPTED.

#### 3.1 Writing Preparation

**Before writing, review:**

1. **WRITING_INSTRUCTIONS_ADAPTED:**
   - Document structure (sections, subsections)
   - Length targets per section
   - Style and tone requirements
   - Citation format
   - Integration strategies

2. **Synthesis Materials from Task 2:**
   - Section outlines
   - Evidence maps
   - Draft passages (from DIRECT integration jobs)
   - Methodology draft
   - Timeline and cast drafts

3. **Narrative Arc (if not NEUTRAL):**
   - Remind yourself of the story being told
   - How each section advances the narrative

#### 3.2 Writing Protocol

**General Principles:**

- **Write in Spanish** (except technical terms conventionally in English)
- **Academic and formal tone** throughout
- **Narrative style:** Readable as a book, not a handbook
- **Minimize lists:** Convert to prose where possible
- **Every list needs:** Intro paragraph + concluding transition
- **Critical and analytical:** Don't just report, evaluate and question
- **Evidence-based:** Every claim cited
- **Smooth transitions:** Between sections and paragraphs

**Section-by-Section Approach:**

For each section:

1. **Review section synthesis** from Task 2
2. **Review target length** from WRITING_INSTRUCTIONS_ADAPTED
3. **Write introductory paragraph** (context and preview)
4. **Develop content** following outline
5. **Write concluding paragraph** (summary and transition to next section)
6. **Check length** (±20% of target is acceptable)
7. **Review citations** (all claims attributed)

---

#### 3.3 Section-Specific Guidance

**SECTION 0: METADATA**

```markdown
# [COMPELLING TITLE]
## [SUBTITLE: Research Focus Descriptor]

### About This Document

**Document Identification:**
- Document ID: RESEARCH_REPORT_[TOPIC]_[FOCUS]_v1.0
- Production Date: [Today's date]
- Research Focus: [Historical Review / State of the Art / etc.]
- Narrative Arc: [Arc name or NEUTRAL]

**Methodological Metadata:**
- Total Sources Consulted: [N] (Tier 1: [X], Tier 2: [Y], Tier 3: [Z])
- Research Jobs Completed: [N] (Critical: [X], High: [Y], Medium: [Z], Low: [W])
- Primary Databases: [List]
- Research Period: [Dates of research execution]
- Total Research Hours: [Estimated from Task 1]

**Validation Frameworks:**
- Source Authority: SOURCE_AUTHORITY_HIERARCHY v[X.Y]
- Claim Validation: CLAIM_VALIDATION_CRITERIA
- Evidence Confidence: STRONG [X]%, MODERATE [Y]%, TENTATIVE [Z]%

**Prompt Lineage:**
- Research Plan Created: CREATE_RESEARCH_PLAN v2.0
- Research Executed: EXECUTE_RESEARCH_PLAN v1.0
- Writing Instructions: WRITING_INSTRUCTIONS_ADAPTED_[TOPIC]_[FOCUS]

**Related Documents:**
- REFERENCE_SUMMARY: [Filename from planning phase]
- RESEARCH_PLAN_DETAILED: v[X.X]
- NARRATIVE_BRIDGE: [Filename]

**AI Agent:**
- Model: Claude Sonnet 4.5
- Prompting Method: Structured research job execution

**Scope:**
[2-3 sentences describing what this report covers and explicitly does NOT cover]

**Quality Assessment:**
- High-confidence sections: [List section numbers]
- Sections with noted limitations: [List section numbers]
- Major research gaps: [N] (detailed in Methodology section)
```

---

**SECTION 1: EXECUTIVE SUMMARY** (400-600 words)

**Structure:**

Paragraph 1: **Topic Introduction**
- What is the TOPIC?
- Why does it matter?
- What is the context?

Paragraph 2: **Key Findings**
- 3-5 major discoveries from the research
- High-level, no citations needed here

Paragraph 3: **Practical Implications**
- What do these findings mean for practitioners/researchers?
- Forward-looking perspective

**Tags:** [5-10 descriptive keywords]

**Writing Notes:**
- This is a standalone summary - should make sense without reading the rest
- Non-technical language (more accessible than body)
- Compelling - this hooks the reader

---

**SECTION 2: INTRODUCTION** (1,000-1,500 words)

**Purpose:** Orient the reader to the report - what, why, how.

**Structure:**

**2.1 Topic Overview** (300-400 words)
- What is [TOPIC]? (foundational definition)
- Why is it important? (significance)
- What are the main questions/debates?

**2.2 Report Scope and Focus** (300-400 words)
- What does this report cover?
- What does it NOT cover (explicit exclusions)?
- Why this particular focus? [Historical/StateOfArt/etc.]
- [If not NEUTRAL] What narrative arc structures the report?

**2.3 Structure Overview** (200-300 words)
- Brief roadmap of sections
- How the report progresses logically
- [If narrative arc] How the story unfolds

**2.4 Key Findings Preview** (200-400 words)
- High-level preview of major conclusions
- Create anticipation for body sections

**Writing Notes:**
- Do NOT include detailed analysis here (save for Body)
- Do NOT include comprehensive lists (convert to prose)
- Transitions are key - each subsection flows to next

---

**SECTIONS 3-X: BODY** (5,000-9,000 words total)

**Follow the structure from WRITING_INSTRUCTIONS_ADAPTED** (selected template)

**For each section:**

1. **Section Opening:**
   - Contextual paragraph introducing the section
   - Preview what will be covered
   - [If narrative arc] Connect to overall story

2. **Subsections:**
   - Follow outline from Task 2 synthesis
   - Each subsection 400-800 words typically
   - Balance description, analysis, evidence

3. **Evidence Integration:**
   - Every factual claim cited: [N]
   - Use variety: direct data, case examples, theoretical arguments
   - Strength indicators when needed: "Evidence strongly suggests..." (STRONG) vs "Limited data indicates..." (TENTATIVE)

4. **Critical Analysis:**
   - Don't just report - evaluate
   - Strengths and limitations of approaches
   - Point out contradictions or debates
   - Question assumptions where appropriate

5. **Practical Grounding:**
   - Connect theory to practice
   - Use concrete examples
   - Reference case studies when available

6. **Section Closing:**
   - Summary paragraph of section
   - Transition to next section
   - [If narrative arc] Advance the story

**User-Requested Research Integration:**

- **Seamless integration (preferred):**
  - Weave findings naturally into relevant subsections
  - No special marking needed (unless editor wants footnote acknowledgment)
  
- **Dedicated subsection (if necessary):**
  - Create subsection with meaningful title (not "User Requests")
  - Example: "4.3 Workforce Implications" (addresses user request about labor impact)
  - Integrate into section flow

**Tables and Figures:**

- Use tables for comparison across multiple dimensions
- Example: Comparing 3 schools of thought across criteria
- Always introduce table with paragraph context
- Always follow table with interpretation paragraph

**Lists (when unavoidable):**

- Introductory paragraph explaining context
- 3-5 bullets maximum (longer → convert to prose or table)
- Concluding paragraph summarizing or transitioning

**Narrative Thread (if not NEUTRAL):**

- Continuously advance the selected story arc
- Use narrative language: "This development marked a turning point...", "The tension between X and Y intensified when..."
- Build toward resolution or synthesis in later sections

---

**SECTION [N]: METHODOLOGY** (400-600 words)

**Use draft from Task 2.7, refine and expand:**

**Subsections:**

**[N].1 Research Design**
- Research focus and rationale
- Research questions guiding investigation
- Systematic approach (research jobs, priorities)

**[N].2 Sources and Search Strategy**
- Number and types of sources consulted
- Tier breakdown with examples
- Databases and search methods
- Time period focus
- Saturation criteria

**[N].3 Validation Approach**
- SOURCE_AUTHORITY_HIERARCHY application
- CLAIM_VALIDATION_CRITERIA application
- Evidence strength assessment system
- How contradictions were handled

**[N].4 Limitations**
- Acknowledged gaps (from Task 2.4)
- Access constraints
- Language/geographic biases
- Temporal scope
- What was deliberately excluded and why

**[N].5 Quality Metrics**
- % of claims by evidence strength
- Source quality distribution
- Confidence in findings

**Writing Notes:**
- This is about transparency - show your work
- Acknowledge limitations honestly
- Demonstrates rigor of research process

---

**SECTION [N+1]: SYNTHESIS, CONCLUSIONS, AND IMPLICATIONS** (600-800 words)

**Structure:**

**[N+1].1 Integrated Understanding**
- Synthesis of all findings
- Coherent picture of the TOPIC
- How pieces fit together

**[N+1].2 Key Takeaways**
- For researchers: [3-5 major insights]
- For practitioners: [3-5 actionable implications]

**[N+1].3 Research Priorities and Future Directions**
- Gaps needing investigation
- Promising research directions
- Emerging questions

**[N+1].4 Reflections on Editor Interests** (if notable)
- Brief comment on user-requested research
- How those questions illuminate the broader topic

**Writing Notes:**
- Pull it all together - what does this research tell us?
- Forward-looking - where should the field go?
- Balance confidence with humility about limitations

---

**SECTION [N+2]: TIMELINE AND CAST OF CHARACTERS** (400-600 words)

**[N+2].1 Historical Timeline**

Option A (if many events): Table format
| Year | Event/Publication | Significance |
|------|-------------------|--------------|
| ... | ... | ... |

Option B (if fewer events): Narrative chronology
"The field began in [year] when [event]... This was followed by [next event]..."

**[N+2].2 Key Actors**

**Major Authors:**
- [Author 1]: [Background, affiliation, key contribution]
- [Author 2]: [...]

**Institutions:**
- [Institution 1]: [Role in the field]
- [...]

**Schools of Thought:** [If applicable]
- [School 1]: [Proponents, core tenets]
- [...]

**Writing Notes:**
- Brief profiles, not full biographies
- Focus on relevance to the TOPIC
- Show the ecosystem of research/practice

---

**REFERENCES**

- Numbered list [1], [2], [3]... corresponding to inline citations
- Consistent format: Author(s), "Title," Publication, Year, [URL/DOI if available]
- Verify every citation has corresponding entry
- Remove any duplicates
- Alphabetical order within numbered sequence (optional, for readability)

Example:
```
[1] Smith, J., & Jones, A. (2023). "Smart Building Energy Systems: A Review." Journal of Building Technology, 45(2), 123-145. https://doi.org/10.xxxx
[2] European Commission (2024). "Digital Building Adoption in the EU." EC Report Series. https://ec.europa.eu/...
[...]
```

---

#### 3.4 Quality Control During Writing

**As you write each section, check:**

- [ ] Length within target range (±20%)
- [ ] All claims cited with [N]
- [ ] No bullet lists without intro/conclusion paragraphs
- [ ] No lists >5 items (convert to prose/table)
- [ ] Transitions smooth between paragraphs
- [ ] Section advances narrative arc (if applicable)
- [ ] Tone is academic and formal
- [ ] Spanish language (except technical terms)
- [ ] Critical analysis present (not just description)

#### 3.5 Post-Writing Review

**After completing draft, perform full review:**

**Structural Review:**
- [ ] All required sections present (per WRITING_INSTRUCTIONS_ADAPTED)
- [ ] Logical flow from section to section
- [ ] Introduction and conclusion bookend coherently
- [ ] Methodology section is complete and honest

**Content Review:**
- [ ] All research jobs integrated
- [ ] User-requested research addressed
- [ ] Evidence strength appropriate to claims
- [ ] Contradictions/debates presented fairly
- [ ] Gaps and limitations acknowledged

**Narrative Review (if not NEUTRAL):**
- [ ] Story arc is maintained throughout
- [ ] Narrative builds toward conclusion
- [ ] Sections contribute to overall story

**Citation Review:**
- [ ] Every factual claim is cited
- [ ] Every [N] has corresponding reference entry
- [ ] No duplicate references
- [ ] Citation format consistent

**Style Review:**
- [ ] Academic tone maintained
- [ ] No excessive bullet points
- [ ] Tables introduced and interpreted
- [ ] Transitions are smooth
- [ ] No repetitive phrasing

**Language Review:**
- [ ] Spanish throughout (verify)
- [ ] Technical terms in English where conventional
- [ ] Complex language used appropriately
- [ ] No overly simplistic explanations

**Length Review:**
- [ ] Total length: [Actual] words (Target: [X-Y] words)
- [ ] Within acceptable range? (±20% of target)
- [ ] If over: Identify sections to trim
- [ ] If under: Identify sections to expand

#### 3.6 Generate Version 1.0

**Finalize document:**

```markdown
# RESEARCH_REPORT_[TOPIC]_[FOCUS]_v1.0.md

[Complete report as written following all specifications above]

---

## APPENDIX A: RESEARCH EXECUTION SUMMARY

[Optional: Include high-level summary of execution process]

**Research Jobs Executed:** [N]
**Sources Consulted:** [M]
**Execution Time:** [X] hours
**Evidence Quality:** [Summary stats]

[This transparency adds value for "method centaur" philosophy]

---

## APPENDIX B: [If Needed]

[Any user-requested research that didn't fit main narrative]
[Or detailed technical specifications referenced but too detailed for body]
```

---

#### 3.7 Task 3 Completion Checkpoint

**Produce final report package:**

```
# TASK 3 COMPLETION PACKAGE

## Deliverable

**RESEARCH_REPORT_[TOPIC]_[FOCUS]_v1.0.md**

- Total length: [X] words
- Sections: [N]
- Sources cited: [M]
- Quality: [Assessment]

## Self-Assessment

**Strengths:**
- [What the report does exceptionally well]

**Limitations:**
- [Acknowledged gaps or constraints]
- [Sections with tentative evidence]

**Adherence to Instructions:**
- Followed WRITING_INSTRUCTIONS_ADAPTED: ✓
- Research jobs integrated: ✓ [N]/[Total]
- User requests addressed: ✓ [All/Most]
- Narrative arc maintained: ✓ [or N/A]
- Length target met: ✓ [within range]
- Style requirements met: ✓

## Quality Metrics

- Evidence strength:
  - STRONG: [X]%
  - MODERATE: [Y]%
  - TENTATIVE: [Z]%
- Citation count: [N]
- Tier 1 sources: [M]
- User satisfaction items: [List what was specifically requested and how addressed]

## Recommended Next Steps

**For Editor Review:**
1. Read full report for content accuracy
2. Verify user-requested research is satisfactorily addressed
3. Check narrative coherence
4. Identify any sections needing refinement

**Potential Refinements:**
- [Suggestions based on self-assessment]

---

**Request Editor Review:**

"EXECUTE_RESEARCH_PLAN is complete. The RESEARCH_REPORT v1.0 is ready for your review.

The report is [X] words covering [topic] with [focus] approach. It integrates [N] research jobs and [M] sources.

Please review the report and provide feedback on:
1. Content accuracy and completeness
2. Narrative coherence
3. User-requested research adequacy
4. Any sections needing expansion or revision
5. Overall quality assessment

Indicate: 
- APPROVED (ready to finalize)
- REFINEMENTS NEEDED (specify changes)

Your feedback: [   ]"
```

---

## PART IV: ITERATIVE REFINEMENT

### 4.1 Refinement Process

**After editor review, if refinements requested:**

1. **Categorize feedback:**
   - Content additions/corrections
   - Structural changes
   - Style/tone adjustments
   - Citation corrections
   - Clarifications needed

2. **Prioritize changes:**
   - CRITICAL: Factual errors, missing critical content
   - HIGH: Significant improvements to clarity/completeness
   - MEDIUM: Stylistic improvements
   - LOW: Minor polish

3. **Execute changes:**
   - Make requested modifications
   - Verify don't introduce new errors
   - Update citations if sources added
   - Maintain overall coherence

4. **Update version:**
   - Increment to v1.1, v1.2, etc.
   - Document changes in version log

5. **Resubmit for review:**
   - Repeat until editor approves

### 4.2 Final Approval

**When editor indicates approval:**

```
# FINAL VERSION RELEASE

**RESEARCH_REPORT_[TOPIC]_[FOCUS]_FINAL.md**

**Version History:**
- v1.0: Initial completion ([date])
- v1.1: [Summary of changes] ([date])
- v1.2: [Summary of changes] ([date])
- FINAL: Editor approved ([date])

**Total Effort:**
- Planning: [X hours] (CREATE_RESEARCH_PLAN)
- Research: [Y hours] (Task 1)
- Synthesis: [Z hours] (Task 2)
- Writing: [W hours] (Task 3)
- Refinement: [V hours] (iterations)
- **Total: [X+Y+Z+W+V] hours**

**Archival:**
This final report is now archived and ready for use in essay/book writing.

**Related Artifacts:**
- RESEARCH_PLAN_DETAILED_[TOPIC]_[FOCUS]_v4.0.md
- WRITING_INSTRUCTIONS_ADAPTED_[TOPIC]_[FOCUS].md
- RESEARCH_EXECUTION_LOG.md (optional, for transparency)
- Master_References_[TOPIC].md (optional, compiled bibliography)

---

**EXECUTION COMPLETE**
```

---

## PART V: BEST PRACTICES

### 5.1 Search Best Practices

- **Start with Tier 1:** Always prioritize highest authority sources
- **Use multiple keywords:** Don't rely on single search term
- **Check recent and foundational:** Balance currency with seminal works
- **Follow citations:** High-quality papers cite high-quality papers
- **Cross-validate:** Don't rely on single source for important claims
- **Document negative searches:** "Searched X database for Y, found nothing" is useful information

### 5.2 Validation Best Practices

- **Be skeptical of outliers:** If one source says something wildly different, dig deeper
- **Consider source motivation:** Vendor white papers may be biased
- **Check methodology:** How did they reach their conclusion?
- **Look for peer review:** It's not perfect but it's a quality signal
- **Assess sample size:** N=3 case studies vs N=500 survey matters
- **Note confidence:** "Likely," "possibly," "definitively" are different claims

### 5.3 Writing Best Practices

- **Write for the skeptical reader:** Assume they'll question your claims
- **Show, don't just tell:** Use concrete examples
- **Vary sentence structure:** Avoid repetitive patterns
- **Use active voice:** When possible and appropriate
- **Be precise:** "Approximately 25%" not "around a quarter or so"
- **Transition explicitly:** Help reader follow your logic
- **End strong:** Each section's conclusion should set up the next

### 5.4 Citation Best Practices

- **Cite once per claim:** Don't over-cite
- **Cite the original:** Not a secondary source citing the original
- **Verify before citing:** Don't cite something you haven't read
- **Distinguish types:** "X showed [N]" vs "X claims [N]" vs "X speculates [N]"
- **Update if wrong:** If find better/contradicting source, revise and re-cite

---

## PART VI: TROUBLESHOOTING

### Problem: Can't find Tier 1 sources

**Solution:**
- Expand to Tier 2 early
- Use web_search for recent topics
- Check if topic is truly under-researched (document gap)
- Consider if search terms are too narrow

### Problem: Sources contradict heavily

**Solution:**
- Check if asking same question or different contexts
- Assess methodological quality differences
- Look for systematic review resolving contradiction
- Document as genuine debate if unresolvable

### Problem: User-requested research doesn't fit structure

**Solution:**
- Try harder to integrate seamlessly (preferred)
- Create dedicated subsection with meaningful title
- As last resort, use appendix
- Discuss with editor if truly out of scope

### Problem: Running over length target significantly

**Solution:**
- Identify lower-priority content to trim
- Convert detailed passages to summary + "see source X for details"
- Move technical details to appendix
- Check if repetitive content can be consolidated
- Discuss with editor - may be justified to exceed target

### Problem: Evidence is weak across the board

**Solution:**
- Document honestly in methodology section
- Use tentative language throughout
- Recommend this as priority for future research
- Consider if topic is too new/under-researched for comprehensive report

---

## PART VII: VERSION LOG

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | Jan 2026 | Initial version - complete execution system separated from planning, three-task structure (Execute/Synthesize/Write), rigorous validation protocol, detailed writing guidance, quality checkpoints throughout |

---

**END OF EXECUTE_RESEARCH_PLAN v1.0**
