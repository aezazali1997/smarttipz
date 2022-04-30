export const generateMsg = (id) => {
  console.log('id', id, typeof id);
  switch (id) {
    case 1:
      return 'liked';
    case 2:
      return 'commented on';
    case 3:
      return 'shared';
  }
};
