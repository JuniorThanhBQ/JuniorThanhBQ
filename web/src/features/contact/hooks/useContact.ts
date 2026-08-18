import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { apiClient } from '../../../configs/apis'

export function useContact() {
  const { t } = useTranslation()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')

  const [isSending, setIsSending] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const [errors, setErrors] = useState<{ name?: string; email?: string; subject?: string; message?: string }>({})

  const validate = () => {
    const nextErrors: typeof errors = {}
    if (!name.trim()) {
      nextErrors.name = 'Name is required'
    } else if (name.length > 100) {
      nextErrors.name = 'Name must be at most 100 characters'
    }
    if (!email.trim()) {
      nextErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      nextErrors.email = 'Email format is invalid'
    }
    if (!subject.trim()) {
      nextErrors.subject = 'Subject is required'
    } else if (subject.length > 255) {
      nextErrors.subject = 'Subject must be at most 255 characters'
    }
    if (!message.trim()) {
      nextErrors.message = 'Message is required'
    } else if (message.length > 512) {
      nextErrors.message = 'Message must be at most 512 characters'
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const sanitize = (val: string) => {
    return val.replace(/<[^>]*>/g, '').trim()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setIsSending(true)

    const cleanName = sanitize(name)
    const cleanEmail = sanitize(email)
    const cleanSubject = sanitize(subject)
    const cleanMessage = sanitize(message)

    if (import.meta.env.VITE_USE_MOCK_API === 'true') {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setIsSending(false)
      setIsSuccess(true)
      setName('')
      setEmail('')
      setSubject('')
      setMessage('')
      return
    }

    try {
      const response = await apiClient.post('/graphql', {
        query: `
          mutation SendContactEmail($input: SendContactEmailInput!) {
            sendContactEmail(input: $input) {
              success
              message
            }
          }
        `,
        variables: {
          input: {
            name: cleanName,
            email: cleanEmail,
            subject: cleanSubject,
            message: cleanMessage,
          },
        },
      })

      const result = response.data?.data?.sendContactEmail
      if (result?.success) {
        setIsSuccess(true)
        setName('')
        setEmail('')
        setSubject('')
        setMessage('')
      } else {
        const errorMsg = response.data?.errors?.[0]?.message || 'Failed to send message.'
        setErrors({ message: errorMsg })
      }
    } catch (err: any) {
      const errorMsg = err.response?.data?.errors?.[0]?.message || err.message || 'Failed to connect to API.'
      setErrors({ message: errorMsg })
    } finally {
      setIsSending(false)
    }
  }

  const resetForm = () => {
    setIsSuccess(false)
  }

  return {
    t,
    name,
    setName,
    email,
    setEmail,
    subject,
    setSubject,
    message,
    setMessage,
    isSending,
    isSuccess,
    errors,
    handleSubmit,
    resetForm
  }
}
