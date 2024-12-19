export interface ITextInput extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  type?: 'text' | 'search' | 'number' | 'password' | 'email' | 'tel' | 'date';
  className?: string;
  containerClassName?: string;
  inputClassName?: string;
  rightClassName?: string;
  leftClassName?: string;
  loading?: boolean;
  error?: any;
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
  required?: boolean;
  showErrorMessage?: boolean;
}
