# CREATE_RESEARCH_PLAN: DEEP RESEARCH PLANNING SYSTEM

**Version:** 2.2  
**Date:** February 22, 2026  
**Optimized for:** Claude Sonnet 4.5 and similar LLMs  
**Context:** "Tinta Artificial" - Deep Research Phase

**Changelog v2.2:**
- Fixed section references to match canonical REFERENCE_SUMMARY structure: section 5 (Historical Perspective) corrected to section 4; section 3 name updated to "Convergence and Divergence Analysis" (resolves GAP-R01, GAP-R02)
- Fixed section references to match canonical RESEARCH_PLAN structure: section 1 (Gap Analysis) corrected to section 2 (resolves GAP-R01, GAP-R02)

**Changelog v2.1:**
- Added Research Focus 7: Seminal Concept Analysis (TIPO G)
- Added research job categories for Seminal Concept Analysis
- Updated to support 7 types of research reports/books

---

## PART I: MISSION AND CONTEXT

### 1.1 Purpose

This prompt guides the creation of a **detailed research plan** for producing an exhaustive academic research report on a specific TOPIC. The research report will serve as foundation material for writing a high-quality essay or, after multiple iterations with different focuses, as source material for a book.

### 1.2 Position in Workflow

```
[PREVIOUS PHASE - COMPLETED]
├─ Initial references analyzed
├─ REFERENCE_SUMMARY generated (5,000-7,000 words)
├─ RESEARCH_PLAN generated (3,000-4,000 words - orientative)
├─ NARRATIVE_BRIDGE generated (1,500-2,000 words)
├─ SOURCE_AUTHORITY_HIERARCHY updated
└─ CLAIM_VALIDATION_CRITERIA available

[CURRENT PHASE - DEEP RESEARCH PLANNING]
    ↓
CREATE_RESEARCH_PLAN (this prompt)
    ↓
OUTPUT: RESEARCH_PLAN_DETAILED
OUTPUT: WRITING_INSTRUCTIONS_ADAPTED
    ↓
[Editor reviews and approves]
    ↓
EXECUTE_RESEARCH_PLAN (separate prompt)
    ↓
OUTPUT: RESEARCH_REPORT (8,000-15,000 words)

[ITERATION POSSIBLE]
└─ Change focus/narrative arc
└─ Execute new cycle
└─ Accumulate multiple RESEARCH_REPORTs
    ↓
[FUTURE PHASE]
└─ Synthesize multiple reports → Book
```

### 1.3 Key Concepts

**RESEARCH_PLAN (orientative)** vs **RESEARCH_PLAN_DETAILED (executable)**
- The previous phase produced an *orientative* RESEARCH_PLAN identifying gaps and suggesting directions
- This prompt produces an *executable* RESEARCH_PLAN_DETAILED with structured research jobs

**RESEARCH FOCUS**
- Each execution can have a different focus (Historical Review, State of the Art, School Analysis, etc.)
- Focus is **selected before** creating the plan (not during)
- Focus determines body structure template for the report

**NARRATIVE ARC**
- Selected from NARRATIVE_BRIDGE options OR set to NEUTRAL
- Determines narrative thread of the report
- NEUTRAL is valid when topic doesn't lend itself to story-based structure

**RESEARCH JOB**
- Atomic unit of work in the research plan
- Structured specification of what to investigate, how, and why
- Typically 10-20 jobs per plan (balanced granularity)

### 1.4 Quality Standards

The resulting RESEARCH_REPORT must provide:
- **Comprehensive coverage** of TOPIC including motivations, methodologies, paradigms, evidence, debates
- **Critical analysis** of different approaches with strengths/limitations
- **Historical perspective** on evolution of the topic
- **Practical applications** with detailed use cases
- **Current state and future directions**
- **Rigorous sourcing** validated against SOURCE_AUTHORITY_HIERARCHY

---

## PART II: INPUT SPECIFICATION

### 2.1 Mandatory Inputs

**FROM PREVIOUS PHASE:**

1. **REFERENCE_SUMMARY** (formerly "TOPIC SUMMARY")
   - 5,000-7,000 word analysis of initial references
   - Use sections: 0 (metadata), 2 (thematic architecture), 3 (convergence and divergence analysis), 4 (historical perspective), 7 (key actors)

2. **ANNOTATED_REFERENCE_SUMMARY**
   - Editor-annotated version of REFERENCE_SUMMARY
   - Contains inline flags: "TASK:" for specific research requests, "LINE:" for research line priorities, "COMMENT:" for context
   - Editor manually reviews REFERENCE_SUMMARY and marks areas requiring deep investigation

3. **RESEARCH_PLAN** (formerly "INITIAL_RESEARCH_PLAN")
   - 3,000-4,000 word orientative plan from previous phase
   - Use sections: 2 (gap analysis), 4 (proposed research directions), 5 (supplementary sources)

4. **ANNOTATED_RESEARCH_PLAN**
   - Editor-annotated version of RESEARCH_PLAN
   - Contains inline flags: "LINE:" for priority/scope adjustments on research lines, "TASK:" for specific questions, "COMMENT:" for context
   - Editor manually reviews RESEARCH_PLAN lines of investigation and adds directives

5. **NARRATIVE_BRIDGE**
   - 1,500-2,000 word document with story arcs, editorial angles, unexpected connections
   - Use section 1 (story arcs) to select narrative thread

6. **SOURCE_AUTHORITY_HIERARCHY**
   - Global resource with Tier 1-3 sources by topic
   - Includes search strategies and validation checks
   - **Critical for research job source specification**

7. **CLAIM_VALIDATION_CRITERIA**
   - Conceptual validation framework
   - Evidence sufficiency guidelines
   - **Critical for defining validation approach in research jobs**

**FROM EDITOR (provided before starting):**

8. **RESEARCH_FOCUS** (selected from options below)
   - Historical Review
   - State of the Art
   - School of Thought Analysis
   - Recent Developments (last 3-5 years)
   - Comparative Analysis (2-3 approaches)
   - Practical Implementation
   - Custom (editor-defined)

9. **NARRATIVE_ARC** (selected from NARRATIVE_BRIDGE or set to NEUTRAL)
   - One of the story arcs from NARRATIVE_BRIDGE Section 1
   - OR: "NEUTRAL" for non-narrative structure

10. **WRITING_INSTRUCTIONS_STANDARD**
   - Template writing instructions to be adapted
   - Will be customized based on focus and findings

### 2.2 File Verification

Before starting, the AI must:
1. Confirm access to all 9 inputs listed above
2. Request specific filenames from editor
3. Verify readability of each file
4. Request Research Focus and Narrative Arc selections if not provided

---

## PART III: EXECUTION PLAN

### Overview of Steps

