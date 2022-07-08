import React, { useState } from 'react'
import { Button, FormControl, Stack, CircularProgress } from '@mui/material'
import ValidInput from '../../ui/ValidInput'
import { isValidEmail, isValidPassword } from '../../utils/validation'
import { invalidMailText, invalidPasswordText } from '../../ui/strings'
import { useLoginFromCreds, useRegistration } from '../../hooks/redux/useAuth'
import { useBoolean } from '../../hooks/useBoolean'
import ForgetPasswordModal from './ForgetPasswordModal'
import useEventListener from "../../hooks/useEventListener";

const AuthForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submited, setSubmited] = useState(false)
  const [showModal, setShow, setHide] = useBoolean(false)
  const [login, { isLoading: isLoginLoading, isSuccess: isLoginSuccess, isError: isLoginError }] = useLoginFromCreds()
  const [register, { isLoading: isRegLoading, isSuccess: isRegSuccess, isError: isRegError }] = useRegistration()

  useEventListener('keypress', ev => {
    if (ev.key === 'Enter') {
      login({email, password})
    }
  })

  const submit = (isRegister: boolean) => {
    setSubmited(true)
    setPassword('')
    if (isValidEmail(email) && isValidPassword(password)) {
      if (isRegister) {
        register({ email, password })
      } else {
        login({ email, password })
      }
    }
  }

  if ((isLoginError || isRegError) && submited) { setSubmited(false) }
  if (isRegLoading || isRegSuccess) { return <CircularProgress /> }
  if (isLoginLoading || isLoginSuccess) { return <CircularProgress /> }

  return (
    <>
      <ForgetPasswordModal show={showModal} onClose={setHide} />
      <FormControl>
        <Stack spacing={2}>
          <ValidInput
            label='Email'
            value={email}
            bindChange={setEmail}
            valid={isValidEmail}
            invalidText={invalidMailText}
            showError={submited}
          />
          <ValidInput
            label='Password'
            type='password'
            value={password}
            bindChange={setPassword}
            valid={isValidPassword}
            invalidText={invalidPasswordText}
            showError={submited}
          />
          <Stack spacing={2} direction='row' justifyContent='space-between'>
            <Button variant='outlined' onClick={() => submit(false)}>Вход</Button>
            <Button variant='outlined' onClick={() => submit(true)}>Регистрация</Button>
          </Stack>
        </Stack>
        <Button
          sx={{ mt: 1 }}
          size='small'
          variant='text'
          onClick={setShow}
        >
          Забыли пароль?
        </Button>
      </FormControl>
    </>
  )
}

export default AuthForm
