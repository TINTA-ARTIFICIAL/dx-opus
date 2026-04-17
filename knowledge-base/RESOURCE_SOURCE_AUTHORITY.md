---
id:          RESOURCE_SOURCE_AUTHORITY
type:        RESOURCE
subsystem:   KNOWLEDGE_BASE
version:     2.2
status:      ACTIVE
created:     2025-09-01
updated:     2026-04-16
owner_chat:  knowledge-base-dev
---

## CHANGELOG

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| v1.0 | 2025-09-01 | JM | Initial creation. Living repository of authoritative sources organized by research topic. |
| v2.0 | 2026-01-24 | JM | Complete restructure: separated from CLAIM_VALIDATION_CRITERIA, added explicit Tier Classification Criteria, Search Strategy sections, Evidence Sufficiency Guidelines, enhanced metadata and review triggers, AI-executable criteria. All topics restructured. |
| v2.1 | 2026-02-22 | JM | Added CANONICAL UPDATE SCHEMA section: field specification for source entries (mandatory/optional fields, controlled Type vocabulary), procedures A–D (add source, add topic, reclassify, deprecate), KB-dev notification triggers. Schema only — no topic content changed. |
| v2.2 | 2026-04-16 | JM | Add YAML header. Content unchanged. |

---

# **SOURCE AUTHORITY HIERARCHY**

**Version:** 2.1  
**Date:** February 22, 2026  
**Purpose:** Global knowledge base of authoritative sources across research topics  
**Scope:** Cross-project resource (not tied to single research report)

---

## **DOCUMENT OVERVIEW**

### **What This Is**

A living repository of authoritative sources organized by research topic, serving as the foundation for deep research across all "Tinta Artificial" projects.

### **What This Is NOT**

* A validation checklist for specific claims (see CLAIM_VALIDATION_CRITERIA)
* A one-time document for a single project
* A static list (this evolves with each research cycle)

### **Key Principles**

1. **Cumulative Knowledge:** Grows with each project
2. **Explicit Criteria:** Every Tier classification is justified
3. **Temporal Awareness:** Sources have review dates and decay mechanisms
4. **AI-Executable:** Criteria are specific enough for automated application
5. **Merge-Friendly:** Supports updates from multiple research streams

---

## **TIER CLASSIFICATION SYSTEM**

### **Tier 1: Highest Authority**

**Definition:** Sources with maximum credibility, rigor, and independence for establishing foundational claims.

**Quantifiable Criteria (must meet 4 of 6):**

- [ ] **Peer Review:** Independent editorial board with recognized field experts
- [ ] **Impact Metrics:** 
  - Journals: h-index ≥50 OR Impact Factor ≥3.0
  - Institutions: Cited as authoritative by 3+ Tier 1 sources
  - Reports: Published by intergovernmental org (UN, OECD, World Bank, EU)
- [ ] **Methodological Transparency:** Full methods section, data availability statement
- [ ] **Editorial Independence:** 
  - No vendor sponsorship
  - Conflicts of interest disclosed
  - Non-advocacy mission
- [ ] **Track Record:** ≥10 years of sustained quality in the field
- [ ] **Cross-Validation:** Referenced as authoritative in other Tier 1 publications

**Typical Source Types:**
* Top-tier academic journals (Nature, Science, PNAS, field-specific top journals)
* Major institutional reports (OECD, World Bank, IMF, EU Commission)
* Long-established research institutions (MIT, Stanford, Oxford research centers)
* Systematic reviews and meta-analyses in Tier 1 journals

**Currency Guidelines:**
* Prefer sources <5 years for empirical claims
* Foundational/theoretical work can be older if still cited
* Check for updates/retractions

---

### **Tier 2: Industry/Professional Authority**

**Definition:** Credible sources with strong empirical basis but less academic rigor or potential commercial orientation.

**Quantifiable Criteria (must meet 3 of 5):**

- [ ] **Methodology Disclosure:** Clear description of research methods
- [ ] **Industry Recognition:** 
  - Cited by Tier 1 sources OR
  - Recognized by professional associations OR
  - Regular publication cadence (quarterly/annual) for ≥5 years
- [ ] **Empirical Grounding:** 
  - Sample sizes disclosed
  - Data sources identified
  - Statistical methods described
- [ ] **Quality Control:** 
  - Internal review process
  - Corrections/updates published when needed
- [ ] **Bias Acknowledgment:** 
  - Potential conflicts noted
  - Limitations discussed

**Typical Source Types:**
* Consulting firm research (McKinsey, BCG, Bain, Deloitte, PwC)
* Industry analyst reports (Gartner, Forrester, IDC)
* Professional association publications
* Trade journals with editorial standards
* Think tank reports (Brookings, RAND)

**Currency Guidelines:**
* Prefer <3 years (industry insights age faster)
* Always check for updated editions
* Verify data hasn't been superseded

---

### **Tier 3: Specialized/Emerging Sources**

**Definition:** Valuable sources for niche insights, emerging trends, or gaps not covered by Tier 1/2, but with limitations.

**Quantifiable Criteria (must meet 2 of 4):**

- [ ] **Unique Value:** 
  - Fills gap not covered by higher tiers
  - Specialized expertise demonstrated
  - Novel perspective or methodology
- [ ] **Some Rigor:** 
  - Methods described (even if informal)
  - Evidence provided (even if anecdotal)
  - Logical argumentation
- [ ] **Transparency:** 
  - Author credentials stated
  - Limitations acknowledged
  - Sources cited
- [ ] **Corroboration Potential:** 
  - Claims are verifiable
  - Cross-reference with other sources possible

**Typical Source Types:**
* Emerging researchers/early career academics
* Practitioner case studies
* Specialized niche publications
* Recent startups/initiatives in the space
* Conference papers (non-peer-reviewed)
* High-quality blog posts from recognized experts

**Currency Guidelines:**
* Typically <2 years (often time-sensitive)
* Verify author is still active in field
* Check if claims have been validated by higher tiers since publication

---

## **EVIDENCE SUFFICIENCY GUIDELINES**

### **For AI-Driven Research: When to Stop Searching**

**STRONG Claim (can state confidently):**
* 2+ Tier 1 sources in agreement, OR
* 1 Tier 1 + 4+ Tier 2 sources convergent, OR
* Systematic review/meta-analysis (Tier 1 secondary source)

**MODERATE Claim (can state with caveats):**
* 1 Tier 1 source, OR
* 3+ Tier 2 sources convergent, OR
* 1 Tier 1 + conflicting evidence, but Tier 1 is more recent/rigorous

**TENTATIVE Claim (present as emerging/debated):**
* Multiple Tier 2/3 sources pointing same direction, OR
* Single Tier 1 with significant limitations noted, OR
* Field is too new for Tier 1 coverage

**INSUFFICIENT Evidence (do not make claim):**
* Only Tier 3 sources
* Contradictory Tier 1 sources without clear resolution
* Outdated sources (>10 years) with no recent validation

### **Conflict Resolution Protocol**

