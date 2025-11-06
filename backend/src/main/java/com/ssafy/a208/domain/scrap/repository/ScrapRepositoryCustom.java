package com.ssafy.a208.domain.scrap.repository;

import com.ssafy.a208.domain.member.entity.Member;
import com.ssafy.a208.domain.scrap.dto.ScrapQueryDto;
import com.ssafy.a208.domain.scrap.entity.Scrap;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * 스크랩 Repository Custom 인터페이스
 * QueryDSL을 사용한 동적 쿼리 메서드 정의
 */
public interface ScrapRepositoryCustom {

    /**
     * 회원의 스크랩 목록을 동적 조건으로 조회
     *
     * @param member 회원
     * @param query 검색 조건
     * @param pageable 페이징 정보
     * @return 스크랩 페이지
     */
    Page<Scrap> findScrapsByMemberWithFilters(Member member, ScrapQueryDto query, Pageable pageable);
}