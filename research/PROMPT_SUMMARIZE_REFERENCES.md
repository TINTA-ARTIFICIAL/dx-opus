---
id:          PROMPT_SUMMARIZE_REFERENCES
type:        PROMPT
subsystem:   RESEARCH
version:     4.1
status:      ACTIVE
created:     2025-09-01
updated:     2026-04-16
owner_chat:  research-dev
---

## CHANGELOG

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| v1.0–v1.5 | 2025-09-01 | JM | Initial versions |
| v2.0 | 2025-11-01 | JM | Optimized structure, clarified instructions |
| v3.0 | 2026-01-01 | JM | Separated outputs, improved specifications |
| v3.1 | 2026-01-01 | JM | Pragmatic formatting policy; recalibrated effort distribution; added NARRATIVE_BRIDGE output |
| v4.0 | 2026-01-01 | JM | Complete restructure: modular architecture, workflow clarity, working document emphasis, detailed output specifications, enhanced gap analysis framework |
| v4.1 | 2026-02-22 | JM | Added SOURCE_AUTHORITY_HIERARCHY and CLAIM_VALIDATION_CRITERIA as explicit inputs; integrated SAH consultation into Phase 1; integrated CVC consultation into Phase 3; added SAH/CVC checks to pre-delivery checklist — resolves GAP-R04 |
| v4.1+header | 2026-04-16 | JM | Add YAML header. Content unchanged. |

# **PROMPT FOR INITIAL REFERENCE ANALYSIS**

**Title:** SBSTK\_PROMPT\_SUMMARIZE\_REFERENCES  
**Version:** 4.1  
**Date:** February 22, 2026

**Optimized for:** Claude Sonnet 4.5 and similar LLMs  
**Context:** Non-fiction writing assisted by LLM ("Tinta Artificial" methodology)

---

## **PART I: SYSTEM ARCHITECTURE**

### **1.1 Mission Statement**

This prompt drives the **first phase of a multi-stage research process** for non-fiction writing. It produces working documents that enable the editor to manually identify research priorities before conducting deep investigation.

**Process Flow:**
```
[Initial References] 
    ↓
[REFERENCE_SUMMARY] → [Editor annotates areas for deep dive]
    ↓
[RESEARCH_PLAN v1] → [Editor refines with annotations]
    ↓
[RESEARCH_PLAN v2] → [Deep comprehensive research phase]
    ↓
[Writing Phase]
```

**Critical Understanding:**
* These are **internal research artifacts**, not publishable outputs  
* The editor will annotate REFERENCE_SUMMARY to guide refinement  
* Deep research happens AFTER the plan is refined, not during this phase  
* All outputs must be in **Spanish**

### **1.2 Three Outputs**

| Output | Length | Purpose | Priority |
|--------|--------|---------|----------|
| **REFERENCE_SUMMARY** | 5,000-7,000 words | Comprehensive map of existing references for annotation | CRITICAL |
| **RESEARCH_PLAN** | 3,000-4,000 words | Orientative roadmap for future deep research | HIGH |
| **NARRATIVE_BRIDGE** | 1,500-2,000 words | Connection between research and writing approaches | MEDIUM |

### **1.3 Core Principles**

1. **Synthesis over Summary:** Integrate across sources, don't just describe each one  
2. **Annotability First:** Structure for easy marking and note-taking  
3. **Historical Consciousness:** Always include temporal perspective  
4. **Gap Awareness:** Explicitly identify what's missing  
5. **Pragmatic Formatting:** Use the format that serves understanding best  
6. **Orientative Research:** Suggest directions, don't conduct exhaustive investigation yet

### **1.4 Inputs Required**

| Input | Type | Use in this prompt |
|-------|------|--------------------|
| **Initial References** | PDFs, URLs, documents | Primary material for analysis |
| **[Optional] Editor notes / BOOK_BRIEF** | Text | Orients scope and editorial angle |
| **SOURCE_AUTHORITY_HIERARCHY (SAH)** | Global resource | Evaluate and classify source authority (Tier 1-3) during Phase 1 analysis |
| **CLAIM_VALIDATION_CRITERIA (CVC)** | Global resource | Identify methodological red flags and quality gaps during Phase 3 gap mapping |