**When Tier 1 sources contradict:**
1. Check publication dates (prefer more recent)
2. Compare methodologies (prefer more rigorous)
3. Look for meta-analysis or systematic review
4. Present both perspectives with assessment of evidence quality
5. Flag for human review

**When Tier 2 contradicts Tier 1:**
* Default to Tier 1 unless:
  - Tier 2 is significantly more recent (>5 year gap)
  - Tier 2 uses superior methodology for specific question
  - Tier 2 has access to proprietary data Tier 1 lacks

**When multiple Tier 2/3 contradict single Tier 1:**
* Investigate whether they're addressing exactly same question
* If yes: still default to Tier 1 but note controversy
* Flag for potential deeper investigation

---

## **SEARCH STRATEGY FRAMEWORK**

### **For Each Topic Below**

Each topic section includes:

**Primary Databases:**
* Where to search first (Google Scholar, Scopus, specific databases)
* Recommended search strings

**Search Operators:**
* Core Boolean queries
* Exclusion terms
* Time filters

**Saturation Criteria:**
* When has enough searching been done?
* Quantifiable stopping rules

**Grey Literature Strategy:**
* Non-academic sources to check
* Conferences, white papers, technical reports

---

## **TOPIC SECTIONS**

### **Structure of Each Topic**

```
## [TOPIC NUMBER]. [TOPIC NAME]

### Metadata
- **Last Updated:** [Date]
- **Review Trigger Date:** [Date + 12 months]
- **Status:** Active / Needs Review / Deprecated
- **Parent Topic:** [if subtopic]

### Tier 1 Sources
- [Source Name]
  - **Type:** Journal/Institution/Report
  - **Justification:** [Which criteria met]
  - **Added:** [Date, Version]
  - **Currency Note:** [Any temporal considerations]

[Repeat for each Tier 1 source]

### Tier 2 Sources
[Same structure]

### Tier 3 Sources
[Same structure]

### Search Strategy
**Primary Databases:** [List]
**Core Search String:** [Boolean query]
**Exclusions:** [Terms to exclude]
**Time Filter:** [Typical range]
**Grey Literature:** [Where to check]

**Saturation Criteria:**
- [ ] Found 3+ Tier 1 sources on specific question
- [ ] New searches returning same sources (diminishing returns)
- [ ] Coverage of major perspectives in field

### Related Topics
[Cross-references to other sections]
```

---

## **1. DIGITALIZATION & DIGITAL TRANSFORMATION**

### Metadata
- **Last Updated:** January 24, 2026
- **Review Trigger Date:** January 24, 2027
- **Status:** Active
- **Parent Topic:** None (top-level)

### Tier 1 Sources

**Academic Journals**
- **Journal of Information Technology**
  - **Type:** Academic Journal
  - **Justification:** h-index 89, Impact Factor 5.9, peer-reviewed, 35+ years track record
  - **Added:** v2.0, Jan 2026
  - **Currency Note:** Quarterly publication, prioritize 2020+

- **MIS Quarterly**
  - **Type:** Academic Journal
  - **Justification:** h-index 201, Impact Factor 7.1, top IS journal, independent editorial
  - **Added:** v2.0, Jan 2026
  - **Currency Note:** Check most recent issues first

- **MIT Sloan Management Review**
  - **Type:** Practitioner-Academic Hybrid
  - **Justification:** 60+ year track record, rigorous peer review, MIT institutional backing, cited by Tier 1 academic journals
  - **Added:** v2.0, Jan 2026
  - **Currency Note:** Quarterly, check past 3 years

**Institutional Reports**
- **OECD Digital Economy Papers**
  - **Type:** Intergovernmental Organization Reports
  - **Justification:** OECD authority, full methodology disclosure, international scope, policy impact
  - **Added:** v2.0, Jan 2026
  - **Currency Note:** Annual/biannual updates

- **European Commission Digital Single Market Reports**
  - **Type:** Government/Institutional
  - **Justification:** EU official source, comprehensive data, policy-relevant, transparent methodology
  - **Added:** v2.0, Jan 2026
  - **Currency Note:** Critical for Spanish/EU context

**Systematic Reviews**
- **Harvard Business Review (Digital Transformation Section)**
  - **Type:** Business Journal
  - **Justification:** Editorial rigor, case study quality, practitioner relevance, academic contributors
  - **Added:** v2.0, Jan 2026
  - **Currency Note:** Focus on case studies from 2018+

### Tier 2 Sources

**Industry Research**
- **McKinsey Digital Reports & Surveys**
  - **Type:** Consulting Firm Research
  - **Justification:** Large sample sizes, disclosed methodology, regular cadence, industry-recognized
  - **Added:** v2.0, Jan 2026
  - **Currency Note:** Annual reports, prefer latest edition
  - **Limitation Note:** Potential client bias, cross-check claims

- **Gartner Research Reports**
  - **Type:** Industry Analyst
  - **Justification:** Market leader, methodology disclosed, technology focus, regular updates
  - **Added:** v2.0, Jan 2026
  - **Currency Note:** Magic Quadrants updated annually
  - **Limitation Note:** Vendor-sponsored content exists, verify independence

- **IDC Technology Forecasts**
  - **Type:** Market Research
  - **Justification:** Quantitative data, market sizing methodology, track record
  - **Added:** v2.0, Jan 2026
  - **Currency Note:** Quarterly updates

- **PwC Digital Transformation Surveys**
  - **Type:** Consulting Firm Research
  - **Justification:** Large sample global surveys, methodology disclosed
  - **Added:** v2.0, Jan 2026
  - **Currency Note:** Annual CEO/CIO surveys

- **Deloitte Tech Trends Reports**
  - **Type:** Consulting Firm Research
  - **Justification:** Annual comprehensive analysis, practitioner insights
  - **Added:** v2.0, Jan 2026
  - **Currency Note:** Annual publication, use latest year

**Multi-Stakeholder Organizations**
- **World Economic Forum Digital Reports**
  - **Type:** International Organization
  - **Justification:** Multi-stakeholder input, global scope, policy relevance
  - **Added:** v2.0, Jan 2026
  - **Currency Note:** Annual reports

### Tier 3 Sources

**Specialized Technical**
- **IEEE Publications on Digital Systems**
  - **Type:** Technical Society
  - **Justification:** Engineering perspective, technical depth, peer-review
  - **Added:** v2.0, Jan 2026
  - **Use Case:** Technical implementation details
  - **Currency Note:** Favor conference proceedings <2 years

- **ACM Computing Surveys**
  - **Type:** Technical Society
  - **Justification:** Computer science depth, survey methodology
  - **Added:** v2.0, Jan 2026
  - **Use Case:** Technical architecture questions

**Regional Sources**
- **Spanish Digital Agenda Reports (Agenda Digital 2026)**
  - **Type:** Government Strategy Document
  - **Justification:** Official Spanish policy, local market data
  - **Added:** v2.0, Jan 2026
  - **Use Case:** Spanish regulatory/market context
  - **Currency Note:** Check for latest version

### Search Strategy

