Frontend quick start

1) Install dependencies (from `frontend/`):

```bash
npm install
```

2) Run dev server:

```bash
npm run dev
```

3) If your backend runs on a different host/port, set the Vite env variable `VITE_API_URL` in a `.env` file in this folder, e.g.: `VITE_API_URL=http://localhost:5080`

The frontend uses axios to call the backend at `${VITE_API_URL}/todos` for CRUD operations.
