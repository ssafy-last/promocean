package com.ssafy.a208.domain.board.dto.validator;

import com.ssafy.a208.domain.board.dto.PostUpdateReq;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import java.util.Objects;

/**
 * 게시글 수정 요청 유효성 검증기
 * 텍스트 프롬프트는 예시 질문/답변 필수
 */
public class PostUpdateReqValidator implements ConstraintValidator<ValidPostUpdateRequest, PostUpdateReq> {

    @Override
    public boolean isValid(PostUpdateReq req, ConstraintValidatorContext context) {
        if (req == null || req.promptType() == null) {
            return true;
        }

        context.disableDefaultConstraintViolation();
        boolean isValid = true;

        // 텍스트 프롬프트(1)인 경우 sampleQuestion, sampleAnswer 필수
        if (req.promptType() == 1) {
            if (Objects.isNull(req.sampleQuestion()) || req.sampleQuestion().isBlank()) {
                context.buildConstraintViolationWithTemplate("텍스트 프롬프트는 예시 질문이 필수입니다")
                        .addPropertyNode("sampleQuestion")
                        .addConstraintViolation();
                isValid = false;
            }

            if (Objects.isNull(req.sampleAnswer()) || req.sampleAnswer().isBlank()) {
                context.buildConstraintViolationWithTemplate("텍스트 프롬프트는 예시 답변이 필수입니다")
                        .addPropertyNode("sampleAnswer")
                        .addConstraintViolation();
                isValid = false;
            }
        }

        return isValid;
    }
}