**Note on SAH and CVC:** These are global resources maintained by the Knowledge Base subsystem. They are consulted (read-only) during this phase — not updated. Updates to SAH and CVC happen in the subsequent phase via `UPDATE_VALIDATION_CHECKLIST`.

---

## **PART II: EXECUTION METHODOLOGY**

### **2.1 Effort Distribution**

| Phase | Effort % | Focus |
|-------|----------|-------|
| **Phase 1: Deep Analysis** | 35% | Extract maximum value from provided references |
| **Phase 2: Cross-Synthesis** | 25% | Find patterns, debates, and hierarchies |
| **Phase 3: Gap Mapping** | 30% | Identify what's missing and suggest directions |
| **Phase 4: Structuring** | 10% | Organize and present findings clearly |

### **2.2 Phase 1: Deep Analysis of Provided References**

**For each source, extract:**

**Layer 1: Fundamentals**
* Bibliographic data (author, title, year, publication, URL)  
* Source type (academic paper, book, blog post, report, etc.)  
* Methodology employed (empirical study, theoretical essay, case analysis, etc.)  
* Target audience and context

**Layer 2: Content Core**
* **Core Thesis:** What is the central argument?  
* **Ontology:** Key terms and how they're defined  
* **Mental Models:** What frameworks does it use to explain reality?  
* **Hard Data:** Specific statistics, dates, experiments, case studies  
* **Hidden Gems:** Counterintuitive facts, memorable quotes, unexpected insights

**Layer 3: Context & Relations**
* **Tensions:** What does it argue AGAINST? What schools of thought does it challenge?  
* **Alliances:** What other work does it build upon or align with?  
* **Historical Position:** When was this written? How does it fit in the field's evolution?  
* **Author Profile:** Background, affiliation, credibility, potential biases
* **Authority Assessment:** Cross-reference against SOURCE_AUTHORITY_HIERARCHY — is this source already classified (Tier 1-3)? If not, apply tier criteria to assign a preliminary classification. Note any sources not yet in SAH for later update via UPDATE_VALIDATION_CHECKLIST.

**Layer 4: Critical Assessment**
* **Strengths:** What does this source do well?  
* **Limitations:** Methodological weaknesses, scope constraints, blind spots  
* **Practical Value:** Applications, tools, actionable insights  
* **Unanswered Questions:** What does this source raise but not resolve?

**Output Format:** Internal analysis notes (not directly in final document, but informs synthesis)

### **2.3 Phase 2: Cross-Reference Synthesis**

**Thematic Architecture:**

1. **Identify Major Themes:** What 3-7 big topics emerge across all references?  
2. **Build Hierarchy:** How do themes relate? (Which are foundational? Which are derivative?)  
3. **Map Subtopics:** Break each major theme into 2-4 subtopics

**Convergence/Divergence Mapping:**

For each major theme:
* **Consensus Points:** Where do all or most sources agree?  
* **Contested Terrain:** Where do sources disagree? Map the debate  
* **Complementary Views:** Where do sources add different pieces to the same puzzle?  
* **Isolated Voices:** What unique perspectives appear in only one source?

**Debate Structure:**

For major controversies identified:
* **The Question:** What's being debated?  
* **Position A:** Who argues this? What's their evidence?  
* **Position B (and C, D...):** Alternative views and their support  
* **Status:** Is this resolved? Ongoing? Stagnant?  
* **Stakes:** Why does this matter?

**Historical Evolution:**

* **Timeline Construction:** Major discoveries, publications, paradigm shifts  
* **Conceptual Evolution:** How have key terms/ideas changed over time?  
* **Open Mysteries:** Long-standing questions without empirical resolution

