# Transcranial Magnetic Stimulation-Induced Heart-Brain Coupling: Implications for Site Selection and Frontal Thresholding-Preliminary Findings

## Basic info

* Title: Transcranial Magnetic Stimulation-Induced Heart-Brain Coupling: Implications for Site Selection and Frontal Thresholding-Preliminary Findings
* Authors: Eva Dijkstra, Hanneke van Dijk, Fidel Vila-Rodriguez, Lauren Zwienenberg, Renee Rouwhorst, John P. Coetzee, Daniel M. Blumberger, Jonathan Downar, Nolan Williams, Alexander T. Sack, and Martijn Arns
* Year: 2023
* Venue / source: Biological Psychiatry Global Open Science
* Link: https://pubmed.ncbi.nlm.nih.gov/37881544/
* DOI: 10.1016/j.bpsgos.2023.01.003
* PDF: https://pmc.ncbi.nlm.nih.gov/articles/PMC10593873/pdf/main.pdf
* Date read: 2026-06-30
* Date surfaced: 2026-06-30
* Surfaced via: Tracy in #pocket-brains
* Tags: TMS, heart-brain coupling, neurocardiac-guided TMS, depression, vagus nerve, neuromodulation, target engagement
* Why selected in one sentence: It tests whether ECG-derived heart-brain coupling can act as a practical target-engagement and dose-finding signal for prefrontal TMS.

## Quick verdict

* Keep, but label preliminary

This is a clever Pocket Brains paper because it turns TMS target engagement into something measurable during stimulation: does the heart's interbeat interval entrain at the exact frequency implied by the TMS train/rest cycle? The finding is useful, not definitive. Across two small MDD iTBS datasets, ECG-based heart-brain coupling could distinguish active from sham stimulation with high blinded accuracy, and in a small healthy-volunteer Dash-protocol study the marker showed a dose-response curve with strong individual differences. The paper is best read as a biomarker-method paper, not a treatment-efficacy paper. Its main value is the idea that prefrontal TMS might need a frontal threshold analogous to motor threshold, but based on frontal-vagal engagement rather than thumb twitch.

## One-paragraph overview

Dijkstra et al. propose a "heart-brain coupling" marker for neurocardiac-guided TMS. The core idea is simple: if repetitive TMS over prefrontal targets engages a frontal-vagal pathway, heart rate should decelerate during stimulation trains and recover during intertrain intervals, creating an interbeat-interval oscillation locked to the protocol cycle. For iTBS, the cycle is 2 seconds on and 8 seconds off, so the expected coupling frequency is 0.1 Hz. For 10-Hz Dash, the cycle is 5 seconds on and 11 seconds off, so the expected frequency is 0.0625 Hz. The authors validate the iTBS marker in two MDD datasets by blinded active-versus-sham classification from ECG, then test Dash TMS across four common frontal target locations and an intensity sweep in ten healthy participants. The evidence supports protocol-locked autonomic entrainment and suggests individual site and dose specificity, but the sample sizes are small and pain/sensory confounds are not fully controlled.

## Model definition

### Inputs
ECG or heart-rate recordings collected during structured rTMS sessions, plus the known timing of stimulation trains and intertrain intervals. The main protocols are iTBS and 10-Hz Dash TMS over prefrontal targets.

### Outputs
A heart-brain coupling marker: oscillatory power in the interbeat interval at the stimulation-cycle frequency. For iTBS the target frequency is 0.1 Hz; for Dash TMS it is 0.0625 Hz. In the intended clinical workflow, this marker could support site selection and individualized frontal thresholding.

### Training objective (loss)
There is no trained predictive model. The method computes RR intervals from ECG, transforms them into time-frequency representations, and measures power at the protocol-specific entrainment frequency.

### Architecture / parameterization
The "architecture" is a stimulation-plus-signal-processing loop: deliver rTMS trains at fixed cycle timing, record cardiac activity, compute RR intervals, estimate low-frequency oscillatory power with a Morlet time-frequency analysis, then compare HBC power across sham/active conditions, target sites, and intensities.

## Key questions this summary must address

### 1. What problem is the paper trying to solve?
The paper is trying to solve two linked problems in prefrontal TMS for depression.

First, TMS target engagement is hard to verify. Depression TMS often targets the dorsolateral prefrontal cortex because of its network relationship with the subgenual anterior cingulate cortex, but the clinician usually cannot directly tell whether a particular frontal site is engaging the intended network in a given person.

Second, motor threshold is a poor proxy for frontal excitability. TMS dosing is often scaled from the motor cortex because a thumb twitch is easy to observe, but the frontal cortex may have a different individual threshold. The paper asks whether an autonomic readout could become a frontal-vagal "thumb twitch" for prefrontal TMS.

