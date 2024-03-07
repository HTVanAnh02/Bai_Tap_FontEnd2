import { useField, useForm } from 'vee-validate';
import { AuthStore } from '@/store/auth/authStore';
import { showSuccessNotification, showWarningsNotification } from '@/common/helper/helpers';
import { Loading } from '@/store/loading';
import { registerWithPasswordSchema } from '../Login/schema';
import { computed } from 'vue';
export const userRegisterForm = () => {
  const loading = Loading();
  const authStore = AuthStore();
  const {
    handleSubmit,
    values: formValue,
    setValues,
    validate,
    meta,
  } = useForm({
    validationSchema: registerWithPasswordSchema,
  });

  const {
    value: email,
    setValue: setEmail,
    errorMessage: emailError,
  } = useField('email');
  
  const {
    value: password,
    setValue: setPassword,
    errorMessage: passwordError,
  } = useField('password');

  const {
    value: confirmPassword,
    setValue: setConfirmPassword,
    errorMessage: confirmPasswordError,
  } = useField('confirmPassword');

  const handleRegister = handleSubmit(async (values) => {
    loading.setLoading(true)
    const res = await authStore.register({
      email: values.email,
      password: values.password,
    });
    loading.setLoading(false)
    if(res)
    {
        showSuccessNotification("Đăng ký thành công")
    }
    else
    {
      showWarningsNotification("Đăng ký thất bại. Vui lòng thử lại");
    }
  });
  const isValidForm = computed(() => meta.value.valid);
  return {
    handleRegister,
    formValue,
    validate,
    isValidForm,
    setValues,
    email,
    setEmail,
    emailError,
    password,
    setPassword,
    passwordError,
    confirmPassword,
    setConfirmPassword,
    confirmPasswordError,
  };
};
