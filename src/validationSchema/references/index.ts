import * as yup from 'yup';

export const referenceValidationSchema = yup.object().shape({
  site_url: yup.string().required(),
  user_id: yup.string().nullable(),
});
