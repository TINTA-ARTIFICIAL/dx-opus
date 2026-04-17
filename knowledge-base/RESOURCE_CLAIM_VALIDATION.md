---
id:          RESOURCE_CLAIM_VALIDATION
type:        RESOURCE
subsystem:   KNOWLEDGE_BASE
version:     1.2
status:      ACTIVE
created:     2026-01-24
updated:     2026-04-16
owner_chat:  knowledge-base-dev
---

## CHANGELOG

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| v1.0 | 2026-01-24 | JM | Initial creation. Separated from SOURCE_AUTHORITY_HIERARCHY, created universal validation framework, topic-specific criteria, decision tree and confidence scoring system. |
| v1.1 | 2026-02-22 | JM | Added CANONICAL UPDATE SCHEMA section: document architecture (Universal vs Topic-Specific layers), field specification for topic sections, procedures A–D (add section, update section, deprecate item, Universal Framework protocol), KB-dev notification triggers, SAH↔CVC alignment table. |
| v1.2 | 2026-04-16 | JM | Add YAML header. Content unchanged. |

---

# **CLAIM VALIDATION CRITERIA**

**Version:** 1.1  
**Date:** February 22, 2026  
**Purpose:** Conceptual validation framework for evaluating claims and research quality  
**Scope:** Cross-project resource (complements SOURCE_AUTHORITY_HIERARCHY)

---

## **DOCUMENT OVERVIEW**

### **What This Is**

A framework for evaluating the **quality and validity of specific claims** in research, regardless of source tier. This focuses on conceptual rigor, methodological soundness, and logical coherence.

### **Relationship to SOURCE_AUTHORITY_HIERARCHY**

```
SOURCE_AUTHORITY_HIERARCHY answers: "Is this SOURCE credible?"
CLAIM_VALIDATION_CRITERIA answers: "Is this CLAIM well-supported?"

Both are needed for robust research validation.
```

### **Key Principles**

1. **Even Tier 1 sources can make weak claims** (outside their expertise, poor methodology, outdated)
2. **Even Tier 3 sources can make valid claims** (if well-evidenced, in their niche)
3. **Methodology matters** more than source prestige for specific claims
4. **Logical coherence** is independent of source authority
5. **Context determines validity** (claim valid in one context may not generalize)

---

## **UNIVERSAL VALIDATION FRAMEWORK**

### **Four Pillars of Claim Validation**

Every claim should be evaluated across:

1. **Evidential Support:** What evidence backs this claim?
2. **Methodological Rigor:** How was this evidence gathered/analyzed?
3. **Logical Coherence:** Does the reasoning hold?
4. **Contextual Validity:** Does it apply to our specific case?

---

## **1. EVIDENTIAL SUPPORT EVALUATION**

### **Evidence Quality Hierarchy**

**Strongest → Weakest:**

1. **Systematic Review / Meta-Analysis**
   - Synthesizes multiple studies
   - Explicit inclusion/exclusion criteria
   - Effect sizes quantified
   - **Use for:** Establishing general patterns

2. **Experimental Study (RCT or Quasi-Experimental)**
   - Controlled conditions
   - Causality can be inferred
   - Random assignment (or strong controls)
   - **Use for:** Causal claims

3. **Longitudinal Study**
   - Tracks changes over time
   - Multiple data points
   - Can show trends (not necessarily causation)
   - **Use for:** Temporal patterns, development

4. **Cross-Sectional Survey (Large N)**
   - Snapshot in time
   - Correlation possible, causation unclear
   - Generalizable if sample representative
   - **Use for:** Current state assessment, correlations

5. **Case Study (Rigorous)**
   - Deep dive into specific instance
   - Rich qualitative detail
   - Limited generalizability
   - **Use for:** Understanding mechanisms, generating hypotheses

6. **Expert Opinion / Commentary**
   - Based on experience, not systematic data
   - Valuable for interpretation
   - Weakest evidence type for factual claims
   - **Use for:** Context, interpretation, emerging trends

### **Evidence Sufficiency Questions**

- [ ] **Quantity:** Is there more than one source of evidence?
- [ ] **Quality:** What is the strongest type of evidence available?
- [ ] **Consistency:** Do multiple evidence types converge?
- [ ] **Recency:** Is the evidence current for the claim's context?
- [ ] **Representativeness:** Does the sample/case match the population of interest?

### **Red Flags: Insufficient Evidence**

- Single source with no corroboration
- Anecdotal evidence for general claim
- Self-reported data without validation
- Cherry-picked examples without base rates
- Correlation presented as causation
- Extrapolation beyond data boundaries

---

