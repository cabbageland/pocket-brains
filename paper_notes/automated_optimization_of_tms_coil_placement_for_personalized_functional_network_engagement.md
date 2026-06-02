# Automated optimization of TMS coil placement for personalized functional network engagement

## Basic info

* Title: Automated optimization of TMS coil placement for personalized functional network engagement
* Authors: Charles J. Lynch, Immanuel G. Elbau, Tommy H. Ng, Danielle Wolk, Shasha Zhu, Aliza Ayaz, Jonathan D. Power, Benjamin Zebley, Faith M. Gunning, Conor Liston, Deanna M. Barch, Deanna M. Barch, Abraham Z. Snyder, B. J. Casey, Steven M. Nelson, and Damien A. Fair
* Year: 2022
* Venue / source: Neuron, volume 110, issue 20
* Link: https://pmc.ncbi.nlm.nih.gov/articles/PMC11446252/
* DOI: 10.1016/j.neuron.2022.08.012
* PDF: https://pmc.ncbi.nlm.nih.gov/articles/PMC11446252/pdf/nihms-1831996.pdf
* Date read: 2026-05-27
* Date surfaced: 2026-05-27
* Surfaced via: Tracy in #pocket-brains
* Why selected in one sentence: It is a very practical precision-neuromodulation paper that turns individualized functional mapping plus E-field modeling into an explicit optimization procedure for choosing TMS coil placements that better hit the intended network.

## Quick verdict

* Highly relevant

This is a strong pocket-brains paper. Its main contribution is not just the claim that people have idiosyncratic functional anatomy, which we already know, but a concrete workflow for acting on that fact during TMS targeting. The paper shows that if you use each person’s own functional network map plus electric-field simulations, the same nominal prefrontal target stops looking like one thing and starts looking like a mess of different networks across people. TANS, their optimization procedure, is a good answer to that problem. It is conceptually crisp, clinically motivated, and validated both in silico and in vivo. My main caution is that the most ambitious clinical implication, better psychiatric outcomes, is still inferred rather than directly demonstrated here.

## One-paragraph overview

This paper introduces TANS, short for Targeted Functional Network Stimulation, a personalized TMS targeting workflow that combines individual resting-state functional network maps with electric-field modeling to optimize coil position and orientation for a chosen target network. The authors first show that a standard left prefrontal coordinate used in depression studies can land on meaningfully different network mixtures across individuals, including frontoparietal, salience, and cingulo-opercular territory, even when the same anatomical location is targeted. TANS addresses that by finding a gyral-crown segment of the desired network, searching nearby scalp positions and orientations, simulating the E-field at each configuration, and choosing the placement that maximizes on-target stimulation while penalizing off-target network engagement. In highly sampled depressed and healthy participants, the method improves stimulation specificity in silico, and in healthy participants it can selectively engage somatomotor network representations for upper versus lower limb sites in vivo.

## Model definition

### Inputs
Individualized functional network maps derived from resting-state fMRI, cortical surface anatomy, a target functional network to stimulate, and electric-field simulations across a search grid of candidate coil placements and orientations.

### Outputs
An optimized coil position and orientation predicted to maximize stimulation of the chosen network while reducing off-target engagement, plus estimated on-target specificity across E-field hotspot thresholds.

### Training objective (loss)
There is no learned model in the machine-learning sense. The optimization objective is to maximize the proportion of the E-field hotspot that falls on the target network, optionally while penalizing stimulation of an explicit avoidance region or, more generally, any non-target network.

### Architecture / parameterization
The workflow has four main steps:
- identify the largest gyral-crown piece of the target network within the search space,
- create a scalp search grid above that target cluster,
- run E-field simulations for multiple positions and orientations,
- score each candidate by how much of the E-field hotspot overlaps the target network across percentile-based hotspot thresholds.

## Key questions this summary must address

### 1. What problem is the paper trying to solve?
The paper is solving a very practical targeting problem in neuromodulation. TMS is often prescribed as though an anatomical label like left DLPFC or a single MNI coordinate is enough to define the causal intervention. But if large-scale functional networks vary from person to person, then the same anatomical target can stimulate different circuits across patients. That makes treatment effects noisy and mechanistically muddy. The paper asks how to target the intended functional network more selectively in each individual, rather than trusting group-average coordinates or scalp heuristics.

### 2. What is the method?
The method is a personalized search-and-score targeting pipeline.

The steps are:
1. Map each individual’s functional networks from resting-state fMRI.
2. Choose the target network and find its largest piece on a gyral crown, since the E-field is strongest there.
3. Build a local scalp search grid above that target zone.
4. Simulate TMS E-fields for many coil positions and orientations.
5. Define the E-field hotspot using percentile thresholds from 99% to 99.9%.
6. Compute an on-target score based on how much of that hotspot overlaps the target network, optionally using an avoidance region.
7. Pick the coil placement that maximizes average on-target specificity across thresholds.

That is TANS. It is less about inventing a new biophysical model than about joining individualized functional topography with a sensible optimization criterion.

### 3. What is the method motivation?
The motivation is strong and very neuro-practical. If therapeutic effects depend on modulating a specific network, then it is not enough to say “stimulate this anatomical patch.” Functional networks can be arranged differently across brains, and TMS fields spread over cortical geometry rather than pinning a single point. So the optimization target should be a network patch on the cortical surface, not a coordinate in abstract space. The paper also recognizes that stimulation specificity is not just about making the target stronger, but about avoiding non-target network contamination.

