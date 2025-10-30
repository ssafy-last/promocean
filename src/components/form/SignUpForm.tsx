'use client';

// frontend/src/components/form/SignUpForm.tsx

export default function SignUpForm() {
  return (
    <div className="space-y-6">
      {/* 제목 */}
      <h1 className="text-3xl font-bold text-white mb-8">회원가입</h1>
      
      {/* 이메일 입력 */}
      <div>
        <label className="block text-white text-sm font-medium mb-2">
          이메일
        </label>
        <input
          type="email"
          placeholder="Email"
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

      {/* 비밀번호 확인 입력 */}
      <div>
        <label className="block text-white text-sm font-medium mb-2">
          비밀번호 확인
        </label>
        <input
          type="password"
          placeholder="Confirm password"
          className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* 닉네임 입력 */}
      <div>
        <label className="block text-white text-sm font-medium mb-2">
          닉네임
        </label>
        <input
          type="text"
          placeholder="Nickname"
          className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* 회원가입 버튼 */}
      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors">
        Sign Up
      </button>
    </div>
  );
}