module.exports = {
  root: true, // 이 파일을 루트 설정으로 설정
  extends: [
    "eslint:recommended", // ESLint의 기본 권장 규칙
    "plugin:@typescript-eslint/recommended", // TypeScript 관련 규칙
    "next/core-web-vitals", // Next.js 기본 규칙
  ],
  parser: "@typescript-eslint/parser", // TypeScript 코드 파서를 사용
  parserOptions: {
    ecmaVersion: 2020, // 최신 ECMAScript 문법을 사용
    sourceType: "module", // 모듈 시스템 사용
    ecmaFeatures: {
      jsx: true, // JSX 문법을 지원
    },
  },
  plugins: ["@typescript-eslint"], // TypeScript 플러그인 사용
  rules: {
    "@typescript-eslint/no-unused-vars": ["warn"],
    "@typescript-eslint/no-explicit-any": "off",
  },
};
