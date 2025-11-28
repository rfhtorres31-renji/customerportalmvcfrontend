# Customer Portal POC – Frontend

## Overview

This is the **frontend** of a minimal Customer Portal POC built with **Next.js**.  
It integrates with an **Express.js backend** to display customer bookings, booking details, attachments, and a messaging system.  
The focus is on **functionality** under a strict **5-hour time constraint**.

---

## Features

- **Login (Email + Phone)** – simple login using local storage for POC purposes.  
- **Bookings Dashboard** – displays a list of customer bookings retrieved from the backend.  
- **Booking Details** – view individual booking information including:
  - Job description  
  - Date & status  
  - Job and billing addresses  
  - Work done description  
  - Attachments (links for download/view)  
- **Messaging System** – send and receive messages related to a booking.

---

## Tech Stack

- **Next.js** for frontend pages and dynamic routing  
- **React** (with TypeScript) for components and state management  
- **CSS** for styling  
- **Fetch API** for backend integration  

---

## Assumptions

- **Authentication:** Simulated using local storage (no JWT or real auth).  
- **Backend:** Assumes backend is running locally at `http://localhost:3304/api`.  
- **ServiceM8 Data:** Real API + mocked fallback data.  
- **UI:** Minimal and functional; priority is feature demonstration.  

---

## Installation & Setup

### Prerequisites

- Node.js >= 18.x  
- npm or yarn  

### Steps

1. Navigate to the frontend folder:

```bash
cd customerportalmvcfrontend

2. Install dependencies:

npm install


3. Start the development server:

npm run dev


Frontend will run at http://localhost:3000

Make sure the backend is running at http://localhost:3304/api before using the app.

Usage
# Open the app in your browser
http://localhost:3000


Log in with any email and phone number (POC simulation).

Navigate to Bookings Dashboard to see all bookings.

Click View to see booking details, attachments, and messages.

Send messages in the text area; messages are persisted in the backend.

Folder Structure
frontend/
├─ app/                  # Next.js pages & components
│  ├─ bookings/          # Bookings list & dynamic details page
│  ├─ dashboard.css      # Styles for dashboard
├─ public/               # Static assets
├─ package.json
├─ tsconfig.json

Potential Improvements
- Implement real authentication (JWT/session-based).
- Persist messages in a database instead of in-memory storage.
- Real-time messaging via WebSockets.
- Improved UI/UX with responsive design and better layouts.
- Enhanced error handling and loading states.

AI Assistance
AI-assisted tools were used to:
- Scaffold frontend components quickly
- Generate Next.js page structure and state management
- Optimize API integration and routing
- Suggest folder structure and README formatting
