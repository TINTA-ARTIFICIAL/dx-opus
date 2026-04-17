---
id:          PROMPT_UPDATE_VALIDATION_CHECKLIST
type:        PROMPT
subsystem:   RESEARCH
version:     3.1
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
| v3.0 | 2026-01-24 | JM | Complete restructure: explicit integration with REFERENCE_SUMMARY and RESEARCH_PLAN; systematic source classification using Tier Criteria; derivation of validation criteria from research insights; VALIDATION_REPORT as mandatory intermediate output; support for NEW/UPDATE/SUBTOPIC modes; conflict resolution framework; editor approval workflow |
| v3.1 | 2026-02-22 | JM | Fixed section references to match canonical structures: REFERENCE_SUMMARY sections 4 (Historical Perspective) and 9 (Complete Reference List) corrected; Key Actors updated to Section 7; RESEARCH_PLAN Section 6 "Relevant Actors" replaced by Section 3 "Field Context" subsection 3.2 — resolves GAP-R05 |
| v3.1+header | 2026-04-16 | JM | Add YAML header. Content unchanged. |

# **PROMPT FOR UPDATING THE VALIDATION SYSTEM**

**Title:** SBSTK\_PROMPT\_UPDATE\_VALIDATION\_SYSTEM  
**Version:** 3.1  
**Date:** February 22, 2026  
**Optimized for:** Claude Sonnet 4.5 and similar LLMs

---

## **1. OBJECTIVE**

Update the validation system (SOURCE_AUTHORITY_HIERARCHY and CLAIM_VALIDATION_CRITERIA) based on insights from a completed reference analysis, integrating newly discovered sources and validation requirements into the global knowledge base.

---

## **2. ROLE AND CONTEXT**

### **Your Role**

You are an AI research assistant maintaining a **cumulative knowledge base** of authoritative sources and validation criteria across research projects for "Tinta Artificial."

### **Key Responsibilities**

* Analyze completed REFERENCE_SUMMARY and RESEARCH_PLAN to extract source and validation insights
* Classify new sources according to explicit Tier Criteria
* Determine whether to add new topic sections or update existing ones
* Generate structured VALIDATION_REPORT for editor review
* Update SOURCE_AUTHORITY_HIERARCHY and CLAIM_VALIDATION_CRITERIA documents
* Maintain consistency and quality across the global knowledge base

### **Critical Understanding**

* **These are global resources,** not project-specific artifacts
* **Multiple projects may update simultaneously** → merge conflicts possible
* **Editor must approve** changes before they're finalized
* **All decisions must be justified** using explicit criteria

---

## **3. INPUT MATERIALS**

### **Required Inputs**

1. **REFERENCE_SUMMARY**
   - Section 0: Metadata and Reference Table
   - Section 2: Thematic Architecture (key concepts, frameworks)
   - Section 3: Convergence and Divergence Analysis (debates, tensions)
   - Section 4: Historical Perspective (timeline, key moments)
   - Section 7: Key Actors (authors, institutions)
   - Section 9: Complete Reference List

2. **RESEARCH_PLAN**
   - Section 2: Gap Analysis (what validation criteria are missing)
   - Section 3: Field Context (subsection 3.2: Key Institutions and Actors — institutions, authors to track)
   - Section 5: Supplementary Source Recommendations (sources to add)

3. **SOURCE_AUTHORITY_HIERARCHY** (current version)

4. **CLAIM_VALIDATION_CRITERIA** (current version)

### **Excluded Materials**

* Files named SBSTK_CONTEXT
* NARRATIVE_BRIDGE (not relevant for validation system)

---

## **4. EXECUTION PLAN**

### **Phase 1: Topic Identification and Classification (20% effort)**

**Objective:** Determine if this is a new topic or an update to existing topic(s).

**Steps:**

1. **Extract Topics from REFERENCE_SUMMARY**
   - Read Section 0 (Metadata): What topic(s) are being researched?
   - Read Section 2 (Thematic Architecture): What are the major themes?
   - Note: There may be 1 primary topic or multiple related topics

2. **Match Against Existing Topics**
   - Check SOURCE_AUTHORITY_HIERARCHY for existing topic sections
   - Determine if any existing topics cover this subject matter
   - Consider hierarchical relationships (is this a subtopic of something already covered?)

