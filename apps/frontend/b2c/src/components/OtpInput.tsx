import { Input } from "./ui/input";

interface OtpInputProps {
  length?: number;
  value: string[];
  onChange: (value: string[]) => void;
  disabled?: boolean;
}

export function OtpInput({
  length = 6,
  value,
  onChange,
  disabled = false,
}: OtpInputProps) {
  const handleOtpChange = (index: number, inputValue: string) => {
    if (inputValue.length > 1) return;

    const newOtp = [...value];
    newOtp[index] = inputValue;
    onChange(newOtp);

    // Auto-focus next input
    if (inputValue && index < length - 1) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  return (
    <div className="flex justify-center gap-2">
      {value.map((digit, index) => (
        <Input
          key={index}
          id={`otp-${index}`}
          type="text"
          maxLength={1}
          value={digit}
          onChange={e => handleOtpChange(index, e.target.value)}
          onKeyDown={e => handleKeyDown(index, e)}
          disabled={disabled}
          className="w-12 h-12 text-center text-lg font-semibold"
          autoFocus={index === 0}
        />
      ))}
    </div>
  );
}
