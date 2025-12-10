import React, { useContext } from 'react'
import Head from 'next/head'
import Link from 'next/link'

import Layout from '../components/layout'
import LeftSide from '../components/leftside'
import RightSide from '../components/rightside'
import Text from '../components/text'
import Card, { FreeCard, PaidCard } from '../components/card'
import Footer from '../components/footer'

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
            <div className="privacy-link-section">
              <Text tag="p" theme="small">
                By signing up, you agree to our{' '}
                <Link href="/privacy">
                  <a className="privacy-link">Privacy Policy</a>
                </Link>
                {' '}and understand how we protect your data with zero-knowledge encryption.
              </Text>
            </div>
          </div>
          <Footer />
        </RightSide>
      </Layout>
    </Layout>
  )
}

export default HomePage
