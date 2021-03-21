import React, { useState, useRef } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { ToastContainer, toast } from 'react-toastify'
import * as yup from 'yup'
import cn from 'classnames'
import styles from './index.module.scss'
import * as Icons from 'heroicons-react'
import Text from '../text'
import Button from '../button'

const schema = yup.object().shape({
  email: yup.string().email().required()
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

export default function UpgradeForm() {
  const router = useRouter()
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema)
  })

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
      product: 630862,
      email,
      successCallback,
      closeCallback
    })
  }

  const onSubmit = async ({ email }) => {
    return paid({
      email,
      successCallback: () => router.push('/thankyou'),
      closeCallback: (reason) => console.warn(reason)
    })
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
        <Text tag="h3" theme="heromd" fancy={true}>
          Upgrade to PRO account
        </Text>
        <TextInput
          label="E-Mail"
          name="email"
          placeholder="hello@passwall.io"
          type="email"
          register={register()}
          errors={errors.email}
        />
        <Button type="submit" value="Submit">
          <Text tag="p" theme="regular" className={styles.btn}>
            Continue to Payment
          </Text>
        </Button>
      </form>
    </>
  )
}
