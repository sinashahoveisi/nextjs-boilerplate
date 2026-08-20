import * as yup from 'yup';
import {translation} from 'utils/translate';

const t = translation('Validation');

export const forgetValidationSchema = yup.object().shape({
  phoneNumber: yup.string().length(11, t('phoneNumber.length')).required(t('phoneNumber.required'))
});

export type ForgetSchemaType = yup.InferType<typeof forgetValidationSchema>;

export const forgetConfirmValidationSchema = yup.object().shape({
  code: yup.string().trim().required(t('code.required'))
});

export type ForgetConfirmSchemaType = yup.InferType<typeof forgetConfirmValidationSchema>;

export const forgetSetPasswordValidationSchema = yup.object().shape({
  password: yup.string().trim().required(t('password.newRequired')),
  confirmPassword: yup
    .string()
    .required(t('password.confirmRequired'))
    .oneOf([yup.ref('password')], t('password.match'))
});

export type ForgetSetPasswordSchemaType = yup.InferType<typeof forgetSetPasswordValidationSchema>;
