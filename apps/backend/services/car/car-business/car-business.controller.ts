import { Request, Response } from 'express'
import { carHelper } from '../car-shared/car.helper'
import { 
  createBusinessCarRentalSchema, 
  businessCarRentalSearchSchema,
  cancelBusinessCarRentalSchema,
  bulkCarRentalSchema 
} from './car-business.schemas'

export class CarBusinessController {
  private carHelper: typeof carHelper

  constructor() {
    this.carHelper = carHelper
  }

  // Create business booking with enhanced features
  createCarRental = async (req: Request, res: Response) => {
    try {
      const bookingData = createBusinessBookingSchema.parse(req.body)
      const businessId = req.business?.id || 'business_' + Date.now() // Mock business ID

      // Validate traveler limits for business (up to 100)
      if (bookingData.travelers.length > 100) {
        return res.status(400).json({
          success: false,
          message: 'Maximum 100 travelers allowed per booking. Use bulk booking for larger groups.'
        })
      }

      // Apply corporate discounts
      const servicePrice = bookingData.serviceDetails.price || bookingData.serviceDetails.totalPrice || 0
      let discount = 20 // Base corporate discount
      if (bookingData.travelers.length >= 10) discount += 5 // Group discount
      if (servicePrice > 10000) discount += 5 // High-value booking discount

      // Create booking with corporate pricing
      const booking = await this.carHelper.createCarRental({
        userId: businessId,
        type: bookingData.type,
        serviceDetails: {
          ...bookingData.serviceDetails,
          corporateDiscount: discount,
          originalPrice: servicePrice,
          discountedPrice: servicePrice * (1 - discount / 100)
        },
        travelers: bookingData.travelers,
        contactInfo: bookingData.contactInfo,
        paymentMethod: bookingData.paymentMethod,
        specialRequests: bookingData.specialRequests,
        corporateInfo: bookingData.corporateInfo
      })

      res.status(201).json({
        success: true,
        booking: {
          id: booking.id,
          bookingReference: booking.bookingReference,
          type: booking.type,
          status: booking.status,
          travelers: booking.travelers,
          pricing: {
            ...booking.pricing,
            corporateDiscount: discount,
            savingsAmount: Math.round(servicePrice * (discount / 100))
          },
          corporateInfo: booking.corporateInfo,
          projectInfo: bookingData.projectInfo
        },
        businessFeatures: {
          maxTravelers: 100,
          corporateDiscounts: true,
          bulkBookingAvailable: true,
          invoicingAvailable: true,
          approvalWorkflow: true
        },
        message: 'Business booking created successfully with corporate rates applied.'
      })
    } catch (error) {
      console.error('Create business booking error:', error)
      res.status(400).json({
        success: false,
        message: 'Failed to create business booking',
        error: error instanceof Error ? error.message : 'Unknown error'
      })
    }
  }

