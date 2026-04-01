# CREATE_RESEARCH_PLAN: DEEP RESEARCH PLANNING SYSTEM

**Version:** 3.0  
**Date:** March 31, 2026  
**Optimized for:** Claude Sonnet 4.5 and similar LLMs  
**Context:** "Tinta Artificial" - Deep Research Phase

**Changelog v3.0:**

* Externalized Research Focus type definitions (job category distributions and body structure templates) to `RESOURCE_RESEARCH_FOCUS_TYPES.md v1.1` — eliminating embedded duplication (resolves GAP-R11)
* Sections 1.2 (Define Research Job Categories) and 4.1 (Select Body Structure Template) now reference the resource instead of embedding type-specific configurations
* RESOURCE_RESEARCH_FOCUS_TYPES added as mandatory input (section 2.1, item 8)
* No changes to logic, workflow, or any other section

**Changelog v2.2:**

* Fixed section references to match canonical REFERENCE_SUMMARY structure: section 5 (Historical Perspective) corrected to section 4; section 3 name updated to "Convergence and Divergence Analysis" (resolves GAP-R01, GAP-R02)
* Fixed section references to match canonical RESEARCH_PLAN structure: section 1 (Gap Analysis) corrected to section 2 (resolves GAP-R01, GAP-R02)

**Changelog v2.1:**

* Added Research Focus 7: Seminal Concept Analysis (TIPO G)
* Added research job categories for Seminal Concept Analysis
* Updated to support 7 types of research reports/books

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

* The previous phase produced an *orientative* RESEARCH_PLAN identifying gaps and suggesting directions
* This prompt produces an *executable* RESEARCH_PLAN_DETAILED with structured research jobs

**RESEARCH FOCUS**

* Each execution can have a different focus (Historical Review, State of the Art, School Analysis, etc.)
* Focus is **selected before** creating the plan (not during)
* Focus determines body structure template for the report
* The 7 available focus types (A–G) with their full configurations are defined in `RESOURCE_RESEARCH_FOCUS_TYPES.md`

**NARRATIVE ARC**

* Selected from NARRATIVE_BRIDGE options OR set to NEUTRAL
* Determines narrative thread of the report
* NEUTRAL is valid when topic doesn't lend itself to story-based structure

**RESEARCH JOB**

* Atomic unit of work in the research plan
* Structured specification of what to investigate, how, and why
* Typically 10-20 jobs per plan (balanced granularity)

### 1.4 Quality Standards

The resulting RESEARCH_REPORT must provide:

* **Comprehensive coverage** of TOPIC including motivations, methodologies, paradigms, evidence, debates
* **Critical analysis** of different approaches with strengths/limitations
* **Historical perspective** on evolution of the topic
* **Practical applications** with detailed use cases
* **Current state and future directions**
* **Rigorous sourcing** validated against SOURCE_AUTHORITY_HIERARCHY

---

## PART II: INPUT SPECIFICATION

### 2.1 Mandatory Inputs

**FROM PREVIOUS PHASE:**

1. **REFERENCE_SUMMARY** (formerly "TOPIC SUMMARY")

   * 5,000-7,000 word analysis of initial references
   * Use sections: 0 (metadata), 2 (thematic architecture), 3 (convergence and divergence analysis), 4 (historical perspective), 7 (key actors)
2. **ANNOTATED_REFERENCE_SUMMARY**

   * Editor-annotated version of REFERENCE_SUMMARY
   * Contains inline flags: "TASK:" for specific research requests, "LINE:" for research line priorities, "COMMENT:" for context
   * Editor manually reviews REFERENCE_SUMMARY and marks areas requiring deep investigation
3. **RESEARCH_PLAN** (formerly "INITIAL_RESEARCH_PLAN")

   * 3,000-4,000 word orientative plan from previous phase
   * Use sections: 2 (gap analysis), 4 (proposed research directions), 5 (supplementary sources)
4. **ANNOTATED_RESEARCH_PLAN**

   * Editor-annotated version of RESEARCH_PLAN
   * Contains inline flags: "LINE:" for priority/scope adjustments on research lines, "TASK:" for specific questions, "COMMENT:" for context
   * Editor manually reviews RESEARCH_PLAN lines of investigation and adds directives
5. **NARRATIVE_BRIDGE**

   * 1,500-2,000 word document with story arcs, editorial angles, unexpected connections
   * Use section 1 (story arcs) to select narrative thread
6. **SOURCE_AUTHORITY_HIERARCHY**

   * Global resource with Tier 1-3 sources by topic
   * Includes search strategies and validation checks
   * **Critical for research job source specification**
