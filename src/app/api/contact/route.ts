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
  console.log('=== CONTACT FORM API CALLED ===')
  
  try {
    const body: ContactFormData = await request.json()
    console.log('Received form data:', {
      fullName: body.fullName,
      country: body.country,
      email: body.email,
      // Don't log sensitive data like phone/details in production
    })
    
    // Validate required fields
    const requiredFields: (keyof ContactFormData)[] = ['fullName', 'country', 'phone', 'email', 'tutoringDetails', 'hourlyBudget']
    for (const field of requiredFields) {
      if (!body[field]) {
        console.log(`Validation failed: ${field} is missing`)
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        )
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      console.log('Validation failed: Invalid email format')
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    console.log('Form validation passed')

    // Save to Sanity
    let sanitySuccess = false
    try {
      console.log('Attempting to save to Sanity...')
      console.log('Sanity Project ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID)
      console.log('Sanity Dataset:', process.env.NEXT_PUBLIC_SANITY_DATASET)
      console.log('Sanity Token available:', !!process.env.SANITY_API_TOKEN)
      
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
      console.log('✅ Successfully saved to Sanity:', doc._id)
      sanitySuccess = true
    } catch (sanityError) {
      console.error('❌ Sanity save failed:', sanityError)
      // Continue with email sending even if Sanity fails
    }

    // Send email notification if Resend is configured
    let emailSuccess = false
    console.log('Checking email configuration...')
    console.log('RESEND_API_KEY available:', !!process.env.RESEND_API_KEY)
    console.log('NOTIFICATION_EMAIL:', process.env.NOTIFICATION_EMAIL)
    console.log('FROM_EMAIL:', process.env.FROM_EMAIL)
    
    if (process.env.RESEND_API_KEY && process.env.NOTIFICATION_EMAIL) {
      try {
        console.log('Attempting to send email...')
        const resend = new Resend(process.env.RESEND_API_KEY)
        const result = await resend.emails.send({
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
        console.log('✅ Email sent successfully:', result)
        emailSuccess = true
      } catch (emailError) {
        console.error('❌ Email sending failed:', emailError)
        // Don't fail the request if email fails
      }
    } else {
      console.log('⚠️ Email not configured - missing environment variables')
    }

    // Return response with debugging info
    const responseData = {
      message: 'Form submitted successfully',
      debug: {
        sanitySuccess,
        emailSuccess,
        timestamp: new Date().toISOString()
      }
    }
    
    console.log('=== API RESPONSE ===', responseData)
    return NextResponse.json(responseData, { status: 200 })

  } catch (error) {
    console.error('❌ API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 