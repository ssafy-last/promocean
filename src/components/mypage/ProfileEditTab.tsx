'use client';

import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { authAPI } from '@/api/auth';
import { UploadAPI } from '@/api/upload';
import Image from 'next/image';
import UserCircle from '@/components/icon/UserCircle';

export default function ProfileEditTab() {
  const { user } = useAuthStore();

  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setNickname(user.nickname || '');
      setProfileImagePreview(user.profileUrl || '');
    }
  }, [user]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('이미지 파일만 업로드할 수 있습니다.');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert('파일 크기는 10MB를 초과할 수 없습니다.');
      return;
    }

    setProfileImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const updateData: { filePath?: string; password?: string; nickname?: string } = {};

      // 프로필 이미지 업로드
      if (profileImage) {
        const uploadData = await UploadAPI.getImagesS3Upload(profileImage.name);
        if (!uploadData) {
          throw new Error('Presigned URL을 받아오지 못했습니다.');
        }

        const uploadResult = await UploadAPI.uploadImageToS3({
          presignedUrl: uploadData.presignedUrl,
          file: profileImage,
        });

        if (!uploadResult || !uploadResult.ok) {
          throw new Error('이미지 업로드에 실패했습니다.');
        }

        updateData.filePath = uploadData.key;
      }

      // 닉네임 업데이트
      if (nickname && nickname !== user?.nickname) {
        updateData.nickname = nickname;
      }

      // 비밀번호 업데이트
      if (password) {
        if (password !== passwordConfirm) {
          alert('비밀번호가 일치하지 않습니다.');
          setIsLoading(false);
          return;
        }
        if (password.length < 8) {
          alert('비밀번호는 8자 이상이어야 합니다.');
          setIsLoading(false);
          return;
        }
        updateData.password = password;
      }

      // 업데이트할 데이터가 있는 경우에만 API 호출
      if (Object.keys(updateData).length > 0) {
        await authAPI.updateMember(updateData);

        // authStore 업데이트
        const currentToken = useAuthStore.getState().token || '';
        const updatedUser = { ...user! };

        if (updateData.filePath) {
          const cloudfrontUrl = `https://d3qr7nnlhj7oex.cloudfront.net/${updateData.filePath}`;
          updatedUser.profileUrl = cloudfrontUrl;
        }

        if (updateData.nickname) {
          updatedUser.nickname = updateData.nickname;
        }

        useAuthStore.getState().login(updatedUser, currentToken);

        alert('프로필이 성공적으로 수정되었습니다.');
        setPassword('');
        setPasswordConfirm('');
        setProfileImage(null);
      } else {
        alert('변경할 내용이 없습니다.');
      }
    } catch (error) {
      alert(error instanceof Error ? error.message : '프로필 수정에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) return null;

  return (
    <form onSubmit={handleProfileUpdate} className="space-y-6">
      {/* 프로필 이미지 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          프로필 이미지
        </label>
        <div className="flex items-center gap-4">
          <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-100">
            {profileImagePreview ? (
              <Image
                src={profileImagePreview}
                alt="프로필 이미지"
                fill
                sizes="96px"
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <UserCircle className="w-12 h-12 text-gray-400" />
              </div>
            )}
          </div>
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/90 cursor-pointer"
            />
            <p className="mt-1 text-xs text-gray-500">10MB 이하의 이미지 파일만 업로드 가능합니다.</p>
          </div>
        </div>
      </div>

      {/* 닉네임 */}
      <div>
        <label htmlFor="nickname" className="block text-sm font-medium text-gray-700 mb-2">
          닉네임
        </label>
        <input
          type="text"
          id="nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          required
        />
      </div>

      {/* 이메일 (읽기 전용) */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          이메일
        </label>
        <input
          type="email"
          id="email"
          value={user.email}
          disabled
          className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500 cursor-not-allowed"
        />
        <p className="mt-1 text-xs text-gray-500">이메일은 변경할 수 없습니다.</p>
      </div>

      {/* 비밀번호 */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
          새 비밀번호
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          minLength={8}
        />
      </div>

      {/* 비밀번호 확인 */}
      <div>
        <label htmlFor="passwordConfirm" className="block text-sm font-medium text-gray-700 mb-2">
          새 비밀번호 확인
        </label>
        <input
          type="password"
          id="passwordConfirm"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          minLength={8}
        />
      </div>

      {/* 제출 버튼 */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 bg-primary text-white font-semibold rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
        >
          {isLoading ? '수정 중...' : '프로필 수정'}
        </button>
      </div>
    </form>
  );
}
