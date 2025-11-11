# Snowball Detector

*A personalized study-tracking dashboard built with React, Recharts, and Supabase.*

## Overview

**Snowball Detector** is a web application I built to track my study sessions and visualize how I distribute time accross classes.

The App flags under-prioritized courses by analyzing logged study sessions and dynamic charts to highlight study imbalances.

This project is intended for personal use and runs locally. It is not deployed publicly.

## Features
- Session Logging — Add, edit, and remove study sessions with class, duration, and timestamp.
- Dynamic Visualization — Uses **Recharts** to display total study hours and trends accross subjects.
- Prioritization Detection — Highlights classes that have been under-studied relative to others.
- Persistent Storage — Stores data in **Supabase**, allowing secure and scalable data management.

## Tech Stack

- **Frontend:** React, HTML, CSS, JavaScript
- **Charts:** Recharts
- **Backend:** Supabase

## Setup Instructions

> This project is intended for personal/local use (as of now). You'll need a Supabase project and API keys.

### 1. Clone the repository
```
git clone git@github.com:alalegre/snowball-detector.git
cd snowball-detector
```
### 2. Install dependencies
```
npm install
```

### 3. Configure environment variables
Create a `client.js` file in the `src` folder and copy this inside:

```
import { createClient } from '@supabase/supabase-js'

const URL = '<your URL>';
const API_KEY = '<your API>';
export const supabase = createClient(URL, API_KEY);
```

### 4. Start the development server

```
npm run dev
```

## How it Works

- Each study session is logged with a class name, topic, study duration, date, and notes about the study session.
- The app aggregates total hours per class and displays them in charts using Recharts
- Classes with significantly lower total hours are flagged as "**under-prioritized**".
- Data is persisted in Supabase and fetched via client-side API calls.

## Future Improvements
- [ ] Add weekly/monthly view toggles
- [ ] Implement authentication for multi-user support
- [ ] Deploy publicly once authenticated version is ready
- [ ] Add feature to track class attendance by day
- [ ] Implement weekly data tracking that resets each week while allowing users to view past weeks' summaries

## License
This project is for personal use only and is not licensed for public redistribution.