7. **CLAIM_VALIDATION_CRITERIA**

   * Conceptual validation framework
   * Evidence sufficiency guidelines
   * **Critical for defining validation approach in research jobs**
8. **RESOURCE_RESEARCH_FOCUS_TYPES** (v1.1)

   * Global resource defining the 7 Research Focus types (A–G)
   * Contains: focus descriptions, research job category distributions, body structure templates
   * **Read this resource before Step 0 to present focus options to the editor**
   * Located at: `/knowledge-base/RESOURCE_RESEARCH_FOCUS_TYPES.md`

**FROM EDITOR (provided before starting):**

9. **RESEARCH_FOCUS** (selected from the 7 types defined in RESOURCE_RESEARCH_FOCUS_TYPES)

10. **NARRATIVE_ARC** (selected from NARRATIVE_BRIDGE or set to NEUTRAL)

    * One of the story arcs from NARRATIVE_BRIDGE Section 1
    * OR: "NEUTRAL" for non-narrative structure

11. **WRITING_INSTRUCTIONS_STANDARD**

    * Template writing instructions to be adapted
    * Will be customized based on focus and findings

### 2.2 File Verification

Before starting, the AI must:

1. Confirm access to all 11 inputs listed above
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

1. **Read RESOURCE_RESEARCH_FOCUS_TYPES**

   Before presenting options to the editor, read `RESOURCE_RESEARCH_FOCUS_TYPES.md v1.1` to load the current names, codes (A–G), and brief descriptions of all available focus types.

2. **Request Research Focus Selection**

   ```
   "Please select the RESEARCH FOCUS for this investigation.

   Available focus types (from RESOURCE_RESEARCH_FOCUS_TYPES v1.1):
   [List focus types A–G as read from the resource, with code, name, and one-line description]

   Your selection: [   ]"
   ```

3. **Request Narrative Arc Selection**

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

4. **Request Filenames**

   ```
   "Please provide filenames for:
   1. REFERENCE_SUMMARY: _________________
   2. ANNOTATED_REFERENCE_SUMMARY: _________________
   3. RESEARCH_PLAN: _________________
   4. ANNOTATED_RESEARCH_PLAN: _________________
   5. NARRATIVE_BRIDGE: _________________
   6. SOURCE_AUTHORITY_HIERARCHY: _________________
   7. CLAIM_VALIDATION_CRITERIA: _________________
   8. RESOURCE_RESEARCH_FOCUS_TYPES: _________________
   9. WRITING_INSTRUCTIONS_STANDARD: _________________"
   ```

5. **Verify Access**

   * Attempt to read each file
   * Report success/failure for each
   * Request reupload if any file is inaccessible

6. **Request Explicit Confirmation**

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

* **Section 2 (Thematic Architecture):** Identify 3-7 major themes

  + These become primary organizing units for research jobs
* **Section 3 (Convergence and Divergence Analysis):** Map debates and controversies

  + Each major debate becomes a research job focused on evaluating positions
* **Section 4 (Historical Perspective):** Extract timeline and evolution

  + Historical review jobs if relevant to focus
* **Section 7 (Key Actors):** List foundational authors and institutions

  + Informs source priority in research jobs

**B) Extract from RESEARCH_PLAN:**

* **Section 2 (Gap Analysis):** Identify gaps in initial references

  + Each gap category becomes gap-filling research job(s)
* **Section 4 (Proposed Research Directions):** Review Lines of Investigation

  + Transform each line into 1-3 research jobs with specific questions
* **Section 5 (Supplementary Sources):** Note recommended sources

  + Integrate into source strategies of relevant research jobs

**C) Extract from NARRATIVE_BRIDGE:**

* **Selected Arc (or NEUTRAL):** Note narrative thread

  + Will influence how research jobs are organized in report
* **Section 3 (Unexpected Connections):** Interdisciplinary links

  + Create optional research jobs to explore these connections

**D) Reference SOURCE_AUTHORITY_HIERARCHY:**

* **For the topic:** Extract Tier 1-3 sources
* **Note Search Strategy:** Keywords, databases, saturation criteria
* **Note Validation Checks:** Specific checks for this topic

#### 1.2 Define Research Job Categories

**Consult `RESOURCE_RESEARCH_FOCUS_TYPES.md v1.1`** to load the research job category distribution for the selected focus type.

The resource defines, for each focus type (A–G):
- The recommended job categories
- The percentage allocation across categories
- Specific guidance for job structuring

Apply the configuration for the selected focus directly from the resource.

#### 1.3 Create Research Jobs Using Template

For each identified research need, create a structured research job:

