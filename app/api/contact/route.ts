// app/api/contact/route.ts
import { Course } from "@/types/course"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

// Common professional email styles
const emailStyles = `
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f9fafb; margin: 0; padding: 0; -webkit-font-smoothing: antialiased; }
    .wrapper { max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 8px; border: 1px solid #e5e7eb; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
    .header { background-color: #111827; padding: 32px 24px; text-align: center; }
    .header h1 { color: #ffffff; font-size: 24px; font-weight: 700; margin: 0; letter-spacing: -0.025em; }
    .content { padding: 32px 24px; }
    .content p { font-size: 16px; line-height: 24px; color: #374151; margin-top: 0; margin-bottom: 16px; }
    .table-container { margin: 24px 0; border: 1px solid #f3f4f6; border-radius: 6px; overflow: hidden; }
    table { width: 100%; border-collapse: collapse; text-align: left; }
    th, td { padding: 12px 16px; font-size: 14px; line-height: 20px; border-bottom: 1px solid #f3f4f6; }
    th { background-color: #f9fafb; color: #4b5563; width: 35%; font-weight: 600; }
    td { color: #111827; }
    tr:last-child th, tr:last-child td { border-bottom: none; }
    .badge { display: inline-block; background-color: #f3f4f6; color: #1f2937; font-weight: 600; padding: 4px 12px; border-radius: 9999px; font-size: 13px; }
    .footer { background-color: #f9fafb; padding: 24px; text-align: center; border-top: 1px solid #e5e7eb; }
    .footer p { font-size: 13px; line-height: 18px; color: #9ca3af; margin: 0; }
  </style>
`

export async function POST(req: Request) {
    const { name, email, phoneNumber, selectedCourse, dob, permanentAddress, temporaryAddress, gender, educationLevel } = await req.json()

    if (!name || !email || !phoneNumber || !selectedCourse || !dob || !permanentAddress || !temporaryAddress || !gender || !educationLevel) {
        return Response.json({ error: 'All fields are required' }, { status: 400 })
    }
    if (!Object.values(Course).includes(selectedCourse)) {
        return Response.json({ error: 'Invalid course' }, { status: 400 })
    }

    try {
        // 1. Admin Notification Email
        await resend.emails.send({
            from: process.env.EMAIL_INFO || "info@zyamarufilms.com.np",
            to: process.env.EMAIL_INFO || "info@zyamarufilms.com.np",
            subject: `New inquiry from ${name}`,
            html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            ${emailStyles}
          </head>
          <body>
            <div class="wrapper">
              <div class="header">
                <h1>New Course Inquiry</h1>
              </div>
              <div class="content">
                <p>A new application detail has been submitted through the website enrollment form.</p>
                
                <div class="table-container">
                  <table>
                    <tr><th>Applicant Name</th><td>${name}</td></tr>
                    <tr><th>Selected Course</th><td><span class="badge">${selectedCourse}</span></td></tr>
                    <tr><th>Phone Number</th><td>${phoneNumber}</td></tr>
                    <tr><th>Email Address</th><td>${email}</td></tr>
                    <tr><th>Date of Birth</th><td>${dob}</td></tr>
                    <tr><th>Gender</th><td>${gender}</td></tr>
                    <tr><th>Education Level</th><td>${educationLevel}</td></tr>
                    <tr><th>Permanent Address</th><td>${permanentAddress}</td></tr>
                    <tr><th>Temporary Address</th><td>${temporaryAddress}</td></tr>
                  </table>
                </div>
              </div>
              <div class="footer">
                <p>Zyamaru Films • Internal Notification System</p>
              </div>
            </div>
          </body>
        </html>
      `
        })

        // 2. Student Confirmation Email
        await resend.emails.send({
            from: process.env.EMAIL_INFO || "info@zyamarufilms.com.np",
            to: email,
            subject: `Thank you for your enrollment in Zyamaru Films`,
            html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            ${emailStyles}
          </head>
          <body>
            <div class="wrapper">
              <div class="header">
                <h1>Application Received</h1>
              </div>
              <div class="content">
                <p>Dear ${name},</p>
                <p>Thank you for your interest in Zyamaru Films. We have successfully received your enrollment submission. Our admissions team will review your details and contact you shortly regarding the next steps.</p>
                
                <p style="font-weight: 600; margin-top: 24px; margin-bottom: 8px; font-size: 14px; color: #4b5563; text-transform: uppercase; letter-spacing: 0.05em;">Your Submission Details</p>
                <div class="table-container">
                  <table>
                    <tr><th>Selected Course</th><td><span class="badge" style="background-color: #fef3c7; color: #92400e;">${selectedCourse}</span></td></tr>
                    <tr><th>Contact Number</th><td>${phoneNumber}</td></tr>
                    <tr><th>Permanent Address</th><td>${permanentAddress}</td></tr>
                  </table>
                </div>
                
                <p style="margin-top: 24px;">If you notice any discrepancies in the details listed above, please reply directly to this email.</p>
                
                <p style="margin-top: 32px; margin-bottom: 0; font-size: 15px; color: #4b5563;">
                  Best regards,<br>
                  <strong>Zyamaru Films Team</strong>
                </p>
              </div>
              <div class="footer">
                <p>© ${new Date().getFullYear()} Zyamaru Films. All rights reserved.</p>
                <p style="margin-top: 4px; font-size: 11px;">You are receiving this email because you initiated an application on our official platform.</p>
              </div>
            </div>
          </body>
        </html>
      `
        })

        return Response.json({ success: true })
    } catch (error) {
        console.error(error);
        return Response.json({ error: 'Failed to send email' }, { status: 500 })
    }
}