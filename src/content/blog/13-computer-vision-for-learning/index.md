---
title: "Computer Vision for Learning: A Builder's Working Theory"
summary: "Computer vision applied to skill learning often gets the architecture backwards. A working theory from building elevenset — why perception is becoming commodity, representation is where the work is, and the product I want to build is the one the learner eventually needs less of."
date: "2026-06-30"
tags:
  - AI
  - Computer Vision
  - Neuroscience
---

Most computer vision applied to skill learning gets the architecture backwards.

The default pattern is familiar. Pose models detect everything. Scoring layers grade everything. UI surfaces tell the learner exactly what to fix, instantly, at frame-rate granularity. Maximum immediacy, maximum prescription, maximum legibility. It demos well, it screenshots well, and it changes very little about how the learner actually plays.

I've been building elevenset — an AI tennis coach — for long enough to have a working theory of why this default keeps producing products that look impressive and don't compound. The theory is still evolving, but the spine is stable enough to write down. What follows is what I've actually come to believe, in the order the beliefs developed.

## The two claims under everything

Two claims sit underneath the rest of this post.

The first: in computer vision for skill, the interesting problem isn't perception anymore. Perception is rapidly becoming commodity. The interesting problem is what perception is *for* — how we represent it, what learning loop we wrap around it, and what the system asks the learner to do with what it shows her.

The second: a CV-based learning product is a learning system first, a vision system second. The CV is the measurement layer. The learning loop is the product. If you confuse the two, you build something that sees beautifully and teaches nothing.

These claims sound abstract until they collide with engineering choices. Most of this post is about that collision.

## Perception is commodity, representation isn't

Google's MediaPipe Pose Landmarker gives you 33 body landmarks at real-time framerates on a phone, with normalized image coordinates and a 3D world-coordinate output. Stanford's OpenCap estimates 3D skeletal kinematics from a single smartphone video with rotational error around 4.8°, outperforming baseline CV models on translational accuracy by close to 70%. Self-supervised pose-representation work like MotionBERT is pushing the field toward general-purpose motion embeddings.

The technology to *see* the body has largely arrived. What's much less solved is what you do with the signal afterward.

The default move is to operate on the per-frame pose stream — landmarks, angles, velocities, frame by frame — and to surface those measurements directly to the learner. The result reads like a wall of numbers, or worse, a stream of corrections at frame-rate. Neither matches how anyone teaches or learns tennis.

A coach doesn't think in frames. A coach thinks in **setup → load → contact → follow-through**. They evaluate within those phases, not across them. They notice that the player's hips opened too early in the load phase, or that the contact point drifted forward across the last fifteen shots. The unit of evaluation in coaching is the *phase*, not the frame.

This isn't a UI insight. It's a representation choice that propagates all the way down. Phase-aligned representations make feedback coachable. They make comparisons over time meaningful — *"your load phase has gotten more compact since last month"* is a sentence you can compute. They make per-shot evaluation cleanly composable from per-phase evaluation. They make personalization tractable, because you can model a learner's tendencies at the phase level rather than as a soup of pose vectors.

The work moves from **video → per-frame pose → noisy corrections** to **video → per-frame pose → phase segmentation → phase-resolved features → coachable feedback**. Two steps inserted, and the entire product changes shape.

The pattern generalizes beyond tennis. Any motor skill that decomposes into phases — golf swings, surgical knot-tying, weightlifting, even classroom procedures — benefits from the same representational move. Perception is the input. Representation is where the work is.

## Authentic data beats clever models

The most underappreciated finding in sports CV I've come across recently is from the AthleticsPose paper: models trained on imitated motion — actors miming athletic movement in lab conditions — don't transfer to real performance. Training on on-field, in-context motion reduced Mean Per Joint Position Error by roughly 75% compared to models trained on staged motion. The gap isn't a tuning gap. It's a representation gap. The body moves *differently* under actual performance conditions, and models that haven't seen those conditions confidently produce wrong outputs.

This finding lands differently when you've shipped. Most CV-for-sport products start with pre-trained models on academic datasets and assume their accuracy claims will hold in the wild. Then accuracy collapses on real users in real environments — bad lighting, partial occlusion, weird camera angles, athletes moving at full speed — and the team spends six months wondering why.

