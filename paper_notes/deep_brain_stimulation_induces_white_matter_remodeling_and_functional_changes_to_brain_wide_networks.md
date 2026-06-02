# Deep brain stimulation induces white matter remodeling and functional changes to brain-wide networks

## Basic info

* Title: Deep brain stimulation induces white matter remodeling and functional changes to brain-wide networks
* Authors: Satoka H. Fujimoto, Atsushi Fujimoto, Catherine Elorette, Adela Seltzer, Emma Andraka, Keondre Herbert, Gaurav Verma, William G. M. Janssen, Lazar Fleysher, Davide Folloni, Ki Sueng Choi, Brian E. Russ, Helen S. Mayberg, and Peter H. Rudebeck
* Year: 2026
* Venue / source: Nature Neuroscience
* Link: https://www.nature.com/articles/s41593-026-02301-4
* DOI: 10.1038/s41593-026-02301-4
* PDF: https://www.nature.com/articles/s41593-026-02301-4.pdf
* Date read: 2026-06-02
* Date surfaced: 2026-06-02
* Surfaced via: Tracy in #pocket-brains
* Why selected in one sentence: This is a clean macaque study asking whether depression-style SCC deep brain stimulation changes only functional network activity, or also physically remodels white matter.

## Quick verdict

* Keep, with small-N caution

This is a strong Pocket Brains paper because it joins the clinical SCC-DBS story to a concrete biological mechanism: chronic white-matter stimulation can produce tract-specific myelin remodeling and brain-wide connectivity changes. The best part is the multimodal design: diffusion MRI, resting fMRI, histology, electron microscopy, a lead-only control animal, and nonsurgical fMRI controls all point in the same direction. The big caveat is also obvious and nontrivial: the main stimulation experiment is two healthy male macaques, so the paper is mechanistically valuable but not a free pass to broad clinical claims about depression.

## One-paragraph overview

The paper models subcallosal anterior cingulate cortex deep brain stimulation (SCC-DBS), a white-matter-targeted approach used for treatment-resistant depression, in macaques. The authors implant mini-DBS electrodes at the confluence of the cingulum bundle, uncinate fasciculus, and forceps minor, then deliver six weeks of chronic stimulation using human depression-style parameters. After stimulation, diffusion MRI shows a selective fractional-anisotropy increase in the stimulated cingulum bundle, especially the mid-cingulum portion. Histology links that imaging change to more myelinating oligodendrocytes and increased myelination, measured by lower axonal g-ratio. Resting-state fMRI shows broader functional-network effects: reduced cortico-cortical connectivity, altered SCC coupling to default-mode, limbic, central-executive, salience, and sensorimotor nodes, and bilateral functional changes despite unilateral stimulation. A lead-only control animal and nonsurgical fMRI controls argue that these effects are stimulation-driven rather than just implantation or time.

## Model definition

### Inputs
Healthy rhesus macaques with SCC-DBS leads targeted to the overlap of three white matter tracts: cingulum bundle (CB), uncinate fasciculus (UF), and forceps minor (FM). The study uses pre- and post-stimulation diffusion MRI, resting-state fMRI, home-cage behavior, immunofluorescence, and electron microscopy.

### Outputs
Changes in white matter integrity, tract-specific cellular myelination markers, SCC-centered functional connectivity, brain-network-level connectivity, and coarse naturalistic behavior after chronic SCC-DBS.

### Training objective (loss)
There is no learned model. The core design is a before/after stimulation experiment with within-animal hemispheric comparison, a lead-insertion-without-stimulation control, and nonsurgical fMRI controls.

### Architecture / parameterization
The intervention is unilateral SCC-DBS delivered to a tract confluence chosen by subject-specific probabilistic tractography. Stimulation was delivered for six weeks after a four-week recovery period. Imaging and histology are then used to ask whether the intervention causes local structural remodeling and distributed functional-network changes.

## Key questions this summary must address

