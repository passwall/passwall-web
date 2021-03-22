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
import Api from '../../api'

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
  FREE: 'free',
  PRO: 'pro'
}

const schema = yup.object().shape({
  name: yup
    .string()
    .matches(/^.[a-zA-ZıİçÇşŞğĞÜüÖö ]+$/, {
      message: 'Your name can only contain alphabetic characters'
    })
    .required(),
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

export default function Form({ formType = FORM_TYPES.FREE }) {
  const router = useRouter()
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema)
  })  

  localStorage.setItem("formType", formType)
  
  const createCodeAPI = ({ name, email }) => {
    return Api.post(`/auth/code`, {
      name,
      email
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

  const onSubmit = async ({ name, email }) => {
    localStorage.setItem("name", name)
    localStorage.setItem("email", email)
    createCodeAPI({ name, email })
      .then(() => {
        router.push('/step-two')
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
        <Button type="submit" value="Submit">
          <Text tag="p" theme="regular" className={styles.btn}>
            {'Continue to Verify Email'}
          </Text>
        </Button>
      </form>
    </>
  )
}
