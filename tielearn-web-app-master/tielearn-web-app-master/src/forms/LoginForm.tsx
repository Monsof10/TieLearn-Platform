"use client"
import { API_BASE } from '@/utils/api';
import { toast } from 'react-toastify';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import BtnArrow from "@/svg/BtnArrow"
import Link from "next/link"
import { useDispatch } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '@/redux/features/authSlice';
import { useRouter } from 'next/navigation';

interface FormData {
   username: string;
   password: string;
}

const LoginForm = () => {
   const dispatch = useDispatch();
   const router = useRouter();

   const schema = yup
      .object({
         username: yup.string().required().label("Username"),
         password: yup.string().required().label("Password"),
      })
      .required();

   const { register, handleSubmit, reset, formState: { errors, isSubmitting }, } = useForm<FormData>({ resolver: yupResolver(schema), });

   const onSubmit = async (data: FormData) => {
      dispatch(loginStart());
      try {
         const response = await fetch(`${API_BASE}/auth/login`, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
         });

         const result = await response.json();

         if (response.ok) {
            dispatch(loginSuccess({ token: result.token, user: result.user }));
            toast.success('Login successful!', { position: 'top-center' });
            reset();
            // Redirect based on role
            if (result.user.role === 'admin') {
               router.push('/admin');
            } else {
               router.push('/dashboard');
            }
         } else {
            dispatch(loginFailure(result.message || 'Login failed'));
            toast.error(result.message || 'Login failed', { position: 'top-center' });
         }
      } catch (error) {
         dispatch(loginFailure('Network error'));
         toast.error('Network error', { position: 'top-center' });
      }
   };

   return (
      <form onSubmit={handleSubmit(onSubmit)} className="account__form">
         <div className="form-grp">
            <label htmlFor="username">Username</label>
            <input id="username" {...register("username")} type="text" placeholder="username" />
            <p className="form_error">{errors.username?.message}</p>
         </div>
         <div className="form-grp">
            <label htmlFor="password">Password</label>
            <input id="password" {...register("password")} type="password" placeholder="password" />
            <p className="form_error">{errors.password?.message}</p>
         </div>
         <div className="account__check">
            <div className="account__check-remember">
               <input type="checkbox" className="form-check-input" value="" id="terms-check" />
               <label htmlFor="terms-check" className="form-check-label">Remember me</label>
            </div>
            <div className="account__check-forgot">
               <Link href="/registration">Forgot Password?</Link>
            </div>
         </div>
         <button type="submit" className="btn btn-two arrow-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Signing In...' : 'Sign In'}<BtnArrow />
         </button>
      </form>
   )
}

export default LoginForm
