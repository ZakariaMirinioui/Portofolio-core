# Project Questions for Thin Pages

This document lists specific, targeted questions for each page where the documented fact sheets are thin or where key operational details are unconfirmed. Answering these questions will allow enriching these pages with verified details without overstating anything.

---

## 1. SECUDRIVE (Logistics Tracking System)
*Current state: Built only from the existing portfolio page and card text. High-level architecture (React, Spring Boot, PostgreSQL, REST & GraphQL).*
- **Questions:**
  1. What specific user roles interact with this system (e.g., dispatchers, security officers, fleet managers, station agents)?
  2. What are the key workflows (e.g., real-time cash vault tracking, route deviation alerts, guard check-ins, custody handover verification)?
  3. Are there verified metrics beyond latency optimization (e.g., number of tracked vehicles/routes, daily active transit logs)?
  4. Is this system deployed in active production at Brink's Morocco or another client, and what is the confirmed duration/dates?
  5. Is this web platform part of the same umbrella as "SECUDRIVE Mobile" (the Flutter rider/driver app), or are they separate projects?

---

## 2. SECUDRIVE Mobile (Flutter Rider & Driver App)
*Current state: Fact sheet documents rider/driver registration, ride requests, driver earnings, and Supabase integration.*
- **Questions:**
  1. Is this app in active pilot or client use, or is it a completed prototype / codebase?
  2. Are real-time rider tracking and push notifications fully wired with a live Supabase project, or in staging?
  3. Is there a target launch market, city, or operational partner?
  4. Should this be presented as an independent freelance mission, or merged into the SECUDRIVE web case study under a Web & Mobile tab?

---

## 3. AutoDeal (Android Car Marketplace — PFE)
*Current state: Final-year project (PFE). Fact sheet documents offer browsing, search, creating/editing offers, messaging, and Supabase backend.*
- **Questions:**
  1. Are car-specific inspection criteria, vehicle VIN decoding, or mileage verification features implemented in code?
  2. Was the app evaluated and graded for your PFE, and what was the official academic date or jury verdict?
  3. Is there an active Supabase project URL or demo video we can reference, or is source code private?
  4. What specific automotive workflows (rental vs. sale vs. lease) are complete and tested?

---

## 4. CourierGo (Delivery-Worker Companion App)
*Current state: Delivery-worker companion app (not a customer storefront). Worker auth, profile, delivery history, maps.*
- **Questions:**
  1. What backend does the app connect to (e.g., custom REST API, WooCommerce, Laravel API)?
  2. Has Firebase Cloud Messaging (FCM) or push order notifications been activated, or is it planned?
  3. Which client or service commissioned this freelance mission?
  4. Does the app support turn-by-turn navigation or external Google Maps / Waze deep linking?

---

## 5. RideLink (Ride-Sharing and Parcel App)
*Current state: Fact sheet documents ride/trip requests, parcel delivery workflows, geolocation, and payment/wallet screens.*
- **Questions:**
  1. Which of the platform builds (Android, iOS) were tested on real physical devices?
  2. Has the payment gateway integration (e.g., Stripe, local payment provider) been live-tested with test cards?
  3. Is the parcel delivery module a point-to-point courier workflow, or scheduled drop-offs?
  4. Which client or market was this freelance mission tailored for?

---

## 6. KombatSushi (Customer Ordering Apps)
*Current state: Live website linked (https://kombatsushi.com/). Fact sheet documents menu, cart, delivery/takeaway, order tracking, WebView payment.*
- **Questions:**
  1. The portfolio card previously mentioned "Restaurant management system with POS and kitchen display". Is there a separate POS or kitchen display (KDS) codebase, or was that an aspirational description?
  2. Between the two Flutter variants and the older React Native Expo app, which one is currently in active customer use?
  3. What restaurant locations or cities are currently serviced by the ordering system?

---

## 7. EvolutionAgent (103-Node n8n Conversational WhatsApp Agent)
*Current state: 103-node n8n workflow export with Redis buffering and Gemini AI.*
- **Questions:**
  1. Was this workflow deployed in production for a commercial client or tested in a production environment?
  2. What average message burst volume or latency was observed during testing?
  3. Are there specific client testimonials, screenshots, or demo videos available?

---

## 8. SalesBot (30-Node WhatsApp AI Sales Bot)
*Current state: 30-node active n8n export with Gemini audio transcription, OpenAI memory, and Google Sheets.*
- **Questions:**
  1. For which store or e-commerce merchant was this jewelry sales bot (Necklace/Bracelets) developed?
  2. Has it processed live customer orders and real payments, or was it a completed sandbox deployment?
  3. What prompt configurations or product catalog APIs are currently connected?

---

## 9. N8nLibrary (Curated 293-Template Collection)
*Current state: Curated reference collection across 18 operational categories.*
- **Questions:**
  1. Would you like to provide a direct GitHub or downloadable zip link for visitors to browse these blueprints?
  2. Which 3-5 categories would you like highlighted as your primary consulting specialties?
