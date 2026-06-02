# Global effects in fMRI reveal brain markers of state and trait anxiety

## Basic info

* Title: Global effects in fMRI reveal brain markers of state and trait anxiety
* Authors: Kimberly Rogge-Obando, Terra Lee, Caroline G. Martin, Kamalpreet Kaur, Yamin Li, Jeffrey M. Harding, Shiyu Wang, Richard Song, Ruoqi Yang, Rithwik Guntaka, Sarah E. Goodale, Roza G. Bayrak, Lucina Q. Uddin, Martin Walter, Jeremy Hogeveen, Catie Chang
* Year: 2025
* Venue / source: medRxiv preprint
* Link: https://www.medrxiv.org/content/10.1101/2025.07.15.25331571v1
* PDF: https://www.medrxiv.org/content/10.1101/2025.07.15.25331571v1.full.pdf
* DOI: 10.1101/2025.07.15.25331571
* Date read: 2026-05-11
* Date surfaced: 2026-05-11
* Surfaced via: Tracy in #pocket-brains
* Why selected in one sentence: This is a neuroimaging biomarker paper that tries to rescue so-called global fMRI signals from the confound bucket and argue they carry meaningful information about anxiety state and trait.

## Quick verdict

* Worth keeping

This is a solid, interesting neuroimaging paper with a clear conceptual move: treat global fMRI effects, especially cortical-arousal-related structure, as potentially informative for anxiety rather than automatically regressing them away as nuisance. The main strength is that it ties a large community sample to a practical preprocessing question people actually fight about. The main caution is that the strongest network-connectivity findings do not survive multiple-comparison correction, the sample is nonclinical, and the heart-rate piece is weaker than the framing might suggest.

## One-paragraph overview

Using resting-state fMRI from 543 adults in the Enhanced NKI-Rockland Sample, the authors test whether three broad “global” signal components relate to state and trait anxiety: the global mean signal, a template-derived fMRI arousal index (FAI), and heart-rate-related fMRI effects in a 240-subject high-quality-PPG subset. They compute subject-level spatial maps describing how strongly each component is expressed across the brain, then ask whether those maps correlate with anxiety scores while controlling for age, sex, and ethnicity. The headline result is that the spatial expression of the global mean signal and the arousal-related FAI both relate significantly to state and trait anxiety, while heart-rate maps do not show significant clusters. They also show that removing global components can weaken some salience/default-mode/executive-network associations with anxiety, supporting the argument that these global effects are not just junk to be scrubbed away.

## Model definition

### Inputs
Resting-state fMRI from 543 subjects with STAI state and trait anxiety scores, plus photoplethysmography-derived heart-rate estimates for a 240-subject subset with usable physiological recordings.

### Outputs
Subject-level spatial maps for global mean signal expression, heart-rate-related fMRI variance, and fMRI arousal index expression, plus statistical associations between these maps, network connectivity measures, and anxiety scores.

### Training objective (loss)
There is no learned predictive model in the modern ML sense. The analysis is based on regression, template projection, ICA/dual-regression network extraction, and permutation-based group statistics.

### Architecture / parameterization
The core analysis stack is: preprocess resting-state fMRI, derive three global components, create voxelwise subject maps for each component, estimate a template-based fMRI arousal index from prior work, derive resting-state networks with group ICA plus dual regression, then relate those maps and network-connectivity measures to state and trait anxiety using GLMs and mixed models.

## Key questions this summary must address

### 1. What problem is the paper trying to solve?
Anxiety biomarkers from resting-state fMRI have been messy and inconsistent, especially when framed only through large-scale network connectivity. This paper asks whether globally expressed fMRI effects, especially those linked to cortical arousal and physiology, might provide cleaner or at least complementary markers of anxiety.

### 2. What is the method?
The authors derive three kinds of global fMRI effects per subject: the brainwide global mean signal, heart-rate-related voxelwise variance explained by basis-function regressors, and a template-based fMRI arousal index. They test whether the spatial expression of these components relates to STAI state and trait anxiety. Separately, they derive five resting-state networks, compute pairwise connectivity among them, and check how those anxiety relationships change after regressing out global components from network time series.

### 3. What is the method motivation?
Global signals in fMRI are often treated as nuisance, but many of them plausibly reflect real biology such as arousal and autonomic state. Since anxiety is tightly tied to arousal and physiology, those “global” components may be closer to the phenomenon of interest than the field’s usual cleaner-looking connectivity summaries.

