package com.ssafy.a208.domain.space.repository;

import com.ssafy.a208.domain.space.entity.Folder;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FolderRepository extends JpaRepository<Folder, Long> {

    List<Folder> findBySpaceIdAndDeletedAtIsNull(Long spaceId);
}