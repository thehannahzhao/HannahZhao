---
title: "elevenset"
summary: "AI-powered video intelligence system for tennis coaching and human performance feedback"
date: "Early 2025"
draft: false
tags:
- AI Systems
- Computer Vision
---

## Overview

elevenset is an AI-powered tennis coaching system that analyzes player videos and turns raw footage into structured, actionable feedback. The project started as an MVP for tennis video analysis and evolved into a production-oriented system combining video processing, computer vision, multimodal AI, and scalable backend infrastructure.

## What I Built

- Built elevenset from MVP to production, leading product design, system architecture, and technical implementation across the video intelligence pipeline.
- Designed an end-to-end video processing pipeline covering video upload, FFmpeg processing, cloud storage, metadata extraction, rally segmentation, pose estimation, shot classification, and highlight generation.
- Implemented FFmpeg-based workflows for video compression, format normalization, clip generation, watermarking, and export-ready highlight videos.
- Developed computer vision and signal-processing components to detect key tennis events, analyze movement patterns, and structure raw footage into meaningful training moments.
- Built a multimodal AI coaching layer that combines video context with LLM reasoning to generate personalized feedback for players.
- Architected backend systems using FastAPI, PostgreSQL, and asynchronous task queues to support long-running video jobs, real-time status updates, and batch processing.
- Designed infrastructure around cloud storage, worker queues, API services, and processing states to improve reliability, latency, and scalability.
- Improved system robustness by separating core video processing from AI coaching generation, allowing the product to degrade gracefully when individual components fail.

## Key Learnings

elevenset taught me that real-world AI products are not just about models. The difficult part is building reliable systems around messy inputs: large video files, inconsistent recording angles, noisy audio, long-running processing jobs, and user expectations around speed and feedback.

The biggest product shift was moving from “analyze a video” to building a feedback loop: video → structured events → coaching insight → player action → progress over time.