import { useEffect, useId, useRef, useState } from "react";
import Field from "./Field.jsx";

const PRODUCTS = [
  "Website Development",
  "Payment Integration",
  "Custom Dashboard Development",
  "Business Platform Development",
];

const EMPTY = {
  name: "",
  email: "",
  phone: "",
  company: "",
  service: PRODUCTS[0],
  message: "",
};

function localErrors(values) {
  const errors = {};
  if (values.name.trim().length < 2) errors.name = "Enter your name (at least 2 characters).";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = "Enter a valid email address.";
  if (!PRODUCTS.includes(values.service)) errors.service = "Choose a service.";
  if (values.message.trim().length < 12) errors.message = "Add a short note (at least 12 characters).";
  return errors;
}

function focusable(root) {
  return [...root.querySelectorAll("button, [href], input, select, textarea")].filter(
    (el) => !el.disabled && !el.hidden && !el.closest("[hidden]")
  );
}

export default function ContactModal({ openerRef, onClose }) {
  const titleId = useId();
  const dialogRef = useRef(null);
  const successRef = useRef(null);
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [pending, setPending] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const opener = openerRef?.current ?? null;
    const dialog = dialogRef.current;
    document.body.classList.add("modal-open");
    const initial = focusable(dialog);
    (initial[0] || dialog)?.focus();

    function onKey(event) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !dialog) return;

      const items = focusable(dialog);
      if (!items.length) {
        event.preventDefault();
        dialog.focus();
        return;
      }

      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      const backward = event.shiftKey;
      const trapped = !items.includes(active) || (backward ? active === first : active === last);
      if (!trapped) return;
      event.preventDefault();
      (backward ? last : first).focus();
    }

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.classList.remove("modal-open");
      if (opener && typeof opener.focus === "function") {
        opener.focus();
        const visible = opener.getClientRects().length > 0;
        if (!visible) document.querySelector(".nav-toggle")?.focus();
      }
    };
  }, [onClose, openerRef]);

  useEffect(() => {
    if (success) successRef.current?.focus();
  }, [success]);

  function update(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
  }

  async function onSubmit(event) {
    event.preventDefault();
    const nextErrors = localErrors(values);
    setErrors(nextErrors);
    setSuccess("");
    setStatus("");
    if (Object.keys(nextErrors).length) {
      focusField(Object.keys(nextErrors)[0]);
      return;
    }

    setPending(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          phone: values.phone.trim(),
          company: values.company.trim(),
          service: values.service,
          message: values.message.trim(),
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        setErrors(data.errors || { message: "The studio server could not accept these notes." });
        focusField(Object.keys(data.errors || {})[0]);
        return;
      }
      setSuccess(data.message || "Your notes were received.");
      setErrors({});
    } catch {
      setStatus("Could not reach the studio server. Try again, or email xclsvnetworks@outlook.com.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="contact-modal" onMouseDown={onClose}>
      <div
        className="contact-modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        ref={dialogRef}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className="contact-modal__close" type="button" onClick={onClose} aria-label="Close">
          ×
        </button>
        <h2 id={titleId}>Get in Touch</h2>
        <p className="contact-modal__lead">Share your business need and we&apos;ll send a fast plan.</p>
        <div className="contact-modal__pill-wrap">
          <p className="contact-modal__pill">Selected: {values.service}</p>
        </div>

        {success ? (
          <p className="form-success" role="status" tabIndex={-1} ref={successRef}>
            {success}
          </p>
        ) : (
          <form noValidate onSubmit={onSubmit}>
            <div className="contact-modal__grid">
              <Field id="popup-name" label="Your Name" error={errors.name}>
                <input
                  id="popup-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="John Doe"
                  value={values.name}
                  onChange={update}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "popup-name-error" : undefined}
                />
              </Field>
              <Field id="popup-email" label="Email Address" error={errors.email}>
                <input
                  id="popup-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="john@example.com"
                  value={values.email}
                  onChange={update}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "popup-email-error" : undefined}
                />
              </Field>
              <Field id="popup-phone" label="Phone Number" error={errors.phone}>
                <input
                  id="popup-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="+254 7XX XXX XXX"
                  value={values.phone}
                  onChange={update}
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? "popup-phone-error" : undefined}
                />
              </Field>
              <Field id="popup-company" label="Company Name" error={errors.company}>
                <input
                  id="popup-company"
                  name="company"
                  type="text"
                  autoComplete="organization"
                  placeholder="Your company name"
                  value={values.company}
                  onChange={update}
                  aria-invalid={Boolean(errors.company)}
                  aria-describedby={errors.company ? "popup-company-error" : undefined}
                />
              </Field>
              <Field id="popup-service" label="What do you need?" error={errors.service}>
                <select
                  id="popup-service"
                  name="service"
                  value={values.service}
                  onChange={update}
                  aria-invalid={Boolean(errors.service)}
                  aria-describedby={errors.service ? "popup-service-error" : undefined}
                >
                  {PRODUCTS.map((product) => (
                    <option key={product} value={product}>
                      {product}
                    </option>
                  ))}
                </select>
              </Field>
              <Field id="popup-message" label="Tell us more" error={errors.message}>
                <textarea
                  id="popup-message"
                  name="message"
                  rows="4"
                  placeholder="Tell us about your business and what you're looking for..."
                  value={values.message}
                  onChange={update}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? "popup-message-error" : undefined}
                />
              </Field>
            </div>
            {status && (
              <p className="field-error" role="alert">
                {status}
              </p>
            )}
            <button className="btn contact-modal__submit" type="submit" disabled={pending}>
              {pending ? "Sending…" : "Send Message"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function focusField(name) {
  if (name) document.getElementById(`popup-${name}`)?.focus();
}
