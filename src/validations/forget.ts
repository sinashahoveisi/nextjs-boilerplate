import * as yup from 'yup';

export const forgetValidationSchema = yup.object().shape({
  phoneNumber: yup.string().length(11, 'شماره تماس باید ۱۱ رقم باشد').required('شماره تماس الزامی است')
});

export type ForgetSchemaType = yup.InferType<typeof forgetValidationSchema>;

export const forgetConfirmValidationSchema = yup.object().shape({
  code: yup.string().trim().required('لطفا رمزعبور جدید را وارد کنید')
});

export type ForgetConfirmSchemaType = yup.InferType<typeof forgetConfirmValidationSchema>;

export const forgetSetPasswordValidationSchema = yup.object().shape({
  password: yup.string().trim().required('لطفا رمزعبور جدید را وارد کنید'),
  confirmPassword: yup
    .string()
    .required('لطفا تکرار رمزعبور جدید را وارد کنید')
    .oneOf([yup.ref('password')], 'رمزعبور با تکرار آن باید برابر باشد')
});

export type ForgetSetPasswordSchemaType = yup.InferType<typeof forgetSetPasswordValidationSchema>;