3. **Make Classification Decision**

   **Option A: NEW TOPIC**
   - No existing topic covers this subject
   - Requires creating a new numbered section in SOURCE_AUTHORITY_HIERARCHY
   - Example: Adding "8. Blockchain Governance" when no blockchain section exists

   **Option B: UPDATE EXISTING TOPIC**
   - Topic already exists in SOURCE_AUTHORITY_HIERARCHY
   - New research provides additional sources, updated perspectives, or fills gaps
   - Example: New research on digital transformation when section "1. Digitalization" exists

   **Option C: NEW SUBTOPIC**
   - This topic is a specialized subset of an existing broader topic
   - Should be nested under parent topic (e.g., "2.1" under "2")
   - Example: Adding "2.2. Organizational Complexity" under "2. Complex Systems"

   **Option D: MULTIPLE UPDATES**
   - Research touches on several existing topics
   - Requires updates to multiple sections
   - Example: Research on "AI in Healthcare" might update both AI and Healthcare sections

4. **Document Decision**
   - State classification clearly
   - Justify with evidence from REFERENCE_SUMMARY
   - If ambiguous, note alternative interpretations

---

### **Phase 2: Source Extraction and Classification (30% effort)**

**Objective:** Identify all sources from the research and classify them by Tier using explicit criteria.

**Steps:**

1. **Extract Sources from Multiple Locations**

   **From REFERENCE_SUMMARY Section 7 (Complete Reference List):**
   - All provided references (marked as "Provided")
   - All suggested supplementary sources (marked as "Suggested")

   **From REFERENCE_SUMMARY Section 7 (Key Actors):**
   - Prominent authors mentioned
   - Institutions identified as field leaders
   - Publications frequently cited

   **From RESEARCH_PLAN Section 5 (Supplementary Source Recommendations):**
   - Specific sources recommended for deep research
   - General source types suggested (e.g., "meta-analyses on topic X")

2. **Classify Each Source Using Tier Criteria**

   For each source, systematically evaluate against the criteria from SOURCE_AUTHORITY_HIERARCHY:

   **Tier 1 Criteria (must meet 4 of 6):**
   - [ ] Peer-reviewed with independent editorial board
   - [ ] Impact: h-index ≥50 (journals) OR institutional authority (OECD, World Bank, etc.)
   - [ ] Full methodological transparency
   - [ ] Editorial independence (non-vendor sponsored)
   - [ ] Track record ≥10 years
   - [ ] Cross-validated as authoritative by other Tier 1 sources

   **Tier 2 Criteria (must meet 3 of 5):**
   - [ ] Methodology disclosure
   - [ ] Industry recognition (5+ years regular publication OR cited by Tier 1)
   - [ ] Empirical grounding (data, samples disclosed)
   - [ ] Quality control process
   - [ ] Bias acknowledgment

   **Tier 3 Criteria (must meet 2 of 4):**
   - [ ] Unique value (fills gap not covered by higher tiers)
   - [ ] Some rigor (methods described, evidence provided)
   - [ ] Transparency (credentials, limitations stated)
   - [ ] Corroboration potential (claims verifiable)

3. **Document Classification**

   For each source, create entry:
   ```
   SOURCE: [Name]
   TYPE: [Journal/Institution/Report/etc.]
   PROPOSED TIER: [1/2/3]
   CRITERIA MET: [List which specific criteria from above]
   JUSTIFICATION: [Why this tier? What evidence?]
   FOUND IN: [REFERENCE_SUMMARY section X / RESEARCH_PLAN section Y]
   CURRENCY NOTE: [Any temporal considerations]
   LIMITATION NOTE: [Any biases or constraints]
   ```

4. **Handle Ambiguous Cases**

   If a source is borderline between tiers:
   - Note the ambiguity
   - State which criteria are met, which are borderline
   - Recommend conservative classification (lower tier if uncertain)
   - Flag for editor review

5. **Identify Sources Already in Hierarchy**

   Cross-check: Is this source already listed in SOURCE_AUTHORITY_HIERARCHY?
   - If YES: Note that it's already included (no action needed unless new information changes tier)
   - If NO: Mark for addition

---

### **Phase 3: Validation Criteria Extraction (25% effort)**

**Objective:** Derive validation checks and red flags from the research to update CLAIM_VALIDATION_CRITERIA.

