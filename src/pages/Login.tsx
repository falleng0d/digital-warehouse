import warehouse from '../warehouse.svg'
import styled from 'styled-components'
import { Section } from '../App'
import React, { PropsWithChildren, useState } from 'react'
import { LabeledInput } from '../components/LabeledInput'
import { darken } from 'polished'
import { z } from 'zod'

type ContainerProps = {
  maxWidth?: string
  center?: boolean
  mb?: string
  mr?: string
  ml?: string
  mt?: string
  noShrink?: boolean
}
const Container = styled.div<ContainerProps>`
  max-width: ${(props) => props.maxWidth || 'unset'};
  ${(props) => props.center && 'margin: 0 auto;'};
  ${(props) => props.mb && `margin-bottom: ${props.mb};`};
  ${(props) => props.mr && `margin-right: ${props.mr};`};
  ${(props) => props.ml && `margin-left: ${props.ml};`};
  ${(props) => props.mt && `margin-top: ${props.mt};`};
  ${(props) => props.noShrink && 'flex-shrink: 0;'};
`

const Logo = styled.img<{ maxWidth?: string }>`
  max-width: ${(props) => props.maxWidth || 'unset'};
  width: 100%;
  flex-basis: auto;
  flex-shrink: 0;
`

const StyledHeader = styled.div`
  padding: 1em;
  background: ${(props) => props.theme.primary};
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    padding: 0.5em;
  }
`

const Header = (props: PropsWithChildren<{}>) => (
  <StyledHeader>{props.children}</StyledHeader>
)

Header.Text = styled.h2`
  margin: 0;
  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    font-size: 1.25em;
  }
`

const Title = styled.h1`
  margin-top: 0;
`

const Button = styled.button`
  background: ${(props) => props.theme.primary};
  padding: 0.5em 1em;

  border: 1px solid transparent;
  border-radius: 6px;

  transition: all 0.2s;

  &:hover {
    background: ${(props) => darken(0.1, props.theme.primary)};
  }

  &:focus {
    box-shadow: 0 0 0 3px ${(props) => props.theme.primary};
    border: 1px solid ${(props) => darken(0.3, props.theme.primary)};
  }

  &:active {
    background: ${(props) => darken(0.2, props.theme.primary)};
  }
`

const formSchema = z.object({
  username: z.string().refine((val) => val.length > 4, 'Username too short'),
  password: z
    .string()
    .refine((val) => val.length > 4, 'Password must be at least 4 characters')
})

type FormSchemaType = z.infer<typeof formSchema>

type AnyFormField = keyof FormSchemaType

function Login(props: PropsWithChildren<{}>) {
  const [username, setUsername] = useState<string>()
  const [password, setPassword] = useState<string>()
  const [errors, setErrors] = useState<Partial<FormSchemaType>>()
  const fields = ['username', 'password']

  function onChangeUsername($event: React.ChangeEvent<HTMLInputElement>) {
    console.log('onChangeUsername', $event.target.value)
    setUsername($event.target.value)
  }

  function onChangePassword($event: React.ChangeEvent<HTMLInputElement>) {
    console.log('onChangePassword', $event.target.value)
    setPassword($event.target.value)
  }

  function onSubmit($event: React.FormEvent<HTMLButtonElement>) {
    $event.preventDefault()
    if (validateForm()) {
      console.log('Form is valid')
    }
    console.log('onSubmit', username, password)
  }

  function validateForm() {
    const result = formSchema.safeParse({ username, password })
    if (!result.success) {
      let fieldErrors = result.error.formErrors.fieldErrors
      const errorMessages = { ...errors }
      for (const field of fields) {
        if (fieldErrors.hasOwnProperty(field)) {
          // @ts-ignore
          errorMessages[field] = fieldErrors[field].join(', ')
        }
      }
      setErrors(errorMessages)
      return false
    }
    setErrors({})
    return username && password
  }

  function validateField(field: AnyFormField) {
    const result = formSchema.safeParse({ username, password })
    if (!result.success) {
      let fieldError = result.error.formErrors.fieldErrors[field]
      if (fieldError) {
        const errorMessages = { ...errors }
        errorMessages[field] = fieldError.join(', ')
        setErrors(errorMessages)
      }
      return false
    }
    if (errors && errors.hasOwnProperty(field)) {
      const newErrors = { ...errors }
      delete newErrors[field]
      setErrors(newErrors)
    }
    return true
  }

  return (
    <>
      <Header>
        <Container mr="5px" noShrink>
          <Logo src={warehouse} maxWidth="40px" alt="logo" />
        </Container>
        <Header.Text>Digital Warehouse</Header.Text>
        <div></div>
      </Header>
      <Section>
        <Container maxWidth="400px" center mb="1em">
          <Title>Login</Title>

          <LabeledInput
            id="username"
            placeholder="username"
            label="User"
            onChange={onChangeUsername}
            onBlur={(_) => validateField('username')}
            error={errors?.username}
          />
          <LabeledInput
            id="password"
            placeholder="password"
            label="Password"
            type="password"
            onChange={onChangePassword}
            onBlur={(_) => validateField('password')}
            error={errors?.password}
          />
        </Container>
        <Container maxWidth="400px" center>
          <Button onClick={onSubmit}>Submit</Button>
        </Container>
      </Section>
    </>
  )
}

export default styled(Login)``
