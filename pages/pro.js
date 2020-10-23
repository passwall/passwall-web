import React, { useContext } from 'react'
import Head from 'next/head'
import StoreContext from '../store'

import Layout from '../components/layout'
import LeftSide from '../components/leftside'
import RightSide from '../components/rightside'
import Form, { FORM_TYPES } from '../components/form'
import BottomBar from '../components/bottombar'
import Text from '../components/text'
import Card, { FreeCard, PaidCard } from '../components/card'

function ProPage() {
  const store = useContext(StoreContext)

  return (
    <Layout>
      <Head>
        <title>Passwall Web</title>
      </Head>
      <Layout className="contentBody">
        <LeftSide />
        <RightSide>
          <div className="container">
            <Form formType={FORM_TYPES.PRO} />
          </div>
          <BottomBar />
        </RightSide>
      </Layout>
    </Layout>
  )
}

export default ProPage
