"use client"

import React, { useState } from 'react'
import api from '@/api/axios-config'
import { useRouter } from 'next/navigation'
import { signUpSchema, SignUpFormData } from '@/lib/validations'
import { z } from 'zod'
import { toast } from 'react-toastify'
import Link from 'next/link'

const SignUpPage = () => {
  const router = useRouter()
  const [errors, setErrors] = useState<Partial<Record<keyof SignUpFormData, string>>>({})
  const [form, setForm] = useState<SignUpFormData>({
    email: "",
    name: "",
    password: "",
    passwordConfirm: ""
  })

  const handleSignUpForm = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    try {
      signUpSchema.parse(form)
      const response = await api.post("/auth/signup", form);
      const { data, token } = response.data
      localStorage.setItem("usertoken", token)
      localStorage.setItem("userData", JSON.stringify(data))
      toast.success("Account created successfully!")
      router.push("/home")
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors: any = {}
        error.issues.forEach((issue) => {
          if (issue.path[0]) formattedErrors[issue.path[0]] = issue.message
        })
        setErrors(formattedErrors)
      } else {
        toast.error("Registration failed. Please try again.")
      }
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center pt-6 px-4">
      {/* Logo */}
      <Link href="/home" className="mb-6">
        <span className="text-3xl font-bold italic text-black">amazon<span className="text-[#FF9900]">clone</span></span>
      </Link>

      <div className="max-w-[350px] w-full border border-[#DDD] rounded-md p-6 shadow-sm">
        <h1 className="text-3xl font-normal text-[#0f1111] mb-4">Create account</h1>

        <form onSubmit={handleSignUpForm} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-[#0f1111] mb-1">Your name</label>
            <input
              type="text"
              placeholder="First and last name"
              className={`w-full border border-gray-400 rounded-sm px-3 py-1.5 outline-none focus:ring-1 focus:ring-[#007185] focus:border-[#007185] shadow-sm text-sm ${errors.name ? 'border-red-600' : ''}`}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-bold text-[#0f1111] mb-1">Email</label>
            <input
              type="email"
              className={`w-full border border-gray-400 rounded-sm px-3 py-1.5 outline-none focus:ring-1 focus:ring-[#007185] focus:border-[#007185] shadow-sm text-sm ${errors.email ? 'border-red-600' : ''}`}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-bold text-[#0f1111] mb-1">Password</label>
            <input
              type="password"
              placeholder="At least 6 characters"
              className={`w-full border border-gray-400 rounded-sm px-3 py-1.5 outline-none focus:ring-1 focus:ring-[#007185] focus:border-[#007185] shadow-sm text-sm ${errors.password ? 'border-red-600' : ''}`}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <p className="text-[11px] text-[#565959] mt-1 flex gap-1">
              <span className="text-blue-500 font-bold">i</span> Passwords must be at least 6 characters.
            </p>
            {errors.password && <p className="text-red-600 text-xs mt-1">{errors.password}</p>}
          </div>

          <div>
            <label className="block text-sm font-bold text-[#0f1111] mb-1">Re-enter password</label>
            <input
              type="password"
              className={`w-full border border-gray-400 rounded-sm px-3 py-1.5 outline-none focus:ring-1 focus:ring-[#007185] focus:border-[#007185] shadow-sm text-sm ${errors.passwordConfirm ? 'border-red-600' : ''}`}
              onChange={(e) => setForm({ ...form, passwordConfirm: e.target.value })}
            />
            {errors.passwordConfirm && <p className="text-red-600 text-xs mt-1">{errors.passwordConfirm}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-[#FFD814] hover:bg-[#F7CA00] border border-[#A88734] rounded-sm py-1.5 text-sm shadow-sm active:shadow-inner"
          >
            Create your Amazon account
          </button>

          <p className="text-xs text-[#0f1111] leading-relaxed">
            By creating an account, you agree to Amazon Clone's <span className="text-[#007185] hover:underline cursor-pointer">Conditions of Use</span> and <span className="text-[#007185] hover:underline cursor-pointer">Privacy Notice</span>.
          </p>

          <div className="pt-4 border-t border-[#EEE]">
            <p className="text-xs text-[#0f1111]">
              Already have an account? <Link href="/login" className="text-[#007185] hover:text-[#C45500] hover:underline">Sign in</Link>
            </p>
          </div>
        </form>
      </div>

      {/* Footer */}
      <div className="mt-10 py-6 w-full border-t border-[#EEE] bg-gradient-to-t from-gray-50 to-white flex flex-col items-center gap-4">
        <div className="flex gap-6 text-xs text-[#007185]">
          <span className="hover:underline cursor-pointer">Conditions of Use</span>
          <span className="hover:underline cursor-pointer">Privacy Notice</span>
          <span className="hover:underline cursor-pointer">Help</span>
        </div>
        <p className="text-[10px] text-gray-500">© 1996-2026, AmazonClone.com, Inc. or its affiliates</p>
      </div>
    </div>
  )
}

export default SignUpPage
