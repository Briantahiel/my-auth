"use client"
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import styled from 'styled-components';
import { useState } from 'react';

type FormData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};
const Container = styled.div`
max-width: 1200px;
margin: auto;
text-align: center;
`;

const Form = styled.form`
display: flex;
flex-direction: column;
margin: auto;
max-width: 440px;
`;

const ErrorMessage = styled.span`
color: red;
font-size: 0.8rem;
margin-top: 5px;
text-align: left;
`;


export default function Login() {
  const router = useRouter(); 
  const [error, setError] = useState(null);
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  
  const onSubmit = handleSubmit(async (data) => {
    const res = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false
    });
    if(res?.error){
        setError(res.error);
    }else{
        router.push('/dashboard');
        router.refresh();
    }
});

  return (
    <Container>
      <h1>Login</h1>
      <Form onSubmit={onSubmit}>
        {error && (
            <p>{error}</p>
        )}
        <input
          type="email"
          placeholder="example@email.com"
          {...register('email', {
            required: {
              value: true,
              message: 'Email is required'
            }
          })}
        />
        {errors.email && (
          <ErrorMessage>{errors.email.message}</ErrorMessage>
        )}

        <input
          type="password"
          placeholder="Password"
          {...register('password', {
            required: {
              value: true,
              message: 'Password is required'
            }
          })}
        />
        {errors.password && (
          <ErrorMessage>{errors.password.message}</ErrorMessage>
        )}

        <button type="submit">
          Login
        </button>
      </Form>
    </Container>
  );
}
