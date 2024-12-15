import { mdiChartTimelineVariant, mdiUpload } from '@mdi/js';
import Head from 'next/head';
import React, { ReactElement, useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';

import CardBox from '../../components/CardBox';
import LayoutAuthenticated from '../../layouts/Authenticated';
import SectionMain from '../../components/SectionMain';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import { getPageTitle } from '../../config';

import { Field, Form, Formik } from 'formik';
import FormField from '../../components/FormField';
import BaseDivider from '../../components/BaseDivider';
import BaseButtons from '../../components/BaseButtons';
import BaseButton from '../../components/BaseButton';
import FormCheckRadio from '../../components/FormCheckRadio';
import FormCheckRadioGroup from '../../components/FormCheckRadioGroup';
import FormFilePicker from '../../components/FormFilePicker';
import FormImagePicker from '../../components/FormImagePicker';
import { SelectField } from '../../components/SelectField';
import { SelectFieldMany } from '../../components/SelectFieldMany';
import { SwitchField } from '../../components/SwitchField';
import { RichTextField } from '../../components/RichTextField';

import { update, fetch } from '../../stores/volunteers/volunteersSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

const EditVolunteersPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    user: '',

    skills: '',

    availability: '',

    preferred_method: '',
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { volunteers } = useAppSelector((state) => state.volunteers);

  const { id } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: id }));
  }, [id]);

  useEffect(() => {
    if (typeof volunteers === 'object') {
      setInitialValues(volunteers);
    }
  }, [volunteers]);

  useEffect(() => {
    if (typeof volunteers === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = volunteers[el] || ''),
      );

      setInitialValues(newInitialVal);
    }
  }, [volunteers]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: id, data }));
    await router.push('/volunteers/volunteers-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit volunteers')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit volunteers'}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>
              <FormField label='User' labelFor='user'>
                <Field
                  name='user'
                  id='user'
                  component={SelectField}
                  options={initialValues.user}
                  itemRef={'users'}
                  showField={'firstName'}
                ></Field>
              </FormField>

              <FormField label='Skills' hasTextareaHeight>
                <Field name='skills' as='textarea' placeholder='Skills' />
              </FormField>

              <FormField label='Availability'>
                <Field name='availability' placeholder='Availability' />
              </FormField>

              <FormField label='PreferredMethod' labelFor='preferred_method'>
                <Field
                  name='preferred_method'
                  id='preferred_method'
                  component='select'
                >
                  <option value='online'>online</option>

                  <option value='offline'>offline</option>
                </Field>
              </FormField>

              <BaseDivider />
              <BaseButtons>
                <BaseButton type='submit' color='info' label='Submit' />
                <BaseButton type='reset' color='info' outline label='Reset' />
                <BaseButton
                  type='reset'
                  color='danger'
                  outline
                  label='Cancel'
                  onClick={() => router.push('/volunteers/volunteers-list')}
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

EditVolunteersPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_VOLUNTEERS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditVolunteersPage;
