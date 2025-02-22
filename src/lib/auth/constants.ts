export const AUTH_CONFIG = {
  RATE_LIMIT: {
    MAX_ATTEMPTS: 5,
    WINDOW_MINUTES: 15
  },
  PASSWORD_RULES: {
    MIN_LENGTH: 8,
    REQUIRE_UPPERCASE: true,
    REQUIRE_LOWERCASE: true,
    REQUIRE_NUMBER: true,
    REQUIRE_SPECIAL: true
  }
} as const;