```
STEP 0: Preparation and Input Verification
    ↓
STEP 1: General Research Plan Creation
    - Integrate previous phase artifacts
    - Define structured research jobs for general understanding
    - Specify source strategies using SOURCE_AUTHORITY_HIERARCHY
    ↓
STEP 2: User-Specific Research Tasks
    - Extract from ANNOTATED_REFERENCE_SUMMARY
    - Structure as research jobs
    - Integrate coherently with Step 1 jobs
    ↓
STEP 3: Interactive Refinement
    - Editor reviews and adjusts
    - Add/remove/modify jobs
    - Adjust priorities
    ↓
STEP 4: Generate Adapted Writing Instructions
    - Select body structure template based on focus
    - Map research jobs to report sections
    - Customize length targets
    - Define integration strategies
    ↓
OUTPUT: RESEARCH_PLAN_DETAILED
OUTPUT: WRITING_INSTRUCTIONS_ADAPTED
```

---

### STEP 0: PREPARATION AND INPUT VERIFICATION

**Objective:** Ensure all necessary files are accessible and context is clear.

**Actions:**

1. **Request Research Focus Selection**
   ```
   "Please select the RESEARCH FOCUS for this investigation:
   
   1. Historical Review - Trace evolution from origins to present
   2. State of the Art - Comprehensive current landscape
   3. School of Thought Analysis - Deep dive into specific tradition
   4. Recent Developments - Focus on last 3-5 years
   5. Comparative Analysis - Contrast major approaches
   6. Practical Implementation - Tools, techniques, cases
   7. Seminal Concept Analysis - Deep dive into influential article/idea
   8. Custom - (please describe)
   
   Your selection: [   ]"
   ```

2. **Request Narrative Arc Selection**
   ```
   "Based on NARRATIVE_BRIDGE, please select narrative thread:
   
   Available arcs from NARRATIVE_BRIDGE:
   - Arc 1: [Name - brief description]
   - Arc 2: [Name - brief description]
   - Arc 3: [Name - brief description]
   - Arc 4: [Name - brief description]
   - NEUTRAL: No specific narrative arc (thematic structure only)
   
   Your selection: [   ]"
   ```

3. **Request Filenames**
   ```
   "Please provide filenames for:
   1. REFERENCE_SUMMARY: _________________
   2. ANNOTATED_REFERENCE_SUMMARY: _________________
   3. RESEARCH_PLAN: _________________
   4. ANNOTATED_RESEARCH_PLAN: _________________
   5. NARRATIVE_BRIDGE: _________________
   6. SOURCE_AUTHORITY_HIERARCHY: _________________
   7. CLAIM_VALIDATION_CRITERIA: _________________
   8. WRITING_INSTRUCTIONS_STANDARD: _________________"
   ```

4. **Verify Access**
   - Attempt to read each file
   - Report success/failure for each
   - Request reupload if any file is inaccessible

5. **Request Explicit Confirmation**
   ```
   "All files verified. Ready to begin STEP 1: General Research Plan Creation.
   Confirm to proceed: [Y/N]"
   ```

---

### STEP 1: GENERAL RESEARCH PLAN CREATION

**Objective:** Create the foundational research plan for comprehensive understanding of the TOPIC.

**Process:**

#### 1.1 Integration with Previous Phase Artifacts

**A) Extract from REFERENCE_SUMMARY:**

- **Section 2 (Thematic Architecture):** Identify 3-7 major themes
  - These become primary organizing units for research jobs
  
- **Section 3 (Convergence and Divergence Analysis):** Map debates and controversies
  - Each major debate becomes a research job focused on evaluating positions
  
- **Section 4 (Historical Perspective):** Extract timeline and evolution
  - Historical review jobs if relevant to focus
  
- **Section 7 (Key Actors):** List foundational authors and institutions
  - Informs source priority in research jobs

**B) Extract from RESEARCH_PLAN:**

- **Section 2 (Gap Analysis):** Identify gaps in initial references
  - Each gap category becomes gap-filling research job(s)
  
- **Section 4 (Proposed Research Directions):** Review Lines of Investigation
  - Transform each line into 1-3 research jobs with specific questions
  
- **Section 5 (Supplementary Sources):** Note recommended sources
  - Integrate into source strategies of relevant research jobs

**C) Extract from NARRATIVE_BRIDGE:**

- **Selected Arc (or NEUTRAL):** Note narrative thread
  - Will influence how research jobs are organized in report
  
- **Section 3 (Unexpected Connections):** Interdisciplinary links
  - Create optional research jobs to explore these connections

**D) Reference SOURCE_AUTHORITY_HIERARCHY:**

- **For the topic:** Extract Tier 1-3 sources
- **Note Search Strategy:** Keywords, databases, saturation criteria
- **Note Validation Checks:** Specific checks for this topic

#### 1.2 Define Research Job Categories

Based on Research Focus, prioritize job types:

**For Historical Review Focus:**
- Foundational Research (origins, early developments): 30%
- Historical Milestones (paradigm shifts, key publications): 30%
- Evolution Tracking (how concepts/methods changed): 20%
- Contemporary Synthesis (current state derived from history): 20%

