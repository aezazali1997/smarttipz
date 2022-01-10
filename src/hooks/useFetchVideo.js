import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axiosInstance from 'src/APIs/axiosInstance';
import Swal from 'sweetalert2';

const UseFetchVideo = () => {
  const router = useRouter();

  const [filterdVideos, setFilterVideos] = useState([]);
  const [Videos, setVideos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [catalogueCount, setCatalogueCount] = useState(0);
  const [showShareModal, setShowShareModal] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [shareData, setShareData] = useState({});
  const [shareCaption, setShareCaption] = useState('');

  const fetchMyVideos = async () => {
    try {
      const {
        data: {
          data: { videos }
        }
      } = await axiosInstance.getVideos();
      setVideos(videos);
      setFilterVideos(videos);
      var count = 0;
      for (let i = 0; i < videos.length; i++) {
        if (videos[i].Video.catalogue === true) {
          count = count + 1;
        }
      }
      setCatalogueCount(count);
      setLoading(false);
    } catch ({
      response: {
        data: { message }
      }
    }) {
      console.log('Error in videos Api: ', message);
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchMyVideos();
  }, []);

  useEffect(() => { }, [filterdVideos]);

  const enableShareLoading = () => {
    setIsSharing(true);
  };

  const disableShareLoading = () => {
    setIsSharing(false);
  };

  let _ChangeFilter = ({ target }) => {
    const { value } = target;
    let FilteredVideos =
      value === 'all' ? Videos : Videos.filter((video) => video.Video.category === value && video);
    setFilter(value);
    setFilterVideos(FilteredVideos);
  };

  const _HandleCatalogue = async (videoId, catalogue) => {
    if (catalogueCount < 5 || catalogue === true) {
      try {
        const data = await axiosInstance.addToCatalogue({ videoId, catalogue });
        if (catalogue) {
          setCatalogueCount((catalogueCount) => catalogueCount - 1);
        } else {
          setCatalogueCount((catalogueCount) => catalogueCount + 1);
        }
        const originalArray = [...Videos];
        const originalFilteredArray = [...filterdVideos];
        let newArray = originalArray.map((item, i) => {
          if (item.id !== videoId) return item;
          item.Video.catalogue = !catalogue;
          return item;
        });
        let newFilteredArray = originalFilteredArray.map((item, i) => {
          if (item.id !== videoId) return item;
          item.Video.catalogue = !catalogue;
          return item;
        });
        console.log('newFilteredArray:', newFilteredArray);
        setVideos(newArray);
        setFilterVideos(newFilteredArray);
      } catch ({
        response: {
          data: { message }
        }
      }) {
        console.log('error in Api: ', message);
      }
    } else {
      Swal.fire({
        text: 'You can add only 5 videos in catalogue, please delete any to proceed',
        // timer: 4000,
        icon: 'info',
        showConfirmButton: true,
        showCancelButton: false
      });
    }
  };

  const _HandleDeleteVideo = async (index, videoId) => {
    try {
      const res = await axiosInstance.deleteVideo(videoId);
      setCatalogueCount((catalogueCount) => catalogueCount - 1);
      const originalArray = [...Videos];
      const originalFilteredArray = [...filterdVideos];
      originalArray.splice(index, 1);
      let newFilteredArray = originalFilteredArray.filter((item, i) => {
        if (item.Video.id !== videoId) return item;
      });
      console.log('newFilteredArray: ', newFilteredArray);
      setFilterVideos(newFilteredArray);
      setVideos(originalArray);
    } catch ({
      response: {
        data: { message }
      }
    }) {
      console.log('Api Failed: ', message);
    }
  };

  const _HandleGotoVideoDetails = (id) => {
    router.push(`/dashboard/videos/${id}`);
  };

  const HandleLikePost = async (id) => {
    try {
      const {
        data: { data, message }
      } = await axiosInstance.likePost({ videoId: id });
      console.log('success: ', message);
      fetchMyVideos();
    } catch ({
      response: {
        data: { message }
      }
    }) {
      console.log('Like Post Api failed: ', message);
    }
  };

  let _OpenShareModal = (id, thumbnail, url, picture, name, title) => {
    setShareData({
      videoId: id,
      thumbnail,
      url,
      picture,
      name,
      title
    });
    setShowShareModal(true);
  };

  let _CloseShareModal = () => {
    setShowShareModal(false);
    setShareCaption('');
  };

  const _HandleChangeCaption = ({ target }) => {
    const { value } = target;
    setShareCaption(value);
  };

  const _HandleSharePost = async () => {
    enableShareLoading();
    try {
      const {
        data: { data, message }
      } = await axiosInstance.sharePost({ caption: shareCaption, videoId: shareData?.videoId });
      Swal.fire({
        text: message,
        icon: 'success',
        timer: 3000,
        showConfirmButton: false,
        showCancelButton: false
      });
      fetchMyVideos();
      disableShareLoading();
      _CloseShareModal();
    } catch ({
      response: {
        data: { message }
      }
    }) {
      console.log('Share Post Api failed: ', message);
    }
  };

  return {
    _HandleSharePost,
    _HandleChangeCaption,
    _OpenShareModal,
    HandleLikePost,
    _HandleGotoVideoDetails,
    _HandleDeleteVideo,
    _HandleCatalogue,
    _ChangeFilter,
    _CloseShareModal,
    filterdVideos,
    Videos,
    filter,
    loading,
    catalogueCount,
    showShareModal,
    isSharing,
    shareData,
    shareCaption,
    setShareCaption
  };
};

export default UseFetchVideo;