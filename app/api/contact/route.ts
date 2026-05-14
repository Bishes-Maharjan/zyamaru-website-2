// app/api/contact/route.ts
import { Course } from "@/types/course"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
    const { name, email, phoneNumber, selectedCourse } = await req.json()

    if (!name || !email || !phoneNumber || !selectedCourse) {
        return Response.json({ error: 'All fields are required' }, { status: 400 })
    }
    if (!Object.values(Course).includes(selectedCourse)) {
        return Response.json({ error: 'Invalid course' }, { status: 400 })
    }

    try {
        await resend.emails.send({
            from: process.env.EMAIL_FROM!,
            to: email,
            subject: `New inquiry from ${name}`,
            html: `
        <div style="font-family: sans-serif; padding: 20px; max-width: 500px; margin: auto; border: 1px solid #ddd;">
          <h2>New Inquiry</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone Number:</strong> ${phoneNumber}</p>
          <p><strong>Selected Course:</strong> ${selectedCourse}</p>
        </div>
      `
        })

        return Response.json({ success: true })
    } catch (error) {
        console.error(error);
        return Response.json({ error: 'Failed to send email' }, { status: 500 })
    }
}