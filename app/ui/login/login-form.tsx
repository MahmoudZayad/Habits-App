import { signOut } from "next-auth/react";
import { getServerSession } from "next-auth";

import { Button } from './button';
import { authOptions } from "@/app/utils/auth";
import SignInWithGoogle from './google-login';


export default async function LoginForm() {
  const session = await getServerSession(authOptions);
  // const { data: session, status} = useSession();
  return (
    <div>
    { session ? (
      <div>
        <p>Already signed in as {session.user?.email}</p>
        <Button onClick = {()=>signOut()} className="mt-4 w-full">
          Track My Habits! 
        </Button>
        <Button onClick = {()=>signOut()} className="mt-4 w-full">
          Sign out
        </Button>
      </div>
    ) : (  
      <div className="bg-neutral-900 flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
          <h1 className={`mb-3 text-center font-semibold text-3xl`}>
            login
          </h1>
          {/* <div className="w-full">
            <div>
              <label htmlFor="email"></label>
              <div className="relative">
                <input
                  className="bg-neutral-800 peer block w-full rounded-xl border border-neutral-600 py-[9px] pl-3 text-sm outline-2 placeholder:text-neutral-500"
                  id="email"
                  type="email"
                  name="email"
                  placeholder="email address"
                  required
                />
                <AtSymbolIcon className="pointer-events-none absolute right-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-neutral-500 peer-focus:text-neutral-400" />
              </div>
            </div>
            <div className="mt-4">
              <label htmlFor="password"></label>
              <div className="relative">
                <input
                  className="bg-neutral-800 peer block w-full rounded-xl border border-neutral-600 py-[9px] pl-3 text-sm outline-2 placeholder:text-neutral-500"
                  id="password"
                  type="password"
                  name="password"
                  placeholder="enter password"
                  required
                  minLength={6}
                />
                <LockClosedIcon className="pointer-events-none absolute right-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-neutral-500 peer-focus:text-neutral-400" />
              </div>
            </div>
          </div> */}

          <SignInWithGoogle/>
          <div className="flex h-8 items-end space-x-1">
            {/* Add form errors here */}
          </div>
        </div>
    )}
    </div>
  );  
}
