import { Injectable, InternalServerErrorException, BadRequestException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as nodemailer from 'nodemailer'
import { SendContactEmailInput } from './dto/send-contact-email.input'
import { SendContactEmailResponse } from './dto/send-contact-email.response'

@Injectable()
export class ContactService {
  private transporter: nodemailer.Transporter

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('SMTP_HOST'),
      port: this.configService.get<number>('SMTP_PORT', 587),
      secure: this.configService.get<string>('SMTP_SSL') === 'true',
      auth: {
        user: this.configService.get<string>('SMTP_USER'),
        pass: this.configService.get<string>('SMTP_PASSWORD'),
      },
      requireTLS: this.configService.get<string>('SMTP_TLS') === 'true',
    })
  }

  private sanitize(value: string): string {
    if (!value) return ''
    return value
      .replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, '')
      .replace(/<[^>]*>/g, '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;')
      .trim()
  }

  async sendEmail(input: SendContactEmailInput): Promise<SendContactEmailResponse> {
    if (input.honeypot) {
      return {
        success: true,
        message: 'Your message has been sent successfully.',
      }
    }

    const secret = this.configService.get<string>('TURNSTILE_SECRET_KEY')
    if (secret) {
      try {
        const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: `secret=${encodeURIComponent(secret)}&response=${encodeURIComponent(input.token)}`,
        })
        const result: any = await response.json()
        if (!result.success) {
          throw new BadRequestException('Invalid CAPTCHA token.')
        }
      } catch (err: any) {
        if (err instanceof BadRequestException) throw err
        throw new InternalServerErrorException('CAPTCHA verification failed.')
      }
    }

    const cleanName = this.sanitize(input.name)
    const cleanEmail = this.sanitize(input.email)
    const cleanSubject = this.sanitize(input.subject)
    const cleanMessage = this.sanitize(input.message)

    const fromEmail = this.configService.get<string>('EMAILS_FROM_EMAIL')

    const mailOptions = {
      from: `"Portfolio Contact Form" <${fromEmail}>`,
      to: fromEmail,
      replyTo: cleanEmail,
      subject: `[Portfolio Contact] ${cleanSubject}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; line-height: 1.6; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px;">
          <h2 style="color: #1e3a8a; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px; margin-top: 0;">New Message Received From JuniorThanh Website</h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
            <tr>
              <td style="padding: 6px 0; font-weight: bold; width: 100px; color: #64748b;">From:</td>
              <td style="padding: 6px 0; color: #334155;">${cleanName} (&lt;${cleanEmail}&gt;)</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold; color: #64748b;">Subject:</td>
              <td style="padding: 6px 0; color: #334155;">${cleanSubject}</td>
            </tr>
          </table>
          <div style="margin-top: 20px; padding: 15px; background-color: #f8fafc; border-radius: 6px; border: 1px solid #f1f5f9; color: #334155;">
            <p style="margin: 0; white-space: pre-wrap;">${cleanMessage}</p>
          </div>
        </div>
      `,
    }

    try {
      await this.transporter.sendMail(mailOptions)
      return {
        success: true,
        message: 'Your message has been sent successfully.',
      }
    } catch (error) {
      throw new InternalServerErrorException('Failed to dispatch contact message.')
    }
  }
}
