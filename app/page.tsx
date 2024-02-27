import LoginForm from "./ui/login/login-form"
export default function LoginPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
          <div className="w-32 text-white md:w-36">
            <h1 className="text-4xl font-semibold">Habits</h1>
            <h1 className="text-4xl font-semibold block  text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-pink-400 to-sky-300">Tracker</h1>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}