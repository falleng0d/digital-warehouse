import React, { PropsWithChildren } from 'react'
import styled from 'styled-components'
import { darken } from 'polished'

const TextInput = styled.input`
  width: 100%;
  padding: 0.5em;
  margin: 0.5em 0;
  display: block;
  border: 1px solid #ccc;
  border-radius: 6px;

  transition: all 0.2s;
  appearance: none;

  &:hover {
    background: hsl(0, 0%, 98%);
  }

  &:focus {
    box-shadow: 0 0 0 3px ${(props) => props.theme.primary};
    border: 1px solid ${(props) => darken(0.3, props.theme.primary)};

    outline: none;
  }
`
const Label = styled.label`
  display: block;
  margin-bottom: 0.5em;
`

const ValidationMessage = styled.div`
  color: red;
  font-style: italic;
  margin-top: -0.5em;
  margin-bottom: 0.5em;
  font-size: 0.8em;
`

interface LabeledInputProps extends PropsWithChildren<{}> {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void
  id?: string
  label?: string
  type?: string
  placeholder?: string
  error?: string
}

export const LabeledInput = (props: LabeledInputProps) => {
  return (
    <>
      <Label htmlFor={props.id}>{props.label}</Label>
      <TextInput
        id={props.id}
        type={props.type || 'text'}
        placeholder={props.placeholder}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
      {props.error && <ValidationMessage>{props.error}</ValidationMessage>}
    </>
  )
}
