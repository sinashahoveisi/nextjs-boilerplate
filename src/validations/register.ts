import * as yup from 'yup';

export const registerValidationSchema = yup.object().shape({
  phoneNumber: yup.string().length(11, 'شماره تماس باید ۱۱ رقم باشد').required('شماره تماس الزامی است'),
  referralCode: yup.string().default(null).nullable()
});

export type RegisterSchemaType = yup.InferType<typeof registerValidationSchema>;

export const registerConfirmValidationSchema = yup.object().shape({
  code: yup.string().trim().required('لطفا رمزعبور جدید را وارد کنید')
});

export type RegisterConfirmSchemaType = yup.InferType<typeof registerConfirmValidationSchema>;

export const registerSetPasswordValidationSchema = yup.object().shape({
  password: yup.string().trim().required('لطفا رمزعبور جدید را وارد کنید'),
  confirmPassword: yup
    .string()
    .required('لطفا تکرار رمزعبور جدید را وارد کنید')
    .oneOf([yup.ref('password')], 'رمزعبور با تکرار آن باید برابر باشد')
});

export type RegisterSetPasswordSchemaType = yup.InferType<typeof registerSetPasswordValidationSchema>;

export const registerRuleValidationSchema = yup.object().shape({
  acceptRules: yup.boolean().oneOf([true], 'لطفا قوانین را تایید کنید').required('لطفا قوانین را تایید کنید')
});

export type RegisterRuleSchemaType = yup.InferType<typeof registerRuleValidationSchema>;