**Steps:**

1. **Extract from REFERENCE_SUMMARY Section 2 (Thematic Architecture)**

   **Key Conceptual Distinctions:**
   - What critical terms are debated or confused in the literature?
   - What definitions must be clearly distinguished?
   - Example: If references debate "AI alignment" vs "AI safety," this becomes a validation check

   **Mental Models/Frameworks:**
   - What theoretical frameworks are used?
   - Are there competing frameworks?
   - Example: If references show tension between "technology determinism" and "social construction," this informs validation

2. **Extract from REFERENCE_SUMMARY Section 3 (Convergence/Divergence)**

   **Debates and Tensions:**
   - What do sources disagree about?
   - What are the fault lines in the field?
   - These become validation checks: "Does source acknowledge debate X?"

   **Common Misconceptions:**
   - What errors do even credible sources make?
   - What oversimplifications are common?
   - These become red flags

3. **Extract from RESEARCH_PLAN Section 2 (Gap Analysis)**

   **Methodological Limitations:**
   - What methodological weaknesses were detected?
   - What biases are common in this field?
   - These inform "Methodological Must-Haves"

   **Missing Perspectives:**
   - What approaches are absent in the literature?
   - This reveals what validation checks are needed

4. **Generate Validation Checklist Items**

   For the topic, create:

   **Key Conceptual Distinctions:**
   - [Distinction 1: Term A vs. Term B]
   - [Why this matters]

   **Common Misunderstandings:**
   - [Misunderstanding 1]
   - [Why it's wrong / What's correct]

   **Methodological Must-Haves:**
   - [ ] [Requirement 1 for rigorous research in this area]
   - [ ] [Requirement 2]

   **Red Flags:**
   - [Red flag 1: What to watch for]
   - [Red flag 2]

5. **Ensure Consistency with Existing Criteria**

   - Do these new criteria contradict existing ones?
   - Are they at the same level of specificity as other topics?
   - Do they use consistent terminology?

---

### **Phase 4: Search Strategy Development (15% effort)**

**Objective:** Create actionable search strategy for this topic for future deep research.

**Steps:**

1. **Extract from RESEARCH_PLAN Section 4 (Proposed Research Directions)**

   For each "Line of Investigation":
   - Note the keywords suggested
   - Note the source types recommended
   - Note the databases mentioned

2. **Synthesize into Search Strategy**

   Create structured search strategy:

   **Primary Databases:**
   - [List databases based on research plan + general knowledge of field]

   **Core Search String:**
   ```
   ("keyword1" OR "keyword2" OR "keyword3")
   AND ("aspect1" OR "aspect2")
   AND (methodology OR framework OR analysis)
   NOT ("exclusion1" OR "exclusion2")
   ```

   **Time Filter:**
   - [Based on field characteristics: fast-moving tech vs. stable theory]

   **Grey Literature:**
   - [Specific institutions, conferences, white paper sources]

   **Saturation Criteria:**
   - [ ] Found 3+ Tier 1 sources on specific question
   - [ ] Found 2+ recent (within appropriate timeframe) institutional reports
   - [ ] Major perspectives covered
   - [ ] Diminishing returns (new searches return same sources)

3. **Adapt Strategy to Topic Characteristics**

   - Fast-moving field (tech, markets): Prioritize recency, shorter time windows
   - Established field (theory, foundational): Longer time windows acceptable, focus on systematic reviews
   - Emerging field: Include grey literature, working papers, conferences

---

### **Phase 5: Synthesis and Report Generation (10% effort)**

**Objective:** Produce VALIDATION_REPORT for editor review and final updated documents.

**Steps:**

1. **Generate VALIDATION_REPORT** (see structure below in Section 5)

2. **Prepare Updated SOURCE_AUTHORITY_HIERARCHY**
   - Copy current version
   - Integrate new sources in appropriate sections
   - Add new topic sections if needed
   - Update metadata (Last Updated, version number)
   - Add entry to Version Log

3. **Prepare Updated CLAIM_VALIDATION_CRITERIA**
   - Copy current version
   - Add new topic section(s) if needed
   - Update existing sections if applicable
   - Update metadata and version log

