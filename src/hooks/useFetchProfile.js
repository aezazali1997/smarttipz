import React, { useEffect, useRef, useState } from 'react'
import { useFormik } from 'formik';
import { useS3Upload } from 'next-s3-upload';
import Swal from 'sweetalert2';
import swal from 'sweetalert';
import { useRouter } from 'next/router';
import axiosInstance from 'src/APIs/axiosInstance';
import { RequestTestimonialFormSchema, UploadPhotoVideoSchema } from 'utils/validation_shema';
import { calculateAvgRating, checkCountById, checkLikeCount } from 'helpers';
import {calProfileRating} from '../../utils/rating'

const initial = {
    email: ''
};

const initials = {
    title: '',
    description: '',
    category: '',
    language: '',
    mediaType: ''
}

const UseFetchProfile = (profile) => {
  const router = useRouter()

  const [showBusinessCard, setShowBusinessCard] = useState(false)
  const [followers, setFollowers] = useState(0)
  const [followed, setFollowed] = useState(0)
  const [businessCard, setBusinessCard] = useState('')
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [loadingTestimonial, setLoadingTestimonial] = useState(true)
  const [imageUrl, setImageUrl] = useState('')
  const [hasMore, setHasMore] = useState(false)
  const [testimonial, setTestimonial] = useState([])
  const [filteredTestimonial, setFilteredTestimonial] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [showRequestTestimonial, setShowRequestTestimonial] = useState(false)
  const [MediaType, setMediaType] = useState(null)
  const [urls, setUrls] = useState('')
  const [thumbnailFile, setThumbnailFile] = useState('')
  const [thumbnailUrl, setThumbnailUrl] = useState('')
  const [agree, setAgree] = useState(false)
  const [initialValues, setInitialValues] = useState(initial)
  const [modalTitle, setModalTitle] = useState('')
  const [catalogues, setCatalogues] = useState([])
  const [fetchingCatalogues, setFetchCatalogues] = useState(true)
  const [myVideos, setMyVideos] = useState([])
  const [fetchingMyVideos, setFetchMyVideos] = useState(true)
  const [uploadingThumbnail, setUploadingThumbnail] = useState(false)
  const [catalogueCount, setCatalogueCount] = useState(0)
  const [showShareModal, setShowShareModal] = useState(false)
  const [isSharing, setIsSharing] = useState(false)
  const [shareData, setShareData] = useState({})
  const [shareCaption, setShareCaption] = useState('')
  const [profileRating, setProfileRating] = useState(null)

  let { FileInput, openFileDialog, uploadToS3 } = useS3Upload()
  let thumbnailRef = useRef()

  useEffect(() => {
    const { accountType } = profile
    enableLoadTestimonial()
    // localStorage.setItem('isApproved', isApproved);
    // localStorage.setItem('username', username);
    // localStorage.setItem('accountType', accountType);
    axiosInstance
      .getFollow()
      .then(
        ({
          data: {
            data: { followers, followed, avgProfileRating }
          }
        }) => {
          setFollowed(followed)
          setFollowers(followers)
          setProfileRating(avgProfileRating)
        }
      )
      .catch(
        ({
          response: {
            data: { message }
          }
        }) => {}
      )
    if (accountType === 'Business') {
      axiosInstance
        .getBusinessCard()
        .then(({ data: { data } }) => {
          setBusinessCard(data)
        })
        .catch(
          ({
            response: {
              data: { message }
            }
          }) => {}
        )
      axiosInstance
        .getTestimonial()
        .then(({ data: { data } }) => {
          const slicedData = data.slice(0, 5)
          if (data?.length !== slicedData?.length) {
            setHasMore(true)
          }
          setTestimonial(data)
          setFilteredTestimonial(slicedData)
          disableLoadTestimonial()
        })
        .catch(
          ({
            response: {
              data: { message }
            }
          }) => {
            disableLoadTestimonial()
          }
        )
    }
  }, [])

  const fetchCatalogues = async () => {
    enableFetchCatalogue()
    try {
      const {
        data: {
          data: { catalogues }
        }
      } = await axiosInstance.getCatalogues()
      setCatalogues(catalogues)
      disableFetchCatalogue()
    } catch ({
      response: {
        data: { message }
      }
    }) {
      console.log('Error in catalogue Api: ', message)
      disableFetchCatalogue()
    }
  }

  const fetchMyVideos = async () => {
    enableFetchMyVideos()
    try {
      const {
        data: {
          data: { videos }
        }
      } = await axiosInstance.getVideos()
      setMyVideos(videos)
      var count = 0
      for (let i = 0; i < videos.length; i++) {
        if (videos[i].Video.catalogue === true) {
          count = count + 1
        }
      }
      setCatalogueCount(count)

      disableFetchMyVideos()
    } catch ({
      response: {
        data: { message }
      }
    }) {
      console.log('Error in videos Api: ', message)
      disableFetchMyVideos()
    }
  }

  useEffect(() => {
    fetchCatalogues()
    fetchMyVideos()
  }, [])
  // useEffect(()=>{
  //     // if(!(profileRating===null || profileRating>0)){

  //     // // avgRating
  //     // }
  //     // setProfileRating(calProfileRating(myVideos));
  // },[myVideos])

  useEffect(() => {}, [testimonial, catalogues])

  let fetchMoreData = () => {
    let copyAllTestimonials = [...testimonial]
    let copyFilteredTestimonials = [...filteredTestimonial]
    let moreData = copyAllTestimonials.slice(copyFilteredTestimonials?.length, copyFilteredTestimonials?.length + 5)
    let updatedTestimonials = [...copyAllTestimonials, ...moreData]
    if (testimonial?.length !== updatedTestimonials?.length) {
      setHasMore(true)
    } else {
      setHasMore(false)
    }
    setFilteredTestimonial(updatedTestimonials)
  }

  let handleShowBusinessCard = () => {
    setShowBusinessCard((showBusinessCard) => !showBusinessCard)
  }

  let handleFileChange = async (file) => {
    enableUploading()
    let { url } = await uploadToS3(file)
    setImageUrl(url)
    disableUploading()
  }

  const _DeleteImg = () => {
    setUrls('')
  }

  const _AddTestimonial = () => {
    setShowRequestTestimonial(!showRequestTestimonial)
  }

  const _EditTestimonial = (id, isVisible) => {
    axiosInstance
      .updateTestimonial({ id, isVisible })
      .then(({ data: { data, message } }) => {
        const CopyOriginalArray = [...testimonial]
        let updatedArray = CopyOriginalArray.map((item, index) => {
          if (item.id !== id) return item
          else {
            item.isVisible = !isVisible
            return item
          }
        })
        setTestimonial(updatedArray)
      })
      .catch(
        ({
          response: {
            data: { message }
          }
        }) => {
          console.log('error: ', message)
        }
      )
  }

  const _DeleteTestimonial = (data) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      buttonsStyling: false,
      customClass: {
        confirmButton:
          'w-full inline-flex justify-center rounded-md border-none px-4 py-2 btn text-base font-medium text-white focus:outline-none sm:ml-3 sm:w-auto sm:text-sm',
        cancelButton:
          'mt-3 w-full inline-flex justify-center hover:underline  px-4 py-2 text-base font-medium text-red-600  sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        axiosInstance
          .deleteTestimonial(data?.id)
          .then(({ data: { message } }) => {
            Swal.fire({
              text: message,
              icon: 'success',
              timer: 3000,
              showCancelButton: false,
              showConfirmButton: false
            })
            let copyOriginal = [...testimonial]
            let updatedArray = copyOriginal.filter((item) => (item.id !== data?.id ? item : ''))
            setTestimonial(updatedArray)
          })
          .catch((e) => {
            Swal.fire({
              text: e.response.data.message,
              icon: 'error',
              timer: 3000,
              showCancelButton: false,
              showConfirmButton: false
            })
          })
      }
    })
  }

  const handleShowModal = () => {
    setShowModal(!showModal)
  }

  const enableLoading = () => {
    setLoading(true)
  }

  const disableLoading = () => {
    setLoading(false)
  }

  const enableUploading = () => {
    setUploading(true)
  }

  const disableUploading = () => {
    setUploading(false)
  }
  const enableLoadTestimonial = () => {
    setLoadingTestimonial(true)
  }

  const disableLoadTestimonial = () => {
    setLoadingTestimonial(false)
  }

  const enableFetchCatalogue = () => {
    setFetchCatalogues(true)
  }

  const disableFetchCatalogue = () => {
    setFetchCatalogues(false)
  }

  const enableFetchMyVideos = () => {
    setFetchMyVideos(true)
  }

  const disableFetchMyVideos = () => {
    setFetchMyVideos(false)
  }

  const enableShareLoading = () => {
    setIsSharing(true)
  }

  const disableShareLoading = () => {
    setIsSharing(false)
  }

  const _OnRequestTestimonial = (values, resetForm) => {
    const { email } = values
    enableLoading()
    axiosInstance
      .requestTestimonial({ email })
      .then(({ data: { message } }) => {
        swal({
          text: message,
          icon: 'success',
          buttons: false,
          timer: 3000
        })
        _AddTestimonial()
        resetForm({ email: '' })
        disableLoading()
      })
      .catch(
        ({
          response: {
            data: { message },
            status
          }
        }) => {
          status === 404
            ? swal({
                text: message,
                icon: 'info',
                buttons: false,
                timer: 3000
              })
            : swal({
                text: message,
                icon: 'error',
                buttons: false,
                timer: 3000
              })
          disableLoading()
        }
      )
  }

  const _OnUploadMedia = async (values, setSubmitting, resetForm) => {
    setSubmitting(true)
    values.url = urls
    values.thumbnail = thumbnailUrl
    values.category = 'catalogue'
    values.agree = agree
    try {
      const res = await axiosInstance.uploadNewsFeed(values)
      const {
        data: { message }
      } = res
      Swal.fire({
        text: message,
        timer: 3000,
        icon: 'success',
        showCancelButton: false,
        showConfirmButton: false
      })
      setCatalogues([values, ...catalogues])
      resetForm(initials)
      setSubmitting(false)
      _CloseUploadModal()
    } catch ({
      response: {
        data: { message }
      }
    }) {
      console.log('API Failed: ', message)
      Swal.fire({
        text: message,
        timer: 3000,
        icon: 'error',
        showCancelButton: false,
        showConfirmButton: false
      })
      setSubmitting(false)
    }
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: modalTitle === '' ? RequestTestimonialFormSchema : UploadPhotoVideoSchema,
    validateOnBlur: true,
    onSubmit: (values, { resetForm, setSubmitting }) => {
      modalTitle === '' ? _OnRequestTestimonial(values, resetForm) : _OnUploadMedia(values, setSubmitting, resetForm)
    }
  })

  let onChangeThumbnail = async ({ target }) => {
    const { files } = target
    for (let i = 0; i < files.length; i++) {
      setUploadingThumbnail(true)
      let file = files[0]
      setThumbnailFile(file)
      const { url } = await uploadToS3(file)
      setThumbnailUrl(url)
      setUploadingThumbnail(false)
    }
  }

  let _OnThumbnailClick = () => {
    thumbnailRef.current.click()
  }

  let _OnRemoveThumbnail = () => {
    setThumbnailUrl('')
    setThumbnailFile('')
  }

  let _OpenUploadModal = () => {
    setModalTitle('Upload Photo/Video')
    setInitialValues(initials)
    setShowModal(true)
  }

  let _CloseUploadModal = () => {
    setModalTitle('')
    setUrls('')
    setThumbnailUrl('')
    setAgree(false)
    setShowModal(false)
  }

  let ChangeAgreement = (e) => {
    const { checked } = e.target
    setAgree(checked)
  }

  // console.log('catalogueCount: ', catalogueCount);

  const _HandleCatalogue = async (videoId, catalogue) => {
    if (catalogueCount < 5 || catalogue === true) {
      try {
        const data = await axiosInstance.addToCatalogue({ videoId, catalogue })
        const originalArray = [...catalogues]
        const originalVideoArray = [...myVideos]
        if (catalogue) {
          //   asking wether user wants to delete the catalogue video or not
          Swal.fire({
            title: 'Are you sure?',
            text: 'Are you sure you want to remove this video from catalogue',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            buttonsStyling: false,
            customClass: {
              confirmButton:
                'w-full inline-flex justify-center rounded-md border-none px-4 py-2 btn text-base font-medium text-white focus:outline-none sm:ml-3 sm:w-auto sm:text-sm',
              cancelButton:
                'mt-3 w-full inline-flex justify-center hover:underline  px-4 py-2 text-base font-medium text-red-600  sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
            }
          }).then((result) => {
            if (result.isConfirmed) {
              //   deletes the catalogue video
              let newArray = originalArray.filter((item) => item.id !== videoId && item)
              setCatalogues(newArray)
              setCatalogueCount((catalogueCount) => catalogueCount - 1)
            }
          })
        } else {
          //   adds the video to catalogue
          fetchCatalogues()
          setCatalogueCount((catalogueCount) => catalogueCount + 1)
        }
        // mapping the video after deleting and adding from catalogue
        let newArray = originalVideoArray.map((item) => {
          if (item.id !== videoId) return item
          item.Video.catalogue = !catalogue
          return item
        })
        setMyVideos(newArray)
      } catch ({
        response: {
          data: { message }
        }
      }) {
        console.log('error in Api: ', message)
      }
    } else {
      Swal.fire({
        text: 'You can add only 5 videos in catalogue, please delete any to proceed',
        // timer: 4000,
        icon: 'info',
        showConfirmButton: true,
        showCancelButton: false
      })
    }
  }

  const _HandleDeleteVideo = async (index, videoId) => {
    try {
      Swal.fire({
        title: 'Are you sure?',
        text: 'Are you sure you want to remove this video. It cannot be reverted',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        buttonsStyling: false,

        customClass: {
          confirmButton:
            'w-full inline-flex justify-center rounded-md border-none px-4 py-2 btn text-base font-medium text-white focus:outline-none sm:ml-3 sm:w-auto sm:text-sm',
          cancelButton:
            'mt-3 w-full inline-flex justify-center hover:underline  px-4 py-2 text-base font-medium text-red-600  sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
        }
      }).then(async (result) => {
        if (result.isConfirmed) {
          //   deletes the  video
          const {
            data: {
              data: { profileUpdatedRating }
            }
          } = await axiosInstance.deleteVideo(videoId)
          // deletes the video and updated the user profile
          setProfileRating(profileUpdatedRating)
          const originalArray = [...myVideos]
          const originalCatalogueArray = [...catalogues]
          let newArray = originalCatalogueArray.filter((item) => item.id !== videoId && item)
          originalArray.splice(index, 1)
          setCatalogues([...newArray])
          setMyVideos([...originalArray])
        }
      })
    } catch (error) {
      console.log('Api Failed: ', error.message)
    }
  }
  const _HandleGotoUserProfile = (id, username) => {
    if (id !== parseInt(localStorage.getItem('id'))) {
      router.push(`/dashboard/profile/${username}`)
    } else {
      router.push(`/dashboard/profile`)
    }
  }

  const _HandleGotoVideoDetails = (id) => {
    router.push(`/dashboard/videos/${id}`)
  }
  const postViewOnVideo = async (VideoId) => {
    try {
      await axiosInstance.viewPost({ VideoId: VideoId })
    } catch (error) {
      console.log('ERROR:', error)
    }
  }
  const HandleLikePost = async (id, isLiked) => {
    const updatedCatPosts = await checkLikeCount(catalogues, id, isLiked)
    const updatedVideoPosts = await checkLikeCount(myVideos, id, isLiked)
    setCatalogues(updatedCatPosts)
    setMyVideos(updatedVideoPosts)
    try {
      await axiosInstance.likePost({ postId: id })
    } catch ({
      response: {
        data: { message }
      }
    }) {
      console.log('Like Post Api failed: ', message)
    }
  }

  const _HandleCommentCounts = async (postId, operator) => {
    const updatedCatPost = await checkCountById(catalogues, 'commentCount', postId, operator)
    const updatedVideoPost = await checkCountById(myVideos, 'commentCount', postId, operator)
    setCatalogues(updatedCatPost)
    setMyVideos(updatedVideoPost)
  }

  let _OpenShareModal = (id, thumbnail, url, picture, name, title) => {
    setShareData({
      videoId: id,
      thumbnail,
      url,
      picture,
      name,
      title
    })
    setShowShareModal(true)
  }

  let _CloseShareModal = () => {
    setShowShareModal(false)
    setShareCaption('')
  }

  const _HandleChangeCaption = ({ target }) => {
    const { value } = target
    setShareCaption(value)
  }

  const _HandleSharePost = async () => {
    enableShareLoading()
    try {
      const {
        data: { message }
      } = await axiosInstance.sharePost({ caption: shareCaption, videoId: shareData?.videoId })
      Swal.fire({
        text: message,
        icon: 'success',
        timer: 3000,
        showConfirmButton: false,
        showCancelButton: false
      })
      disableShareLoading()
      _CloseShareModal()
    } catch ({
      response: {
        data: { message }
      }
    }) {
      console.log('Share Post Api failed: ', message)
    }
  }

  return {
    followed,
    followers,
    showModal,
    businessCard,
    showBusinessCard,
    formik,
    imageUrl,
    loading,
    testimonial,
    uploading,
    loadingTestimonial,
    _AddTestimonial,
    handleShowBusinessCard,
    _EditTestimonial,
    _DeleteImg,
    handleFileChange,
    FileInput,
    openFileDialog,
    handleShowModal,
    _DeleteTestimonial,
    showRequestTestimonial,
    fetchMoreData,
    filteredTestimonial,
    hasMore,
    _OnRemoveThumbnail,
    onChangeThumbnail,
    MediaType,
    thumbnailRef,
    modalTitle,
    _HandleCatalogue,
    agree,
    thumbnailUrl,
    urls,
    setUrls,
    setMediaType,
    ChangeAgreement,
    _OnThumbnailClick,
    uploadingThumbnail,
    _CloseUploadModal,
    _OpenUploadModal,
    catalogues,
    setCatalogues,
    fetchingCatalogues,
    myVideos,
    fetchingMyVideos,
    _HandleDeleteVideo,
    _HandleGotoVideoDetails,
    _HandleGotoUserProfile,
    HandleLikePost,
    _OpenShareModal,
    _CloseShareModal,
    showShareModal,
    shareData,
    _HandleSharePost,
    _HandleChangeCaption,
    shareCaption,
    setShareCaption,
    isSharing,
    _HandleCommentCounts,
    profileRating,
    postViewOnVideo
  }
};;;;;
export default UseFetchProfile;
