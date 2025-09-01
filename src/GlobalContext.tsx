import { notification } from 'antd'
import React, { createContext, useContext } from 'react'

export type notificationType = 'success' | 'info' | 'warning' | 'error'

const GlobalContext = createContext({
  openNotification: (type: notificationType, message: string) => {}
})

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [api, contextHolder] = notification.useNotification()

  const openNotification = (type: notificationType, message: string) => {
    switch (type) {
      case ('success'):
        api.success({
          message: message,
          placement: 'topRight'
        })
        break
      case ('info'):
        api.info({
          message: message,
          placement: 'topRight'
        })
        break
      case ('warning'):
        api.warning({
          message: message,
          placement: 'topRight'
        })
        break
      case ('error'):
        api.error({
          message: message,
          placement: 'topRight'
        })
        break
    }
  }

  return (
    <GlobalContext.Provider value={{ openNotification }}>
      {contextHolder}
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => useContext(GlobalContext)
