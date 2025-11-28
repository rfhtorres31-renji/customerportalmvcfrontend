# customerportalmvcfrontend

# Customer Portal POC – Frontend

## Overview

This project is a **minimal Customer Portal** frontend built with **Next.js**. It integrates with an **Express.js backend** to display customer bookings, booking details, attachments, and a messaging system. The solution demonstrates competence with React-based frontends, API consumption, and dynamic routing.

This POC was developed under a **5-hour time constraint**, prioritizing functionality over design aesthetics.

---

## Features

- **Login (email + phone)** – simple local storage-based login for POC purposes.  
- **Bookings Dashboard** – displays a list of bookings retrieved from the backend.  
- **Booking Details** – view individual booking information including:
  - Job description  
  - Date & status  
  - Job and billing addresses  
  - Work done description  
  - Attachments (download/viewable links)  
- **Messaging System** – send and receive messages related to a specific booking, persisted in the backend.  

---

## Tech Stack

- **Frontend:** Next.js, React, TypeScript, CSS  
- **Backend:** Express.js (integration via `/api` endpoints)  
- **Data Persistence:** In-memory storage for messages (can be replaced with database)  
- **API Integration:** ServiceM8 API for real booking data + mocked data fallback  

---

## Assumptions

1. **Authentication:** No real authentication or JWT; POC login is simulated via local storage.  
2. **ServiceM8 API:** The API may fail; mocked data is always returned as a fallback.  
3. **Messaging:** Messages are stored in-memory in the backend. This simplifies the POC but is suitable for demonstrating functionality.  
4. **UI/UX:** Minimal, functional layout to prioritize features over design.  

---

## Installation & Local Setup

### Prerequisites

- Node.js >= 18.x  
- npm or yarn  

### Backend Setup

1. Navigate to the backend folder:  

```bash
cd backend