**Primary Databases:**
- Google Scholar (broad coverage)
- Scopus (academic focus)
- Web of Science (citation tracking)
- OECD iLibrary (policy reports)
- EU Open Data Portal (European data)

**Core Search String:**
```
("digital transformation" OR "digitalization" OR "digitization") 
AND (business OR organization OR enterprise)
AND (framework OR model OR maturity OR adoption)
NOT (personal OR consumer OR individual)
```

**Time Filter:** 2020-2026 (prefer last 5 years for empirical; all time for theoretical)

**Exclusions:**
- "digital marketing" (unless specifically relevant)
- "social media" (separate topic)
- Consumer-focused tech

**Grey Literature:**
- MIT Initiative on the Digital Economy reports
- Stanford Digital Economy Lab
- Oxford Internet Institute publications
- Capgemini Research Institute

**Saturation Criteria:**
- [ ] Found 3+ Tier 1 academic sources on specific sub-question
- [ ] Found 2+ recent (2023+) Tier 1 institutional reports
- [ ] Cross-checked with major consulting firms (McKinsey, BCG, Deloitte)
- [ ] Spanish/EU specific data located if relevant
- [ ] Diminishing returns (new searches return same sources)

### Related Topics
- See: **4. Technology Market Analysis** (for vendor landscape)
- See: **3. Business Management & Strategy** (for organizational change)
- See: **2. Complex Systems Analysis** (for systemic transformation)

---

## **2. COMPLEX SYSTEMS ANALYSIS**

### Metadata
- **Last Updated:** January 24, 2026
- **Review Trigger Date:** January 24, 2027
- **Status:** Active
- **Parent Topic:** None (top-level)

### Tier 1 Sources

**Academic Journals**
- **Systems Engineering (INCOSE Journal)**
  - **Type:** Academic Journal
  - **Justification:** Official INCOSE publication, peer-reviewed, h-index 45, field authority
  - **Added:** v2.0, Jan 2026
  - **Currency Note:** Quarterly

- **Complexity Science (Various)**
  - **Type:** Academic Field
  - **Justification:** Includes "Complexity", "Journal of Complex Systems", peer-reviewed, specialized
  - **Added:** v2.0, Jan 2026
  - **Currency Note:** Check Santa Fe Institute working papers

- **Systems Research and Behavioral Science**
  - **Type:** Academic Journal
  - **Justification:** 40+ year track record, peer-reviewed, interdisciplinary
  - **Added:** v2.0, Jan 2026

**Institutional Publications**
- **Santa Fe Institute Publications**
  - **Type:** Research Institute
  - **Justification:** World leader in complexity science, working papers, books, rigorous methodology
  - **Added:** v2.0, Jan 2026
  - **Currency Note:** Check recent working paper series

- **MIT Systems journals**
  - **Type:** University Research
  - **Justification:** MIT institutional backing, Engineering Systems Division, peer-reviewed
  - **Added:** v2.0, Jan 2026

### Tier 2 Sources

**Standards & Methodological Guides**
- **INCOSE Systems Engineering Handbook**
  - **Type:** Professional Handbook
  - **Justification:** Field standard, comprehensive, regularly updated, practitioner authority
  - **Added:** v2.0, Jan 2026
  - **Currency Note:** Check for latest edition (currently 5th edition)

- **SEBoK (Systems Engineering Body of Knowledge)**
  - **Type:** Knowledge Base
  - **Justification:** Community-maintained, comprehensive, INCOSE-endorsed
  - **Added:** v2.0, Jan 2026
  - **Currency Note:** Online resource, continuously updated

- **ISO/IEC 15288**
  - **Type:** International Standard
  - **Justification:** ISO standard, international consensus, technical authority
  - **Added:** v2.0, Jan 2026
  - **Currency Note:** Check for amendments

**Research Centers**
- **Carnegie Mellon Systems Engineering Guides**
  - **Type:** University Research Center
  - **Justification:** SEI (Software Engineering Institute) authority, methodology development
  - **Added:** v2.0, Jan 2026

### Tier 3 Sources

**Application Domains**
- **Infrastructure Systems Research**
  - **Type:** Specialized Research
  - **Justification:** Application-specific insights, case studies
  - **Added:** v2.0, Jan 2026
  - **Use Case:** Building/infrastructure complexity

- **Organizational Complexity Studies**
  - **Type:** Cross-disciplinary
  - **Justification:** Human systems perspective
  - **Added:** v2.0, Jan 2026

- **Network Science Publications**
  - **Type:** Specialized Field
  - **Justification:** Mathematical rigor for network analysis
  - **Added:** v2.0, Jan 2026
  - **Use Case:** Graph-based system modeling

### Search Strategy

**Primary Databases:**
- Google Scholar
- IEEE Xplore (engineering systems)
- ACM Digital Library
- INCOSE Digital Library
- Santa Fe Institute repository

**Core Search String:**
```
("complex systems" OR "systems engineering" OR "systems thinking")
AND (emergence OR "feedback loops" OR "system dynamics")
AND (modeling OR analysis OR design)
```

**Time Filter:** 2018-2026 (prefer recent for applications; foundational theory can be older)

**Grey Literature:**
- Santa Fe Institute working papers
- INCOSE International Symposium proceedings
- MIT Engineering Systems Division reports
- Systems Innovation Network

**Saturation Criteria:**
- [ ] Found 2+ Tier 1 theoretical sources
- [ ] Found methodology standard (INCOSE Handbook or ISO)
- [ ] Application domain examples identified
- [ ] Foundational texts referenced (if needed for theory)

### Related Topics
- See: **2.1 Systemic Investing** (financial application)
- See: **1. Digitalization** (socio-technical systems)

---

## **2.1. SYSTEMIC INVESTING**

### Metadata
- **Last Updated:** January 24, 2026
- **Review Trigger Date:** January 24, 2027
- **Status:** Active
- **Parent Topic:** 2. Complex Systems Analysis

### Tier 1 Sources

**Academic Journals**
- **Environmental Innovation and Societal Transitions**
  - **Type:** Academic Journal
  - **Justification:** Leading journal on sustainability transitions, peer-reviewed, Impact Factor 7.2
  - **Added:** v2.0, Jan 2026
  - **Currency Note:** Focus on 2020+ for current approaches

**Thought Leadership Publications**
- **TransCap Initiative White Papers**
  - **Type:** Research Initiative
  - **Justification:** Pioneer in systemic investing methodology, practitioner-academic collaboration, transparent framework
  - **Added:** v2.0, Jan 2026
  - **Currency Note:** Check latest publications

- **TWIST Reports (Transformative Investment in Systems Thinking)**
  - **Type:** Research Reports
  - **Justification:** Dedicated systemic investing research, case studies, methodology development
  - **Added:** v2.0, Jan 2026

**Academic Research Centers**
- **Santa Fe Institute (Complexity Economics)**
  - **Type:** Research Institute
  - **Justification:** Theoretical foundation for complex systems in economics
  - **Added:** v2.0, Jan 2026
  - **Use Case:** Theoretical grounding