### 4. What data does it use?
The main in silico analyses use 8 highly sampled patients with depression and 6 healthy individuals. The paper reports that functional maps were built from rich resting-state fMRI datasets, but also shows that highly similar maps could be obtained with as little as 30 minutes of multi-echo data from a first study visit. For in vivo validation, the authors target somatomotor functional networks corresponding to the upper and lower limbs in healthy participants.

### 5. How is it evaluated?
The evaluation has two main layers.

First, the paper compares a generic targeting strategy against the individualized TANS procedure. The generic strategy places the coil over a commonly used left prefrontal coordinate associated with subgenual-cingulate anticorrelation. The authors then inspect which networks actually occupy the simulated E-field hotspot in each person.

Second, the paper evaluates whether TANS can improve selectivity. In silico, it asks whether the optimized placements produce more on-target hotspot occupancy for the desired network. In vivo, it tests whether the optimized placements can differentially engage somatomotor networks linked to upper versus lower limb representations.

### 6. What are the main results?
The key result is that anatomical sameness does not imply functional sameness. When the same standard prefrontal coordinate is targeted across people, the E-field hotspot can fall on very different network mixtures. In some participants the frontoparietal network dominates, while in others salience or cingulo-opercular territory receives comparable or greater stimulation.

The second big result is that TANS improves specificity by design. The optimization procedure finds coil placements that better align the E-field hotspot with the chosen target network and reduce off-target overlap. The paper reports this improvement in silico in both depressed and healthy participants.

The third result is that the approach survives an in vivo test. When aimed at somatomotor functional networks corresponding to upper versus lower limbs, the individualized targeting procedure can selectively engage the intended network representations rather than just vaguely stimulating motor cortex.

### 7. What is actually novel?
The novelty is the optimization framing. Plenty of prior work argued that connectivity matters for TMS targeting, but this paper turns individualized network geometry into the explicit thing being optimized. It also treats off-target stimulation as part of the objective rather than an afterthought. That is more useful than simply saying “pick the spot with strong connectivity to region X.”

Another useful novelty is the operational emphasis on gyral-crown targeting plus hotspot-overlap scoring. The paper is trying to solve the actual coil-placement problem, not just produce prettier connectivity maps.

### 8. What are the strengths?
- The problem is clinically real and well motivated.
- The method is concrete enough to implement, not just a conceptual proposal.
- It makes individual variability operationally important instead of treating it as background noise.
- It combines functional mapping with E-field modeling in a clean way.
- It includes both in silico and in vivo validation.
- It shows that clinically tractable data amounts, around 30 minutes of multi-echo fMRI, may be enough for useful mapping.

### 9. What are the weaknesses, limitations, or red flags?
- The sample sizes are still modest, especially for the in vivo validation.
- The paper shows better targeting specificity, not direct evidence of better antidepressant outcomes.
- Precision functional mapping still requires nontrivial imaging quality and pipeline discipline.
- The optimization depends on how reliably individual networks are estimated, which may be harder outside high-quality research settings.
- It improves selectivity within the modeled framework, but real clinical deployment adds practical noise like coil placement error, day-to-day state changes, and patient movement.

### 10. What challenges or open problems remain?
The obvious open problem is translation into clinical benefit. Does improved network specificity actually improve remission rates or symptom-specific outcomes in depression or other disorders? Another open question is how much imaging is enough in routine practice. The paper suggests 30 minutes may work, which is encouraging, but scaling this broadly will still require robust acquisition and processing. There is also room to combine this framework with symptom-subtype models, state-dependent targeting, or individualized physiological thresholds.

### 11. What future work naturally follows?
- Prospective clinical trials comparing TANS-guided targeting against standard heuristic or coordinate-based TMS.
- Faster or lower-burden individualized mapping pipelines for clinical settings.
- Network-specific targeting for disorders beyond depression.
- Integration with behavioral state, EEG, or symptom-cluster models to choose not just where to stimulate, but when and for whom.
- Better modeling of uncertainty, so the system can express confidence in a proposed target rather than always returning a single best point.

### 12. Why does this matter?
It matters because this is a clean example of precision neuroscience becoming actionable intervention design. Instead of treating brain networks as descriptive overlays on anatomy, the paper uses them to directly choose how to stimulate. That is a stronger bridge from mapping to causation. For psychiatry and neurotech, this is the kind of move that could make brain stimulation less blunt and less variable.

## Why It Matters

This paper is worth keeping because it makes a very usable point: if the true causal object is a network, then TMS targeting should optimize for network engagement, not just coordinate reuse. That sounds obvious once stated, but a lot of clinical practice still falls short of it. TANS is a concrete step toward individualized, circuit-aware stimulation that could matter not just for depression, but for any domain where superficial stimulation is meant to push a deeper or distributed functional system.

### 13. What ideas are steal-worthy?
- Optimize for target-network overlap, not just anatomical proximity.
- Penalize off-target stimulation explicitly instead of treating it as inevitable spillover.
- Use individualized functional maps as intervention substrates, not just descriptive diagnostics.
- Treat gyral geometry as part of the targeting problem, not a nuisance after the fact.
- Validate precision-targeting frameworks with both simulations and a simple in vivo discrimination task.

### 14. Final decision
Keep.

This is exactly the kind of paper pocket-brains should keep around. It is methodologically serious, practically relevant, and conceptually clean. The big claim is not “we cured depression with better targeting.” It is something more disciplined and still very valuable: individualized network-aware coil optimization can make TMS targeting more specific, and that is a real prerequisite for making neuromodulation less sloppy.