**For State of the Art Focus:**
- Foundational Research (core concepts, frameworks): 25%
- Convergent Analysis (established consensus): 20%
- Divergent Analysis (debates, schools): 20%
- Practical Applications (tools, cases): 20%
- Gap Identification (what's missing): 15%

**For School of Thought Analysis:**
- Philosophical Foundations (core tenets): 25%
- Key Proponents (major figures, institutions): 20%
- Methodological Approach (how they research): 20%
- Evidence Base (empirical support): 20%
- Critiques and Influence (opposition, legacy): 15%

**For Recent Developments Focus:**
- Baseline Context (previous paradigm): 15%
- New Approaches (innovations 2020-2025): 30%
- Empirical Evidence (early results): 25%
- Comparative Analysis (new vs old): 20%
- Future Trajectories (open questions): 10%

**For Comparative Analysis Focus:**
- Approach A Analysis: 25%
- Approach B Analysis: 25%
- Approach C Analysis (if applicable): 15%
- Evidence Comparison: 20%
- Synthesis and Recommendation: 15%

**For Practical Implementation Focus:**
- Foundational Concepts (theory needed): 15%
- Tools and Techniques (what exists): 30%
- Case Studies (documented uses): 25%
- Best Practices (lessons learned): 20%
- Challenges and Limitations: 10%

**For Seminal Concept Analysis Focus:**
- Paper/Idea Analysis (deep reading of seminal work): 30%
- Concept Anatomy (definition, components, frameworks): 25%
- Adoption Mapping (who uses it, how, where): 20%
- Critical Perspectives (debates, critiques, responses): 25%
- Impact Assessment (evidence, implications, future): 10%

#### 1.3 Create Research Jobs Using Template

For each identified research need, create a structured research job:

```markdown
### RESEARCH JOB TEMPLATE

**JOB-[XXX]: [Descriptive Title]**

**Category:** [Foundational/Historical/Convergent/Divergent/Gap-Filling/Tool-Analysis/Case-Study/User-Requested]

**Priority:** [CRITICAL / HIGH / MEDIUM / LOW]
- CRITICAL: Essential for coherent understanding
- HIGH: Significantly enhances quality
- MEDIUM: Valuable but not essential
- LOW: Nice-to-have, time permitting

**Derivation:**
- Source: [REFERENCE_SUMMARY Section X / RESEARCH_PLAN Section Y / Editor request / etc.]
- Rationale: [Why this job is needed - 1-2 sentences]

**Scope:**
[2-3 sentences describing what this job covers and explicit boundaries]

**Research Questions:**
1. [Specific, answerable question 1]
2. [Specific, answerable question 2]
3. [Specific, answerable question 3]
[3-5 questions total]

**Source Strategy:**
- **Tier 1 Priority Sources:** [From SOURCE_AUTHORITY_HIERARCHY topic section]
  - Examples: [2-3 specific journals/institutions to check]
- **Keywords:** [Specific search terms for this job]
- **Databases:** [Google Scholar, Scopus, Web of Science, field-specific DB]
- **Time Frame:** [Prefer 2020-2025 / All time if historical / etc.]
- **Saturation Criteria:** [When to stop searching]
  - Standard: "3+ Tier 1 sources converge on answer, OR 5+ Tier 2 sources, OR exhausted Tier 1 options"
  - Adjust based on priority

**Expected Outputs:**
- **Claims to Validate:** [Specific hypotheses from REFERENCE_SUMMARY to check]
- **Data to Gather:** [Quantitative stats / Qualitative insights / Case details / etc.]
- **Synthesis Format:** [Narrative paragraph / Comparison table / Timeline / Bullet list]

**Validation Approach:**
- **Apply Checks from CLAIM_VALIDATION_CRITERIA:**
  - [Check 1 - e.g., "Methodological rigor assessment"]
  - [Check 2 - e.g., "Cross-cultural validity check"]
- **Confidence Target:**
  - CRITICAL jobs: Aim for STRONG evidence
  - HIGH jobs: STRONG preferred, MODERATE acceptable
  - MEDIUM/LOW jobs: MODERATE acceptable

**Report Integration:**
- **Target Section:** [Which part of report this feeds - see adapted structure]
- **Integration Method:**
  - DIRECT: Findings go directly as written
  - SYNTHESIZED: Combine with other jobs
  - SUPPORTING: Used as evidence for larger argument

**Estimated Effort:**
- Research: [X hours searching + reading]
- Writing: [Y hours drafting synthesis]
- Total: [X+Y hours]

**Dependencies:**
- **Must Complete First:** [JOB-XXX, JOB-YYY if any]
- **Related To:** [JOB-ZZZ - may inform or be informed by]

**Notes:**
[Any additional context, caveats, or special instructions]
```

#### 1.4 Generate Complete Set of Research Jobs

**Typical structure for balanced (10-20 jobs) plan:**

**A. Foundational Jobs (2-4 jobs)** - CRITICAL/HIGH priority
- Core concepts and definitions
- Theoretical frameworks
- Paradigmatic assumptions

**B. Historical/Context Jobs (1-3 jobs)** - HIGH/MEDIUM priority
- Origins and evolution (if relevant to focus)
- Key milestones and publications
- Paradigm shifts

**C. Convergent Analysis Jobs (2-3 jobs)** - HIGH priority
- Areas of consensus
- Established best practices
- Well-supported claims

**D. Divergent Analysis Jobs (2-4 jobs)** - HIGH/MEDIUM priority
- Major debates and controversies
- Competing schools of thought
- Unresolved tensions

**E. Gap-Filling Jobs (2-3 jobs)** - MEDIUM/HIGH priority
- Areas poorly covered in initial refs
- Recent developments not captured
- Missing perspectives

**F. Practical/Applied Jobs (1-3 jobs)** - Depends on focus
- Tools and techniques
- Case studies and implementations
- Best practices and lessons

**G. Integration Jobs (1-2 jobs)** - MEDIUM priority
- Cross-theme synthesis
- Interdisciplinary connections
- Relationship to adjacent fields

#### 1.5 Document the General Research Plan

**Structure:**

```markdown
# RESEARCH_PLAN_DETAILED - [TOPIC NAME]

## METADATA

**Version:** 1.0 - General Understanding  
**Date:** [Today's date]  
**Research Focus:** [Selected focus]  
**Narrative Arc:** [Selected arc or NEUTRAL]  
**AI Agent:** Claude Sonnet 4.5  
**Prompting Method:** CREATE_RESEARCH_PLAN v2.0

## SCOPE OF THIS RESEARCH PLAN

**Objective:**
[1-2 paragraphs describing what this research aims to achieve]

**Research Focus:**
[Explain the chosen focus and why it's appropriate for this topic]

**Narrative Thread:**
[If not NEUTRAL: Explain the selected arc and how it will structure the report]
[If NEUTRAL: Explain why thematic structure is more appropriate]

**Coverage:**
- What this plan WILL cover: [major areas]
- What this plan will NOT cover: [explicit exclusions]

**Expected Outcomes:**
- RESEARCH_REPORT of [estimated length range]
- Comprehensive understanding of [specific aspects]
- Foundation for [essay/book chapter/etc.]

## INTEGRATION WITH PREVIOUS PHASE

**Sources Used:**
- REFERENCE_SUMMARY analyzed: [N] references, [N] pages
- RESEARCH_PLAN (orientative): [N] gaps identified, [N] lines proposed
- NARRATIVE_BRIDGE: [N] story arcs considered
- SOURCE_AUTHORITY_HIERARCHY: v[X.Y], topic coverage verified
- CLAIM_VALIDATION_CRITERIA: Available for validation

**Key Themes from REFERENCE_SUMMARY:**
1. [Theme 1]
2. [Theme 2]
3. [Theme 3]
[...]

**Major Debates Identified:**
1. [Debate 1: Position A vs Position B]
2. [Debate 2: Position C vs Position D]
[...]

**Gaps to Address:**
1. [Gap 1]
2. [Gap 2]
3. [Gap 3]
[...]

## RESEARCH JOBS: GENERAL UNDERSTANDING

### Category A: Foundational Research

[JOB-001 through JOB-00N using template above]

### Category B: Historical/Context Research

[Jobs as applicable]

### Category C: Convergent Analysis

[Jobs]

### Category D: Divergent Analysis

[Jobs]

### Category E: Gap-Filling Research

[Jobs]

### Category F: Practical/Applied Research

[Jobs]

### Category G: Integration Research

[Jobs]

## RESEARCH JOB SUMMARY

| Job ID | Title | Category | Priority | Estimated Hours | Dependencies |
|--------|-------|----------|----------|-----------------|--------------|
| JOB-001 | [...] | Foundational | CRITICAL | 3h | None |
| JOB-002 | [...] | Historical | HIGH | 2h | JOB-001 |
[...]

**Total Estimated Effort:** [Sum of all jobs] hours

## SOURCE STRATEGY OVERVIEW

**Primary Sources (Tier 1):**
[List key Tier 1 sources from SOURCE_AUTHORITY_HIERARCHY for this topic]

**Secondary Sources (Tier 2):**
[List key Tier 2 sources]

**Databases to Search:**
- Primary: [list]
- Secondary: [list]
- Specialized: [list]

**Search Period Focus:**
[Based on research focus - e.g., "All time for foundations, 2020-2025 for current state"]

**Validation Framework:**
- Source validation: SOURCE_AUTHORITY_HIERARCHY v[X.Y]
- Claim validation: CLAIM_VALIDATION_CRITERIA
- Evidence sufficiency: Per job specification

## NEXT STEPS

This is Version 1.0 covering General Understanding research jobs.

**STEP 2 will add:** User-specific research tasks from ANNOTATED_REFERENCE_SUMMARY
**STEP 3 will allow:** Interactive refinement by editor
**STEP 4 will generate:** Adapted writing instructions
```

**Before proceeding to STEP 2, request explicit validation from editor.**

---

### STEP 2: USER-SPECIFIC RESEARCH TASKS

**Objective:** Extract and integrate specific research requests made by the editor.

**Process:**

#### 2.1 Extract Annotations from ANNOTATED_REFERENCE_SUMMARY and ANNOTATED_RESEARCH_PLAN

**The editor annotates TWO documents:**

1. **ANNOTATED_REFERENCE_SUMMARY:** Annotations on the initial synthesis
2. **ANNOTATED_RESEARCH_PLAN:** Annotations on the orientative research lines

**Read through BOTH annotated documents and identify:**

**A) Research Tasks (TASK: flag):**