### **2.4 Phase 3: Gap Mapping and Orientative Research**

**CRITICAL:** This is NOT the deep research phase. You are IDENTIFYING gaps and SUGGESTING directions, not filling them comprehensively.

**A) Structural Gap Analysis**

| Gap Type | Guiding Questions |
|----------|-------------------|
| **Disciplinary** | What fields/perspectives are absent? (Economic? Historical? Sociological?) |
| **Methodological** | What types of evidence are missing? (Quantitative data? Ethnography? Experiments?) |
| **Geographic/Cultural** | What regions/contexts aren't represented? |
| **Temporal** | What time periods lack coverage? Recent developments missed? |
| **Practical** | Are there implementation examples or case studies missing? |

**B) Quality & Credibility Assessment**

* Methodological weaknesses detected  
* Potential biases (funding, ideological, disciplinary)  
* Contradictory evidence that needs reconciliation  
* Claims lacking sufficient support
* **Apply CLAIM_VALIDATION_CRITERIA:** Use the active CVC to identify field-specific red flags and methodological must-haves. Flag any claims in the references that fail these checks — these become priority items in the Gap Analysis of the RESEARCH_PLAN.

**C) Research Direction Proposals**

**Format:** 3-4 "Lines of Investigation"

For each line:

```
LINE N: [Descriptive Name]

OBJECTIVE: What would this investigation achieve?

CORE QUESTIONS (3-5):
- Question 1
- Question 2
- Question 3

SEARCH STRATEGY:
- Keywords: [specific terms]
- Source types: [journals, databases, institutions]
- Time frame: [e.g., "2020-2024 peer-reviewed papers"]
- Key authors/institutions to check: [if known]

EXPECTED VALUE: What understanding would this unlock?

PRIORITY: HIGH / MEDIUM / LOW
```

**D) Suggested Sources (5-10 recommendations)**

For each:
* **What:** Type of source (paper, book, report, etc.) or specific title if known  
* **Why:** Which gap it addresses  
* **Where:** How to find it (database, author name, institution)  
* **Priority:** Essential / Recommended / Optional

**E) Field Landscape**

* Current state of research (mature field? emerging area?)  
* Major institutions and research centers  
* Key conferences or publication venues  
* Adjacent fields with relevant insights

### **2.5 Phase 4: Structuring and Quality Control**

**Before finalizing each output:**

1. **Coherence Check:** Does it flow logically?  
2. **Citation Audit:** All claims attributed correctly?  
3. **Completeness Scan:** All required sections present?  
4. **Formatting Review:** Follows pragmatic policy?  
5. **Annotability Test:** Can the editor easily mark this up?

---

## **PART III: FORMATTING & STYLE GUIDE**

### **3.1 Language Requirements**

* **Output Language:** Spanish (all outputs)  
* **Tone:** Analytical, academic, precise  
* **Voice:** Objective, not advocacy-driven  
* **Complexity:** Use technical language when accurate, but maintain clarity  
* **Avoid:** Marketing language, hype, unnecessary jargon

### **3.2 Pragmatic Formatting Policy**

**Principle:** Use the format that best serves understanding and annotability.

| Situation | Format to Use | Rationale |
|-----------|---------------|-----------|
| **2-4 discrete items** | Bullet list | Quick to scan, easy to annotate |
| **5-8 related ideas** | Narrative prose | Maintains flow, shows relationships |
| **9+ items needing comparison** | Table or dedicated subsection | Enables comparison, stays organized |
| **Chronological events** | Timeline format or table | Shows temporal relationships |
| **Complex multi-dimensional data** | Table with clear headers | Facilitates comparison |

**Golden Rules:**
* Always introduce lists/tables with context paragraph  
* Never start a section with a list  
* Break long paragraphs (>200 words) for readability  
* Use descriptive section headers  
* Number sections and subsections consistently

### **3.3 Citation System**

