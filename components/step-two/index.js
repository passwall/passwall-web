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
  code: yup
    .string()
    .matches(/^\d+$/, {
      message: 'Code can only contain numbers'
    })
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
  let formType = store.formType

  const verifyCodeAPI = ({ code, email }) => {
    return Api.get(`/auth/verify/` + code + `?email=` + email)
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

  const onSubmit = async ({ code }) => {
    let email = localStorage.getItem("email")
    verifyCodeAPI({ code, email })
      .then(() => {
        router.push('/step-three')
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
        <Icons.ArrowLeft onClick={() => router.push('/' + formType)} />
        <Text tag="h3" theme="heromd" fancy={formType === FORM_TYPES.PRO}>
          Enter your code
        </Text>
        <TextInput
          label="Please enter the verification code at your e-mail inbox."
          name="code"
          placeholder="123456"
          register={register()}
          errors={errors.code}
        />
        <Button type="submit" value="Submit">
          <Text tag="p" theme="regular" className={styles.btn}>
            {'Continue to Final Step'}
          </Text>
        </Button>
      </form>
    </>
  )
}