## **2. METHODOLOGICAL RIGOR EVALUATION**

### **Research Design Questions**

**For Quantitative Claims:**
- [ ] Is the sample size adequate? (Power analysis disclosed?)
- [ ] Is the sample representative of the population?
- [ ] Are statistical methods appropriate for data type?
- [ ] Are confidence intervals or p-values reported?
- [ ] Are effect sizes (not just significance) reported?
- [ ] Are confounding variables controlled?
- [ ] Is there risk of selection bias?

**For Qualitative Claims:**
- [ ] Is the sampling strategy clearly described?
- [ ] Is data saturation discussed?
- [ ] Are coding/analysis procedures transparent?
- [ ] Is researcher reflexivity addressed?
- [ ] Are alternative interpretations considered?
- [ ] Is triangulation used (multiple data sources)?

**For Case Studies:**
- [ ] Is the case selection justified?
- [ ] Are boundaries of the case clearly defined?
- [ ] Is context richly described?
- [ ] Are limitations to generalizability stated?
- [ ] Is the analysis framework explicit?

**For Theoretical/Conceptual Claims:**
- [ ] Are assumptions stated explicitly?
- [ ] Is internal logic consistent?
- [ ] Are concepts clearly defined?
- [ ] Is the scope of applicability specified?
- [ ] Are alternative frameworks acknowledged?

### **Common Methodological Red Flags**

**Statistical Issues:**
- P-hacking (multiple tests without correction)
- Small sample size without acknowledgment
- Ignoring effect size (focusing only on significance)
- Inappropriate statistical test for data type
- Missing data not addressed
- Outliers removed without justification

**Design Issues:**
- Self-selection bias in sample
- Confounding variables not controlled
- Measurement instruments not validated
- Retrospective data for causal claims
- Generalization beyond sample characteristics

**Reporting Issues:**
- Methods section insufficient to replicate
- Selective reporting of results
- Conflicts of interest not disclosed
- Data not available for verification
- Key limitations not discussed

---

## **3. LOGICAL COHERENCE EVALUATION**

### **Argument Structure Analysis**

**Strong Arguments:**
- [ ] Premises are clearly stated
- [ ] Premises are true (or supported by evidence)
- [ ] Conclusion follows logically from premises
- [ ] No logical fallacies present
- [ ] Scope of conclusion matches strength of premises

### **Common Logical Fallacies to Detect**

**Causal Fallacies:**
- **Post hoc ergo propter hoc:** A occurred before B, therefore A caused B
- **Confusing correlation with causation:** Two things are related, therefore one causes the other
- **Ignoring common cause:** A and B are both caused by C, but analysis treats A as causing B

**Generalization Fallacies:**
- **Hasty generalization:** Small sample → broad conclusion
- **Cherry picking:** Selecting only supporting examples
- **Composition fallacy:** What's true of part is true of whole
- **Ecological fallacy:** Group-level patterns applied to individuals

**Reasoning Fallacies:**
- **False dichotomy:** Only two options presented when more exist
- **Slippery slope:** Assuming small change leads to extreme outcome without evidence
- **Circular reasoning:** Conclusion used as premise
- **Ad hominem:** Attacking source instead of argument
- **Appeal to authority:** "X said it, therefore it's true" (without evidence)

### **Internal Consistency Checks**

- [ ] Do different sections of the source contradict each other?
- [ ] Are terms used consistently throughout?
- [ ] Do examples actually support the claims?
- [ ] Are exceptions to the rule acknowledged?
- [ ] Is the scope consistent (not shifting between micro/macro)?

---

## **4. CONTEXTUAL VALIDITY EVALUATION**

### **Context Matching Questions**

- [ ] **Temporal:** Is this claim from a time period relevant to our question?
- [ ] **Geographic:** Does the context (country, region, culture) match ours?
- [ ] **Sectoral:** Is the industry/domain the same or analogous?
- [ ] **Scale:** Is the organization size/type comparable?
- [ ] **Technological:** Is the tech maturity level similar?
- [ ] **Regulatory:** Is the policy environment comparable?

### **Generalizability Assessment**

**When CAN a claim generalize:**
- Underlying mechanism is universal (e.g., physics, mathematics)
- Multiple contexts tested and converge
- Theory explicitly tested for boundary conditions
- Meta-analysis shows consistency across contexts

**When CANNOT a claim generalize:**
- Highly context-specific findings (e.g., specific regulation, unique culture)
- Single-context study without theoretical justification
- Author explicitly limits scope
- Known moderators differ in our context

### **Red Flags: Context Mismatch**