The honest answer is usually that they skipped the unsexy work. The moat in performance CV isn't the model architecture. It's owning a pipeline that captures, labels, and feeds back in-context data at scale. **Capture → label → train → deploy → capture more → relabel → retrain**. That loop, run for long enough, beats clever modeling tricks from teams who don't have the data.

This is also, incidentally, the part of the work that doesn't show up in conference papers. It's measurement infrastructure, labeling protocols, error budgets, drift monitoring. None of it is glamorous. All of it compounds.

There's an even harder version of this point. The data that matters isn't just "authentic" — it's *contextually annotated* in ways that let you connect movement to outcomes. A serve that landed in the box at 180 km/h with the opponent off-balance carries different information than a serve that looked identical biomechanically but went long. Owning the pipeline means owning the labels that connect form to function, not just the pixels.

## Feedback timing is a learning-science question, not a UX one

This is the section where most CV-for-coaching products go wrong, and where the learning-science literature has been ahead of the AI literature for thirty years.

The default product impulse is to surface feedback as fast and as completely as possible. Instant, comprehensive, prescriptive. It looks like value. The user sees the system "working." The screenshots are good. The reviewer in the App Store says it's like having a coach in your pocket.

Robert Bjork's research program on "desirable difficulties" complicates this picture considerably. The short version: conditions that make learning *harder* in the short term — spaced rather than massed practice, interleaved rather than blocked practice, *delayed* rather than immediate feedback — often produce better long-term retention and transfer. The reason is roughly that the cognitive work of struggling, retrieving, and self-correcting is what consolidates skill. Frictionless feedback that hands the learner the answer can short-circuit the very process that produces durable improvement.

This finding has an uncomfortable implication for product design. The instinct to give instant, granular, prescriptive feedback may be optimizing for *engagement* and *perceived value* at the cost of *actual learning*. The user feels like they're getting more help. They are, in fact, getting less skill transfer per session.

The same lens applies to the *volume* of feedback. Surfacing every mistake makes the learner dependent on the system's evaluation rather than building her own. Self-regulated learning research, particularly the work of Schunk and Zimmerman, treats the learner's capacity to monitor and evaluate her own performance as a core component of expertise. A system that does all the monitoring substitutes for the very capacity it's supposed to develop.

So the design question stops being *"how fast can we give feedback"* and becomes *"when does feedback actually change behavior, and at what cost to the learner's developing self-evaluation?"* That's a deeper question, and the right answer is almost always *less feedback, later, at a coarser grain than the system is capable of producing*.

## The design principle: perceptual prosthesis, not coach replacement

These three positions converge on a single design principle that's shaped most of how elevenset is built.

The system's job is to expand the learner's perceptual access to her own performance — not to make decisions for her, not to grade her, not to prescribe corrections she didn't ask for. Show what happened at a resolution she can't perceive unaided. Leave interpretation, goal-setting, and adjustment with her.

The deepest version of this comes from James Gibson's ecological psychology, specifically the idea of *perceptual learning* — the claim that much of skill acquisition is learning to perceive what an environment affords for action. A novice player and an expert literally see the court differently. The expert sees angles, timing windows, openings, threats. Skill isn't only better execution; it's better perception.

Reframed through this lens, what a CV-for-learning system is *actually* doing — at its best — is training perception. Not just measuring movement, but teaching the learner what to attend to. Over time, she should need the system less, because the perceptual lens it provided has become her own.

That endgame is the test of whether the design principle is real. If the system makes the learner more dependent on it over time, you've built engagement, not learning. If the system makes the learner gradually less dependent on it, you've built education.

## Where the moat goes when perception is cheap

The corollary to "perception is commodity" is uncomfortable for anyone whose pitch is *"we have great CV."* In two or three years, everyone will. The relevant question is what becomes valuable when seeing the player is no longer a differentiator.

The answer I keep coming back to is the longitudinal model of the specific learner. Her movement signature, her tendencies, her growth trajectory, her failure modes under pressure — represented at the phase level, accumulated across sessions, evolving as she does. Not a generic player model. *Her* model.