* **Format:** \[1\], \[2\], \[3\] corresponding to numbered reference list  
* **Density:** Cite each distinct claim once; avoid redundant citations  
* **Completeness:** Every factual claim from sources must be attributed  
* **Reference List Format:** Author(s), "Title," Publication, Year, \[URL if applicable\]

### **3.4 Section Numbering**

Use hierarchical numbering for clarity:
```
1. Major Section
   1.1 Subsection
   1.2 Subsection
       1.2.1 Sub-subsection
2. Next Major Section
```

---

## **PART IV: QUALITY STANDARDS**

### **4.1 Fidelity to Sources (Non-Negotiable)**

* ✓ Accurate representation of each source's arguments  
* ✓ No distortion or cherry-picking  
* ✓ Balanced treatment based on source quality  
* ✓ All provided references meaningfully incorporated

### **4.2 Analytical Depth (Non-Negotiable)**

* ✓ Synthesis evident (not just summarization)  
* ✓ Pattern recognition across sources  
* ✓ Critical evaluation of claims and methods  
* ✓ Debate mapping with multiple perspectives  
* ✓ Historical perspective included  
* ✓ Insight generation beyond source material

### **4.3 Utility for Next Phase (Critical)**

* ✓ Clear gap identification enabling targeted research  
* ✓ Annotability: easy for editor to mark areas for deep dive  
* ✓ Actionable research directions proposed  
* ✓ Sufficient context to understand field landscape  
* ✓ Connection to writing phase (via NARRATIVE_BRIDGE)

### **4.4 Scholarly Rigor (Essential)**

* ✓ Proper attribution throughout  
* ✓ Transparent about limitations  
* ✓ Evidence-based conclusions  
* ✓ Minimal bias in presentation

---

## **PART V: OUTPUT SPECIFICATIONS**

### **5.1 REFERENCE_SUMMARY Structure**

**0. Metadata**
```
Document Title: [PROJECT_NAME]_REFERENCE_SUMMARY
Production Date: [Date]
AI System: Claude Sonnet 4.5
Prompt Version: SBSTK_PROMPT_SUMMARIZE_REFERENCES v4.0
Scope: Analysis of [X] references on [topic]
```

**Reference Table:**

| # | Title | Author(s) | Type | Year | URL |
|---|-------|-----------|------|------|-----|
| 1 | ... | ... | ... | ... | ... |

---

**1. Executive Synthesis (400-600 words)**

**1.1 Topic Definition**  
Clear statement of what the references are about, synthesized across sources.

**1.2 Main Arguments**  
High-level overview of the combined knowledge base.

**1.3 Key Themes**  
The 3-7 major themes to be explored in detail.

**1.4 Critical Findings**  
Most important insights from the analysis.

**1.5 Research Implications**  
What this means for the research plan.

**1.6 Tags**  
5-10 descriptive keywords

---

**2. Thematic Architecture (1,200-1,800 words)**

**Purpose:** Show how the references organize conceptually.

**2.1 Major Themes Identified**

For each major theme:
* **Theme name and scope**  
* **Subtopics** (2-4 per theme)  
* **Hierarchical relationships:** How themes depend on or build upon each other  
* **Coverage across references:** Which sources address this theme?

**2.2 Conceptual Framework**

* **Definitions and Terminology:** How key terms are used  
* **Theoretical Foundations:** Underlying assumptions and mental models  
* **Methodological Approaches:** How different sources study the topic  
* **Schools of Thought:** Distinct theoretical traditions or perspectives

**Formatting:** Use narrative prose with embedded short lists (2-4 items) where helpful.

---

**3. Convergence and Divergence Analysis (1,200-1,500 words)**

**Purpose:** Map agreements, debates, and complementarity.

**3.1 Points of Consensus**

For each major theme, what do most/all sources agree on? Present as narrative synthesis.

**3.2 Contested Terrain**

For each significant debate:
* **The Question:** What's being debated?  
* **Position A:** [Name/cite sources] argues [summary] based on [evidence type]  
* **Position B:** [Name/cite sources] counters with [summary] based on [evidence type]  
* *[Position C, if applicable]*  
* **Status:** Resolved? Ongoing? Stagnant?  
* **Implications:** Why does this debate matter?