- **Oxford Martin School (Finance Research)**
  - **Type:** University Research Center
  - **Justification:** Systems thinking applied to finance, academic rigor
  - **Added:** v2.0, Jan 2026

**Key Authors (Tier 1 when primary source)**
- **Katherine Collins** publications
  - **Type:** Thought Leader
  - **Justification:** Pioneer in systems thinking for investing, "The Nature of Investing" foundational text
  - **Added:** v2.0, Jan 2026

- **Mariana Mazzucato** publications on mission-oriented finance
  - **Type:** Academic Thought Leader
  - **Justification:** UCL professor, influential on systems change finance, policy impact
  - **Added:** v2.0, Jan 2026

**Global Alliances**
- **Catalyst 2030 Publications**
  - **Type:** Multi-Stakeholder Alliance
  - **Justification:** Systems change focus, collaborative governance examples
  - **Added:** v2.0, Jan 2026

- **FEST (Finance for the Earth Systems Transitions)**
  - **Type:** Research Network
  - **Justification:** Academic-practitioner bridge, systemic finance focus
  - **Added:** v2.0, Jan 2026

### Tier 2 Sources

**Impact Investing Networks**
- **GIIN (Global Impact Investing Network) - Systems Change Reports**
  - **Type:** Industry Network
  - **Justification:** Market data, practitioner surveys, evolving toward systems focus
  - **Added:** v2.0, Jan 2026
  - **Limitation:** Traditional impact focus, verify systemic framing

- **TIIP (Toniic Institute for Impact Professionals)**
  - **Type:** Practitioner Network
  - **Justification:** Member-driven insights, case studies
  - **Added:** v2.0, Jan 2026

**Practitioner Guides**
- **Rockefeller Philanthropy Advisors - Systems Change Guides**
  - **Type:** Foundation Resource
  - **Justification:** Practical frameworks, case studies, funder perspective
  - **Added:** v2.0, Jan 2026

- **CSP's Investor's Guide to Systemic Change**
  - **Type:** Practitioner Guide
  - **Justification:** Operational frameworks, investor toolkit
  - **Added:** v2.0, Jan 2026

**Development Finance**
- **World Bank - Systems Approach Reports**
  - **Type:** Multilateral Institution
  - **Justification:** Scale, data access, policy integration
  - **Added:** v2.0, Jan 2026
  - **Limitation:** Institutional constraints, verify systemic methodology

### Tier 3 Sources

**Emerging Initiatives**
- **Finance Innovation Lab Reports**
  - **Type:** UK-based Initiative
  - **Justification:** Experimental approaches, collaborative models
  - **Added:** v2.0, Jan 2026
  - **Use Case:** Emerging practices

**Academic Centers**
- **Utrecht University Centre for Sustainable Finance**
  - **Type:** University Center
  - **Justification:** European perspective, academic research
  - **Added:** v2.0, Jan 2026

- **University of Zurich Sustainable Finance**
  - **Type:** University Center
  - **Justification:** Swiss context, research output
  - **Added:** v2.0, Jan 2026

**Case Studies**
- **Pioneering Systemic Investing Initiatives**
  - **Type:** Case Documentation
  - **Justification:** Real-world application insights
  - **Added:** v2.0, Jan 2026
  - **Use Case:** Practical examples, lessons learned

**Media/Events**
- **Systems Thinking in Finance - Podcasts/Webinars**
  - **Type:** Multimedia Content
  - **Justification:** Thought leader interviews, emerging perspectives
  - **Added:** v2.0, Jan 2026
  - **Use Case:** Supplementary, verify claims with higher tiers

### Search Strategy

**Primary Databases:**
- Google Scholar
- SSRN (for finance/economics papers)
- Impact investing networks (GIIN, TIIP)
- Sustainability transitions journals

**Core Search String:**
```
("systemic investing" OR "systems change finance" OR "transformative investment")
AND (leverage points OR "feedback loops" OR emergence OR "complex systems")
NOT (ESG OR "impact investing" alone without systems framing)
```

**Alternative Search:**
```
("systems thinking" AND (investment OR finance OR capital))
AND (transformation OR transition OR "systems change")
```

**Time Filter:** 2018-2026 (field is emerging, prioritize recent)

**Grey Literature:**
- TransCap Initiative website
- Catalyst 2030 resources
- FEST network publications
- Systems Innovation conferences

**Saturation Criteria:**
- [ ] Found 2+ Tier 1 theoretical/framework sources
- [ ] Found 3+ case studies or practitioner examples
- [ ] Covered major perspectives (academic, practitioner, philanthropic)
- [ ] Distinguished from traditional impact/ESG

### Related Topics
- See: **2. Complex Systems Analysis** (theoretical foundation)
- See: **6. Entrepreneurship & Investor Relations** (investment mechanics)

---

## **3. BUSINESS MANAGEMENT & STRATEGY**

### Metadata
- **Last Updated:** January 24, 2026
- **Review Trigger Date:** January 24, 2027
- **Status:** Active
- **Parent Topic:** None (top-level)

### Tier 1 Sources

**Academic Journals**
- **Strategic Management Journal**
  - **Type:** Academic Journal
  - **Justification:** h-index 258, top strategy journal, peer-reviewed, 40+ years
  - **Added:** v2.0, Jan 2026

- **Academy of Management Journal**
  - **Type:** Academic Journal
  - **Justification:** h-index 276, premier management research, rigorous peer review
  - **Added:** v2.0, Jan 2026

- **Harvard Business Review**
  - **Type:** Practitioner-Academic
  - **Justification:** 100+ year track record, case quality, academic contributors
  - **Added:** v2.0, Jan 2026
  - **Currency Note:** Prioritize research-based articles

- **MIT Sloan Management Review**
  - **Type:** Practitioner-Academic
  - **Justification:** MIT backing, research-to-practice bridge, editorial rigor
  - **Added:** v2.0, Jan 2026

- **California Management Review**
  - **Type:** Academic Journal
  - **Justification:** UC Berkeley, innovation focus, peer-reviewed
  - **Added:** v2.0, Jan 2026

### Tier 2 Sources

**Consulting Firm Research**
- **McKinsey Quarterly**
  - **Type:** Consulting Publication
  - **Justification:** Research depth, large sample surveys, methodology disclosure
  - **Added:** v2.0, Jan 2026
  - **Limitation:** Client perspective, cross-check

- **Boston Consulting Group Reports**
  - **Type:** Consulting Research
  - **Justification:** Innovation focus, data-driven, regular publications
  - **Added:** v2.0, Jan 2026

- **Bain & Company Insights**
  - **Type:** Consulting Research
  - **Justification:** Management tools, survey data
  - **Added:** v2.0, Jan 2026

- **PwC Strategy& Publications**
  - **Type:** Consulting Research
  - **Justification:** Strategy focus, global scope
  - **Added:** v2.0, Jan 2026

### Tier 3 Sources

**Spanish/Regional Business Schools**
- **IESE Business School Publications**
  - **Type:** Business School Research
  - **Justification:** Spanish context, case studies, European perspective
  - **Added:** v2.0, Jan 2026
  - **Use Case:** Spanish/European business culture

