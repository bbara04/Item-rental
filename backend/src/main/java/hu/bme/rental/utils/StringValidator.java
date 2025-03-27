package hu.bme.rental.utils;

import org.apache.commons.lang3.StringUtils;
import jakarta.annotation.Nonnull;

public class StringValidator {
    public static boolean isValidEmail(final @Nonnull String email) {
        if (StringUtils.isBlank(email)) {
            return false;
        }
        return email.matches("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$");
    }
}
