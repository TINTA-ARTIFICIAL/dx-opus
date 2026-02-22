---
id:          RESOURCE_RESEARCH_FOCUS_TYPES
type:        RESOURCE
subsystem:   KNOWLEDGE_BASE
version:     1.1
status:      ACTIVE
created:     2026-02-22
updated:     2026-02-22
owner_chat:  knowledge-base-dev
---

## CHANGELOG

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| v1.0 | 2026-02-22 | KB-dev | Initial creation. Extracted from PROMPT_CREATE_RESEARCH_PLAN_v2_1_2 (sections 1.2 and 4.1). Known issues documented in KNOWN_ISSUES section. |
| v1.1 | 2026-02-22 | KB-dev | KI-001 and KI-002 approved by editor. Template G and corrected percentages promoted to STABLE. |

## DEPENDENCIES

```
inputs:  [PROMPT_CREATE_RESEARCH_PLAN_v2_1_2]
outputs: [PROMPT_CREATE_RESEARCH_PLAN (v3.0+)]
calls:   []
```

---

# RESOURCE: RESEARCH FOCUS TYPES

**Purpose:** Canonical definition of the 7 research focus types available in the D-X-OPUS system. For each focus, defines the editorial question it answers, the distribution of job categories, and the body structure template for the resulting RESEARCH_REPORT.

**Consumer:** PROMPT_CREATE_RESEARCH_PLAN — references this resource in Step 1.2 (job categories) and Step 4.1 (body structure template selection).

**Scope:** This resource defines the structural and methodological configuration of each focus type. It does NOT define how to execute research jobs (see PROMPT_CREATE_RESEARCH_PLAN) nor how to validate sources (see RESOURCE_SOURCE_AUTHORITY and RESOURCE_CLAIM_VALIDATION).

---

## KNOWN ISSUES

> These issues were identified during extraction from the source document. Require resolution by editor before v1.1.

| ID | Focus | Issue | Resolution | Status |
|----|-------|-------|------------|--------|
| KI-001 | G — Seminal Concept Analysis | Body structure template (Template G) absent from source document. | Template G proposed and approved by editor on 2026-02-22. | ✅ RESOLVED |
| KI-002 | G — Seminal Concept Analysis | Job category percentages summed to 110% in source. | Critical Perspectives reduced from 25% to 15%. Approved by editor on 2026-02-22. | ✅ RESOLVED |

---

## STRUCTURE OF EACH FOCUS TYPE ENTRY

Each of the 7 focus types is documented with:

1. **Canonical name** — official designation used across all system artifacts
2. **Code** — single letter (A–G) used for quick reference
3. **Editorial question** — the primary question this focus answers for the reader
4. **Job category distribution** — percentage allocation across research job types
5. **Body structure template** — section schema for the resulting RESEARCH_REPORT
6. **Methodological notes** — specific considerations for applying this focus

---

## FOCUS A — HISTORICAL REVIEW

**Canonical name:** Historical Review
**Code:** A
**Status:** STABLE

### Editorial Question

*How did this topic emerge and evolve from its origins to the present?*

Use when the goal is to trace intellectual or empirical lineage: where ideas came from, how they changed, who drove those changes, and what paradigm shifts occurred over time.

### Job Category Distribution

| Category | % | Description |
|----------|---|-------------|
| Foundational Research | 30% | Origins, early developments, seminal texts |
| Historical Milestones | 30% | Paradigm shifts, key publications, turning points |
| Evolution Tracking | 20% | How concepts and methods changed across periods |
| Contemporary Synthesis | 20% | Current state as derived from historical trajectory |
| **Total** | **100%** | |

### Body Structure Template

```
3. ORIGINS AND EARLY DEVELOPMENTS (pre-2000 or relevant cutoff)
   3.1 Foundational Concepts
   3.2 Early Pioneers and Institutions
   3.3 Initial Methodologies

4. PARADIGM FORMATION (2000–2015 or relevant period)
   4.1 Consolidation of Approaches
   4.2 Key Publications and Milestones
   4.3 Paradigm Debates

5. CONTEMPORARY EVOLUTION (2015–present)
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

### Methodological Notes

- Time periods in sections 3–5 are illustrative; adjust cutoffs based on actual topic chronology
- Prioritize primary sources (foundational papers, original institutional documents) over secondary interpretation
- Survivor bias risk: ensure coverage includes failed paradigms, not only winning approaches
- For theoretical topics, foundational texts may be valid without age cutoff; for empirical topics, prioritize recency in section 5+

---

## FOCUS B — STATE OF THE ART

**Canonical name:** State of the Art
**Code:** B
**Status:** STABLE

### Editorial Question

*What is the current comprehensive landscape of this topic — what do we know, how do we know it, and where do the debates stand?*

Use when the goal is a rigorous panoramic snapshot: established frameworks, empirical evidence, methodological diversity, and live controversies.

### Job Category Distribution

| Category | % | Description |
|----------|---|-------------|
| Foundational Research | 25% | Core concepts, frameworks, underlying assumptions |
| Convergent Analysis | 20% | Areas of established consensus and best practices |
| Divergent Analysis | 20% | Active debates, competing schools, unresolved tensions |
| Practical Applications | 20% | Tools, cases, implementation examples |
| Gap Identification | 15% | What is missing, underresearched, or contested |
| **Total** | **100%** | |

### Body Structure Template

```
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

