package com.ssafy.a208.domain.board.dto.event;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PostLikeEvent {
    private String eventId;
    private Long postId;
    private Long userId;
    private LocalDateTime timestamp;
}