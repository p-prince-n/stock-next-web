'use client';
import { Button } from "@/components/ui/button";
import { useForm, SubmitHandler } from "react-hook-form"
import { Spinner } from "@/components/ui/spinner"
import InputField from "@/components/forms/InputField";
import SelectField from "@/components/forms/SelectField";
import { INVESTMENT_GOALS, PREFERRED_INDUSTRIES, RISK_TOLERANCE_OPTIONS } from "@/lib/constants";
import {CountrySelectField} from "@/components/forms/CountrySelectField";
import FooterLink from "@/components/forms/FooterLink";
import { signUpWithEmail } from "@/lib/actions/auth.actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { error } from "console";

const SignUp = () => {
  const router=useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      country: 'US',
      investmentGoals: 'Growth',
      riskTolerance: 'Medium',
      preferredIndustry: 'Technology',
    },
    mode: 'onBlur'

  },)
  const onSubmit = async (data: SignUpFormData) => {
    try {
    const result= await signUpWithEmail(data);
    if(result.success) router.push('/')


    } catch (e) {
      console.error(e)
      toast.error('Sign up failed', {
        description: e instanceof Error? e.message: 'failed to create an account'
      })
    }
  }

  return (
    <>
      <h1 className='form-title'>Sign Up & Personalize</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 ">
        <InputField
          name="fullName"
          label="Full Name"
          placeholder="Abcd Efg"
          register={register}
          error={errors.fullName}
          validation={{
            required: 'Full Name is required',
            minLength: { value: 2, message: 'Minimum 2 characters needed' }
          }}
        />

          <InputField
          name="email"
          label="Email"
          type="email"
          placeholder="abcd@email.com"
          register={register}
          error={errors.email}
          validation={{
            required: 'Email is required',
            pattern:/^\w+@\w+\.\w+$/, message:'Invalid email address'
          }}
        />
        <CountrySelectField name="country" label="Country" control={control} error={errors.country} required />
        <InputField
          name="password"
          label="Password"
          placeholder="Enter a String Password"
          register={register}
          type="password"
          error={errors.password}
          validation={{
            required: 'Password is required',
            minLength: { value: 8, message: 'Minimum 8 characters needed' }
          }}
        />
        <SelectField
        name="investmentGoals"
        label="Invetsment Goals"
        placeholder="Select your investment goals"
        options={INVESTMENT_GOALS}
        control={control}
        error={errors.investmentGoals}
        required

        />
        <SelectField
        name="riskTolerance"
        label="Risk Tolerance"
        placeholder="Select your risk level"
        options={RISK_TOLERANCE_OPTIONS}
        control={control}
        error={errors.riskTolerance}
        required

        />
        <SelectField
        name="preferredIndustry"
        label="Preferred Industry"
        placeholder="Select your Preferred Industry"
        options={PREFERRED_INDUSTRIES}
        control={control}
        error={errors.preferredIndustry}
        required

        />
        <Button disabled={isSubmitting} type="submit" className="bg-gradient-to-br from-purple-600 to-blue-500 text-white hover:bg-gradient-to-bl focus:ring-blue-300 dark:focus:ring-blue-800 w-full mt-5" >
          {isSubmitting ? <Spinner className="text-black" /> : 'Start Your Investing Journey'}
        </Button>
        <FooterLink text="Already have an account" linkText="Sign in" href="/sign-in"/> 
      </form>
    </>
  )
}

export default SignUp