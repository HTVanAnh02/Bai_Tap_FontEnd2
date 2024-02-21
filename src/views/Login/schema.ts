import {Regex} from '@/common/contant/contants';
import {FORM_VALIDATION} from '@/common/contant/contants'
import {MESSAGE_ERROR} from '@/common/contant/contants'
import * as yup from 'yup';

const emailSchema=yup.string().required(MESSAGE_ERROR.REQUIRE).matches(Regex.EMAIL,MESSAGE_ERROR.REGEX_EMAIL);
const passwordSchema=yup.string().required(MESSAGE_ERROR.REQUIRE).min(FORM_VALIDATION.passwordMinLength,MESSAGE_ERROR.MINLEGHT_PASSWORD).max(FORM_VALIDATION.textMaxLength,MESSAGE_ERROR.MAXLEGHT_PASSWORD)


export const loginWithPasswordSchema = yup.object({
    email: emailSchema,
    password: passwordSchema.matches(Regex.PASSWORD,MESSAGE_ERROR.REGEX_PASSWORD),
});