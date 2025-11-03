package com.ssafy.a208.domain.space.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import java.util.regex.Pattern;

public class ColorValidator implements ConstraintValidator<Color, CharSequence> {

    private Pattern specialPattern;
    private static final int MIN = 6;
    private static final int MAX = 8;
    private static final Pattern WHITESPACE = Pattern.compile("\\s");

    @Override
    public void initialize(Color annotation) {
        String allowed = annotation.specialCharsRegex();
        this.specialPattern = Pattern.compile("^(?:" + allowed + ")+$");
    }

    @Override
    public boolean isValid(CharSequence value, ConstraintValidatorContext context) {
        if (value == null) {
            return false;
        }

        String s = value.toString();

        if (WHITESPACE.matcher(s).find()) {
            return false;
        }

        if (s.length() < MIN || s.length() > MAX) {
            return false;
        }

        return specialPattern.matcher(s).matches();
    }
}
