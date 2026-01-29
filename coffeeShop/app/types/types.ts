export interface AppButtonProps {
  title: string;
  onPress: () => void;
}

export interface AuthInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  error?: boolean;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address" | "numeric";
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  className?: string;
}

export interface AuthButtonProps {
  title: string;
  onPress: () => void;
  className?: string; // optional to allow extra Tailwind styles
}
