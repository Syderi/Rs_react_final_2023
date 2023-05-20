import { FC } from 'react';
import { useRouter } from 'next/router';
import { Auth } from '@/types/enum';
import { EMAIL_REGEXP, PASSWORD_REGEXP } from '@/utils/const';
import { IFormData } from '@/types/interface';
import { Form as AntForm, Input, Typography, Button, Avatar, Row, Col, Card } from 'antd';
import { LockOutlined, UserAddOutlined } from '@ant-design/icons';

const { Title } = Typography;

interface IFormProps {
  variantAuth: string;
  handleClick: (data: IFormData) => void;
}

const Form: FC<IFormProps> = ({ variantAuth, handleClick }) => {
  const { push } = useRouter();

  const onFinish = (data: IFormData) => {
    handleClick(data);
  };

  const handleLinkToOtherAuth = () => {
    push(`/${variantAuth === Auth.signin ? 'signup' : 'signin'}`);
  };

  return (
    <Row justify="center" align="middle" style={{ height: 'calc(100vh - 200px)' }}>
      <Col span={24}>
        <AntForm
          name="sign in"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          className="form"
        >
          <Card hoverable>
            <div className="form_title">
              <Avatar
                className="icon"
                icon={variantAuth === Auth.signin ? <LockOutlined /> : <UserAddOutlined />}
              />
              <Title level={2}>{variantAuth}</Title>
            </div>

            <AntForm.Item
              name="email"
              rules={[
                { required: true, message: 'Please enter your email!' },
                {
                  pattern: EMAIL_REGEXP,
                  message: 'Please enter a valid email address',
                },
              ]}
              wrapperCol={{ span: '100%' }}
            >
              <Input placeholder="Email" type="email" />
            </AntForm.Item>
            <AntForm.Item
              name="password"
              rules={[
                { required: true, message: 'Please enter your password!' },
                {
                  pattern: PASSWORD_REGEXP,
                  message: 'Min 8 chars (uppercase, lowercase, digit and special char)',
                },
              ]}
              wrapperCol={{ span: '100%' }}
            >
              <Input.Password placeholder="Password" />
            </AntForm.Item>
            <Row justify="center">
              <Button disabled={false} type="primary" htmlType="submit" block>
                {variantAuth}
              </Button>
            </Row>
            <Row justify="end">
              <Button disabled={false} type="link" onClick={handleLinkToOtherAuth}>
                {`${variantAuth === Auth.signin ? Auth.signup : Auth.signin}`}
              </Button>
            </Row>
          </Card>
        </AntForm>
      </Col>
    </Row>
  );
};

export default Form;