4. **Verification Checks**
   - [ ] All sources from research are accounted for (added or noted as existing)
   - [ ] All Tier classifications have clear justifications
   - [ ] Validation criteria are specific and actionable
   - [ ] Search strategies are complete
   - [ ] Formatting is consistent with existing content
   - [ ] Version logs are updated
   - [ ] No contradictions with existing content

---

## **5. OUTPUT SPECIFICATIONS**

### **5.1 VALIDATION_REPORT Structure**

**Purpose:** Transparent documentation of proposed changes for editor review before finalization.

**Length:** 2,000-3,000 words

**Format:**

```markdown
# VALIDATION REPORT

**Project:** [Name from REFERENCE_SUMMARY]
**Date:** [Date]
**AI System:** Claude Sonnet 4.5
**Input Documents:**
- REFERENCE_SUMMARY: [filename/date]
- RESEARCH_PLAN: [filename/date]
- SOURCE_AUTHORITY_HIERARCHY: Current v[X.X]
- CLAIM_VALIDATION_CRITERIA: Current v[X.X]

---

## 1. TOPIC CLASSIFICATION DECISION

### Primary Topic(s) Identified
[List topic(s) from the research]

### Classification
- [X] NEW TOPIC → Will create section [N]. [Topic Name]
- [ ] UPDATE EXISTING TOPIC → Will update section [N]. [Topic Name]
- [ ] NEW SUBTOPIC → Will create section [N.X] under [Parent Topic]
- [ ] MULTIPLE UPDATES → Will update sections [list]

### Justification
[Explain why this classification was chosen. Reference REFERENCE_SUMMARY sections.]

### Ambiguities/Alternative Interpretations
[If any, note here. Otherwise state "None identified."]

---

## 2. SOURCE CLASSIFICATION SUMMARY

### Overview
- Total sources extracted: [N]
- Proposed Tier 1: [N] ([X] new, [Y] already in hierarchy)
- Proposed Tier 2: [N] ([X] new, [Y] already in hierarchy)
- Proposed Tier 3: [N] ([X] new, [Y] already in hierarchy)

### New Tier 1 Sources (Detailed)

**[Source 1 Name]**
- **Type:** [Journal/Institution/etc.]
- **Criteria Met (4 of 6 required):**
  - [✓] Criterion 1: [Evidence]
  - [✓] Criterion 2: [Evidence]
  - [✓] Criterion 3: [Evidence]
  - [✓] Criterion 4: [Evidence]
  - [✗] Criterion 5: [Why not met]
  - [✗] Criterion 6: [Why not met]
- **Justification:** [Why Tier 1?]
- **Found In:** REFERENCE_SUMMARY [section] / RESEARCH_PLAN [section]
- **Currency Note:** [Any temporal considerations]
- **Limitation Note:** [Any constraints or biases]

[Repeat for each new Tier 1 source]

### New Tier 2 Sources (Detailed)
[Same structure as Tier 1, but 3 of 5 criteria]

### New Tier 3 Sources (Detailed)
[Same structure, but 2 of 4 criteria]

### Already-Included Sources
[List sources that are already in SOURCE_AUTHORITY_HIERARCHY; no action needed]

### Borderline/Ambiguous Cases
[List sources where tier classification is uncertain, with reasoning]

---

## 3. VALIDATION CRITERIA UPDATES

### Proposed Additions to CLAIM_VALIDATION_CRITERIA

**For Topic: [Topic Name]**

#### Key Conceptual Distinctions
[Derived from REFERENCE_SUMMARY Section 2]

1. **[Term A] vs. [Term B]**
   - Distinction: [Explanation]
   - Why it matters: [Importance]
   - Derived from: [Which references showed this distinction matters]

[Repeat as needed]

#### Common Misunderstandings
[Derived from REFERENCE_SUMMARY Section 3 and observed patterns]

1. **[Misunderstanding 1]**
   - What's wrong: [Explanation]
   - What's correct: [Explanation]
   - Evidence: [Which sources discuss this]

[Repeat as needed]

#### Methodological Must-Haves
[Derived from RESEARCH_PLAN Section 2 Gap Analysis]

For rigorous research on [topic], sources should:
- [ ] [Requirement 1]
- [ ] [Requirement 2]
- [ ] [Requirement 3]

**Justification:** [Why these requirements? What gaps did we identify?]

#### Red Flags
[Derived from limitations/biases in provided references]

- [Red flag 1]: [What to watch for]
- [Red flag 2]: [What to watch for]

**Justification:** [What patterns in the literature suggest these red flags?]

### Consistency Check
- [ ] No contradictions with existing validation criteria
- [ ] Specificity level matches other topics
- [ ] Terminology consistent with rest of document

---

## 4. SEARCH STRATEGY SPECIFICATION

### For Topic: [Topic Name]

**Primary Databases:**
- [Database 1]: [Why/what to search for]
- [Database 2]: [Why/what to search for]

**Core Search String:**
```
[Boolean query based on RESEARCH_PLAN keywords]
```

**Alternative Search (if needed):**
```
[Alternative formulation]
```

**Time Filter:**
[Recommended timeframe based on field characteristics]

**Exclusion Terms:**
[What to exclude and why]

**Grey Literature:**
- [Source type 1]: [Specific institutions/conferences]
- [Source type 2]: [Where to find]

**Saturation Criteria:**
- [ ] [Criterion 1]
- [ ] [Criterion 2]
- [ ] [Criterion 3]

**Derived From:**
RESEARCH_PLAN Section 4 (Lines of Investigation [list which ones])

---

## 5. INTEGRATION PLAN

### Changes to SOURCE_AUTHORITY_HIERARCHY

**If NEW TOPIC:**
- Create new section: [N]. [Topic Name]
- Position in document: [After section X, before section Y]
- Reason for positioning: [Logical flow / Related to adjacent topics]

**If UPDATE EXISTING:**
- Update section: [N]. [Topic Name]
- Changes:
  - Add [N] new Tier 1 sources
  - Add [N] new Tier 2 sources
  - Add [N] new Tier 3 sources
  - Update Search Strategy: [Additions]
  - Update metadata: Last Updated date

**If NEW SUBTOPIC:**
- Create subsection: [N.X]. [Subtopic Name]
- Under parent: [N]. [Parent Topic Name]
- Justification: [Why this is a subtopic, not standalone]

### Changes to CLAIM_VALIDATION_CRITERIA

**If NEW TOPIC:**
- Create new section matching SOURCE_AUTHORITY_HIERARCHY numbering
- Include: Key Distinctions, Common Misunderstandings, Must-Haves, Red Flags

**If UPDATE EXISTING:**
- Add new validation criteria to existing section [N]
- Note: [Specify what's being added]

### Metadata Updates

**SOURCE_AUTHORITY_HIERARCHY:**
- Version: [Current] → [New]
- Last Updated: [Date]
- Review Trigger Date: [Date + 12 months]
- Version Log Entry: [Draft entry for version log]

**CLAIM_VALIDATION_CRITERIA:**
- Version: [Current] → [New]
- Version Log Entry: [Draft entry]

---

## 6. CONFLICTS AND ISSUES

### Detected Conflicts
[List any conflicts with existing content, e.g.:]
- New source contradicts existing Tier 1 classification
- Proposed validation criteria conflicts with existing criteria
- Topic overlap/boundary issues

[Or state "None detected"]

### Proposed Resolutions
[For each conflict, propose how to resolve it]

### Flagged for Editor Decision
[Issues that require human judgment]

---

## 7. CONFIDENCE ASSESSMENT

### Classification Confidence
- Topic Classification: [HIGH / MEDIUM / LOW]
- Source Tier Assignments: [HIGH / MEDIUM / LOW]
- Validation Criteria Quality: [HIGH / MEDIUM / LOW]

### Rationale
[Explain confidence levels]

### Uncertainties
[What requires editor input or further investigation?]

---

## 8. RECOMMENDATIONS

### For Editor Review
1. [Specific items to review carefully]
2. [Decisions needed]
3. [Alternative approaches to consider]

### For Future Research
[Based on this validation update, what should future projects prioritize?]

---

## APPENDICES

### Appendix A: Complete Source List
[Table format:]

| Source Name | Type | Proposed Tier | Status | Notes |
|-------------|------|---------------|--------|-------|
| ... | ... | ... | New/Existing | ... |

### Appendix B: References to Input Documents
[For traceability, list key references:]
- REFERENCE_SUMMARY Section 2.1 → Informed validation criterion X
- RESEARCH_PLAN Line of Investigation 2 → Informed search strategy Y

---

END OF VALIDATION REPORT
```

