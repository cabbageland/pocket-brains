# OmniEEG-Bench: A Standardized Evaluation Benchmark for EEG Foundation Models

## Basic info

* Title: OmniEEG-Bench: A Standardized Evaluation Benchmark for EEG Foundation Models
* Authors: Ziling Lu, Zongsheng Li, Xinke Shen, Kexin Lou, Yingyue Xin, Xiaoqi Chen, Shinan Wang, Xiang Chen, Jiahao Fan, Chenyu Huang, Xin Xu, Zhoujie Hou, Chen Wei, and Quanying Liu
* Year: 2026
* Venue / source: arXiv preprint
* Link: https://arxiv.org/abs/2606.00815
* PDF: https://arxiv.org/pdf/2606.00815
* Date read: 2026-06-30
* Date surfaced: 2026-06-30
* Surfaced via: Tracy in #pocket-brains
* Tags: EEG, foundation models, benchmarks, BCI, neurotechnology, brain decoding
* Why selected in one sentence: It is a useful benchmark paper for checking whether EEG foundation models are actually learning transferable neural representations, rather than just winning scattered single-dataset demos.

## Quick verdict

* Highly relevant

This is a very pocket-brains paper. It is not introducing a new EEG foundation model; it is trying to make the existing model zoo answer to one standardized evaluation harness. That is valuable because EEG foundation-model claims are easy to overstate when every paper chooses its own datasets, splits, channel assumptions, and task framing. OmniEEG-Bench gives the field a shared task taxonomy, evaluates ten representative EEG foundation models across 54 datasets and 58 tasks, and shows a mixed picture: pretraining helps, but frozen representations are still far from universally useful. The most useful takeaway is not “BrainOmni wins.” It is that EEG foundation models remain highly task- and protocol-sensitive, and progress probably needs broader pretraining diversity plus better handling of real-world channel and subject variability.

## One-paragraph overview

OmniEEG-Bench is a standardized benchmark for EEG foundation models spanning six task families: signal reliability, biometrics and disease, consciousness and state, cognition and emotion, naturalistic stimulus decoding, and motor and interaction. The benchmark unifies preprocessing, task definitions, model interfaces, and evaluation protocols across 54 datasets and 58 tasks, then evaluates ten EEG foundation models including BrainOmni, CBraMod, REVE, FEMBA, LaBraM, NeuroLM, BIOT, EEGMamba, NeuroGPT, and BENDR. The primary evaluation emphasizes cross-subject transfer with linear probing, because a useful foundation model should generalize to unseen people without full retraining. The results show that BrainOmni, CBraMod, and REVE are strong in different settings, full fine-tuning changes the ranking substantially, naturalistic stimulus decoding remains one of the hardest categories, and model performance is associated with both pretraining dataset diversity and model size.

## Model definition

### Inputs
EEG datasets with heterogeneous channel layouts, sampling rates, clinical or behavioral labels, and task structures, standardized into a shared benchmark pipeline with dataset-specific windowing, filtering, resampling, segmentation, and train/validation/test splits.

### Outputs
A leaderboard and diagnostic evaluation of EEG foundation models across task families, including balanced accuracy under cross-subject transfer, multi-subject adaptation, zero-/few-shot adaptation, channel masking robustness, and full fine-tuning.

### Training objective (loss)
OmniEEG-Bench itself is not a new model with a new loss. For the primary benchmark, each pretrained backbone is frozen and a lightweight linear classifier is trained on top of its EEG representation. Full fine-tuning is also used as a performance-ceiling comparison.

### Architecture / parameterization
The benchmark wraps each EEG foundation model in a common interface that maps an EEG sample into a representation, then applies a standardized classifier. The evaluated models span Transformers, Criss-Cross Transformers, Mamba-style sequence models, contrastive biosignal encoders, masked reconstruction models, and multitask/autoregressive EEG-language systems.

## Key questions this summary must address

### 1. What problem is the paper trying to solve?
The paper is solving a comparability problem. EEG foundation models are now being pitched as general-purpose neural-signal representation learners, but their evaluations are fragmented. One model may be tested on sleep staging, another on motor imagery, another on clinical abnormality detection, and each may use different splits, preprocessing, channel assumptions, and metrics. That makes it hard to know whether a model is genuinely general or merely optimized for a favorite benchmark corner.