- **ESADE Research**
  - **Type:** Business School Research
  - **Justification:** Barcelona-based, innovation focus
  - **Added:** v2.0, Jan 2026

- **IE Business School Studies**
  - **Type:** Business School Research
  - **Justification:** Spanish market insights
  - **Added:** v2.0, Jan 2026

- **Spanish Chamber of Commerce Reports**
  - **Type:** Business Organization
  - **Justification:** Local market data, SME focus
  - **Added:** v2.0, Jan 2026
  - **Use Case:** Spanish SME context

### Search Strategy

**Primary Databases:**
- Google Scholar
- JSTOR (business section)
- Business Source Complete (EBSCO)
- Spanish business school repositories

**Core Search String:**
```
(strategy OR "strategic management" OR "business model")
AND (innovation OR transformation OR change)
AND (framework OR model OR approach)
```

**Regional Filter (when needed):**
```
[base query] AND (Spain OR Spanish OR Europe OR European)
```

**Time Filter:** 2019-2026 (management evolves; 5-year window)

**Grey Literature:**
- Top business school working papers
- Consulting firm special reports
- Chamber of commerce surveys

**Saturation Criteria:**
- [ ] 2+ Tier 1 academic sources
- [ ] 2+ Tier 2 industry sources
- [ ] Spanish/EU context covered if relevant
- [ ] Empirical grounding verified

### Related Topics
- See: **1. Digitalization** (digital strategy)
- See: **6. Entrepreneurship** (startup strategy)

---

## **4. TECHNOLOGY MARKET ANALYSIS**

### Metadata
- **Last Updated:** January 24, 2026
- **Review Trigger Date:** January 24, 2027
- **Status:** Active
- **Parent Topic:** None (top-level)

### Tier 1 Sources

**Market Research Firms**
- **Gartner Magic Quadrants and Market Guides**
  - **Type:** Industry Analyst
  - **Justification:** Market standard, rigorous methodology, regular updates, vendor coverage
  - **Added:** v2.0, Jan 2026
  - **Currency Note:** Updated annually/quarterly by category
  - **Limitation:** Vendor-sponsored content exists, verify report type

- **IDC Market Research**
  - **Type:** Market Research Firm
  - **Justification:** Market sizing leader, quantitative rigor, forecast methodology disclosed
  - **Added:** v2.0, Jan 2026
  - **Currency Note:** Quarterly updates

- **Forrester Research Reports**
  - **Type:** Industry Analyst
  - **Justification:** Technology waves, total economic impact methodology, independent
  - **Added:** v2.0, Jan 2026
  - **Currency Note:** Annual wave reports, quarterly updates

**Financial Analysis**
- **Bloomberg Technology Reports**
  - **Type:** Financial News/Data
  - **Justification:** Real-time data, financial rigor, global coverage
  - **Added:** v2.0, Jan 2026
  - **Use Case:** Market movements, valuations

- **Reuters Technology Analysis**
  - **Type:** Financial News
  - **Justification:** News integrity, market coverage
  - **Added:** v2.0, Jan 2026

- **Financial Times Tech Section**
  - **Type:** Business Journalism
  - **Justification:** Editorial standards, in-depth analysis, European perspective
  - **Added:** v2.0, Jan 2026

### Tier 2 Sources

**Emerging Tech Tracking**
- **CB Insights Market Maps**
  - **Type:** Venture Intelligence
  - **Justification:** Startup tracking, visual market maps, funding data
  - **Added:** v2.0, Jan 2026
  - **Use Case:** Emerging tech, startup landscape

**Company Filings**
- **Public Company Investor Relations (10-K, Annual Reports)**
  - **Type:** Primary Financial Documents
  - **Justification:** Legal requirement for accuracy, detailed financials
  - **Added:** v2.0, Jan 2026
  - **Use Case:** Company-specific deep dives
  - **Currency Note:** Annual with quarterly updates

### Tier 3 Sources

**Regional Data**
- **European Commission Digital Economy Reports**
  - **Type:** Government/Institutional
  - **Justification:** EU market data, policy context
  - **Added:** v2.0, Jan 2026
  - **Use Case:** European market specifics

- **Spanish ONTSI (Observatorio Nacional de Tecnología y Sociedad)**
  - **Type:** Government Observatory
  - **Justification:** Spanish market data, digital economy metrics
  - **Added:** v2.0, Jan 2026
  - **Use Case:** Spanish market context

- **OECD Science, Technology and Innovation Indicators**
  - **Type:** Intergovernmental Data
  - **Justification:** International comparisons, methodology transparency
  - **Added:** v2.0, Jan 2026

### Search Strategy

**Primary Sources (Direct Access):**
- Gartner.com (requires subscription/access)
- IDC.com (reports available via business databases)
- CB Insights platform
- Company investor relations pages (public filings)

**Secondary Databases:**
- Google Scholar (for academic market analysis)
- Business databases (Factiva, Bloomberg Terminal if available)

**Core Search String:**
```
([technology category] OR [vendor name])
AND (market OR forecast OR adoption OR penetration)
AND (analysis OR report OR sizing)
```

**Time Filter:** 2023-2026 (markets move fast, prioritize <2 years)

**Saturation Criteria:**
- [ ] Found major analyst report (Gartner/IDC/Forrester)
- [ ] Cross-checked with financial news (Bloomberg/Reuters/FT)
- [ ] Verified with company filings if analyzing specific vendor
- [ ] Regional data if Spanish/EU context needed

### Related Topics
- See: **1. Digitalization** (technology adoption)
- See: **6. Entrepreneurship** (startup/VC landscape)

---

## **5. CULTURE-TECHNOLOGY RELATIONSHIPS**

### Metadata
- **Last Updated:** January 24, 2026
- **Review Trigger Date:** January 24, 2027
- **Status:** Active
- **Parent Topic:** None (top-level)

### Tier 1 Sources

**Academic Journals**
- **Journal of Computer-Mediated Communication**
  - **Type:** Academic Journal
  - **Justification:** h-index 138, peer-reviewed, 25+ years, field leader
  - **Added:** v2.0, Jan 2026

- **New Media & Society**
  - **Type:** Academic Journal
  - **Justification:** Impact Factor 6.9, cultural studies focus, peer-reviewed
  - **Added:** v2.0, Jan 2026

- **Information, Communication & Society**
  - **Type:** Academic Journal
  - **Justification:** Interdisciplinary, peer-reviewed, socio-technical focus
  - **Added:** v2.0, Jan 2026

- **Social Studies of Science**
  - **Type:** Academic Journal
  - **Justification:** STS field leader, critical perspective on technology
  - **Added:** v2.0, Jan 2026

- **Technology in Society**
  - **Type:** Academic Journal
  - **Justification:** Technology-society interface, interdisciplinary
  - **Added:** v2.0, Jan 2026

### Tier 2 Sources

**Cultural Studies Journals**
- **Cultural Anthropology Journals**
  - **Type:** Academic Field
  - **Justification:** Ethnographic rigor, cultural depth
  - **Added:** v2.0, Jan 2026
  - **Use Case:** Qualitative cultural analysis