**3.3 Complementary Contributions**

Where do sources add different pieces to the same puzzle without contradicting each other?

**3.4 Isolated Perspectives**

Unique viewpoints that appear in only one or two sources—are they outliers or overlooked insights?

---

**4. Historical Perspective (800-1,000 words)**

**Purpose:** Show how understanding has evolved and identify key moments.

**4.1 Timeline of Developments**

Create a narrative timeline or table covering:
* Key discoveries and breakthroughs  
* Influential publications  
* Paradigm shifts  
* Methodological innovations  
* Major controversies and their resolution (or lack thereof)

**Format:** If 9+ events, use table. If fewer, use narrative chronology.

**4.2 Conceptual Evolution**

How have key terms, ideas, or frameworks changed over time?

**4.3 Open Mysteries**

Long-standing questions that remain without empirical resolution or consensus.

---

**5. Practical Applications (800-1,200 words)**

**Purpose:** Connect theory to real-world implementation.

**5.1 Use Cases and Implementations**

For each documented application:
* **Context:** Sector, organization, timeframe  
* **Objective:** What was attempted?  
* **Approach:** How was it implemented?  
* **Results:** What was achieved?  
* **Lessons:** Key takeaways

**Format:** If 9+ cases, create comparison table. If fewer, use narrative with short lists.

**5.2 Methodological Tools**

Frameworks, assessment tools, or practical approaches mentioned in references.

**5.3 Mechanisms**

How does the phenomenon work in practice? What are the causal pathways?

---

**6. Critical Assessment (600-800 words)**

**6.1 Strengths of the Reference Set**

* What does this collection do well?  
* What perspectives are well-represented?  
* What types of evidence are strong?

**6.2 Limitations and Biases**

* Methodological weaknesses detected  
* Potential biases (disciplinary, funding, ideological)  
* Scope constraints  
* Quality concerns

**6.3 Internal Contradictions**

Evidence or claims that conflict across sources—what needs reconciliation?

---

**7. Key Actors (400-600 words)**

**7.1 Authors**

Profile the main authors from provided references:
* Background and affiliation  
* Key contributions to the field  
* Theoretical orientation  
* Other relevant work

**Format:** Dedicated subsection with organized presentation (not bullet list of 10+ names).

**7.2 Institutions**

Major research centers, universities, think tanks involved.

**7.3 Other Influential Figures**

Key people mentioned frequently across references but not primary authors.

---

**8. Synthesis and Implications (400-600 words)**

**8.1 Integrated Understanding**

What coherent picture emerges from all sources together?

**8.2 Key Takeaways**

For researchers: What are the most important insights?  
For practitioners: What are the actionable implications?

**8.3 Immediate Questions for Annotation**

Specific areas where the editor should consider marking for deep research. Frame as questions:
* "Should we investigate [X] more deeply?"  
* "Is [Y debate] central to our argument?"  
* "Do we need more recent data on [Z]?"

---

**9. Complete Reference List**

Numbered sequentially \[1\], \[2\], \[3\]...

**Provided References**  
\[1\] Author, "Title," Publication, Year, URL  
\[2\] ...

**Suggested Supplementary Sources**  
\[15\] ...  
\[16\] ...

---

### **5.2 RESEARCH_PLAN Structure**

**Length:** 3,000-4,000 words

**0. Metadata**
```
Document Title: [PROJECT_NAME]_RESEARCH_PLAN
Production Date: [Date]
AI System: Claude Sonnet 4.5
Prompt Version: v4.0
```

---

**1. Foundation Assessment (600-800 words)**

**1.1 Quality of Provided References**

* Overall credibility and authority  
* Methodological robustness  
* Balance and diversity  
* Currency (how recent?)

**1.2 Coverage Analysis**