OmniEEG-Bench tries to define the shared scoreboard: what should an EEG foundation model be tested on, how should the data be processed, and what kinds of generalization should count?

### 2. What is the method?
The method is benchmark construction plus standardized evaluation.

The core steps are:
- define a six-family task taxonomy for EEG foundation-model evaluation;
- collect and organize 54 datasets covering 58 classification tasks;
- standardize preprocessing with filtering, resampling, referencing, segmentation, and HDF5 storage;
- wrap ten EEG foundation models behind a common representation interface;
- evaluate primarily with frozen-backbone linear probing under cross-subject transfer;
- add multi-subject trial-level adaptation, zero-/few-shot adaptation, channel corruption tests, and full fine-tuning comparisons;
- analyze which model and pretraining factors predict better ranks.

### 3. What is the method motivation?
The motivation is correct: “universal EEG representation” is not a meaningful claim unless the field agrees on the capability axes. EEG use cases differ a lot. Some care about stable trait information, some about transient states, some about clinical abnormality, some about affect, some about naturalistic stimulus decoding, and some about fast motor or SSVEP control. A benchmark that only tests one or two of these regimes can reward the wrong model.

The benchmark also emphasizes cross-subject transfer because that is the real foundation-model promise. If a representation only works after heavy subject-specific adaptation, it may still be useful, but it is weaker than the marketing language usually implies.

### 4. What data does it use?
The benchmark uses 54 EEG datasets spanning 58 tasks. The dataset inventory includes artifact/noise identification, longitudinal test-retest reliability, MPI-LEMON derived biometrics, epilepsy and abnormal EEG datasets, ADHD, Alzheimer’s disease, Parkinson’s disease, depression and psychiatric phenotype datasets, sleep staging, cognitive task identification, vigilance, emotion recognition, natural speech and reading tasks, visual semantic categorization, motor imagery, SSVEP, error-related potential feedback, and EEG-controlled exoskeleton control.

The paper groups these tasks into six families:
- signal reliability;
- biometrics and disease;
- consciousness and state;
- cognition and emotion;
- naturalistic stimulus decoding;
- motor and interaction.

### 5. How is it evaluated?
The primary leaderboard uses linear probing with frozen pretrained backbones, prioritizing cross-subject transfer. Subjects are split into train, validation, and test groups when that formulation is meaningful. The benchmark also reports multi-subject adaptation, where trials are split within subjects and pooled; zero-/few-shot adaptation, where only small fractions of labels are used; channel masking robustness, where random channels are zero-masked at increasing corruption ratios; and full fine-tuning, where the whole model is adapted end-to-end.

The metric is mostly balanced accuracy for classification tasks. The authors average over multiple fixed random splits and report model ranks as well as detailed per-dataset scores.

### 6. What are the main results?
The headline result is that BrainOmni achieves the best overall average rank in the primary cross-subject linear-probing benchmark, followed by CBraMod and REVE. But this ranking is not stable across evaluation modes. Under full fine-tuning, CBraMod, LaBraM, and FEMBA become the top three overall models, suggesting that some architectures benefit much more from task-specific end-to-end optimization than from frozen-representation transfer.

The second result is that current EEG foundation models are far from universally strong. Naturalistic stimulus decoding is especially difficult. Tasks like speech attention, forward-versus-reversed speech, image concept identification, error-related potential detection, Parkinson’s detection, and arousal classification remain hard for many models.

The third result is that pretraining dataset diversity and model size both correlate with better average ranks. The paper reports significant negative correlations between rank and the number of pretraining datasets, and between rank and parameter count, meaning that broader pretraining and larger models tend to do better. Publication year, masked reconstruction, VQ-based tokenization, and Criss-Cross spatial modeling also show favorable associations.

The fourth result is a caution: frozen representations still lag. Under full fine-tuning, most foundation models beat task-specific baselines like EEGConformer and EEGNet, but under linear probing only about half beat EEGConformer. That says the “foundation” part is still incomplete.

### 7. What is actually novel?
The novelty is the benchmark framing and scope, not a new model architecture. The paper’s useful contribution is turning EEG foundation-model evaluation into a more systematic capability map:
- six task families instead of one-off dataset wins;
- standardized task cards and preprocessing;
- cross-subject transfer as the main test;
- zero-/few-shot and channel robustness probes;
- analysis of what model-design and pretraining factors predict performance.