- **Sociology of Technology Publications**
  - **Type:** Academic Subfield
  - **Justification:** Sociological lens on tech adoption
  - **Added:** v2.0, Jan 2026

**Regional Studies**
- **Regional Technology Adoption Studies**
  - **Type:** Geographic Research
  - **Justification:** Context-specific insights
  - **Added:** v2.0, Jan 2026

### Tier 3 Sources

**Spanish/European Context**
- **European Journal of Cultural Studies**
  - **Type:** Academic Journal
  - **Justification:** European perspective, peer-reviewed
  - **Added:** v2.0, Jan 2026
  - **Use Case:** European cultural context

- **Spanish Sociological Research Institutes**
  - **Type:** Research Institutions
  - **Justification:** Local insights, cultural specificity
  - **Added:** v2.0, Jan 2026
  - **Use Case:** Spanish cultural attitudes

- **Eurobarometer Surveys on Technology Attitudes**
  - **Type:** Survey Data
  - **Justification:** EU-wide data, regular methodology, public access
  - **Added:** v2.0, Jan 2026
  - **Use Case:** Quantitative cultural attitudes

### Search Strategy

**Primary Databases:**
- Google Scholar
- Communication & Mass Media Complete
- Sociological Abstracts
- Anthropology databases

**Core Search String:**
```
(culture OR cultural OR society OR social)
AND (technology OR digital OR "new media")
AND (adoption OR attitudes OR practices OR norms)
```

**Regional Filter:**
```
[base query] AND (Spain OR Spanish OR Europe OR European)
```

**Time Filter:** 2019-2026 (cultural attitudes shift; recent preferred)

**Saturation Criteria:**
- [ ] 2+ Tier 1 theoretical sources
- [ ] Regional data if Spanish/EU context
- [ ] Qualitative + quantitative mix
- [ ] Generational differences addressed if relevant

### Related Topics
- See: **1. Digitalization** (organizational culture)
- See: **5.1 Attention Economy** (if added as subtopic)

---

## **6. ENTREPRENEURSHIP & INVESTOR RELATIONS**

### Metadata
- **Last Updated:** January 24, 2026
- **Review Trigger Date:** January 24, 2027
- **Status:** Active
- **Parent Topic:** None (top-level)

### Tier 1 Sources

**Academic Journals**
- **Journal of Business Venturing**
  - **Type:** Academic Journal
  - **Justification:** h-index 148, top entrepreneurship journal, peer-reviewed
  - **Added:** v2.0, Jan 2026

- **Entrepreneurship Theory and Practice**
  - **Type:** Academic Journal
  - **Justification:** h-index 133, theory-practice bridge, rigorous
  - **Added:** v2.0, Jan 2026

- **Strategic Entrepreneurship Journal**
  - **Type:** Academic Journal
  - **Justification:** Strategy-entrepreneurship intersection, peer-reviewed
  - **Added:** v2.0, Jan 2026

- **Small Business Economics**
  - **Type:** Academic Journal
  - **Justification:** Empirical focus, international scope
  - **Added:** v2.0, Jan 2026

### Tier 2 Sources

**Industry Data**
- **NVCA (National Venture Capital Association) Reports**
  - **Type:** Industry Association (US)
  - **Justification:** VC industry data, quarterly reports, methodology disclosed
  - **Added:** v2.0, Jan 2026
  - **Limitation:** US-centric

- **PwC MoneyTree Reports**
  - **Type:** Industry Research
  - **Justification:** VC funding tracking, regular cadence, data transparency
  - **Added:** v2.0, Jan 2026

- **CB Insights Venture Funding Data**
  - **Type:** Venture Intelligence
  - **Justification:** Global coverage, real-time updates, visual analytics
  - **Added:** v2.0, Jan 2026

- **Crunchbase Market Reports**
  - **Type:** Startup Database/Analysis
  - **Justification:** Comprehensive startup data, funding rounds
  - **Added:** v2.0, Jan 2026
  - **Limitation:** Self-reported data, verify claims

### Tier 3 Sources

**Regional Spanish/European Sources**
- **ASCRI (Asociación Española de Capital Riesgo)**
  - **Type:** Spanish VC Association
  - **Justification:** Spanish market data, official association
  - **Added:** v2.0, Jan 2026
  - **Use Case:** Spanish VC market

- **EVCA (European Venture Capital Association) / Invest Europe**
  - **Type:** European VC Association
  - **Justification:** Pan-European data, industry standard for Europe
  - **Added:** v2.0, Jan 2026
  - **Use Case:** European context

- **Spanish Startup Ecosystem Reports (SpainStartupMap, etc.)**
  - **Type:** Ecosystem Mapping
  - **Justification:** Local ecosystem insights, network mapping
  - **Added:** v2.0, Jan 2026
  - **Use Case:** Spanish startup landscape

### Search Strategy

**Primary Databases:**
- Google Scholar (academic)
- Crunchbase (startup/funding data)
- PitchBook (if available)
- SSRN (entrepreneurship finance)

**Core Search String:**
```
(entrepreneurship OR startup OR "venture capital" OR "angel investment")
AND (funding OR investment OR "cap table" OR valuation)
AND (strategy OR performance OR outcomes)
```

**Regional Filter:**
```
[base query] AND (Spain OR Spanish OR Europe OR European)
```

**Time Filter:** 2022-2026 (funding landscape shifts rapidly; <3 years critical)

**Grey Literature:**
- Spanish startup association reports
- Accelerator/incubator publications
- European Innovation Scoreboard

**Saturation Criteria:**
- [ ] 1+ Tier 1 academic source (if theoretical claim)
- [ ] Current funding data (2024-2026) from Tier 2
- [ ] Spanish/EU context if relevant
- [ ] Both success and failure rates if making outcome claims

### Related Topics
- See: **2.1 Systemic Investing** (alternative investment approaches)
- See: **4. Technology Market Analysis** (market sizing for startups)

---

## **7. COMPUTATIONAL LITERATURE & AI AUTHORSHIP**

### Metadata
- **Last Updated:** November 22, 2025
- **Review Trigger Date:** November 22, 2026
- **Status:** Active (Recently Added)
- **Parent Topic:** None (top-level)

### Tier 1 Sources

**Technical Research**
- **Google Research Publications on Generative Architectures**
  - **Type:** Corporate Research Lab
  - **Justification:** Leading LLM research, peer-reviewed publications, technical authority
  - **Added:** v3.0, Nov 2025
  - **Currency Note:** Rapid evolution, prioritize 2023+

- **DeepMind Publications**
  - **Type:** Corporate Research Lab
  - **Justification:** AI research leader, Nature publications, methodology transparency
  - **Added:** v3.0, Nov 2025

- **OpenAI Technical Papers**
  - **Type:** Corporate Research Lab
  - **Justification:** GPT series development, technical depth
  - **Added:** v3.0, Nov 2025
  - **Limitation:** Company blog posts are Tier 2; peer-reviewed papers are Tier 1