What that model enables that the world doesn't have today is roughly four things. It enables counterfactual reasoning about her practice: given how she moves and what she's working on, what's the most likely effect of changing her grip, her stance, her training distribution over the next month? It enables personalized desirable difficulties: Bjork's research says the learning gains come when challenge is calibrated to the learner's current state, and a model of *her* current state is the precondition for that calibration. It enables transfer prediction: will what she's working on in practice show up in a match, and how would we know? And it gives a coach a tool no coach has today — the ability to ask, *"when she's tired, does her contact point drift forward or back?"* — and get an answer grounded in years of her data, not the coach's memory.

That's where the moat goes. Not seeing the player. The relationship between the player and a model of herself that gets richer with every session.

## Failure modes and tradeoffs

This working theory has several places it can break. Naming them honestly.

The over-prescription failure mode is the one most products fall into. A system that prescribes too much, too fast, erodes the learner's autonomy and short-circuits self-regulated learning. The product feels valuable but produces dependent learners. The tell: usage that doesn't decrease over time as skill grows.

The single-accuracy failure mode is the evaluation analog. If you grade your system on one number — per-joint error, or per-shot classification accuracy — you'll miss the failures that matter for learning. Different errors degrade the learning experience differently. The right evaluation surface is failure-mode buckets — what kinds of wrong, in what contexts, with what consequences for the loop — not a leaderboard.

The sycophantic feedback failure mode is the social one. A system that defaults to positive reinforcement to keep engagement up will produce learners who feel good and don't improve. Useful coaching often involves saying things the learner doesn't want to hear. A learning system has to be willing to do the same.

The generic-model failure mode is the longitudinal one. A system that treats every learner as the population average fails the people whose movement deviates from that average — which is most learners, in most ways. The longitudinal model is the answer here, but it's expensive to build and only becomes valuable after months of session data per learner. Early-stage products live in the gap before the model is rich enough to personalize. Bridging that gap honestly — without faking personalization the system can't yet deliver — is one of the hardest product problems in this space.

## Where I'm working from here

The current frontier for elevenset, in priority order: phase segmentation that's robust across player styles and camera angles; an evaluation framework that buckets failures by their cost to the learning loop; early data infrastructure for a longitudinal learner model that gets richer per session; and explicit design choices that preserve autonomy — what the system shows, what it withholds, what it asks the learner to decide.

None of these are computer vision problems in the narrow sense. All of them depend on solid CV underneath. That's the relationship between the measurement layer and the product the working theory points at.

The product I want to build is the one the learner eventually needs less of, because the perceptual lens it taught her has become her own. Whether or not we get there is the question that matters. Everything else is implementation detail.

## Further reading

Vision and motion. MediaPipe Pose Landmarker is Google's open-source pose estimation toolkit and a sensible baseline for any production CV-for-skill pipeline. OpenCap from Stanford does markerless biomechanics from smartphone video, with published kinematic accuracy benchmarks that set a useful reference for "what's possible from a phone." MotionBERT is self-supervised representation learning for human motion — currently one of the strongest arguments that pose-as-sequence carries enough signal for general-purpose motion understanding. AthleticsPose is the dataset paper that quantifies how much accuracy is lost when models trained on imitated motion are deployed on authentic on-field data.

Learning science. Robert Bjork's program on desirable difficulties is the foundational work on why immediate, frictionless feedback often hurts long-term skill transfer. K. Anders Ericsson on deliberate practice is the canonical theory of how expertise is built — aging in places but still the reference everyone in skill acquisition starts from. Dale Schunk and Barry Zimmerman on self-regulated learning describe the three-phase loop (forethought, performance, self-reflection) that I think any AI-for-learning system should be designed to support rather than replace.

Perception and skill. James Gibson's *The Ecological Approach to Visual Perception* introduces affordance theory and perceptual learning — the deepest available frame for what skill acquisition actually is. The multimodal learning analytics literature, fusing vision, audio, biosensors, and behavioral data to study learning in context, is useful for placing single-modality CV work inside a larger research field.

---

*Published by Hannah Zhao*