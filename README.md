# 🎙️ VoiceAuthentix – AI Deepfake Audio Detection Platform

<p align="center">

**Detect AI-generated and manipulated speech using AI-powered audio forensics.**

</p>

<p align="center">

![VoiceAuthentix](https://img.shields.io/badge/VoiceAuthentix-AI%20Audio%20Forensics-gold)
![Frontend](https://img.shields.io/badge/Frontend-HTML%20%7C%20CSS%20%7C%20JavaScript-blue)
![Backend](https://img.shields.io/badge/Backend-FastAPI-green)
![Deep Learning](https://img.shields.io/badge/AI-CNN%20%2B%20BiLSTM-purple)
![License](https://img.shields.io/badge/License-Educational-lightgrey)

</p>

---

## 🚀 Overview

**VoiceAuthentix** is an AI-powered deepfake audio detection platform designed to determine whether a voice recording is **REAL (Human)** or **FAKE (AI-Generated/Synthetic)**.

The platform combines a modern web interface with a deep learning backend to provide audio analysis, real-time recording, batch processing, authentication, result sharing, and downloadable PDF reports.

The frontend communicates with the VoiceAuthentix backend API to send audio data and display AI detection results in an easy-to-understand interface.

---

# 🎯 Problem Statement

The rapid development of Generative AI and voice-cloning technologies has made it increasingly difficult to distinguish between genuine human speech and AI-generated speech.

Synthetic voices can potentially be used for:

- Voice impersonation
- Financial fraud
- Social engineering
- Identity attacks
- Fake recordings
- Misinformation
- Unauthorized voice cloning

VoiceAuthentix provides an AI-powered solution for analyzing suspicious audio recordings.

---

# 💡 Solution

VoiceAuthentix provides a complete audio-forensics workflow:

```text
                🎙️ Audio Input
                      │
          ┌───────────┴───────────┐
          │                       │
       Upload                  Record
          │                       │
          └───────────┬───────────┘
                      ▼
              Audio Processing
                      │
                      ▼
               Backend API
                      │
                      ▼
             Deep Learning Model
                      │
              ┌───────┴───────┐
              ▼               ▼
            REAL             FAKE
              │               │
              └───────┬───────┘
                      ▼
               Result Dashboard
                      │
          ┌───────────┼───────────┐
          ▼           ▼           ▼
       Share       PDF Report   Analysis