  // Create bulk booking for corporate clients
  createBulkBooking = async (req: Request, res: Response) => {
    try {
      const bulkData = bulkBookingSchema.parse(req.body)
      const businessId = req.business?.id || 'business_' + Date.now() // Mock business ID

      if (bulkData.bookings.length > 50) {
        return res.status(400).json({
          success: false,
          message: 'Maximum 50 bookings allowed in bulk operation'
        })
      }

      const createdBookings = []
      let totalAmount = 0
      let totalSavings = 0

      for (const bookingData of bulkData.bookings) {
        const servicePrice = bookingData.serviceDetails.price || bookingData.serviceDetails.totalPrice || 0
        
        // Enhanced bulk discounts
        let discount = 25 // Base bulk discount
        if (bulkData.corporateDiscount) discount += bulkData.corporateDiscount
        if (bulkData.bookings.length >= 20) discount += 5 // Volume discount
        
        const discountedPrice = servicePrice * (1 - discount / 100)
        const savings = servicePrice - discountedPrice

        const booking = await this.carHelper.createCarRental({
          userId: businessId,
          type: bookingData.type,
          serviceDetails: {
            ...bookingData.serviceDetails,
            bulkDiscount: discount,
            originalPrice: servicePrice,
            discountedPrice
          },
          travelers: bookingData.travelers,
          contactInfo: bookingData.contactInfo,
          paymentMethod: bookingData.paymentMethod,
          specialRequests: bookingData.specialRequests,
          corporateInfo: bookingData.corporateInfo
        })

        createdBookings.push(booking)
        totalAmount += discountedPrice
        totalSavings += savings
      }

      res.status(201).json({
        success: true,
        bulkBooking: {
          id: `bulk_${Date.now()}`,
          bookings: createdBookings.map(b => ({
            id: b.id,
            bookingReference: b.bookingReference,
            type: b.type,
            status: b.status,
            pricing: b.pricing
          })),
          summary: {
            totalBookings: createdBookings.length,
            totalAmount,
            totalSavings,
            averageDiscount: Math.round((totalSavings / (totalAmount + totalSavings)) * 100),
            paymentTerms: bulkData.paymentTerms
          }
        },
        message: 'Bulk booking created successfully with enhanced corporate rates.'
      })
    } catch (error) {
      console.error('Create bulk booking error:', error)
      res.status(400).json({
        success: false,
        message: 'Failed to create bulk booking',
        error: error instanceof Error ? error.message : 'Unknown error'
      })
    }
  }

  // Get business bookings with advanced filtering
  getBookings = async (req: Request, res: Response) => {
    try {
      const filters = businessBookingSearchSchema.parse(req.query)
      const businessId = req.business?.id || 'business_' + Date.now() // Mock business ID

      const bookings = await this.carHelper.searchBookings({
        ...filters,
        userId: businessId
      })

      // Add business-specific metadata
      const businessBookings = bookings.map(booking => ({
        ...booking,
        corporateInfo: booking.corporateInfo,
        travelPolicy: {
          compliant: true, // Mock compliance check
          warnings: []
        },
        costCenter: booking.travelers[0]?.costCenter || 'N/A'
      }))

      res.json({
        success: true,
        bookings: businessBookings,
        count: businessBookings.length,
        businessFeatures: {
          costCenterTracking: true,
          travelPolicyCompliance: true,
          advancedReporting: true,
          bulkOperations: true
        },
        message: 'Business bookings retrieved successfully'
      })
    } catch (error) {
      console.error('Get business bookings error:', error)
      res.status(400).json({
        success: false,
        message: 'Failed to get business bookings',
        error: error instanceof Error ? error.message : 'Unknown error'
      })
    }
  }

  // Get detailed booking information
  getBookingDetails = async (req: Request, res: Response) => {
    try {
      const { bookingId } = req.params
      const businessId = req.business?.id || 'business_' + Date.now() // Mock business ID

      let booking = await this.carHelper.getBookingById(bookingId)
      
      if (!booking) {
        booking = await this.carHelper.getBookingByReference(bookingId)
      }

      if (!booking) {
        return res.status(404).json({
          success: false,
          message: 'Booking not found'
        })
      }

      // Verify business ownership
      if (booking.userId !== businessId) {
        return res.status(403).json({
          success: false,
          message: 'Access denied'
        })
      }

      res.json({
        success: true,
        booking: {
          ...booking,
          businessMetadata: {
            approvalStatus: 'approved',
            complianceCheck: 'passed',
            costCenter: booking.corporateInfo?.companyName || 'N/A',
            invoiceGenerated: booking.paymentStatus === 'paid'
          }
        },
        message: 'Business booking details retrieved successfully'
      })
    } catch (error) {
      console.error('Get business booking details error:', error)
      res.status(500).json({
        success: false,
        message: 'Failed to get booking details'
      })
    }
  }

