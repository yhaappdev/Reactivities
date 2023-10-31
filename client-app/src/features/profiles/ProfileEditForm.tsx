import { Form, Formik} from "formik";
import { observer } from "mobx-react-lite";
import React from "react";
import { Button} from "semantic-ui-react";
import MyTextArea from "../../app/common/form/MyTextArea";
import MyTextInput from "../../app/common/form/MyTextInput";
import * as Yup from 'yup';
import { useStore } from "../../app/stores/store";

interface Props {
    setEditMode: (editMode: boolean) => void
}

export default observer(function ProfileEditForm({setEditMode} : Props) {
    const {profileStore: {profile, updateProfile}} = useStore()
    return (
            <Formik initialValues={{displayName: profile?.displayName, bio: profile?.bio}} onSubmit={values => {
                updateProfile(values).then(() => {
                    setEditMode(false)
                })
            }} 
            
            validationSchema={Yup.object({
                displayName: Yup.string().required()
            })}
            >
                {({isSubmitting, isValid, dirty}) => (
                    <Form className='ui form'>
                    <MyTextInput name='displayName' placeholder='Display Name' />
                    <MyTextArea name='bio' placeholder='Add your bio' rows={3} />
                    <Button positive type='submit' loading={isSubmitting} content='Update Profile' floated='right' disabled={!isValid || !dirty} />
                </Form>
                )}
            </Formik>
    )
})