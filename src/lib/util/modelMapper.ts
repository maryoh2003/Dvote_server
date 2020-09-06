/**
 * @description 원본 객체를 대상 객체로 mapping함
 * @param source 원본 객체
 * @param destination 대상 객체
 */
export default (source: object, destination: object) => {
  const sourceKeys = Object.keys(source);

  sourceKeys.forEach((key) => {
    destination[key] = source[key];
  });
};