**Academic Journals (HCI & Creativity)**
- **ACM CHI Proceedings (Human-Computer Interaction)**
  - **Type:** Conference Proceedings
  - **Justification:** Premier HCI venue, peer-reviewed, human-AI collaboration focus
  - **Added:** v3.0, Nov 2025

- **Computational Linguistics Journals**
  - **Type:** Academic Journals
  - **Justification:** NLP research, linguistic analysis of generated text
  - **Added:** v3.0, Nov 2025
  - **Note:** Check arXiv for preprints

**Literary Theory**
- **Publications of the Modern Language Association (PMLA)**
  - **Type:** Literary Studies Journal
  - **Justification:** Literary theory authority, cultural analysis
  - **Added:** v3.0, Nov 2025
  - **Use Case:** Authorship theory, literary criticism

### Tier 2 Sources

**Legal & Cultural Authority**
- **Legal White Papers on IP and AI (The Authors Guild, USCO)**
  - **Type:** Legal Analysis
  - **Justification:** Copyright authority, policy relevance
  - **Added:** v3.0, Nov 2025
  - **Use Case:** Legal status of AI-generated content

- **Cultural Institution Reports (Smithsonian, etc.)**
  - **Type:** Cultural Institutions
  - **Justification:** Cultural perspective, exhibitions on AI art
  - **Added:** v3.0, Nov 2025

- **Generalitat de Catalunya - Department of Culture**
  - **Type:** Government Cultural Authority
  - **Justification:** Spanish/Catalan context, cultural policy
  - **Added:** v3.0, Nov 2025
  - **Use Case:** Regional cultural perspective

**AI-Art Laboratories**
- **Taller Estampa Documentation**
  - **Type:** Art Laboratory
  - **Justification:** Experimental AI-literature work, documented projects
  - **Added:** v3.0, Nov 2025
  - **Use Case:** Artistic experimentation

- **LARALab Publications**
  - **Type:** Research Lab
  - **Justification:** Literary AI research
  - **Added:** v3.0, Nov 2025

- **PAIR (People + AI Research) Publications**
  - **Type:** Google Research Initiative
  - **Justification:** Human-AI interaction focus
  - **Added:** v3.0, Nov 2025

**Literary Theory (Digital Textuality)**
- **Literary Theory Journals Addressing Digital Textuality**
  - **Type:** Academic Journals
  - **Justification:** Theoretical framework for digital literature
  - **Added:** v3.0, Nov 2025

### Tier 3 Sources

**Experimental & Artistic Validation**
- **Case Studies of Realized AI-Literary Works**
  - **Type:** Published Works
  - **Justification:** Real-world examples, documented methodology
  - **Added:** v3.0, Nov 2025
  - **Use Case:** Practical implementation examples
  - **Requirement:** Must include methodology documentation

- **Comparative Experiments (Human vs. AI Blind Tests)**
  - **Type:** Empirical Studies
  - **Justification:** Quality assessment
  - **Added:** v3.0, Nov 2025
  - **Examples:** Studies in El País, NYT, academic experiments

- **Documented Artistic Projects**
  - **Type:** Art Projects
  - **Justification:** Creative exploration
  - **Added:** v3.0, Nov 2025
  - **Examples:** TheAItre, Ross Goodwin's road trips
  - **Use Case:** Artistic possibilities, limitations

### Search Strategy

**Primary Databases:**
- arXiv (cs.CL, cs.AI sections)
- Google Scholar
- ACM Digital Library
- JSTOR (literary theory)
- Legal databases (for IP issues)

**Core Search String (Technical):**
```
("large language model" OR "generative AI" OR GPT OR "neural text generation")
AND (authorship OR creativity OR "long-form" OR narrative OR literature)
```

**Core Search String (Literary/Cultural):**
```
("computational literature" OR "AI authorship" OR "digital literature")
AND (theory OR criticism OR aesthetics OR "intellectual property")
```

**Time Filter:** 2020-2026 (field emerging rapidly; prioritize recent)

**Grey Literature:**
- AI research lab blogs (verify claims with papers)
- Literary magazines exploring AI
- Art exhibitions catalogues
- Spanish literary journals on digital writing

**Saturation Criteria:**
- [ ] 2+ Tier 1 technical sources on capabilities
- [ ] 1+ Tier 1 or 2 legal analysis on IP
- [ ] 2+ case studies or artistic projects
- [ ] Literary theory perspective included
- [ ] Spanish/European context if relevant

### Related Topics
- See: **5. Culture-Technology Relationships** (cultural reception)
- See: **1. Digitalization** (tool adoption in creative industries)

---

## **DOCUMENT MAINTENANCE**

### **Review Schedule**

**Annual Review (All Topics):**
- Check for major new Tier 1 sources
- Verify existing sources haven't been retracted/discredited
- Update search strategies if databases change
- Assess if any Tier 2 sources deserve promotion

**Trigger-Based Review (As Needed):**
- Major paradigm shift in field (e.g., new methodology becomes standard)
- Regulatory change affecting domain
- New institutional source emerges with high authority
- Existing Tier 1 source shown to have systematic issues

### **Version Control**

Each update should document:
- What changed (sources added/removed/reclassified)
- Why it changed (evidence for the change)
- Who approved the change (editor review)
- When it changed (date)

### **Merge Conflict Resolution**

When multiple research projects update same topic:
1. Compare proposed changes
2. Verify all changes meet Tier Criteria
3. Consolidate non-conflicting additions
4. For conflicts: Default to more rigorous source unless newer source has superior methodology
5. Document resolution rationale

---

## CANONICAL UPDATE SCHEMA

> **Scope:** This section defines the machine-executable contract for updating this document.
> **Consumer:** PROMPT_UPDATE_VALIDATION_CHECKLIST (Research subsystem).
> **Authority:** Schema defined by Knowledge Base. Execution by Research.
> **Changes to this schema:** Must be approved by KB-dev and communicated to research-dev via DL entry.

---

### FIELD SPECIFICATION: SOURCE ENTRY

Every source entry — across all Tiers and all Topics — must conform to the following field spec.

#### Mandatory Fields (ALL entries must have these)

| Field | Format | Example |
|-------|--------|---------|
| `Source Name` | Bold heading | `**Journal of Information Technology**` |
| `Type` | Controlled vocabulary (see below) | `Academic Journal` |
| `Justification` | Free text, must cite ≥1 quantifiable criterion | `h-index 89, Impact Factor 5.9, peer-reviewed, 35+ years track record` |
| `Added` | `vX.Y, Mon YYYY` | `v2.0, Jan 2026` |

#### Optional Fields (include when relevant)

| Field | Format | When to include |
|-------|--------|-----------------|
| `Currency Note` | Free text | When source has temporal constraints on usefulness |
| `Limitation Note` | Free text | When source has known bias, partial scope, or requires cross-check |
| `Use Case` | Free text | When source is Tier 3 and value is narrow/specific |

#### Controlled Vocabulary: Type Field

Use exactly one of the following values:

