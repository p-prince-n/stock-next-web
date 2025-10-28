'use client';
import { Button } from "@/components/ui/button";
import { useForm, SubmitHandler } from "react-hook-form"
import { Spinner } from "@/components/ui/spinner"
import InputField from "@/components/forms/InputField";
import SelectField from "@/components/forms/SelectField";
import { INVESTMENT_GOALS, PREFERRED_INDUSTRIES, RISK_TOLERANCE_OPTIONS } from "@/lib/constants";
import {CountrySelectField} from "@/components/forms/CountrySelectField";
import FooterLink from "@/components/forms/FooterLink";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    defaultValues: {
      email: '',
      password: ''
    },
    mode: 'onBlur'

  },)
  const onSubmit = async (data: SignInFormData) => {
    try {
      console.log(data);


    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <h1 className='form-title'>Log In Your Account</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 ">
       

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
      
        <Button disabled={isSubmitting} type="submit" className="bg-gradient-to-br from-purple-600 to-blue-500 text-white hover:bg-gradient-to-bl focus:ring-blue-300 dark:focus:ring-blue-800 w-full mt-5" >
          {isSubmitting ? <Spinner className="text-black" /> : 'log in'}
        </Button>
        <FooterLink text="Don't have an account" linkText="Sign up" href="/sign-up"/> 
      </form>
    </>
  )
}

export default SignIn