- US study applied to Spanish context without consideration of differences
- Large enterprise findings applied to SMEs
- B2C findings applied to B2B
- High-tech sector findings applied to traditional industries
- Developed economy findings applied to emerging markets
- Pre-digital findings applied to post-digital era

---

## **TOPIC-SPECIFIC VALIDATION CRITERIA**

### **Structure**

Each topic below includes:
- **Key Conceptual Distinctions:** Critical terms that must be used correctly
- **Common Misunderstandings:** Frequent errors to watch for
- **Methodological Must-Haves:** Minimum requirements for rigorous research
- **Red Flags:** Specific warning signs for this topic

---

## **1. DIGITALIZATION & DIGITAL TRANSFORMATION**

### **Key Conceptual Distinctions**

**Critical to distinguish:**
- **Digitization:** Converting analog to digital (e.g., scanning documents)
- **Digitalization:** Using digital tech to change business processes (e.g., e-signatures replacing wet signatures)
- **Digital Transformation:** Fundamental business model change enabled by digital (e.g., shifting from product to platform)

**Confusion between these levels = RED FLAG**

### **Common Misunderstandings**

- **Technology = Transformation:** Assuming tech adoption automatically transforms business
- **Digital = Online:** Reducing digital transformation to having a website
- **One-size-fits-all:** Applying generic maturity models without industry context
- **Determinism:** Assuming technology causes specific outcomes (ignoring organizational factors)

### **Methodological Must-Haves**

For claims about digital transformation:
- [ ] Clear definition of what "transformation" means in this context
- [ ] Baseline and outcome measures specified
- [ ] Time horizon stated (transformation takes years)
- [ ] Organizational factors addressed (not just technology)
- [ ] Success metrics clearly defined and measured

### **Red Flags**

- Generic "digital transformation" claims without specific metrics
- Technology predictions without citing research methodologies
- Outdated statistics about digital adoption rates (>3 years old)
- Confusion between technical implementation and business transformation
- Vendor case studies without independent validation
- Maturity models without empirical validation

---

## **2. COMPLEX SYSTEMS ANALYSIS**

### **Key Conceptual Distinctions**

**Critical to distinguish:**
- **Complicated vs. Complex:**
  - Complicated: Many parts, but predictable (e.g., aircraft)
  - Complex: Interacting parts with emergent, non-linear behavior (e.g., ecosystem)
- **Emergent vs. Aggregate:**
  - Aggregate: Sum of parts (e.g., total weight)
  - Emergent: New properties from interactions (e.g., consciousness from neurons)
- **Components vs. System:**
  - Component behavior ≠ System behavior
  - System boundary definition is critical

### **Common Misunderstandings**

- **Linear thinking in complex systems:** Assuming input A always produces output B
- **Reductionism:** Believing system can be fully understood by analyzing parts
- **Ignoring feedback loops:** Missing reinforcing/balancing dynamics
- **Static analysis of dynamic systems:** Snapshot when process matters
- **Missing emergence:** Not recognizing system-level properties

### **Methodological Must-Haves**

For complex systems claims:
- [ ] System boundaries explicitly defined
- [ ] Feedback loops identified
- [ ] Emergence properties distinguished from component behaviors
- [ ] Non-linear dynamics acknowledged
- [ ] Validation approach appropriate for complexity level
- [ ] Uncertainty quantified (not eliminated)
- [ ] Modeling assumptions stated

### **Red Flags**

