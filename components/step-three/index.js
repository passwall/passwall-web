import React, { useState, useContext, useRef } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { ToastContainer, toast } from 'react-toastify'
import * as yup from 'yup'
import cn from 'classnames'
import styles from './index.module.scss'
import * as Icons from 'heroicons-react'
import { FORM_TYPES } from '../step-one'

import Text from '../text'
import Button from '../button'
import Api from '../../api'
import CryptoJS from 'crypto-js'
import AppContext from '../../store/form-type'

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

const schema = yup.object().shape({
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

export default function Form() {
  const router = useRouter()
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema)
  })

  const store = useContext(AppContext);
  let formType = store.formTypem

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

  const registerAPI = ({ name, email, password }) => {
    return Api.post(`/auth/signup`, {
      name,
      email,
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

  const onSubmit = async ({ password }) => {
    let name = localStorage.getItem("name")
    let email = localStorage.getItem("email")
    registerAPI({ name, email, password })
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
  }

  return (
    <>
      <ToastContainer hideProgressBar />
      <form
        className={styles.Form}
        onSubmit={handleSubmit(onSubmit)}
        method="POST"
      >
        <Icons.ArrowLeft onClick={() => router.push('/step-two')} />
        <Text tag="h3" theme="heromd" fancy={formType === FORM_TYPES.PRO}>
          {'Set master password'}
        </Text>
        <Text tag="p" theme="medium">
          You can't change your master password later and we do not store your master password anywhere. 
          Please keep it secret and do not forget.
        </Text>
        <br></br>
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