  // Cancel business booking with advanced options
  cancelBooking = async (req: Request, res: Response) => {
    try {
      const { bookingId } = req.params
      const { reason, refundType, refundAmount } = cancelBusinessBookingSchema.parse(req.body)
      const businessId = req.business?.id || 'business_' + Date.now() // Mock business ID

      const booking = await this.carHelper.getBookingById(bookingId)
      if (!booking) {
        return res.status(404).json({
          success: false,
          message: 'Booking not found'
        })
      }

      if (booking.userId !== businessId) {
        return res.status(403).json({
          success: false,
          message: 'Access denied'
        })
      }

      if (booking.status === 'cancelled' || booking.status === 'completed') {
        return res.status(400).json({
          success: false,
          message: `Cannot cancel booking with status: ${booking.status}`
        })
      }

      // Process cancellation with business-specific refund logic
      const cancelledBooking = await this.carHelper.cancelBooking(bookingId, reason)
      
      let refundResult = null
      if (refundType === 'partial' && refundAmount) {
        refundResult = await this.carHelper.processRefund(bookingId, 'partial', reason, refundAmount)
      } else {
        refundResult = await this.carHelper.processRefund(bookingId, 'full', reason)
      }

      res.json({
        success: true,
        booking: cancelledBooking,
        refund: refundResult,
        message: 'Business booking cancelled successfully. Refund processed according to corporate terms.'
      })
    } catch (error) {
      console.error('Cancel business booking error:', error)
      res.status(400).json({
        success: false,
        message: 'Failed to cancel booking',
        error: error instanceof Error ? error.message : 'Unknown error'
      })
    }
  }

  // Process corporate payment
  processPayment = async (req: Request, res: Response) => {
    try {
      const { bookingId } = req.params
      const { paymentDetails, invoiceRequired = true } = req.body
      const businessId = req.business?.id || 'business_' + Date.now() // Mock business ID

      const booking = await this.carHelper.getBookingById(bookingId)
      if (!booking) {
        return res.status(404).json({
          success: false,
          message: 'Booking not found'
        })
      }

      if (booking.userId !== businessId) {
        return res.status(403).json({
          success: false,
          message: 'Access denied'
        })
      }

      const paymentResult = await this.carHelper.processPayment(bookingId, paymentDetails)

      if (paymentResult.success) {
        res.json({
          success: true,
          transactionId: paymentResult.transactionId,
          invoice: invoiceRequired ? {
            invoiceId: `inv_${Date.now()}`,
            generated: true,
            downloadUrl: '/api/invoices/download'
          } : null,
          message: 'Corporate payment processed successfully. Invoice will be sent to billing email.'
        })
      } else {
        res.status(400).json({
          success: false,
          message: 'Payment failed',
          error: paymentResult.error
        })
      }
    } catch (error) {
      console.error('Process corporate payment error:', error)
      res.status(500).json({
        success: false,
        message: 'Failed to process payment'
      })
    }
  }

  // Approve booking (workflow feature)
  approveBooking = async (req: Request, res: Response) => {
    try {
      const { bookingId } = req.params
      const { approverNotes } = req.body

      const booking = await this.carHelper.updateBookingStatus(bookingId, 'confirmed')
      
      if (!booking) {
        return res.status(404).json({
          success: false,
          message: 'Booking not found'
        })
      }

      res.json({
        success: true,
        booking: {
          ...booking,
          approvalInfo: {
            approved: true,
            approvedAt: new Date().toISOString(),
            approverNotes
          }
        },
        message: 'Booking approved successfully'
      })
    } catch (error) {
      console.error('Approve booking error:', error)
      res.status(500).json({
        success: false,
        message: 'Failed to approve booking'
      })
    }
  }

