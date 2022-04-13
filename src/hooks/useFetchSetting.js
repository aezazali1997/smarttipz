import { useFormik } from 'formik';
import { useS3Upload } from 'next-s3-upload';
import React, { useEffect, useState } from 'react';
import swal from 'sweetalert';
import axiosInstance from 'src/APIs/axiosInstance';
import { AccountInfoValidationSchema } from 'utils/validation_shema';
import { useSearchContext } from 'src/contexts';
import moment from 'moment';
const initialValues = {
  old: '',
  new: '',
  confirm: ''
};

let update = false;

const UseFetchSetting = (settings) => {
  const [personalLoading, setPersonalLoading] = useState(false);
  const [accountLoading, setAccountLoading] = useState(false);
  const [personalInfo, setPersonalInfo] = useState({
    phone: '',
    accessible: '',
    name: '',
    email: '',
    showPhone: '',
    about: '',
    username: '',
    accountType: '',
    showName: '',
    showUsername: '',
    tip: '',
    stripeAccountId: '',
    onBoarded: false
  });
  const [updated, setUpdated] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [businessCard, setBusinessCard] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const { setProfilePic } = useSearchContext();
  const [showTopUpModal, setShowTopUpModal] = useState(false);
  let { FileInput, openFileDialog, uploadToS3 } = useS3Upload();
  const [balance, setBalance] = useState(0.0);
  const [topUp, setTopUp] = useState(0);
  const [withDraw, setWithDraw] = useState(0);
  const [ToppingUp, setToppingUp] = useState(false);
  const [isWithDrawing, setIsWithDrawing] = useState(false);
  const [isGeneratingLink, setIsGeneratingLink] = useState(false);
  const [showWithDrawModal, setShowWithDrawModal] = useState(false);
  const [withDrawError, setWithDrawError] = useState('');
  const [showCheckout, setShowCheckout] = useState(false);
  const [link, setLink] = useState('');
  const [onBoarding, setOnBoarding] = useState(false);

  useEffect(() => {
    const { accountType } = settings;

    if (update !== updated) {
      axiosInstance
        .profile()
        .then(({ data: { data } }) => {
          setImageUrl(data?.picture);
          setPersonalInfo(data);

          setCountryCode(data?.phone);
        })
        .catch((e) => {
          console.log('Profile Fetch Failed: ', e.response.data.message);
        });
    } else {
      setImageUrl(settings?.picture);
      setCountryCode(settings?.phone);
      setPersonalInfo(settings);
      setBalance(settings.totalTipsAmount);
    }
    if (accountType === 'Business') {
      axiosInstance
        .getBusinessCard()
        .then(({ data: { data } }) => {
          setBusinessCard(data);
        })
        .catch((e) => {
          console.log('Error in Api BusinessCard: ', e.response.data.message);
        });
    }
  }, [updated]);

  useEffect(() => {}, [imageUrl]);
  const enablePersonalLoading = () => {
    setPersonalLoading(true);
  };

  const disablePersonalLoading = () => {
    setPersonalLoading(false);
  };
  const toggleTopUpModal = () => {
    setShowTopUpModal(!showTopUpModal);
  };
  const toggleWithDrawModal = () => {
    setShowWithDrawModal(!showWithDrawModal);
    setWithDrawError('');
    setWithDraw(0);
  };

  const withDrawFunds = async () => {
    if (withDraw > balance) {
      setWithDrawError('Amount exceeded balance');
      return;
    }
    setWithDrawError('');
    let email = personalInfo.email;
    setIsWithDrawing(true);
    try {
      let {
        data: { totalTipsAmount }
      } = await axiosInstance.withDrawProfile(withDraw, email);
      setBalance(totalTipsAmount);
    } catch (error) {}
    setIsWithDrawing(false);
    toggleWithDrawModal();
  };

  const topUpSubmit = async () => {
    toggleTopUpModal();
    setShowCheckout(true);

    setToppingUp(false);
    setWithDrawError('');
  };

  const generateLink = async () => {
    if (link === '') {
      try {
        setIsGeneratingLink(true);
        let {
          data: {
            data: {
              accountLink,
              accountLink: { url }
            }
          }
        } = await axiosInstance.generateStripeAccountLink();
        setLink(url);
        let diff = accountLink.expires_at - accountLink.created;
      } catch (error) {
        console.log('ERROR: ', error.message);
      }
      setIsGeneratingLink(false);
    } else {
      let anchor = document.createElement('a');
      anchor.setAttribute('href', link);
      anchor.setAttribute('target', '_blank');
      anchor.click();
      setLink('');
    }
  };

  const enableAccountLoading = () => {
    setAccountLoading(true);
  };

  const disableAccountLoading = () => {
    setAccountLoading(false);
  };

  let handleFileChange = async (file) => {
    let { url } = await uploadToS3(file);
    axiosInstance
      .uploadProfilePic(url)
      .then(
        ({
          data: {
            data: { img }
          }
        }) => {
          setImageUrl(img);
          setProfilePic(url);
          localStorage.setItem('image', url);
        }
      )
      .catch((e) => {
        console.log(e.message);
      });
  };

  let _DeleteImg = () => {
    axiosInstance
      .removeProfilePic()
      .then((res) => {
        setUpdated(true);
        setProfilePic('');
        localStorage.setItem('image', '');
      })
      .catch((error) => {
        console.log('API error: ', error);
      });
  };

  const _OnChange = (e) => {
    const { name, value, checked } = e.target;
    let copyOriginal = { ...personalInfo };
    let newObject =
      name === 'accessible' || name === 'showPhone' || name === 'showName' || name === 'showUsername'
        ? name === 'showUsername' && checked === true
          ? { ...copyOriginal, showUsername: true, showName: false }
          : name === 'showUsername' && checked === false
          ? { ...copyOriginal, showUsername: false, showName: true }
          : name === 'showName' && checked === true
          ? { ...copyOriginal, showUsername: false, showName: true }
          : name === 'showName' && checked === false
          ? { ...copyOriginal, showUsername: true, showName: false }
          : { ...copyOriginal, [name]: checked }
        : { ...copyOriginal, [name]: value };
    setPersonalInfo(newObject);
  };

  const onChangeBusinessWebsite = (e) => {
    const { name, value } = e.target;
    let copyOriginal = { ...businessCard };
    let newObject = { ...copyOriginal, [name]: value };
    setBusinessCard(newObject);
  };

  const _ChangeCountryCode = (value) => {
    setCountryCode(value);
  };

  let _Update = () => {
    enablePersonalLoading();
    personalInfo.phone = countryCode;
    let payload = {
      data: personalInfo,
      accountType: personalInfo.accountType
    };
    if (personalInfo.accountType === 'Business') {
      const website = businessCard?.website;
      payload.businessCard = {
        website
      };
    }
    axiosInstance
      .updateProfile(payload)
      .then(({ data: { message } }) => {
        swal({
          text: message,
          timer: 3000,
          icon: 'success',
          dangerMode: true,
          buttons: false
        });
        setUpdated(true);
        disablePersonalLoading();
      })
      .catch((e) => {
        swal({
          text: e.response.data.message,
          timer: 3000,
          icon: 'error',
          dangerMode: true,
          buttons: false
        });
        console.log('error in api: ', e.response.data.message);
        disablePersonalLoading();
      });
  };
  const toggleCheckoutModal = () => {
    setShowCheckout(!showCheckout);
  };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: AccountInfoValidationSchema,
    onSubmit: (values, { setSubmitting, setStatus, resetForm }) => {
      enableAccountLoading();
      setTimeout(() => {
        const data = { oldPassword: values.old, newPassword: values.new };
        axiosInstance
          .changePassword(data)
          .then(({ data: { message } }) => {
            swal({
              text: message,
              timer: toggleTopUpModal3000,
              icon: 'success',
              dangerMode: true,
              buttons: false
            });
            resetForm(initialValues);
            disableAccountLoading();
            setUpdated(true);
          })
          .catch((e) => {
            console.log('error in api: ', e.response.data.message);
            swal({
              text: e.response.data.message,
              timer: 3000,
              icon: 'error',
              dangerMode: true,
              buttons: false
            });
            disableAccountLoading();
          });
      }, 1000);
    }
  });

  return {
    accountLoading,
    formik,
    personalInfo,
    personalLoading,
    businessCard,
    countryCode,
    imageUrl,
    _Update,
    _OnChange,
    _DeleteImg,
    handleFileChange,
    FileInput,
    openFileDialog,
    _ChangeCountryCode,
    onChangeBusinessWebsite,
    withDrawFunds,
    toggleTopUpModal,
    showTopUpModal,
    balance,
    setBalance,
    topUp,
    setTopUp,
    topUpSubmit,
    ToppingUp,
    showWithDrawModal,
    withDraw,
    setWithDraw,
    toggleWithDrawModal,
    isWithDrawing,
    withDrawError,
    toggleCheckoutModal,
    showCheckout,
    // handleTopUpChange,
    generateLink,
    isGeneratingLink,
    link
  };
};

export default UseFetchSetting;