From ANNOTATED_REFERENCE_SUMMARY:
```
Example annotation:
"...the adoption of smart building technologies increased 45% [5].

TASK: Verify this statistic with recent data (2023-2024). Is growth rate accelerating or decelerating?"
```

From ANNOTATED_RESEARCH_PLAN:
```
Example annotation:
### LINE 1: Evolution of Smart Building Standards

TASK: Clarify if smart buildings require physical interventions in existing buildings or are purely software-based
```

**B) Research Line Priorities (LINE: flag):**

From ANNOTATED_RESEARCH_PLAN:
```
Example annotation:
### LINE 1: Evolution of Smart Building Standards

LINE: PRIORITY HIGH - This is central to the argument
LINE: Add focus on Spanish/EU context, not just global
LINE: Combine with LINE 3 (Market Adoption) - they're related
```

**C) Contextual Comments (COMMENT: flag):**

From either document:
```
Example annotation:
"COMMENT: This debate seems central to my argument about human agency in automated systems"
```

For each annotation:
1. **Extract the request/directive:** What specifically is the editor asking?
2. **Extract local context:** What is the surrounding narrative about?
3. **Extract cited sources:** What references are nearby? (may inform source strategy)
4. **Note origin:** REFERENCE_SUMMARY or RESEARCH_PLAN (affects contextualization)

#### 2.2 Structure User Requests as Research Jobs

For each TASK: annotation (from either source document):

1. **Create Research Job using template** (same as Step 1.3)
   - Category: "User-Requested"
   - Priority: Default to HIGH (editor explicitly requested)
   - Derivation: "Editor annotation in [ANNOTATED_REFERENCE_SUMMARY or ANNOTATED_RESEARCH_PLAN], Section X"

2. **Add enriched context:**
   ```markdown
   **Origin:** [REFERENCE_SUMMARY Section X / RESEARCH_PLAN Line Y]
   
   **Local Context:**
   [2-3 sentences about where in the document this task appears and the surrounding discussion]
   
   **Overall Topic Context:**
   [How this task relates to broader themes of the topic]
   
   **Editor's Apparent Interest:**
   [Based on COMMENT flags or nature of request, why this matters to editor]
   ```

3. **Map to existing jobs:**
   - Does this request overlap with a Step 1 job?
   - If YES: Note as "Related to JOB-XXX" and consider merging
   - If NO: Create as new standalone job

**For LINE: annotations from ANNOTATED_RESEARCH_PLAN:**

These modify existing research jobs from Step 1 rather than creating new ones:

1. **Priority adjustments:**
   - "LINE: PRIORITY HIGH" → Upgrade corresponding job to HIGH or CRITICAL
   - "LINE: PRIORITY LOW" → Downgrade to MEDIUM or LOW

2. **Scope modifications:**
   - "LINE: Add focus on Spanish context" → Update job scope
   - "LINE: Also investigate failures, not just successes" → Add research questions

3. **Combination directives:**
   - "LINE: Combine with LINE 3" → Merge corresponding jobs
   - Document decision in updated plan

4. **Exclusions:**
   - "LINE: OMIT - Out of scope" → Mark job as skipped, document reason

#### 2.3 Consolidate and Organize User-Requested Jobs

**Review all extracted tasks and directives from BOTH annotated documents:**

**A) Process LINE: modifications first:**
- Apply priority changes to corresponding Step 1 jobs
- Apply scope modifications
- Execute mergers/combinations
- Mark exclusions
- Update job list accordingly

**B) Then process TASK: annotations:**

**Identify Duplicates:**
- Multiple TASK: annotations (from either or both documents) may ask similar questions
- Consolidate into single job with multiple angles

**Identify Overlaps with General Jobs:**
- TASK request may be subset of existing job → integrate as additional question
- TASK request may be superset → expand existing job scope
- TASK request may be completely independent → keep separate

**C) Prioritization:**
- Editor-requested TASK jobs are HIGH by default
- But if request is:
  - Central to topic understanding → Upgrade to CRITICAL
  - Peripheral interesting question → Downgrade to MEDIUM
  - Nice curiosity → LOW

**D) Sequencing:**
- If user task depends on general job → document dependency
- If user task is foundational to others → move early in sequence

