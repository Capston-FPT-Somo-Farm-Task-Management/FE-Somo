import { useMediaQuery } from 'react-responsive'

export const useDesktopXXLMediaQuery = () => {
  return useMediaQuery({ query: '(min-width: 1280px)' })
}
export const useDesktopMediaQuery = () => {
  return useMediaQuery({ query: '(min-width: 993px)' })
}

export const useTabletMediaQuery = () => {
  return useMediaQuery({ query: '(max-width: 992px)' })
}

export const useMobileMediaQuery = () => {
  return useMediaQuery({ query: '(max-width: 768px)' })
}

export const useMobileSMMediaQuery = () => {
  return useMediaQuery({ query: '(max-width: 576px)' })
}
