import React, { useContext } from 'react'
import Head from 'next/head'

import Layout from '../components/layout'
import LeftSide from '../components/leftside'
import RightSide from '../components/rightside'
import RecoverDeleteForm from '../components/recover-delete-step-two'
import BottomBar from '../components/bottombar'

function RecoverDeleteCodePage() {
    return (
        <Layout>
            <Head>
                <title>Passwall Web</title>
            </Head>
            <Layout className="contentBody">
                <LeftSide />
                <RightSide>
                    <div className="container">
                        <RecoverDeleteForm />
                    </div>
                </RightSide>
            </Layout>
        </Layout>
    )
}

export default RecoverDeleteCodePage