### Methodological Notes

- Requires the broadest source coverage of all 7 focus types — do not limit to a single school or methodology
- Section 6 (Debates) must be balanced: avoid presenting one position as settled if genuine disagreement exists
- Gap Identification jobs (15%) are particularly valuable for surfacing future research directions
- Currency critical: prefer sources <3 years for empirical claims; <5 years for methodological frameworks

---

## FOCUS C — SCHOOL OF THOUGHT ANALYSIS

**Canonical name:** School of Thought Analysis
**Code:** C
**Status:** STABLE

### Editorial Question

*What are the core tenets, methods, evidence base, and intellectual legacy of this specific tradition or school of thought?*

Use when the goal is a deep dive into one particular intellectual tradition, framework, or paradigm within a broader field — understanding it from the inside out.

### Job Category Distribution

| Category | % | Description |
|----------|---|-------------|
| Philosophical Foundations | 25% | Core tenets, epistemological basis, intellectual heritage |
| Key Proponents | 20% | Major figures, founding institutions, academic lineage |
| Methodological Approach | 20% | Research methods, analytical frameworks, distinctive features |
| Evidence Base | 20% | Empirical support, application results, success cases |
| Critiques and Influence | 15% | Opposition, responses, legacy and ongoing impact |
| **Total** | **100%** | |

### Body Structure Template

```
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

### Methodological Notes

- Requires both internal sources (proponents) and external sources (critics) — avoid relying only on the school's own publications
- Section 7 (Critiques) is not optional: a school's influence is partly defined by the opposition it generated
- Risk of hagiography: ensure critical perspectives in section 7 are substantive, not superficial
- If the school has sub-factions, consider whether they warrant separate subsections in section 4

---

## FOCUS D — RECENT DEVELOPMENTS

**Canonical name:** Recent Developments
**Code:** D
**Status:** STABLE

### Editorial Question

*What has changed in this topic in the last 3–5 years, and what does it mean for the field?*

Use when the goal is to capture innovation, disruption, or evolution that postdates established literature — emphasizing novelty, early evidence, and open questions.

### Job Category Distribution

| Category | % | Description |
|----------|---|-------------|
| Baseline Context | 15% | Previous paradigm and its limitations (pre-2020) |
| New Approaches | 30% | Innovations, novel frameworks, emerging methods (2020–2025) |
| Empirical Evidence | 25% | Early results, pilot data, comparative performance |
| Comparative Analysis | 20% | New vs. old: what changed and what remained |
| Future Trajectories | 10% | Open questions, research needs, speculative directions |
| **Total** | **100%** | |

### Body Structure Template

```
3. BASELINE CONTEXT: THE PREVIOUS PARADIGM
   3.1 Established Approaches (pre-2020)
   3.2 Limitations and Challenges
   3.3 Motivations for Change

4. EMERGENCE OF NEW APPROACHES (2020–2025)
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

### Methodological Notes

- Time window (2020–2025) is illustrative; adjust based on when the relevant inflection point occurred in the specific topic
- Evidence will often be at MODERATE or TENTATIVE confidence level — this is expected and must be clearly labeled
- Baseline Context (15%) is necessary for coherence but must not dominate; resist the pull toward historical review
- Speculative content in section 7 is acceptable but must be explicitly flagged as such

---

## FOCUS E — COMPARATIVE ANALYSIS

**Canonical name:** Comparative Analysis
**Code:** E
**Status:** STABLE

### Editorial Question

*How do these 2–3 approaches, methods, or frameworks compare — in theory, evidence, and practical appropriateness?*

Use when the goal is structured contrast between distinct alternatives, enabling the reader to understand trade-offs and make informed choices between them.

### Job Category Distribution

| Category | % | Description |
|----------|---|-------------|
| Approach A Analysis | 25% | Deep analysis of first approach |
| Approach B Analysis | 25% | Deep analysis of second approach |
| Approach C Analysis | 15% | Deep analysis of third approach (if applicable) |
| Evidence Comparison | 20% | Cross-approach empirical performance and data |
| Synthesis and Recommendation | 15% | Trade-offs, complementarities, contextual fit |
| **Total** | **100%** | |

### Body Structure Template

