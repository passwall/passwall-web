import React, { useContext } from 'react'
import Head from 'next/head'

import Layout from '../components/layout'
import LeftSide from '../components/leftside'
import RightSide from '../components/rightside'
import Form, { FORM_TYPES } from '../components/step-one'
import BottomBar from '../components/bottombar'

function FreePage() {
  return (
    <Layout>
      <Head>
        <title>Passwall Web</title>
      </Head>
      <Layout className="contentBody">
        <LeftSide />
        <RightSide>
          <div className="container">
            <Form formType={FORM_TYPES.FREE} />
          </div>
          <BottomBar />
        </RightSide>
      </Layout>
    </Layout>
  )
}

export default FreePage