### 2. What is the method?
The method is neurocardiac-guided TMS 2.0.

The authors use the timing structure of each TMS protocol to predict a specific cardiac entrainment frequency. If each stimulation train transiently slows heart rate and each rest interval lets it recover, the interbeat interval should oscillate at the train-cycle frequency.

The analysis pipeline is:
- record ECG or heart-rate data during TMS;
- detect RR intervals between heartbeats;
- smooth/interpolate the heart-rate or RR signal;
- compute time-frequency power at low frequencies;
- quantify power at the predicted protocol frequency;
- use that HBC marker to classify active versus sham stimulation, compare sites, and map dose-response curves.

### 3. What is the method motivation?
The motivation comes from the frontal-vagal network theory of depression. The DLPFC, subgenual anterior cingulate, and vagal-autonomic regulation are treated as an interacting circuit. Earlier neurocardiac-guided TMS work used heart-rate deceleration as a sign that frontal TMS was engaging this pathway. This paper tries to make that signal more specific by asking whether the heart response is locked to the stimulation rhythm itself.

That is a better target-engagement logic than just looking for a raw heart-rate change, because baseline heart rate, respiration, stress, and other state variables can move heart rate around. A protocol-frequency signal is harder to explain as generic drift.

### 4. What data does it use?
The paper uses three small studies.

Study 1A reanalyzes ECG data from 15 patients with major depressive disorder in the CARTBIND iTBS trial. Three subjects had insufficient ECG, leaving 12 for the HBC analysis. Participants received active and sham iTBS sessions; the active protocol used 2 seconds on, 8 seconds off, and 600 pulses per session over the DLPFC.

Study 1B reanalyzes ECG data from 22 patients with major depressive disorder in a Stanford Neuromodulation Therapy trial. Three participants were excluded for ECG quality, leaving 19. The dataset compared active and sham high-dose iTBS targeted to the left DLPFC, with the first ECG recording used for this analysis.

Study 2 collects new data from 10 healthy adults during the 10-Hz Dash protocol. Each person receives an intensity sweep of 15 stimulation trains, ending at 120% motor threshold, at four frontal locations: Beam F3, Beam F4, 5-cm-rule left, and 5-cm-rule right.

### 5. How is it evaluated?
For studies 1A and 1B, a blinded researcher inspects ECG-derived HBC outputs and predicts whether each session or participant came from active or sham iTBS. The paper also tests whether active iTBS produces stronger 0.1-Hz coupling than sham.

For study 2, the authors compute HBC power at 0.0625 Hz across increasing stimulation intensities and frontal target locations. They test the effects of intensity and location with repeated-measures ANOVA, then identify each participant's "best" location based on the highest average HBC power.

### 6. What are the main results?
In study 1A, blinded ECG-based classification correctly identifies active versus sham iTBS in 10 of 12 cases, or 83% accuracy. Active iTBS produces significantly stronger 0.1-Hz HBC than sham, with a large effect size. The caveat is important: active stimulation is also more painful than sham, so sensory/autonomic confounding is not eliminated.

In study 1B, the generated HBC values predict active versus sham status with 89.5% accuracy. This is useful because sham and active conditions are targeted at the same location, and participants do not guess allocation beyond chance. Headache is somewhat more common in the active group, but the paper reports that measured spontaneous side effects are otherwise limited.

In study 2, 10-Hz Dash stimulation shows a clear intensity effect on 0.0625-Hz HBC. Across all locations, intensity is significant while location and the location-by-intensity interaction are not significant at the group level. When the best location is chosen per individual, the dose-response effect is stronger, peaking around intensity step 8 with a large reported effect. The individual best locations are split across Beam F3, Beam F4, 5-cm-rule left, and 5-cm-rule right, which supports the individualized-site story.

The most interesting result is the inverted-U and person-specific frontal threshold pattern. One participant's HBC peak corresponds to about 81% motor threshold, while another peaks at 120% motor threshold. If real, that is a direct challenge to the assumption that one motor-threshold-scaled dose is appropriate for every frontal target and person.

### 7. What is actually novel?
The novelty is not that TMS can affect heart rate. The sharper contribution is using the stimulation cycle as a fingerprint. The paper predicts a specific HBC frequency from the protocol timing and then looks for power at exactly that frequency.

The other novel piece is the frontal-threshold proposal. Instead of borrowing motor cortex excitability as the dosing anchor for prefrontal TMS, the authors suggest using a physiological frontal-vagal engagement curve to choose target and intensity.

