import { useEffect, useRef, useState } from "react";
import Field from "./Field.jsx";
import Reveal from "./Reveal.jsx";

const SERVICES = [
  "Website Development",
  "Payment Integration",
  "Custom Dashboard Development",
  "Business Platform Development",
];

const EMPTY = { name: "", email: "", service: "", message: "" };

function localErrors(values) {
  const errors = {};
  if (values.name.trim().length < 2) errors.name = "Enter your name (at least 2 characters).";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = "Enter a valid email address.";
  if (!values.service) errors.service = "Choose a service.";
  if (values.message.trim().length < 12) errors.message = "Add a short note (at least 12 characters).";
  return errors;
}

export default function Contact() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [pending, setPending] = useState(false);
  const [status, setStatus] = useState("");
  const successRef = useRef(null);

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
    if (Object.keys(nextErrors).length) {
      const first = Object.keys(nextErrors)[0];
      document.getElementById(first)?.focus();
      return;
    }

    setPending(true);
    setStatus("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          service: values.service,
          message: values.message.trim(),
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        setErrors(data.errors || { message: "The studio server could not accept these notes." });
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

  function again() {
    setValues(EMPTY);
    setErrors({});
    setSuccess("");
    setStatus("");
  }

  return (
    <section className="section" id="contact" aria-labelledby="contact-title">
      <div className="wrap contact">
        <Reveal>
          <p className="eyebrow">Contact</p>
          <h2 id="contact-title">Start a project from Machakos.</h2>
          <p>
            The form checks your notes and sends them to the studio server, which confirms they were received. It does not send mail by itself — call or email the studio directly as well.
          </p>
          <address className="contact-card">
            <strong>XCLSV Networks &amp; Solutions</strong>
            <br />
            P.O Box 46 – 90100 Machakos, Kenya.
            <br />
            <a href="tel:+254726898381">+254 (0) 726 898 381</a>
            <br />
            <a href="tel:+254732211721">+254 (0) 732 211 721</a>
            <br />
            <a href="mailto:xclsvnetworks@outlook.com">xclsvnetworks@outlook.com</a>
          </address>
        </Reveal>
        <Reveal as="form" className="form" noValidate onSubmit={onSubmit}>
          {!success && (
            <>
              <Field id="name" label="Name" error={errors.name}>
                <input id="name" name="name" type="text" autoComplete="name" required value={values.name} onChange={update} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-error" : undefined} />
              </Field>
              <Field id="email" label="Email" error={errors.email}>
                <input id="email" name="email" type="email" autoComplete="email" required value={values.email} onChange={update} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} />
              </Field>
              <Field id="service" label="What do you need?" error={errors.service}>
                <select id="service" name="service" required value={values.service} onChange={update} aria-invalid={Boolean(errors.service)} aria-describedby={errors.service ? "service-error" : undefined}>
                  <option value="">Select a service</option>
                  {SERVICES.map((service) => (
                    <option key={service}>{service}</option>
                  ))}
                </select>
              </Field>
              <Field id="message" label="Project notes" error={errors.message}>
                <textarea id="message" name="message" rows="5" required value={values.message} onChange={update} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "message-error" : undefined} />
              </Field>
              <button className="btn btn--gold" type="submit" disabled={pending}>
                {pending ? "Sending…" : "Send project notes"}
              </button>
            </>
          )}
          {status && (
            <p className="field-error" role="alert">
              {status}
            </p>
          )}
          <p className="form-success" role="status" tabIndex={-1} hidden={!success} ref={successRef}>
            {success}
          </p>
          <button className="btn btn--ghost" type="button" hidden={!success} onClick={again}>
            Write another note
          </button>
        </Reveal>
      </div>
    </section>
  );
}