* **Breadth:** How many aspects of the topic are covered?  
* **Depth:** How thoroughly are they explored?  
* **Balance:** Theory vs. practice, historical vs. contemporary, etc.

**1.3 Key Strengths**

What does the current reference set do exceptionally well?

---

**2. Gap Analysis (1,200-1,500 words)**

**Purpose:** Identify what's missing to guide future research.

**2.1 Structural Absences**

| Gap Type | Specific Absences | Impact on Understanding |
|----------|-------------------|-------------------------|
| Disciplinary | Missing perspectives (economic, historical, etc.) | How this limits comprehension |
| Methodological | Missing evidence types | What can't be claimed without this |
| Geographic/Cultural | Regions not covered | Generalizability concerns |
| Temporal | Missing time periods or recent developments | Currency and context issues |
| Practical | Implementation examples missing | Difficulty assessing real-world viability |

**2.2 Methodological Limitations**

* Biases detected (and their sources)  
* Weaknesses in research designs  
* Generalization problems  
* Measurement or conceptual issues

**2.3 Unanswered Questions**

Three categories:
* **Questions the references attempt but fail to answer**  
* **New questions emerging from synthesis**  
* **Contradictions requiring investigation**

**Format:** Group by category, present as narrative with embedded lists of questions.

---

**3. Field Context (400-600 words)**

**3.1 State of the Field**

* Maturity: Established field? Emerging area? Controversial topic?  
* Main debates: What are researchers/practitioners arguing about?  
* Trends: Where is investigation heading?

**3.2 Key Institutions and Actors**

* Leading research centers  
* Important journals or publication venues  
* Key conferences  
* Influential practitioners or organizations

**3.3 Adjacent Fields**

* Related disciplines with relevant insights  
* Interdisciplinary connections  
* Potential for cross-pollination

---

**4. Proposed Research Directions (1,200-1,600 words)**

**Purpose:** Provide 3-4 concrete "Lines of Investigation" for the next research phase.

**LINE 1: [Descriptive Name]**

**Objective:** What would this line of investigation achieve?

**Core Questions (3-5):**
1. Question 1  
2. Question 2  
3. Question 3  
4. Question 4  
5. Question 5

**Search Strategy:**
* **Keywords:** [Specific search terms]  
* **Source Types:** [Peer-reviewed journals, reports, books, etc.]  
* **Databases/Venues:** [Google Scholar, JSTOR, specific journals, conferences]  
* **Time Frame:** [e.g., "Focus on 2020-2024"]  
* **Key Authors/Institutions:** [If known from gap analysis]

**Expected Insights:**  
What understanding would this unlock? How does it address gaps?

**Priority:** HIGH / MEDIUM / LOW  
**Justification:** Why this priority level?

---

**LINE 2: [Next Investigation Line]**

[Same structure as Line 1]

---

**LINE 3: [Third Investigation Line]**

[Same structure]

---

**LINE 4: [Optional Fourth Line]**

[Same structure if needed]

---

**5. Supplementary Source Recommendations (400-600 words)**

**Purpose:** Specific suggestions to execute the research plan.

**Format:** 5-10 recommendations

For each:

**[N]. [Type or Specific Source]**

* **What:** [Book/Paper/Report title if specific, or description if general]  
* **Author/Institution:** [If known]  
* **Addresses:** [Which gap or research line]  
* **Priority:** Essential / Highly Recommended / Optional  
* **How to Find:** [Search strategy or direct link]  
* **Expected Value:** [What it should contribute]

**Example:**

**1. Recent Meta-Analysis on Smart Building ROI**

* **What:** Quantitative synthesis of smart building implementation costs and benefits  
* **Author/Institution:** Unknown—search needed  
* **Addresses:** Gap in quantitative evidence; Research Line 2  
* **Priority:** Essential  
* **How to Find:** Google Scholar, keywords "smart building" + "meta-analysis" OR "systematic review" + "2020-2024"  
* **Expected Value:** Empirical grounding for economic arguments

---