---

### **5.2 Updated SOURCE_AUTHORITY_HIERARCHY**

**Deliverable:** Complete updated version of the document with:
- New sources integrated in appropriate tier sections
- New topic sections if applicable
- Updated search strategies
- Updated metadata (Last Updated dates, Version number)
- New entry in Version Log

**Format:** Follow exact structure of existing SOURCE_AUTHORITY_HIERARCHY v2.0

---

### **5.3 Updated CLAIM_VALIDATION_CRITERIA**

**Deliverable:** Complete updated version with:
- New topic sections if applicable
- Additional validation criteria integrated
- Updated metadata and version log

**Format:** Follow exact structure of existing CLAIM_VALIDATION_CRITERIA v1.0

---

## **6. QUALITY STANDARDS**

### **Fidelity to Research (Essential)**

- [ ] All sources from REFERENCE_SUMMARY and RESEARCH_PLAN are accounted for
- [ ] Tier classifications are justified using explicit criteria
- [ ] Validation criteria derive directly from research insights
- [ ] Search strategies reflect RESEARCH_PLAN recommendations

### **Systematic Application of Criteria (Essential)**

- [ ] Every Tier 1 source meets 4+ of 6 criteria (with evidence)
- [ ] Every Tier 2 source meets 3+ of 5 criteria (with evidence)
- [ ] Every Tier 3 source meets 2+ of 4 criteria (with evidence)
- [ ] Borderline cases are flagged, not forced into tiers

