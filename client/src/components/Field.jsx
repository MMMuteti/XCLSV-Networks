export default function Field({ id, label, error, children }) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      {children}
      <p className="field-error" id={`${id}-error`} hidden={!error}>
        {error || ""}
      </p>
    </div>
  );
}