  // Modify existing booking
  modifyBooking = async (req: Request, res: Response) => {
    try {
      const { bookingId } = req.params
      const { modifications, reason } = req.body
      const businessId = req.business?.id || 'business_' + Date.now() // Mock business ID

      const booking = await this.carHelper.getBookingById(bookingId)
      if (!booking) {
        return res.status(404).json({
          success: false,
          message: 'Booking not found'
        })
      }

      if (booking.userId !== businessId) {
        return res.status(403).json({
          success: false,
          message: 'Access denied'
        })
      }

      // Mock modification logic - replace with actual business logic
      const modifiedBooking = {
        ...booking,
        serviceDetails: {
          ...booking.serviceDetails,
          ...modifications
        },
        updatedAt: new Date().toISOString(),
        modificationHistory: [
          {
            modifiedAt: new Date().toISOString(),
            reason,
            changes: modifications
          }
        ]
      }

      res.json({
        success: true,
        booking: modifiedBooking,
        message: 'Booking modified successfully'
      })
    } catch (error) {
      console.error('Modify booking error:', error)
      res.status(500).json({
        success: false,
        message: 'Failed to modify booking'
      })
    }
  }

  // Get comprehensive analytics
  getBookingAnalytics = async (req: Request, res: Response) => {
    try {
      const { period = '30', department, costCenter } = req.query
      const businessId = req.business?.id || 'business_' + Date.now() // Mock business ID

      // Mock analytics data - replace with actual database aggregation
      const analytics = {
        summary: {
          totalBookings: 156,
          totalSpent: 245000,
          totalSavings: 48000,
          averageBookingValue: 1570,
          averageSavings: 308
        },
        breakdown: {
          flights: {
            count: 89,
            amount: 178000,
            savings: 35000
          },
          hotels: {
            count: 67,
            amount: 67000,
            savings: 13000
          }
        },
        topDestinations: [
          { city: 'New York', bookings: 45, amount: 67500 },
          { city: 'San Francisco', bookings: 32, amount: 48000 },
          { city: 'Chicago', bookings: 28, amount: 39200 }
        ],
        costCenters: [
          { name: 'Sales', bookings: 56, amount: 84000 },
          { name: 'Engineering', bookings: 42, amount: 63000 },
          { name: 'Marketing', bookings: 38, amount: 57000 }
        ],
        travelPolicy: {
          compliance: 94,
          violations: 9,
          savings: 15000
        }
      }

      res.json({
        success: true,
        analytics,
        period: `${period} days`,
        filters: { department, costCenter },
        message: 'Business analytics retrieved successfully'
      })
    } catch (error) {
      console.error('Get business analytics error:', error)
      res.status(500).json({
        success: false,
        message: 'Failed to get analytics'
      })
    }
  }

  // Generate comprehensive reports
  generateReport = async (req: Request, res: Response) => {
    try {
      const { type = 'summary', format = 'json', period = '30' } = req.query
      const businessId = req.business?.id || 'business_' + Date.now() // Mock business ID

      // Mock report generation - replace with actual reporting logic
      const report = {
        reportId: `report_${Date.now()}`,
        type,
        period: `${period} days`,
        generatedAt: new Date().toISOString(),
        data: {
          executive_summary: {
            total_bookings: 156,
            total_spend: 245000,
            total_savings: 48000,
            policy_compliance: '94%'
          },
          detailed_breakdown: {
            by_type: { flights: 89, hotels: 67 },
            by_department: { sales: 56, engineering: 42, marketing: 38 },
            by_destination: { 'new-york': 45, 'san-francisco': 32, 'chicago': 28 }
          },
          recommendations: [
            'Consider volume discounts for New York routes',
            'Implement advance booking policy for 15% additional savings',
            'Review hotel preferences in San Francisco for better rates'
          ]
        }
      }

      if (format === 'pdf') {
        res.json({
          success: true,
          report: {
            ...report,
            downloadUrl: `/api/reports/download/${report.reportId}.pdf`
          },
          message: 'Report generated successfully. Download link provided.'
        })
      } else {
        res.json({
          success: true,
          report,
          message: 'Report generated successfully'
        })
      }
    } catch (error) {
      console.error('Generate report error:', error)
      res.status(500).json({
        success: false,
        message: 'Failed to generate report'
      })
    }
  }
}