import Footer from '@/components/Footer';
import {
  AlipayCircleOutlined,
  LockOutlined,
  TaobaoCircleOutlined,
  UserOutlined,
  WeiboCircleOutlined,
} from '@ant-design/icons';
import { LoginForm, ProFormText } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Helmet, history, useModel } from '@umijs/max';
import { Alert, message, Tabs } from 'antd';
import React, { useState } from 'react';
import { flushSync } from 'react-dom';
import Settings from '../../../../config/defaultSettings';
import { Link } from 'umi';
import { getLoginUserUsingGet, userLoginUsingPost } from '@/services/bengbi/userController';

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => {
  return (
    <Alert
      style={{
        marginBottom: 24,
      }}
      message={content}
      type="error"
      showIcon
    />
  );
};
const Login: React.FC = () => {
  const [userLoginState] = useState<API.LoginResult>({});
  const [type, setType] = useState<string>('account');
  const { setInitialState } = useModel('@@initialState');
  const containerClassName = useEmotionCss(() => {
    return {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    };
  });
  const fetchUserInfo = async () => {
    const userInfo = await getLoginUserUsingGet();
    if (userInfo) {
      flushSync(() => {
        setInitialState((s) => ({
          ...s,
          currentUser: userInfo,
        }));
      });
    }
  };
  const handleSubmit = async (values: API.UserLoginRequest) => {
    try {
      // 登录
      const res = await userLoginUsingPost(values);
      if (res.code === 0) {
        const defaultLoginSuccessMessage = '登录成功！';
        message.success(defaultLoginSuccessMessage);
        await fetchUserInfo();
        const urlParams = new URL(window.location.href).searchParams;
        history.push(urlParams.get('redirect') || '/');
        return;
      } else {
        message.error(res.message);
      }
    } catch (error) {
      const defaultLoginFailureMessage = '登录失败，请重试！';
      console.log(error);
      message.error(defaultLoginFailureMessage);
    }
  };
  const { status, type: loginType } = userLoginState;
  return (
    <div className={containerClassName}>
      <Helmet>
        <title>
          {'登录'}- {Settings.title}
        </title>
      </Helmet>
      {/*<Lang />*/}
      <div
        style={{
          flex: '1',
          padding: '32px 0',
        }}
      >
        <LoginForm
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          logo={<img alt="logo" src="/logo.svg" />}
          title="XiaoBeng BI"
          subTitle={'XiaoBeng BI 为简约而生'}
          // initialValues={{
          //   autoLogin: true,
          // }}
          // 自动登录
          // actions={['其他登录方式 :', <ActionIcons key="icons" />]}
          onFinish={async (values) => {
            await handleSubmit(values as API.UserLoginRequest);
          }}
        >
          <Tabs
            activeKey={type}
            onChange={setType}
            centered
            items={[
              {
                key: 'account',
                label: '账户密码登录',
              },
              // {
              //   key: 'mobile',
              //   label: '手机号登录',
              // },
            ]}
          />

          {status === 'error' && loginType === 'account' && (
            <LoginMessage content={'错误的用户名和密码(admin/ant.design)'} />
          )}
          {type === 'account' && (
            <>
              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined />,
                }}
                placeholder={'请输入用户名'}
                rules={[
                  {
                    required: true,
                    message: '用户名是必填项！',
                  },
                ]}
              />
              <ProFormText.Password
                name="userPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder={'请输入密码'}
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                ]}
              />
            </>
          )}

          {/*{status === 'error' && loginType === 'mobile' && <LoginMessage content="验证码错误" />}*/}
          {/*{type === 'mobile' && (*/}
          {/*  <>*/}
          {/*    <ProFormText*/}
          {/*      fieldProps={{*/}
          {/*        size: 'large',*/}
          {/*        prefix: <MobileOutlined />,*/}
          {/*      }}*/}
          {/*      name="mobile"*/}
          {/*      placeholder={'请输入手机号！'}*/}
          {/*      rules={[*/}
          {/*        {*/}
          {/*          required: true,*/}
          {/*          message: '手机号是必填项！',*/}
          {/*        },*/}
          {/*        {*/}
          {/*          pattern: /^1\d{10}$/,*/}
          {/*          message: '不合法的手机号！',*/}
          {/*        },*/}
          {/*      ]}*/}
          {/*    />*/}
          {/*    <ProFormCaptcha*/}
          {/*      fieldProps={{*/}
          {/*        size: 'large',*/}
          {/*        prefix: <LockOutlined />,*/}
          {/*      }}*/}
          {/*      captchaProps={{*/}
          {/*        size: 'large',*/}
          {/*      }}*/}
          {/*      placeholder={'请输入验证码！'}*/}
          {/*      captchaTextRender={(timing, count) => {*/}
          {/*        if (timing) {*/}
          {/*          return `${count} ${'秒后重新获取'}`;*/}
          {/*        }*/}
          {/*        return '获取验证码';*/}
          {/*      }}*/}
          {/*      name="captcha"*/}
          {/*      rules={[*/}
          {/*        {*/}
          {/*          required: true,*/}
          {/*          message: '验证码是必填项！',*/}
          {/*        },*/}
          {/*      ]}*/}
          {/*      onGetCaptcha={async (phone) => {*/}
          {/*        const result = await getFakeCaptcha({*/}
          {/*          phone,*/}
          {/*        });*/}
          {/*        if (!result) {*/}
          {/*          return;*/}
          {/*        }*/}
          {/*        message.success('获取验证码成功！验证码为：1234');*/}
          {/*      }}*/}
          {/*    />*/}
          {/*  </>*/}
          {/*)}*/}
          <div
            style={{
              marginBottom: 24,
            }}
          >
            {/*<ProFormCheckbox noStyle name="autoLogin">*/}
            {/*  自动登录*/}
            {/*</ProFormCheckbox>*/}
            <Link to="/user/right">注册</Link>
          </div>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};
export default Login;
