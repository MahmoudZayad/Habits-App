
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils/auth";
import { SignInWithGoogle, SignOut, TrackMyHabits} from './session-buttons';


export default async function LoginForm() {
  const session = await getServerSession(authOptions);
  return (
    <div>
    { session ? (
      <div className="bg-neutral-900 flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className={`mb-3 text-center font-semibold text-2xl`}>
          Already signed in as {session.user?.name}
        </h1>
        <TrackMyHabits/>
        <SignOut/>
      </div>
    ) : (  
      <div className="bg-neutral-900 flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
          <h1 className={`mb-3 text-center font-semibold text-3xl`}>
            Login
          </h1>
          <SignInWithGoogle/>
          <div className="flex h-8 items-end space-x-1">
          </div>
        </div>
    )}
    </div>
  );  
}
