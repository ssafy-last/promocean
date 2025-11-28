'use client';

import SpaceHeader from "@/components/layout/SpaceHeader";
import TeamSpaceChoiceSection from "@/components/section/TeamSpaceChoiceSection";
import AuthGuard from "@/components/auth/AuthGuard";


// frontend/src/app/team-space/page.tsx
export default function TeamSpacePage() {

  return (
    <AuthGuard>
      <div>
        <SpaceHeader isTeamSpace={true}/>
        <TeamSpaceChoiceSection/>
      </div>
    </AuthGuard>
  );
}
