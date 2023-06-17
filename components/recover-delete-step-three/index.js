import React, { useState, useContext, useRef } from 'react'
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

  React.useEffect(() => {
    // Paddle.Setup({ vendor: 121559 })
  }, [])

  const registerAPI = ({ email }) => {
    return Api.delete(`/auth/recover-delete/` + email)
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

  const onSubmit = async ({ email }) => {
    registerAPI({ email })
      .then(() => { router.push('/deleted') })
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
        <Icons.ArrowLeft onClick={() => router.push('/recover-delete-code')} />
        <Text tag="h3" theme="heromd" fancy={false}>
          {'Confirm Account Deletion'}
        </Text>
        <Text tag="p" theme="medium">
          Deleting your PassWall account cannot be recovered. Confirm by typing your email address again to delete your account.
        </Text>
        <br></br>
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
            {'Delete My PassWall Account'}
          </Text>
        </Button>
      </form>
    </>
  )
}