```
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

* Core concepts and definitions
* Theoretical frameworks
* Paradigmatic assumptions

**B. Historical/Context Jobs (1-3 jobs)** - HIGH/MEDIUM priority

* Origins and evolution (if relevant to focus)
* Key milestones and publications
* Paradigm shifts

**C. Convergent Analysis Jobs (2-3 jobs)** - HIGH priority

* Areas of consensus
* Established best practices
* Well-supported claims

**D. Divergent Analysis Jobs (2-4 jobs)** - HIGH/MEDIUM priority

* Major debates and controversies
* Competing schools of thought
* Unresolved tensions

**E. Gap-Filling Jobs (2-3 jobs)** - MEDIUM/HIGH priority

* Areas poorly covered in initial refs
* Recent developments not captured
* Missing perspectives

**F. Practical/Applied Jobs (1-3 jobs)** - Depends on focus

* Tools and techniques
* Case studies and implementations
* Best practices and lessons

**G. Integration Jobs (1-2 jobs)** - MEDIUM priority

* Cross-theme synthesis
* Interdisciplinary connections
* Relationship to adjacent fields

#### 1.5 Document the General Research Plan

**Structure:**

```
# RESEARCH_PLAN_DETAILED - [TOPIC NAME]

## METADATA

**Version:** 1.0 - General Understanding  
**Date:** [Today's date]  
**Research Focus:** [Selected focus]  
**Narrative Arc:** [Selected arc or NEUTRAL]  
**AI Agent:** Claude Sonnet 4.5  
**Prompting Method:** CREATE_RESEARCH_PLAN v3.0

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
- RESOURCE_RESEARCH_FOCUS_TYPES: v1.1, focus type [X] configuration loaded

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

   * Category: "User-Requested"
   * Priority: Default to HIGH (editor explicitly requested)
   * Derivation: "Editor annotation in [ANNOTATED_REFERENCE_SUMMARY or ANNOTATED_RESEARCH_PLAN], Section X"
2. **Add enriched context:**

   ```
   **Origin:** [REFERENCE_SUMMARY Section X / RESEARCH_PLAN Line Y]

   **Local Context:**
   [2-3 sentences about where in the document this task appears and the surrounding discussion]

   **Overall Topic Context:**
   [How this task relates to broader themes of the topic]

   **Editor's Apparent Interest:**
   [Based on COMMENT flags or nature of request, why this matters to editor]
   ```
3. **Map to existing jobs:**

   * Does this request overlap with a Step 1 job?
   * If YES: Note as "Related to JOB-XXX" and consider merging
   * If NO: Create as new standalone job

**For LINE: annotations from ANNOTATED_RESEARCH_PLAN:**

These modify existing research jobs from Step 1 rather than creating new ones:

1. **Priority adjustments:**

   * "LINE: PRIORITY HIGH" → Upgrade corresponding job to HIGH or CRITICAL
   * "LINE: PRIORITY LOW" → Downgrade to MEDIUM or LOW
2. **Scope modifications:**

   * "LINE: Add focus on Spanish context" → Update job scope
   * "LINE: Also investigate failures, not just successes" → Add research questions
3. **Combination directives:**

   * "LINE: Combine with LINE 3" → Merge corresponding jobs
   * Document decision in updated plan
4. **Exclusions:**

   * "LINE: OMIT - Out of scope" → Mark job as skipped, document reason

#### 2.3 Consolidate and Organize User-Requested Jobs

**Review all extracted tasks and directives from BOTH annotated documents:**

**A) Process LINE: modifications first:**

* Apply priority changes to corresponding Step 1 jobs
* Apply scope modifications
* Execute mergers/combinations
* Mark exclusions
* Update job list accordingly

**B) Then process TASK: annotations:**

**Identify Duplicates:**

* Multiple TASK: annotations (from either or both documents) may ask similar questions
* Consolidate into single job with multiple angles

**Identify Overlaps with General Jobs:**

* TASK request may be subset of existing job → integrate as additional question
* TASK request may be superset → expand existing job scope
* TASK request may be completely independent → keep separate

**C) Prioritization:**

* Editor-requested TASK jobs are HIGH by default
* But if request is:
  + Central to topic understanding → Upgrade to CRITICAL
  + Peripheral interesting question → Downgrade to MEDIUM
  + Nice curiosity → LOW

**D) Sequencing:**

* If user task depends on general job → document dependency
* If user task is foundational to others → move early in sequence

**E) Cross-reference annotations:**

