import niceware from 'niceware';

export default function GenerateRoomId() {
  return niceware.generatePassphrase(6).reduce((accumulator, currentValue) => `${accumulator}-${currentValue}`);
}
