import React, { useContext } from 'react'
import Head from 'next/head'
import StoreContext from '../store'

import Layout from '../components/layout'
import LeftSide from '../components/leftside'
import RightSide from '../components/rightside'
import Form from '../components/step-two'
import BottomBar from '../components/bottombar'

function StepTwoPage() {
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

export default StepTwoPage