```
Academic Journal
Corporate Research Lab
Government/Institutional
Industry Analyst
International Organization
Knowledge Base
Literary Studies Journal
Market Research Firm
Practitioner-Academic Hybrid
Professional Handbook
Research Institute
Technical Society
Think Tank
Trade Journal
University Center
University Research
```

If a source type does not fit any of the above, propose a new term via DL entry before using it.

---

### PROCEDURE A: ADD A NEW SOURCE TO AN EXISTING TOPIC

Use when a research project identifies a new source worth adding to an existing topic section.

**Checklist:**

```
[ ] 1. Identify target topic section (e.g., "1. DIGITALIZATION")
[ ] 2. Determine correct Tier using Tier Classification criteria (Section: TIER CLASSIFICATION SYSTEM)
         - Tier 1: must meet 4 of 6 criteria
         - Tier 2: must meet 3 of 5 criteria
         - Tier 3: must meet 2 of 4 criteria
[ ] 3. Write entry with ALL mandatory fields + any relevant optional fields
[ ] 4. Place entry under correct sub-grouping within tier (e.g., "Academic Journals", "Industry Research")
         - If no appropriate sub-grouping exists, create one with a short label
[ ] 5. Set Added field to current version + date: vX.Y, Mon YYYY
[ ] 6. Update topic Metadata: set Last Updated to current date
[ ] 7. Log in document VERSION LOG: what changed, which topic, version bump (minor: X.Y → X.Y+1)
[ ] 8. No KB-dev notification required for source additions within existing topics
```

---

### PROCEDURE B: ADD A NEW TOPIC SECTION

Use when a research project requires sourcing for a topic not yet covered in this document.

**Checklist:**

```
[ ] 1. Verify topic is genuinely new (not a subtopic of an existing section)
         - If subtopic: use Parent Topic field and nest under existing section
         - If top-level: proceed
[ ] 2. Create topic section using the TOPIC SECTION TEMPLATE below
[ ] 3. Populate with minimum viable content:
         - At least 2 Tier 1 sources
         - At least 1 Tier 2 source
         - Search Strategy with Core Search String
         - Saturation Criteria (minimum 3 checkboxes)
[ ] 4. Assign topic number (next integer after last existing topic)
[ ] 5. Set Metadata: Last Updated, Review Trigger Date (+12 months), Status: Active
[ ] 6. Add Related Topics cross-references (minimum 1 if any relationship exists)
[ ] 7. Update document VERSION LOG: note new topic, version bump (minor)
[ ] 8. NOTIFY KB-DEV via DL entry: new topic added, name, number, brief rationale
```

**Minimum Viable Topic Section Template:**

```markdown
## [N]. [TOPIC NAME IN CAPS]

### Metadata
- **Last Updated:** [Date]
- **Review Trigger Date:** [Date + 12 months]
- **Status:** Active
- **Parent Topic:** [None / Topic N if subtopic]

### Tier 1 Sources

**[Subgroup label]**
- **[Source Name]**
  - **Type:** [Controlled vocabulary]
  - **Justification:** [Quantifiable criteria met]
  - **Added:** [vX.Y, Mon YYYY]
  - **Currency Note:** [If applicable]

[Minimum: 2 Tier 1 entries]

### Tier 2 Sources

**[Subgroup label]**
- **[Source Name]**
  - **Type:** [Controlled vocabulary]
  - **Justification:** [Criteria met]
  - **Added:** [vX.Y, Mon YYYY]
  - **Limitation Note:** [If applicable]

[Minimum: 1 Tier 2 entry]

### Tier 3 Sources

[Optional at creation time. Add as encountered in research.]

### Search Strategy

**Primary Databases:** [List, minimum 2]
**Core Search String:**
    [Boolean query — use AND/OR/NOT operators]
**Exclusions:** [Terms that contaminate results]
**Time Filter:** [Appropriate range for this topic]
**Grey Literature:** [Where to look beyond academic databases]

**Saturation Criteria:**
- [ ] [Criterion 1 — e.g., Found 2+ Tier 1 sources on core question]
- [ ] [Criterion 2 — e.g., Major perspectives covered]
- [ ] [Criterion 3 — e.g., Regional context addressed if relevant]

### Related Topics
- See: **[N. Topic Name]** ([relationship description])
```

---

### PROCEDURE C: RECLASSIFY A SOURCE (TIER CHANGE)

Use when evidence suggests a source should move between tiers.

**Checklist:**

```
[ ] 1. Document reason for reclassification (criteria re-evaluated)
[ ] 2. Move source entry to new tier section
[ ] 3. Update Justification field to reflect criteria currently met
[ ] 4. Add note: "Reclassified from Tier X, [Mon YYYY], reason: [brief]"
[ ] 5. Update topic Metadata: Last Updated
[ ] 6. Log in VERSION LOG
[ ] 7. NOTIFY KB-DEV via DL entry if reclassification is Tier 1 → Tier 2 or Tier 2 → Tier 1
         (Tier 3 reclassifications: no notification required)
```

---

### PROCEDURE D: DEPRECATE A SOURCE

Use when a source is retracted, discredited, or superseded.

**Checklist:**

```
[ ] 1. Do NOT delete the entry
[ ] 2. Add field: **Status:** DEPRECATED — [reason] — [date]
[ ] 3. Move entry to bottom of its tier subsection
[ ] 4. If source was Tier 1: NOTIFY KB-DEV via DL entry immediately
[ ] 5. Log in VERSION LOG
```

---

### KB-DEV NOTIFICATION TRIGGERS

The following changes REQUIRE a DL entry notifying KB-dev:

| Change Type | Why |
|-------------|-----|
| New topic section added | KB tracks schema evolution; may affect RESOURCE_RESEARCH_FOCUS_TYPES |
| Tier 1 ↔ Tier 2 reclassification | High-impact change on evidence standards |
| Tier 1 source deprecated | Removes a foundational reference |
| New Type vocabulary term proposed | Controlled vocabulary must be approved centrally |
| Changes to Tier Classification criteria | Affects all existing tier assignments |
| Changes to this schema section | Requires research-dev alignment |

Changes NOT requiring notification: adding sources within existing topics (any tier), Tier 3 reclassifications, Currency Note updates, minor Search Strategy updates.


---

## **VERSION LOG**

| Version | Date | Changes | Topics Affected |
|---------|------|---------|-----------------|
| 1.0 | Sept 2025 | Initial creation | All |
| 2.0 | Jan 24, 2026 | Complete restructure: separated from CLAIM_VALIDATION_CRITERIA, added explicit Tier Classification Criteria, added Search Strategy sections, added Evidence Sufficiency Guidelines, enhanced metadata and review triggers, AI-executable criteria | All topics restructured |
| 2.1 | Feb 22, 2026 | Added CANONICAL UPDATE SCHEMA section: field specification for source entries (mandatory/optional fields, controlled Type vocabulary), procedures A–D (add source, add topic, reclassify, deprecate), KB-dev notification triggers | Schema only — no topic content changed |

---

**END OF DOCUMENT**
