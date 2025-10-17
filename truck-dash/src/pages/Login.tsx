import LoginForm from '@/components/LoginForm';

interface LoginProps {
  onLogin: () => void;
}

const Login = ({ onLogin }: LoginProps) => {
  return <LoginForm onLogin={onLogin} />;
};

export default Login;
