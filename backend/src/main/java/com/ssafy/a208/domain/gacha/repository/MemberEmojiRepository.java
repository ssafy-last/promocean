package com.ssafy.a208.domain.gacha.repository;

import com.ssafy.a208.domain.gacha.entity.Emoji;
import com.ssafy.a208.domain.gacha.entity.MemberEmoji;
import com.ssafy.a208.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MemberEmojiRepository extends JpaRepository<MemberEmoji, Long> {
    boolean existsByMemberAndEmojiAndDeletedAtIsNull(Member member, Emoji emoji);
    List<MemberEmoji> findByMemberAndDeletedAtIsNull(Member member);
    List<MemberEmoji> findByMemberAndDeletedAtIsNullOrderByObtainedAtDesc(Member member);
}