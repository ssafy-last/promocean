'use client';

// frontend/src/components/form/SignInForm.tsx

export default function SignInForm() {
  return (
    <div className="space-y-6">
      
      {/* 제목 */}
      <h1 className="text-3xl font-bold text-white mb-8">로그인</h1>
      
      {/* 이메일 입력 */}
      <div>
        <label className="block text-white text-sm font-medium mb-2">
          이메일
        </label>
        <input
          type="email"
          placeholder="Username"
          className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* 비밀번호 입력 */}
      <div>
        <label className="block text-white text-sm font-medium mb-2">
          비밀번호
        </label>
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* 비밀번호 찾기 링크 */}
      <div className="text-right">
        <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
          계정을 잊으셨나요? <span className="text-blue-400">계정 찾기</span>
        </a>
      </div>

      {/* 로그인 버튼 */}
      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors">
        Log in
      </button>

    </div>
  );
}