**6. Strategic Recommendations (200-400 words)**

**6.1 Research Sequence**

What order should these lines be pursued? Why?

**6.2 Resource Allocation**

If effort/time is limited, where to focus?

**6.3 Potential Challenges**

* Access issues (paywalls, proprietary data)  
* Language barriers  
* Scarcity of certain types of sources

**6.4 Success Criteria**

How will we know the research plan has been executed successfully?

---

### **5.3 NARRATIVE_BRIDGE Structure**

**Length:** 1,500-2,000 words

**0. Metadata**
```
Document Title: [PROJECT_NAME]_NARRATIVE_BRIDGE
Production Date: [Date]
AI System: Claude Sonnet 4.5
Prompt Version: v4.0
```

---

**1. Story Arcs Identified (500-700 words)**

**Purpose:** Find narrative threads in the research that could structure writing.

For each arc (3-5 total):

**ARC [N]: [Evocative Name]**

* **Core Narrative:** What story does this tell?  
  Example: "The evolution from analog to intelligent buildings"  
  Example: "The clash between techno-optimism and human-centered design"

* **Key Moments:** 3-4 turning points or milestones in this narrative  

* **Central Tension:** What conflict or question drives this story?  

* **Current Status:** Is this story complete? Ongoing? Unresolved?  

* **Emotional Resonance:** Why would readers care about this arc?  

* **Supporting References:** Which sources develop this narrative best?

---

**2. Editorial Angles (400-600 words)**

**Purpose:** Propose distinct lenses through which to approach the topic.

For each angle (3-4 total):

**ANGLE [N]: [Clear Descriptor]**

* **Central Question:** What question does this angle explore?  

* **Unique Value:** What does this perspective reveal that others don't?  

* **Target Audience:** Who would find this angle most compelling?  
  Example: "Technical managers seeking ROI justification"  
  Example: "Designers interested in human experience"

* **Challenges:** What makes this angle difficult or controversial?  

* **Strength of Evidence:** Do the references support this angle well?  

* **Differentiation:** How does this differ from existing coverage of the topic?

---

**3. Unexpected Connections (300-400 words)**

**Purpose:** Identify surprising links that could enrich the writing.

For each connection (3-5 total):

**CONNECTION [N]:**

* **Link:** "This topic relates to [other area] through [specific mechanism]"  

* **Why Unexpected:** Why isn't this connection obvious or commonly made?  

* **Implications:** What new understanding does this connection reveal?  

* **Potential Development:** How could this be explored in writing?  

**Special Emphasis:** Connections to the editor's thematic universe:
- Systems thinking and complexity  
- Digital humanism  
- Attention economy  
- Entrepreneurship and investment  
- Building and infrastructure

---

**4. Audience Engagement Hooks (300-400 words)**

**4.1 Why This Matters Now**

* **Timeliness:** What makes this relevant to the current moment?  
* **Personal Impact:** How does this affect readers' lives or work?  
* **Broader Implications:** What larger issues does this connect to?

**4.2 Counterintuitive Insights**

What would surprise the target audience? (3-5 specific insights)

**4.3 Practical Value Proposition**

What can readers DO with this knowledge?

**4.4 Opening Possibilities**

* 2-3 potential opening angles or first paragraphs  
* Provocative questions to pose  
* Surprising statistics or anecdotes to lead with

---

**5. Structural Considerations (200-300 words)**

**5.1 Optimal Format**

* **Suggested Length:** [Word count] based on topic complexity  
* **Structure:** [Essay? Multi-part series? FAQ? Case study-driven?]  
* **Pacing:** Where to go deep vs. where to summarize

**5.2 Balance Points**

* Theory vs. Practice  
* Historical vs. Contemporary  
* Technical vs. Accessible  
* Critical vs. Explanatory

**5.3 Voice and Tone**

Suggested tone: Exploratory / Argumentative / Explanatory / Critical / Provocative / Balanced

Justification for recommendation.

---

**6. Risks and Opportunities (200-300 words)**

