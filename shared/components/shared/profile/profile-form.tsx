'use client';

import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { User } from '@prisma/client';
import { Container, Title } from "@/shared/components/shared";
import { FormInput } from "@/shared/components/shared/form";
import { Button } from '../../ui';

interface Props {
  data: User;
}

export const ProfileForm: React.FC<Props> = ({ data }) => {
  const form = useForm({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      fullName: data.fullName,
      email: data.email,
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: TFormRegisterData) => {
    try {
      await updateUserInfo({
        email: data.email,
        fullName: data.fullName,
        password: data.password,
      });

      toast.error('Error 📝', {
        icon: '✅',
      });
    } catch (error) {
      return toast.error('Error', {
        icon: '❌',
      });
    }
  };

  const onClickSignOut = () => {
    // signOut({
    //   callbackUrl: '/',
    // });
  };

  return (
    <Container className="my-10">
      <Title
        text="Личные данные"
        size="md"
        className="font-bold"
      />

      <FormProvider {...form}>
        <form
          className="flex flex-col gap-5 w-96 mt-10"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormInput
            name="email"
            label="E-Mail"
            required
          />
          <FormInput
            name="fullName"
            label="Полное имя"
            required
          />

          <FormInput
            type="password"
            name="password"
            label="Новый пароль"
            required
          />
          <FormInput
            type="password"
            name="confirmPassword"
            label="Повторите пароль"
            required
          />

          <Button
            disabled={form.formState.isSubmitting}
            className="text-base mt-10"
            type="submit"
          >
            Save
          </Button>

          <Button
            onClick={onClickSignOut}
            variant="secondary"
            disabled={form.formState.isSubmitting}
            className="text-base"
            type="button"
          >
            Logout
          </Button>
        </form>
      </FormProvider>
    </Container>
  );
};
