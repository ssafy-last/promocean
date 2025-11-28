package com.ssafy.a208.domain.gacha.reader;

import com.ssafy.a208.domain.gacha.entity.Emoji;
import com.ssafy.a208.domain.gacha.entity.MemberEmoji;
import com.ssafy.a208.domain.gacha.repository.MemberEmojiRepository;
import com.ssafy.a208.domain.member.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class MemberEmojiReader {

    private final MemberEmojiRepository memberEmojiRepository;

    public boolean hasEmoji(Member member, Emoji emoji) {
        return memberEmojiRepository.existsByMemberAndEmojiAndDeletedAtIsNull(member, emoji);
    }

    public Set<Long> getOwnedEmojiIdsByMember(Member member) {
        return memberEmojiRepository.findByMemberAndDeletedAtIsNull(member).stream()
                .map(me -> me.getEmoji().getId())
                .collect(Collectors.toSet());
    }

    public List<MemberEmoji> getMemberEmojisByMember(Member member) {
        return memberEmojiRepository.findByMemberAndDeletedAtIsNullOrderByObtainedAtDesc(member);
    }
}