**E) Cross-reference annotations:**
- If same topic annotated in BOTH documents → extra importance signal
- Ensure consistency (don't contradict directives)
- Synthesize context from both sources

#### 2.4 Update Research Plan

**Add new section to RESEARCH_PLAN_DETAILED:**

```markdown
## RESEARCH JOBS: USER-SPECIFIC REQUESTS

[Introduction paragraph explaining these jobs derive from editor annotations]

### User-Requested Job Set

[JOB-2XX series following same template]

**Example:**

**JOB-201: Verify Smart Building Adoption Statistics**

**Category:** User-Requested (Data Verification)
**Priority:** HIGH
**Derivation:**
- Source: Editor annotation in ANNOTATED_REFERENCE_SUMMARY, Section 4, Paragraph 3
- Context: Editor questions 2021 statistic "45% increase" and wants current data
- Rationale: Central to editor's argument about adoption pace

**Local Context:**
The annotation appears in discussion of market trends. Original source [5] from 2021 may be outdated. Editor is building argument about acceleration/deceleration of smart building adoption in Spain/EU context.

**Overall Topic Context:**
Market adoption rates are key indicator of technology maturity and practical viability. If growth is decelerating, may indicate saturation or market resistance - important for essay's framing.

**Editor's Apparent Interest:**
Based on COMMENT flag nearby, editor is concerned with whether optimistic projections about smart buildings are materializing in practice.

**Scope:**
Verify the specific "45% increase" claim from 2021. Find most recent data (ideally 2023-2024) on smart building technology adoption. Focus on Spain/EU if available, global if not. Determine if growth rate is accelerating, stable, or decelerating.

**Research Questions:**
1. What is the most recent (2023-2024) data on smart building adoption rates?
2. How does this compare to the 2021 baseline?
3. Is growth accelerating, stable, or decelerating?
4. Are there regional differences (Spain/EU vs. global)?
5. What do industry forecasts predict for 2025-2030?

**Source Strategy:**
- Tier 1 Priority: Market research firms (Gartner, IDC), EU Digital Economy reports
- Keywords: "smart building adoption rate 2023 2024", "building automation market growth", "BMS adoption statistics"
- Databases: Industry reports, EU Commission publications, Statista
- Time Frame: 2023-2024 data, compare to 2020-2021 baseline
- Saturation: 2+ authoritative market reports with consistent numbers

**Expected Outputs:**
- Updated statistics with source citation
- Trend analysis (accelerating/stable/decelerating)
- Regional breakdown if available
- Confidence assessment on data quality

**Validation:**
- Check: Source credibility (prefer primary research over cited figures)
- Check: Sample size and methodology disclosure
- Confidence Target: STRONG (editor needs to rely on this)

**Report Integration:**
- Target Section: 3.2 Market Trends and Adoption (or equivalent in adapted structure)
- Integration Method: DIRECT - replace or update original 45% claim
- May also feed Executive Summary if trend is significant

**Estimated Effort:**
- Research: 2-3 hours (finding recent authoritative sources)
- Validation: 1 hour (cross-checking figures)
- Writing: 1 hour (synthesizing trends)
- Total: 4-5 hours

**Dependencies:**
- Related to: JOB-006 (Market Analysis) - may merge insights

**Notes:**
Priority is HIGH because editor explicitly requested and appears central to essay framing. If no reliable 2023-2024 data exists, document this gap and use most recent available with caveat.

[Continue with JOB-202, etc.]
```

#### 2.5 Update Job Summary Table

Add user-requested jobs to summary:

```markdown
## UPDATED RESEARCH JOB SUMMARY

| Job ID | Title | Category | Priority | Est. Hours | Dependencies |
|--------|-------|----------|----------|------------|--------------|
| ... | [General jobs from Step 1] | ... | ... | ... | ... |
| JOB-201 | Verify Smart Building Stats | User-Requested | HIGH | 4-5h | JOB-006 |
| JOB-202 | [...] | User-Requested | HIGH | [...] | [...] |
[...]

**Total General Jobs:** [N]  
**Total User-Requested Jobs:** [M]  
**Total All Jobs:** [N+M]  
**Total Estimated Effort:** [Sum] hours
```

## VERSION UPDATE

Update metadata:

```markdown
**Version:** 2.0 - Integrated User Requests  
**Changes from v1.0:**
- Processed LINE: directives from ANNOTATED_RESEARCH_PLAN ([N] modifications applied)
- Added [M] user-requested research jobs from TASK: annotations
  - From ANNOTATED_REFERENCE_SUMMARY: [X] tasks
  - From ANNOTATED_RESEARCH_PLAN: [Y] tasks
- [N] jobs merged with existing general jobs
- [P] new standalone user jobs created
- Total effort updated to [X] hours
- Priority adjustments based on LINE: directives: [list if any]
```

**Before proceeding to STEP 3, request explicit validation from editor.**

---

### STEP 3: INTERACTIVE REFINEMENT

**Objective:** Allow editor to review, adjust, and refine the research plan.

**Process:**

#### 3.1 Initiate Refinement Conversation

```
"The RESEARCH_PLAN_DETAILED v2.0 is now complete with [N] total research jobs.

Please review the plan and indicate if you would like any of the following refinements:

A) Priority Adjustments
   - Upgrade/downgrade specific jobs
   - Example: 'Make JOB-015 CRITICAL instead of HIGH'

B) Scope Modifications
   - Expand or narrow specific job scopes
   - Example: 'JOB-008 should also cover Asian markets, not just EU'

C) Add New Jobs
   - Additional research areas not yet covered
   - Example: 'Add job on environmental impact of smart buildings'

D) Remove/Merge Jobs
   - Eliminate jobs out of scope
   - Combine redundant jobs
   - Example: 'JOB-012 and JOB-017 are redundant, merge them'

E) Adjust Dependencies
   - Change sequence of execution
   - Example: 'JOB-020 should be completed before JOB-015'

F) Modify Source Strategy
   - Add specific sources to search
   - Exclude certain types of sources
   - Example: 'For JOB-009, prioritize Spanish case studies over US ones'

G) Add Additional References
   - Provide new sources to integrate
   - May create new jobs or enrich existing ones

H) Change Research Focus or Narrative Arc
   - Reconsider the fundamental framing (requires significant rework)

I) Ready to Proceed
   - Plan approved as-is, move to Step 4

Your response: [   ]"
```

#### 3.2 Process Refinement Requests

For each refinement request:

**Type A-F (Adjustments):**
1. Make the requested change
2. Update affected jobs
3. Recalculate effort estimates if needed
4. Update dependencies if needed
5. Document change in version log

**Type G (Additional References):**
1. Analyze provided reference(s)
2. Determine which job(s) it relates to
3. Either:
   - Enrich existing job with new source
   - Create new job if opens new area
4. Update source strategies

**Type H (Fundamental Reframing):**
1. Confirm with editor this requires substantial rework
2. Return to STEP 1 with new parameters
3. Generate v3.0 with new focus/arc

**Type I (Approve):**
1. Proceed to STEP 4

#### 3.3 Iterative Refinement

- Allow multiple rounds of refinement
- After each round, ask: "Any additional refinements, or ready to proceed to Step 4?"
- Track all changes in version log

#### 3.4 Generate Refined Version

After editor indicates readiness:

**Update metadata:**

```markdown
**Version:** 3.X - Refined Plan  
**Changes from v2.0:**
- [Summarized list of all refinements made]
- [N] jobs added
- [M] jobs removed/merged
- [P] jobs modified in scope/priority
- Total effort updated to [X] hours

**Refinement History:**
- Round 1: [date] - [summary of changes]
- Round 2: [date] - [summary of changes]
[if multiple rounds]
```

**Request final approval:**

```
"RESEARCH_PLAN_DETAILED v3.X is now complete.

Summary:
- Total Jobs: [N]
- Critical: [N], High: [N], Medium: [N], Low: [N]
- Total Estimated Effort: [X] hours
- Research Focus: [X]
- Narrative Arc: [X or NEUTRAL]

Ready to proceed to STEP 4 (Generate Adapted Writing Instructions)?
[Y/N]"
```

---

### STEP 4: GENERATE ADAPTED WRITING INSTRUCTIONS

**Objective:** Customize the standard writing instructions template based on the research plan specifics.

**Process:**

#### 4.1 Select Body Structure Template

**Based on Research Focus, select appropriate template:**

**TEMPLATE A: Historical Review**
```markdown
### Body Structure (Historical Review Focus)

3. ORIGINS AND EARLY DEVELOPMENTS (pre-2000 or relevant cutoff)
   3.1 Foundational Concepts
   3.2 Early Pioneers and Institutions
   3.3 Initial Methodologies
   
4. PARADIGM FORMATION (2000-2015 or relevant period)
   4.1 Consolidation of Approaches
   4.2 Key Publications and Milestones
   4.3 Paradigm Debates
   
5. CONTEMPORARY EVOLUTION (2015-present)
   5.1 Recent Developments
   5.2 Methodological Innovations
   5.3 Emerging Schools of Thought
   
6. CURRENT STATE AND SYNTHESIS
   6.1 Established Consensus
   6.2 Ongoing Debates
   6.3 Practical Applications
   
7. FUTURE TRAJECTORIES
   7.1 Open Questions
   7.2 Emerging Directions
   7.3 Challenges Ahead
```

**TEMPLATE B: State of the Art**
```markdown
### Body Structure (State of the Art Focus)

3. FOUNDATIONAL CONCEPTS AND FRAMEWORKS
   3.1 Core Definitions
   3.2 Theoretical Foundations
   3.3 Underlying Assumptions
   
4. METHODOLOGICAL LANDSCAPE
   4.1 Research Approaches
   4.2 Measurement and Validation
   4.3 Experimental Methods
   
5. EMPIRICAL EVIDENCE BASE
   5.1 Key Findings
   5.2 Case Studies
   5.3 Quantitative Data
   
6. DEBATES AND CONTROVERSIES
   6.1 Major Points of Contention
   6.2 Competing Perspectives
   6.3 Unresolved Questions
   
7. PRACTICAL APPLICATIONS
   7.1 Tools and Techniques
   7.2 Implementation Examples
   7.3 Best Practices and Lessons
```

**TEMPLATE C: School of Thought Analysis**
```markdown
### Body Structure (School of Thought Focus)

3. PHILOSOPHICAL AND THEORETICAL BASIS
   3.1 Core Tenets
   3.2 Epistemological Foundations
   3.3 Intellectual Heritage
   
4. KEY PROPONENTS AND DEVELOPMENT
   4.1 Founding Figures
   4.2 Major Contributors
   4.3 Institutional Base
   
5. METHODOLOGICAL APPROACH
   5.1 Research Methods
   5.2 Analytical Frameworks
   5.3 Distinctive Features
   
6. EMPIRICAL SUPPORT AND APPLICATIONS
   6.1 Supporting Evidence
   6.2 Practical Applications
   6.3 Success Cases
   
7. CRITIQUES AND INFLUENCE
   7.1 Critical Perspectives
   7.2 Responses and Evolution
   7.3 Legacy and Ongoing Influence
```

**TEMPLATE D: Recent Developments**
```markdown
### Body Structure (Recent Developments Focus)

3. BASELINE CONTEXT: THE PREVIOUS PARADIGM
   3.1 Established Approaches (pre-2020)
   3.2 Limitations and Challenges
   3.3 Motivations for Change
   
4. EMERGENCE OF NEW APPROACHES (2020-2025)
   4.1 Novel Concepts and Frameworks
   4.2 Key Innovations
   4.3 Early Adopters and Pioneers
   
5. TECHNOLOGICAL/METHODOLOGICAL BREAKTHROUGHS
   5.1 Technical Innovations
   5.2 Methodological Advances
   5.3 Enabling Factors
   
6. EMPIRICAL EVIDENCE AND CASE STUDIES
   6.1 Early Results
   6.2 Pilot Implementations
   6.3 Comparative Performance
   
7. OPEN QUESTIONS AND FUTURE DIRECTIONS
   7.1 Unresolved Challenges
   7.2 Potential Trajectories
   7.3 Research Needs
```

**TEMPLATE E: Comparative Analysis**
```markdown
### Body Structure (Comparative Analysis Focus)

3. APPROACH A: [NAME]
   3.1 Core Principles
   3.2 Methodology
   3.3 Evidence Base
   3.4 Strengths and Limitations
   
4. APPROACH B: [NAME]
   4.1 Core Principles
   4.2 Methodology
   4.3 Evidence Base
   4.4 Strengths and Limitations
   
5. APPROACH C: [NAME] (if applicable)
   5.1 Core Principles
   5.2 Methodology
   5.3 Evidence Base
   5.4 Strengths and Limitations
   
6. COMPARATIVE ANALYSIS
   6.1 Theoretical Comparison
   6.2 Empirical Performance
   6.3 Practical Considerations
   6.4 Contextual Appropriateness
   
7. SYNTHESIS AND IMPLICATIONS
   7.1 Complementarities
   7.2 Trade-offs
   7.3 Recommendations
```

**TEMPLATE F: Practical Implementation**
```markdown
### Body Structure (Practical Implementation Focus)

3. FOUNDATIONAL CONCEPTS (Theory Needed)
   3.1 Core Principles
   3.2 Theoretical Frameworks
   3.3 Key Assumptions
   
4. TOOLS AND TECHNIQUES
   4.1 Available Tools
   4.2 Methodologies
   4.3 Frameworks and Protocols
   
5. IMPLEMENTATION CASE STUDIES
   5.1 Case 1: [Sector/Context]
   5.2 Case 2: [Sector/Context]
   5.3 Case 3: [Sector/Context]
   5.4 Cross-Case Analysis
   
6. BEST PRACTICES AND LESSONS LEARNED
   6.1 Success Factors
   6.2 Common Pitfalls
   6.3 Adaptations by Context
   
7. CHALLENGES AND FUTURE DIRECTIONS
   7.1 Technical Challenges
   7.2 Organizational Challenges
   7.3 Emerging Solutions
```

#### 4.2 Map Research Jobs to Report Sections

**Create mapping table:**

```markdown
### Research Job to Report Section Mapping

| Job ID | Job Title | Report Section | Integration Method | Notes |
|--------|-----------|----------------|-------------------|-------|
| JOB-001 | Core Concepts | 3.1 Foundational Concepts | DIRECT | Defines key terms |
| JOB-002 | Historical Origins | 3. [If historical template] | SYNTHESIZED | Combine with JOB-003 |
| JOB-015 | User: Stats Verification | 5.3 [Practical section] | DIRECT | Updates specific claim |
| JOB-020 | Integration: Adjacent Fields | 6.4 [or dedicated subsection] | INTEGRATED | May span sections |
[...]

**Integration Methods:**
- **DIRECT**: Job output goes directly into section as written
- **SYNTHESIZED**: Combine with other jobs for cohesive narrative
- **DISTRIBUTED**: Job insights spread across multiple sections
- **SUPPORTING**: Used as evidence/examples within larger argument
- **DEDICATED**: User-requested job requiring its own subsection
```

#### 4.3 Define User-Requested Job Integration Strategy

**For each user-requested job, decide:**

**Option 1: Seamless Integration (PREFERRED)**
- Fits naturally within existing section
- Enhances narrative flow
- Example: Stats verification updates a claims in Market Trends section

**Option 2: Dedicated Subsection**
- Doesn't fit existing structure BUT is substantial
- Create subsection with meaningful title (not "User-Specific Interests")
- Example: User asked about workforce impact → Create "6.4 Impact on Building Management Workforce"

**Option 3: Appendix (RARE)**
- Tangential to main narrative BUT valuable
- Example: Deep dive into specific tool that's interesting but derails flow

**Document strategy:**

```markdown
### User-Requested Research Integration

**Jobs Integrated Seamlessly:** [List]
- JOB-201 → Section 5.3
- JOB-203 → Section 4.2

**Jobs Requiring Dedicated Subsections:**
- JOB-205: "Impact on Workforce" → Create Section 6.4
- JOB-208: "Regional Variations in Adoption" → Create Section 5.4

**Jobs in Appendix:**
- JOB-215: "Technical Specifications of BACnet Protocol" → Appendix A
```

#### 4.4 Set Length Targets

**Calculate based on job count and complexity:**

```markdown
### Length Target Calculation

**Base Formula:**
- 300-500 words per research job for synthesis
- +2,000 words for Introduction
- +1,000 words for Executive Summary + Conclusions + Timeline
- +500 words for Methodology section

**For this plan:**
- Total Jobs: [N]
- Estimated synthesis words: [N × 400] = [X] words
- + Structural sections: 3,500 words
- **Target Range: [X+3500 ± 20%] words**

**Example:**
- 15 jobs × 400 = 6,000 words
- + 3,500 = 9,500 words
- Target: 8,000-11,000 words

**Flexibility:** No hard maximum. If topic complexity justifies 15,000 words, that's acceptable.

**Distribution Guidance:**
1. Executive Summary: 400-600 words (5%)
2. Introduction: 1,000-1,500 words (12%)
3. Body: 5,000-9,000 words (70%)
   - Distributed proportionally across sections
4. Conclusions: 600-800 words (7%)
5. Methodology: 400-600 words (4%)
6. Timeline & Cast: 400-600 words (4%)
7. References: Variable
```

#### 4.5 Generate WRITING_INSTRUCTIONS_ADAPTED

**Create customized document:**

```markdown
# WRITING_INSTRUCTIONS_ADAPTED - [TOPIC NAME]

## METADATA

**Adapted From:** WRITING_INSTRUCTIONS_STANDARD  
**Research Plan:** RESEARCH_PLAN_DETAILED v[X.X]  
**Research Focus:** [X]  
**Narrative Arc:** [X or NEUTRAL]  
**Date:** [Today]

## CONTEXT

This document provides customized writing instructions for producing the RESEARCH_REPORT based on the detailed research plan. The report will be written in Spanish with technical terms in English where conventional.

## OUTPUT SPECIFICATIONS

### Document Identification
- **Title:** [Suggested compelling title based on topic and focus]
- **Subtitle:** [Research focus descriptor]
- **Document ID:** RESEARCH_REPORT_[TOPIC]_[FOCUS]_v1.0
- **Target Length:** [X-Y] words
- **Citation Style:** IEEE [N] format

### Narrative Approach

**Selected Narrative Arc:** [If not NEUTRAL]
[Description of how the arc will structure the report]

**OR**

**Thematic Structure:** [If NEUTRAL]
[Explanation of how sections organize thematically]

## DOCUMENT STRUCTURE

### 0. METADATA
[Standard metadata as per template, enhanced with methodological details]

**Include:**
- Research focus and narrative arc used
- Number of sources by tier
- Research jobs completed
- Validation frameworks applied
- Estimated research hours
- Quality metrics (% claims with STRONG evidence)

### 1. EXECUTIVE SUMMARY (400-600 words)
[Standard: overview of topic, main findings, practical implications, 5-10 tags]

### 2. INTRODUCTION (1,000-1,500 words)

**Purpose:** Provide high-level context and roadmap

**Must Include:**
- What is the TOPIC and why does it matter?
- What does this report cover (and not cover)?
- How is the report structured?
- Brief preview of main findings

**Do NOT include:** Detailed analysis (that's in Body)

### 3-X. BODY ([Template Name] Structure)

[Insert selected body structure template from 4.1]

**For each section:**

**[Section Number]. [SECTION TITLE]**

**Purpose:** [What this section aims to establish]

**Research Jobs Feeding This Section:**
- JOB-XXX: [Title]
- JOB-YYY: [Title]
[...]

**Integration Method:** [Synthesized / Direct / etc.]

**Expected Length:** [X-Y words based on job count]

**Key Points to Address:**
- [Point 1]
- [Point 2]
[...]

**Evidence Strength Expected:**
- Primary claims: STRONG evidence from Tier 1 sources
- Supporting claims: MODERATE evidence acceptable
- Speculative points: Clearly labeled as such

**Narrative Notes:** [If arc is not NEUTRAL]
[How this section advances the narrative arc]

[Repeat for each Body section]

### User-Requested Research Integration

**The following sections/subsections specifically address editor-requested research:**

- Section [X.Y]: [Title] - Addresses JOB-201 (Stats verification)
- Section [X.Z]: [Title] - Addresses JOB-205 (Workforce impact)
[...]

### [Next Number]. METHODOLOGY (400-600 words)

**Purpose:** Transparency about research process

**Include:**
- Number and types of sources consulted
- Databases and search strategies used
- Validation frameworks applied (SOURCE_AUTHORITY_HIERARCHY, CLAIM_VALIDATION_CRITERIA)
- Confidence assessment approach
- Limitations and scope constraints

### [Next Number]. SYNTHESIS, CONCLUSIONS, AND IMPLICATIONS (600-800 words)

**Purpose:** Integrate findings and point forward

**Include:**
- Integrated understanding of TOPIC
- Key takeaways for practitioners and researchers
- Research priorities and future directions
- Comments on editor-specific interests (if notable)

### [Next Number]. TIMELINE AND CAST OF CHARACTERS (400-600 words)

**Timeline:**
[Chronological table or narrative of major events/publications]

**Key Actors:**
- Authors: [Profile in context of topic]
- Institutions: [Role and influence]

### REFERENCES

- Numbered list [N] corresponding to inline citations
- Ensure all research jobs' sources are included
- Remove duplicate citations

## WRITING REQUIREMENTS

### Style and Tone

**Narrative Flow:**
- Write as a readable book, not a handbook
- Maintain coherent narrative thread throughout
- Smooth transitions between sections and paragraphs

**Language:**
- Academic and formal tone
- Use complex language when needed for precision
- Technical terms in English, prose in Spanish

**Lists and Bullet Points:**
- AVOID large bullet lists (>4-5 items)
- Convert lists to narrative prose where possible
- Use tables for comparison of multiple concepts/cases
- Every list must have:
  - Introductory contextual paragraph
  - Concluding summary or transition

**Critical and Analytical:**
- Evaluate strengths and limitations
- Identify contradictions and debates
- Don't just report - analyze and question

### Citation Requirements

**Format:** [N] numeric (IEEE style)

**Density:**
- Every factual claim must be cited
- But: One citation per distinct piece of information
- Remove redundant citations

**Accuracy:**
- Verify all citations correspond to actual sources
- Cross-check claims against original sources
- Document confidence level in findings

### Quality Checkpoints

**Before finalizing, verify:**

- [ ] All CRITICAL priority research jobs incorporated
- [ ] Narrative arc (if not NEUTRAL) is maintained throughout
- [ ] User-requested research is integrated as specified
- [ ] All sections have expected evidence strength
- [ ] No section starts with list/bullet points
- [ ] Transitions between sections are smooth
- [ ] Citations are accurate and complete
- [ ] Methodology section documents process
- [ ] Length target is met (±20% acceptable)
- [ ] Spanish language throughout (except technical terms)

## RESEARCH JOB TO SECTION MAPPING

[Insert the mapping table from 4.2]

## SPECIAL INSTRUCTIONS

[Any topic-specific writing guidance based on research findings]

**For example:**
- "The debate between Position A and B is central - give balanced treatment"
- "Practical case studies are limited - be explicit about this limitation"
- "Recent developments (2023-2024) are sparse - rely on 2020-2022 literature"
- "Editor is particularly interested in workforce implications - emphasize in relevant sections"

## EXECUTION NOTES

This document should be used by EXECUTE_RESEARCH_PLAN prompt (separate from this planning phase) to guide the actual writing of the RESEARCH_REPORT after all research jobs are completed.
```

#### 4.6 Final Version Update

**Update RESEARCH_PLAN_DETAILED metadata:**

```markdown
**Version:** 4.0 - Final Plan with Adapted Writing Instructions  
**Changes from v3.X:**
- Generated WRITING_INSTRUCTIONS_ADAPTED document
- Selected Body Structure Template: [Template Name]
- Mapped all research jobs to report sections
- Set length target: [X-Y] words
- Defined user-requested job integration strategy
- Ready for execution

**Execution Ready:** YES

**Outputs Produced:**
1. RESEARCH_PLAN_DETAILED_[TOPIC]_[FOCUS]_v4.0.md
2. WRITING_INSTRUCTIONS_ADAPTED_[TOPIC]_[FOCUS].md
```

**Request final approval:**

```
"CREATE_RESEARCH_PLAN process is now complete.

Outputs ready for execution:
1. RESEARCH_PLAN_DETAILED_[TOPIC]_[FOCUS]_v4.0.md
   - [N] total research jobs
   - [X] hours estimated effort
   - Research focus: [X]
   - Narrative arc: [X or NEUTRAL]

2. WRITING_INSTRUCTIONS_ADAPTED_[TOPIC]_[FOCUS].md
   - Body structure: [Template Name]
   - Length target: [X-Y] words
   - Job-to-section mapping complete
   - User requests integration defined

Ready to provide documents for editor review and approval before execution phase.

Proceed? [Y/N]"
```

---

## PART IV: OUTPUTS

### 4.1 Primary Output: RESEARCH_PLAN_DETAILED

**Final document structure:**

```
RESEARCH_PLAN_DETAILED_[TOPIC]_[FOCUS]_v4.0.md

├─ METADATA (version history, scope, AI agent)
├─ INTEGRATION WITH PREVIOUS PHASE (summary of artifacts used)
├─ RESEARCH JOBS: GENERAL UNDERSTANDING
│  ├─ Category A: Foundational (jobs)
│  ├─ Category B: Historical/Context (jobs)
│  ├─ Category C: Convergent Analysis (jobs)
│  ├─ Category D: Divergent Analysis (jobs)
│  ├─ Category E: Gap-Filling (jobs)
│  ├─ Category F: Practical/Applied (jobs)
│  └─ Category G: Integration (jobs)
├─ RESEARCH JOBS: USER-SPECIFIC REQUESTS (jobs)
├─ RESEARCH JOB SUMMARY (table)
├─ SOURCE STRATEGY OVERVIEW
└─ EXECUTION NOTES
```

### 4.2 Secondary Output: WRITING_INSTRUCTIONS_ADAPTED

**Final document structure:**

```
WRITING_INSTRUCTIONS_ADAPTED_[TOPIC]_[FOCUS].md

├─ METADATA (research plan version, focus, arc)
├─ CONTEXT
├─ OUTPUT SPECIFICATIONS
├─ DOCUMENT STRUCTURE (customized sections with:)
│  ├─ Purpose
│  ├─ Research jobs feeding section
│  ├─ Integration method
│  ├─ Expected length
│  ├─ Key points
│  └─ Narrative notes (if arc selected)
├─ WRITING REQUIREMENTS (style, tone, citation)
├─ QUALITY CHECKPOINTS
├─ RESEARCH JOB TO SECTION MAPPING (table)
└─ SPECIAL INSTRUCTIONS (topic-specific)
```

---

## PART V: VERSION LOG

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | Aug 2025 | Initial version (original prompt) |
| 2.0 | Jan 2026 | Complete redesign: Separated from execution, integrated with previous phase artifacts (SOURCE_AUTHORITY_HIERARCHY, NARRATIVE_BRIDGE), structured research job template, body structure templates by focus, explicit research focus selection, user annotation system clarified, adapted writing instructions generation |
| 2.1 | Jan 25, 2026 | Added Research Focus 7: Seminal Concept Analysis (TIPO G); added research job categories for Seminal Concept Analysis; updated to support 7 types of research reports/books |
| 2.2 | Feb 22, 2026 | Fixed section references to match canonical output structures: REFERENCE_SUMMARY section 5 (Historical Perspective) corrected to section 4; section 3 name updated to "Convergence and Divergence Analysis"; RESEARCH_PLAN section 1 (Gap Analysis) corrected to section 2 (resolves GAP-R01, GAP-R02) |

---

## PART VI: EXECUTION HANDOFF

After CREATE_RESEARCH_PLAN is complete and approved:

1. **Editor reviews** both output documents
2. **Editor approves** or requests final adjustments
3. **Execution phase begins** using separate prompt: EXECUTE_RESEARCH_PLAN v1.0
4. **EXECUTE_RESEARCH_PLAN** takes as input:
   - RESEARCH_PLAN_DETAILED v4.0
   - WRITING_INSTRUCTIONS_ADAPTED
   - SOURCE_AUTHORITY_HIERARCHY
   - CLAIM_VALIDATION_CRITERIA
   - Original references (if needed for re-verification)

---

**END OF CREATE_RESEARCH_PLAN v2.2**