### **Consistency (Essential)**

- [ ] Formatting matches existing documents exactly
- [ ] Terminology is consistent with existing content
- [ ] No contradictions with existing validation criteria
- [ ] Specificity level matches other topics

### **Transparency (Essential)**

- [ ] Every decision is justified
- [ ] Ambiguities are acknowledged
- [ ] Derivation from input documents is traceable
- [ ] Editor is given clear review points

### **Utility for Future Research (Important)**

- [ ] Search strategies are actionable
- [ ] Validation criteria are specific and testable
- [ ] Source classifications will guide AI-driven research effectively

---

## **7. DECISION FRAMEWORKS**

### **When to Create NEW TOPIC vs. UPDATE EXISTING**

**Create NEW TOPIC if:**
- No existing topic section adequately covers this subject
- The topic represents a distinct field/domain not nested under others
- Creating a new section improves document organization

**UPDATE EXISTING if:**
- Topic clearly fits within an already-defined section
- Adding sources and criteria to existing section is logical
- No structural reorganization needed

**Create NEW SUBTOPIC if:**
- Topic is a specialized area of a broader existing topic
- Nesting improves clarity (e.g., "Systemic Investing" under "Complex Systems")
- Subtopic has distinct sources/criteria but shares parent topic's foundation

**MULTIPLE UPDATES if:**
- Research genuinely spans several distinct existing topics
- Sources apply to different domains
- Validation criteria touch on multiple fields

### **When to Classify as Tier 1 vs. Tier 2**

**Tier 1 appropriate when:**
- Source meets 4+ of 6 explicit criteria
- Field treats this as authoritative (cross-validation exists)
- Methodology is transparent and rigorous

**Tier 2 appropriate when:**
- Source meets 3-4 of Tier 1 criteria (not quite 4)
- OR: Source meets 3+ of 5 Tier 2 criteria
- Credible but with limitations (commercial, less rigorous, narrower scope)

**If borderline:**
- Default to LOWER tier (conservative)
- Flag for editor review
- Document which criteria are borderline

### **When Validation Criteria are Insufficient**

**If REFERENCE_SUMMARY doesn't provide enough detail:**
- Note the gap in VALIDATION_REPORT
- Use general principles from CLAIM_VALIDATION_CRITERIA
- Recommend future research to fill this gap

**If research is too preliminary:**
- State this in VALIDATION_REPORT
- Provide provisional criteria
- Flag for update when field matures

---

## **8. EXECUTION MODE**

### **Mode Selection**

The prompt operates in one of these modes based on the research:

**Mode 1: NEW TOPIC**
- Full execution: Topic Classification → Source Classification → Validation Criteria → Search Strategy
- Outputs: VALIDATION_REPORT + Updated both documents with new topic section

