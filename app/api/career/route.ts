// app/api/career/route.ts
import { Resend } from "resend";
import { OPEN_POSITIONS } from "../../career/position";

const resend = new Resend(process.env.RESEND_API_KEY);

const emailStyles = `
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f9fafb; margin: 0; padding: 0; -webkit-font-smoothing: antialiased; }
    .wrapper { max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 8px; border: 1px solid #e5e7eb; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
    .header { background-color: #111827; padding: 32px 24px; text-align: center; }
    .header h1 { color: #ffffff; font-size: 22px; font-weight: 700; margin: 0; letter-spacing: -0.025em; text-transform: uppercase; }
    .content { padding: 32px 24px; }
    .content p { font-size: 16px; line-height: 24px; color: #374151; margin-top: 0; margin-bottom: 16px; }
    .table-container { margin: 24px 0; border: 1px solid #f3f4f6; border-radius: 6px; overflow: hidden; }
    table { width: 100%; border-collapse: collapse; text-align: left; table-layout: fixed; }
    th, td { padding: 12px 16px; font-size: 14px; line-height: 20px; border-bottom: 1px solid #f3f4f6; word-break: break-word; }
    th { background-color: #f9fafb; color: #4b5563; width: 35%; font-weight: 600; }
    td { color: #111827; }
    tr:last-child th, tr:last-child td { border-bottom: none; }
    .badge { display: inline-block; background-color: #fef3c7; color: #92400e; font-weight: 600; padding: 4px 12px; border-radius: 9999px; font-size: 12px; }
    .portfolio-link { color: #d97706; text-decoration: none; font-weight: 600; }
    .bio-block { background-color: #f9fafb; border-left: 4px solid #d97706; padding: 16px; font-size: 14px; line-height: 22px; color: #111827; border-radius: 0 6px 6px 0; margin-top: 8px; }
    .footer { background-color: #f9fafb; padding: 24px; text-align: center; border-top: 1px solid #e5e7eb; }
    .footer p { font-size: 13px; line-height: 18px; color: #9ca3af; margin: 0; }
  </style>
`;

export async function POST(req: Request) {
    try {
        const { name, email, phone, positionId, portfolioUrl, description, cvBase64, cvFileName } = await req.json();

        // Verify vital parameters (cvBase64 is required here since it's an application submission)
        if (!name || !email || !phone || !positionId || !description || !cvBase64) {
            return Response.json({ error: 'All primary fields and a valid CV attachment are required.' }, { status: 400 });
        }

        // Lookup targeted position labels
        const targetPosition = OPEN_POSITIONS.find(p => p.id === positionId);
        const positionLabel = targetPosition ? targetPosition.label : "Speculative Application";

        const systemSender = process.env.EMAIL_CAREER || "info@zyamarufilms.com.np";
        const primaryAdmin = process.env.EMAIL_CAREER || "info@zyamarufilms.com.np";

        // 1. Send Notification Out To Internal HR Team with Attachment
        await resend.emails.send({
            from: systemSender,
            to: primaryAdmin,
            subject: `[Career Application] ${positionLabel} - ${name}`,
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
                <h1>New Career Submission</h1>
              </div>
              <div class="content">
                <p>A new application profile has been processed through the ZYAMARU Films Academy Careers portal layout. **The applicant's CV has been attached directly to this email.**</p>
                
                <div class="table-container">
                  <table>
                    <tr><th>Target Role</th><td><span class="badge">${positionLabel}</span></td></tr>
                    <tr><th>Full Name</th><td>${name}</td></tr>
                    <tr><th>Email Address</th><td>${email}</td></tr>
                    <tr><th>Phone Number</th><td>${phone}</td></tr>
                    <tr>
                      <th>Showcase/Portfolio</th>
                      <td>
                        ${portfolioUrl
                    ? `<a href="${portfolioUrl}" target="_blank" class="portfolio-link">${portfolioUrl}</a>`
                    : '<span style="color: #9ca3af; font-style: italic;">None Provided</span>'
                }
                      </td>
                    </tr>
                    <tr><th>CV File Name</th><td>${cvFileName || 'resume.pdf'}</td></tr>
                  </table>
                </div>

                <p style="font-weight: 600; margin-bottom: 4px; color: #4b5563; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em;">Cover Letter & Experience Summary:</p>
                <div class="bio-block">
                  ${description.replace(/\n/g, '<br>')}
                </div>
              </div>
              <div class="footer">
                <p>ZYAMARU Films Academy • Talent Tracking System</p>
              </div>
            </div>
          </body>
        </html>
      `,
            attachments: [
                {
                    filename: cvFileName || `${name.replace(/\s+/g, '_')}_CV.pdf`,
                    content: cvBase64, // Resend handles raw base64 string directly
                }
            ]
        });

        // 2. Send Automated Safety Receipt to Applicant
        await resend.emails.send({
            from: systemSender,
            to: email,
            subject: `Application Received - ZYAMARU Films Academy`,
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
                <h1>Profile Logged</h1>
              </div>
              <div class="content">
                <p>Dear ${name},</p>
                <p>Thank you for your application to join the team at ZYAMARU Films Academy. We have successfully logged your application form data and CV attachment for the following track:</p>
                
                <div class="table-container">
                  <table>
                    <tr><th>Position Selected</th><td><strong>${positionLabel}</strong></td></tr>
                    <tr><th>Logged Contact</th><td>${phone}</td></tr>
                  </table>
                </div>

                <p>At ZYAMARU, we build practical capabilities that empower filmmakers to tell authentic stories with global standards. Our administrative crew reviews application files relative to incoming educational tracks, upcoming studio schedules, and resource expansion.</p>
                
                <p>If your profile aligns with our upcoming operational phases or instructional needs, our team will reach out directly within 7 working days to arrange an introductory conversation.</p>
                
                <p style="margin-top: 32px; margin-bottom: 0; font-size: 15px; color: #4b5563;">
                  Best regards,<br>
                  <strong>The ZYAMARU Team</strong>
                </p>
              </div>
              <div class="footer">
                <p>© ${new Date().getFullYear()} ZYAMARU Films Academy. Kathmandu, Nepal. All rights reserved.</p>
              </div>
            </div>
          </body>
        </html>
      `
        });

        return Response.json({ success: true });
    } catch (error) {
        console.error("Resend Pipeline Failure Logged:", error);
        return Response.json({ error: 'Failed to process execution pipeline.' }, { status: 500 });
    }
}