* If same topic annotated in BOTH documents → extra importance signal
* Ensure consistency (don't contradict directives)
* Synthesize context from both sources

#### 2.4 Update Research Plan

**Add new section to RESEARCH_PLAN_DETAILED:**

```
## RESEARCH JOBS: USER-SPECIFIC REQUESTS

[Introduction paragraph explaining these jobs derive from editor annotations]

### User-Requested Job Set

[JOB-2XX series following same template]
```

#### 2.5 Update Job Summary Table

Add user-requested jobs to summary and update version metadata to v2.0.

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
B) Scope Modifications
C) Add New Jobs
D) Remove/Merge Jobs
E) Adjust Dependencies
F) Modify Source Strategy
G) Add Additional References
H) Change Research Focus or Narrative Arc
I) Ready to Proceed

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
3. Either enrich existing job or create new job
4. Update source strategies

**Type H (Fundamental Reframing):**

1. Confirm with editor this requires substantial rework
2. Return to STEP 1 with new parameters (reload RESOURCE_RESEARCH_FOCUS_TYPES for new focus if needed)
3. Generate v3.0 with new focus/arc

**Type I (Approve):**

1. Proceed to STEP 4

#### 3.3 Iterative Refinement

* Allow multiple rounds of refinement
* After each round, ask: "Any additional refinements, or ready to proceed to Step 4?"
* Track all changes in version log

#### 3.4 Generate Refined Version

After editor indicates readiness, update metadata and request final approval.

---

### STEP 4: GENERATE ADAPTED WRITING INSTRUCTIONS

**Objective:** Customize the standard writing instructions template based on the research plan specifics.

**Process:**

#### 4.1 Select Body Structure Template

**Consult `RESOURCE_RESEARCH_FOCUS_TYPES.md v1.1`** to load the body structure template for the selected focus type.

The resource defines, for each focus type (A–G), the recommended body structure with:
- Section titles and numbering
- Purpose of each section
- Subsection breakdown
- Length guidance

Apply the template for the selected focus directly from the resource.

#### 4.2 Map Research Jobs to Report Sections

**Create mapping table:**

```
### Research Job to Report Section Mapping

| Job ID | Job Title | Report Section | Integration Method | Notes |
|--------|-----------|----------------|-------------------|-------|
| JOB-001 | Core Concepts | 3.1 Foundational Concepts | DIRECT | Defines key terms |
| JOB-002 | Historical Origins | 3. [If historical template] | SYNTHESIZED | Combine with JOB-003 |
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

**Option 2: Dedicated Subsection**
- Doesn't fit existing structure BUT is substantial
- Create subsection with meaningful title (not "User-Specific Interests")

**Option 3: Appendix (RARE)**
- Tangential to main narrative BUT valuable

#### 4.4 Set Length Targets

```
### Length Target Calculation

**Base Formula:**
- 300-500 words per research job for synthesis
- +2,000 words for Introduction
- +1,000 words for Executive Summary + Conclusions + Timeline
- +500 words for Methodology section

**Flexibility:** No hard maximum. If topic complexity justifies 15,000 words, that's acceptable.
```

#### 4.5 Generate WRITING_INSTRUCTIONS_ADAPTED

Create customized document with:
- Document identification and length target
- Narrative approach (selected arc or NEUTRAL)
- Document structure (using template from RESOURCE_RESEARCH_FOCUS_TYPES)
- Writing requirements (style, tone, citation)
- Quality checkpoints
- Research job to section mapping
- Special instructions

#### 4.6 Final Version Update

Update RESEARCH_PLAN_DETAILED metadata to v4.0 and request final approval.

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
├─ DOCUMENT STRUCTURE (sections per focus template from resource)
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
| 3.0 | Mar 31, 2026 | Externalized Research Focus type definitions to RESOURCE_RESEARCH_FOCUS_TYPES.md v1.1: removed embedded job category distributions (Step 1.2) and body structure templates (Step 4.1); both sections now reference the resource; RESOURCE_RESEARCH_FOCUS_TYPES added as mandatory input (item 8 in section 2.1); Step 0 updated to read the resource before presenting focus options to editor (resolves GAP-R11) |

---

## PART VI: EXECUTION HANDOFF

After CREATE_RESEARCH_PLAN is complete and approved:

1. **Editor reviews** both output documents
2. **Editor approves** or requests final adjustments
3. **Execution phase begins** using separate prompt: EXECUTE_RESEARCH_PLAN v1.0
4. **EXECUTE_RESEARCH_PLAN** takes as input:
   * RESEARCH_PLAN_DETAILED v4.0
   * WRITING_INSTRUCTIONS_ADAPTED
   * SOURCE_AUTHORITY_HIERARCHY
   * CLAIM_VALIDATION_CRITERIA
   * Original references (if needed for re-verification)

---

**END OF CREATE_RESEARCH_PLAN v3.0**
