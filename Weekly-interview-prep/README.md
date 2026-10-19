# PrepDesk

PrepDesk is a lightweight interview-practice tracker for organizing the questions and topics you want to work on. Track DSA problems, Git concepts, and technical interview questions in one place, update their status as you practise, and use the dashboard to see your progress.

**Live app:** [PrepDesk](https://prepdesk-five.vercel.app/)

## What you can do

- **Track questions:** Add a question with a category, difficulty, and practice status.
- **Organize practice:** Choose from the DSA, Git, and Technical categories; Easy, Medium, and Hard difficulties; and Pending, In Progress, and Completed statuses.
- **Update as you go:** Change a question's status from its card, or use its completion control to toggle between Pending and Completed.
- **Find questions:** Search question titles and filter the list by category, status, and difficulty. Clear filters to return to the full list.
- **Review progress:** See an overall completion percentage, completed-question count, category progress, and counts for each status.
- **Get started with examples:** When the tracker is empty, choose **Load examples** to populate it with sample questions, or add your own.
- **Use it on different screen sizes:** The layout adapts to desktop and mobile viewports.

## Getting started

### Requirements

- Node.js and npm
- Git, if you plan to clone the repository

### Run locally

1. Clone the repository and move into the project directory:

   ```bash
   git clone https://github.com/AniketThakur6/cohort-3.0_Assignments.git
   cd cohort-3.0_Assignments/Weekly-interview-prep
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open the local URL printed by Vite in your terminal.

## Using the tracker

1. Select **Add question** to open the question form.
2. Enter a question title and choose its category, difficulty, and initial status.
3. Add the question. It appears in the list and contributes to the dashboard totals.
4. Search or use the category, status, and difficulty filters to narrow the list.
5. Change a question's status from its status menu, use the completion control to mark it Pending or Completed, or delete it when it is no longer needed.

The dashboard's category progress view lets you switch between Pending, In Progress, and Completed to inspect the counts for each category and selected status.

## Data and persistence

Questions are saved in the browser's `localStorage` under the `questions` key. They remain available in that browser profile on the same origin after a page reload, but are not synchronized between browsers or devices. Clearing the site's browser storage removes the saved questions.

The app does not require an account or a backend service for its current tracking features. The week range shown in the page header is based on the current date; it is a display label, not a separate weekly archive. Questions stay in the list until you delete them, regardless of the displayed week.

## Built with

- [React](https://react.dev/) for the interface
- [Vite](https://vite.dev/) for local development and production builds
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Lucide React](https://lucide.dev/) for icons
- [date-fns](https://date-fns.org/) for date formatting
- [react-hot-toast](https://github.com/timolins/react-hot-toast) for toast support

## Project structure

```text
Weekly-interview-prep/
├── public/                 # Static assets, including the favicon
├── src/
│   ├── assets/             # App images and assets
│   ├── components/         # Form, question cards, filters, and progress UI
│   ├── context/            # Question state and localStorage persistence
│   ├── App.jsx             # Main page and question filtering
│   ├── index.css           # Global styles
│   └── main.jsx            # React entry point and app providers
├── index.html              # HTML entry point
├── package.json            # Dependencies and npm scripts
└── vite.config.js          # Vite and Tailwind plugin configuration
```

## Available scripts

Run these commands from the project directory:

| Command           | Description                                     |
| ----------------- | ----------------------------------------------- |
| `npm run dev`     | Start the Vite development server.              |
| `npm run build`   | Create the production bundle in `dist/`.        |
| `npm run preview` | Serve the production build locally for preview. |
| `npm run lint`    | Run Oxlint on the project.                      |

## Production build and deployment

Create and locally preview a production build with:

```bash
npm run build
npm run preview
```

The generated static site is in `dist/`. To deploy on Vercel, import the repository, set the project root to `Weekly-interview-prep`, and use the Vite defaults:

- **Build command:** `npm run build`
- **Output directory:** `dist`

## Contributing

1. Create a branch for your change.
2. Install dependencies with `npm install`.
3. Make and verify your changes with `npm run lint` and `npm run build`.
4. Open a pull request describing the change.
