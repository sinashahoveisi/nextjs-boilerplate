export interface IUseToggle {
  isOn: boolean;
  reset(): void;
  setOn(): void;
  setOff(): void;
  toggle(): void;
  set: React.Dispatch<React.SetStateAction<boolean>>;
}
