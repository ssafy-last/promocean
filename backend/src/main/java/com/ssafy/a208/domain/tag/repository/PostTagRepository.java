package com.ssafy.a208.domain.tag.repository;

import com.ssafy.a208.domain.tag.entity.PostTag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostTagRepository extends JpaRepository<PostTag, Long> {

}