That matters because EEG is unusually sensitive to preprocessing, montage, subject identity, artifact structure, and task timing. A shared benchmark is more valuable here than another isolated model release.

### 8. What are the strengths?
- It asks the right meta-question: are EEG foundation models actually transferable?
- The task taxonomy is broad and sensible.
- Cross-subject transfer is correctly treated as the primary test.
- The benchmark includes clinical, cognitive, naturalistic, and BCI-style tasks rather than only classic motor imagery or sleep staging.
- It compares both frozen linear probing and full fine-tuning, which keeps the “representation quality” question separate from “can this architecture adapt if trained end-to-end?”
- The analysis of pretraining diversity, model size, tokenization, and spatial modeling is strategically useful.
- The paper is unusually explicit about channel handling differences across models, which is a major practical issue in EEG.

### 9. What are the weaknesses, limitations, or red flags?
- Benchmark design choices still matter a lot: windowing, downsampling to 40 samples per subject per class, preprocessing, channel policies, and task-card definitions can all affect rankings.
- The benchmark is classification-heavy; regression and richer continuous decoding are much thinner.
- Parameter-efficient adaptation is not explored, even though it may be a practical sweet spot between frozen probing and full fine-tuning.
- The dataset set is broad but not exhaustive across clinical populations, devices, geographies, or noisy consumer contexts.
- Channel masking is a useful probe, but random zero-masking is a simplified version of real electrode failure, poor contact, missing montages, and motion artifacts.
- Some models are incompatible with some datasets due to channel configuration constraints, which makes rank aggregation inherently messy.

### 10. What challenges or open problems remain?
The biggest open problem is whether EEG foundation models can produce genuinely reusable representations across people, hardware, tasks, and clinical contexts. The benchmark suggests partial progress, but also shows that frozen transfer is still fragile. Naturalistic decoding remains especially weak, which matters because rich real-world stimuli are where “brain decoding” rhetoric usually wants to go.

Another open problem is evaluation realism. Real deployments need robustness to messy montages, movement, impedance shifts, state changes, demographic variation, and device differences. OmniEEG-Bench starts measuring some of this, but the field still needs more realistic stress tests.

### 11. What future work naturally follows?
- Add parameter-efficient adaptation methods such as adapters, LoRA-style modules, or prompt-like subject conditioning.
- Expand beyond classification into continuous regression, sequence prediction, event timing, and retrieval-style decoding.
- Add more naturalistic audio, visual, language, and interaction datasets.
- Build better robustness tests for real electrode failures, mobile EEG, motion contamination, and cross-device transfer.
- Report uncertainty and per-task failure modes instead of only aggregate ranks.
- Use the benchmark to design new pretraining mixtures rather than just evaluate existing models.

### 12. Why does this matter?
It matters because EEG foundation models are at the stage where the rhetoric is running ahead of the evidence. A benchmark like this is the boring but necessary infrastructure that turns “general-purpose brain model” into a testable claim. For neurotech and BCI, the central question is not whether a model can squeeze performance out of one curated dataset. It is whether it can survive new subjects, new channel layouts, new tasks, low labels, and sensor degradation.

## Why It Matters

For Pocket Brains, this paper is worth keeping because it gives a grounded read on the EEG foundation-model landscape. The most interesting signal is not simply that bigger and broader models do better. It is that the current generation still depends heavily on task-specific adaptation, while naturalistic and interaction-heavy tasks remain brittle. That is exactly the gap between “nice benchmark paper” and usable brain-interface infrastructure.

### 13. What ideas are steal-worthy?
- Evaluate brain models across capability families, not just favorite datasets.
- Treat cross-subject transfer as the core test of foundation-model value.
- Separate frozen-representation quality from full fine-tuning potential.
- Track channel handling as a first-class model design choice.
- Use pretraining dataset diversity as a serious scaling axis, not just parameter count.
- Include naturalistic stimulus decoding early, even if current models look bad there.
- Report robustness to missing or corrupted sensors as a normal benchmark dimension.

## 14. Final decision
Keep. This is a strong Pocket Brains entry because it is an infrastructure paper for judging neuro-AI claims. The conclusion is appropriately sobering: EEG foundation models are improving, and broader pretraining plus bigger models seem to help, but frozen cross-subject generalization is still limited. Anyone building or evaluating EEG-based brain models should have this benchmark in the shelf.
