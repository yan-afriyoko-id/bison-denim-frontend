export const useToast = () => {
  const toastMsg = useState<string | null>('toast-msg', () => null)
  const toastType = useState<'success' | 'error'>('toast-type', () => 'success')

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    toastMsg.value = msg
    toastType.value = type
    
    setTimeout(() => {
      toastMsg.value = null
    }, 3000)
  }

  return { toastMsg, toastType, showToast }
}