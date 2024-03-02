'use client'
import { signIn, signOut } from "next-auth/react";
import { Button } from './button';
import Link from 'next/link';
import { 
  ArrowRightIcon,
  ArrowRightStartOnRectangleIcon,
  CheckIcon,
} from '@heroicons/react/20/solid';


export function SignInWithGoogle() {
  return (
    <Button onClick = {()=>signIn("google", {
      callbackUrl: `${window.location.origin}/habits`,
    })
    } className="mt-4 w-full">
      Login with Google <ArrowRightIcon className="ml-auto h-5 w-5" />
    </Button>
  );
}

export function SignOut() {
  return (
    <Button onClick = {() => signOut()} className="mt-4 w-full">
          Sign out <ArrowRightStartOnRectangleIcon className="ml-auto h-5 w-5" />
    </Button>
  )
}

export function TrackMyHabits() {

  return (
    <Link href="/habits">
        <Button className="mt-4 w-full">
        Track My Habits! <CheckIcon className="ml-auto h-5 w-5" />
      </Button>
    </Link>
    
    
  )
}