import React, { useContext } from 'react'
import Head from 'next/head'
import StoreContext from '../store'

import Layout from '../components/layout'
import LeftSide from '../components/leftside'
import RightSide from '../components/rightside'
import BottomBar from '../components/bottombar'
import Text from '../components/text'
import * as Icons from 'heroicons-react'
import { DownloadButton } from '../components/button'

import { DOWLOAD_LINKS, COMING_SOON } from '../constants'

function ThankYouPage() {
  const store = useContext(StoreContext)

  return (
    <Layout>
      <Head>
        <title>Passwall Web</title>
      </Head>
      <Layout className="contentBody">
        <LeftSide />
        <RightSide>
          <div className="container thankyou">
            <div className="content">
              <Text tag="p" theme="regular" fancy>
                Thank you.
              </Text>
              <Text tag="h2" theme="heromd">
                Welcome aboard!
              </Text>
              <Text tag="p" theme="medium">
                We’ve e-mailed details and your master password, keep it a
                secret!
              </Text>
              <Text tag="p" theme="regular" className="platforms">
                Available platforms
              </Text>
              <div className="downloadSection">
                {DOWLOAD_LINKS.map((item) => (
                  <DownloadButton key={item.name}>
                    <a href={item.link}>{item.name}</a>
                    <Icons.Download width={15} height={15} />
                  </DownloadButton>
                ))}
              </div>
              <Text tag="p" theme="regular" className="soonText">
                Coming Soon
              </Text>
              <div className="soon">
                {COMING_SOON.map((item) => (
                  <DownloadButton key={item.name} disable>
                    <a href={item.link}>{item.name}</a>
                  </DownloadButton>
                ))}
              </div>
            </div>
          </div>
          <BottomBar />
        </RightSide>
      </Layout>
    </Layout>
  )
}

export default ThankYouPage
