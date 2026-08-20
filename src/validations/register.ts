import * as yup from 'yup';
import {translation} from 'utils/translate';

const t = translation('Validation');

export const registerValidationSchema = yup.object().shape({
  phoneNumber: yup.string().length(11, t('phoneNumber.length')).required(t('phoneNumber.required')),
  referralCode: yup.string().default(null).nullable()
});

export type RegisterSchemaType = yup.InferType<typeof registerValidationSchema>;

export const registerConfirmValidationSchema = yup.object().shape({
  code: yup.string().trim().required(t('code.required'))
});

export type RegisterConfirmSchemaType = yup.InferType<typeof registerConfirmValidationSchema>;

export const registerSetPasswordValidationSchema = yup.object().shape({
  password: yup.string().trim().required(t('password.newRequired')),
  confirmPassword: yup
    .string()
    .required(t('password.confirmRequired'))
    .oneOf([yup.ref('password')], t('password.match'))
});

export type RegisterSetPasswordSchemaType = yup.InferType<typeof registerSetPasswordValidationSchema>;

export const registerRuleValidationSchema = yup.object().shape({
  acceptRules: yup.boolean().oneOf([true], t('acceptRules.required')).required(t('acceptRules.required'))
});

export type RegisterRuleSchemaType = yup.InferType<typeof registerRuleValidationSchema>;
