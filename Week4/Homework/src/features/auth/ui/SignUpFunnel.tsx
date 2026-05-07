import {useSignUpMutation} from '@/features/auth/model/useSignUpMutation';
import {IdStep} from '@/features/auth/ui/IdStep';
import {PasswordStep} from '@/features/auth/ui/PasswordStep';
import {ProfileStep} from '@/features/auth/ui/ProfileStep';
import {useFunnel} from '@use-funnel/react-router';

export const SignUpFunnel = () => {
  const {mutate: signUp, isPending} = useSignUpMutation();

  const funnel = useFunnel<{
    Id: {id?: string};
    Password: {id: string};
    Profile: {id: string; pw: string};
  }>({
    id: 'sign-up',
    initial: {step: 'Id', context: {}},
  });

  return (
    <funnel.Render
      Id={({history}) => (
        <IdStep onNext={(id) => history.push('Password', {id})} />
      )}
      Password={({context, history}) => (
        <PasswordStep
          onNext={(pw) => history.push('Profile', {...context, pw})}
        />
      )}
      Profile={({context}) => (
        <ProfileStep
          isLoading={isPending}
          onComplete={(profileData) => {
            const finalPayload = {
              loginId: context.id,
              password: context.pw,
              ...profileData,
            };

            signUp(finalPayload);
          }}
        />
      )}
    />
  );
};
