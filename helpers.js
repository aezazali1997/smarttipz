export const getInputClasses = (formik, fieldname) => {
    if (formik.touched[fieldname] && formik.errors[fieldname]) {
        return "border-red-500";
    }

    if (formik.touched[fieldname] && !formik.errors[fieldname]) {
        return "border-blue-500";
    }

    return "";
};


export const movetoNext = (e, nextFieldId, prevFieldId) => {
    const { value, maxLength } = e.target;
    if ((e.keyCode === 37 || e.keyCode === 39) && value.length >= maxLength) {
    }

    else if (e.keyCode === 8) {
        if (prevFieldId !== null) {
            document.getElementById(prevFieldId).focus();
        }
    }

    else if ((e.keyCode !== 37 || e.keyCode !== 39) && value.length >= maxLength) {
        document.getElementById(nextFieldId).focus();
    }
}

export const scrollToBottom = (messagesEndRef) => {
    messagesEndRef.current?.scrollIntoView()
}


export const checkLikeCount = (originalArray, id, isLiked) => {
    
    const deepCopyVideoPosts = [...originalArray];
    const upadtedPosts = [];
    for (const post of deepCopyVideoPosts) {
        if (post.id !== id) {
            upadtedPosts.push(post);
        }
        else {
            post.isLiked = !isLiked;
            post.likeCount = isLiked ? (post.likeCount - 1) : (post.likeCount + 1)
            upadtedPosts.push(post);
        }
    }
    return upadtedPosts;
}

export const checkCountById = (originalArray, name, postId, operator) => {
    let updatedPosts = [...originalArray].map((post, i) => {
        if (post.id !== postId) return post;
        switch (operator) {
            case '+':
                post[name] = (post[name] + 1);
                break;
            case '-':
                post[name] = (post[name] - 1)
                break;
        }
        return post;
    })
    return updatedPosts;
}


export const calculateAvgRating = (originalArray, postId, totalRaters, oldRating, newRating,hasRated) => {
    let totalRATERS=Number(totalRaters);
   
    const deepCopyVideoPosts = [...originalArray];
    const upadtedPosts = [];
    for (const post of deepCopyVideoPosts) {
        if (post.id !== postId) {
            upadtedPosts.push(post);
        }
        else {
            let newAvgRating=0.0;
            
            if(hasRated===true){
               
                newAvgRating = oldRating
                post.totalRaters = (totalRATERS).toString();

            }
            else
            {

                newAvgRating = ((newRating + (totalRATERS * oldRating)) / (totalRATERS+1))
            post.totalRaters = (totalRATERS+1).toString();
            }
            

            post.avgRating = newAvgRating.toString();
            upadtedPosts.push(post);
        }
    }
    return upadtedPosts;

}
export const calculateSinglePostAvgRating = (originalArray, postId, totalRaters, oldRating, newRating,hasRated) => {
    let totalRATERS=Number(totalRaters);
   
    const deepCopyVideoPost = {...originalArray};
    
        
            let newAvgRating=0.0;
            
            if(hasRated===true){
               
                newAvgRating = oldRating
                deepCopyVideoPost.totalRaters = (totalRATERS).toString();

            }
            else
            {

                newAvgRating = ((newRating + (totalRATERS * oldRating)) / (totalRATERS+1))
            deepCopyVideoPost.totalRaters = (totalRATERS+1).toString();
            }
            

            deepCopyVideoPost.avgRating = newAvgRating.toString();
        
    
    return deepCopyVideoPost;

}
export const fixedWithoutRoundOff = (num, fixed)=> {
    var re = new RegExp('^-?\\d+(?:\.\\d{0,' + (fixed || -1) + '})?');
    return num.toString().match(re)[0];
}
export const stripeFeeCal = (amount) => {
  const STRIPE_FIXED_FEE = 0.3;
  let stripePerentageFee = 2.9 / 100;
  const nom = amount + STRIPE_FIXED_FEE;
  const denom = 1 - stripePerentageFee;
  return (nom / denom).toFixed(2);
}; 