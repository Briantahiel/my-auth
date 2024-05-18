"use client";
import { signOut } from "next-auth/react";
import styled from "styled-components";

const StyledButton = styled.button`
  background: none;
  border: none;
  color: blue;
  cursor: pointer;
  text-decoration: underline;
  font-size: 1rem;
  padding: 0;
  font-family: inherit;

  &:hover {
    color: darkblue;
  }
`;

export default function Logout() {
  return (
    <div>
      <StyledButton onClick={() => signOut()}>Log out</StyledButton>
    </div>
  );
}
