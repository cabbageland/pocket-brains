# Anatomically Compositional Latent Diffusion for Controllable 3D Brain MRI Generation

## Basic info

* Title: Anatomically Compositional Latent Diffusion for Controllable 3D Brain MRI Generation
* Authors: Anonymous ECCV 2026 submission
* Year: 2026
* Venue / source: ECCV 2026 submission (Paper ID #5202)
* Link: local PDF attachment from Slack (`5202_Anatomically_Compositiona.pdf`)
* Date read: 2026-03-27
* Why selected in one sentence: Tracy sent it with `/read`, so the job is to extract the real mechanism and whether the compositional idea is actually worth keeping.

## Quick verdict

* Useful

The core idea is real: split 3D brain MRI generation into anatomical parts, pretrain part-specific diffusion priors, then force a whole-brain latent diffusion model to refine an assembled composite. That is more interesting than yet another monolithic 3D LDM. But the evidence is mixed: the paper reports strong structural similarity gains and better seam coherence, yet some anatomy-aware volume metrics get much worse for GM/WM, which matters. So this looks like a concrete mechanism worth stealing, not a clean win you should trust blindly.

## One-paragraph overview

AnaDiffusion tries to fix a recurring problem in 3D brain MRI generation: whole-brain models can look plausible globally while quietly mangling local anatomy. The paper’s answer is to stop treating the brain as one entangled volume. It decomposes each scan into three coarse anatomical regions — left hemisphere, right hemisphere, and cerebellum-brainstem — trains diffusion models for those parts, then assembles generated parts into a coarse image-space scaffold. A whole-brain latent diffusion model is trained to take that scaffold, inject it into its latent trajectory at a chosen denoising step, and refine it into a globally coherent brain while preserving the part-specific anatomy. The main technical pitch is that this part injection plus latent anchoring loss improves both local fidelity and cross-part boundary consistency, while also allowing inference-time part replacement without needing a segmentation mask as an input at test time.

## Model definition

### Inputs
The learned system uses preprocessed 3D T1-weighted brain MRI volumes from ADNI, registered to MNI space and resampled to a common voxel grid. During training it also uses SynthSeg-derived part segmentations to extract three coarse parts: left hemisphere, right hemisphere, and cerebellar-brainstem complex. The whole pipeline consumes whole-brain volumes, cropped part volumes, diffusion timesteps, Gaussian noise, and for the shared hemisphere model a side indicator telling the model whether a sample corresponds to the left or right side.

### Outputs
It outputs:
- generated part assets for each anatomical region,
- an assembled coarse composite from those parts,
- and a final refined whole-brain MRI volume.

At inference, the intended practical output is a globally coherent 3D brain MRI that preserves the desired generated or replaced local parts.

### Training objective (loss)
There are two training stages.

1. **Stage I: pretrain autoencoders and diffusion priors.**
   - Autoencoders are trained with a weighted sum of reconstruction, KL, adversarial, and perceptual losses:
     `L_AE = λ_rec L_rec + λ_KL L_KL + λ_adv L_adv + λ_perc L_perc`.
   - Each denoiser is trained with the standard epsilon-prediction diffusion loss:
     `L_ε = E[ || ε - ε_θ(z_t, t) ||^2 ]`.

2. **Stage II: assemble-then-refine training.**
   - Part pipelines are frozen.
   - Only the whole-brain denoiser is optimized.
   - The full objective is:
     `L_DM = L_ε + λ_anchor L_anchor + λ_seam L_seam`.
   - `L_anchor` keeps the denoised latent close to the injected coarse latent inside the injected part mask.
   - `L_seam` supervises a narrow seam band around part boundaries to reduce discontinuities.

This is one of the paper’s strengths: the objective is stated clearly enough to understand what is doing the real work.

### Architecture / parameterization
The architecture is a compositional latent diffusion stack built from multiple autoencoder-plus-diffusion pipelines:
- one whole-brain latent diffusion model,
- one shared symmetry-aware hemisphere latent diffusion model,
- one cerebellar-brainstem latent diffusion model.

Implementation uses MONAI Generative Models, AutoencoderKL, and diffusion UNets in PyTorch. The right hemisphere is canonicalized by flipping it into left-oriented space during training, and a side embedding conditions the shared hemisphere denoiser so weights can be reused across hemispheres.

## Key questions this summary must address

### 1. What problem is the paper trying to solve?
3D brain MRI generators often get the global look right while failing locally: left-right inconsistency, boundary artifacts between structures, topological weirdness, blurred tissue interfaces, and midline collapse. The paper wants local anatomical fidelity and local controllability without relying on a segmentation map as a direct conditioning input at inference.

### 2. What is the method?
The method has three main pieces:

1. **Part decomposition**
   - Split each brain into three large parts using SynthSeg masks: left hemisphere, right hemisphere, and cerebellar-brainstem complex.

2. **Part prior learning**
   - Train part-specific LDMs.
   - Share one hemisphere model across left and right via left-right canonicalization plus side conditioning.

3. **Assemble then refine**
   - Sample or generate part crops.
   - Assemble them in image space into a coarse composite.
   - Re-encode that composite with the whole-brain encoder.
   - Inject the resulting latent into the whole-brain denoising trajectory at an auxiliary timestep.
   - Continue denoising with anchoring and seam losses so the final sample preserves local part structure while resolving global context and missing regions like CSF.

At inference, they set the injection late (`t_aux = 1`) to strongly enforce part faithfulness in the final output.

### 3. What is the method motivation?
The motivation is straightforward and reasonable: monolithic latent spaces waste capacity by forcing one model to handle anatomically heterogeneous structures with very different morphology. The cortex, hemispheres, and cerebellar/brainstem complex are not equally hard, and their boundaries are failure points. By learning regional priors first, then forcing a global model to reconcile them, the authors try to separate “get the local anatomy right” from “make the whole thing coherent.”

### 4. What data does it use?
ADNI T1-weighted 3D MRI.

Reported dataset details:
- 1,735 scans from 407 subjects
- 47.4% female
- age 55–93, mean 76.7
- diagnoses: 31.8% cognitively normal, 53.0% MCI, 16.9% AD
- subject-level split: 305 / 41 / 61 subjects for train / val / test
- scan counts: 1,288 / 156 / 291

Preprocessing includes N4 bias correction, skull stripping, affine registration to MNI, intensity normalization, resampling to 1.5 mm isotropic, clipping to the 1st–99th percentile within the brain mask, and scaling to [-1, 1].

### 5. How is it evaluated?
They evaluate with:
- whole-brain MS-SSIM,
- left hemisphere MS-SSIM,
- right hemisphere MS-SSIM,
- cerebellar-brainstem MS-SSIM,
- seam-band MS-SSIM around part interfaces,
- anatomy-aware evaluation using SynthSeg-derived structure volumes and absolute Cohen’s |d| between real and generated distributions.

Baselines are:
- unconditional whole-brain LDM,
- segmentation-mask conditional LDM,
- MorphLDM (template warping / deformation-field approach).

### 6. What are the main results?
Main reported MS-SSIM results on ADNI:
- **Whole brain:** Ours 0.8427 vs segmentation cLDM 0.7914 vs LDM 0.6656 vs MorphLDM 0.6824
- **Left hemisphere:** Ours 0.8012 vs 0.7015 vs 0.4265 vs 0.4638
- **Right hemisphere:** Ours 0.7954 vs 0.6181 vs 0.4414 vs 0.4692
- **CB:** Ours 0.7376, slightly below segmentation cLDM 0.7908
- **Seam:** Ours 0.7261 vs segmentation cLDM 0.6528 vs LDM 0.4526 vs MorphLDM 0.4810

Ablations:
- removing auxiliary losses hurts all metrics,
- removing latent injection hurts much more and nearly collapses the gains.

The anatomy-aware volume metric is more awkward:
- Ours is best on CSF (0.1936), cerebellum (0.0002), brainstem (0.0767),
- but much worse on GM (1.0153) and WM (0.9653).

That is not a side detail. It means the method may improve coarse part structure while distorting tissue-distribution realism inside those parts.

### 7. What is actually novel?
The most plausibly novel bits are:
- treating 3D brain MRI generation as compositional generation over anatomical regions rather than a single latent volume,
- a shared left/right hemisphere diffusion prior using flipping plus side conditioning,
- latent injection of an assembled coarse anatomical scaffold into a whole-brain latent diffusion trajectory,
- explicit seam-band supervision to reduce inter-part discontinuity.

None of these ingredients alone is magic, but the assembled package is reasonably specific.

### 8. What are the strengths?
- The mechanism is concrete rather than vibes-based.
- The paper clearly identifies a real failure mode: local anatomical nonsense inside globally plausible samples.
- The split into parts plus global refinement is intuitive and operational.
- The hemisphere weight-sharing trick is clean and data-efficient.
- The seam-band objective is a good targeted fix for exactly where composition tends to fail.
- The ablation supports that injection is not decorative; it appears to be the main driver.
- The pipeline gives actual controllability: replace a part and recompose.

### 9. What are the weaknesses, limitations, or red flags?
- **The segmentation-free claim is only partly true.** Inference may not require a segmentation mask as an input, but the whole setup depends heavily on SynthSeg-based decomposition during training and on fixed anatomical templates. This is not free of segmentation assumptions; it just hides them upstream.
- **The part decomposition is coarse.** Three parts is simple, but also blunt. It may dodge some problems while missing finer anatomical control.
- **GM/WM volumetric calibration gets much worse.** That is the biggest empirical warning sign in the visible tables.
- **Evaluation leans heavily on MS-SSIM.** That is useful, but medical image generation papers have a long history of looking good under perceptual similarity metrics while being clinically suspect.
- **Inference uses late injection at `t_aux = 1`.** That is effective for preserving parts, but may also amount to a strong overwrite rather than a genuinely harmonized generative process.
- **Anonymous submission status.** No code, no extra implementation detail beyond what is written, and no external replication evidence yet.

### 10. What challenges or open problems remain?
- Better tissue-level realism inside composed regions, especially GM/WM.
- Extending the method from coarse three-part composition to finer, more flexible anatomical factorization without making seam problems explode.
- Evaluating clinical validity with stronger structure-aware or downstream-task metrics.
- Reducing dependence on brittle upstream segmentation templates.
- Understanding when part injection helps versus when it just pastes in structure and relies on minimal denoising cleanup.

### 11. What future work naturally follows?
- Softer or learned injection schedules instead of hard overwrite at a single timestep.
- Finer-grained compositional units beyond hemispheres and CB/brainstem.
- Joint modeling of morphology and tissue composition so the method does not win on shape while losing on GM/WM calibration.
- Better anatomy-aware evaluation, possibly surface- or topology-based.
- Extension to pathology-conditioned or longitudinal brain generation, where controllable part editing could be genuinely useful.

### 12. Why does this matter?
Because controllable, anatomically sane 3D brain MRI generation is actually useful for augmentation, simulation, and counterfactual studies — but only if local structures are not fake mush. The paper matters less as “best new diffusion model” and more as a decent argument that compositional generation may be the right abstraction for structurally sensitive medical volumes.

### 13. What ideas are steal-worthy?
- **Assemble-then-refine** as a general pattern for structured generative problems.
- **Shared bilateral model with canonicalization plus side token** for symmetric anatomy.
- **Seam-band supervision** as a narrow, high-value loss target in compositional generation.
- **Image-space assembly followed by re-encoding** to avoid latent mismatch across independently trained autoencoders.
- **Late-stage latent injection** for controllable part replacement.

The best steal here is not “copy the whole pipeline.” It is the principle: learn high-fidelity local priors separately, then use a global model mainly as a compatibility resolver.

### 14. Final decision
**Keep the paper note.**

This is not must-read unless you are actively working on medical image generation or compositional diffusion. But it is solidly worth preserving because it contains a real mechanism, one clean reusable idea family, and one important cautionary lesson: improving local structural similarity is not the same thing as solving anatomical realism end to end.