### 4. What data does it use?
The study uses the Enhanced Nathan Kline Institute-Rockland Sample. There are 543 subjects with resting-state fMRI and STAI scores, and a 240-subject subset with sufficiently clean photoplethysmography for heart-rate analyses. The resting scan lasts 10 minutes with TR 1.4 s. This is a community sample, not an anxiety-disorder patient cohort.

### 5. How is it evaluated?
The main evaluation is association analysis: voxelwise permutation-based tests linking subject-specific global-component maps to state and trait anxiety, plus regression on summary temporal features like the standard deviation of the FAI and global mean signal. The secondary evaluation checks which network-connectivity and anxiety associations weaken after regressing out global components.

### 6. What are the main results?
- Spatial maps of the global mean signal and the FAI show significant relationships with both state and trait anxiety after correction.
- Heart-rate-related spatial maps do not show significant clusters.
- Estimated drowsiness, operationalized as the standard deviation of the FAI time series, is significantly negatively related to both state and trait anxiety.
- The standard deviation of the global mean signal also relates to both state and trait anxiety, though more weakly.
- Regressing out FAI or the global mean signal weakens some anxiety relationships involving salience-network connectivity, especially VDMN-SAL and RCEN-SAL links, though these connectivity findings are only at uncorrected thresholds.

### 7. What is actually novel?
The novelty is less a new algorithm than a reframing plus an integrated analysis. The paper brings together global mean signal topography, template-based cortical arousal estimation, physiology-linked fMRI structure, and anxiety phenotypes in one large sample, then explicitly asks what happens to standard connectivity findings when you remove those global components.

### 8. What are the strengths?
- Good sample size for this style of resting-state anxiety study.
- Useful distinction between state and trait anxiety rather than collapsing them.
- Strong conceptual focus on whether global components are signal versus confound.
- Connects preprocessing choices to substantive interpretation, which makes it more consequential than a generic correlation paper.
- The salience-network emphasis is plausible and fits prior anxiety/arousal theory.

### 9. What are the weaknesses, limitations, or red flags?
- It is a nonclinical community sample, so biomarker language should be taken cautiously.
- STAI was acquired about a day before MRI, not during the scan.
- Heart-rate findings are notably weaker than the broader physiology framing might lead you to expect.
- The more familiar network-connectivity findings do not survive correction for multiple comparisons.
- The arousal measure is estimated indirectly from fMRI via a template, not validated here with simultaneous EEG or pupillometry.
- Some age sensitivity shows up when restricting the sample to ages 18-55, which softens the robustness story.

### 10. What challenges or open problems remain?
The big open question is whether these global fMRI markers generalize to clinical anxiety populations, task settings, and within-subject state tracking. It also remains unclear how specific these markers are to anxiety rather than broader arousal, vigilance, distress, or nonspecific physiological variation.

### 11. What future work naturally follows?
- Replication in diagnosed anxiety cohorts.
- Simultaneous EEG, pupillometry, or richer autonomic recordings to validate the cortical-arousal interpretation.
- Longitudinal or within-subject designs that can separate momentary anxious state from trait vulnerability.
- More rigorous predictive modeling to test whether global-effect features add out-of-sample value beyond standard connectivity measures.
- Better causal or mechanistic links between these global patterns and anxiety-relevant neuromodulatory systems.

### 12. Why does this matter?
This matters because fMRI preprocessing choices are not neutral. If some global signal structure carries clinically relevant information, then the routine instinct to regress it away may erase part of the phenomenon people are trying to study. Even if the present paper is not the final word, it is a useful push against lazy confound thinking.

## Why It Matters

The strongest takeaway is not “global signal is good now.” It is more specific: anxiety seems to live partly in brainwide arousal-linked structure, and that structure can bleed into or even underpin the network findings people usually foreground. That is important for both neuroimaging methodology and any future attempt to build anxiety biomarkers that do not confuse cleaner preprocessing with better biology.

### 13. What ideas are steal-worthy?
- Treat global fMRI components as candidate phenotype carriers, not just nuisance regressors.
- Pair substantive psychiatric questions with preprocessing-ablation analyses instead of pretending pipeline choices are irrelevant.
- Use template-based arousal estimates as a lightweight bridge when simultaneous vigilance measurements are unavailable.
- Ask whether salience-network effects survive after modeling arousal/global structure before overinterpreting them.

### 14. Final decision
Keep. This is not a revolutionary anxiety biomarker paper, but it is a thoughtful and methodologically relevant one, and it fits Pocket Brains well because it sits right at the junction of neuroimaging signal interpretation, arousal, and psychiatry.
