export interface IErrorPage {
  code?: number;
  title?: string;
  description?: string;
  className?: string;
  resetText?: string;
  onReset?(): void;
}
