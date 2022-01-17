import React, { useState, useRef } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { ToastContainer, toast } from 'react-toastify'
import * as yup from 'yup'
import cn from 'classnames'
import styles from './index.module.scss'
import * as Icons from 'heroicons-react'
import ReCAPTCHA from 'react-google-recaptcha'

import Text from '../text'
import Button from '../button'
import Api from '../../api'
import CryptoJS from 'crypto-js'

function ErrorMsg({ messages = [] }) {
  return (
    <div className={styles.error}>
      <Text className={styles.errorHead} tag="h5" theme="regular">
        Oops!
      </Text>
      {messages && (
        <ul>
          {messages.map((item, index) => (
            <li key={index}>
              <Text tag="p" theme="small">
                {`* ${item}`}
              </Text>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export const FORM_TYPES = {
  FREE: 'FREE',
  PRO: 'PRO'
}

const schema = yup.object().shape({
  name: yup
    .string()
    .matches(/^.[a-zA-ZıİçÇşŞğĞÜüÖö ]+$/, {
      message: 'Your name can only contain alphabetic characters'
    })
    .required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required()
})

export function TextInput({
  label,
  name,
  register,
  className,
  placeholder,
  errors,
  type = 'text',
  ...props
}) {
  return (
    <div className={cn(styles.input, className)}>
      <label htmlFor={name}>{label}</label>
      <input
        type="text"
        name={name}
        id={name}
        placeholder={placeholder}
        ref={register}
        className={cn({ error: errors })}
        type={type}
        {...props}
      />
      {errors && (
        <Text tag="span" theme="small">
          {errors.message}
        </Text>
      )}
    </div>
  )
}

export default function Form({ formType = FORM_TYPES.FREE }) {
  const router = useRouter()
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema)
  })

  const captchaRef = useRef(null)

  React.useEffect(() => {
    Paddle.Setup({ vendor: 121559 })
  }, [])

  const paid = ({
    email,
    successCallback = () => {},
    closeCallback = () => {}
  }) => {
    const Paddle = window.Paddle
    Paddle.Checkout.open({
      product: 751714,
      email,
      successCallback,
      closeCallback
    })
  }

  const registerAPI = ({ name, email, password, g_captcha_value }) => {
    return Api.post(`/auth/signup`, {
      name,
      email,
      g_captcha_value,
      master_password: CryptoJS.SHA256(password).toString()
    })
      .then((data) => Promise.resolve(data))
      .catch((err) => {
        if (err.response.status === 400) {
          console.log(err.response.data.errors)
          toast(<ErrorMsg messages={err.response.data.errors} />)
        } else {
          console.error(err)
          toast(<ErrorMsg messages={['Server Error']} />)
        }
        return Promise.reject(err)
      })
  }

  const onSubmit = async ({ name, email, password }) => {
    const g_captcha_value = await captchaRef.current.executeAsync()
    registerAPI({ name, email, password, g_captcha_value })
      .then(() => {
        if (formType === FORM_TYPES.PRO) {
          return paid({
            email,
            successCallback: () => router.push('/thankyou'),
            closeCallback: (reason) => console.warn(reason)
          })
        } else {
          router.push('/thankyou')
        }
      })
      .catch((err) => console.error(err))
      .finally(() => captchaRef.current.reset())
  }

  return (
    <>
      <ToastContainer hideProgressBar />
      <form
        className={styles.Form}
        onSubmit={handleSubmit(onSubmit)}
        method="POST"
      >
        <Icons.ArrowLeft onClick={() => router.push('/')} />
        <Text tag="h3" theme="heromd" fancy={formType === FORM_TYPES.PRO}>
          {formType === FORM_TYPES.PRO
            ? 'Create a PRO account'
            : 'Create a free account'}
        </Text>
        <TextInput
          label="Full Name"
          name="name"
          placeholder="John Doe"
          register={register()}
          errors={errors.name}
        />
        <TextInput
          label="E-Mail"
          name="email"
          placeholder="hello@passwall.io"
          type="email"
          register={register()}
          errors={errors.email}
        />
        <TextInput
          label="Master Password"
          name="password"
          type="password"
          register={register()}
          errors={errors.password}
        />
        <TextInput
          label="Master Password Verify"
          name="passwordConfirm"
          type="password"
          register={register()}
          errors={errors.passwordConfirm}
        />

        <ReCAPTCHA
          ref={captchaRef}
          sitekey="6LcbOP0UAAAAAK1Zc6jNtrIF34pMBNPGaDaz3VpY"
          size="invisible"
        />

        <Button type="submit" value="Submit">
          <Text tag="p" theme="regular" className={styles.btn}>
            {formType === FORM_TYPES.PRO
              ? 'Continue to Payment'
              : 'Create My Account'}
          </Text>
        </Button>
      </form>
    </>
  )
}
