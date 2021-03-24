import React, { useContext } from 'react'
import Head from 'next/head'

import Layout from '../components/layout'
import LeftSide from '../components/leftside'
import RightSide from '../components/rightside'
import Form, { FORM_TYPES } from '../components/step-one'
import BottomBar from '../components/bottombar'

function ProPage() {
  return (
    <Layout>
      <Head>
        <title>Passwall</title>
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
