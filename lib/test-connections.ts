import { supabase } from './supabase'
import { cloudinary } from './cloudinary'

export async function testConnections() {
  try {
    // Test Supabase connection
    const { data: supabaseData, error: supabaseError } = await supabase
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