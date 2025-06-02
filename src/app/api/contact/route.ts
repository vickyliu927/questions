import { NextRequest, NextResponse } from 'next/server'
import { client } from '../../../../lib/sanity'
import { Resend } from 'resend'

interface ContactFormData {
  fullName: string
  country: string
  phone: string
  email: string
  tutoringDetails: string
  hourlyBudget: string
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json()
    
    // Validate required fields
    const requiredFields: (keyof ContactFormData)[] = ['fullName', 'country', 'phone', 'email', 'tutoringDetails', 'hourlyBudget']
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        )
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Save to Sanity
    try {
      const doc = await client.create({
        _type: 'contactForm',
        fullName: body.fullName,
        country: body.country,
        phone: body.phone,
        email: body.email,
        tutoringDetails: body.tutoringDetails,
        hourlyBudget: body.hourlyBudget,
        submissionDate: new Date().toISOString()
      })
      console.log('Saved to Sanity:', doc._id)
    } catch (sanityError) {
      console.error('Sanity error:', sanityError)
      // Continue with email sending even if Sanity fails
    }

    // Send email notification if Resend is configured
    if (process.env.RESEND_API_KEY && process.env.NOTIFICATION_EMAIL) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY)
        await resend.emails.send({
          from: process.env.FROM_EMAIL || 'notifications@yourdomain.com',
          to: process.env.NOTIFICATION_EMAIL,
          subject: `New Tutoring Request from ${body.fullName}`,
          html: `
            <h2>New Tutoring Request</h2>
            <p><strong>Name:</strong> ${body.fullName}</p>
            <p><strong>Country:</strong> ${body.country}</p>
            <p><strong>Phone:</strong> ${body.phone}</p>
            <p><strong>Email:</strong> ${body.email}</p>
            <p><strong>Hourly Budget:</strong> ${body.hourlyBudget}</p>
            <p><strong>Details:</strong></p>
            <p>${body.tutoringDetails.replace(/\n/g, '<br>')}</p>
            <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
          `
        })
        console.log('Email notification sent successfully')
      } catch (emailError) {
        console.error('Email error:', emailError)
        // Don't fail the request if email fails
      }
    }

    return NextResponse.json(
      { message: 'Form submitted successfully' },
      { status: 200 }
    )

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 