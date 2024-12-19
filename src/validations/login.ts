import * as yup from 'yup';

export const loginValidationSchema = yup.object().shape({
  phoneNumber: yup.string().trim().length(11, 'شماره تماس باید ۱۱ رقم باشد').required('شماره تماس الزامی است'),
  password: yup.string().trim().required('لطفا رمزعبور خود را وارد کنید')
});

export type LoginSchemaType = yup.InferType<typeof loginValidationSchema>;