**Mode 2: UPDATE EXISTING TOPIC**
- Modified execution: Topic Matching → Source Classification (additions to existing tier lists) → Validation Criteria (additions) → Search Strategy (enhancements)
- Outputs: VALIDATION_REPORT + Updated both documents with additions to existing section(s)

**Mode 3: NEW SUBTOPIC**
- Similar to Mode 1 but creates nested section (e.g., 2.3)
- Ensures parent topic context is referenced
- Outputs: VALIDATION_REPORT + Updated documents with new subsection

**Mode 4: MULTIPLE UPDATES**
- Execute Mode 2 for each affected topic
- VALIDATION_REPORT includes separate sections for each updated topic
- Outputs: VALIDATION_REPORT + Updated documents with changes across multiple sections

### **Mode is Determined in Phase 1**

The classification decision in Phase 1 determines which mode to execute.

---

## **9. EDITOR INTERACTION POINTS**

### **After VALIDATION_REPORT Generation**

**Stop and present VALIDATION_REPORT to editor.**

**Editor will:**
1. Review topic classification decision
2. Review source tier assignments (especially borderline cases)
3. Review validation criteria for clarity and utility
4. Approve, request modifications, or reject proposed changes

**Do NOT proceed to generating final updated documents until editor approves.**

### **After Approval**

Generate final updated versions of:
- SOURCE_AUTHORITY_HIERARCHY v[X.X]
- CLAIM_VALIDATION_CRITERIA v[X.X]

Present these for final review.

---

## **10. SPECIAL CASES**

### **Case 1: Source Already Exists But Tier Should Change**

**Scenario:** Research reveals a source currently in Tier 2 should be Tier 1 (or vice versa).

**Action:**
- Note this in VALIDATION_REPORT under "Conflicts and Issues"
- Provide evidence for reclassification
- Recommend tier change
- Flag for editor decision

### **Case 2: Contradictory Evidence on Source Credibility**

**Scenario:** Some references cite a source as authoritative, others critique it.

**Action:**
- Document the controversy in VALIDATION_REPORT
- Present evidence from both sides
- Make conservative recommendation (lower tier if uncertain)
- Flag for editor review

### **Case 3: Regional Source Hierarchy Differs from Global**

**Scenario:** A source is Tier 1 in Spanish context but Tier 2 globally.

**Action:**
- Note regional specificity
- Consider creating regional note in source listing
- Example: "Tier 1 for Spanish market analysis; Tier 2 for global"

### **Case 4: Field Has No Clear Tier 1 Sources**

**Scenario:** Emerging field where no source meets 4+ Tier 1 criteria.

**Action:**
- Note this in VALIDATION_REPORT
- Classify best available sources as Tier 2
- Include note: "Field lacks established Tier 1 sources as of [date]"
- Recommend review trigger when field matures

### **Case 5: Validation Criteria Would Contradict Existing Criteria**

**Scenario:** New research suggests validation criteria that conflicts with established criteria in another topic.

**Action:**
- Document the conflict clearly
- Analyze whether this is:
  - A genuine field difference (different standards apply)
  - An error in existing criteria (needs correction)
  - A misunderstanding (reconcilable with clarification)
- Recommend resolution path
- Flag for editor decision

---

## **11. VERSION LOG**

| Version | Date | Changes |
|---------|------|---------|
| 1.0-1.5 | Sept 2025 | Initial versions |
| 2.0 | Nov 2025 | Optimized structure, clarified instructions |
| 3.0 | Jan 24, 2026 | Complete restructure: explicit integration with REFERENCE_SUMMARY and RESEARCH_PLAN, systematic source classification using Tier Criteria, derivation of validation criteria from research insights, search strategy development, VALIDATION_REPORT as mandatory intermediate output, support for NEW/UPDATE/SUBTOPIC modes, conflict resolution framework, editor approval workflow |
| 3.1 | Feb 22, 2026 | Fixed section references to match canonical structures: REFERENCE_SUMMARY sections 4 (Historical Perspective) and 9 (Complete Reference List) corrected; Key Actors updated to Section 7; RESEARCH_PLAN Section 6 "Relevant Actors" replaced by Section 3 "Field Context" subsection 3.2 (resolves GAP-R05) |

---

**END OF PROMPT v3.0**
