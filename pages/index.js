import React, { useContext } from 'react'
import Head from 'next/head'

import Layout from '../components/layout'
import LeftSide from '../components/leftside'
import RightSide from '../components/rightside'
import Text from '../components/text'
import Card, { FreeCard, PaidCard } from '../components/card'

function HomePage() {
  return (
    <Layout>
      <Head>
        <title>Passwall</title>
      </Head>
      <Layout className="contentBody">
        <LeftSide />
        <RightSide>
          <div className="containerIndex">
            <Text tag="h1" theme="heromd">
              Start Keeping <br /> Your Passwords Safe
            </Text>
            <div className="cards">
              <Card border="fancy">
                <PaidCard />
              </Card>
            </div>
          </div>
        </RightSide>
      </Layout>
    </Layout>
  )
}

export default HomePage
