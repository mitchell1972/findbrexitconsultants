# Registration System Fixes Implementation Plan

## Fix #1: Business Registration Database Schema Mismatch

### Problem
Form tries to submit `services` and `industries` arrays directly to `brexit_consultants` table, but these fields don't exist. They should go to junction tables.

### Solution
```typescript
// In ListBusinessPage.tsx - Replace the current handleSubmit function

const handleSubmit = async () => {
  if (!validateStep(4)) return
  
  if (!user) {
    toast.error('Please sign in to register your business')
    navigate('/signin')
    return
  }

  setIsSubmitting(true)
  
  try {
    // Extract services and industries from form data
    const { services, industries, ...consultantData } = formData
    
    // 1. Insert consultant data (without services/industries)
    const { data: consultant, error: consultantError } = await supabase
      .from('brexit_consultants')
      .insert({
        ...consultantData,
        user_id: user.id,
        verified: false,
        featured: false,
        profile_views: 0
      })
      .select()
      .single()
    
    if (consultantError) throw consultantError
    
    // 2. Insert services into junction table
    if (services && services.length > 0) {
      // First, get service IDs
      const { data: serviceTypes, error: serviceError } = await supabase
        .from('brexit_service_types')
        .select('id, name')
        .in('name', services)
      
      if (serviceError) throw serviceError
      
      // Insert consultant-service relationships
      const serviceInserts = serviceTypes.map(service => ({
        consultant_id: consultant.id,
        service_type_id: service.id
      }))
      
      const { error: serviceJunctionError } = await supabase
        .from('brexit_consultant_services')
        .insert(serviceInserts)
      
      if (serviceJunctionError) throw serviceJunctionError
    }
    
    // 3. Insert industries into junction table
    if (industries && industries.length > 0) {
      // First, get industry IDs
      const { data: industryTypes, error: industryError } = await supabase
        .from('brexit_industries')
        .select('id, name')
        .in('name', industries)
      
      if (industryError) throw industryError
      
      // Insert consultant-industry relationships
      const industryInserts = industryTypes.map(industry => ({
        consultant_id: consultant.id,
        industry_id: industry.id
      }))
      
      const { error: industryJunctionError } = await supabase
        .from('brexit_consultant_industries')
        .insert(industryInserts)
      
      if (industryJunctionError) throw industryJunctionError
    }
    
    setShowSuccess(true)
    toast.success('Registration submitted successfully! We will review your application.')
    
    // Reset form after successful submission
    setTimeout(() => {
      navigate('/dashboard')
    }, 3000)
    
  } catch (error: any) {
    console.error('Registration error:', error)
    
    // Provide specific error feedback
    let errorMessage = 'Failed to submit registration. Please try again.'
    if (error.message) {
      errorMessage = `Registration failed: ${error.message}`
    }
    
    toast.error(errorMessage)
  } finally {
    setIsSubmitting(false)
  }
}
```

## Fix #2: Sign-Up Password Validation

### Problem
Password validation shows "Must be at least 6 characters" even for passwords that meet requirements.

### Solution
```typescript
// In SignUpPage.tsx - Fix the validation logic

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  
  // Fix validation logic
  if (!formData.email || !formData.password || !formData.companyName || !formData.contactName) {
    toast.error('Please fill in all required fields')
    return
  }

  // Fix password length validation
  if (formData.password.length < 6) {
    toast.error('Password must be at least 6 characters long')
    return
  }

  if (formData.password !== formData.confirmPassword) {
    toast.error('Passwords do not match')
    return
  }

  if (!formData.acceptTerms) {
    toast.error('Please accept the terms and conditions')
    return
  }

  setIsLoading(true)
  try {
    const { error } = await signUp(formData.email, formData.password)
    
    if (error) {
      // Improved error handling
      let errorMessage = 'Failed to create account'
      
      if (error.message.includes('email')) {
        errorMessage = 'Please enter a valid email address'
      } else if (error.message.includes('password')) {
        errorMessage = 'Password does not meet requirements'
      } else {
        errorMessage = error.message
      }
      
      toast.error(errorMessage)
    } else {
      toast.success('Account created! Please check your email to verify your account.')
      navigate('/signin')
    }
  } catch (error: any) {
    toast.error(error.message || 'An unexpected error occurred')
  } finally {
    setIsLoading(false)
  }
}
```

## Fix #3: Sign-In Error Display

### Problem
Sign-in failures don't show error messages to users.

### Solution
```typescript
// In SignInPage.tsx - Add error state and display

const [error, setError] = useState<string>('')
const [isLoading, setIsLoading] = useState(false)

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setError('') // Clear previous errors
  
  if (!email || !password) {
    setError('Please enter both email and password')
    return
  }

  setIsLoading(true)
  
  try {
    const { error } = await signIn(email, password)
    
    if (error) {
      // Display specific error messages
      if (error.message.includes('Invalid login credentials')) {
        setError('Invalid email or password. Please check your credentials and try again.')
      } else if (error.message.includes('Email not confirmed')) {
        setError('Please check your email and confirm your account before signing in.')
      } else {
        setError(error.message || 'Sign in failed. Please try again.')
      }
    } else {
      // Successful login
      navigate('/dashboard')
    }
  } catch (error: any) {
    setError('An unexpected error occurred. Please try again.')
  } finally {
    setIsLoading(false)
  }
}

// In the JSX, add error display:
{error && (
  <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
    <p className="text-red-600 text-sm">{error}</p>
  </div>
)}
```

## Fix #4: Supabase Email Validation

### Problem
Supabase rejecting valid email addresses during signup.

### Investigation Steps
1. Check Supabase project settings for email validation rules
2. Verify authentication configuration
3. Test with different email formats

### Potential Solutions
1. Update Supabase project settings if restrictive validation is enabled
2. Check for custom validation functions in Supabase
3. Verify environment variables are correctly set

## Implementation Priority

1. **CRITICAL**: Fix #1 (Business Registration) - Blocks all business signups
2. **HIGH**: Fix #3 (Sign-In Error Display) - Poor UX for existing users
3. **HIGH**: Fix #2 (Sign-Up Password) - Blocks new user creation
4. **MEDIUM**: Fix #4 (Email Validation) - May require Supabase configuration

## Testing After Fixes

1. **Unit Tests**: Test each component's error handling
2. **Integration Tests**: Test complete signup/signin flows
3. **E2E Tests**: Run full Playwright test suite
4. **Manual Tests**: Verify user experience improvements

## Files to Update

1. `src/pages/ListBusinessPage.tsx`
2. `src/pages/auth/SignUpPage.tsx`
3. `src/pages/auth/SignInPage.tsx`
4. `src/contexts/AuthContext.tsx` (if needed for better error handling)

---

**Next Step**: Implement fixes in order of priority and test each one thoroughly.