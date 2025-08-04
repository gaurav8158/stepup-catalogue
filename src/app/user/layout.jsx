// app/user/layout.tsx
import React, { Suspense } from 'react';
import AuthLayoutClient from './AuthLayoutClient';

export default function Layout({ children }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthLayoutClient>{children}</AuthLayoutClient>
    </Suspense>
  );
}
