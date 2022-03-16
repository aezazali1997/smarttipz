import * as Yup from 'yup';
const validationSchema = Yup.object({
  accountTitle:Yup.string().required('Required'),
  // accountNumber:Yup.string().required('Required'),
  IBAN:Yup.string().required('Required'),
  // branchCode:Yup.string().required('Required')

})
export default validationSchema