import express from "express";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, "..", "dist");
const PORT = Number(process.env.PORT) || 3000;

const SERVICES = [
  "Website Development",
  "Payment Integration",
  "Custom Dashboard Development",
  "Business Platform Development",
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateContact(body) {
  const name = String(body?.name ?? "").trim();
  const email = String(body?.email ?? "").trim();
  const phone = String(body?.phone ?? "").trim();
  const company = String(body?.company ?? "").trim();
  const service = String(body?.service ?? "").trim();
  const message = String(body?.message ?? "").trim();
  const errors = {};

  if (name.length < 2) errors.name = "Enter your name (at least 2 characters).";
  else if (name.length > 80) errors.name = "Name must be 80 characters or fewer.";

  if (!EMAIL_RE.test(email) || email.length > 120) {
    errors.email = "Enter a valid email address.";
  }

  if (phone.length > 40) errors.phone = "Phone number must be 40 characters or fewer.";
  if (company.length > 120) errors.company = "Company name must be 120 characters or fewer.";

  if (!SERVICES.includes(service)) errors.service = "Choose a service.";

  if (message.length < 12) errors.message = "Add a short note (at least 12 characters).";
  else if (message.length > 2000) errors.message = "Keep the note under 2000 characters.";

  return { name, email, phone, company, service, message, errors };
}

const app = express();
app.disable("x-powered-by");
app.use(express.json({ limit: "32kb" }));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.post("/api/contact", (req, res) => {
  const { name, service, errors } = validateContact(req.body);
  if (Object.keys(errors).length) {
    return res.status(400).json({ ok: false, errors });
  }

  res.json({
    ok: true,
    message: `Thank you, ${name}. Your notes for ${service} were received by the studio server. Email xclsvnetworks@outlook.com or call +254 (0) 726 898 381 / +254 (0) 732 211 721. This form does not send email.`,
  });
});

app.use(express.static(distDir));

app.use((req, res, next) => {
  if (req.method !== "GET" || req.path.startsWith("/api")) return next();
  res.sendFile(path.join(distDir, "index.html"), (error) => {
    if (error) next();
  });
});

app.use((req, res) => {
  if (req.path.startsWith("/api")) {
    return res.status(404).json({ ok: false, error: "Not found" });
  }
  res.status(404).type("text").send("Not found");
});

const isDirectRun =
  process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href;

if (isDirectRun) {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`XCLSV server listening on http://0.0.0.0:${PORT}`);
  });
}

export { app };
