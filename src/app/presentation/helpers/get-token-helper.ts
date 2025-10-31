export const getToken = () => localStorage.getItem('token') ?? '';

export const getHeadersWithToken = () => {
  return {Authorization: `Bearer ${getToken()}`};
}
