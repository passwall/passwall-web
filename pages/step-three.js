import React, { useContext } from 'react'
import Head from 'next/head'
import StoreContext from '../store'

import Layout from '../components/layout'
import LeftSide from '../components/leftside'
import RightSide from '../components/rightside'
import Form, { FORM_TYPES } from '../components/step-three'
import BottomBar from '../components/bottombar'
import Text from '../components/text'
import Card, { FreeCard, PaidCard } from '../components/card'

function StepThreePage() {
  const store = useContext(StoreContext)

  return (
    <Layout>
      <Head>
        <title>Passwall</title>
      </Head>
      <Layout className="contentBody">
        <LeftSide />
        <RightSide>
          <div className="container">
            <Form />
          </div>
          <BottomBar />
        </RightSide>
      </Layout>
    </Layout>
  )
}

export default StepThreePage
