import * as yup from 'yup';
import {translation} from 'utils/translate';

const t = translation('Validation');

export const loginValidationSchema = yup.object().shape({
  phoneNumber: yup.string().trim().required(t('phoneNumber.required')).length(11, t('phoneNumber.length')),
  password: yup.string().trim().required(t('password.required'))
});

export type LoginSchemaType = yup.InferType<typeof loginValidationSchema>;