### 8. What are the strengths?
- The biomarker has a clean mechanistic prediction: iTBS should produce 0.1-Hz coupling and Dash should produce 0.0625-Hz coupling.
- The blinded active/sham classification tests are more persuasive than a purely post hoc group plot.
- The method uses ECG, which is cheap and easy to collect relative to MRI or TMS-EEG.
- The paper separates target engagement from clinical response, which keeps the claim appropriately narrow.
- The study 2 dose sweep is useful because it suggests that too much intensity may not be better.
- The individual best-site analysis matches the practical clinical question: which location and dose should this specific person receive?

### 9. What are the weaknesses, limitations, or red flags?
- All three studies are small. The strongest-looking findings need replication in larger, prospectively designed samples.
- Pain and discomfort are a serious confound. Study 1A finds active stimulation is more painful than sham; study 1B and study 2 do not fully measure subjective unpleasantness during stimulation.
- Study 1A compares DLPFC active stimulation to vertex sham, so site and stimulation status are not perfectly isolated.
- Study 1B is between-subject rather than within-subject, making individual HBC differences harder to separate from condition differences.
- Study 2 uses healthy participants, not depressed patients, and does not establish that HBC-guided site/dose selection improves treatment outcomes.
- The authors and institutions have relevant neurocardiac-guided TMS interests and IP disclosures, so independent replication matters.
- The frontal-vagal interpretation is plausible but still indirect; ECG entrainment alone does not prove the exact cortical-subcortical-vagal pathway.

### 10. What challenges or open problems remain?
The biggest open question is clinical validity. Does choosing the site or intensity with HBC actually improve depression outcomes, remission rates, durability, tolerability, or speed of response?

The second open question is specificity. Future studies need better controls for pain, scalp sensation, startle, anxiety, respiration, and generic sympathetic/arousal effects. The authors argue that heart-rate deceleration points to vagal rather than pain-driven sympathetic effects, but that needs stronger experimental isolation.

The third open question is how frontal threshold should be operationalized. A nice-looking individual HBC peak is not automatically the optimal clinical dose. It may be a target-engagement maximum, an overstimulation boundary, or an artifact of the chosen protocol.

### 11. What future work naturally follows?
- Run a prospective randomized trial that compares standard TMS targeting against HBC-guided target and dose selection.
- Measure pain, discomfort, respiration, anxiety, and expectancy during each stimulation train, then model them as covariates.
- Test whether HBC-guided frontal threshold predicts symptom improvement, adverse effects, or dropout.
- Combine HBC with fMRI, TMS-EEG, or autonomic blockade/control experiments to validate the pathway.
- Repeat the dose sweep in patients with MDD rather than only healthy volunteers.
- Test whether other TMS frequencies or duty cycles produce the predicted HBC frequencies.

### 12. Why does this matter?
It matters because prefrontal TMS still has too much protocol folklore baked into it. The field has decent group-level targets and dosing conventions, but individual patients vary in anatomy, excitability, tolerability, and network engagement. A low-cost cardiac marker that tells you whether a frontal TMS protocol is engaging the intended pathway would be genuinely useful.

The deeper Pocket Brains point is that neuromodulation needs real-time physiological readouts. If TMS is supposed to act on a brain-body regulatory circuit, the body should not be treated as noise after the fact. It may be the readout that tells you whether the circuit was touched.

## Why It Matters

For Pocket Brains, this paper is worth keeping because it is a bridge between psychiatry neuromodulation and closed-loop physiology. It is not enough evidence to change clinical practice by itself, but it gives a crisp experimental handle: stimulate the prefrontal cortex, watch the heart at the protocol frequency, and use the response to ask whether the target and dose are actually individualized. That is a much better mental model than blindly scaling frontal stimulation from motor threshold and hoping the network cooperates.

### 13. What ideas are steal-worthy?
- Use the stimulation cycle itself as a physiological fingerprint.
- Treat the heart as a cheap online readout of brain-network engagement, not just a safety monitor.
- Build dose-response curves for neuromodulation instead of assuming more intensity is better.
- Separate "best target for the average patient" from "best target for this person."
- Look for inverted-U engagement curves when tuning stimulation.
- Use blinded physiological classification as an early validation test for biomarkers.
- Treat motor threshold as convenient but not sacred for nonmotor targets.

## 14. Final decision
Keep, with a strong preliminary label. The paper is methodologically interesting and strategically useful for thinking about individualized TMS, but it should not be oversold as proof that HBC-guided TMS improves depression treatment. The useful takeaway is sharper: ECG-locked heart-brain coupling may be a practical target-engagement signal for prefrontal stimulation, and the frontal dose sweet spot may vary enough that motor-threshold dosing is a blunt instrument.
