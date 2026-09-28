import { NextResponse } from "next/server";
import { Resend } from "resend";

// Smallest possible contact path (SS-1.07): the pop-up form on the page
// posts here, we relay it to CONTACT_EMAIL via Resend. No calendar, no
// embed, those stay deferred per the task's scope.
export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL;

  if (!apiKey || !to) {
    return NextResponse.json({ error: "The form isn't set up yet." }, { status: 500 });
  }

  const body = await request.json().catch(() => null);
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const company = typeof body?.company === "string" ? body.company.trim() : "";
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const problemType = typeof body?.problemType === "string" ? body.problemType.trim() : "";
  const details = typeof body?.details === "string" ? body.details.trim() : "";
  const preferredDate = typeof body?.preferredDate === "string" ? body.preferredDate.trim() : "";

  if (!name || !email || !problemType) {
    return NextResponse.json({ error: "Fill in the required fields." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  const lines = [
    `From: ${name}${company ? ` (${company})` : ""} <${email}>`,
    `Type of problem: ${problemType}`,
    preferredDate ? `Preferred time: ${preferredDate}` : null,
    "",
    details || "(no extra description)",
  ].filter((line): line is string => line !== null);

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: process.env.CONTACT_FROM ?? "Steadystate <onboarding@resend.dev>",
    to,
    replyTo: email,
    subject: `New inquiry from the site: ${name}`,
    text: lines.join("\n"),
  });

  if (error) {
    return NextResponse.json({ error: "Couldn't send the message. Try again." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
