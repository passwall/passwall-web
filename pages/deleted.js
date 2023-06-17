import React, { useContext } from 'react'
import Head from 'next/head'

import Layout from '../components/layout'
import LeftSide from '../components/leftside'
import RightSide from '../components/rightside'
import BottomBar from '../components/bottombar'
import Text from '../components/text'

function DeletedPage() {
  return (
    <Layout>
      <Head>
        <title>Passwall</title>
      </Head>
      <Layout className="contentBody">
        <LeftSide />
        <RightSide>
          <div className="container thankyou">
            <div className="content">
              <Text tag="p" theme="regular" fancy>
                Account deleted.
              </Text>
              <Text tag="h2" theme="heromd">
                We will miss you :(
              </Text>
              <Text tag="p" theme="medium">
                If you have any questions or feedback please contact us at <strong>hello@passwall.io</strong>
              </Text>
            </div>
          </div>
        </RightSide>
      </Layout>
    </Layout>
  )
}

export default DeletedPage
