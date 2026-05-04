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
  loginId: z
    .string()
    .min(4, {message: '아이디는 4글자 이상이어야 합니다.'})
    .max(20, {message: '아이디는 20글자 이하이어야 합니다.'}),
  password: z
    .string()
    .min(8, {message: '비밀번호는 8글자 이상이어야 합니다.'})
    .max(20, {message: '비밀번호는 20글자 이하이어야 합니다.'}),
  name: z
    .string()
    .min(1, {message: '이름을 입력해 주세요.'})
    .max(10, {message: '이름은 10글자 이하이어야 합니다.'}),
  email: z.string().email({message: '올바른 이메일 형식이 아닙니다.'}),
  age: z
    .number()
    .int()
    .min(1)
    .max(150, {message: '유효한 나이를 입력해 주세요.'}),
  part: z.string().min(1, {message: '파트를 선택해 주세요.'}),
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
