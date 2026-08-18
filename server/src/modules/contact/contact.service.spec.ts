import { Test, TestingModule } from '@nestjs/testing'
import { ConfigService } from '@nestjs/config'
import { InternalServerErrorException, BadRequestException } from '@nestjs/common'
import { ContactService } from './contact.service'
import * as nodemailer from 'nodemailer'

jest.mock('nodemailer')

describe('ContactService', () => {
  let service: ContactService
  let mockTransporter: { sendMail: jest.Mock }

  beforeEach(async () => {
    mockTransporter = {
      sendMail: jest.fn().mockResolvedValue({ messageId: '12345' }),
    };
    (nodemailer.createTransport as jest.Mock).mockReturnValue(mockTransporter)

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({ success: true }),
    } as any)

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContactService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockImplementation((key: string, defaultValue?: any) => {
              if (key === 'SMTP_HOST') return 'smtp.gmail.com'
              if (key === 'SMTP_PORT') return 587
              if (key === 'SMTP_SSL') return 'false'
              if (key === 'SMTP_TLS') return 'true'
              if (key === 'SMTP_USER') return 'juniorthanh09@gmail.com'
              if (key === 'SMTP_PASSWORD') return 'securepassword'
              if (key === 'EMAILS_FROM_EMAIL') return 'juniorthanh09@gmail.com'
              if (key === 'TURNSTILE_SECRET_KEY') return 'dummy-secret-key'
              return defaultValue
            }),
          },
        },
      ],
    }).compile()

    service = module.get<ContactService>(ContactService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should successfully sanitize inputs and send contact email', async () => {
    const input = {
      name: '<script>alert("hack")</script>John Doe',
      email: 'john@example.com',
      subject: 'Hi there',
      message: 'Hello <iframe src="dangerous"></iframe>world',
      token: 'valid-token',
    }

    const response = await service.sendEmail(input)

    expect(response).toEqual({
      success: true,
      message: 'Your message has been sent successfully.',
    })

    expect(mockTransporter.sendMail).toHaveBeenCalledWith(
      expect.objectContaining({
        replyTo: 'john@example.com',
        subject: '[Portfolio Contact] Hi there',
        html: expect.stringContaining('John Doe (&lt;john@example.com&gt;)'),
      })
    )

    expect(mockTransporter.sendMail).toHaveBeenCalledWith(
      expect.objectContaining({
        html: expect.stringContaining('Hello world'),
      })
    )
  })

  it('should skip email sending and return success if honeypot is populated', async () => {
    const input = {
      name: 'Spam Bot',
      email: 'bot@spam.com',
      subject: 'Buy bitcoins',
      message: 'Cheap bitcoins here',
      token: 'some-token',
      honeypot: 'filled-field',
    }

    const response = await service.sendEmail(input)
    expect(response.success).toBe(true)
    expect(mockTransporter.sendMail).not.toHaveBeenCalled()
  })

  it('should throw BadRequestException if Turnstile validation fails', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({ success: false }),
    } as any)

    const input = {
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'Hi there',
      message: 'Hello world',
      token: 'invalid-token',
    }

    await expect(service.sendEmail(input)).rejects.toThrow(BadRequestException)
  })

  it('should throw InternalServerErrorException if transporter fails', async () => {
    mockTransporter.sendMail.mockRejectedValue(new Error('SMTP connection error'))

    const input = {
      name: 'John',
      email: 'john@example.com',
      subject: 'Hi',
      message: 'Hello',
      token: 'some-token',
    }

    await expect(service.sendEmail(input)).rejects.toThrow(InternalServerErrorException)
  })
})
