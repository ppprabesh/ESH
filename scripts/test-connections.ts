import imagekit from '../lib/imagekit.js'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  try {
    // Test Database connection
    await prisma.$connect()
    console.log('Database connection successful!')

    // Test ImageKit connection
    try {
      const result = await imagekit.listFiles({
        limit: 1
      })
      console.log('ImageKit connection successful!', result)
    } catch (imagekitError) {
      console.error('ImageKit connection error:', imagekitError)
    }

    await prisma.$disconnect()
  } catch (error) {
    console.error('Error:', error)
    await prisma.$disconnect()
    process.exit(1)
  }
}

main() 