import { atom } from 'recoil';

const sdProfile = atom({
  key: 'sdProfile',
  default: localStorage.getItem('sdProfile'),
});

export default { sdProfile };
