"use client"
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';

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


export default function Register() {
  const router = useRouter(); 
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  
  const onSubmit = handleSubmit(async (data) => {
    if (data.password !== data.confirmPassword){
        return alert("Password do not match");
    }
    const res = await fetch('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({
           username: data.username,
           email: data.email,
           password: data.password,
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if(res.ok){
        router.push('/auth/login')
    }
});

  return (
    <Container>
      <h1>Register</h1>
      <Form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Username"
          {...register('username', {
            required: {
              value: true,
              message: 'Username is required'
            }
          })}
        />
        {errors.username && (
          <ErrorMessage>{errors.username.message}</ErrorMessage>
        )}

        <input
          type="email"
          placeholder="Email"
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

        <input
          type="password"
          placeholder="Confirm Password"
          {...register('confirmPassword', {
            required: {
              value: true,
              message: 'Confirm Password is required'
            }
          })}
        />
        {errors.confirmPassword && (
          <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>
        )}

        <button type="submit">
          Register
        </button>
      </Form>
    </Container>
  );
}
