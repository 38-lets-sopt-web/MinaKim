import {useState, type ChangeEvent} from 'react';
import {Input} from '@/shared/ui/Input';
import {Button} from '@/shared/ui/Button';
import {Dropdown} from '@/shared/ui/Dropdown';
import {SignUpRequestSchema, type PartType} from '@/shared/api/schema';
import {PART_OPTIONS} from '@/shared/constants/part';

interface ProfileData {
  name: string;
  email: string;
  age: number | '';
  part: PartType | '';
}

export const ProfileStep = ({
  onComplete,
  isLoading,
}: {
  onComplete: (data: {
    name: string;
    email: string;
    age: number;
    part: PartType;
  }) => void;
  isLoading?: boolean;
}) => {
  const [form, setForm] = useState<ProfileData>({
    name: '',
    email: '',
    age: '',
    part: '',
  });

  const [errors, setErrors] = useState<{
    [K in keyof ProfileData]?: string;
  }>({});

  const validateField = (
    name: keyof typeof SignUpRequestSchema.shape,
    value: string | number
  ) => {
    const fieldSchema = SignUpRequestSchema.shape[name];

    const result = fieldSchema.safeParse(value);

    setErrors((prev) => ({
      ...prev,
      [name]: result.success ? undefined : result.error.issues[0].message,
    }));
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const {name, value, type} = e.target;
    const key = name as keyof ProfileData;

    const processedValue =
      type === 'number' ? (value === '' ? '' : Number(value)) : value;

    setForm((prev) => ({...prev, [key]: processedValue}));

    if (key in SignUpRequestSchema.shape) {
      validateField(
        key as keyof typeof SignUpRequestSchema.shape,
        processedValue as string | number
      );
    }
  };

  const isValid =
    form.name &&
    form.email &&
    form.age !== '' &&
    form.part !== '' &&
    !Object.values(errors).some(Boolean);

  const handleComplete = () => {
    if (isValid && form.age !== '' && form.part !== '') {
      onComplete({
        name: form.name,
        email: form.email,
        age: form.age,
        part: form.part,
      });
    }
  };

  return (
    <div className='flex flex-col gap-5'>
      <Input
        label='이름'
        name='name'
        value={form.name}
        onChange={handleChange}
        error={errors.name}
        placeholder='이름을 입력해주세요'
      />
      <Input
        label='이메일'
        name='email'
        type='email'
        value={form.email}
        onChange={handleChange}
        error={errors.email}
        placeholder='이메일을 입력해주세요'
      />
      <Input
        label='나이'
        name='age'
        type='number'
        value={form.age}
        onChange={handleChange}
        error={errors.age}
        placeholder='나이를 입력해주세요'
      />

      <Dropdown
        label='파트'
        name='part'
        value={form.part}
        options={PART_OPTIONS}
        onChange={handleChange}
        error={errors.part}
      />

      <Button
        text={isLoading ? '가입 중...' : '회원가입'}
        disabled={!isValid || isLoading}
        onClick={handleComplete}
        backgroundColor={isValid ? 'bg-primary-400' : 'bg-neutral-200'}
        textColor='text-neutral-100'
      />
    </div>
  );
};
