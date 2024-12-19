import type {ControllerProps} from 'react-hook-form';

export interface IControlCommon {
  transform?(value: any): unknown;
  messageKey?: string;
  valueKey?: string;
  children: React.ReactElement;
}

export interface IControlAutoProps extends Omit<ControllerProps<any>, 'render'>, IControlCommon {}

export interface IControlManualProps extends IControlCommon {
  error?: string;
  value?: any;
  onChange?(value: any): void;
}

export type IControlProps = IControlAutoProps | IControlManualProps;
