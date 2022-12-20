import { replaceColor } from 'lottie-colorify';

import avatarAnimationLight from '../../public/lotties/avatar.json';
import calendarAnimation from '../../public/lotties/calendar.json';
import chevronLeftAnimation from '../../public/lotties/chevronLeft.json';
import chevronRightAnimation from '../../public/lotties/chevronRight.json';
import crossHoverAnimation from '../../public/lotties/crossHover.json';
import dotsAnimation from '../../public/lotties/dots.json';
import editAnimation from '../../public/lotties/edit.json';
import emailAnimation from '../../public/lotties/email.json';
import emptyAnimation from '../../public/lotties/empty.json';
import eyeAnimation from '../../public/lotties/eye.json';
import loadingAnimation from '../../public/lotties/loading.json';
import lockAnimation from '../../public/lotties/lock.json';
import logoutAnimation from '../../public/lotties/logout.json';
import radioBtnAnimation from '../../public/lotties/radioButton.json';
import tasksAnimation from '../../public/lotties/tasks.json';
import tagAnimation from '../../public/lotties/tag.json';
import trashAnimation from '../../public/lotties/trash.json';

const convertToBlack = (animation: any) =>
  replaceColor([255, 255, 255], [0, 0, 0], animation);
const convertToWhite = (animation: any) =>
  replaceColor([0, 0, 0], [255, 255, 255], animation);

export const avatarAnimation = convertToBlack(avatarAnimationLight);
export const calendarAnimationLight = convertToWhite(calendarAnimation);
export const chevronLeftAnimationLight = convertToWhite(chevronLeftAnimation);
export const chevronRightAnimationLight = convertToWhite(chevronRightAnimation);
export const crossHoverAnimationLight = convertToWhite(crossHoverAnimation);
export const dotsAnimationLight = convertToWhite(dotsAnimation);
export const editAnimationLight = convertToWhite(editAnimation);
export const emailAnimationLight = convertToWhite(emailAnimation);
export const eyeAnimationLight = convertToWhite(eyeAnimation);
export const lockAnimationLight = convertToWhite(lockAnimation);
export const logoutAnimationLight = convertToWhite(logoutAnimation);
export const radioBtnAnimationLight = convertToWhite(radioBtnAnimation);
export const tasksAnimationLight = convertToWhite(tasksAnimation);
export const tagAnimationLight = convertToWhite(tagAnimation);
export const trashAnimationLight = convertToWhite(trashAnimation);

export {
  avatarAnimationLight,
  calendarAnimation,
  chevronLeftAnimation,
  chevronRightAnimation,
  crossHoverAnimation,
  dotsAnimation,
  editAnimation,
  emailAnimation,
  emptyAnimation,
  eyeAnimation,
  loadingAnimation,
  lockAnimation,
  logoutAnimation,
  radioBtnAnimation,
  tasksAnimation,
  tagAnimation,
  trashAnimation,
};
