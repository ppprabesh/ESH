import 'dotenv/config'
import { supabaseClient } from '../lib/supabase.js'
import { cloudinary } from '../lib/cloudinary.js'

async function testConnections() {
  try {
    // Test Supabase connection
    const { data: supabaseData, error: supabaseError } = await supabaseClient
      .from('products')
      .select('*')
      .limit(1)

    if (supabaseError) {
      console.error('Supabase connection error:', supabaseError)
    } else {
      console.log('Supabase connection successful!')
    }

    // Test Cloudinary connection
    try {
      const result = await cloudinary.api.ping()
      console.log('Cloudinary connection successful!', result)
    } catch (cloudinaryError) {
      console.error('Cloudinary connection error:', cloudinaryError)
    }

  } catch (error) {
    console.error('General error:', error)
  }
}

// Run the tests
testConnections()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  }) 