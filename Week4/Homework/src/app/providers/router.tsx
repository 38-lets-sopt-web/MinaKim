import LoginPage from '@/pages/login/ui/Page';
import MemberDetailPage from '@/pages/member-detail/ui/Page';
import MemberListPage from '@/pages/member-list/ui/Page';
import MyPageLayout from '@/pages/my-page-layout/ui/Page';
import MyPage from '@/pages/my-page/ui/Page';
import SignUpPage from '@/pages/sign-up/ui/Page';
import {createBrowserRouter} from 'react-router';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/signup',
    element: <SignUpPage />,
  },
  {
    path: '/mypage',
    element: <MyPageLayout />,
    children: [
      {
        index: true,
        element: <MyPage />,
      },
      {
        path: 'members',
        children: [
          {
            index: true,
            element: <MemberListPage />,
          },
          {
            path: ':id',
            element: <MemberDetailPage />,
          },
        ],
      },
    ],
  },
]);
