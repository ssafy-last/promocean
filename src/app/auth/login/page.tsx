// frontend/src/app/auth/login/page.tsx

import LoginTabs from "@/components/filter/LoginTabs";
import SignInForm from "@/components/form/SignInForm";
import SignUpForm from "@/components/form/SignUpForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <LoginTabs />
      </div>
      <SignInForm />
      <SignUpForm />
    </div>
  );
}
