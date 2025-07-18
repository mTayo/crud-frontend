# Task Manager Frontend

This is the frontend of the **Task Manager App**, built with [React.js](https://reactjs.org/), [Vite](https://vitejs.dev/), [Tailwind CSS](https://tailwindcss.com/), and [Radix UI](https://www.radix-ui.com/docs/primitives/components/dialog).

It interacts with a Node.js/Express + Prisma + MySQL backend.

---

## 🔧 Features

- ✅ Authentication via JWT
- ✅ View all tasks
- ✅ Filter tasks by:
  - Status (`Pending`, `In Progress`, `Done`)
  - Due date
  - Created date
- ✅ Create a new task using a modal
- ✅ Edit existing tasks using the same modal
- ✅ Delete tasks
- ✅ Update task status inline with dropdown
- ✅ Task metrics/analytics display:
  - Total tasks
  - Pending tasks
  - In progress tasks
  - Completed tasks
- ✅ Responsive design with Tailwind CSS

---

## 🚀 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/task-manager-frontend.git
cd task-manager-frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root:

```env
VITE_API_BASE_URL=https://your-backend-url.com/api
```

Update the URL to point to your deployed or local backend.

---

## 🧱 Folder Structure

```
src/
│
├── components/          # Reusable components (modals, filters, table, badges)
├── pages/               # Page components like Dashboard
├── services/            # Axios API calls
├── utils/               # Date formatting and helpers
├── types/               # TypeScript interfaces
├── App.tsx              # App root
└── main.tsx             # Vite entry point
```

---

## 📦 Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build locally
```

---

## 🖼 Example UI

- Status badges with colors (Pending, In Progress, Done)
- Date filters using date picker
- Dropdown menu for changing task status
- Modals using Radix UI for create/edit

---

## 🔐 Authentication

Make sure your backend returns a JWT token on login. Store it in `localStorage` or `cookie`, and send it as a bearer token with API requests:

```ts
Authorization: Bearer <your_token>
```

---

## ✅ TODO

- Add pagination
- Add user profile management
- Improve error handling and validations

---

## 📄 License

MIT

---

## ✨ Credits

Built by [@mTayo](https://github.com/mTayo)