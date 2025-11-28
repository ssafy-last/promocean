package com.ssafy.a208.domain.gacha.repository;

import com.ssafy.a208.domain.gacha.entity.Emoji;
import com.ssafy.a208.domain.gacha.entity.MemberEmoji;
import com.ssafy.a208.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Set;

public interface MemberEmojiRepository extends JpaRepository<MemberEmoji, Long> {
    boolean existsByMemberAndEmojiAndDeletedAtIsNull(Member member, Emoji emoji);

    @Query("SELECT e.id FROM MemberEmoji me " +
            "JOIN me.emoji e " +
            "WHERE me.member = :member AND me.deletedAt IS NULL")
    Set<Long> findOwnedEmojiIdsByMember(Member member);

    @Query("SELECT me FROM MemberEmoji me " +
            "JOIN FETCH me.emoji e " +
            "JOIN FETCH e.emojiFile ef " +
            "JOIN FETCH e.category ec " +
            "WHERE me.member = :member AND me.deletedAt IS NULL " +
            "ORDER BY e.id ASC")
    List<MemberEmoji> findByMemberOrderByEmojiIdAsc(Member member);
}