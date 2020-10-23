import React, { useContext } from 'react'
import Head from 'next/head'
import StoreContext from '../store'

import Layout from '../components/layout'
import LeftSide from '../components/leftside'
import RightSide from '../components/rightside'
import Text from '../components/text'
import Card, { FreeCard, PaidCard } from '../components/card'

function HomePage() {
  const store = useContext(StoreContext)

  return (
    <Layout>
      <Head>
        <title>Passwall Web</title>
      </Head>
      <Layout className="contentBody">
        <LeftSide />
        <RightSide>
          <div className="containerIndex">
            <Text tag="h1" theme="heromd">
              Start Keeping <br /> Your Passwords Safe
            </Text>
            <div className="cards">
              <Card>
                <FreeCard />
              </Card>
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
