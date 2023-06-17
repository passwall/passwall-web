import React from 'react'
import Head from 'next/head'

import Layout from '../components/layout'
import LeftSide from '../components/leftside'
import RightSide from '../components/rightside'
import Form from '../components/recover-delete-step-three'

function RecoverDeleteConfirmPage() {
  return (
    <Layout>
      <Head>
        <title>PassWall</title>
      </Head>
      <Layout className="contentBody">
        <LeftSide />
        <RightSide>
          <div className="container">
            <Form />
          </div>
        </RightSide>
      </Layout>
    </Layout>
  )
}

export default RecoverDeleteConfirmPage
