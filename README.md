# XCLSV Networks & Solutions

React site with a small Node API.

```bash
npm install
npm run dev
```

Dev opens the site at http://localhost:5173 and the API at http://localhost:3000.

```bash
npm start
```

Production builds the React app, then serves it and the API together at http://localhost:3000 (or `PORT`).

Contact notes: `POST /api/contact` with JSON `{ name, email, service, message }`. The server checks those fields and returns JSON. It does not send email.