### 1. What problem is the paper trying to solve?
DBS for depression is often described as a circuit intervention, but the field still does not fully know what chronic stimulation does biologically. The usual story emphasizes rapid changes in neural activity and functional communication. This paper asks whether SCC-DBS also changes the physical white matter substrate, especially because therapeutic mood effects can take weeks and the clinical target is a white-matter confluence rather than a single gray-matter nucleus.

### 2. What is the method?
The authors build a nonhuman-primate model of SCC-DBS. They reconstruct the cingulum bundle, uncinate fasciculus, and forceps minor from diffusion MRI, identify the tract-overlap target adjacent to the SCC, implant mini-DBS leads unilaterally, and stimulate two macaques for six weeks. They compare pre- and post-stimulation diffusion MRI and resting-state fMRI, then remove the brain for histological and ultrastructural analysis. They also include one animal with the same lead implantation but no stimulation, plus three nonsurgical controls for resting-state fMRI drift over a similar interval.

### 3. What is the method motivation?
SCC-DBS for depression targets white matter pathways, not just a gray matter coordinate. If stimulation changes activity across networks but also remodels the stimulated tract system, that would help explain why clinical improvement can unfold over weeks and why white-matter integrity predicts response. The macaque setup lets the authors isolate direct stimulation effects from preexisting depression pathology and directly inspect tissue afterward, which is hard in human patients with implanted devices.

### 4. What data does it use?
The core stimulated dataset is two healthy adult male rhesus macaques. A third macaque receives the implanted lead but no stimulation, serving as a lead-insertion control. Three additional unoperated macaques provide nonsurgical resting-state fMRI controls scanned 6-7 weeks apart. The main data types are 3T diffusion MRI, resting-state fMRI under low-dose anesthesia, CT lead localization, home-cage behavioral video, immunofluorescence for myelinating oligodendrocytes, and electron microscopy of myelinated axons.

### 5. How is it evaluated?
The structural evaluation compares fractional anisotropy before and after stimulation across the CB, UF, and FM, with stimulated and contralateral hemispheres separated. It then tests CB subregions and verifies the imaging result with CC1/DAPI staining and g-ratio electron-microscopy measurements in the mid-cingulum. The functional evaluation builds whole-brain resting-state connectivity matrices, SCC seed maps, and hub-level network summaries. The control experiments check whether lead insertion alone or ordinary scan interval effects produce the same pattern.

### 6. What are the main results?
The structural result is selective. After six weeks of SCC-DBS, fractional anisotropy increases in the stimulated cingulum bundle, especially the mid-cingulum portion, while the uncinate fasciculus, forceps minor, and contralateral tracts do not show the same pattern.

The cellular result supports the MRI readout. In the mid-cingulum, the stimulated side shows a higher fraction of CC1-positive myelinating oligodendrocytes and lower g-ratio, which means thicker myelin relative to axon diameter. That makes the FA increase more biologically interpretable than a naked diffusion-MRI association.

The functional result is distributed. SCC-DBS produces widespread resting-state connectivity changes, including reduced cortico-cortical connectivity, increased subcortico-subcortical connectivity, reduced SCC connectivity with default-mode, limbic, and central-executive hubs, and mixed salience-network effects. The anterior-dorsal insula increases its SCC connectivity while dACC decreases, so the salience network does not move as a single blunt block.

The control result matters. The lead-only animal does not show the same increased myelination pattern and, if anything, shows decreased FA in the implanted CB. Nonsurgical controls do not show the same systematic fMRI changes. That makes stimulation, not just surgery or time, the more plausible driver.

### 7. What is actually novel?
The novelty is not merely "DBS changes connectivity." That has been the field's default intuition for years. The sharper contribution is showing stimulation-linked white matter remodeling at multiple levels: diffusion MRI, oligodendrocyte marker, and myelin ultrastructure. The paper also ties that structural effect to a depression-relevant SCC tract target and to network-level fMRI changes in the same animals.

### 8. What are the strengths?
The multimodal stack is excellent: tractography-guided targeting, DWI, rs-fMRI, histology, electron microscopy, behavior, lead-only control, and nonsurgical fMRI controls.