**6.1 Potential Pitfalls**

* Topics that could be misunderstood  
* Necessary nuances to maintain  
* Controversies requiring careful handling  
* Jargon needing translation

**6.2 Creative Opportunities**

* Unconventional formats that could work  
* Visual or interactive elements to consider  
* Effective metaphors or frameworks  
* Case studies worth developing in depth

**6.3 Differentiation Strategy**

How to make this stand out from existing content on the topic?

---

## **PART VI: WORKFLOW & QUALITY CONTROL**

### **6.1 Execution Sequence**

1. **Analyze all provided references** (Phase 1)  
2. **Synthesize across sources** (Phase 2)  
3. **Identify gaps and suggest directions** (Phase 3)  
4. **Produce REFERENCE_SUMMARY** (Phase 4)  
5. **Produce RESEARCH_PLAN** (Phase 4)  
6. **Produce NARRATIVE_BRIDGE** (Phase 4)

Request permission to continue after each major output.

### **6.2 Pre-Delivery Checklist**

**For REFERENCE_SUMMARY:**

- [ ] All provided references incorporated  
- [ ] Synthesis evident (not just summaries)  
- [ ] Historical perspective included  
- [ ] Debates and tensions mapped  
- [ ] Proper citations throughout  
- [ ] Annotability: clear sections for marking  
- [ ] All required sections present  
- [ ] Formatting follows pragmatic policy  
- [ ] SOURCE_AUTHORITY_HIERARCHY consulted: sources cross-referenced and preliminary tier noted
- [ ] Entirely in Spanish

**For RESEARCH_PLAN:**

- [ ] Gap analysis is comprehensive  
- [ ] 3-4 research lines proposed  
- [ ] Each line has clear questions and strategy  
- [ ] 5-10 source recommendations included  
- [ ] Priorities justified  
- [ ] Actionable and specific  
- [ ] Field context provided  
- [ ] CLAIM_VALIDATION_CRITERIA consulted: red flags from CVC reflected in Gap Analysis
- [ ] Entirely in Spanish

**For NARRATIVE_BRIDGE:**

- [ ] 3-5 story arcs identified  
- [ ] 3-4 editorial angles proposed  
- [ ] Unexpected connections noted  
- [ ] Audience hooks developed  
- [ ] Structural guidance provided  
- [ ] Risks and opportunities flagged  
- [ ] Entirely in Spanish

### **6.3 Quality Assurance Questions**

Before finalizing, ask yourself:

1. **Fidelity:** Have I accurately represented every source?  
2. **Synthesis:** Have I integrated insights rather than just listing them?  
3. **Utility:** Can the editor easily annotate and refine these documents?  
4. **Completeness:** Are all required elements present?  
5. **Clarity:** Is the analysis clear and well-organized?  
6. **Actionability:** Does the research plan provide concrete next steps?  
7. **Creativity:** Does the narrative bridge offer genuinely useful perspectives?

---

## **VERSION LOG**

| Version | Date | Changes |
|---------|------|---------|
| 1.0-1.5 | Sept 2025 | Initial versions |
| 2.0 | Nov 2025 | Optimized structure, clarified instructions |
| 3.0 | Jan 2026 | Separated outputs, improved specifications |
| 3.1 | Jan 2026 | Pragmatic formatting, recalibrated effort, added NARRATIVE_BRIDGE |
| 4.0 | Jan 2026 | Complete restructure: modular architecture, workflow clarity, working document emphasis, detailed output specifications, enhanced gap analysis framework |
| 4.1 | Feb 22, 2026 | Added SOURCE_AUTHORITY_HIERARCHY and CLAIM_VALIDATION_CRITERIA as explicit inputs (section 1.4); integrated SAH consultation into Phase 1 source authority assessment; integrated CVC consultation into Phase 3 quality assessment; added SAH/CVC checks to pre-delivery checklist (resolves GAP-R04) |

---

**END OF PROMPT v4.1**
