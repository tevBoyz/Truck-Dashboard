import PaymentScreen from '@/components/PaymentScreen';

interface PaymentProps {
  onComplete: () => void;
}

const Payment = ({ onComplete }: PaymentProps) => {
  return <PaymentScreen onComplete={onComplete} />;
};

export default Payment;