The target is clinically meaningful rather than arbitrary. It models the SCC-DBS tract confluence used in treatment-resistant depression.

The histology makes the diffusion finding much more credible. FA can be a slippery proxy; here it is backed by myelinating oligodendrocyte and g-ratio evidence.

The lead-only control is especially useful. It directly addresses the easy alternative explanation that implantation injury or microlesion effects caused the changes.

The functional analysis respects networks without pretending each network is uniform. The salience-network split between insula and dACC is more believable than a tidy but fake whole-network claim.

### 9. What are the weaknesses, limitations, or red flags?
The biological N is tiny. Two stimulated macaques are not enough to treat every statistical result as stable, especially when many tests are based on voxel-wise or field-wise measurements pooled within animals.

The animals are healthy, male, and anesthetized during fMRI. That is appropriate for isolating mechanism, but it limits translation to depressed humans in awake, changing clinical states.

The paper cannot prove that the white matter remodeling causes antidepressant benefit. It shows a plausible mechanism engaged by the stimulation protocol, not a symptom-response mechanism.

The stimulation parameters are intentionally close to human SCC-DBS settings, but the study does not map how frequency, amplitude, duty cycle, or target variations change the structural and functional effects.

The behavior result is thin. Increased movement and foraging show the stimulation affected the brain, but they are not a depression model and should not be overread.

### 10. What challenges or open problems remain?
The biggest open question is causal coupling: do the myelin changes drive the fMRI-network changes, do they occur in parallel, or are both downstream of another stimulation effect? A second question is clinical relevance: do responders to SCC-DBS show analogous white matter remodeling, and does the degree of remodeling track symptom improvement? It also remains unclear which stimulation settings and tract targets best promote useful remodeling without unwanted plasticity.

### 11. What future work naturally follows?
Longitudinal human imaging studies that test whether SCC-DBS patients show cingulum-bundle microstructural change over weeks to months.

Animal studies with larger cohorts, stimulation-parameter sweeps, and sham controls to separate electric-field strength, frequency, laterality, and target-tract effects.

Causal experiments that manipulate oligodendrocyte or myelin plasticity during DBS to test whether remodeling is necessary for the functional-network changes.

Awake or task-linked fMRI/physiology experiments that connect the network effects to affective or motivational state rather than resting anesthesia alone.

More precise modeling of the electric field relative to tract geometry, so "white matter DBS" becomes a controllable circuit-plasticity intervention rather than a location label.

### 12. Why does this matter?
This matters because it changes the mental model of DBS from "electrical control of activity" toward "electrical control of circuit plasticity." For depression especially, the clinical target is a white-matter pathway system, and durable improvement may involve changing the tract's biological properties as well as the activity flowing through it. If that is right, stimulation protocols should be optimized not only for acute neural modulation, but also for the kind of structural remodeling they induce over time.

## Why It Matters

The useful takeaway is disciplined: SCC-DBS may work partly by inducing tract-specific myelin remodeling and partly by reshaping distributed network communication. That is a more interesting and more actionable mechanism than the vague claim that DBS "modulates circuits." It also gives Pocket Brains a good anchor for thinking about neuromodulation as plasticity engineering.

### 13. What ideas are steal-worthy?
Use healthy nonhuman primates to isolate direct stimulation mechanisms from disease pathology.

Pair diffusion MRI with histology whenever possible; otherwise "white matter integrity" stays too interpretively loose.

Treat white matter stimulation as a plasticity intervention, not only an acute activity perturbation.

Include lead-only controls for DBS mechanism studies, because insertion effects are real and can be misleading.

Analyze network hubs at node resolution when whole-network summaries hide opposing effects.

### 14. Final decision
Keep and highlight carefully.

This is exactly the kind of paper Pocket Brains should keep: clinically relevant, mechanistically rich, and good at making an implicit idea explicit. The result should not be sold as proof that DBS cures depression by remyelinating the cingulum, but it is very good evidence that chronic SCC-DBS can remodel white matter and rebalance brain-wide functional networks in a depression-relevant primate circuit.
