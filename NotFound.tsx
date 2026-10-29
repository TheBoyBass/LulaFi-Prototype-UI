import { jsPDF } from "jspdf";
import { FilledForm, formatFormDate } from "@/data/myForms";

const LINE = 6;

export const downloadFormPdf = (form: FilledForm) => {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const margin = 48;
  const width = doc.internal.pageSize.getWidth() - margin * 2;
  let y = margin;

  const newPageIfNeeded = (needed = LINE * 2) => {
    if (y + needed > doc.internal.pageSize.getHeight() - margin) {
      doc.addPage();
      y = margin;
    }
  };

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("lulaFi", margin, y);
  y += 22;

  doc.setFontSize(14);
  doc.text(doc.splitTextToSize(form.formName, width), margin, y);
  y += 20;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  const meta = [
    `Provider: ${form.provider}`,
    `Reference: ${form.ref}`,
    `Status: ${form.status}`,
    `${form.status === "Draft" ? "Saved" : "Submitted"}: ${formatFormDate(form.submittedAt)}`,
    `Note: ${form.note}`,
  ];
  meta.forEach(line => {
    newPageIfNeeded();
    doc.text(doc.splitTextToSize(line, width), margin, y);
    y += LINE * 2.2;
  });

  y += 8;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  newPageIfNeeded();
  doc.text("Submitted answers", margin, y);
  y += 16;

  doc.setFontSize(10);
  form.answers.forEach(a => {
    newPageIfNeeded(LINE * 4);
    doc.setFont("helvetica", "bold");
    doc.text(doc.splitTextToSize(a.label, width), margin, y);
    y += LINE * 2;
    doc.setFont("helvetica", "normal");
    const value = doc.splitTextToSize(a.value, width);
    doc.text(value, margin, y);
    y += LINE * 2 * value.length + 4;
  });

  y += 8;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  newPageIfNeeded();
  doc.text("Attachments", margin, y);
  y += 16;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  const files = form.attachmentNames.length ? form.attachmentNames : ["No attachments"];
  files.forEach(f => {
    newPageIfNeeded();
    doc.text(`- ${f}`, margin, y);
    y += LINE * 2;
  });

  doc.save(`${form.ref.replace("#", "")}-${form.formName.replace(/[^\w]+/g, "-")}.pdf`);
};

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, c =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] as string)
  );

export const printForm = (form: FilledForm) => {
  const rows = form.answers
    .map(
      a =>
        `<tr><th>${escapeHtml(a.label)}</th><td>${escapeHtml(a.value)}</td></tr>`
    )
    .join("");
  const files = (form.attachmentNames.length ? form.attachmentNames : ["No attachments"])
    .map(f => `<li>${escapeHtml(f)}</li>`)
    .join("");

  const html = `<!doctype html><html><head><meta charset="utf-8" />
<title>${escapeHtml(form.formName)} ${escapeHtml(form.ref)}</title>
<style>
body{font-family:Inter,Arial,sans-serif;color:#0b1c2d;margin:32px;}
h1{font-size:20px;margin:0 0 4px;}
h2{font-size:14px;margin:24px 0 8px;text-transform:uppercase;letter-spacing:1px;color:#5a6b7d;}
.meta{font-size:12px;color:#5a6b7d;line-height:1.6;}
table{width:100%;border-collapse:collapse;font-size:12px;}
th,td{text-align:left;padding:8px 10px;border-bottom:1px solid #e3e8ee;vertical-align:top;}
th{width:38%;color:#5a6b7d;font-weight:600;}
ul{font-size:12px;padding-left:18px;}
</style></head><body>
<h1>${escapeHtml(form.formName)}</h1>
<div class="meta">lulaFi &middot; ${escapeHtml(form.provider)}<br/>
Reference ${escapeHtml(form.ref)} &middot; Status ${escapeHtml(form.status)}<br/>
${form.status === "Draft" ? "Saved" : "Submitted"} ${escapeHtml(formatFormDate(form.submittedAt))}<br/>
${escapeHtml(form.note)}</div>
<h2>Submitted answers</h2>
<table>${rows}</table>
<h2>Attachments</h2><ul>${files}</ul>
</body></html>`;

  const frame = document.createElement("iframe");
  frame.setAttribute("aria-hidden", "true");
  frame.style.position = "fixed";
  frame.style.right = "0";
  frame.style.bottom = "0";
  frame.style.width = "0";
  frame.style.height = "0";
  frame.style.border = "0";
  document.body.appendChild(frame);

  const doc = frame.contentDocument;
  if (!doc) return;
  doc.open();
  doc.write(html);
  doc.close();

  const run = () => {
    frame.contentWindow?.focus();
    frame.contentWindow?.print();
    window.setTimeout(() => frame.remove(), 1000);
  };
  if (frame.contentWindow?.document.readyState === "complete") run();
  else frame.onload = run;
};
