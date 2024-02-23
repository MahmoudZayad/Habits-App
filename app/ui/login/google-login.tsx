'use client'
import { signIn } from "next-auth/react";
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from './button';

export default function SignInWithGoogle() {
  return (
    <Button onClick = {()=>signIn("google", {
      callbackUrl: `${window.location.origin}`,
    })
    } className="mt-4 w-full">
      Login with Google <ArrowRightIcon className="ml-auto h-5 w-5" />
    </Button>
  );
}