```
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

5. APPROACH C: [NAME] (if applicable; omit if only 2 approaches)
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

### Methodological Notes

- Sections 3–5 must be written with parallel structure: same subsections for each approach enables clean comparison in section 6
- If only 2 approaches are compared, renumber section 6 → 5 and section 7 → 6
- Approach C distribution (15%) reflects optional third approach; redistribute to A and B proportionally if unused: A=30%, B=30%, Evidence=25%, Synthesis=15%
- Section 7 recommendations should be conditional ("in context X, prefer approach A") not absolute

---

## FOCUS F — PRACTICAL IMPLEMENTATION

**Canonical name:** Practical Implementation
**Code:** F
**Status:** STABLE

### Editorial Question

*How is this topic actually applied in practice — what tools exist, how have they been used, and what has been learned?*

Use when the goal is actionable knowledge: practitioners need to understand not just what exists theoretically but how to deploy it, what obstacles arise, and what lessons have been documented.

### Job Category Distribution

| Category | % | Description |
|----------|---|-------------|
| Foundational Concepts | 15% | Minimum theory needed to understand practice |
| Tools and Techniques | 30% | Available tools, methods, frameworks, protocols |
| Case Studies | 25% | Documented real-world implementations |
| Best Practices | 20% | Lessons learned, success factors, common pitfalls |
| Challenges and Limitations | 10% | Known barriers, failure modes, open problems |
| **Total** | **100%** | |

### Body Structure Template

```
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

### Methodological Notes

- Section 3 (Theory) must be calibrated to the minimum needed for a practitioner reader — resist expanding into full theoretical review
- Case studies in section 5 must include both successes and failures; success-only selection introduces survivor bias
- Number of cases is flexible; 3 is a default. If cases are thin, Cross-Case Analysis (5.4) may be replaced by a limitations note
- Best Practices (section 6) should be derived inductively from section 5, not stated as generic principles

---

## FOCUS G — SEMINAL CONCEPT ANALYSIS

**Canonical name:** Seminal Concept Analysis
**Code:** G
**Status:** STABLE

### Editorial Question

*What is this influential concept or work, how has it been interpreted and applied, and what has been its impact on the field?*

Use when the goal is a rigorous deep dive into a single seminal text, article, concept, or framework — understanding it in its original form, its subsequent adoption and adaptation, and the critiques it generated.

### Job Category Distribution

| Category | % | Description |
|----------|---|-------------|
| Paper/Idea Analysis | 30% | Deep reading of the seminal work in its original form |
| Concept Anatomy | 25% | Definition, components, frameworks proposed |
| Adoption Mapping | 20% | Who uses it, how, in which contexts |
| Critical Perspectives | 15% | Debates, critiques, responses from the field |
| Impact Assessment | 10% | Evidence of influence, implications, future directions |
| **Total** | **100%** | |

### Body Structure Template

```
3. THE SEMINAL WORK IN CONTEXT
   3.1 Origin and Intellectual Setting
   3.2 Core Argument and Contribution
   3.3 Author's Framework and Methodology

4. CONCEPT ANATOMY
   4.1 Key Definitions and Components
   4.2 Theoretical Propositions
   4.3 Scope and Boundary Conditions

5. ADOPTION AND APPLICATION
   5.1 How the Concept Spread
   5.2 Key Adopters and Adaptations
   5.3 Domain Applications

6. CRITICAL PERSPECTIVES
   6.1 Major Critiques
   6.2 Responses and Refinements
   6.3 Alternative Framings

7. IMPACT AND LEGACY
   7.1 Measurable Influence on the Field
   7.2 Derivative Works and Extensions
   7.3 Open Questions and Future Relevance
```

### Methodological Notes

- Section 3 must engage directly with the primary source — do not rely solely on secondary descriptions
- Adoption mapping (section 5) requires tracking citations and derivative works; Google Scholar cited-by is a key tool
- Risk of hagiography: critical perspectives (section 6) must be substantive and represent genuine scholarly debate
- If the concept has been substantially revised by its original author, note this explicitly in sections 4 and 7

---

## QUICK REFERENCE TABLE

| Code | Focus Name | Editorial Question (short) | # Job Categories | Template |
|------|------------|---------------------------|-----------------|---------|
| A | Historical Review | How did this evolve? | 4 | Template A |
| B | State of the Art | What do we know now? | 5 | Template B |
| C | School of Thought Analysis | What is this tradition? | 5 | Template C |
| D | Recent Developments | What changed in 3–5 years? | 5 | Template D |
| E | Comparative Analysis | How do these approaches compare? | 4–5 | Template E |
| F | Practical Implementation | How is this actually applied? | 5 | Template F |
| G | Seminal Concept Analysis | What is this concept and its impact? | 5 | Template G |

---

## SELECTION GUIDANCE

The following heuristics help select the appropriate focus:

- **Topic is new to the project:** Start with B (State of the Art) to establish a full baseline
- **Editor wants to write historically:** Use A (Historical Review)
- **Editor wants to understand a specific intellectual tradition:** Use C (School of Thought Analysis)
- **Topic is fast-moving (AI, regulation, markets):** Use D (Recent Developments)
- **Editor is choosing between approaches:** Use E (Comparative Analysis)
- **Audience is practitioners:** Use F (Practical Implementation)
- **A specific paper or concept is the anchor:** Use G (Seminal Concept Analysis)
- **Multiple angles needed:** Run multiple focus cycles and accumulate RESEARCH_REPORTs for book synthesis

---

**END OF DOCUMENT**
