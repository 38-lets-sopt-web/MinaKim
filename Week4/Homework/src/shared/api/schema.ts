import {z} from 'zod';

/**
 * 공통 응답
 */
export const ApiResponseSchema = z.object({
  success: z.boolean(),
  status: z.number(),
  message: z.string(),
  code: z.string(),
  data: z.any().optional(),
  meta: z
    .object({
      path: z.string(),
      timestamp: z.string(),
    })
    .optional(),
});

/**
 * 회원가입 요청
 */
export const SignUpRequestSchema = z.object({
  loginId: z.string().min(4).max(20),
  password: z.string().min(8).max(20),
  name: z.string().min(1).max(10),
  email: z.string().email(),
  age: z.number().int().min(1).max(150),
  part: z.string(),
});

/**
 * 로그인 요청
 */
export const SignInRequestSchema = z.object({
  loginId: z.string(),
  password: z.string(),
});

/**
 * 유저 정보 업데이트
 */
export const UserUpdateRequestSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  age: z.number().int().optional(),
});

/**
 * 타입 추출
 */
export type SignUpRequest = z.infer<typeof SignUpRequestSchema>;
export type SignInRequest = z.infer<typeof SignInRequestSchema>;
export type UserUpdateRequest = z.infer<typeof UserUpdateRequestSchema>;
export type ApiResponse = z.infer<typeof ApiResponseSchema>;
