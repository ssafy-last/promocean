package com.ssafy.a208.global.common.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import java.util.Arrays;

public class AllowedValuesValidator implements ConstraintValidator<AllowedValues, Integer> {

    private int[] allowedValues;

    @Override
    public void initialize(AllowedValues constraintAnnotation) {
        allowedValues = constraintAnnotation.value();
    }

    @Override
    public boolean isValid(Integer value, ConstraintValidatorContext context) {
        if (value == null) {
            return false;
        }
        return Arrays.stream(allowedValues).anyMatch(v -> v == value);
    }
}
