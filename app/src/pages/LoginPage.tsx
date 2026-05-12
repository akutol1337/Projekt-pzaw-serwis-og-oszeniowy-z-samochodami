import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Car, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { login } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!email.trim()) newErrors.email = 'Podaj adres email';
    else if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = 'Nieprawidlowy adres email';
    if (!password) newErrors.password = 'Podaj haslo';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const response = await fetch('http://127.0.0.1:8000/api/konta/logowanie/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });

      const data = await response.json();

      if (response.ok) {
        //Django potwierdzilo  dane
        login(email, password);
        addToast('Zalogowano pomyślnie!', 'success');
        navigate('/');
      } else {
        //Django odrzucilo danew
        addToast(data.blad || 'Nieprawidłowy email lub hasło', 'error');
      }
    } catch (error) {
      //Eslint
      console.error("Błąd podczas komunikacji z API:", error);
      addToast('Błąd połączenia z serwerem. Upewnij się, że Django działa.', 'error');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-md mx-auto px-4 py-12"
    >
      <div className="text-center mb-8">
        <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
          <Car className="w-7 h-7 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Zaloguj sie</h1>
        <p className="text-sm text-gray-500 mt-1">
          Wprowadz dane logowania, aby uzyskac dostep do konta
        </p>
      </div>

      <div className="bg-white rounded-xl border p-6 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="jan@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={errors.email ? 'border-red-500' : ''}
            />
            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
          </div>

          <div>
            <Label htmlFor="password">Haslo</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Wpisz haslo"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={errors.password ? 'border-red-500 pr-10' : 'pr-10'}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
          </div>

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
            Zaloguj sie
          </Button>
        </form>

        <div className="mt-4 p-3 bg-blue-50 rounded-lg text-xs text-blue-700 text-center">
          <p className="font-medium"></p>
          <p>Połączenie zabezpieczone przez Django</p>
        </div>
      </div>

      <p className="text-center text-sm text-gray-500 mt-4">
        Nie masz konta?{' '}
        <Link to="/rejestracja" className="text-blue-600 hover:underline font-medium">
          Zarejestruj sie
        </Link>
      </p>
    </motion.div>
  );
}