- Oversimplified cause-effect relationships in complex systems
- Missing discussion of system boundaries or constraints
- Linear thinking applied to non-linear systems
- Lack of uncertainty quantification in predictions
- Claims of "optimizing" complex adaptive systems (they can't be optimized, only influenced)
- Ignoring time lags in system response
- Attributing agency to systems (anthropomorphizing)

---

## **2.1. SYSTEMIC INVESTING**

### **Key Conceptual Distinctions**

**Critical to distinguish:**
- **Impact Investing:** Intentional positive impact + financial return (firm/project level)
- **ESG Investing:** Risk management via environmental/social/governance factors
- **Systemic Investing:** Targeting transformation of systems (markets, policies, norms) not just individual entities

**Systemic investing is NOT "advanced ESG" or "large-scale impact"**

### **Common Misunderstandings**

- **Scale ≠ Systemic:** Large impact investment is not automatically systemic
- **Multi-capital = Systemic:** Considering non-financial capital is necessary but not sufficient
- **Collaboration = Systemic:** Working together doesn't make it systemic unless targeting system structures
- **Long-term = Systemic:** Patient capital is necessary but not sufficient
- **Linear causality:** Expecting direct, measurable system change (systems change is non-linear)

### **Methodological Must-Haves**

For systemic investing claims:
- [ ] Intent to transform systems (not just scale impact) explicitly stated
- [ ] Leverage points in the system identified
- [ ] Theory of systemic change articulated
- [ ] Role of non-financial capital (social, intellectual, political) addressed
- [ ] Governance & power dynamics considered
- [ ] Measurement approach acknowledges non-linearity
- [ ] Time horizon for systemic change realistic (decades, not quarters)
- [ ] Adaptive learning mechanisms described

### **Red Flags**

- Treating systemic investing as merely "advanced" ESG
- Oversimplifying complex system dynamics / assuming linear outcomes
- Ignoring non-financial capital or collaborative governance
- Lack of discussion on uncertainty and adaptive learning
- Claims of systemic impact without specific measurement frameworks
- Missing analysis of power structures / governance
- Short time horizons (<5 years for systemic change)
- Replicating traditional investment structures without adaptation

---

## **3. BUSINESS MANAGEMENT & STRATEGY**

### **Key Conceptual Distinctions**

**Critical to distinguish:**
- **Strategy vs. Tactics:** Long-term direction vs. short-term actions
- **Competitive Advantage vs. Competitive Parity:** Unique value vs. matching competitors
- **Correlation vs. Causation:** Successful companies do X ≠ doing X causes success (survivor bias)

### **Common Misunderstandings**

- **Best practices universalism:** Assuming what works in one context works everywhere
- **Survivor bias:** Studying only successful companies and inferring causes
- **Post-hoc rationalization:** Explaining success after the fact as if it was planned
- **Confusing growth with profitability:** Revenue growth ≠ sustainable business
- **Ignoring context:** Strategy that worked in 2010 won't work in 2026

### **Methodological Must-Haves**

For management/strategy claims:
- [ ] Evidence base: empirical research or rigorous case studies
- [ ] Sample includes failures, not just successes
- [ ] Cultural/market context specified
- [ ] Performance metrics clearly defined and measured
- [ ] Time horizon realistic for implementation
- [ ] Contingencies/moderators identified (when does this work?)

### **Red Flags**

- Management fads without empirical backing
- Generic best practices without contextual adaptation
- Success stories without failure rate disclosure
- Outdated organizational theories applied to modern contexts
- Confusing correlation with causation in firm performance
- Ignoring industry/market structure in strategy analysis
- Claiming "revolutionary" without showing departure from status quo

---

## **4. TECHNOLOGY MARKET ANALYSIS**

### **Key Conceptual Distinctions**

**Critical to distinguish:**
- **Total Addressable Market (TAM):** Everyone who could theoretically buy
- **Serviceable Addressable Market (SAM):** Those you can actually reach
- **Serviceable Obtainable Market (SOM):** What you can realistically capture

**Conflating these = inflated projections**

### **Common Misunderstandings**

- **Hype Cycle ignorance:** Not recognizing where tech is in adoption curve
- **Technology push vs. Market pull:** Assuming cool tech = market demand
- **Linear adoption:** Expecting smooth S-curve (reality: fits and starts)
- **Ignoring switching costs:** Underestimating barriers to adoption
- **Vendor-neutral analysis confusion:** Treating vendor-sponsored research as independent

### **Methodological Must-Haves**

For market analysis claims:
- [ ] Market sizing methodology disclosed
- [ ] Growth projections with assumptions stated
- [ ] Competitive landscape: major players and market shares
- [ ] Technology maturity assessed (Gartner Hype Cycle or equivalent)
- [ ] Regulatory and policy factors considered
- [ ] Confidence intervals or ranges (not point estimates)
- [ ] Data recency specified

### **Red Flags**

- Market predictions without confidence intervals
- Vendor-sponsored research without bias disclosure
- Outdated competitive intelligence (>18 months in fast-moving tech)
- Ignored regulatory or economic disruption factors
- TAM used as revenue projection (massive overestimate)
- Assuming exponential growth continues indefinitely
- Cherry-picked adoption success stories

---

## **5. CULTURE-TECHNOLOGY RELATIONSHIPS**

### **Key Conceptual Distinctions**

**Critical to distinguish:**
- **Technology Determinism:** Tech shapes culture (oversimplified)
- **Social Construction of Technology:** Culture shapes tech adoption/use (partial truth)
- **Co-evolution:** Tech and culture mutually shape each other (most accurate)

### **Common Misunderstandings**

- **Universal technology adoption:** Assuming all cultures adopt/use tech the same way
- **Generational essentialism:** "Digital natives" as homogeneous group
- **Western-centric models:** Assuming WEIRD (Western, Educated, Industrialized, Rich, Democratic) patterns apply globally
- **Static culture:** Treating culture as unchanging (it evolves with tech)
- **Individual = Aggregate:** Assuming individual attitudes scale to societal patterns

### **Methodological Must-Haves**

For culture-technology claims:
- [ ] Cultural variables clearly defined and measured
- [ ] Cross-cultural validity considered
- [ ] Temporal context specified
- [ ] Qualitative research: reflexivity, saturation, triangulation
- [ ] Quantitative research: representative samples, validated instruments
- [ ] Generational/cohort effects distinguished from age effects
- [ ] Researcher's cultural position acknowledged

### **Red Flags**

- Cultural stereotyping or overgeneralization
- Outdated cultural assumptions about technology use
- Western-centric technology adoption models applied globally without validation
- Missing consideration of generational differences
- Confusing digital access with digital literacy
- Ignoring within-culture variation
- Deterministic claims (tech will cause cultural change X)

---

## **6. ENTREPRENEURSHIP & INVESTOR RELATIONS**

### **Key Conceptual Distinctions**

**Critical to distinguish:**
- **Valuation vs. Value:** What investors pay vs. actual worth
- **Causation vs. Correlation:** Funded startups do X ≠ doing X gets you funded
- **Survivor bias:** Successful startups did Y ≠ doing Y causes success

### **Common Misunderstandings**

- **Unicorn obsession:** Assuming all startups should aim for billion-dollar valuation
- **Product-market fit clarity:** Treating it as binary when it's continuous
- **Timing luck as strategy:** Attributing lucky timing to founder genius
- **VC as only path:** Ignoring bootstrapping, revenue-based financing, etc.
- **Exit as only success:** Ignoring sustainable, profitable businesses that don't exit

### **Methodological Must-Haves**

For entrepreneurship claims:
- [ ] Data recency (funding landscape changes rapidly; <2 years ideal)
- [ ] Sample representativeness (diverse startup types, stages, sectors)
- [ ] Success AND failure rates reported
- [ ] Regional context (Spanish/EU vs. US/Asia differ greatly)
- [ ] Survey methodology transparent (sample size, response rate)
- [ ] Conflicts of interest disclosed (VCs writing about what VCs fund)

### **Red Flags**

- Survivor bias in success story reporting
- Outdated funding landscape information (>2 years)
- Generic startup advice without market context
- Inflated valuation or success metrics
- Ignoring regional regulatory differences (especially EU vs US)
- Confusing correlation with causation in startup success factors
- VC-authored research on "what VCs want" (circular logic)

---

## **7. COMPUTATIONAL LITERATURE & AI AUTHORSHIP**

### **Key Conceptual Distinctions**

**Critical to distinguish:**
- **Statistical prediction vs. Semantic intent:** LLMs predict next token; they don't "mean" anything
- **Sentence-level fluency vs. Macro-structural coherence:** Can write sentences ≠ can write novels
- **Generation vs. Curation:** AI outputs raw text; humans shape it into art
- **Stochastic LLMs vs. Agentic architectures:** Standard models vs. structured multi-step systems
- **Authorship vs. Tool use:** Who is the author when AI is involved?

### **Common Misunderstandings**

- **Anthropomorphizing AI:** Attributing "feelings," "voice," "intent," "creativity" to models
- **Autonomous writing myth:** Believing AI can write coherent long-form work without heavy human editing
- **Replacement vs. Augmentation:** Assuming AI replaces writers (not augments them)
- **Ignoring hallucination:** Treating AI output as factual without verification
- **Legal clarity:** Assuming current copyright law is settled on AI authorship (it's not)

### **Methodological Must-Haves**

For AI authorship claims:
- [ ] Architecture specificity: Standard LLM vs. Agentic system clearly stated
- [ ] Human involvement disclosed: How much curation/editing occurred?
- [ ] Evaluation methodology: How is quality assessed? (Not just perplexity/BLEU)
- [ ] Legal status acknowledged: Current uncertainty about authorship rights
- [ ] Training data bias: Anglocentric bias, lack of Spanish literary tradition
- [ ] Hallucination handling: How are factual errors managed in non-fiction?
- [ ] Structural coherence: How is long-form coherence maintained?

### **Red Flags**

- Anthropomorphizing the AI (attributing "feelings," "voice," or "intent" to the model)
- Claims of "autonomous" novel writing without disclosing the heavy human editing/curation process
- Confusing sentence-level fluency (grammar) with macro-structural coherence (plot/memory)
- Ignoring the "Hallucination" factor in non-fiction or essayistic contexts
- Applying "Replacement" narratives instead of "Augmentation/Co-creation" frameworks
- Claiming legal authorship without substantial human involvement (conflicts with current standards)
- Using only computational metrics (perplexity, BLEU) for aesthetic assessment
- Ignoring cultural/linguistic bias in training data

---

## **CROSS-CUTTING VALIDATION PRINCIPLES**

### **Temporal Validity**

**For empirical claims:**
- Technology: <3 years (fast-moving)
- Business practices: <5 years (moderate pace)
- Social/cultural: <7 years (slower change)
- Theoretical/foundational: Age less critical (but check if superseded)

**Always ask:**
- Has the context changed since this research?
- Are there more recent studies?
- Has the technology/policy/market evolved?

### **Statistical Literacy Checklist**

When evaluating quantitative claims:
- [ ] **Sample size:** Is N large enough? (Power analysis ideal)
- [ ] **Effect size:** Not just p-value—is the effect meaningful?
- [ ] **Confidence intervals:** Are they reported? How wide?
- [ ] **Base rates:** Are percentages contextualized? (50% increase from 2% to 3% is different from 50% to 75%)
- [ ] **Multiple comparisons:** If many tests, is correction applied?
- [ ] **Missing data:** How much? How handled?
- [ ] **Outliers:** Identified? Justification for inclusion/exclusion?

### **Qualitative Rigor Checklist**

When evaluating qualitative claims:
- [ ] **Sampling:** Strategy described? Saturation discussed?
- [ ] **Data collection:** Methods transparent? Trustworthiness ensured?
- [ ] **Analysis:** Coding process described? Inter-rater reliability if applicable?
- [ ] **Reflexivity:** Researcher's position acknowledged?
- [ ] **Triangulation:** Multiple data sources or methods?
- [ ] **Member checking:** Participants validated interpretations?
- [ ] **Alternative explanations:** Considered and addressed?

### **Conflict of Interest Assessment**

**High-risk conflicts:**
- Vendor-sponsored research on own products
- Consultants evaluating models they sell
- Academics with equity in companies studied
- Government research on own policies

**Questions to ask:**
- Who funded this research?
- Who stands to gain from these findings?
- Are conflicts disclosed?
- Is the methodology rigorous enough to overcome bias concerns?

**Note:** Conflict doesn't automatically invalidate research, but requires extra scrutiny.

---

## **VALIDATION DECISION TREE**

### **For AI-Driven Research: Step-by-Step Validation**

```
1. IDENTIFY THE CLAIM
   ↓
2. CHECK SOURCE TIER (use SOURCE_AUTHORITY_HIERARCHY)
   ↓
3. ASSESS EVIDENCE TYPE
   - Systematic review? → Strongest
   - Experimental? → Strong
   - Observational? → Moderate
   - Opinion? → Weakest
   ↓
4. EVALUATE METHODOLOGY
   - Use topic-specific must-haves (above)
   - Check for red flags
   ↓
5. TEST LOGICAL COHERENCE
   - Premises clear?
   - Conclusion follows?
   - Fallacies present?
   ↓
6. VERIFY CONTEXTUAL FIT
   - Temporal match?
   - Geographic match?
   - Sectoral match?
   ↓
7. ASSIGN CONFIDENCE LEVEL
   - HIGH: Tier 1 source + strong evidence + rigorous methods + good context fit
   - MODERATE: Tier 1-2 source + adequate evidence + acceptable methods + decent fit
   - LOW: Tier 2-3 source + weak evidence + methodological concerns + poor fit
   - INSUFFICIENT: Cannot validate; need more sources
   ↓
8. DECIDE: USE / USE WITH CAVEATS / REJECT / INVESTIGATE FURTHER
```

---

## **CONFIDENCE SCORING SYSTEM**

### **5-Level Scale for Claims**

**Level 5 (Highest Confidence):**
- Multiple Tier 1 sources converge
- Systematic review or meta-analysis available
- Rigorous methodology
- Good contextual fit
- Recent evidence
- **Action:** State confidently

**Level 4 (High Confidence):**
- At least one Tier 1 source
- Strong methodology
- Corroborated by Tier 2 sources
- Acceptable contextual fit
- **Action:** State with minor caveats

**Level 3 (Moderate Confidence):**
- Tier 1 source with limitations OR convergent Tier 2 sources
- Adequate methodology
- Some contextual mismatch
- **Action:** State with clear caveats about limitations

**Level 2 (Low Confidence):**
- Only Tier 2-3 sources
- Methodological concerns
- Significant contextual mismatch
- **Action:** Present as tentative/emerging/debated

**Level 1 (Insufficient):**
- Only Tier 3 sources
- Major methodological flaws
- Contradictory evidence
- Poor contextual fit
- **Action:** Do not make claim; flag for further investigation

---

## **DOCUMENTATION TEMPLATE**

### **For Each Validated Claim**

```
CLAIM: [State the claim clearly]

SOURCES:
- [Source 1] (Tier X)
- [Source 2] (Tier Y)

EVIDENCE TYPE: [Systematic review / Experimental / Survey / Case study / Opinion]

METHODOLOGY ASSESSMENT:
- Strengths: [What's done well]
- Limitations: [Weaknesses identified]
- Red flags: [Any present? List or "None"]

LOGICAL COHERENCE: [Sound / Has issues: [specify]]

CONTEXTUAL FIT:
- Temporal: [Match / Mismatch: specify]
- Geographic: [Match / Mismatch: specify]
- Sectoral: [Match / Mismatch: specify]

CONFIDENCE LEVEL: [1-5]

DECISION: [Use / Use with caveats / Reject / Investigate further]

NOTES: [Any additional context]
```

---

## CANONICAL UPDATE SCHEMA

> **Scope:** This section defines the machine-executable contract for updating this document.
> **Consumer:** PROMPT_UPDATE_VALIDATION_CHECKLIST (Research subsystem).
> **Authority:** Schema defined by Knowledge Base. Execution by Research.
> **Changes to this schema:** Must be approved by KB-dev and communicated to research-dev via DL entry.

---

### DOCUMENT ARCHITECTURE

The CVC has two distinct layers. Understanding the boundary between them determines what Research can update autonomously and what requires KB-dev involvement.

| Layer | What it contains | Who can modify |
|-------|-----------------|----------------|
| **Universal Framework** | Four Pillars, Evidence Hierarchy, Methodological Rigor, Logical Coherence, Contextual Validity, Cross-Cutting Principles, Confidence Scoring, Decision Tree | KB-dev only |
| **Topic-Specific Criteria** | Sections 1–7 (Digitalization, Complex Systems, etc.) — Key Distinctions, Common Misunderstandings, Methodological Must-Haves, Red Flags per topic | Research (via UPDATE_VALIDATION_CHECKLIST) |

Research may add, update, or extend Topic-Specific Criteria sections. Research must NOT modify the Universal Framework.

---

### FIELD SPECIFICATION: TOPIC-SPECIFIC CRITERIA SECTION

Every topic section must contain exactly these four subsections, in this order:

#### Mandatory Subsections

| Subsection | Purpose | Minimum content |
|------------|---------|-----------------|
| `Key Conceptual Distinctions` | Define critical terms that must be used correctly | ≥2 distinctions |
| `Common Misunderstandings` | Document frequent errors researchers and AI agents make | ≥3 misunderstandings |
| `Methodological Must-Haves` | Checklist of minimum requirements for rigorous claims | ≥4 checklist items in `[ ]` format |
| `Red Flags` | Specific warning signs for this topic | ≥4 red flags as bullet list |

#### Subsection Format Spec

```markdown
### [N]. [TOPIC NAME]

### Key Conceptual Distinctions

**Critical to distinguish:**
- **[Term A]:** [Definition]
- **[Term B]:** [Definition]
[...]

**[Additional distinction group if needed]**

**Confusion between [X] and [Y] = RED FLAG**

### Common Misunderstandings

- **[Misunderstanding label]:** [Explanation of why it's wrong and what the correct framing is]
- **[Misunderstanding label]:** [Explanation]
[Minimum 3 entries]

### Methodological Must-Haves

For claims about [topic]:
- [ ] [Requirement 1]
- [ ] [Requirement 2]
[Minimum 4 checklist items]

### Red Flags

- [Specific warning sign — actionable and observable]
- [Specific warning sign]
[Minimum 4 entries]
```

---

### PROCEDURE A: ADD A NEW TOPIC-SPECIFIC CRITERIA SECTION

Use when a research project encounters a topic not yet covered in this document.

**Checklist:**

```
[ ] 1. Verify the topic genuinely requires specific validation criteria
         - Generic topics (e.g., "statistics") are covered by Universal Framework — do not add
         - Proceed only for specialized domains with distinct conceptual traps
[ ] 2. Create section using the FIELD SPECIFICATION template above
[ ] 3. Populate ALL four mandatory subsections with minimum content
[ ] 4. Assign section number (next integer after last existing topic section)
[ ] 5. Add cross-reference note: "See also: [related Universal Framework section]"
[ ] 6. Update document VERSION LOG: note new topic section, version bump (minor: X.Y → X.Y+1)
[ ] 7. NOTIFY KB-DEV via DL entry: new topic section added, name, number, brief rationale
```

---

### PROCEDURE B: UPDATE AN EXISTING TOPIC-SPECIFIC CRITERIA SECTION

Use when a research project identifies gaps, errors, or new patterns in an existing section.

**Permitted updates (Research autonomous):**

```
[ ] Add new Key Conceptual Distinctions (emerging terminology)
[ ] Add new Common Misunderstandings (patterns observed in research)
[ ] Add new Methodological Must-Haves (requirements identified in practice)
[ ] Add new Red Flags (warning signs found during validation)
[ ] Correct factual errors in existing items (with justification note)
```

**Not permitted without KB-dev approval:**

```
[ ] Remove existing items (mark as DEPRECATED instead — see Procedure C)
[ ] Rename or restructure subsections
[ ] Merge two topic sections
[ ] Split one topic section into two
```

**Update execution:**

```
[ ] 1. Add new items to the appropriate subsection
[ ] 2. For each addition, append inline note: [Added vX.Y, Mon YYYY — brief rationale]
[ ] 3. Update VERSION LOG: describe what was added and why
[ ] 4. No KB-dev notification required for additive updates to existing sections
```

---

### PROCEDURE C: DEPRECATE AN ITEM WITHIN A SECTION

Use when an existing item is found to be incorrect, outdated, or superseded.

**Do NOT delete items.** Mark as deprecated:

```markdown
- ~~[Original item text]~~ **[DEPRECATED vX.Y — reason: [brief explanation]]**
```

```
[ ] 1. Apply strikethrough + DEPRECATED tag as above
[ ] 2. If a replacement item is needed, add it as a new entry in the same subsection
[ ] 3. Update VERSION LOG
[ ] 4. If deprecated item is a Key Conceptual Distinction: NOTIFY KB-DEV via DL entry
         (Deprecating distinctions can affect evidence standards across projects)
```

---

### PROCEDURE D: UPDATE CONFIDENCE SCORING OR DECISION TREE

These belong to the Universal Framework layer.

```
[ ] Research must NOT modify these sections autonomously
[ ] If Research identifies a gap or inconsistency: document in a DL entry addressed to KB-dev
[ ] KB-dev evaluates and implements if appropriate
```

---

### KB-DEV NOTIFICATION TRIGGERS

| Change Type | Why |
|-------------|-----|
| New topic-specific section added | KB tracks schema evolution; ensures consistency with SAH topics |
| Key Conceptual Distinction deprecated | High-impact — affects claim validation across projects |
| Any change to Universal Framework sections | KB-only territory |
| Changes to this schema section | Requires research-dev alignment |
| Topic section split or merged | Structural change requires KB approval |

Changes NOT requiring notification: adding items within existing topic sections (Misunderstandings, Must-Haves, Red Flags), correcting minor factual errors, updating VERSION LOG.

---

### CONSISTENCY REQUIREMENT: SAH ↔ CVC TOPIC ALIGNMENT

Topics covered in both documents should remain aligned. When Research adds a new topic to SAH, it should evaluate whether a corresponding topic-specific criteria section is needed in CVC, and vice versa.

**Current alignment status (as of v1.1):**

| Topic | In SAH | In CVC |
|-------|--------|--------|
| Digitalization & Digital Transformation | ✅ Section 1 | ✅ Section 1 |
| Complex Systems Analysis | ✅ Section 2 | ✅ Section 2 |
| Systemic Investing | ✅ Section 2.1 | ✅ Section 2.1 |
| Business Management & Strategy | ✅ Section 3 | ✅ Section 3 |
| Technology Market Analysis | ✅ Section 4 | ✅ Section 4 |
| Culture-Technology Relationships | ✅ Section 5 | ✅ Section 5 |
| Entrepreneurship & Investor Relations | ✅ Section 6 | ✅ Section 6 |
| Computational Literature & AI Authorship | ✅ Section 7 | ✅ Section 7 |

If a new topic is added to one document but not the other, document the reason explicitly in the VERSION LOG.


---

## **VERSION LOG**

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | Jan 24, 2026 | Initial creation: Separated from SOURCE_AUTHORITY_HIERARCHY, created universal validation framework, added topic-specific criteria, developed decision tree and confidence scoring system |
| 1.1 | Feb 22, 2026 | Added CANONICAL UPDATE SCHEMA section: document architecture (Universal vs Topic-Specific layers), field specification for topic sections, procedures A–D (add section, update section, deprecate item, Universal Framework protocol), KB-dev notification triggers, SAH↔CVC alignment table |

---

**END OF DOCUMENT**
