import { Button } from '@/components/ui/button'
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldLegend, FieldSet } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import React from 'react'

export const ContactPage = () => {
  const handleClick = (e)=>{
    e.preventDefault()
  }
  return (
    <div className='w-full '>
      <form className='p-4 bg-gray-50 shadow-md flex flex-col justify-center'>
        <h1 className='text-2xl font-semibold'>Contacto</h1>
        <FieldGroup>
          <FieldSet>
            <FieldDescription>
              Escribe tus comentarios o sugerencias
            </FieldDescription>
            <FieldGroup>
              <Field>
                <FieldLabel>Nombre</FieldLabel>
                <Input type={"text"} placeholder={"Nombre"} required></Input>
              </Field>
              <Field>
                <FieldLabel>Correo electrónico</FieldLabel>
                <Input type={"email"} placeholder={"jhondue@gmail.com"} required></Input>
              </Field>
              <Field>
                <FieldLabel>
                  Tipo de pregunta
                </FieldLabel>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="RV" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="RV">Reseña</SelectItem>
                      <SelectItem value="CM">Comentario</SelectItem>
                      <SelectItem value="SU">Sugerencia</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
              <Field>
                <FieldLabel>Comentario</FieldLabel>
                <Textarea type={"text"} placeholder={"Comentarios..."} required></Textarea>
              </Field>
              <Field>
                <FieldLabel>Archivo</FieldLabel>
                <FieldDescription>Adjunta un arhivo en caso de ser necesario</FieldDescription>
                  <Input type="file"/>
              </Field>
            </FieldGroup>
          </FieldSet>
        </FieldGroup>
        <Button className={"mt-1"} type={"submit"} onClick={handleClick}>Enviar</Button>
      </form>
    </div>
  )
}
